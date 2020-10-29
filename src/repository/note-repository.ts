import * as _ from "lodash";
import { Repository } from "./repository";
import { Note } from "../entity/note";
import { getUuidV4 } from "../utils/utils";

const defaultData = [
  { id: getUuidV4(), name: "Ficus", date_created: "2020-08-15" },
  { id: getUuidV4(), name: "Fityisz", type: "video" },
  { id: getUuidV4(), name: "Kecske", type: "audio" },
  { id: getUuidV4(), name: "Kigyo", text: "Adi bacsi is back!" },
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
