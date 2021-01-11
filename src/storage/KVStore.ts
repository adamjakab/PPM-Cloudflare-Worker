import { CloudflareWorkerKV } from 'types-cloudflare-worker'
import {
  _,
  Globals,
  Platform,
  StorageIndexItem
} from '../index'

/**
 * @class KVStore
 * @description Dedicated to execute operations on the CF KV Storage
 */
export class KVStore {
  /**
   * Contains a reference to each of the stored items in the KV
   * together with some metadata info.
   */
  protected storeIndex: StorageIndexItem[]

  /**
   * Fetches and stores the storeIndex("index")
   */
  public async fetchIndex (): Promise<StorageIndexItem[]> {
    return new Promise<StorageIndexItem[]>((resolve, reject) => {
      if (_.isUndefined(this.storeIndex)) {
        const PPMStorageKV = Globals.getPPMStorageKV()
        PPMStorageKV.get('index', 'json').then((index:StorageIndexItem[]) => {
          if (_.isNull(index)) {
            index = []
          }
          this.storeIndex = index
          resolve(index)
        }).catch((e) => {
          reject(e)
        })
      } else {
        resolve(this.storeIndex)
      }
    })
  }

  /**
   * Fetches a single element by ID
   * @param id              the ID of the element to fetch
   * @return Promise<any>   the element if found or undefined
   */
  public async fetchOne (id: string): Promise<any> {
    return new Promise<number>((resolve, reject) => {
      this.fetchIndex().then(() => {
        const PPMStorageKV = Globals.getPPMStorageKV()
        const indexData = _.find(this.storeIndex, { id: id })
        if (_.isUndefined(indexData)) {
          throw new Error('Requested id was not found!')
        }
        return PPMStorageKV.get(indexData.id, 'json')
      }).then((recordData:any) => {
        if (_.isNull(recordData)) {
          throw new Error('Bad Data! Requested id is present in the index but no item by that id was not found!')
        }
        resolve(recordData)
      }).catch((e) => {
        reject(e)
      })
    })
  }

  /**
   * Stores the element and adds it to the index
   * @param element           element data
   * @return Promise<void>
   */
  public async store (element: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const PPMStorageKV = Globals.getPPMStorageKV()
      this.checkElement(element, ['id', 'name', 'type', 'identifier']).then(() => {
        return PPMStorageKV.put(element.id, JSON.stringify(element))
      }).then(() => {
        return this.addToIndex(element)
      }).then(() => {
        resolve()
      }).catch((e) => {
        reject(e)
      })
    })
  }

  /**
   * Deletes a single element by ID
   * @param id                  the ID of the element to delete
   * @return Promise<boolean>   true if the element was deleted
   */
  public async delete (id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.deleteFromIndex(id).then(() => {
        const PPMStorageKV = Globals.getPPMStorageKV()
        return PPMStorageKV.delete(id)
      }).then(() => {
        resolve()
      }).catch((e) => {
        reject(e)
      })
    })
  }

  protected async addToIndex (element: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.checkElement(element, ['id', 'name', 'type', 'identifier']).then(() => {
        return this.fetchIndex()
      }).then(() => {
        // Update index data
        const indexData = {
          id: element.id,
          name: element.name,
          type: element.type,
          identifier: element.identifier
        }
        const i = _.findIndex(this.storeIndex, { id: element.id })
        if (i === -1) {
          this.storeIndex.push(indexData)
        } else {
          _.extend(this.storeIndex[i], indexData)
        }

        const PPMStorageKV = Globals.getPPMStorageKV()
        return PPMStorageKV.put('index', JSON.stringify(this.storeIndex))
      }).then(() => {
        resolve()
      }).catch((e) => {
        reject(e)
      })
    })
  }

  protected async deleteFromIndex (id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (_.isUndefined(id) || _.isEmpty(id)) {
        return reject(new Error('Storage cannot delete from index - missing "id"!'))
      }

      this.fetchIndex().then(() => {
        const i = _.findIndex(this.storeIndex, { id: id })
        if (i === -1) {
          return reject(new Error('Storage cannot delete from index - "id" not found!'))
        } else {
          _.pullAt(this.storeIndex, [i])
        }

        const PPMStorageKV = Globals.getPPMStorageKV()
        return PPMStorageKV.put('index', JSON.stringify(this.storeIndex))
      }).then(() => {
        resolve()
      }).catch((e) => {
        reject(e)
      })
    })
  }

  private checkElement (element: any, attributes: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let error:any = false
      _.each(attributes, (attribute) => {
        if (_.isNull(_.get(element, attribute, null))) {
          error = new Error('Storage cannot add to index - missing "' + attribute + '"!')
          return false
        } else {
          return true
        }
      })
      if (error) {
        return reject(error)
      }
      resolve()
    })
  }
}
