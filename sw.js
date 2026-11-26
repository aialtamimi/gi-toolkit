// Service worker: versioned cache, cache-first (SPEC.md B1.7).
// When adding or removing an app file, update PRECACHE and bump CACHE_VERSION
// (tests/sw.test.js checks that every app file is listed).
const CACHE_VERSION = "0.2.2";
const CACHE_NAME = `gi-toolkit-v${CACHE_VERSION}`;

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/app.css",
  "./js/app.js",
  "./js/engine.js",
  "./js/num.js",
  "./js/refs.js",
  "./js/registry.js",
  "./js/storage.js",
  "./js/units.js",
  "./js/version.js",
  "./js/calculators/bleeding/aims65.js",
  "./js/calculators/bleeding/forrest.js",
  "./js/calculators/bleeding/gbs.js",
  "./js/calculators/bleeding/oakland.js",
  "./js/calculators/bleeding/rockall.js",
  "./js/calculators/ibd/asuc_day3.js",
  "./js/calculators/ibd/cdai.js",
  "./js/calculators/ibd/hbi.js",
  "./js/calculators/ibd/mayo_uc.js",
  "./js/calculators/ibd/montreal.js",
  "./js/calculators/ibd/rutgeerts.js",
  "./js/calculators/ibd/ses_cd.js",
  "./js/calculators/ibd/truelove_witts.js",
  "./js/calculators/ibd/uceis.js",
  "./js/calculators/pancreas/asge_cbd.js",
  "./js/calculators/pancreas/atlanta.js",
  "./js/calculators/pancreas/bisap.js",
  "./js/calculators/pancreas/glasgow_imrie.js",
  "./js/calculators/pancreas/marshall.js",
  "./js/calculators/pancreas/mctsi.js",
  "./js/calculators/pancreas/ranson.js",
  "./js/calculators/pancreas/sirs.js",
  "./js/calculators/pancreas/tg18_cholangitis.js",
  "./js/calculators/liver/abic.js",
  "./js/calculators/liver/aclf.js",
  "./js/calculators/liver/aih_simplified.js",
  "./js/calculators/liver/albi.js",
  "./js/calculators/liver/apri.js",
  "./js/calculators/liver/ascites.js",
  "./js/calculators/liver/baveno7.js",
  "./js/calculators/liver/child_pugh.js",
  "./js/calculators/liver/fib4.js",
  "./js/calculators/liver/fibroscan.js",
  "./js/calculators/liver/gahs.js",
  "./js/calculators/liver/kings.js",
  "./js/calculators/liver/leipzig.js",
  "./js/calculators/liver/lille.js",
  "./js/calculators/liver/maddrey.js",
  "./js/calculators/liver/meld3.js",
  "./js/calculators/liver/meld_na.js",
  "./js/calculators/liver/nfs.js",
  "./js/calculators/liver/r_factor.js",
  "./js/calculators/liver/west_haven.js",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE.map(u => new Request(u, { cache: "reload" })))));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("gi-toolkit-") && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(req, { ignoreSearch: true }).then(hit => {
        if (hit) return hit;
        if (req.mode === "navigate") return cache.match("./index.html").then(r => r || fetch(req));
        return fetch(req);
      })
    )
  );
});
