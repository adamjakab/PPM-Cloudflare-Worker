import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import { makeCloudflareWorkerRequest } from 'cloudflare-worker-mock'
import { setupTestEnvironment } from '../helper/test.app.setup'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 * @group _incomplete
 *
 * Delete a card
 */
describe('Card Delete', () => {
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

  it('should delete a card', async () => {
    ppmStorage.reset({
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

    const storageData = ppmStorage.datastore
    // console.log('Storage Data: ', storageData)

    // verify that the element is deleted
    const cardInStorage: any = _.get(storageData, cardId)
    expect(cardInStorage).toBeUndefined()

    // verify that the index is updated
    expect(storageData.index).toHaveLength(1)
    const indexItem: any = _.find(storageData.index, { id: cardId })
    expect(indexItem).toBeUndefined()
  })

  it('should respond with 404 in case of storage error', async () => {
    ppmStorage.reset({
      data_file: '../data/storage.data.default.json',
      call_delete: () => {
        throw new Error('Delete Error')
      }
    })

    const cardId = '00000000-0000-4000-8000-000000000001'

    const request = makeCloudflareWorkerRequest('/cards/' + cardId, {
      method: 'DELETE',
      cf: {}
    })

    const response = await self.trigger('fetch', request)
    const reply = await response.json()
    // console.log(reply)

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Error: Delete Error'
    }])
  })

  it('should respond with 404 in case of non-existent id', async () => {
    ppmStorage.reset({
      data_file: '../data/storage.data.default.json'
    })

    const cardId = '00000000-0000-4000-8000-00000000000X'

    const request = makeCloudflareWorkerRequest('/cards/' + cardId, {
      method: 'DELETE',
      cf: {}
    })

    const response = await self.trigger('fetch', request)
    const reply = await response.json()
    // console.log(reply)

    expect(response.status).toBe(404)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual([{
      error: true,
      message: 'Error: Requested id was not found!'
    }])
  })
})
