import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { createGlobalPpmConfigKV } from '../helper/ppm.config'
import { createGlobalPpmStorageKV, PpmStorage } from '../helper/ppm.storage'
import { StorageIndexItem } from '../../src'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 *
 * Listing here will NOT return the full list of items but will
 * return the index list of all items containing for each {id, type, identifier}
 */
describe('Cards List', () => {
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

  it('should provide cards index', async () => {
    ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })

    const storageData = ppmStorage.datastore

    const request = makeCloudflareWorkerRequest('/cards', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply: StorageIndexItem[] = await response.json()

    expect(response.status).toBe(200)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual(storageData.index)

    _.each(reply, (item) => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('type')
      expect(item).toHaveProperty('identifier')
    })
  })

  it('should respond with 404 if index is not available', async () => {
    ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json',
      call_get: () => {
        throw new Error('Index Error')
      }
    })

    const request = makeCloudflareWorkerRequest('/cards', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply: StorageIndexItem[] = await response.json()

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Error: Index Error'
    }])
  })
})
