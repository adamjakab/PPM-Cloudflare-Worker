/* tslint:disable:no-console */
import { Platform } from './platform'

/**
 * A very weak attempt to create class instances dynamically
 */
export class InstanceCreator<T> {
  private readonly Klass: any;

  constructor (klass: any) {
    this.Klass = klass
  }

  public getNewInstance (...args: any[]) {
    return new this.Klass(...args)
  }
}
