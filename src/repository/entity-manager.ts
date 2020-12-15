import * as _ from '../util/lodash'
import { Entity } from '../entity/entity'
// import { StorageInterface } from '../storage/storage'
import { KVStore } from '../storage/KVStore'
import { InstanceCreator } from '../util/instance-creator'
import { Platform } from '../util/platform'

class EntityManager {
  /**
   * About using a fake uuid
   * UUID v4 generation requires random rng call wich will throw this error if called during startup:
   * "Error: Some functionality, such as asynchronous I/O, timeouts, and generating random values,
   * can only be performed while handling a request."
   */
  private fakeUuidV4 = '00000000-0000-4000-8000-000000000000'

  private _storage: KVStore;
  private readonly _knownEntities: Record<string, any>[];

  constructor () {
    this._knownEntities = []
  }

  get driver (): string {
    return this._storage.name
  }

  get storage (): KVStore {
    return this._storage
  }

  public async fetchIndex (table: string) {
    return await this._storage.fetchIndex()
  }

  public async fetchAll (table: string) {
    return await this._storage.fetchAll(table)
  }

  public async fetchOne (table: string, id: number | string) {
    return await this._storage.fetchOne(table, id)
  }

  /**
   * @param table
   * @param entity
   */
  public async store (table: string, entity: any) {
    return await this._storage.store(table, entity)
  }

  /**
   * @param table
   * @param id
   */
  public async delete (table: string, id: string) {
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
      const e = ic.getNewInstance({ id: this.fakeUuidV4 })
    }
  }

  public registerEntities (entities: any[]) {
    _.each(entities, (entity: Entity) => {
      this.registerEntity(entity)
    })
  }

  public setupStorageDriver (driver: KVStore) {
    this._storage = driver
  }
}

// @todo: set it to KV Driver (once it exists)
// Export a single instance
export = new EntityManager();
