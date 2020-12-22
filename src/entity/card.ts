import {
  _,
  EntityDecorator as EnhancedEntity,
  CardRepository,
  Entity
} from '../index'

@EnhancedEntity('cards', CardRepository)
export class Card extends Entity {
  private attributeList = ['name', 'type', 'identifier', 'text']
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
   * Map data to the entity
   * @param data    The data object
   * @param reset   True is the entity is being constructed so id and dateCreated are added to the entity
   */
  public mapDataOnEntity (data: any, reset = false) {
    data = _.isObject(data) ? data : {}
    _.each(this.attributeList, (attr) => {
      if (_.has(data, attr)) {
        _.set(this, attr, _.get(data, attr))
        // Platform.log('Setting attribute: ' + attr)
      }
    })

    super.mapDataOnEntity(data, reset)
  }
}
