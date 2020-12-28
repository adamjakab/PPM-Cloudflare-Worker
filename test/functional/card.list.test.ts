import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { makeCloudflareWorkerRequest } from 'cloudflare-worker-mock'
import { setupTestEnvironment } from '../helper/test.app.setup'
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

  it('should provide cards index', async () => {
    ppmStorage.reset({
      data_file: '../data/storage.data.default.json'
    })

    const storageData = ppmStorage.datastore

    const request = makeCloudflareWorkerRequest('/cards', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()

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
    ppmStorage.reset({
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
    const reply = await response.json()

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Error: Index Error'
    }])
  })
})
