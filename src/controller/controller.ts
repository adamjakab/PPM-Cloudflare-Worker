import { RestApiRequest } from '../rest-api/request';
import { RestApiResponse } from '../rest-api/response';

export class Controller {
  public list(req: RestApiRequest, res: RestApiResponse) {
    const reply = '[list] You asked for: ' + req.getPath();
    return res.send({ message: reply });
  }

  public getOne(req: RestApiRequest, res: RestApiResponse) {
    const reply = '[getOne] You asked for: ' + req.getPath();
    return res.send({ message: reply });
  }

  public create(req: RestApiRequest, res: RestApiResponse) {
    const reply = '[create] You asked for: ' + req.getPath();
    return res.send({ message: reply });
  }

  public update(req: RestApiRequest, res: RestApiResponse) {
    const reply = '[update] You asked for: ' + req.getPath();
    return res.send({ message: reply });
  }

  public delete(req: RestApiRequest, res: RestApiResponse) {
    const reply = '[delete] You asked for: ' + req.getPath();
    return res.send({ message: reply });
  }
}
