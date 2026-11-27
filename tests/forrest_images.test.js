// SPEC.md B2.5 Forrest illustrations (pilot): six original SVG schematics, alt text, size, offline cache.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync, existsSync } from "node:fs";
import forrest, { ROWS } from "../js/calculators/bleeding/forrest.js";
import { calc } from "./helpers.js";

const ROOT = new URL("..", import.meta.url);
const SPEC = readFileSync(new URL("SPEC.md", ROOT), "utf8");
const sw = readFileSync(new URL("sw.js", ROOT), "utf8");
// Table under "Illustrations (pilot)" in B2.5: class | file | alt text.
const specRows = SPEC.slice(SPEC.indexOf("Illustrations (pilot)"), SPEC.indexOf("## Part B3"))
  .split("\n").filter(l => /^\| (Ia|Ib|IIa|IIb|IIc|III) \|/.test(l))
  .map(l => l.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim()));

test("the 6 Forrest images exist, are under 20 KB and are precached for offline use", () => {
  assert.equal(ROWS.length, 6);
  assert.deepEqual(ROWS.map(r => r.image), ["ia", "ib", "iia", "iib", "iic", "iii"].map(k => `img/forrest/forrest-${k}.svg`));
  for (const r of ROWS) {
    const url = new URL(r.image, ROOT);
    assert.ok(existsSync(url), r.image);
    assert.ok(statSync(url).size < 20 * 1024, `${r.image} is ${statSync(url).size} bytes`);
    assert.ok(sw.includes(`"./${r.image}"`), `${r.image} not precached`);
  }
});

test("every Forrest image has alt text, and the alt text is SPEC B2.5 text", () => {
  assert.equal(specRows.length, 6);
  ROWS.forEach((r, i) => {
    assert.ok(r.alt && r.alt.length > 20, `${r.cls} alt text`);
    assert.deepEqual(specRows[i], [r.cls, r.image, r.alt]);
  });
  for (const o of forrest.inputs[0].options) {
    const row = ROWS.find(r => r.cls === o.value);
    assert.deepEqual(o.image, { src: row.image, alt: row.alt }, `thumbnail for ${o.value}`);
  }
});

test("the selected class shows the large image with the B2.5 caption", () => {
  for (const r of ROWS) {
    const { interp } = calc(forrest, { cls: r.cls });
    assert.deepEqual(interp.figure, { src: r.image, alt: r.alt, caption: `Forrest ${r.cls}: ${r.finding}. Schematic, not to scale.` });
  }
  assert.ok(SPEC.includes('"Forrest Ia: Active spurting. Schematic, not to scale."'));
});

test("each image is a self-contained SVG in the shared style: viewBox 160x120, own light rounded background, same crater, no external or raster content", () => {
  const crater = '<circle cx="80" cy="61" r="37" fill="url(#r)"/>';
  const fibrin = '<circle cx="80" cy="61" r="27" fill="url(#b)"/>';
  for (const r of ROWS) {
    const svg = readFileSync(new URL(r.image, ROOT), "utf8");
    assert.match(svg, /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 160 120"/, r.image);
    assert.match(svg, /<title>[^<]+<\/title>/, `${r.image} title`);
    assert.ok(svg.includes('<rect width="160" height="120" rx="14" fill="#fbf3f3"/>'), `${r.image} background`);
    assert.ok(svg.includes(crater) && svg.includes(fibrin), `${r.image} crater`);
    assert.ok(!/<image|href=|<script|@import|url\(http/i.test(svg), `${r.image} must not load anything`);
  }
});
