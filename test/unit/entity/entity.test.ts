/* tslint:disable:no-console */
import * as _ from 'lodash'
import { v4 as generateUUIDv4 } from 'uuid'
import { Entity } from '../../../src/entity/entity'
import { Repository } from '../../../src/repository/repository'

/**
 * @group unit/entity
 */
describe('Entity', () => {
  it('should not be possible to instantiate', () => {
    expect(() => {
      const entity = new Entity({})
    }).toThrow(/Entity class cannot be instantiated/)
  })

  /*
  it("should have idType 'uuidv4' by default", () => {
    const entity = new Entity({});
    expect(entity.idType).toEqual("uuidv4");
  });

  it("should have idType 'numeric' when requested", () => {
    const entity = new Entity({});
    expect(entity.idType).toEqual("numeric");
  });

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
