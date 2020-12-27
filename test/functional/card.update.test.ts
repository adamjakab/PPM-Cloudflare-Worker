import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { createGlobalPpmConfigKV } from '../helper/ppm.config'
import { createGlobalPpmStorageKV, PpmStorage } from '../helper/ppm.storage'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 *
 * Update a card
 */
describe('Card Update', () => {
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

  it('should update all card attributes', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })

    const cardData = {
      id: '00000000-0000-4000-8000-000000000001',
      name: 'Updated Card',
      type: 'memo',
      identifier: 'my memories',
      text: 'I remember this and that.'
    }

    const request = makeCloudflareWorkerRequest('/cards/' + cardData.id, {
      method: 'PUT',
      body: JSON.stringify(cardData),
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()
    const createdCard: any = _.head(reply)

    expect(response.status).toBe(200)
    // console.log('Created Card: ', createdCard)

    // one for the data and one for the index
    expect(ppmStorage.timesCalledPut).toEqual(2)

    const storageData = ppmStorage.datastore
    // console.log('Storage Data: ', storageData)

    // verify the stored element
    const cardInStorage: any = _.get(storageData, createdCard.id)
    expect(cardInStorage).toBeDefined()
    expect(cardInStorage).toEqual(createdCard)
    _.each(_.keys(cardData), k => {
      expect(_.get(cardInStorage, k)).toEqual(_.get(cardData, k))
    })
    // @todo: mod time must have been changed as well

    // verify that the index is updated
    expect(storageData.index).toHaveLength(2)
    const indexItem: any = _.find(storageData.index, { id: createdCard.id })
    expect(indexItem).toBeDefined()
    expect(indexItem.type).toEqual(createdCard.type)
    expect(indexItem.identifier).toEqual(createdCard.identifier)
    // console.log(ppmStorage.datastore)
  })

  it('should respond with 404 in case of storage error', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json',
      call_put: () => {
        throw new Error('Put Error')
      }
    })

    const cardData = {
      id: '00000000-0000-4000-8000-000000000001',
      name: 'Updated Card'
    }

    const request = makeCloudflareWorkerRequest('/cards/' + cardData.id, {
      method: 'PUT',
      body: JSON.stringify(cardData),
      cf: {}
    })

    const response = await self.trigger('fetch', request)
    const reply = await response.json()

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Error: Put Error'
    }])
    // console.log(reply)
  })

  it('should respond with 404 in case of non-existent id', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const cardData = {
      id: '00000000-0000-4000-8000-00000000000X',
      name: 'Updated Card'
    }

    const request = makeCloudflareWorkerRequest('/cards/' + cardData.id, {
      method: 'PUT',
      body: JSON.stringify(cardData),
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
