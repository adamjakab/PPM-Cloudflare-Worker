import { Globals } from '../index'

/**
 * Decorator for class: Entity
 * Invoke with:
 *    @EntityDecorator(tableName, repository)
 */
export function EntityDecorator (
  tableName: string,
  repository: any,
  idType = 'uuidv4'
): ClassDecorator {
  return target => {
    // Platform.log("CD[Entity](target): ", target);
    // Platform.log("CD[Entity](tableName): ", tableName);
    const metadata = {
      entityName: target.name,
      tableName: tableName,
      repository: repository,
      idType: idType,
      _class: target
    }
    Globals.getMetadataStorage().setMetadataFor('entity', target.name, metadata)
  }
}
