import * as _ from "lodash";
import { getMetadataStorage } from "../";
import { Platform } from "../util/platform";

/**
 * Decorator for class: Entity
 * Invoke with:
 *    @Entity(tableName)
 */
export function Entity(
  tableName: string,
  idType: string = "uuidv4",
): ClassDecorator {
  return target => {
    // Platform.log("CD[Entity](target): ", target);
    // Platform.log("CD[Entity](tableName): ", tableName);
    const metadata = {
      tableName: tableName,
      idType: idType,
      _class: target,
    };
    _.set(getMetadataStorage().entityMetadata, target.name, metadata);
  };
}
