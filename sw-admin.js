const CACHE_NAME = 'jmf-admin-v1';
const ASSETS = [
  '.',
  'index.html',
  'manifest-admin.json',
  'icon-admin-192.png',
  'icon-admin-512.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
