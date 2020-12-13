import { CloudflareWorkerGlobalScope } from 'types-cloudflare-worker'
import makeCloudflareWorkerEnv, {
  makeCloudflareWorkerKVEnv,
  makeCloudflareWorkerRequest
} from 'cloudflare-worker-mock'
import { createGlobalPpmConfigKV } from '../helper/ppm.config'
import { createGlobalPpmStorageKV } from '../helper/ppm.storage'
import _ from 'lodash'

declare let self: CloudflareWorkerGlobalScope

/**
 * @group functional
 */
describe('Notes(/notes)', () => {
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

  it('should provide notes index', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const storageData = ppmStorage.datastore

    const request = makeCloudflareWorkerRequest('/notes', {
      method: 'GET',
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()

    expect(response.status).toBe(200)
    expect(reply).toBeInstanceOf(Array)
    expect(reply).toEqual(storageData.index)

    // console.log(reply)
  })

  it('should get a single note by id', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const storageData = ppmStorage.datastore
    const id = _.get(_.head(storageData.index), 'id')

    const request = makeCloudflareWorkerRequest('/notes/' + id, {
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

  it('should create a note', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })

    const newNote = {
      name: 'New Note',
      type: 'text',
      identifier: 'jpro.net',
      text: 'this is new'
    }

    const request = makeCloudflareWorkerRequest('/notes', {
      method: 'POST',
      body: JSON.stringify(newNote),
      cf: {}
    })
    const response = await self.trigger('fetch', request)
    const reply = await response.json()
    const createdNote: any = _.head(reply)

    expect(response.status).toBe(200)
    // console.log('Created Note: ', createdNote)

    // one for the data and one for the index
    expect(ppmStorage.timesCalledPut).toEqual(2)

    // verify the stored element
    const storageData = ppmStorage.datastore
    // console.log('Storage Data: ', storageData)
    const noteInStorage: any = _.get(storageData, createdNote.id)
    expect(noteInStorage).toBeDefined()
    expect(noteInStorage).toEqual(createdNote)
    expect(noteInStorage.name).toEqual(newNote.name)
    expect(noteInStorage.type).toEqual(newNote.type)
    expect(noteInStorage.identifier).toEqual(newNote.identifier)
    expect(noteInStorage.text).toEqual(newNote.text)

    // verify that the index is updated
    expect(storageData.index).toHaveLength(3)
    const indexItem: any = _.find(storageData.index, { id: createdNote.id })
    expect(indexItem).toBeDefined()
    expect(indexItem.id).toEqual(createdNote.id)
    expect(indexItem.type).toEqual(createdNote.type)
    expect(indexItem.identifier).toEqual(createdNote.identifier)

    // console.log(storageData)
  })
})
