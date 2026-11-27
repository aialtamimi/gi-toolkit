// SPEC.md B3.19 Baveno VIII non-invasive portal hypertension; vectors from B8.3.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import bav, { baveno8, TEXT, ETIOLOGIES } from "../js/calculators/liver/baveno8.js";
import { findItem, hrefFor, search, REDIRECTS } from "../js/registry.js";
import { calc } from "./helpers.js";

const ALL = ETIOLOGIES.map(e => e.value);
const run = raw => calc(bav, raw);
const lines = (interp, title) => interp.sections.find(s => s.title === title).lines;

// ---------- clinical owner test vectors (B8.3) ----------

test("B8.3: LSM 12, platelets 160 → suggestive cACLD, CSPH ruled out (every etiology)", () => {
  for (const etiology of ALL) {
    const { result, interp } = run({ lsm: 12, plt: 160, etiology });
    assert.equal(result.cacld, "suggestive", etiology);
    assert.equal(interp.band, "CSPH ruled out", etiology);
    assert.deepEqual(result.display, ["LSM 12.0 kPa: Suggestive of cACLD", "CSPH ruled out"]);
    assert.ok(lines(interp, "CSPH ruled out").includes(TEXT.csphOut));
    assert.equal(interp.action, undefined);
  }
});

test("B8.3: LSM 27, platelets 90, viral → CSPH ruled in; start a non-selective beta-blocker, preferably carvedilol", () => {
  const { result, interp } = run({ lsm: 27, plt: 90, etiology: "viral" });
  assert.equal(result.inByLsm, true);
  assert.equal(interp.band, "CSPH ruled in");
  assert.equal(interp.level, "high");
  assert.equal(interp.action, "Start a non-selective beta-blocker, preferably carvedilol.");
});

test("B8.3: LSM 27, MASLD with BMI 30 or more → indeterminate, with the obese MASLD line", () => {
  const { result, interp } = run({ lsm: 27, etiology: "masld", obese: true });
  assert.equal(result.lsmRuleApplies, false);
  assert.equal(interp.band, "CSPH indeterminate");
  assert.deepEqual(lines(interp, "CSPH indeterminate"), [TEXT.indeterminate, TEXT.obese]);
  assert.equal(TEXT.obese, "Obese MASLD: the LSM rule for CSPH does not apply; use ANTICIPATE-NASH or NICER (probability 75% or more), not built in.");
});

test("B8.3: LSM 18, SSM 60 → CSPH ruled in (every etiology, including obese MASLD)", () => {
  for (const etiology of ALL) assert.equal(run({ lsm: 18, ssm: 60, etiology }).interp.band, "CSPH ruled in", etiology);
  assert.equal(run({ lsm: 18, ssm: 60, etiology: "masld", obese: true }).interp.band, "CSPH ruled in");
});

test("B8.3: LSM 18, platelets 160, SSM 35 → indeterminate; screening endoscopy avoidable if not eligible (every etiology)", () => {
  for (const etiology of ALL) {
    const { result, interp } = run({ lsm: 18, plt: 160, ssm: 35, etiology });
    assert.equal(interp.band, "CSPH indeterminate", etiology);
    assert.equal(result.avoidable, true);
    assert.deepEqual(lines(interp, "Screening endoscopy"), [TEXT.endoAlways, TEXT.endoAvoid]);
  }
});

// ---------- every rule in B3.19 ----------

test("cACLD by LSM: <10 ruled out with the PSVD line; 10–15 suggestive; >15 highly suggestive; ≥10 repeat fasting LSM", () => {
  const c = lsm => run({ lsm, etiology: "viral" }).interp;
  assert.deepEqual(lines(c(9.9), "cACLD"), [TEXT.cacldOut, TEXT.psvd]);
  assert.deepEqual(lines(c(10), "cACLD"), [TEXT.suggestive, TEXT.repeatFasting]);
  assert.deepEqual(lines(c(15), "cACLD"), [TEXT.suggestive, TEXT.repeatFasting]);
  assert.deepEqual(lines(c(15.1), "cACLD"), [TEXT.highly, TEXT.repeatFasting]);
  assert.equal(TEXT.cacldOut, "cACLD ruled out; negligible 3-year risk of decompensation.");
  assert.equal(TEXT.psvd, "LSM <10 kPa with clinical or imaging signs of portal hypertension: suspect vascular liver disease (porto-sinusoidal vascular disorder, PSVD).");
  assert.equal(TEXT.repeatFasting, "Repeat fasting LSM to confirm.");
});

