import * as _ from "lodash";
import { Storage, StorageInterface } from "./storage";

/**
 * In-memory storage (mainly for testing)
 */
export class Memory extends Storage implements StorageInterface {
  public readonly name: string = "memory";
  private _data: object[];

  constructor(defaultData: [] = []) {
    super();
    this.reset(defaultData);
  }

  public fetchAll(): any {
    return this._data;
  }

  public fetchOneById(id: string): any {
    return _.find(this._data, { id: id });
  }

  public store(element: any): boolean {
    let exEl = _.find(this._data, { id: element.id });
    if (_.isUndefined(exEl)) {
      this._data.push(element);
    } else {
      exEl = element;
    }
    return true;
  }

  /**
   *
   * @param {[]} defaultData
   */
  public reset(defaultData: [] = []) {
    this._data = defaultData;
  }
}
