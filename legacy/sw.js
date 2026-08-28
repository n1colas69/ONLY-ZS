const CACHE_NAME = 'onlyzs-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/assets/images/ONLY-ZS-LOGO.png'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request).catch(() => {
                // Si no hay internet y buscan imagen, usar Logo
                if (e.request.destination === 'image') return caches.match('/assets/images/ONLY-ZS-LOGO.png');
            });
        })
    );
});