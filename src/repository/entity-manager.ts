import {
  _,
  Entity,
  KVStore,
  InstanceCreator,
  Platform
} from '../index'

export class EntityManager {
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

  get storage (): KVStore {
    return this._storage
  }

  public async fetchIndex () {
    try {
      return await this._storage.fetchIndex()
    } catch (e) {
      Platform.log('EM fetchIndex error: ', e)
      return e
    }
  }

  public async fetchOne (id: string) {
    try {
      return await this._storage.fetchOne(id)
    } catch (e) {
      Platform.log('EM fetchOne error: ', e)
      return e
    }
  }

  public async store (entity: any) {
    try {
      return await this._storage.store(entity)
    } catch (e) {
      Platform.log('EM store error: ', e)
      return e
    }
  }

  public async delete (id: string) {
    try {
      return await this._storage.delete(id)
    } catch (e) {
      Platform.log('EM delete error: ', e)
      return e
    }
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
      const e = ic.getNewInstance({
        id: this.fakeUuidV4,
        name: 'fake',
        type: 'fake',
        identifier: 'fake'
      })
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
