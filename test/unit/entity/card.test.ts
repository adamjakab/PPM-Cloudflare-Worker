import { setupTestEnvironment } from '../../helper/test.app.setup'
import * as _ from 'lodash'

/**
 * @group unit/entity
 * @group _incomplete
 */
describe('Card(Entity)', () => {
  let appIndex: any, ppmConfig: any, ppmStorage: any
  beforeEach(() => {
    return new Promise<void>((resolve, reject) => {
      setupTestEnvironment().then((envData) => {
        appIndex = envData.appIndex
        ppmConfig = envData.ppmConfig
        ppmStorage = envData.ppmStorage
        resolve()
      })
    })
  })

  it('should be instance of Entity', () => {
    const data = {
      name: 'card-1',
      type: 'note',
      identifier: 'own',
      text: 'Remember to brush your teeth.'
    }
    const card = new appIndex.Card(data)
    expect(card).toBeInstanceOf(appIndex.Entity)
  })

  it('should have default attributes', () => {
    const data = {
      name: 'card-1',
      type: 'note',
      identifier: 'own',
      text: 'Remember to brush your teeth.'
    }
    const card = new appIndex.Card(data)
    const attrs = _.keys(data)
    _.each(attrs, attr => {
      expect(card).toHaveProperty(attr)
    })
  })

  it('should set the default attributes passed to the constructor', () => {
    const data = {
      name: 'card-1',
      type: 'note',
      identifier: 'own',
      text: 'Remember to brush your teeth.'
    }
    const card = new appIndex.Card(data)
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
    const card = new appIndex.Card(data)
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
    const card = new appIndex.Card(data)
    const entityData = card.getEntityData()
    expect(card.toJson()).toEqual(JSON.stringify(entityData))
  })
})
