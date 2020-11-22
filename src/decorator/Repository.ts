import * as _ from '../util/lodash'
import { getMetadataStorage } from '../global'
import { Platform } from '../util/platform'

/**
 * Decorator for class: Repository
 *  Invoke with:
 *    @Decorator(entityClass)
 *
 *  @deprecated
 */
export function Repository (entity?: any): ClassDecorator {
  return target => {
    throw new Error('Deprecated! Repository decorator should not be used.')
    // Platform.log("CD[Repository](target.name): ", target.name);
    /*
    const metadata = {
      entityClass: entity,
      _class: target,
    };
    getMetadataStorage().setMetadataFor("repository", target.name, metadata);
    */
  }
}
