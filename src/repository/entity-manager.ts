import * as _ from "lodash";
import { v4 as generateUUIDv4 } from "uuid";
import { Entity } from "../entity/entity";
import { Memory } from "../storage/memory";
import { StorageInterface } from "../storage/storage";

// Read the config from somewhere else
const config = {
  driver: "memory",
  default_data: [
    { id: generateUUIDv4(), name: "Ficus", dateCreated: "2020-08-15" },/*
    { id: generateUUIDv4(), name: "Fityisz", type: "video", text: "hi!" },
    { id: generateUUIDv4(), name: "Kecske", type: "audio" },
    { id: generateUUIDv4(), name: "Kigyo", text: "Adi bacsi is back!" },*/
  ],
};

class EntityManager {
  private readonly _driver: string;
  private _storage: StorageInterface;

  constructor(cfg: { driver: string, default_data: any }) {
    this._driver = cfg.driver;
    this.setupStorageDriver(cfg.default_data);
  }

  get driver(): string {
    return this._driver;
  }

  get storage(): StorageInterface {
    return this._storage;
  }

  public fetchAll() {
    return this._storage.fetchAll();
  }

  public persist(entity: Entity) {
    // tslint:disable-next-line:no-console
    // console.log("EM Presisting: " + entity);
    this._storage.store(entity);
  }

  private setupStorageDriver(defaultData: []) {
    if (this._driver === "memory") {
      this._storage = new Memory(defaultData);
    } else {
      throw new Error("Unknown storage driver(" + this._driver + ")!");
    }
  }
}

// Export a single instance
export = new EntityManager(config);
