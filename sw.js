const CACHE_NAME = 'admin-metricas-pro-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/styles/main.css',
  '/src/main.js',
  '/src/lib/api.js',
  '/src/lib/auth.js',
  '/src/lib/dom.js',
  '/src/lib/image.js',
  '/src/lib/search.js',
  '/src/lib/state.js',
  '/src/ui/admin.js',
  '/src/ui/audit.js',
  '/src/ui/catalog.js',
  '/src/ui/dashboard.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
      return response;
    }).catch(() => caches.match('/index.html')))
  );
});
