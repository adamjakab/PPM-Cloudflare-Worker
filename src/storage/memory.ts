import * as _ from "lodash";
import { Storage, StorageInterface } from "./storage";

/**
 * In-memory storage (mainly for testing)
 */
export class Memory extends Storage implements StorageInterface {
  public readonly name: string = "memory";
  private _data: {};

  constructor(defaultData: {} = {}) {
    super();
    this.reset(defaultData);
  }

  public async fetchAll(table: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!_.has(this._data, table)) {
        reject(new Error("Unknown storage table: " + table));
      }
      resolve(_.get(this._data, table, []));
    });
  }

  /**
   * Fetches a single element by ID
   * @param table           the name of the table
   * @param id              the ID of the element to fetch
   * @return Promise<any>   the element if found or undefined
   */
  public async fetchOne(table: string, id: number | string): Promise<any> {
    return new Promise<number>((resolve, reject) => {
      if (!_.has(this._data, table)) {
        reject(new Error("Unknown storage table: " + table));
      }
      const tbl = _.get(this._data, table, []);
      resolve(_.find(tbl, { id: id }));
    });
  }

  /**
   * Stores the element data in the indicated table
   * @param table             the name of the table
   * @param element           element data
   * @return Promise<number>  the ID of the stored element
   */
  public async store(table: string, element: any): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (!_.has(this._data, table)) {
        reject(new Error("Unknown storage table: " + table));
      }
      if (!_.has(element, "id")) {
        reject(new Error("Element does not have an id!"));
      }
      const tbl = _.get(this._data, table, []);
      const exEl = _.find(tbl, { id: element.id });
      if (_.isUndefined(exEl)) {
        tbl.push(element);
      } else {
        _.extend(exEl, element);
      }
      resolve(element.id);
    });
  }

  /**
   * Reset memory storage
   * @param defaultData
   */
  public reset(defaultData: {} = {}): void {
    this._data = defaultData;
  }
}
