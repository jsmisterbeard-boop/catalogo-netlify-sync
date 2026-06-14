const CACHE_NAME = 'catalogo-mobile-v3';
const OFFLINE_FALLBACK = './index.html';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './favicon.png',
  './data/products.json',
  './icons/Icon-192.png',
  './icons/Icon-512.png',
  './icons/Icon-maskable-192.png',
  './icons/Icon-maskable-512.png'
];

const NETWORK_FIRST_PATHS = [
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/data/products.json'
];

function isNetworkFirstRequest(request) {
  const url = new URL(request.url);
  if (request.mode === 'navigate') return true;
  return NETWORK_FIRST_PATHS.some((path) => url.pathname === path || url.pathname.endsWith(path));
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)));
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

  const url = new URL(event.request.url);

  if (url.pathname.startsWith('/.netlify/functions/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (isNetworkFirstRequest(event.request)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_FALLBACK);
          }
          throw new Error('Network and cache unavailable');
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
