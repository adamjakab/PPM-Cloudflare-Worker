import CloudflareWorkerGlobalScope from 'types-cloudflare-worker'
import EntityManager from '../repository/entity-manager'
import { RestApiWorker } from '../rest-api'
import * as NoteRouter from '../router/note'
import { Memory } from '../storage/memory'
import { KVStore } from '../storage/KVStore'
import { Note } from '../entity/note'

// Set the storage for the Entity Manager
// EntityManager.setupStorageDriver(new Memory())
// EntityManager.storage.resetTestData()

EntityManager.setupStorageDriver(new KVStore())
EntityManager.registerEntities([Note])

// Create the REST API worker
const worker = new RestApiWorker()

// Register the route handlers
worker.useRouter('/notes', NoteRouter)

// Register the listener and handle the request
declare let self: CloudflareWorkerGlobalScope
self.addEventListener('fetch', (event: Event) => {
  const fetchEvent = event as FetchEvent
  fetchEvent.respondWith(worker.handle(fetchEvent))
})
