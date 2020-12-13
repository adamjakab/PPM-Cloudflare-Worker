/* tslint:disable:no-console */
import * as _ from 'lodash'
import { Card } from '../../../src/entity/card'
import { Entity } from '../../../src/entity/entity'
// import { delay } from '../../../src/util/utils'

/**
 * @group unit/entity
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
})
