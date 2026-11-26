// Items removed by the clinical owner must not come back (Build Rules 2, 4, 9 and 11).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const APP_FILES = ["js", "css", "content"].flatMap(d => walk(join(ROOT, d))).filter(f => /\.(js|css)$/.test(f)).concat(join(ROOT, "index.html"));
const APP = APP_FILES.map(f => [f.slice(ROOT.length), readFileSync(f, "utf8")]);

const BANNED = [
  ["decision-support footer", /Decision support only/],
  ["prescribing footer", /Check local protocol, renal function and allergies/],
  ["clinical review date", /[Ll]ast clinical(ly)? review/],
  ["reviewer", /[Rr]eviewer/],
  ["disclaimer", /[Dd]isclaimer/],
  ["Arabic interface", /[؀-ۿ]|\bisArabic\b|i18n|dir: "rtl"|lang: "ar"/],
  ["language setting", /setLanguage|"language"/]
];

for (const [what, re] of BANNED) {
  test(`no ${what} anywhere in the app`, () => {
    const hits = APP.filter(([, src]) => re.test(src)).map(([f]) => f);
    assert.deepEqual(hits, [], `${what} found in ${hits.join(", ")}`);
  });
}

test("the translation module is gone and not precached", () => {
  assert.ok(!existsSync(join(ROOT, "js/i18n.js")));
  assert.ok(!readFileSync(join(ROOT, "sw.js"), "utf8").includes("i18n"));
});

test("About shows the version, the designer and the one-line reference statement", async () => {
  const app = readFileSync(join(ROOT, "js/app.js"), "utf8");
  assert.ok(app.includes('export const REFERENCE_LINE = "All formulas, cutoffs and recommendations are based on published guidelines and original papers. Each calculator lists its sources.";'));
  const about = app.slice(app.indexOf("function about()"), app.indexOf("function radioGroup("));
  assert.match(about, /GI Toolkit v\$\{APP_VERSION\}/);
  assert.match(about, /DESIGNER/);
  assert.match(about, /REFERENCE_LINE/);
  assert.ok(!/Reference policy|Rounding is never silent/.test(about));
});

test("Build Rules 2, 4, 9 and 11 in CLAUDE.md match SPEC.md and keep these items out", () => {
  const rules = f => readFileSync(join(ROOT, f), "utf8").match(/^1\. Clinical content[\s\S]*?^11\. [^\n]*/m)[0];
  const spec = rules("SPEC.md");
  assert.equal(rules("CLAUDE.md"), spec);
  assert.match(spec, /^11\. English only, with no language option\./m);
  assert.ok(!/and the footer "Decision support only/.test(spec), "Rule 2 still requires the footer");
});

// Bug fix: Element.append() prints null as the text "null"; pages now append through appendAll().
test("cards and emergency pages never pass null to Element.append", () => {
  const pages = readFileSync(join(ROOT, "js/pages.js"), "utf8");
  assert.ok(!/\broot\.append\(/.test(pages), "pages.js appends to root without appendAll");
  const engine = readFileSync(join(ROOT, "js/engine.js"), "utf8");
  assert.match(engine, /export function appendAll\(el, \.\.\.children\) \{\s*el\.append\(\.\.\.children\.flat\(\)\.filter\(c => c !== null && c !== undefined && c !== false\)\);/);
});
