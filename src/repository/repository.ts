import {
  _,
  app,
  Globals,
  InstanceCreator,
  Entity
} from '../index'

export class Repository {
  // @fixme: this is not in use anymore - remove
  protected _storageTableName: string;

  // Instance creator for the entity class this repository is responsible for
  protected _entityCreator: any;

  constructor () {
    if (this.constructor.name === 'Repository') {
      throw new Error('Repository class cannot be instantiated without being extended!')
    }

    this._storageTableName = Globals.getMetadataStorage().getEntityMetadataElementForRepository(this.constructor, 'tableName')
    // Platform.log("REPO(" + this.constructor.name + ") has storage table: " + this._storageTableName);

    const entityClass = Globals.getMetadataStorage().getEntityMetadataElementForRepository(this.constructor, '_class')
    this._entityCreator = new InstanceCreator(entityClass)
  }

  get storageTableName (): string {
    return this._storageTableName
  }

  public async getIndex () {
    return await app.entityManager.fetchIndex(this._storageTableName)
  }

  public async get (id: string) {
    let data = await app.entityManager.fetchOne(this._storageTableName, id)
    if (!_.isError(data)) {
      data = this._entityCreator.getNewInstance(data)
    }
    return data
  }

  /**
   * Persists the entity in the store
   *
   * @param entity
   */
  public async persist (entity: Entity) {
    return await app.entityManager.store(this._storageTableName, entity.getEntityData())
  }

  /**
   * Deletes the entity from the store and returns true if successful / false if failed
   *
   * @param entity
   */
  public async remove (entity: Entity) {
    return await app.entityManager.delete(this._storageTableName, entity.id.toString())
  }
}
