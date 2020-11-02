/* tslint:disable:no-console */
import * as _ from "lodash";
// import EntityManager from '../../src/repository/entity-manager';
import NoteRepository from "../../src/repository/note-repository";
import { Note } from "../../src/entity/note";

describe("Test", () => {
  it("should work", () => {
    expect(true).toBeTruthy();
  });

  it("should create a new note", () => {
    const note = new Note();
    console.log(note);
  });

  it("should have a note repo", () => {
    console.log(NoteRepository);
  });
});
