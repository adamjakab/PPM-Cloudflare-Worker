import * as _ from 'lodash'
import { getMetadataStorage } from '../'
import { Platform } from '../util/platform'

/**
 * Decorator for class: Entity
 * Invoke with:
 *    @Entity(tableName, repository)
 */
export function Entity (
  tableName: string,
  repository: any,
  idType = 'uuidv4'
): ClassDecorator {
  return target => {
    // Platform.log("CD[Entity](target): ", target);
    // Platform.log("CD[Entity](tableName): ", tableName);
    const metadata = {
      tableName: tableName,
      repository: repository,
      idType: idType,
      _class: target
    }
    getMetadataStorage().setMetadataFor('entity', target.name, metadata)
  }
}
