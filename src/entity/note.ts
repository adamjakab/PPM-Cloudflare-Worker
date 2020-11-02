import * as _ from "lodash";
import { Entity } from "./entity";
import { Entity as EnhancedEntity } from "../decorator/Entity";

@EnhancedEntity("notes")
export class Note extends Entity {
  private _name: string;
  private _type: string;
  private _text: string;

  constructor(data?: any) {
    data = _.isObject(data) ? data : {};
    super(data);
    this.name = data.name;
    this.type = data.type;
    this.text = data.text;
    this.isInSync = true;
  }

  public save(): void {
    super.save();
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
    this._entityChanged();
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
    this._entityChanged();
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
    this._entityChanged();
  }
}
