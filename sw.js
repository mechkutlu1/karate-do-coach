/* Karate-Dō Coach service worker.
   App shell: cache-first, refreshed in the background.
   CDN (MediaPipe wasm/model, fonts): NETWORK-FIRST, cache only as offline
   fallback so it can never get stuck serving a stale/broken model. */
const CACHE = "karate-do-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest",
               "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(e.request).then((cached) => {
      const fresh = fetch(e.request)
        .then((res) => { if (res.ok) caches.open(CACHE).then((c) => c.put(e.request, res.clone())); return res; })
        .catch(() => cached);
      return cached || fresh;
    }));
  } else {
    e.respondWith(fetch(e.request)
      .then((res) => { if (res.ok) { const clone = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, clone)); } return res; })
      .catch(() => caches.match(e.request)));
  }
});
