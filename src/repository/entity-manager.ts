import * as _ from "lodash";
import { Entity } from "../entity/entity";
import { Memory } from "../storage/memory";
import { StorageInterface } from "../storage/storage";

class EntityManager {
  private _storage: StorageInterface;

  constructor(driver: StorageInterface) {
    this.setupStorageDriver(driver);
  }

  get driver(): string {
    return this._storage.name;
  }

  get storage(): StorageInterface {
    return this._storage;
  }

  public async fetchAll(table: string) {
    return await this._storage.fetchAll(table);
  }

  public persist(table: string, entity: Entity) {
    // tslint:disable-next-line:no-console
    // console.log("EM Presisting: " + entity);
    this._storage.store(table, entity);
  }

  public setupStorageDriver(driver: StorageInterface) {
    this._storage = driver;
  }
}

// @todo: set it to KV Driver (once it exists)
// Export a single instance
export = new EntityManager(new Memory());