test("B8.3: LSM 9.9, platelets 200 → cACLD ruled out and CSPH ruled out", () => {
  const { result, interp } = run({ lsm: 9.9, plt: 200, etiology: "alcohol" });
  assert.equal(result.cacld, "out");
  assert.equal(interp.band, "CSPH ruled out");
});

test("CSPH ruled in by LSM ≥25 for viral, alcohol and non-obese MASLD; not for other etiology or obese MASLD", () => {
  for (const etiology of ["viral", "alcohol", "masld"]) {
    assert.equal(run({ lsm: 25, etiology }).interp.band, "CSPH ruled in", etiology);
    assert.equal(run({ lsm: 24.9, etiology }).interp.band, "CSPH indeterminate", etiology);
  }
  assert.equal(run({ lsm: 27, etiology: "other" }).interp.band, "CSPH indeterminate");
  assert.equal(run({ lsm: 40, etiology: "masld", obese: true }).interp.band, "CSPH indeterminate");
});

test("CSPH ruled in by SSM >55 kPa (55 is not)", () => {
  assert.equal(run({ lsm: 18, ssm: 55.1, etiology: "other" }).interp.band, "CSPH ruled in");
  assert.equal(run({ lsm: 18, ssm: 55, etiology: "other" }).interp.band, "CSPH indeterminate");
});

test("B8.3: CSPH ruled out needs LSM ≤15 and platelets ≥150 (15/150 out; 15.1/150 and 15/149 indeterminate; no platelets indeterminate)", () => {
  assert.equal(run({ lsm: 15, plt: 150, etiology: "viral" }).interp.band, "CSPH ruled out");
  assert.equal(run({ lsm: 15.1, plt: 150, etiology: "viral" }).interp.band, "CSPH indeterminate");
  assert.equal(run({ lsm: 15, plt: 149, etiology: "viral" }).interp.band, "CSPH indeterminate");
  assert.equal(run({ lsm: 12, etiology: "viral" }).interp.band, "CSPH indeterminate");
});

test("B8.3: ruled in takes precedence over ruled out (LSM 12, platelets 160, SSM 56 → ruled in; SSM 55 → ruled out)", () => {
  assert.equal(run({ lsm: 12, plt: 160, ssm: 56, etiology: "viral" }).interp.band, "CSPH ruled in");
  assert.equal(run({ lsm: 12, plt: 160, ssm: 55, etiology: "viral" }).interp.band, "CSPH ruled out");
});

test("B8.3: screening endoscopy avoidable at LSM <20 and platelets ≥150 (Baveno VI criteria) or SSM <40", () => {
  const e = raw => lines(run({ etiology: "viral", ...raw }).interp, "Screening endoscopy");
  assert.deepEqual(e({ lsm: 19.9, plt: 150, eligible: "no" }), [TEXT.endoAlways, TEXT.endoAvoid]);
  assert.deepEqual(e({ lsm: 20, plt: 150, eligible: "no" }), [TEXT.endoAlways, TEXT.endoNeeded]);
  assert.deepEqual(e({ lsm: 19.9, plt: 149, eligible: "no" }), [TEXT.endoAlways, TEXT.endoNeeded]);
  assert.deepEqual(e({ lsm: 22, ssm: 39.9 }), [TEXT.endoAlways, TEXT.endoAvoid]);
  assert.deepEqual(e({ lsm: 22, ssm: 40 }), [TEXT.endoAlways]);
  assert.equal(TEXT.endoNeeded, "Not eligible: screening endoscopy. No varices: repeat upper endoscopy in 2 years (active etiology) or 3 years (etiology removed or suppressed).");
  assert.equal(TEXT.endoAlways, "Screening endoscopy only if not eligible for carvedilol or a non-selective beta-blocker; patients on these drugs do not need screening endoscopy.");
  assert.ok(TEXT.endoAvoid.includes("Baveno VI criteria"));
});

test("eligibility: eligible (yes) or unknown never adds the 'Not eligible: screening endoscopy' line", () => {
  for (const eligible of [undefined, "yes"]) {
    const raw = { lsm: 22, etiology: "viral", plt: 100 };
    if (eligible) raw.eligible = eligible;
    assert.deepEqual(lines(run(raw).interp, "Screening endoscopy"), [TEXT.endoAlways]);
  }
});

