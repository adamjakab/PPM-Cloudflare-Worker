import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { makeCloudflareWorkerRequest } from 'cloudflare-worker-mock'
import { StorageIndexItem } from '../../src'
import { setupTestEnvironment } from '../helper/test.app.setup'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 *
 * Get a single card
 */
describe('Card Get', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    return new Promise<void>((resolve, reject) => {
      setupTestEnvironment().then((envData) => {
        appIndex = envData.appIndex
        ppmConfig = envData.ppmConfig
        ppmStorage = envData.ppmStorage
        resolve()
      })
    })
  })

  it('should get a single card by id', async () => {
    ppmStorage.reset({
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

  it('should respond with 404 in case of error', async () => {
    ppmStorage.reset({
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
    ppmStorage.reset({
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
    ppmStorage.reset({
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
