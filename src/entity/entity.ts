import * as _ from "lodash";
import { validate as uuidValidate } from "uuid";
import { getMetadataStorage } from "../";
import { Repository } from "../repository/repository";
import { Platform } from "../util/platform";

export class Entity {
  /**
   * The type of id this entity can have (an will generate when needed)
   * Set by the decorator either automatically to "uuidv4" or manually on the @Entity() decorator
   */
  private readonly _idType: string;
  private _repository: Repository;
  private _isInSync: boolean;
  private _id: number | string;
  private _dateCreated: Date;
  private _dateModified: Date;

  constructor(data: any) {
    if (this.constructor.name === "Entity") {
      throw new Error("Entity class cannot be instantiated without being extended!");
    }

    this._idType = this.getMetadataElement("idType");
    if (!_.includes(["uuidv4", "numeric"], this._idType)) {
      throw new Error("Id type('" + this._idType + "') not allowed!");
    }

    //
    data = _.isObject(data) ? data : {};
    this.id = data.id;
    this.changeDateCreated(data.dateCreated);
    this.changeDateModified(data.dateModified);
    this.isInSync = true;
  }

  public async save() {
    return await this.getRepository().persist(this);
  }

  public get idType(): string {
    return this._idType;
  }

  public getRepository(): Repository {
    return getMetadataStorage().getRepositoryForEntityClass(this.constructor.name)
  }

  /*
  public isInRepository(): boolean {
    return !_.isUndefined(this._repository);
  }
  */

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

  public get dateModified(): Date {
    return this._dateModified;
  }

  public getMetadataElement(name:string) {
    return getMetadataStorage().getMetadataElementFor("entity", this.constructor.name, name);
  }

  // @todo: Better look into something more serious: https://github.com/sindresorhus/on-change
  protected _entityChanged() {
    this.isInSync = false;
    this._dateModified = new Date();
  }

  private changeDateCreated(value: Date) {
    if (_.isUndefined(this._dateCreated)) {
      const date = _.isDate(value) ? value : new Date(value);
      this._dateCreated = !isNaN(date.valueOf()) ? date : new Date();
    }
  }

  private changeDateModified(value: Date) {
    if (_.isUndefined(this._dateModified)) {
      const date = _.isDate(value) ? value : new Date(value);
      this._dateModified = !isNaN(date.valueOf()) ? date : new Date();
    }
  }
}
