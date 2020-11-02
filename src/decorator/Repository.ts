/* tslint:disable:no-console */
// import { Entity } from "../entity/entity";

/**
 * Decorator for class: Repository
 */
export function Repository(entity?: any): ClassDecorator {
  return target => {
    console.log("CD[Repository](target): ", target);
    console.log("CD[Repository](entity): ", entity);
  };
}
