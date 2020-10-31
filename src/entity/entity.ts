import * as _ from "lodash";
import { validate as uuidValidate } from "uuid";
import { Repository } from "../repository/repository";

export class Entity {
  private readonly _idType: string;
  private _repository: Repository;
  private _isInSync: boolean;
  private _id: number | string;
  private _dateCreated: Date;
  private _dateModified: Date;

  constructor(data: any, idType: string = "uuidv4") {
    if (!_.includes(["uuidv4", "numeric"], idType)) {
      throw new Error("Id type(" + idType + ") not allowed!");
    }
    this._idType = idType;
    this.id = data.id;
    this.dateCreated = data.dateCreated;
    this.dateModified = data.dateModified;
  }

  public save(): void {
    if (!this.isInRepository()) {
      throw new Error("Not in repository!");
    }
    this.getRepository().persist(this);
  }

  public get idType(): string {
    return this._idType;
  }

  public getRepository(): Repository {
    return this._repository;
  }

  public setRepository(value: Repository) {
    this._repository = value;
  }

  public isInRepository(): boolean {
    return !_.isUndefined(this._repository);
  }

  get isInSync(): boolean {
    return this._isInSync;
  }

  set isInSync(value: boolean) {
    this._isInSync = value;
  }

  public get id(): number | string {
    return this._id;
  }

  public set id(value: number | string) {
    if (!_.isUndefined(this._id)) {
      throw new Error("Entity id cannot be changed!");
    }
    if (!_.isUndefined(value)) {
      //// expect(uuidVersion(entity.id as string)).toEqual(4);
      if (this._idType === "uuidv4" && !uuidValidate(value as string)) {
        throw new Error("Entity id must be a valid uuidv4!");
      }
      if (this._idType === "numeric" && !_.isNumber(value)) {
        throw new Error("Entity id must be numeric!");
      }
    }
    this._id = value;
  }

  public get dateCreated(): Date {
    return this._dateCreated;
  }

  public set dateCreated(value: Date) {
    const date = _.isDate(value) ? value : new Date(value);
    this._dateCreated = !isNaN(date.valueOf()) ? date : new Date();
  }

  public get dateModified(): Date {
    return this._dateModified;
  }

  public set dateModified(value: Date) {
    const date = _.isDate(value) ? value : new Date(value);
    this._dateModified = !isNaN(date.valueOf()) ? date : new Date();
  }
}
