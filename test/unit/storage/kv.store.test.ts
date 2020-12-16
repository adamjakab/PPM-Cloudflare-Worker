import makeCloudflareWorkerEnv, { makeCloudflareWorkerKVEnv } from 'cloudflare-worker-mock'
import * as _ from 'lodash'
import { v4 as generateUUIDv4 } from 'uuid'
import { KVStore } from '../../../src/storage/KVStore'
import { createGlobalPpmConfigKV } from '../../helper/ppm.config'
import { createGlobalPpmStorageKV } from '../../helper/ppm.storage'
// import { Entity } from "../../../src/entity/entity";

// @todo: move to helper
const defaultDataCreator = (elements: any[]) => {
  const answer = {}
  _.each(elements, element => {
    const id = generateUUIDv4()
    _.set(answer, id, _.extend({ id: id }, element))
  })
  return answer
}

/**
 * @group unit/storage
 */
describe('KVStorage', () => {
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
    jest.requireActual('../../../src/index')

    createGlobalPpmConfigKV({
      log_to_console: true,
      storage_to_use: 'kvstore'
    })
  })

  // ---------------------------------------------------------------: fetchIndex

  it('[fetchIndex] should return the storage index', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const storageData = ppmStorage.datastore

    const store = new KVStore()
    const fetchedIndex = await store.fetchIndex()

    expect(fetchedIndex).toBeInstanceOf(Array)
    expect(fetchedIndex).toEqual(_.get(storageData, 'index'))
  })

  it('[fetchIndex] should return an empty index if does not exist in the storage', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.empty.json'
    })

    const store = new KVStore()
    const fetchedIndex = await store.fetchIndex()

    expect(fetchedIndex).toBeInstanceOf(Array)
    expect(fetchedIndex).toEqual([])
  })

  it('[fetchIndex] should throw an error on KV error', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json',
      call_get: () => {
        return Promise.reject(new Error('Error!'))
      }
    })
    const store = new KVStore()
    expect.assertions(1)
    try {
      await store.fetchIndex()
    } catch (e) {
      expect(e.message).toBe('Error!')
    }
  })

  it('[fetchIndex] should use in-memory index once loaded from KV', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const storageData = ppmStorage.datastore
    const store = new KVStore()
    const fetchedIndex1 = await store.fetchIndex()
    const fetchedIndex2 = await store.fetchIndex()
    expect(fetchedIndex1).toEqual(_.get(storageData, 'index'))
    expect(fetchedIndex2).toEqual(_.get(storageData, 'index'))
    expect(ppmStorage.timesCalledGet).toEqual(1)
  })

  // ---------------------------------------------------------------: fetchAll

  it('[fetchAll] should return all items', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const storageData = ppmStorage.datastore
    const store = new KVStore()
    const fetchedItems = await store.fetchAll()
    expect(fetchedItems).toBeInstanceOf(Array)
    expect(fetchedItems).toHaveLength(storageData.index.length)
    // console.log(fetchedItems)
  })

  it('[fetchAll] should throw an error on KV error', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.faulty.index.json',
      call_get: () => { return Promise.reject(new Error('Error!')) }
    })
    const store = new KVStore()
    expect.assertions(1)
    try {
      await store.fetchAll()
    } catch (e) {
      expect(e.message).toBe('Error!')
    }
  })

  // ---------------------------------------------------------------: fetchOne

  it('[fetchOne] should fetch a specific item', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const fetchId = '00000000-0000-4000-8000-000000000001'
    const storageData = ppmStorage.datastore
    const store = new KVStore()
    const fetchedItem = await store.fetchOne(fetchId)
    expect(fetchedItem).not.toBeNull()
    expect(fetchedItem).toBeInstanceOf(Object)
    expect(fetchedItem).toEqual(_.get(storageData, fetchId))
    // console.log(fetchedItems)
  })

  it('[fetchOne] should throw an error if item is not in the index', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const fetchId = '00000000-0000-4000-8000-00000000000F'
    const storageData = ppmStorage.datastore
    const store = new KVStore()

    expect.assertions(1)
    try {
      await store.fetchOne(fetchId)
    } catch (e) {
      expect(e.message).toBe('Requested id was not found!')
    }

    // console.log(fetchedItems)
  })

  it('[fetchOne] should throw an error on KV error', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json',
      call_get: () => {
        return Promise.reject(new Error('Error!'))
      }
    })
    const store = new KVStore()
    expect.assertions(1)
    try {
      await store.fetchOne('00000000-0000-4000-8000-000000000001')
    } catch (e) {
      expect(e.message).toBe('Error!')
    }
  })

  // ---------------------------------------------------------------: store

  it('[store] should not store item if "id" is missing.', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.empty.json'
    })

    const newItem = {
      dateCreated: '2020-11-20T22:34:59.274Z',
      dateModified: '2020-11-20T22:34:59.274Z',
      name: 'Test-1',
      type: 'memo',
      identifier: 'unit test',
      text: 'Adding a new item.'
    }

    const store = new KVStore()
    expect.assertions(2)
    try {
      await store.store(newItem)
    } catch (e) {
      expect(e.message).toBe('Storage cannot add to index - missing "id"!')
    }
    expect(ppmStorage.datastore).toEqual({})
  })

  it('[store] should not store item if "type" is missing.', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.empty.json'
    })

    const newItem = {
      id: '00000000-0000-4000-8000-000000000001',
      dateCreated: '2020-11-20T22:34:59.274Z',
      dateModified: '2020-11-20T22:34:59.274Z',
      name: 'Test-1',
      identifier: 'unit test',
      text: 'Adding a new item.'
    }

    const store = new KVStore()
    expect.assertions(2)
    try {
      await store.store(newItem)
    } catch (e) {
      expect(e.message).toBe('Storage cannot add to index - missing "type"!')
    }
    expect(ppmStorage.datastore).toEqual({})
  })

  it('[store] should not store item if "identifier" is missing.', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.empty.json'
    })

    const newItem = {
      id: '00000000-0000-4000-8000-000000000001',
      dateCreated: '2020-11-20T22:34:59.274Z',
      dateModified: '2020-11-20T22:34:59.274Z',
      name: 'Test-1',
      type: 'memo',
      text: 'Adding a new item.'
    }

    const store = new KVStore()
    expect.assertions(2)
    try {
      await store.store(newItem)
    } catch (e) {
      expect(e.message).toBe('Storage cannot add to index - missing "identifier"!')
    }
    expect(ppmStorage.datastore).toEqual({})
  })

  it('[store] should store a new item', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.empty.json'
    })

    const newItem = {
      id: '00000000-0000-4000-8000-000000000001',
      dateCreated: '2020-11-20T22:34:59.274Z',
      dateModified: '2020-11-20T22:34:59.274Z',
      name: 'Test-1',
      type: 'memo',
      identifier: 'unit test',
      text: 'Adding a new item.'
    }

    const store = new KVStore()
    await store.store(newItem)
    const storageData = ppmStorage.datastore
    const createdItem = _.get(storageData, newItem.id)
    expect(createdItem).toBeDefined()
    expect(createdItem).toEqual(newItem)
    expect(storageData.index).toHaveLength(1)
    expect(_.find(storageData.index, { id: newItem.id })).toBeDefined()
    // console.log(storageData)
  })

  it('[store] should update an existing item', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })

    const newItem = {
      id: '00000000-0000-4000-8000-000000000001',
      dateCreated: '2020-12-20T12:34:59.274Z',
      dateModified: '2020-12-20T12:34:59.274Z',
      name: 'Test-1',
      type: 'memo',
      identifier: 'unit test',
      text: 'Updating existing item.',
      extra: true
    }

    const store = new KVStore()
    const oldItem = _.get(ppmStorage.datastore, newItem.id)
    const oldIndexLength = ppmStorage.datastore.index.length
    expect(oldItem).not.toEqual(newItem)
    await store.store(newItem)
    const storageData = ppmStorage.datastore
    const createdItem = _.get(storageData, newItem.id)
    expect(createdItem).toBeDefined()
    expect(createdItem).toEqual(newItem)
    expect(storageData.index).toHaveLength(oldIndexLength)
    expect(_.find(storageData.index, { id: newItem.id })).toBeDefined()
    // console.log(storageData)
  })

  it('[store] should store the minimal item', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })

    const newItem = {
      id: '00000000-0000-4000-8000-00000000000A',
      type: 'memo',
      identifier: 'unit test'
    }

    const store = new KVStore()
    const oldIndexLength = ppmStorage.datastore.index.length
    await store.store(newItem)
    const storageData = ppmStorage.datastore
    const createdItem = _.get(storageData, newItem.id)
    expect(createdItem).toEqual(newItem)
    expect(storageData.index).toHaveLength(oldIndexLength + 1)
    const indexItem = _.find(storageData.index, { id: newItem.id })
    expect(indexItem).toBeDefined()
    expect(indexItem).toEqual(createdItem)
    // console.log(storageData)
  })

  // ---------------------------------------------------------------: delete

  it('[delete] should delete item', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })

    const deleteId = '00000000-0000-4000-8000-000000000001'

    const store = new KVStore()
    const oldIndexLength = ppmStorage.datastore.index.length
    await store.delete(deleteId)
    const storageData = ppmStorage.datastore
    expect(_.get(storageData, deleteId)).toBeUndefined()
    expect(storageData.index).toHaveLength(oldIndexLength - 1)
    expect(_.find(storageData.index, { id: deleteId })).toBeUndefined()
    // console.log(storageData)
  })

  it('[delete] should throw an error on KV error', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json',
      call_delete: () => {
        return Promise.reject(new Error('Error!'))
      }
    })
    const store = new KVStore()
    expect.assertions(1)
    try {
      await store.delete('00000000-0000-4000-8000-000000000001')
    } catch (e) {
      expect(e.message).toBe('Error!')
    }
  })

  it('[delete] should throw an error on missing id', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const store = new KVStore()
    expect.assertions(1)
    try {
      await store.delete('')
    } catch (e) {
      expect(e.message).toBe('Storage cannot delete from index - missing "id"!')
    }
  })

  it('[delete] should throw an error on non-existent id', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const store = new KVStore()
    expect.assertions(1)
    try {
      await store.delete('00000000-0000-4000-8000-00000000000F')
    } catch (e) {
      expect(e.message).toBe('Storage cannot delete from index - "id" not found!')
    }
  })

  it('[delete] should throw an error on KV error (index update)', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json',
      call_put: () => {
        return Promise.reject(new Error('Error!'))
      }
    })
    const store = new KVStore()
    expect.assertions(1)
    try {
      await store.delete('00000000-0000-4000-8000-000000000001')
    } catch (e) {
      expect(e.message).toBe('Error!')
    }
  })
})
