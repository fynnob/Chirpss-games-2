const CACHE_NAME = 'chirpss-cache-v1';
const urlsToCache = [
  '/',
  '/En/index.html',
  '/layout.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      const fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(response => {
        if (!response || (response.status !== 200 && response.type !== 'opaque')) {
          return response;
        }

        const responseToCache = response.clone();
        if (event.request.method === 'GET') {
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      });
    })
  );
});
