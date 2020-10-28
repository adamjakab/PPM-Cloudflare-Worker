/*
 * Using WebWorker library included with TypeScript
 * tsc --lib es5,webworker # or anything es5+
 *
 * https://github.com/Microsoft/TypeScript/issues/14877#issuecomment-340279293
 */
// import { CloudflareWorkerGlobalScope } from "types-cloudflare-worker";
// declare var self: CloudflareWorkerGlobalScope;
// import makeCloudflareWorkerEnv from "cloudflare-worker-mock";
import * as _ from "lodash";
import { Entity } from "../../src/entity/entity";
import { Repository } from "../../src/repository/repository";

describe("Repo", () => {
  // it("should be true", () => {
  //   expect(true).toBeTruthy();
  // });

  it("should be empty after creation", () => {
    const repo = new Repository();
    const elist = repo.getAll();
    expect(_.isArray(elist)).toBeTruthy();
    expect(_.isEmpty(elist)).toBeTruthy();
  });

  it("should not be empty after add", () => {
    const repo = new Repository();
    const d = { id: 1, name: "jack" };
    const entity = new Entity(d);
    repo.add(entity);
    const elist = repo.getAll();
    expect(_.isEmpty(elist)).toBeFalsy();
  });

  it("should return the correct count", () => {
    const repo = new Repository();
    const d = { id: 1, name: "jack" };
    const entity = new Entity(d);
    repo.add(entity);
    const elist = repo.getAll();
    expect(elist.length).toEqual(1);
    expect(repo.count()).toEqual(1);
  });

  it("should create uuidv4 id automatically", () => {
    const repo = new Repository();
    const d = { name: "jack" };
    const entity = new Entity(d);
    repo.add(entity);
    expect(entity.id).toBeDefined();
    expect(_.isString(entity.id)).toBeTruthy();
  });

  it("should return the correct entity", () => {
    const repo = new Repository();
    const d = { id: 1, name: "jack" };
    const entity = new Entity(d);
    repo.add(entity);
    const entity2 = repo.getByIndex(0);
    expect(entity2).toBeInstanceOf(Entity);
    expect(entity2).toEqual(entity);
    if (!_.isUndefined(entity2)) {
      expect(entity2.id).toEqual(entity.id);
    }
  });


});
