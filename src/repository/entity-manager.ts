import * as _ from 'lodash'
import { Entity } from '../entity/entity'
import { Memory } from '../storage/memory'
import { StorageInterface } from '../storage/storage'
import { InstanceCreator } from '../util/instance-creator'
import { Platform } from '../util/platform'

class EntityManager {
  private _storage: StorageInterface;
  private _knownEntities: Record<string, any>[];

  constructor (driver: StorageInterface) {
    this._knownEntities = []
    this.setupStorageDriver(driver)
  }

  get driver (): string {
    return this._storage.name
  }

  get storage (): StorageInterface {
    return this._storage
  }

  public async fetchAll (table: string) {
    return await this._storage.fetchAll(table)
  }

  public async fetchOne (table: string, id: number | string) {
    return await this._storage.fetchOne(table, id)
  }

  /**
   * @todo: Should convert Entity of object !!!
   * @todo: storage should NOT know about entities
   * @param table
   * @param entity
   */
  public async store (table: string, entity: Entity) {
    return await this._storage.store(table, entity)
  }

  public async delete (table: string, id: number | string) {
    return await this._storage.delete(table, id)
  }

  /**
   * This will trigger the instance creation of the specified entity which in turn will make sure that the
   * metadata (triggered by the entity decorator) is created and available for each entity
   *
   * @param entity
   */
  public registerEntity (entity: Entity) {
    if (!_.includes(this._knownEntities, entity)) {
      this._knownEntities.push(entity)
      const ic = new InstanceCreator(entity)
      const e = ic.getNewInstance({})
    }
  }

  public registerEntities (entities: any[]) {
    _.each(entities, (entity: Entity) => {
      this.registerEntity(entity)
    })
  }

  public setupStorageDriver (driver: StorageInterface) {
    this._storage = driver
  }
}

// @todo: set it to KV Driver (once it exists)
// Export a single instance
export = new EntityManager(new Memory());
