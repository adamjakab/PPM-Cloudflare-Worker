/* tslint:disable:no-console */
/**
 * A very weak attempt to create class instances dynamically
 */
export class InstanceCreator<T> {
  private readonly klass: any;

  constructor(klass: any) {
    this.klass = klass;
  }

  public getNewInstance(...args: any[]) {
    try {
      return new this.klass(...args);
    } catch (e) {
      console.error("Error creating dynamic class instance!", e);
      console.error("KLASS: ", this.klass);
    }
  }
}
