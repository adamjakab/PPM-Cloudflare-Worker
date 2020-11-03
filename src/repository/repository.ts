/* tslint:disable:no-console */
import * as _ from "lodash";
// import { v4 as generateUUIDv4, validate as uuidValidate } from "uuid";
import { InstanceCreator } from "../util/instance-creator";
import EntityManager from "../repository/entity-manager";
import { Entity } from "../entity/entity";

export class Repository {
  protected _storageTableName: string;

  /**
   * Set by the decorator based on the class the repo is decorated with @EnhancedRepository(Note)
   */
  protected _entityClass: any;
  protected _entityCreator: any;

  constructor() {
    this._entityCreator = new InstanceCreator(this._entityClass);
    this._storageTableName = this._entityClass.prototype.___decorationMetadata___.tableName;
    // console.log("constructor(_entityClass): ", this._entityClass);
    // console.log("constructor(_storageTableName): ", this._storageTableName);
  }

  get storageTableName(): string {
    return this._storageTableName;
  }

  public async getAll() {
    const storageData = await EntityManager.fetchAll(this._storageTableName);
    const entities: any[] = [];
    _.each(storageData, sd => {
      const entity = this._entityCreator.getNewInstance(sd);
      entities.push(entity);
    });
    return entities;
  }

  public async get(id: number | string) {
    return await EntityManager.fetchOne(this._storageTableName, id);
  }

  public async persist(entity: Entity) {
    return await EntityManager.store(this._storageTableName, entity);
  }

  public async remove(entity: Entity) {
    return await EntityManager.delete(this._storageTableName, entity.id);
  }

  /*private checkEntityId(entity: Entity) {
    if (entity.idType === "uuidv4") {
      if (_.isUndefined(entity.id) || !uuidValidate(entity.id.toString())) {
        entity.id = generateUUIDv4();
      }
    } else if (entity.idType === "numeric") {
      if (_.isUndefined(entity.id) || !_.isNumber(entity.id)) {
        const maxElement = _.maxBy(this._items, "id");
        entity.id = _.isUndefined(maxElement)
          ? 0
          : (maxElement.id as number) + 1;
      }
    }
  }*/
}
