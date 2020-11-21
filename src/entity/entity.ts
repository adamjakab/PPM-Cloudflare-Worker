import * as _ from 'lodash'
import { validate as uuidValidate, v4 as generateUUIDv4 } from 'uuid'

import { getMetadataStorage } from '../global'
import { Repository } from '../repository/repository'
import { Platform } from '../util/platform'

export class Entity {
  /**
   * The type of id this entity can have (an will generate when needed)
   * Set by the decorator either automatically to "uuidv4" or manually on the @Entity() decorator
   */
  private readonly _idType: string;
  private _isInSync: boolean;
  private _id: number | string;
  private _dateCreated: Date;
  private _dateModified: Date;

  constructor (data: any) {
    if (this.constructor.name === 'Entity') {
      throw new Error('Entity class cannot be instantiated without being extended!')
    }

    this._idType = this.getMetadataElement('idType')
    if (!_.includes(['uuidv4', 'numeric'], this._idType)) {
      throw new Error("Id type('" + this._idType + "') not allowed!")
    }

    this.setDefaultEntityData()
  }

  public async save () {
    return await this.getRepository().persist(this)
  }

  public get idType (): string {
    return this._idType
  }

  public getRepository (): Repository {
    return getMetadataStorage().getRepositoryForEntityClass(this.constructor.name)
  }

  /*
  public isInRepository(): boolean {
    return !_.isUndefined(this._repository);
  }
  */

  get isInSync (): boolean {
    return this._isInSync
  }

  set isInSync (value: boolean) {
    this._isInSync = value
  }

  public get id (): number | string {
    return this._id
  }

  public set id (value: number | string) {
    if (!_.isUndefined(this._id)) {
      throw new Error('Entity id cannot be changed!')
    }
    if (!_.isUndefined(value)) {
      // @todo: add v4 check:  expect(uuidVersion(entity.id as string)).toEqual(4);
      if (this._idType === 'uuidv4' && !uuidValidate(value as string)) {
        throw new Error('Entity id must be a valid uuidv4!')
      }
      if (this._idType === 'numeric' && !_.isNumber(value)) {
        throw new Error('Entity id must be numeric!')
      }
    }

    this._id = value
  }

  public get dateCreated (): Date {
    return this._dateCreated
  }

  public get dateModified (): Date {
    return this._dateModified
  }

  public getEntityData () {
    return {
      id: this.id,
      dateCreated: this.dateCreated,
      dateModified: this.dateModified
    }
  }

  public getMetadataElement (name:string) {
    return getMetadataStorage().getMetadataElementFor('entity', this.constructor.name, name)
  }

  // @todo: Better to look into something more structured: https://github.com/sindresorhus/on-change
  protected _entityChanged () {
    this.isInSync = false
    this._dateModified = new Date()
  }

  public mapDataOnEntity (data: any, reset = false) {
    data = _.isObject(data) ? data : {}
    if (reset) {
      this.id = data.id
      this.checkEntityId()
      this.changeDateCreated(data.dateCreated)
    }
    this.changeDateModified(data.dateModified)
  }

  private changeDateCreated (value: Date) {
    if (_.isUndefined(this._dateCreated)) {
      const date = _.isDate(value) ? value : new Date(value)
      this._dateCreated = !isNaN(date.valueOf()) ? date : new Date()
    }
  }

  private changeDateModified (value: Date) {
    if (_.isUndefined(this._dateModified)) {
      const date = _.isDate(value) ? value : new Date(value)
      this._dateModified = !isNaN(date.valueOf()) ? date : new Date()
    }
  }

  private setDefaultEntityData () {
    // this.id; It will be left undefined
    this.changeDateCreated(new Date())
    this.changeDateModified(new Date())
    this.isInSync = false
  }

  private checkEntityId () {
    if (this.idType === 'uuidv4') {
      if (_.isUndefined(this.id) || !uuidValidate(this.id.toString())) {
        this.id = generateUUIDv4()
      }
    } else if (this.idType === 'numeric') {
      if (_.isUndefined(this.id) || !_.isNumber(this.id)) {
        const repo = this.getRepository()
        throw Error('Not Implemented!')
        // const maxId = repo.getMaxId();
        // this.id = maxId;
      }
    }
  }
}
