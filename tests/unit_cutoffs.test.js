// No lab value may fall just below (or above) a cutoff because of floating-point unit conversion (SPEC.md B1.5).
// For every calculator input with a unit toggle, each cutoff is tested at its exact equivalent in the other unit:
// the entry in that unit must give the same result as the entry in the unit the formula uses.
// Cutoffs written in both units are compared in the unit entered (B1.5); those rows enter the value written for
// each unit and check both give the result the spec states.
import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluate } from "../js/engine.js";
import { CALCULATORS } from "../js/registry.js";
import { convert } from "../js/units.js";

const calcById = id => CALCULATORS.find(c => c.id === id);

// Comparable summary of a result: band, level, displayed values, and the breakdown points or yes/no values.
function summary(out) {
  assert.deepEqual(out.errors, [], JSON.stringify(out.errors));
  assert.deepEqual(out.missing, [], out.missing.join(", "));
  const r = out.result, it = out.interp;
  const bd = (r.breakdown || []).map(b => b.points !== undefined ? b.points : /^(Yes|No|Met|Not met|Positive|Negative)$/.test(b.value) ? b.value : null);
  return { band: it.band, level: it.level, display: r.display, breakdown: bd, organs: r.organs };
}

// entries: { inputId: [siValue, convValue] }. Enters every listed input in SI, then every one in conventional
// units, keeping the other inputs at `base` (in the units each input uses).
function both(calc, base, entries) {
  const def = calcById(calc);
  const si = { ...base }, conv = { ...base }, uSi = {}, uConv = {};
  for (const [id, [s, c]] of Object.entries(entries)) { si[id] = s; conv[id] = c; uSi[id] = "si"; uConv[id] = "conv"; }
  return { si: evaluate(def, si, uSi), conv: evaluate(def, conv, uConv) };
}

