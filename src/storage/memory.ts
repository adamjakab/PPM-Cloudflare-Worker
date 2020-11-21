import * as _ from 'lodash'
import { Platform } from '../util/platform'
import { Storage, StorageInterface } from './storage'

/**
 * @todo: this will need to go
 */
const testData = {
  notes: [
    { id: '00000000-0000-4000-8000-000000000001', name: 'Note-1', type: 'text', text: '001' },
    { id: '00000000-0000-4000-8000-000000000002', name: 'Note-2', type: 'video', text: '002' },
    { id: '00000000-0000-4000-8000-000000000003', name: 'Note-3', type: 'audio', text: '003' },
    { id: '00000000-0000-4000-8000-000000000004', name: 'Note-4', type: 'secret', text: '004' }
  ]
}

/**
 * In-memory storage (mainly for testing)
 */
export class Memory extends Storage implements StorageInterface {
  public readonly name: string = 'memory';
  private _data: Record<string, any>;

  constructor (defaultData: Record<string, any> = {}) {
    super()
    this.reset(defaultData)
  }

  /**
   * Fetches all elements from the storage
   * @param table           the name of the table
   * @return Promise<any>   the list of elements
   */
  public async fetchAll (table: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!_.has(this._data, table)) {
        reject(new Error('Unknown storage table: ' + table))
      }
      resolve(_.get(this._data, table, []))
    })
  }

  /**
   * Fetches a single element by ID
   * @param table           the name of the table
   * @param id              the ID of the element to fetch
   * @return Promise<any>   the element if found or undefined
   */
  public async fetchOne (table: string, id: number | string): Promise<any> {
    return new Promise<number>((resolve, reject) => {
      if (!_.has(this._data, table)) {
        reject(new Error('Unknown storage table: ' + table))
      }
      const tbl = _.get(this._data, table, [])
      resolve(_.find(tbl, { id: id }))
    })
  }

  /**
   * Stores the element data in the indicated table
   * @param table             the name of the table
   * @param element           element data
   * @return Promise<number>  the ID of the stored element
   */
  public async store (table: string, element: any): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (!_.get(element, 'id')) {
        reject(new Error('Element does not have an id!'))
      }
      // Platform.log("Saving entity: ", element.id);

      const tbl = _.get(this._data, table, [])
      const exEl = _.find(tbl, { id: element.id })
      if (_.isUndefined(exEl)) {
        tbl.push(element)
      } else {
        // @todo: this does not store the element!!!
        _.extend(exEl, element)
      }
      resolve(element.id)
    })
  }

  /**
   * Deletes a single element by ID
   * @param table               the name of the table
   * @param id                  the ID of the element to delete
   * @return Promise<boolean>   true if the element was deleted
   */
  public async delete (table: string, id: number | string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!_.has(this._data, table)) {
        reject(new Error('Unknown storage table: ' + table))
      }
      const tbl: [] = _.get(this._data, table, [])
      const elIndex = _.findIndex(tbl, { id: id } as any)
      if (!_.isUndefined(elIndex)) {
        tbl.splice(elIndex, 1)
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  /**
   * Reset memory storage
   * @param defaultData
   */
  public reset (defaultData: Record<string, any> = {}): void {
    this._data = defaultData
  }

  public resetTestData (): void {
    this._data = testData
  }
}
