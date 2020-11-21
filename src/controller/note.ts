import * as _ from 'lodash'
import { Entity } from '../entity/entity'
import { Note } from '../entity/note'
import { Platform } from '../util/platform'
import { Controller } from './controller'
import { RestApiRequest } from '../rest-api/request'
import { RestApiResponse } from '../rest-api/response'
import { NoteRepository } from '../repository/note-repository'

class NoteController extends Controller {
  /**
   * Path: /notes
   *
   * @param req
   * @param res
   */
  public async list (req: RestApiRequest, res: RestApiResponse) {
    const repo = new NoteRepository()
    const notes = await repo.getAll()
    return res.send(notes)
  }

  public async getOne (req: RestApiRequest, res: RestApiResponse) {
    const { id } = req.getParams()
    const repo = new NoteRepository()
    const note = await repo.get(id)
    return res.send(note, note ? 200 : 404)

    /*
    const msg = {
      message_1: '[getOne] You asked for: ' + req.getPath(),
      params: req.getParams(),
      id: id
    }
    return res.send(msg)
    */
  }

  public async create (req: RestApiRequest, res: RestApiResponse) {
    const data = await req.getBody()
    const repo = new NoteRepository()
    const note = new Note(data)
    const id = await repo.persist(note);


    return res.send({
        message: '[create] You asked to create a Note.',
        url: req.getUrl(),
        path: req.getPath(),
        params: req.getParams(),
        method: req.getMethod(),
        body: await req.getBody(),
        note: note.getEntityData(),
        id: id,
      },
    )
  }

  public async update (req: RestApiRequest, res: RestApiResponse) {
    let status = 200
    let data = {}
    const { id } = req.getParams()
    const repo = new NoteRepository()
    const note: Note = await repo.get(id)

    if (note) {
      data = await req.getBody()
      note.mapDataOnEntity(data)
      await repo.persist(note);
    } else {
      status = 404
    }

    return res.send({
        message: '[update] You asked to update a Note.',
        url: req.getUrl(),
        path: req.getPath(),
        params: req.getParams(),
        method: req.getMethod(),
        body: data,
        note: note.getEntityData(),
        id: id,
      }, status
    )
  }


  /*
    public delete(req:RestApiRequest, res:RestApiResponse) {
        const reply = '[delete] You asked for: ' + req.getPath();
        return res.send({ message: reply });
    }
     */
}

// Singleton export
export = new NoteController();
