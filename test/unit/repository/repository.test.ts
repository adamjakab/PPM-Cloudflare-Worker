/* tslint:disable:no-console */
import * as _ from 'lodash'
import {
  v4 as generateUUIDv4,
  validate as uuidValidate,
  version as uuidVersion
} from 'uuid'
import { getRandomString } from '../../../src/util/utils'
import { Entity } from '../../../src/entity/entity'
import { Repository } from '../../../src/index'

/**
 * @group unit/repository
 */
describe('Repository', () => {
  it('should not be possible to instantiate', () => {
    expect(() => {
      const repo = new Repository()
    }).toThrow(/Repository class cannot be instantiated/)
  })

  /*
  it("should not be empty after add", () => {
    const repo = new Repository();
    const d = { name: getRandomString() };
    const entity = new Entity(d);
    repo.add(entity);
    const entityList = repo.getAll();
    expect(_.isEmpty(entityList)).toBeFalsy();
  });

  it("should return the correct count", () => {
    const repo = new Repository();
    const cnt = Math.floor(Math.random() * 128);
    for (let i = 0; i < cnt; i++) {
      repo.add(new Entity({ name: getRandomString() }));
    }
    const entityList = repo.getAll();
    expect(entityList.length).toEqual(cnt);
    expect(repo.count()).toEqual(cnt);
  });

  it("should create id(uuidv4) automatically", () => {
    const repo = new Repository();
    const d = { name: getRandomString() };
    const entity = new Entity(d);
    repo.add(entity);
    expect(entity.id).toBeDefined();
    expect(_.isString(entity.id)).toBeTruthy();
    expect(uuidValidate(entity.id as string)).toBeTruthy();
    expect(uuidVersion(entity.id as string)).toEqual(4);
  });

  it("should create id(numeric) automatically", () => {
    const repo = new Repository();
    const d = { name: getRandomString() };
    const entity = new Entity(d, "numeric");
    repo.add(entity);
    expect(entity.id).toBeDefined();
    expect(_.isNumber(entity.id)).toBeTruthy();
    expect(entity.id).toEqual(0);
    //
    const entity2 = new Entity(d, "numeric");
    repo.add(entity2);
    expect(entity2.id).toBeDefined();
    expect(_.isNumber(entity2.id)).toBeTruthy();
    expect(entity2.id).toEqual(1);
  });

  it("should return the correct entity by index", () => {
    const repo = new Repository();
    const d = { name: getRandomString() };
    const entity = new Entity(d);
    repo.add(entity);
    //
    const entity2 = repo.getByIndex(0);
    expect(entity2).toBeInstanceOf(Entity);
    expect(entity2).toMatchObject(entity);
    expect(entity2).toEqual(entity);
  });

  it("should return the correct entity by id", () => {
    const repo = new Repository();
    const id = generateUUIDv4();
    const d = { id: id, name: getRandomString() };
    const entity = new Entity(d);
    repo.add(entity);
    //
    const entity2 = repo.get(id);
    expect(entity2).toBeInstanceOf(Entity);
    expect(entity2).toMatchObject(entity);
    expect(entity2).toEqual(entity);
  });

  it("should delete the correct entity by id", () => {
    const repo = new Repository();
    const e1 = new Entity({ name: getRandomString() });
    repo.add(e1);
    const e2 = new Entity({ name: getRandomString() });
    repo.add(e2);
    const e3 = new Entity({ name: getRandomString() });
    repo.add(e3);
    //
    const id = e2.id;
    const removed = _.first(repo.delete(id));
    //
    expect(removed).toMatchObject(e2);
    expect(removed).toEqual(e2);
    //
    expect(repo.count()).toEqual(2);
    const entityList = repo.getAll();
    expect(entityList.length).toEqual(2);
    //
    expect(entityList[0]).toMatchObject(e1);
    expect(entityList[0]).toEqual(e1);
    //
    expect(entityList[1]).toMatchObject(e3);
    expect(entityList[1]).toEqual(e3);
  });
   */
})
