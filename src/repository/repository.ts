// import * as _ from "lodash";

export class Repository {
  protected items = [];

  public getAll() {
    return this.items;
  }

  public add(entity: object) {
    // @ts-ignore
    this.items.push(entity);
    console.log("Entity added: ", entity);
  }
}
