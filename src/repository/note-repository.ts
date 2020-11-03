import { Note } from "../entity/note";
import { Repository } from "./repository";
import { Repository as EnhancedRepository } from "../decorator/Repository";

/**
 * Note Repository
 * @todo: make repositories optional(transparent) for entities
 */
@EnhancedRepository(Note)
export class NoteRepository extends Repository {}
