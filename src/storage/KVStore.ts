import { Platform } from '../util/platform'
import { Storage, StorageInterface } from './storage'
import { CloudflareWorkerKV } from 'types-cloudflare-worker'
import { getPPMStorageKV } from '../global'
import * as _ from '../util/lodash'

export class KVStore extends Storage implements StorageInterface {
  public readonly name: string = 'kvstore'

  /**
   * The storeIndex contains a reference (id) to each of the stored
   * records in the KV together with some metadata info which can be
   * searched so only specific records are retrieved.
   */
  protected storeIndex: {id:string, type:string, identifier:string}[] = []

  /*
    const PPMConfigKV = getPPMConfigKV()
    // const storageName = await PPMConfigKV.get('storageName')
    // Platform.log('StorageName: ', storageName)
    const dataKeyName = 'KVTestKey'
    let KVTestData: any = await PPMConfigKV.get(dataKeyName, 'json')
    if (_.isNull(KVTestData)) {
      KVTestData = { counter: 0, type: 'note', identificator: 'jakab.pro' }
    }
    KVTestData.counter++
    await PPMConfigKV.put(dataKeyName, JSON.stringify(KVTestData))
    Platform.log('KVTestData counter: ', KVTestData.counter)
     */

  /**
   * Fetches and stores the storeIndex
   * @param table
   */
  public async fetchIndex (table: string): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      if (_.isEmpty(this.storeIndex)) {
        const PPMStorageKV = getPPMStorageKV()
        PPMStorageKV.get('index', 'json').then((index:[]) => {
          this.storeIndex = index
          resolve(true)
        }).catch(e => {
          reject(e)
        })
      } else {
        resolve(true)
      }
    })
  }

  /**
   * Fetches all elements from the storage
   * @param table           the name of the table
   * @return Promise<any>   the list of elements
   */
  public async fetchAll (table: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fetchIndex(table).then(() => {
        const PPMStorageKV = getPPMStorageKV()
        const promises: Promise<any>[] = []
        _.each(this.storeIndex, (indexData) => {
          Platform.log('Index Data: ', JSON.stringify(indexData))
          promises.push(PPMStorageKV.get(indexData.id, 'json'))
        })
        return Promise.all(promises)
      }).then((values:any[]) => {
        const merged = _.values(_.merge(_.keyBy(values, 'id'), _.keyBy(this.storeIndex, 'id')))
        Platform.log('M1: ', JSON.stringify(merged))

        resolve(merged)
      }).catch((e) => {
        reject(e)
      })
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
      this.fetchIndex(table).then(() => {
        const PPMStorageKV = getPPMStorageKV()
        const indexData = _.find(this.storeIndex, { id: id.toString() })
        if (_.isUndefined(indexData)) {
          return reject(new Error('Requested id was not found in the table.'))
        }
        return PPMStorageKV.get(indexData.id, 'json')
      }).then((recordData:any) => {
        resolve(recordData)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  /**
   * Stores the element data in the indicated table
   * @param table             the name of the table
   * @param element           element data
   * @return Promise<number>  the ID of the stored element
   */
  public async store (table: string, element: any): Promise<any> {
    return new Promise<number>((resolve, reject) => {
      resolve(0)
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
      resolve(true)
    })
  }

  /**
   * Reset storage
   * @param defaultData
   */
  public reset (defaultData: Record<string, any> = {}): void {
    throw new Error('Not implemented!')
  }

  /**
   * Reset with test data
   */
  public resetTestData (): void {
    throw new Error('Not implemented!')
  }
}
