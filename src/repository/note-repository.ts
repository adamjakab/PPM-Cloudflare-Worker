import * as _ from "lodash";
import { Repository } from "./repository";
import { Note } from "../entity/note";

const defaultData = [
  { id: 1, name: "Ficus", date_created: "2020-08-15" },
  { id: 2, name: "Fityisz", date_created: "2020-10-15", type: "video" },
  { id: 3, name: "Kecske", date_created: "2020-11-01", type: "audio" },
  {
    id: 4,
    name: "Kigyo",
    date_created: "2020-11-03",
    text: "Adi bacsi is back!",
  },
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
