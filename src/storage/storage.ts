export class Storage {}

export interface StorageInterface {
  name: string;
  fetchAll(table: string): Promise<any>;
  fetchOne(table: string, id: number | string): Promise<any>;
  store(table: string, element: any): Promise<number>;
  reset(defaultData: {}): void;
}
