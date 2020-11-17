/* tslint:disable:no-console */
import * as _ from "lodash";
import { Note } from "../../../src/entity/note";
import { Entity } from "../../../src/entity/entity";
import { delay } from "../../../src/util/utils";

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

});
