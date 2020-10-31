import * as _ from "lodash";
import { Entity } from "../entity/entity";
import { Note } from "../entity/note";
import EntityManager from "./entity-manager";
import { Repository } from "./repository";

class NoteRepository extends Repository {
  constructor() {
    super();
    this.syncIn();
  }

  public add(entity: Entity) {
    super.add(entity);
    entity.setRepository(this);
  }

  public syncIn(): void {
    const data = EntityManager.fetchAll();
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
