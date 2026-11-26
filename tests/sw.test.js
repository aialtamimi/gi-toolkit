// App shell checks: every app file is precached, manifest and index meet B1.7, relative paths only.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const sw = readFileSync(join(ROOT, "sw.js"), "utf8");
const listed = new Set([...sw.matchAll(/"\.\/([^"]*)"/g)].map(m => m[1]));

function walk(dir) {
  return readdirSync(dir).flatMap(f => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

test("every app file under js/, css/, content/ and icons/ is in the service worker precache", () => {
  const files = ["js", "css", "content", "icons"].flatMap(d => walk(join(ROOT, d)))
    .map(p => relative(ROOT, p)).filter(p => !p.endsWith(".gitkeep"));
  for (const f of files) assert.ok(listed.has(f), `${f} missing from sw.js PRECACHE`);
  for (const f of ["index.html", "manifest.webmanifest", ""]) assert.ok(listed.has(f), `${f || "./"} missing`);
});

test("every precached file exists", () => {
  for (const f of listed) if (f) assert.ok(existsSync(join(ROOT, f)), `${f} listed but missing`);
});

test("cache name includes the app version", async () => {
  const { APP_VERSION } = await import("../js/version.js");
  assert.match(sw, new RegExp(`CACHE_VERSION = "${APP_VERSION.replace(/\./g, "\\.")}"`));
});

test("manifest meets B1.7", () => {
  const m = JSON.parse(readFileSync(join(ROOT, "manifest.webmanifest"), "utf8"));
  assert.equal(m.name, "GI Toolkit");
  assert.equal(m.short_name, "GI Toolkit");
  assert.equal(m.display, "standalone");
  assert.equal(m.start_url, "./");
  assert.equal(m.scope, "./");
  assert.ok(m.theme_color && m.background_color);
  const sizes = m.icons.map(i => `${i.sizes}:${i.purpose}`);
  assert.ok(sizes.includes("192x192:any") && sizes.includes("512x512:any") && sizes.includes("512x512:maskable"));
});

test("index.html has the iPhone tags from B1.7 and uses relative paths", () => {
  const html = readFileSync(join(ROOT, "index.html"), "utf8");
  for (const s of ['rel="apple-touch-icon" sizes="180x180"', 'name="apple-mobile-web-app-capable"', 'name="apple-mobile-web-app-title"', "viewport-fit=cover"]) {
    assert.ok(html.includes(s), s);
  }
  assert.ok(!/(src|href)="\/(?!\/)/.test(html), "absolute path found in index.html");
});

test(".nojekyll exists", () => assert.ok(existsSync(join(ROOT, ".nojekyll"))));

test("no external scripts, fonts or runtime network calls in app code", () => {
  const code = ["js", "css"].flatMap(d => walk(join(ROOT, d))).map(p => readFileSync(p, "utf8")).join("\n") + readFileSync(join(ROOT, "index.html"), "utf8");
  assert.ok(!/\bfetch\(|XMLHttpRequest|sendBeacon|WebSocket|@import|<script[^>]+src="http/.test(code), "network call or external resource found");
});
