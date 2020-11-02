import * as _ from "lodash";
import { Note } from "../entity/note";
import { Repository } from "./repository";
import { Repository as EnhancedRepository } from "../decorator/Repository";

/**
 * Note Repository
 */
@EnhancedRepository(Note)
class NoteRepository extends Repository {
  /**
   * Constructor.
   * @todo: the "entityClass" parameter passed to super should be done with decorators
   * @todo: also "storageTableName" should be done with decorators
   * like: @Repository("entityClass"="Note", "storageTableName"="notes")
   */
  constructor() {
    super(Note);
    this._storageTableName = "notes";
  }
}

// Export a single instance
// @todo: at this point probably the exporting of a single instance is not needed
export = new NoteRepository();
