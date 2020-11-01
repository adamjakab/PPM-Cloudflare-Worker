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
      // tslint:disable-next-line:no-console
      console.error("Error creating dynamic class instance!", e);
    }
  }
}
