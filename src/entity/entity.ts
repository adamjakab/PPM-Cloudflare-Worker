import * as _ from "lodash";

export class Entity {
  private readonly _idType: string;
  private _id: number | string;
  private _dateCreated: Date;
  private _dateModified: Date;

  constructor(data: any, idType: string = "uuidv4") {
    this._idType = idType;
    this.id = data.id;
    this.dateCreated = data.dateCreated;
    this.dateModified = data.dateModified;
  }

  public get idType(): string {
    return this._idType;
  }

  public get id(): number | string {
    return this._id;
  }

  public set id(value: number | string) {
    if (!_.isUndefined(this._id)) {
      throw new Error("Entity id cannot be changed!");
    }
    this._id = value;
  }

  public get dateCreated(): Date {
    return this._dateCreated;
  }

  public set dateCreated(value: Date) {
    this._dateCreated = _.isDate(value) ? value : new Date();
  }

  public get dateModified(): Date {
    return this._dateModified;
  }

  public set dateModified(value: Date) {
    this._dateModified = _.isDate(value) ? value : new Date();
  }
}
