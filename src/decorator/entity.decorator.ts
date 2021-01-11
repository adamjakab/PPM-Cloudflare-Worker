import { Globals } from '../index'

/**
 * Decorator for class: Entity
 * Invoke with:
 *    @EntityDecorator(repository)
 */
export function EntityDecorator (
  repository: any
): ClassDecorator {
  return target => {
    // Platform.log("CD[Entity](target): ", target);
    // Platform.log("CD[Entity](tableName): ", tableName);
    const metadata = {
      entityName: target.name,
      repository: repository,
      _class: target
    }
    Globals.getMetadataStorage().setMetadataFor('entity', target.name, metadata)
  }
}
