/* tslint:disable:no-console */
import * as _ from 'lodash'
import { v1 as generateUUIDv1, v4 as generateUUIDv4 } from 'uuid'
import { Entity as EnhancedEntity } from '../../../src/decorator/Entity'
import { Entity } from '../../../src/entity/entity'
import { Repository } from '../../../src/repository/repository'

const getTestEntity = () => {
  class TestRepository extends Repository {}
  @EnhancedEntity('testentity', TestRepository)
  class TestEntity extends Entity {}
  return new TestEntity()
}

/**
 * @group unit/entity
 * @group _incomplete
 */
describe('Entity', () => {
  it('should not be possible to instantiate directly', () => {
    expect(() => {
      const entity = new Entity()
    }).toThrow(/Entity class cannot be instantiated/)
  })

  it('should initiate with creation and modification dates', () => {
    const te = getTestEntity()
    expect(te).toBeInstanceOf(Entity)
    expect(te.id).toBeUndefined()
    expect(te.dateCreated).toBeInstanceOf(Date)
    expect(te.dateModified).toBeInstanceOf(Date)
    expect(te.dateCreated).toEqual(te.dateModified)
  })

  it('should throw an error when changing id', () => {
    const te = getTestEntity()
    te.id = generateUUIDv4()
    expect.assertions(1)
    try {
      te.id = generateUUIDv4()
    } catch (e) {
      expect(e.message).toBe('Entity id cannot be changed!')
    }
  })

  it('should throw an error when id is not a valid UUID', () => {
    const te = getTestEntity()
    expect.assertions(1)
    try {
      te.id = 'abc'
    } catch (e) {
      expect(e.message).toBe('Entity id must be a valid uuidv4!')
    }
  })

  it('should throw an error when id is not a valid UUIDv4', () => {
    const te = getTestEntity()
    expect.assertions(1)
    try {
      te.id = generateUUIDv1()
    } catch (e) {
      expect(e.message).toBe('Entity id must be a valid uuidv4!')
    }
  })

  it('should return default entity data', () => {
    const te = getTestEntity()
    const data = te.getEntityData()
    expect(data).toBeInstanceOf(Object)
    expect(data).toHaveProperty('id')
    expect(_.get(data, 'id')).toBeUndefined()
    expect(data).toHaveProperty('dateCreated')
    expect(_.get(data, 'dateCreated')).toEqual(te.dateCreated.toISOString())
    expect(data).toHaveProperty('dateModified')
    expect(_.get(data, 'dateModified')).toEqual(te.dateModified.toISOString())
  })

  it('should return modified entity data', () => {
    const te = getTestEntity()
    te.id = generateUUIDv4()
    const data = te.getEntityData()
    expect(data).toBeInstanceOf(Object)
    expect(data).toHaveProperty('id')
    expect(_.get(data, 'id')).toEqual(te.id)
    expect(data).toHaveProperty('dateCreated')
    expect(_.get(data, 'dateCreated')).toEqual(te.dateCreated.toISOString())
    expect(data).toHaveProperty('dateModified')
    expect(_.get(data, 'dateModified')).toEqual(te.dateModified.toISOString())
  })
})
