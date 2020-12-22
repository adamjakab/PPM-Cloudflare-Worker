import {
  _,
  Globals,
  InstanceCreator,
  EntityManager,
  Entity
} from '../index'

export class Repository {
  protected _storageTableName: string;

  /**
   * Instance creator for the entity class this repository is responsible for
   */
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
    return await EntityManager.fetchIndex(this._storageTableName)
  }

  public async getAll () {
    const storageData = await EntityManager.fetchAll(this._storageTableName)

    const entities: any[] = []
    _.each(storageData, sd => {
      const entity = this._entityCreator.getNewInstance(sd)
      entities.push(entity)
    })

    return entities
  }

  public async get (id: string) {
    const data = await EntityManager.fetchOne(this._storageTableName, id)
    return data ? this._entityCreator.getNewInstance(data) : undefined
  }

  /**
   * Persists the entity in the store and returns the id of the element
   *
   * @param entity
   */
  public async persist (entity: Entity) {
    return await EntityManager.store(this._storageTableName, entity.getEntityData())
  }

  /**
   * Deletes the entity from the store and returns true if successful / false if failed
   *
   * @param entity
   */
  public async remove (entity: Entity) {
    return await EntityManager.delete(this._storageTableName, entity.id.toString())
  }
}
