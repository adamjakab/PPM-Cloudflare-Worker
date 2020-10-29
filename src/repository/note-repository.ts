import * as _ from "lodash";
import { Repository } from "./repository";
import { Note } from "../entity/note";
import { v4 as generateUUIDv4 } from "uuid";

const defaultData = [
  { id: generateUUIDv4(), name: "Ficus", date_created: "2020-08-15" },
  { id: generateUUIDv4(), name: "Fityisz", type: "video" },
  { id: generateUUIDv4(), name: "Kecske", type: "audio" },
  { id: generateUUIDv4(), name: "Kigyo", text: "Adi bacsi is back!" },
];

class NoteRepository extends Repository {
  constructor() {
    super();
    _.each(defaultData, data => {
      const note = new Note(data);
      this.add(note);
    });
  }

  public getOne() {
    return new Note({});
  }
}

// Export a single instance
export = new NoteRepository();
