import { Platform } from '../util/platform'
import { Storage, StorageInterface } from './storage'
import { CloudflareWorkerKV } from 'types-cloudflare-worker'
import { getPPMStorageKV } from '../global'
import * as _ from '../util/lodash'

export class KVStore extends Storage implements StorageInterface {
  public readonly name: string = 'kvstore'

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
   * Fetches all elements from the storage
   * @param table           the name of the table
   * @return Promise<any>   the list of elements
   */
  public async fetchAll (table: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const PPMStorageKV = getPPMStorageKV()
      const prefix = table + ':::'
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      PPMStorageKV.list({ prefix: prefix }).then((mylist) => {
        const promises: Promise<any>[] = []
        _.each(mylist.keys, (key) => {
          promises.push(PPMStorageKV.get(key.name, 'json'))
        })
        Promise.all(promises).then((values) => {
          Platform.log('KV List: ', JSON.stringify(values))
          resolve(values)
        }).catch((e) => {
          reject(e)
        })
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
      resolve()
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
      resolve()
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
      resolve()
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
