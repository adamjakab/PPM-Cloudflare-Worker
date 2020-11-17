import { Note } from "../entity/note";
import { Controller } from "./controller";
import { RestApiRequest } from "../rest-api/request";
import { RestApiResponse } from "../rest-api/response";
import { NoteRepository } from "../repository/note-repository";

class NoteController extends Controller {
  public list(req: RestApiRequest, res: RestApiResponse) {
    const repo = new NoteRepository();
    const notes = repo.getAll();
    return res.send(notes);
  }

  public getOne(req: RestApiRequest, res: RestApiResponse) {
    const { id } = req.getParams();

    const msg = {
      message_1: "[getOne] You asked for: " + req.getPath(),
      params: req.getParams(),
      id: id,
    };

    return res.send(msg);
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
