import CloudflareWorkerGlobalScope from 'types-cloudflare-worker'
import EntityManager from '../repository/entity-manager'
import { RestApiWorker } from '../rest-api'
import * as NoteRouter from '../router/note'
import { Memory } from '../storage/memory'
import { Note } from '../entity/note'

// Set the storage for the Entity Manager
EntityManager.setupStorageDriver(new Memory())

// @todo: move default data to memory storage
const defaultData = {
  notes: [
    { id: '00000000-0000-4000-8000-000000000001', name: 'Ficus', dateCreated: '2020-08-15' },
    { id: '00000000-0000-4000-8000-000000000002', name: 'Fityisz', type: 'video', text: 'hi!' },
    { id: '00000000-0000-4000-8000-000000000003', name: 'Kecske', type: 'audio' },
    { id: '00000000-0000-4000-8000-000000000004', name: 'Kigyo', text: 'Adi is back!' }
  ]
}
EntityManager.storage.reset(defaultData)

EntityManager.registerEntities([Note])

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
