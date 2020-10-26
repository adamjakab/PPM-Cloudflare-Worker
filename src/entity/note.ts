import { Entity } from "./entity";

export class Note extends Entity {
  public type: string;

  public name: string;

  public text: string;

  public isActive: boolean;

  constructor(data: any) {
    super(data);
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.text = data.text;
    this.isActive = data.isActive;
  }
}
