/* tslint:disable:no-console */
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
    // console.log("CD[Entity](target): ", target);
    // console.log("CD[Entity](tableName): ", tableName);
    target.prototype._idType = idType;
    target.prototype.___decorationMetadata___ = {
      tableName: tableName,
      idType: idType
    };
  };
}
