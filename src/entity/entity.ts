import {
  v4 as generateUUIDv4,
  validate as uuidValidate,
  version as uuidVersion
} from 'uuid'
import {
  _,
  Globals,
  Repository
} from '../index'

export class Entity {
  protected entityAttributeList = ['id', 'dateCreated', 'dateModified']
  private _id: string
  private _dateCreated: Date
  private _dateModified: Date

  constructor () {
    if (this.constructor.name === 'Entity') {
      throw new Error('Entity class cannot be instantiated without being extended!')
    }
    this.setDefaultEntityData()
  }

  public async save () {
    return await this.getRepository().persist(this)
  }

  public getRepository (): Repository {
    return Globals.getMetadataStorage().getRepositoryForEntityClass(this.constructor.name)
  }

  public get id (): string {
    return this._id
  }

  public set id (value: string) {
    if (!_.isUndefined(this._id)) {
      throw new Error('Entity id cannot be changed!')
    }
    if (!_.isUndefined(value)) {
      if (!uuidValidate(value) || uuidVersion(value) !== 4) {
        throw new Error('Entity id must be a valid uuidv4!')
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
      dateCreated: this.dateCreated.toISOString(),
      dateModified: this.dateModified.toISOString()
    }
  }

  /**
   * @description: Unused but keeping it for possible future implementation
   */
  public getMetadataElement (name: string) {
    return Globals.getMetadataStorage().getMetadataElementFor('entity', this.constructor.name, name)
  }

  // @todo: Better to look into something more structured: https://github.com/sindresorhus/on-change
  protected _entityChanged () {
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
    const date = _.isDate(value) ? value : new Date(value)
    this._dateCreated = !isNaN(date.valueOf()) ? date : new Date()
  }

  private changeDateModified (value: Date) {
    const date = _.isDate(value) ? value : new Date(value)
    this._dateModified = !isNaN(date.valueOf()) ? date : new Date()
  }

  private setDefaultEntityData () {
    const defaultDate = new Date()
    this.changeDateCreated(defaultDate)
    this.changeDateModified(defaultDate)
  }

  private checkEntityId () {
    if (_.isUndefined(this.id) || !uuidValidate(this.id.toString())) {
      this.id = generateUUIDv4()
    }
  }
}
