// Phase 4 Arabic interface: every interface string has an Arabic translation, clinical content
// is never translated, and the mandatory footers stay in English.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { AR, t, setLangForTest } from "../js/i18n.js";
import { CATEGORIES, CALCULATORS, CARDS, EMERGENCIES } from "../js/registry.js";
import { FOOTER_TEXT } from "../js/engine.js";
import { PRESCRIBING_FOOTER, NO_SOURCE_TEXT } from "../js/pages.js";
import { LAST_CLINICAL_REVIEW, CLINICAL_REVIEWER } from "../js/version.js";

const src = f => readFileSync(new URL(`../js/${f}`, import.meta.url), "utf8");

// Every literal passed to t() or L(), including both arms of a ternary.
function keysUsed() {
  const keys = new Set();
  for (const f of ["app.js", "engine.js", "pages.js"]) {
    const code = src(f);
    for (const m of code.matchAll(/\b(?:t|L)\(\s*"((?:[^"\\]|\\.)*)"/g)) keys.add(m[1]);
    for (const m of code.matchAll(/\b(?:t|L)\([^()"]*\?\s*"([^"]+)"\s*:\s*"([^"]+)"/g)) { keys.add(m[1]); keys.add(m[2]); }
  }
  return keys;
}

test("every interface string used in the app has an Arabic translation", () => {
  const keys = keysUsed();
  assert.ok(keys.size > 40, `only ${keys.size} keys found`);
  for (const k of keys) assert.ok(AR[k] !== undefined, `missing Arabic for "${k}"`);
  // Strings translated through constants.
  for (const k of [FOOTER_TEXT, PRESCRIBING_FOOTER, NO_SOURCE_TEXT, LAST_CLINICAL_REVIEW, CLINICAL_REVIEWER, ...CATEGORIES.map(c => c.name)]) {
    assert.ok(AR[k] !== undefined, `missing Arabic for "${k}"`);
  }
  const disclaimer = src("app.js").match(/const DISCLAIMER = "([^"]+)"/)[1];
  assert.ok(AR[disclaimer], "disclaimer");
});

test("English is the default and placeholders are filled in both languages", () => {
  setLangForTest("en");
  assert.equal(t("Clear inputs"), "Clear inputs");
  assert.equal(t("Items: {n}", { n: 5 }), "Items: 5");
  setLangForTest("ar");
  assert.equal(t("Clear inputs"), "مسح المدخلات");
  assert.equal(t("Items: {n}", { n: 5 }), "العناصر: 5");
  assert.equal(t("an untranslated clinical sentence"), "an untranslated clinical sentence");
  setLangForTest("en");
});

test("clinical content is never translated: no calculator, card or emergency text is a translation key", () => {
  const clinical = new Set();
  for (const c of CALCULATORS) { clinical.add(c.name); clinical.add(c.short); for (const i of c.inputs) if (i.label) clinical.add(i.label); }
  for (const c of [...CARDS, ...EMERGENCIES]) { clinical.add(c.name); clinical.add(c.short); }
  for (const p of EMERGENCIES) for (const b of p.blocks) if (b.title) clinical.add(b.title);
  // "Version" is both the About page heading and Ranson's input label; input labels never pass
  // through t(), so Ranson's stays English (checked below).
  const overlap = Object.keys(AR).filter(k => clinical.has(k) && AR[k] !== k);
  assert.deepEqual(overlap, ["Version"]);
  const engine = src("engine.js");
  assert.ok(!/\b(?:t|L)\(\s*(?:inp|def|it|r)\./.test(engine), "engine translates clinical fields");
  assert.ok(!/\b(?:t|L)\(\s*(?:page|card|item|def|b)\.(?:name|short|text|title|use)/.test(src("pages.js") + src("app.js")), "pages translate clinical fields");
});

test("Arabic translations keep clinical abbreviations and units in English", () => {
  assert.equal(AR["IBD"], "IBD");
  assert.match(AR["SI (µmol/L, g/L, mmol/L)"], /µmol\/L, g\/L, mmol\/L/);
  assert.match(AR["Conventional (mg/dL, g/dL)"], /mg\/dL, g\/dL/);
});

test("mandatory footers stay in English; Arabic adds a translation under them", () => {
  assert.equal(FOOTER_TEXT, "Decision support only. Verify with clinical judgment and local protocols.");
  assert.equal(PRESCRIBING_FOOTER, "Check local protocol, renal function and allergies before prescribing.");
  const engine = src("engine.js");
  assert.match(engine, /export function footerNote\(text\) \{\s*return h\("div", \{ class: "footer-note" \}, h\("p", \{ lang: "en", dir: "ltr" \}, text\),/);
  for (const f of ["engine.js", "pages.js", "app.js"]) assert.ok(!/h\("p", \{ class: "footer-note" \}/.test(src(f)), `${f} renders a footer without footerNote`);
});

test("clinical pages are marked English and left-to-right; Arabic sets the document to right-to-left", () => {
  const app = src("app.js");
  assert.match(app, /h\("div", \{ class: "page item-page", lang: "en", dir: "ltr" \}/);
  assert.match(app, /root\.dir = ar \? "rtl" : "ltr";/);
});
