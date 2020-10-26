export class Entity {
  public id: number;
  public dateCreated: Date;
  public dateModified: Date;
  public deleted: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.deleted = false;
  }
}
