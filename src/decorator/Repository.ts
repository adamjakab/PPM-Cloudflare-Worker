import * as _ from "lodash";
import { Platform } from "../util/platform";
import { getMetadataStorage } from "../../";

/**
 * Decorator for class: Repository
 *  Invoke with:
 *    @Decorator(entityClass)
 */
export function Repository(entity?: any): ClassDecorator {
  return target => {
    Platform.log("CD[Repository](target.name): ", target.name);
    const metadata = {
      entityClass: entity,
    };
    _.set(getMetadataStorage().repositoryMetadata, target.name, metadata);

    target.prototype.___decorationMetadata___ = metadata;
    target.prototype._entityClass = entity;
  };
}
