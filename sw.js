// ============================================================
//  SHIFA DIRECTORY — sw.js (Service Worker)
// ============================================================
const CACHE_NAME = 'shifa-directory-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './results.html',
  './doctor.html',
  './favorites.html',
  './admin.html',
  './main.css',
  './data.js',
  './app.js',
  './home.js',
  './results.js',
  './doctor.js',
  './favorites.js',
  './admin.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './screenshot-mobile.png',
  './screenshot-desktop.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Background Sync capability
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-doctors') {
    console.log('Background sync triggered for Shifa Directory');
  }
});

// Push Notifications capability
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : 'New Doctor Available on Shifa Directory';
  event.waitUntil(
    self.registration.showNotification('Shifa Directory', {
      body: data,
      icon: './icon-192.png',
      badge: './icon-192.png'
    })
  );
});
