/* tslint:disable:no-console */
import * as _ from "lodash";
import { Note } from "../../../src/entity/note";

import EntityManager from "../../../src/repository/entity-manager";
import { NoteRepository } from "../../../src/repository/note-repository";
import { v4 as generateUUIDv4 } from "uuid";
// import { Note } from "../../../src/entity/note";
// import { InstanceCreator } from "../../../src/util/instance-creator";

const defaultData = {
  notes: [
    { id: generateUUIDv4(), name: "Ficus", dateCreated: "2020-08-15" },
    { id: generateUUIDv4(), name: "Fityisz", type: "video", text: "hi!" },
    { id: generateUUIDv4(), name: "Kecske", type: "audio" },
    { id: generateUUIDv4(), name: "Kigyo", text: "Adi is back!" },
  ],
};

describe("NoteRepository", () => {
  beforeEach(async () => {
    EntityManager.storage.reset(defaultData);
    EntityManager.registerEntities([Note]);
  });

  it("should have a storage table name", () => {
    const repo = new NoteRepository();
    expect(repo.storageTableName).not.toBeUndefined();
    expect(repo.storageTableName).toEqual("notes");
  });

});
