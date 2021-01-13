import {
  _,
  app,
  Globals,
  InstanceCreator,
  Entity
} from '../index'

export class Repository {
  // Instance creator for the entity class this repository is responsible for
  protected _entityCreator: any;

  constructor () {
    if (this.constructor.name === 'Repository') {
      throw new Error('Repository class cannot be instantiated without being extended!')
    }

    const entityClass = Globals.getMetadataStorage().getEntityMetadataElementForRepository(this.constructor, '_class')
    this._entityCreator = new InstanceCreator(entityClass)
  }

  public async getIndex () {
    return await app.entityManager.fetchIndex()
  }

  public async get (id: string) {
    let data = await app.entityManager.fetchOne(id)
    if (!_.isError(data)) {
      data = this._entityCreator.getNewInstance(data)
    }
    return data
  }

  /**
   * Persists the entity in the store
   */
  public async persist (entity: Entity) {
    return await app.entityManager.store(entity.getEntityData())
  }

  /**
   * Deletes the entity from the store and returns true if successful / false if failed
   */
  public async remove (entity: Entity) {
    return await app.entityManager.delete(entity.id.toString())
  }
}
