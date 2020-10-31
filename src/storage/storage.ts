export class Storage {}

export interface StorageInterface {
  name: string;
  fetchAll(): any;
  fetchOneById(id: string): any;
  store(element: {}): boolean;
}
