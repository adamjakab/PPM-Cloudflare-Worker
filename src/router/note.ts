import { RestApiWorker } from '../rest-api';
import { RestApiRequest } from '../rest-api/request';
import { RestApiResponse } from '../rest-api/response';

const worker = new RestApiWorker();

/*
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../controller/note')

const router = new restCfWorker()

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', createNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

module.exports = router
*/

worker.register('/', 'GET', (req: RestApiRequest, res: RestApiResponse) => {
  const reply = 'xdU asked for: ' + req.getPath();
  return res.send({ message: reply });
});

module.exports = worker;
