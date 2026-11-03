/**
 * K-PAXian Dictionary - Service Worker
 * Enables 100% offline usage and rapid caching of PWA assets.
 * Forced Update Deployment Protocol
 */

const APP_BUILD_ID = "20261104-0230";
const CACHE_NAME = `kpax-dict-v${APP_BUILD_ID}`;

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/themes.css",
  "./css/main.css",
  "./js/dictionary-data.js",
  "./js/theme-manager.js",
  "./js/app.js",
  "./icons/icon.svg"
];

// Install event - force immediate takeover
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event - purge all outdated caches and claim clients
self.addEventListener("activate", (event) => {
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

// Fetch event - Stale-while-revalidate with cache fallback
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === "basic") {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {});

      return cachedResponse || fetchPromise.then((res) => {
        if (!res && event.request.headers.get("accept")?.includes("text/html")) {
          return caches.match("./index.html");
        }
        return res;
      });
    })
  );
});
