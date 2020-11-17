/* tslint:disable:no-console */
/**
 * A very weak attempt to create class instances dynamically
 */
export class InstanceCreator<T> {
  private readonly Klass: any;

  constructor (klass: any) {
    this.Klass = klass
  }

  public getNewInstance (...args: any[]) {
    try {
      return new this.Klass(...args)
    } catch (e) {
      console.error('Error creating dynamic class instance!', e)
      console.error('Klass: ', this.Klass)
    }
  }
}
