import * as _ from "lodash";
import { Platform } from "../../src/util/platform";
import { getMetadataStorage } from "../../src";
// import EntityManager from '../../src/repository/entity-manager';
import { NoteRepository } from "../../src/repository/note-repository";
import { Note } from "../../src/entity/note";


describe("Test", () => {
  it("should work", () => {
    expect(true).toBeTruthy();
  });

  it("should have metadata", () => {
    Platform.log("Repo Metadata: ", getMetadataStorage().repositoryMetadata);
    Platform.log("Entity Metadata: ", getMetadataStorage().entityMetadata);
  });

  it("Repo test", () => {
    const repo = new NoteRepository();
    Platform.log("Repo: ", repo);
  });

  it("Entity test", async () => {
    const note = new Note();
    note.name = "Palo";
    Platform.log("Note: ", note);
    // await note.save();
  });


});
