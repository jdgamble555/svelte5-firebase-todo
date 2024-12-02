/// <reference lib="webworker" />

import { requestProcessor } from "./utils";

declare const self: ServiceWorkerGlobalScope;


self.addEventListener('activate', (event) => {

    const evt = event as ExtendableEvent;

    evt.waitUntil(self.clients.claim())
});


self.addEventListener('fetch', (event) => {

    const evt = event as FetchEvent;

    evt.respondWith(requestProcessor(evt));
});