// ---------- exact equivalents: one-unit cutoffs and formula bounds ----------
// [calculator, cutoff as written, base inputs, { input: [SI value, conventional value] }, expected band for both (optional)]
const EXACT = [
  ["aclf", "Liver failure: bilirubin ≥12 mg/dL", { cr: 1.6, inr: 1.2, he: "none" }, { bili: [205.2, 12] }, "ACLF grade 1"],
  ["aclf", "Kidney failure: creatinine ≥2.0 mg/dL", { bili: 1, inr: 1.2, he: "none" }, { cr: [176.8, 2] }, "ACLF grade 1"],
  ["aclf", "Kidney dysfunction: creatinine 1.5–1.9 mg/dL (≥1.5)", { bili: 1, inr: 2.6, he: "none" }, { cr: [132.6, 1.5] }, "ACLF grade 1"],
  ["clif_c_aclf", "Liver 2 points: bilirubin 6 to <12 mg/dL", { cr: 1, he: "none", inr: 1.2, map: 80, pf: 400, age: 50, wbc: 10 }, { bili: [102.6, 6] }],
  ["clif_c_aclf", "Liver 3 points: bilirubin ≥12 mg/dL", { cr: 1, he: "none", inr: 1.2, map: 80, pf: 400, age: 50, wbc: 10 }, { bili: [205.2, 12] }],
  ["clif_c_aclf", "Kidney 2 points: creatinine 2 to <3.5 mg/dL", { bili: 1, he: "none", inr: 1.2, map: 80, pf: 400, age: 50, wbc: 10 }, { cr: [176.8, 2] }],
  ["clif_c_aclf", "Kidney 3 points: creatinine ≥3.5 mg/dL", { bili: 1, he: "none", inr: 1.2, map: 80, pf: 400, age: 50, wbc: 10 }, { cr: [309.4, 3.5] }],
  ["meld_na", "Bilirubin bounded at 1.0 mg/dL", { inr: 1.5, cr: 1.2, na: 130 }, { bili: [17.1, 1] }],
  ["meld_na", "Creatinine bounded at 1.0 mg/dL", { bili: 2, inr: 1.5, na: 130 }, { cr: [88.4, 1] }],
  ["meld_na", "Creatinine capped at 4.0 mg/dL", { bili: 2, inr: 1.5, na: 130 }, { cr: [353.6, 4] }],
  ["meld3", "Bilirubin bounded at 1.0 mg/dL", { sex: "M", inr: 1.5, cr: 1.2, na: 130, alb: 3.0 }, { bili: [17.1, 1] }],
  ["meld3", "Creatinine bounded at 1.0 mg/dL", { sex: "M", bili: 2, inr: 1.5, na: 130, alb: 3.0 }, { cr: [88.4, 1] }],
  ["meld3", "Creatinine capped at 3.0 mg/dL", { sex: "M", bili: 2, inr: 1.5, na: 130, alb: 3.0 }, { cr: [265.2, 3] }],
  ["meld3", "Albumin bounded at 1.5 g/dL", { sex: "M", bili: 2, inr: 1.5, cr: 1.2, na: 130 }, { alb: [15, 1.5] }],
  ["meld3", "Albumin capped at 3.5 g/dL", { sex: "M", bili: 2, inr: 1.5, cr: 1.2, na: 130 }, { alb: [35, 3.5] }],
  ["maddrey", "Formula (bilirubin mg/dL; DF ≥32 band)", { pt: 20, ptc: 12 }, { bili: [171, 10] }],
  ["abic", "Formula (bilirubin and creatinine mg/dL; bands on the score)", { age: 50, inr: 1.8 }, { bili: [171, 10], cr: [88.4, 1] }],
  ["nfs", "Formula (albumin g/dL)", { age: 55, bmi: 32, ifg: true, ast: 40, alt: 50, plt: 180 }, { alb: [40, 4] }],
  ["albi", "Formula (bilirubin µmol/L, albumin g/L): conventional entries", {}, { bili: [34.2, 2], alb: [35, 3.5] }],
  ["lille", "Formula (albumin g/L, bilirubin µmol/L): conventional entries", { age: 50, pt: 18, cr: 1.0 }, { alb: [30, 3], bili0: [171, 10], bili7: [85.5, 5] }],
  ["r_factor", "Hy's law: bilirubin >2 × ULN (exactly 2 × ULN is not met)", { alt: 400, altUln: 40, alp: 150, alpUln: 120 }, { bili: [41.04, 2.4], biliUln: [20.52, 1.2] }],
  ["r_factor", "Hy's law: bilirubin >2 × ULN (met)", { alt: 400, altUln: 40, alp: 150, alpUln: 120 }, { bili: [42.75, 2.5], biliUln: [20.52, 1.2] }],
  ["ascites", "SAAG ≥1.1 g/dL (portal hypertension)", {}, { salb: [35, 3.5], aalb: [24, 2.4] }, "Portal hypertension"],
  ["ascites", "SAAG ≥1.1 g/dL (portal hypertension)", {}, { salb: [33, 3.3], aalb: [22, 2.2] }, "Portal hypertension"],
  ["ascites", "SAAG <1.1 g/dL", {}, { salb: [33, 3.3], aalb: [23, 2.3] }, "Not portal hypertension"],
  ["ascites", "Ascitic total protein <2.5 g/dL suggests cirrhosis (2.5 does not)", { salb: 3.5, aalb: 2.0 }, { aprot: [25, 2.5] }],
  ["ascites", "Runyon: ascitic total protein >1 g/dL (1 is not met)", { wbc: 500, neut: 60 }, { aprot: [10, 1] }],
  ["gbs", "Hemoglobin, men ≥13.0 / 12.0 to <13.0 g/dL", { urea: 5, sex: "M", sbp: 120, pulse: 80 }, { hb: [130, 13] }],
  ["gbs", "Hemoglobin, men 12.0 to <13.0 g/dL", { urea: 5, sex: "M", sbp: 120, pulse: 80 }, { hb: [120, 12] }],
  ["gbs", "Hemoglobin, men 10.0 to <12.0 g/dL", { urea: 5, sex: "M", sbp: 120, pulse: 80 }, { hb: [100, 10] }],
  ["gbs", "Hemoglobin, women ≥12.0 g/dL", { urea: 5, sex: "F", sbp: 120, pulse: 80 }, { hb: [120, 12] }],
  ["gbs", "Hemoglobin, women 10.0 to <12.0 g/dL", { urea: 5, sex: "F", sbp: 120, pulse: 80 }, { hb: [100, 10] }],
  ["truelove_witts", "Hemoglobin <10.5 g/dL (10.5 is not)", { stools: 8, blood: "bloody" }, { hb: [105, 10.5] }],
  ["asge_cbd", "Total bilirubin >4 mg/dL (4 is not)", { cbd: 8, age: 40 }, { bili: [68.4, 4] }, "Intermediate risk"],
  ["tg18_cholangitis", "Grade II: total bilirubin ≥5 mg/dL", { temp: 38.5, wbc: 15, dilatation: true, age: 50 }, { bili: [85.5, 5] }],
  ["oakland", "Hemoglobin 70 g/L band", { age: 35, sex: "F", hr: 65, sbp: 135 }, { hb: [70, 7] }],
  ["oakland", "Hemoglobin 90 g/L band", { age: 35, sex: "F", hr: 65, sbp: 135 }, { hb: [90, 9] }],
  ["oakland", "Hemoglobin 110 g/L band", { age: 35, sex: "F", hr: 65, sbp: 135 }, { hb: [110, 11] }],
  ["oakland", "Hemoglobin 130 g/L band", { age: 35, sex: "F", hr: 65, sbp: 135 }, { hb: [130, 13] }],
  ["oakland", "Hemoglobin 160 g/L band", { age: 35, sex: "F", hr: 65, sbp: 135 }, { hb: [160, 16] }],
  ["glasgow_imrie", "Albumin <32 g/L", { pao2Unit: "mmhg", pao2: 80, age: 40, wbc: 10, calcium: 2.2, urea: 5, ldh: 300, glucose: 6 }, { albumin: [32, 3.2] }],
  ["glasgow_imrie", "Calcium <2 mmol/L", { pao2Unit: "mmhg", pao2: 80, age: 40, wbc: 10, urea: 5, ldh: 300, albumin: 40, glucose: 6 }, { calcium: [2, 8] }],
  ["glasgow_imrie", "Glucose >10 mmol/L", { pao2Unit: "mmhg", pao2: 80, age: 40, wbc: 10, calcium: 2.2, urea: 5, ldh: 300, albumin: 40 }, { glucose: [10, 180] }]
];

