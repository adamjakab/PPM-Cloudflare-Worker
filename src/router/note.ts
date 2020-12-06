import { RestApiWorker } from '../rest-api'
import Controller from '../controller/note'

// @todo: this is badly designed - Routers will need a specific class
// This calls register method when being imported and potentially not allowing for configuration to be available
const worker = new RestApiWorker()
worker.register('/', 'GET', Controller.list)
worker.register('/:id', 'GET', Controller.getOne)
worker.register('/', 'POST', Controller.create)
worker.register('/:id', 'PUT', Controller.update)
worker.register('/:id', 'DELETE', Controller.delete)
module.exports = worker
