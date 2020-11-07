/* tslint:disable:no-console */
import * as _ from "lodash";
import { getMetadataStorage } from "../";
// import { v4 as generateUUIDv4, validate as uuidValidate } from "uuid";
import { InstanceCreator } from "../util/instance-creator";
import EntityManager from "../repository/entity-manager";
import { Entity } from "../entity/entity";
import { Platform } from "../util/platform";

export class Repository {
  protected _storageTableName: string;

  /**
   * Set by the decorator based on the class the repo is decorated with @EnhancedRepository(Note)
   */
  protected _entityClass: any;
  protected _entityCreator: any;

  constructor() {
    if (this.constructor.name === "Repository") {
      throw new Error("Repository class cannot be instantiated without being extended!");
    }

    /*
    const rmd = _.get(getMetadataStorage().repositoryMetadata, this.constructor.name);
    Platform.log("TCN", Repository.name);
    this._entityClass = _.get(rmd, "entityClass");
    this._entityCreator = new InstanceCreator(this._entityClass);
    const emd = _.get(getMetadataStorage().entityMetadata, this._entityClass.name);
    // Platform.log("EMD", emd);
    this._storageTableName = _.get(emd, "tableName");
    */
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
    const storageTableName = entity.getMetadataElement("tableName")
    return await EntityManager.store(storageTableName, entity);
  }

  public async remove(entity: Entity) {
    return await EntityManager.delete(this._storageTableName, entity.id);
  }
}