for (const [calc, cutoff, base, entries, band] of EXACT) {
  const label = Object.entries(entries).map(([id, [s, c]]) => `${id} ${s} SI = ${c} conventional`).join(", ");
  test(`${calc}: ${cutoff}: ${label} give the same result`, () => {
    const { si, conv } = both(calc, base, entries);
    assert.deepEqual(summary(si), summary(conv));
    if (band) assert.equal(si.interp.band, band);
  });
}

test("exact SI equivalents of single-unit cutoffs convert to the exact conventional value (no floating-point noise)", () => {
  const pairs = [["bilirubin", 205.2, 12], ["bilirubin", 102.6, 6], ["bilirubin", 85.5, 5], ["bilirubin", 68.4, 4], ["bilirubin", 30.78, 1.8], ["bilirubin", 17.1, 1],
    ["creatinine", 176.8, 2], ["creatinine", 132.6, 1.5], ["creatinine", 309.4, 3.5], ["creatinine", 265.2, 3], ["creatinine", 353.6, 4], ["creatinine", 88.4, 1],
    ["albumin", 15, 1.5], ["albumin", 35, 3.5], ["protein", 25, 2.5], ["protein", 10, 1], ["hemoglobin", 105, 10.5], ["hemoglobin", 130, 13]];
  for (const [a, si, conv] of pairs) assert.equal(convert(a, si, "si", "conv"), conv, `${a} ${si}`);
  for (const [a, conv, si] of [["hemoglobin", 7, 70], ["hemoglobin", 11, 110], ["albumin", 3.2, 32], ["calcium", 8, 2], ["glucose", 180, 10], ["bilirubin", 10, 171]]) {
    assert.equal(convert(a, conv, "conv", "si"), si, `${a} ${conv}`);
  }
});

