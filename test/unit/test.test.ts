import * as _ from "lodash";
// import EntityManager from '../../src/repository/entity-manager';
import { NoteRepository } from "../../src/repository/note-repository";
import { Note } from "../../src/entity/note";
import { Platform } from "../../src/util/platform";
import { getMetadataStorage } from "../../src";

describe("Test", () => {
  it("should work", () => {
    expect(true).toBeTruthy();
  });


  it("should have metadata", () => {
    Platform.log("Repo Metadata: ", getMetadataStorage().repositoryMetadata);
  });

  it("should have a note repo", () => {
    const repo = new NoteRepository();
    Platform.log("Repo: ", repo);
    const note = new Note();
    note.name = "Palo";
    Platform.log("Note: ", note);
    Platform.warn("Ficus!");
    // note.save();
  });


});
