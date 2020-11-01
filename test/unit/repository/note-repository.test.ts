/* tslint:disable:no-console */
import * as _ from "lodash";
import { Note } from "../../../src/entity/note";
import EntityManager from "../../../src/repository/entity-manager";
import NoteRepository from "../../../src/repository/note-repository";
import { v4 as generateUUIDv4 } from "uuid";

const defaultData = {
  notes: [
    { id: generateUUIDv4(), name: "Ficus", dateCreated: "2020-08-15" },
    { id: generateUUIDv4(), name: "Fityisz", type: "video", text: "hi!" },
    { id: generateUUIDv4(), name: "Kecske", type: "audio" },
    { id: generateUUIDv4(), name: "Kigyo", text: "Adi bacsi is back!" },
  ],
};

describe("NoteRepository", () => {
  beforeEach(async () => {
    EntityManager.storage.reset(defaultData);
    await NoteRepository.syncIn();
  });

  it("should have default data", () => {
    expect(NoteRepository.count()).toEqual(_.size(defaultData.notes));
  });

  it("should add new entity", () => {
    const newData = { id: generateUUIDv4(), name: "New Note" };
    const note = new Note(newData);
    NoteRepository.add(note);
    expect(NoteRepository).toEqual(note.getRepository());
    expect(NoteRepository.count()).toEqual(_.size(defaultData.notes) + 1);
    expect(note).toEqual(NoteRepository.get(newData.id));
  });
});