test("examples from the clinical owner: 205.2 µmol/L bilirubin counts as 12 mg/dL", () => {
  const def = calcById("aclf");
  const out = evaluate(def, { bili: 205.2, cr: 1, inr: 1.2, he: "none" }, { bili: "si" });
  assert.ok(out.result.failed.includes("Liver"));
  const clif = evaluate(calcById("clif_c_aclf"), { bili: 205.2, cr: 1, he: "none", inr: 1.2, map: 80, pf: 400, age: 50, wbc: 10 }, { bili: "si" });
  assert.equal(clif.result.organs.Liver, 3);
});

// ---------- cutoffs written in both units (compared in the unit entered, B1.5) ----------
// [calculator, cutoff as written, base inputs, { input: [SI value as written, conventional value as written] }, expected band for both]
const WRITTEN_BOTH = [
  ["child_pugh", "Bilirubin 2 points: 2–3 mg/dL (34–50 µmol/L), lower end", { alb: 4, inr: 1, ascites: 1, he: 1 }, { bili: [34, 2] }],
  ["child_pugh", "Bilirubin 2 points: 2–3 mg/dL (34–50 µmol/L), upper end", { alb: 4, inr: 1, ascites: 1, he: 1 }, { bili: [50, 3] }],
  ["child_pugh", "Cholestatic bilirubin 2 points: 4–10 mg/dL (68–170 µmol/L), lower end", { cholestatic: true, alb: 4, inr: 1, ascites: 1, he: 1 }, { bili: [68, 4] }],
  ["child_pugh", "Cholestatic bilirubin 2 points: 4–10 mg/dL (68–170 µmol/L), upper end", { cholestatic: true, alb: 4, inr: 1, ascites: 1, he: 1 }, { bili: [170, 10] }],
  ["child_pugh", "Albumin 2 points: 2.8–3.5 g/dL (28–35 g/L), lower end", { bili: 1, inr: 1, ascites: 1, he: 1 }, { alb: [28, 2.8] }],
  ["child_pugh", "Albumin 2 points: 2.8–3.5 g/dL (28–35 g/L), upper end", { bili: 1, inr: 1, ascites: 1, he: 1 }, { alb: [35, 3.5] }],
  ["aims65", "Albumin <3.0 g/dL (<30 g/L): 30 g/L is not met", { inr: 1, sbp: 120, age: 40 }, { albumin: [30, 3] }],
  ["kings", "Acetaminophen: creatinine >300 µmol/L (>3.4 mg/dL): the value itself is not met", { type: "apap", ph: 7.35, inr: 7, he34: true }, { cr: [300, 3.4] }],
  ["kings", "Non-acetaminophen: bilirubin >300 µmol/L (>17.6 mg/dL): the value itself is not met", { type: "non", inr: 2, age: 45 }, { bili: [300, 17.6] }],
  ["lille", "Renal insufficiency: creatinine >1.3 mg/dL (>115 µmol/L): the value itself is not met", { age: 50, alb: 30, bili0: 250, bili7: 150, pt: 18 }, { cr: [115, 1.3] }],
  ["bisap", "BUN >25 mg/dL (urea >8.9 mmol/L): the value itself is not met", { gcs: 15, age: 40 }, { bun: [8.9, 25] }],
  ["ranson", "Glucose >200 mg/dL (>11.1 mmol/L): the value itself is not met", { type: "non", age: 40, wbc: 10, ldh: 100, ast: 50 }, { glucose: [11.1, 200] }],
  ["ranson", "Calcium <8 mg/dL (<2.0 mmol/L): the value itself is not met", { type: "non", age: 40, wbc: 10, glucose: 100, ldh: 100, ast: 50 }, { calcium: [2.0, 8] }],
  ["ranson", "BUN rise >5 mg/dL (urea >1.8 mmol/L): the value itself is not met", { type: "non", age: 40, wbc: 10, glucose: 100, ldh: 100, ast: 50 }, { bunRise: [1.8, 5] }],
  ["tg18_cholangitis", "B-1: total bilirubin ≥2 mg/dL (≥34 µmol/L)", { temp: 38.5, wbc: 8, dilatation: true, age: 50 }, { bili: [34, 2] }]
];

