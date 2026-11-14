/* Jarvis 2 service worker: opens instantly and works offline with the last saved data.
   The app page is network-first (so updates arrive), the rest cache-first. API calls are never cached. */
const V = 'j2-v2.0.3';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'pack/manara/pack.json', 'icons/icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('j2-') && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (/script\.google|googleusercontent|elevenlabs/.test(u.host)) return;
  const sameShell = u.origin === location.origin && (u.pathname.endsWith('/') || u.pathname.endsWith('index.html') || u.pathname.endsWith('pack.json'));
  if (sameShell) {
    e.respondWith(fetch(u.href, { cache: 'no-store' }).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
    return;
  }
  if (u.origin === location.origin || /fonts\.(googleapis|gstatic)\.com|cdn\.jsdelivr\.net/.test(u.host)) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { if (res.ok || res.type === 'opaque') { const c = res.clone(); caches.open(V).then(x => x.put(e.request, c)); } return res; })));
  }
});
self.addEventListener('notificationclick', e => { e.notification.close(); e.waitUntil(self.clients.matchAll({ type: 'window' }).then(cs => cs.length ? cs[0].focus() : self.clients.openWindow('./'))); });
