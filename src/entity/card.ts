import * as _ from '../util/lodash'
import { CardRepository } from '../repository/card.repository'
import { Entity } from './entity'
import { Entity as EnhancedEntity } from '../decorator/Entity'

@EnhancedEntity('cards', CardRepository)
export class Card extends Entity {
  private _name: string;
  private _type: string;
  private _identifier: string;
  private _text: string;

  constructor (data?: any) {
    super()
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

  public get identifier (): string {
    return this._identifier
  }

  public set identifier (value: string) {
    this._identifier = value
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
      identifier: this.identifier,
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
    this.identifier = data.identifier
    this.text = data.text
    // this is why this must come after
    super.mapDataOnEntity(data, reset)
  }
}
