/* tslint:disable:no-console */
import {
  _,
  Card,
  Entity
} from '../../../src/index'

/**
 * @group unit/entity
 * @group _incomplete
 */
describe('Card(Entity)', () => {
  it('should be instance of Entity', () => {
    const card = new Card({})
    expect(card).toBeInstanceOf(Entity)
  })

  it('should have default attributes', () => {
    const card = new Card({})
    const attrs = ['name', 'type', 'identifier', 'text']
    _.each(attrs, attr => {
      expect(card).toHaveProperty(attr)
      expect(_.get(card, attr)).toBeUndefined()
    })
  })

  it('should set the default attributes passed to the constructor', () => {
    const data = {
      name: 'card-1',
      type: 'note',
      identifier: 'own',
      text: 'Remember to brush your teeth.'
    }
    const card = new Card(data)
    _.each(data, (v: any, k: string) => {
      expect(_.get(card, k)).toEqual(v)
    })
  })

  it('[getEntityData] should return all properties of the entity', () => {
    const data = {
      name: 'card-1',
      type: 'note',
      identifier: 'test',
      text: 'abc'
    }
    const card = new Card(data)
    const entityData = card.getEntityData()
    expect(entityData).toBeInstanceOf(Object)
    expect(entityData.id).toBeDefined()
    expect(entityData.dateCreated).toBeDefined()
    expect(entityData.dateModified).toBeDefined()
    _.each(data, (v: any, k: string) => {
      expect(_.get(entityData, k)).toEqual(v)
    })
  })

  it('[getEntityData] should return all properties of the entity', () => {
    const data = {
      name: 'card-1',
      type: 'note',
      identifier: 'test',
      text: 'abc'
    }
    const card = new Card(data)
    const entityData = card.getEntityData()
    expect(card.toJson()).toEqual(JSON.stringify(entityData))
  })
})
