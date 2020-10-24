import CloudflareWorkerGlobalScope from 'types-cloudflare-worker';
declare var self: CloudflareWorkerGlobalScope;

export class Worker {
  public async handle(event: FetchEvent) {
    const method = event.request.method;
    console.log('REQ METHOD: ', method);

    const resp = new Response('abcxxx', {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
    return resp;
  }
}

self.addEventListener('fetch', (event: Event) => {
  const worker = new Worker();
  const fetchEvent = event as FetchEvent;
  fetchEvent.respondWith(worker.handle(fetchEvent));
});
