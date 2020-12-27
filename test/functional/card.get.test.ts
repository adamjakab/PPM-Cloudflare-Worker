import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { StorageIndexItem } from '../../src'
import { createGlobalPpmConfigKV } from '../helper/ppm.config'
import { createGlobalPpmStorageKV, PpmStorage } from '../helper/ppm.storage'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 *
 * Get a single card
 */
describe('Card Get', () => {
  let ppmStorage: PpmStorage

  beforeEach(() => {
    // Merge the Cloudflare Worker Environment into the global scope.
    Object.assign(global, makeCloudflareWorkerEnv())

    // Merge the named KV into the global scope: PPMConfigKV
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMConfigKV'))

    // Merge the named KV into the global scope: PPMStorageKV
    Object.assign(global, makeCloudflareWorkerKVEnv('PPMStorageKV'))

    // Clear all module imports.
    jest.resetModules()

    // Import and init the Worker.
    jest.requireActual('../../src/index')

    createGlobalPpmConfigKV({
      log_to_console: false,
      storage_to_use: 'kvstore'
    })
  })

  it('should get a single card by id', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const storageData = ppmStorage.datastore
    const id = _.get(_.head(storageData.index), 'id')

    const request = makeCloudflareWorkerRequest('/cards/' + id, {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()

    expect(response.status).toBe(200)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toHaveLength(1)
    const replyData = _.head(reply)
    expect(replyData).toBeInstanceOf(Object)
    expect(replyData).toEqual(_.get(storageData, id))
    // console.log(replyData)
  })

  it('should respond with 404 if error', async () => {
    ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json',
      call_get: () => {
        throw new Error('Get Error')
      }
    })
    const storageData = ppmStorage.datastore
    const id = _.get(_.head(storageData.index), 'id')

    const request = makeCloudflareWorkerRequest('/cards/' + id, {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply: StorageIndexItem[] = await response.json()

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Error: Get Error'
    }])
  })

  /**
   * Test for an item which is not in the index
   */
  it('should return not found on non-existent id', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const storageData = ppmStorage.datastore
    const id = 'this-id-does-not-exist'

    const request = makeCloudflareWorkerRequest('/cards/' + id, {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Error: Requested id was not found!'
    }])
  })

  /**
   * Test for an item which is in the index but there is no item in the storage === Faulty Index
   */
  it('should return not found on non-existent id (faulty index)', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.faulty.index.json'
    })
    const storageData = ppmStorage.datastore
    const id = _.get(_.head(storageData.index), 'id')

    const request = makeCloudflareWorkerRequest('/cards/' + id, {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Error: Requested id was not found!'
    }])

    // console.log(reply)
  })
})
