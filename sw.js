const CACHE_PREFIX = 'mws-restaurant';
const CACHE_NAME = CACHE_PREFIX + 'v1';

const pages = [
    '/',
    'index.html',
    'restaurant.html',
];

const assets = [
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'css/styles.css',
    'js/main.js',
    'js/restaurant_info.js',
    'js/dbhelper.js',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => cache.addAll([...pages, ...assets]))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches
            .match(event.request)
            .then(cacheResponse => {
                return cacheResponse || fetch(event.request)
                    .then(fetchResponse => {
                        return caches
                            .open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, fetchResponse.clone());
                                return fetchResponse;
                            });
                    });
            })
    );
});