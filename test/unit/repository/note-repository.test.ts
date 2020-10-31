/* tslint:disable:no-console */
import * as _ from "lodash";
import { Note } from "../../../src/entity/note";
import NoteRepository from "../../../src/repository/note-repository";

describe("NoteRepository", () => {
  it("--TEST--", () => {
    console.log("#1", NoteRepository.getAll());

    const note = new Note({
      name: "School",
      type: "meeting",
      text: "Don't be late!",
    });
    NoteRepository.add(note);
    NoteRepository.persist(note);
    console.log("#2", NoteRepository.getAll());

    NoteRepository.reset();
    NoteRepository.syncIn();
    console.log("#3", NoteRepository.getAll());
  });


});
