import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { StorageIndexItem } from '../../src/interface/storage.index'
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

    ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })

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
})
