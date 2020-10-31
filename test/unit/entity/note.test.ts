/* tslint:disable:no-console */
import * as _ from "lodash";
import { Note } from "../../../src/entity/note";
import { Entity } from "../../../src/entity/entity";

describe("Note(Entity)", () => {
  it("should be instance of Entity", () => {
    const note = new Note({});
    expect(note).toBeInstanceOf(Entity);
  });

  it("should have default attributes", () => {
    const note = new Note({});
    const attrs = ["name", "type", "text"];
    _.each(attrs, attr => {
      expect(note).toHaveProperty(attr);
    });
  });

  it("should set the default attributes passed to the constructor", () => {
    const data = {
      name: "note-1",
      type: "memo",
      text: "Remember to brush your teeth.",
    };
    const note = new Note(data);
    _.each(data, (v: any, k: string) => {
      expect(_.get(note, k)).toEqual(v);
    });
  });

  it("should be in sync after creation", () => {
    const data = {
      name: "note-1",
      type: "memo",
      text: "Remember to brush your teeth.",
    };
    const note = new Note(data);
    expect(note.isInSync).toBeTruthy();
  });

  //@todo: too fast - fails on circleci because dates do not differ
  it("should be out of sync after change", () => {
    const note = new Note({ name: "note-1" });
    expect(note.isInSync).toBeTruthy();
    const modificationDateBefore = note.dateModified;
    note.name = "note-2";
    expect(note.isInSync).toBeFalsy();
    expect(note.dateModified).not.toEqual(modificationDateBefore);
  });
});
