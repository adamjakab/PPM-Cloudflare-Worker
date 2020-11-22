import * as _ from '../util/lodash'
import { Entity } from '../entity/entity'
import { Note } from '../entity/note'
import { Controller } from './controller'
import { RestApiRequest } from '../rest-api/request'
import { RestApiResponse } from '../rest-api/response'
import { NoteRepository } from '../repository/note-repository'

class NoteController extends Controller {
  /**
   * Path: /notes (GET)
   *
   * @param req
   * @param res
   */
  public async list (req: RestApiRequest, res: RestApiResponse) {
    const repo = new NoteRepository()
    const notes = await repo.getAll()
    return res.send(notes)
  }

  /**
   * Path: /notes/{id} (GET)
   *
   * @param req
   * @param res
   */
  public async getOne (req: RestApiRequest, res: RestApiResponse) {
    const { id } = req.getParams()
    const repo = new NoteRepository()
    const note: Note = await repo.get(id)
    return res.send(note, note ? 200 : 404)
  }

  /**
   * Path: /notes (POST)
   *
   * @param req
   * @param res
   */
  public async create (req: RestApiRequest, res: RestApiResponse) {
    const data = await req.getBody()
    const repo = new NoteRepository()
    const note = new Note(data)
    await repo.persist(note)
    return res.send(note, note ? 200 : 404)
  }

  /**
   * Path: /notes/{id} (PUT)
   *
   * @param req
   * @param res
   */
  public async update (req: RestApiRequest, res: RestApiResponse) {
    let status = 200
    const { id } = req.getParams()
    const repo = new NoteRepository()
    const note: Note = await repo.get(id)
    if (note) {
      const data = await req.getBody()
      note.mapDataOnEntity(data)
      await repo.persist(note)
    } else {
      status = 404
    }
    return res.send(note, status)
  }

  /**
   * Path: /notes/{id} (DELETE)
   *
   * @param req
   * @param res
   */
  public async delete (req: RestApiRequest, res: RestApiResponse) {
    let status = 200
    const { id } = req.getParams()
    const repo = new NoteRepository()
    const note: Note = await repo.get(id)
    if (note) {
      await repo.remove(note)
    } else {
      status = 404
    }
    return res.send(note, status)
  }
}

// Singleton export
export = new NoteController();
