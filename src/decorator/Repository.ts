import * as _ from "lodash";
import { getMetadataStorage } from "../";
import { Platform } from "../util/platform";

/**
 * Decorator for class: Repository
 *  Invoke with:
 *    @Decorator(entityClass)
 */
export function Repository(entity?: any): ClassDecorator {
  return target => {
    // Platform.log("CD[Repository](target.name): ", target.name);
    const metadata = {
      entityClass: entity,
      _class: target,
    };
    _.set(getMetadataStorage().repositoryMetadata, target.name, metadata);
  };
}
