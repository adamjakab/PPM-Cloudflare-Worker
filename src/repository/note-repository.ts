import * as _ from "lodash";
// import { Entity } from "../entity/entity";
import { Note } from "../entity/note";
import EntityManager from "./entity-manager";
import { Repository } from "./repository";

class NoteRepository extends Repository {
  constructor() {
    super();
    this._storageTableName = "notes";
    /*
    this.syncIn().then(() => {
      console.log("NoteRepository is synced!")
    });
    */
  }

  public add(note: Note) {
    super.add(note);
    note.setRepository(this);
  }

  public async syncIn() {
    super.reset();
    const data = await EntityManager.fetchAll(this._storageTableName);
    let note;
    _.each(data, d => {
      note = new Note(d);
      note.setRepository(this);
      this.add(note);
    });
  }
}

// Export a single instance
export = new NoteRepository();
