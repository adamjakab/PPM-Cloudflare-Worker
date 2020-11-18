import CloudflareWorkerGlobalScope from 'types-cloudflare-worker'
import EntityManager from '../repository/entity-manager'
import { RestApiWorker } from '../rest-api'
import * as NoteRouter from '../router/note'
import { Memory } from '../storage/memory'

// Set the storage for the Entity Manager
// @todo: set it to KV Driver (once it exists)
EntityManager.setupStorageDriver(new Memory())

// Create the REST API worker
const worker = new RestApiWorker()

// Register the route handlers
worker.useRouter('/notes', NoteRouter)

// Cloudflare environment - Register the listener
declare let self: CloudflareWorkerGlobalScope
self.addEventListener('fetch', (event: Event) => {
  const fetchEvent = event as FetchEvent
  fetchEvent.respondWith(worker.handle(fetchEvent))
})
