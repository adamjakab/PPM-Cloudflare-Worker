/* tslint:disable:no-console */
import * as _ from "lodash";

import EntityManager from "../../../src/repository/entity-manager";
import NoteRepository from "../../../src/repository/note-repository";
import { v4 as generateUUIDv4 } from "uuid";
// import { Note } from "../../../src/entity/note";
// import { InstanceCreator } from "../../../src/util/instance-creator";

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
  });

  it("should have a storage table name", () => {
    expect(NoteRepository.storageTableName).not.toBeUndefined();
    expect(NoteRepository.storageTableName).toEqual("notes");
  });

  it("should load all data: getAll()", async () => {
    const notes = await NoteRepository.getAll();
    expect(_.size(notes)).toEqual(_.size(defaultData.notes));
    console.log(notes);
  });

  /*
  it("should create a dynamic class instance", () => {
    const creator = new InstanceCreator(Note);
    const instance: Note = creator.getNewInstance({ id: generateUUIDv4() });
    console.log(instance);
  });
  */

});
