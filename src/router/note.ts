import { RestApiWorker } from "../rest-api";
import Controller from "../controller/note";

const worker = new RestApiWorker();
worker.register("/", "GET", Controller.list);
worker.register("/:id", "GET", Controller.getOne);
worker.register("/", "POST", Controller.create);
worker.register("/:id", "PUT", Controller.update);
worker.register("/:id", "DELETE", Controller.delete);
module.exports = worker;
