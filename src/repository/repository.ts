import * as _ from "lodash";
import { v4 as generateUUIDv4, validate as uuidValidate } from "uuid";
import { Entity } from "../entity/entity";

export class Repository {
  private _items: Entity[] = [];

  public getAll() {
    return this._items;
  }

  public count() {
    return this._items.length;
  }

  public get(id: number | string) {
    return _.find(this._items, { id: id });
  }

  public getByIndex(index: number) {
    return this._items[index];
  }

  public delete(id: number | string) {
    let i;
    let e;
    for (i = 0; i < this.count(); i++) {
      e = this.getByIndex(i);
      if (e.id === id) {
        break;
      }
    }
    return _.pullAt(this._items, i);
  }

  public add(entity: Entity) {
    this.checkEntityId(entity);
    this._items.push(entity);
  }

  private checkEntityId(entity: Entity) {
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
  }
}
