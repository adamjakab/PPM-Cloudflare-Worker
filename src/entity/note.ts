import * as _ from '../util/lodash'
import { NoteRepository } from '../repository/note-repository'
import { Entity } from './entity'
import { Entity as EnhancedEntity } from '../decorator/Entity'

@EnhancedEntity('notes', NoteRepository)
export class Note extends Entity {
  private _name: string;
  private _type: string;
  private _text: string;

  constructor (data?: any) {
    super(data)
    this.mapDataOnEntity(data, true)
  }

  get name (): string {
    return this._name
  }

  set name (value: string) {
    if (value) {
      this._name = value
      this._entityChanged()
    }
  }

  get type (): string {
    return this._type
  }

  set type (value: string) {
    if (value) {
      this._type = value
      this._entityChanged()
    }
  }

  get text (): string {
    return this._text
  }

  set text (value: string) {
    if (value) {
      this._text = value
      this._entityChanged()
    }
  }

  public getEntityData () {
    return _.extend(super.getEntityData(), {
      name: this.name,
      type: this.type,
      text: this.text
    })
  }

  public toJson () {
    return JSON.stringify(this.getEntityData())
  }

  /**
   * Map data from an object to the entity
   * @param data    The data object
   * @param reset   True is the entity is being constructed / False if entity is being updated
   */
  public mapDataOnEntity (data: any, reset = false) {
    data = _.isObject(data) ? data : {}
    // the below assignments will trigger _entityChanged which will change the dateModified field
    this.name = data.name
    this.type = data.type
    this.text = data.text
    // this is why this must come after
    super.mapDataOnEntity(data, reset)
  }
}
