/* ============================================================
   Service Worker — TaskSphere PWA
   Strategi:
   - Navigasi (HTML)  : network-first, fallback ke cache
   - Aset same-origin : cache-first
   - Lintas-origin (CDN Tailwind/Alpine/FontAwesome): langsung jaringan
   ============================================================ */
const CACHE = 'tasksphere-v1';

const APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './js/app.js',
    './views/timeline.js',
    './views/kanban.js',
    './views/vault.js',
    './views/modal.js',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-maskable-512.png',
    './icons/apple-touch-icon.png',
    './icons/favicon-32.png'
];

// Pre-cache app shell (abaikan item yang gagal agar install tetap sukses)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => Promise.all(APP_SHELL.map((url) => cache.add(url).catch(() => null))))
            .then(() => self.skipWaiting())
    );
});

// Bersihkan cache versi lama
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return; // biarkan CDN lewat jaringan langsung

    // Navigasi halaman → network-first
    if (req.mode === 'navigate') {
        event.respondWith(
            fetch(req)
                .then((res) => {
                    const copy = res.clone();
                    caches.open(CACHE).then((cache) => cache.put(req, copy));
                    return res;
                })
                .catch(() => caches.match(req).then((c) => c || caches.match('./index.html')))
        );
        return;
    }

    // Aset statis → cache-first
    event.respondWith(
        caches.match(req).then((cached) => {
            if (cached) return cached;
            return fetch(req).then((res) => {
                const copy = res.clone();
                caches.open(CACHE).then((cache) => cache.put(req, copy));
                return res;
            });
        })
    );
});
