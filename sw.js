const CACHE = 'guiadose-v2';
const ASSETS = [
  '/',
  '/guiadose.html',
  '/amoxicalc.html',
  '/amoxiclav.html',
  '/ampicilina.html',
  '/ampicilina_sulbactam.html',
  '/azitromicina.html',
  '/bactrim.html',
  '/cefaclor.html',
  '/cefadroxila.html',
  '/cefalexina.html',
  '/cefazolina.html',
  '/cefepima.html',
  '/ceftriaxona.html',
  '/cefuroxima.html',
  '/ciprofloxacino.html',
  '/claritromicina.html',
  '/dipirona.html',
  '/doxiciclina.html',
  '/ibuprofeno.html',
  '/metronidazol.html',
  '/nitrofurantoina.html',
  '/paracetamol.html',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
    if (res && res.status === 200 && res.type === 'basic') {
      const clone = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, clone));
    }
    return res;
  }).catch(() => cached)));
});
