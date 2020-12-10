import { CloudflareWorkerApp } from './app/workerApp'
import CloudflareWorkerGlobalScope from 'types-cloudflare-worker'

// Register the listener and pass the request to the worker app
declare let self: CloudflareWorkerGlobalScope
const app = new CloudflareWorkerApp()
self.addEventListener('fetch', (fetchEvent: FetchEvent) => {
  fetchEvent.respondWith(app.handle(fetchEvent))
})

// export the app by default
export default app
