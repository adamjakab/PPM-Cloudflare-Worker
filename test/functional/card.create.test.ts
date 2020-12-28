import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { makeCloudflareWorkerRequest } from 'cloudflare-worker-mock'
import { setupTestEnvironment } from '../helper/test.app.setup'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 *
 * Create a card
 */
describe('Card Create', () => {
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

  it('should create a card', async () => {
    ppmStorage.reset({
      data_file: '../data/storage.data.default.json'
    })

    const newCard = {
      name: 'New Card',
      type: 'text',
      identifier: 'jpro.net',
      text: 'This is a new card.'
    }

    const request = makeCloudflareWorkerRequest('/cards', {
      method: 'POST',
      body: JSON.stringify(newCard),
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
    _.each(_.keys(newCard), k => {
      expect(_.get(cardInStorage, k)).toEqual(_.get(newCard, k))
    })

    // verify that the index is updated
    expect(storageData.index).toHaveLength(3)
    const indexItem: any = _.find(storageData.index, { id: createdCard.id })
    expect(indexItem).toBeDefined()
    expect(indexItem.id).toEqual(createdCard.id)
    expect(indexItem.type).toEqual(createdCard.type)
    expect(indexItem.identifier).toEqual(createdCard.identifier)

    // console.log(storageData)
  })

  it('should respond with 404 in case of storage error', async () => {
    ppmStorage.reset({
      data_file: '../data/storage.data.default.json',
      call_put: () => {
        throw new Error('Put Error')
      }
    })

    const newCard = {
      name: 'New Card',
      type: 'text',
      identifier: 'jpro.net',
      text: 'This is a new card.'
    }

    const request = makeCloudflareWorkerRequest('/cards', {
      method: 'POST',
      body: JSON.stringify(newCard),
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
})
