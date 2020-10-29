export class Entity {
  public idType: string = "uuidv4";
  public id: number | string;
  public dateCreated: Date;
  public dateModified: Date;
  public deleted: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.deleted = false;
  }

  /*
  public getProperty<K extends any>(propertyName: K) {
    return this[propertyName];
  }*/
}
