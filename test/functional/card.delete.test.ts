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
 * Delete a card
 */
describe('Card Delete', () => {
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

  it('should delete a card', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })

    const cardId = '00000000-0000-4000-8000-000000000001'
    const cardData = _.get(ppmStorage.datastore, cardId)

    const request = makeCloudflareWorkerRequest('/cards/' + cardId, {
      method: 'DELETE',
      cf: {}
    })

    const response = await self.trigger('fetch', request)
    const reply = await response.json()
    const deletedCard: any = _.head(reply)

    expect(response.status).toBe(200)
    expect(deletedCard).toEqual(cardData)
    // console.log('Deleted Card: ', deletedCard)

    // one for the data and one for the index
    expect(ppmStorage.timesCalledPut).toEqual(1)
    expect(ppmStorage.timesCalledDel).toEqual(1)

    // verify that the element is deleted
    const storageData = ppmStorage.datastore
    // console.log('Storage Data: ', storageData)
    const cardInStorage: any = _.get(storageData, cardId)
    expect(cardInStorage).toBeUndefined()

    // verify that the index is updated
    expect(storageData.index).toHaveLength(1)
    const indexItem: any = _.find(storageData.index, { id: cardId })
    expect(indexItem).toBeUndefined()

    // console.log(ppmStorage.datastore)
  })
})
