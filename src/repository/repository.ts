import * as _ from "lodash";
import { Entity } from "../entity/entity";

export class Repository {
  private _items: Entity[] = [];
  private _maxid = 0;

  public getAll() {
    return this._items;
  }

  public count() {
    return this._items.length;
  }

  public get(id: number) {
    return _.find(this._items, { id: id });
  }

  public add(entity: Entity) {
    if (_.isUndefined(entity.id)) {
      entity.id = this._maxid;
    }
    if (entity.id >= this._maxid) {
      this._maxid = entity.id + 1;
    }
    this._items.push(entity);
  }
}
