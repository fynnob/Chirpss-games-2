const CACHE_NAME = 'chirpss-cache-v3';
const urlsToCache = [
  '/',
  '/En/index.html',
  '/layout.js',
  '/offline.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          // Do not cache partial content or opaque errored tracking scripts. Just valid stuff.
          if(response.status === 200 || response.type === 'opaque') {
             cache.put(event.request, responseClone);
          }
        });
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If a page fetch fails and we don't have it cached, show the offline page.
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});
