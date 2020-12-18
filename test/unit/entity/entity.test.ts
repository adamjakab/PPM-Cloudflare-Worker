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
 * @group incomplete
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

  /*

  it("should throw an error on unknown idType", () => {
    expect(() => {
      // @ts-ignore
      const entity = new Entity({});
    }).toThrow(/not allowed/);
  });

  it("should not have an id if not assigned", () => {
    const entity = new Entity({});
    expect(entity.id).toBeUndefined();
  });

  it("should have the assigned id (uuidv4)", () => {
    const id = generateUUIDv4();
    const entity = new Entity({ id: id });
    expect(entity.id).toBeDefined();
    expect(entity.id).toEqual(id);
  });

  it("should have the assigned id (numeric)", () => {
    const id = 123;
    const entity = new Entity({ id: id });
    expect(entity.id).toBeDefined();
    expect(entity.id).toEqual(id);
  });

  it("should not be possible to change id", () => {
    const entity = new Entity({});
    entity.id = generateUUIDv4();
    expect(() => {
      entity.id = generateUUIDv4();
    }).toThrow(/cannot be changed/);
  });

  it("should have a creation date", () => {
    // Auto
    let entity = new Entity({});
    expect(entity.dateCreated).toBeDefined();
    expect(entity.dateCreated).toBeInstanceOf(Date);
    // Manual
    const newDate = new Date("2020-10-15 12:35:11");
    entity = new Entity({ dateCreated: newDate });
    expect(entity.dateCreated).toBeDefined();
    expect(entity.dateCreated).toBeInstanceOf(Date);
    expect(entity.dateCreated).toEqual(newDate);
  });

  it("should be created with modification dates", () => {
    // Auto
    let entity = new Entity({});
    expect(entity.dateModified).toBeDefined();
    expect(entity.dateModified).toBeInstanceOf(Date);
    // Manual
    const newDate = new Date("2020-10-15 12:35:11");
    entity = new Entity({ dateModified: newDate });
    expect(entity.dateModified).toBeDefined();
    expect(entity.dateModified).toBeInstanceOf(Date);
    expect(entity.dateModified).toEqual(newDate);
  });

  it("should be in sync after creation", () => {
    const entity = new Entity({});
    expect(entity.isInSync).toBeTruthy();
  });
   */
})
