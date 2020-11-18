export class Storage {}

export interface StorageInterface {
  name: string;
  fetchAll(table: string): Promise<any>;
  fetchOne(table: string, id: number | string): Promise<any>;
  store(table: string, element: any): Promise<number>;
  delete(table: string, id: number | string): Promise<boolean>;
  reset(defaultData: Record<string, any>): void;
}
