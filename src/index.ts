import CloudflareWorkerGlobalScope from "types-cloudflare-worker";
import { RestApiWorker } from "./rest-api";
import * as NoteRouter from "./router/note";

// Create the worker
declare var self: CloudflareWorkerGlobalScope;
const worker = new RestApiWorker();

// Register the route handlers
worker.useRouter("/notes", NoteRouter);

// Register the listener
self.addEventListener("fetch", (event: Event) => {
  const fetchEvent = event as FetchEvent;
  fetchEvent.respondWith(worker.handle(fetchEvent));
});

// tslint:disable: no-console
/*
import * as _ from 'lodash';
console.log('Registered routes:');
_.each(worker.getRoutes(), (r: any) => {
  console.log(':', r);
});
*/
