const CACHE_NAME = 'jmf-admin-v2'; // Changed version to force update
const ASSETS = [
  '.',
  'index.html',
  'manifest-admin.json',
  'icon-admin-192.png',
  'icon-admin-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force update
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Strategy: Network First, Fallback to Cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
