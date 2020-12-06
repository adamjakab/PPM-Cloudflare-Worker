import AppConfiguration from './configuration'
import CloudflareWorkerGlobalScope from 'types-cloudflare-worker'
import RootController from '../controller/root'
import EntityManager from '../repository/entity-manager'
import { RestApiWorker } from '../rest-api'
import * as NoteRouter from '../router/note'
import { Memory } from '../storage/memory'
import { KVStore } from '../storage/KVStore'
import { Note } from '../entity/note'

/**
 * Import the AppConfiguration and make sure to update the configuration before anything else
 * @todo: this will become an async method
 * @todo: all other imported modules will have to wait with initialization until configuration is available
 */
AppConfiguration.mergeAppConfigOverrides()
console.log('Running with config: ', AppConfiguration.getAppConfig())

// Set up Entity Manager with the right storage
if (AppConfiguration.getAppConfigValue('storage_to_use') === 'kvstore') {
  EntityManager.setupStorageDriver(new KVStore())
} else {
  EntityManager.setupStorageDriver(new Memory())
  EntityManager.storage.resetTestData()
}

// Register Entities
EntityManager.registerEntities([Note])

// Create the REST API worker and register the route handlers
const worker = new RestApiWorker()
worker.register('/', 'GET', RootController.list)
worker.useRouter('/notes', NoteRouter)

// Register the listener and handle the request
declare let self: CloudflareWorkerGlobalScope
self.addEventListener('fetch', (event: Event) => {
  const fetchEvent = event as FetchEvent
  fetchEvent.respondWith(worker.handle(fetchEvent))
})
