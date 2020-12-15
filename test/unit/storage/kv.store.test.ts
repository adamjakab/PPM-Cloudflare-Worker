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
      log_to_console: false,
      storage_to_use: 'kvstore'
    })
  })

  it('should not have a name', () => {
    const ms = new KVStore()
    expect(ms).not.toHaveProperty('name')
  })

  it('[fetchIndex] should return the storage index', async () => {
    const ppmStorage = createGlobalPpmStorageKV({
      data_file: '../data/storage.data.default.json'
    })
    const storageData = ppmStorage.datastore

    const store = new KVStore()
    const index = await store.fetchIndex()

    expect(index).toBeInstanceOf(Array)
    expect(index).toEqual(_.get(storageData, 'index'))
  })

  /*
  it('should return all data from a specific table', async () => {
    const defaultData = {
      notes: [
        { id: generateUUIDv4(), name: 'A' },
        { id: generateUUIDv4(), name: 'B' }
      ],
      documents: [
        { id: generateUUIDv4(), name: 'C' },
        { id: generateUUIDv4(), name: 'D' },
        { id: generateUUIDv4(), name: 'E' }
      ]
    }
    const ms = new Memory(defaultData)
    const notes = await ms.fetchAll('notes')
    const documents = await ms.fetchAll('documents')
    expect(_.size(notes)).toEqual(2)
    expect(_.size(documents)).toEqual(3)
  })

  it('should reset with new data', async () => {
    const defaultData1 = {
      notes: [{ id: generateUUIDv4(), name: 'A' }]
    }
    const defaultData2 = {
      notes: [
        { id: generateUUIDv4(), name: 'B' },
        { id: generateUUIDv4(), name: 'C' }
      ]
    }
    const ms = new Memory(defaultData1)
    let notes = await ms.fetchAll('notes')
    expect(_.size(notes)).toEqual(1)
    ms.reset(defaultData2)
    notes = await ms.fetchAll('notes')
    expect(_.size(notes)).toEqual(2)
  })

  it('[fetchOne] should throw an error on unknown table name', async () => {
    expect.assertions(1)
    const ms = new Memory()
    try {
      await ms.fetchOne('notes', 1)
    } catch (e) {
      expect(e.toString()).toMatch('Unknown storage table')
    }
  })

  it('should fetch a single element by id', async () => {
    const defaultData = {
      notes: defaultDataCreator(
        [
          { name: 'A' },
          { name: 'B' },
          { name: 'C' }
        ])
    }
    const ms = new Memory(defaultData)
    let note = await ms.fetchOne('notes', _.keys(defaultData.notes)[0])
    expect(note).toEqual(_.values(defaultData.notes)[0])
    note = await ms.fetchOne('notes', _.keys(defaultData.notes)[1])
    expect(note).toEqual(_.values(defaultData.notes)[1])
    note = await ms.fetchOne('notes', _.keys(defaultData.notes)[2])
    expect(note).toEqual(_.values(defaultData.notes)[2])
  })

  it('should return undefined on nonexistent id', async () => {
    const defaultData = {
      notes: [
        { id: generateUUIDv4(), name: 'A' },
        { id: generateUUIDv4(), name: 'B' },
        { id: generateUUIDv4(), name: 'C' }
      ]
    }
    const ms = new Memory(defaultData)
    const note = await ms.fetchOne('notes', 123)
    expect(note).toBeUndefined()
  })

  it('[store] should throw an error on unknown table name', async () => {
    expect.assertions(1)
    const ms = new Memory()
    try {
      await ms.store('notes', {})
    } catch (e) {
      expect(e.toString()).toMatch('Element does not have an id!')
    }
  })

  it('[store] should throw an error on element without id', async () => {
    expect.assertions(1)
    const defaultData = { notes: [] }
    const ms = new Memory(defaultData)
    try {
      await ms.store('notes', { name: 'NEW' })
    } catch (e) {
      expect(e.toString()).toMatch('Element does not have an id!')
    }
  })

  it('should store new element', async () => {
    const defaultData = { notes: [] }
    const ms = new Memory(defaultData)
    let notes = await ms.fetchAll('notes')
    expect(_.size(notes)).toEqual(0)
    const newData = { id: generateUUIDv4(), name: 'NEW' }
    const newId = await ms.store('notes', newData)
    expect(newId).toEqual(newData.id)
    notes = await ms.fetchAll('notes')
    expect(_.size(notes)).toEqual(1)
    const storedData: any = _.first(notes) as any
    expect(storedData.id).toEqual(newData.id)
    expect(storedData.name).toEqual(newData.name)
  })

  it('should update existing element', async () => {
    const defaultData = {
      notes: defaultDataCreator(
        [
          { name: 'OLD' }
        ])
    }
    const ms = new Memory(defaultData)
    const elementData: any = _.values(defaultData.notes)[0]
    const newData = { id: elementData.id, name: 'NEW', xtra: 'Cool!' }
    const newId = await ms.store('notes', newData)
    expect(newId).toEqual(newData.id)
    const notes = await ms.fetchAll('notes')
    expect(_.size(notes)).toEqual(1)
    const storedData: any = _.values(notes)[0]
    expect(storedData.id).toEqual(newData.id)
    expect(storedData.name).toEqual(newData.name)
    expect(storedData.xtra).toEqual(newData.xtra)
  })

  it('[delete] should throw an error on unknown table name', async () => {
    expect.assertions(1)
    const ms = new Memory()
    try {
      await ms.delete('notes', 1)
    } catch (e) {
      expect(e.toString()).toMatch('Unknown storage table')
    }
  })

  it('should delete an existing element', async () => {
    const defaultData = {
      notes: defaultDataCreator(
        [
          { name: 'OLD' }
        ])
    }
    const ms = new Memory(defaultData)
    const elementData: any = _.values(defaultData.notes)[0]
    const resp = await ms.delete('notes', elementData.id)
    expect(resp).toBeTruthy()
    const notes = await ms.fetchAll('notes')
    expect(_.size(notes)).toEqual(0)
  })
   */
})