test("rule of five: the highest of 10, 15, 20, 25 kPa reached", () => {
  const r5 = lsm => lines(run({ lsm, etiology: "viral" }).interp, "Rule of five");
  assert.deepEqual(r5(9.9), [TEXT.ruleOfFive, "This LSM: below 10 kPa."]);
  assert.deepEqual(r5(10), [TEXT.ruleOfFive, "This LSM: ≥10 kPa."]);
  assert.deepEqual(r5(19.9), [TEXT.ruleOfFive, "This LSM: ≥15 kPa."]);
  assert.deepEqual(r5(20), [TEXT.ruleOfFive, "This LSM: ≥20 kPa."]);
  assert.deepEqual(r5(30), [TEXT.ruleOfFive, "This LSM: ≥25 kPa."]);
  assert.equal(TEXT.ruleOfFive, "Rule of five: LSM 10, 15, 20, 25 kPa = progressively higher risk of decompensation and liver-related death.");
});

test("notes always shown: repeat non-invasive tests every 12 months, and the stages of cirrhosis", () => {
  const { interp } = run({ lsm: 12, etiology: "viral" });
  assert.deepEqual(interp.notes, [TEXT.repeatYearly, TEXT.stages]);
  assert.equal(TEXT.repeatYearly, "Repeat non-invasive tests every 12 months in cACLD; the most recent value guides decisions.");
  assert.ok(TEXT.stages.startsWith("Stages of cirrhosis (Baveno VIII): compensated without or with CSPH; decompensated (overt ascites, variceal bleeding, overt HE grade 2 or more); further decompensation; recompensation"));
  assert.ok(TEXT.stages.includes("for 6 months or more; Child-Pugh A5/A6"));
});

test("inputs: BMI 30 or more shown only for MASLD; platelets, SSM and eligibility are optional", () => {
  const obese = bav.inputs.find(i => i.id === "obese");
  assert.equal(obese.showIf({ etiology: "masld" }), true);
  for (const e of ["viral", "alcohol", "other"]) assert.equal(obese.showIf({ etiology: e }), false);
  for (const id of ["plt", "ssm", "eligible"]) assert.equal(bav.inputs.find(i => i.id === id).optional, true, id);
  assert.deepEqual(ETIOLOGIES.map(e => e.label), ["Viral", "Alcohol", "MASLD", "Other"]);
  // The hidden BMI box is ignored for other etiologies.
  assert.equal(run({ lsm: 27, etiology: "viral", obese: true }).interp.band, "CSPH ruled in");
});

test("pure rules agree with the calculator", () => {
  assert.deepEqual(baveno8({ lsm: 27, etiology: "viral", plt: 90 }).csph, "in");
  assert.deepEqual(baveno8({ lsm: 12, etiology: "other", plt: 160 }).csph, "out");
});

// ---------- old id and name ----------

test("old id baveno7 opens the Baveno VIII calculator; search 'Baveno VII' and 'Baveno VIII' find it", () => {
  assert.equal(findItem("baveno8"), bav);
  assert.equal(hrefFor("baveno7"), "#/calc/baveno8");
  assert.ok(REDIRECTS.some(r => r.id === "baveno7" && r.redirect.calc === "baveno8"));
  const app = readFileSync(new URL("../js/app.js", import.meta.url), "utf8");
  assert.match(app, /if \(REDIRECTS\.some\(r => r\.id === id && r\.redirect\.calc\)\) \{ location\.replace\(hrefFor\(id\)\); return; \}/);
  assert.equal(search("Baveno VIII")[0].id, "baveno8");
  assert.ok(search("Baveno VII").some(i => i.id === "baveno8"));
  assert.equal(bav.name, "Baveno VIII non-invasive portal hypertension");
  assert.equal(bav.references[0].url, "https://pubmed.ncbi.nlm.nih.gov/42624290/");
});

test("'Baveno VII' appears nowhere in the app or SPEC.md (Baveno VI kept where cited); CHANGELOG history is kept", () => {
  const ROOT = new URL("..", import.meta.url).pathname;
  const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
  const files = ["js", "content", "css"].flatMap(d => walk(join(ROOT, d))).concat([join(ROOT, "index.html"), join(ROOT, "SPEC.md")]);
  const hits = files.filter(f => /Baveno VII(?!I)/.test(readFileSync(f, "utf8"))).map(f => f.slice(ROOT.length));
  assert.deepEqual(hits, []);
  assert.ok(/Baveno VI criteria/.test(readFileSync(join(ROOT, "js/calculators/liver/baveno8.js"), "utf8")));
});
