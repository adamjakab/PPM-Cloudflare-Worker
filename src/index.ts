/*
@todo: this should go to App file
import CloudflareWorkerGlobalScope from "types-cloudflare-worker";
import EntityManager from "./repository/entity-manager";
import { RestApiWorker } from "./rest-api";
import * as NoteRouter from "./router/note";
import { Memory } from "./storage/memory";

// Cloudflare environment
declare var self: CloudflareWorkerGlobalScope;

// Set the storage for the Entity Manager
// @todo: set it to KV Driver (once it exists)
EntityManager.setupStorageDriver(new Memory());

// Create the REST API worker
const worker = new RestApiWorker();

// Register the route handlers
worker.useRouter("/notes", NoteRouter);

// Register the listener
self.addEventListener("fetch", (event: Event) => {
  const fetchEvent = event as FetchEvent;
  fetchEvent.respondWith(worker.handle(fetchEvent));
});
*/
import { Platform } from "./util/platform";
import { MetadataStorage } from "./metadata/metadata-storage";

/**
 * Gets metadata args storage from global scope
 * This part of the application will be moved to a separate repository / package: tinyOrm
 */
export function getMetadataStorage(): MetadataStorage {
  const globalScope = Platform.getGlobalVariable();
  if (!globalScope.tinyOrmMetadataStorage) {
    globalScope.tinyOrmMetadataStorage = new MetadataStorage();
  }
  return globalScope.tinyOrmMetadataStorage;
}
