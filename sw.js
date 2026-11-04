/* ──────────────────────────────────────────────────────────────
   돈워리! — 서비스 워커

   홈 화면에 추가해 앱처럼 쓰기 위한 것입니다.

   중요: 화면 파일은 늘 인터넷에서 먼저 받아 옵니다(network-first).
   캐시를 먼저 쓰면 제작자가 새 판을 올려도 선생님 기기에는
   옛 화면이 계속 뜨게 됩니다. 캐시는 인터넷이 끊겼을 때만 씁니다.

   학생 자료는 캐시하지 않습니다. 스프레드시트로 가는 요청은
   주소가 달라(cross-origin) 여기를 거치지 않습니다.
   ────────────────────────────────────────────────────────────── */

var VERSION = '2.1.0';
var CACHE = 'donworry-' + VERSION;

var SHELL = [
  './',
  './index.html',
  './css/style.css',
  './js/api.js',
  './js/app.js',
  './manifest.webmanifest',
  './assets/favicon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .catch(function () { /* 하나라도 못 받으면 그냥 넘어갑니다 */ })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;

  // 가져오기(GET)만, 그리고 이 주소에 있는 파일만 다룹니다.
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    fetch(req).then(function (res) {
      // 받아 온 것을 다음에 인터넷이 끊겼을 때를 대비해 넣어 둡니다.
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        if (hit) return hit;
        // 페이지를 열려던 것이면 첫 화면이라도 돌려줍니다.
        if (req.mode === 'navigate') return caches.match('./index.html');
      });
    })
  );
});
