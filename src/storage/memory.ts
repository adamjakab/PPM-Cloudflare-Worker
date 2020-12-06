import * as _ from '../util/lodash'
import { Storage, StorageInterface } from './storage'

/**
 * @todo: this will need to go away
 */
const testData = {
  notes: {
    '00000000-0000-4000-8000-000000000001': {
      id: '00000000-0000-4000-8000-000000000001',
      dateCreated: '2020-11-21T20:27:15.000Z',
      dateModified: '2020-11-21T20:55:33.000Z',
      name: 'Note-1',
      type: 'text',
      text: '001'
    }
  }
}

/**
 * In-memory storage (mainly for testing)
 */
export class Memory extends Storage implements StorageInterface {
  public readonly name: string = 'memory'
  private _data: Record<string, any>

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
      resolve(_.values(_.get(this._data, table, {})))
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
      resolve(_.get(tbl, id))
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
      if (!_.has(tbl, element.id)) {
        _.set(tbl, element.id, element)
      } else {
        const updatedEl = _.extend(_.get(tbl, element.id), element)
        // Platform.log('UPDATED EL: ', updatedEl)
        _.set(tbl, element.id, updatedEl)
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
      if (_.has(tbl, id)) {
        _.unset(tbl, id)
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

  /**
   * @todo: this is only needed for testing so it must me moved out from here
   */
  public resetTestData (): void {
    this._data = testData
  }
}