for (const [calc, cutoff, base, entries] of WRITTEN_BOTH) {
  const label = Object.entries(entries).map(([id, [s, c]]) => `${id} ${s} SI and ${c} conventional`).join(", ");
  test(`${calc}: ${cutoff}: ${label} are classified alike`, () => {
    const { si, conv } = both(calc, base, entries);
    const a = summary(si), b = summary(conv);
    assert.equal(a.band, b.band);
    assert.deepEqual(a.breakdown, b.breakdown);
  });
}

// Modified Marshall renal scores use two separate written scales (SPEC.md B4.5), so each unit is tested on its own.
test("marshall: creatinine at each written cutoff scores as written, in µmol/L and in mg/dL", () => {
  const def = calcById("marshall");
  const renal = (cr, sys) => {
    const out = evaluate(def, { respMode: "ratio", pf: 450, cr, cv: 0 }, { cr: sys });
    return out.result.breakdown.find(b => /renal|creatinine/i.test(b.item)).points;
  };
  assert.deepEqual([134, 169, 310, 439, 440].map(v => renal(v, "si")), [0, 1, 2, 3, 4]);
  assert.deepEqual([1.39, 1.4, 1.8, 3.6, 4.9, 4.91].map(v => renal(v, "conv")), [0, 1, 1, 2, 3, 4]);
});

// ---------- every converted input is covered ----------
// Inputs whose conversion is an identity (same number in both units) cannot drift.
const IDENTITY = new Set(["platelets", "wbc"]);
// Cutoffs with no exact equivalent in the other unit (a repeating decimal cannot be typed exactly).
const NO_EXACT = {
  "gbs.urea": "urea cutoffs 6.5, 8.0, 10.0, 25.0 mmol/L: BUN equivalents (÷0.357) repeat",
  "gahs.bili": "bilirubin 125 and 250 µmol/L: mg/dL equivalents (÷17.1) repeat",
  "gahs.urea": "urea 5 mmol/L: BUN equivalent (÷0.357) repeats",
  "glasgow_imrie.urea": "urea 16 mmol/L: BUN equivalent (÷0.357) repeats",
  "ascites.aglu": "glucose 50 mg/dL: mmol/L equivalent (÷18) repeats"
};

test("every lab input with a unit toggle is covered: exact-equivalent rows, both-unit rows, identity, or no exact equivalent", () => {
  const covered = new Set([...EXACT, ...WRITTEN_BOTH].flatMap(([calc, , , entries]) => Object.keys(entries).map(id => `${calc}.${id}`)));
  covered.add("marshall.cr");
  const missing = [];
  for (const c of CALCULATORS) for (const inp of c.inputs.filter(i => i.analyte)) {
    const key = `${c.id}.${inp.id}`;
    if (IDENTITY.has(inp.analyte) || covered.has(key) || NO_EXACT[key]) continue;
    missing.push(key);
  }
  assert.deepEqual(missing, []);
});
