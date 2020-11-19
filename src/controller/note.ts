import * as _ from 'lodash'
import { Entity } from '../entity/entity'
import { Note } from '../entity/note'
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
    const notesData: any[] = []
    _.each(notes, (note: any) => {
      notesData.push(note.getEntityData())
      // notesData.push({ id: 'aaa' })
    })

    return res.send(notesData)
  }

  public async getOne (req: RestApiRequest, res: RestApiResponse) {
    const { id } = req.getParams()

    const msg = {
      message_1: '[getOne] You asked for: ' + req.getPath(),
      params: req.getParams(),
      id: id
    }

    return res.send(msg)
  }

  /*
    public create(req:RestApiRequest, res:RestApiResponse) {
        const reply = '[create] You asked for: ' + req.getPath();
        return res.send({ message: reply });
    }

    public update(req:RestApiRequest, res:RestApiResponse) {
        const reply = '[update] You asked for: ' + req.getPath();
        return res.send({ message: reply });
    }

    public delete(req:RestApiRequest, res:RestApiResponse) {
        const reply = '[delete] You asked for: ' + req.getPath();
        return res.send({ message: reply });
    }
     */
}

// Singleton export
export = new NoteController();
