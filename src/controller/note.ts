import * as _ from 'lodash';
import { Controller } from './controller';
import { RestApiRequest } from '../rest-api/request';
import { RestApiResponse } from '../rest-api/response';

let default_data = [
    { id: 1, name: 'Ficus' },
    { id: 2, name: 'Fityisz' },
    { id: 3, name: 'Kecske' },
]

class NoteController extends Controller {

    public list(req:RestApiRequest, res:RestApiResponse) {
        let notes = default_data;
        return res.send(notes)
    }

    /*
    public getOne(req:RestApiRequest, res:RestApiResponse) {
        const reply = '[getOne] You asked for: ' + req.getPath();
        return res.send({ message: reply });
    }

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

