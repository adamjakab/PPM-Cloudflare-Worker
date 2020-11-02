/* tslint:disable:no-console */

/**
 * Options for the Entity decorator.
 */
export interface EntityOptions {
  /**
   * Table name.
   * If not specified then naming strategy will generate table name from entity name.
   */
  tableName?: string;
}

/**
 * Decorator for class: Entity
 */
export function Entity(
  tableName: string,
  options?: EntityOptions,
): ClassDecorator {
  return target => {
    console.log("CD[Entity](target): ", target);
    console.log("CD[Entity](tableName): ", tableName);
    console.log("CD[Entity](options): ", options);
  };
}
