// SPEC.md B3.21 CLIF-C OF and CLIF-C ACLF score; vectors from B8.3.
import { test } from "node:test";
import assert from "node:assert/strict";
import def, { organScores, clifCAclf } from "../js/calculators/liver/clif_c_aclf.js";
import aclf from "../js/calculators/liver/aclf.js";
import { calc, approx } from "./helpers.js";

const base = { he: "none", age: 50, wbc: 10 };

test("B8.3 clinical owner vector: OF 12, age 50, WBC 10 → 54 (unrounded 54.11), 70 or less", () => {
  const { result, interp } = calc(def, { bili: 7, cr: 2.5, he: "1-2", inr: 2.2, map: 65, pf: 250, age: 50, wbc: 10 });
  assert.equal(result.of, 12);
  approx(result.raw, 54.11, 2);
  assert.equal(result.score, 54);
  assert.equal(interp.band, "CLIF-C ACLF 70 or less");
  assert.equal(interp.action, undefined);
});

test("B8.3 clinical owner vector: OF 16, age 60, WBC 20 → 76 (unrounded 75.67), above 70, with the action text", () => {
  const { result, interp } = calc(def, { bili: 13, cr: 4, he: "3-4", inr: 2.6, vaso: true, pf: 400, age: 60, wbc: 20 });
  assert.equal(result.of, 16);
  approx(result.raw, 75.67, 2);
  assert.equal(result.score, 76);
  assert.equal(interp.band, "CLIF-C ACLF above 70");
  assert.equal(interp.level, "high");
  assert.equal(interp.action, "After 3–7 days of full organ support, with 4 or more organ failures or a score above 70 and no transplant option: discuss withdrawal of organ support and palliative care with the family (B7.20).");
});

test("B8.3: lowest organ scores give OF 6 and CLIF-C ACLF 34", () => {
  const { result } = calc(def, { bili: 1, cr: 1, inr: 1.2, map: 80, sf: 400, ...base });
  assert.equal(result.of, 6);
  assert.equal(result.score, 34);
});

test("B8.3: SI entries at the exact cutoff equivalents score as the mg/dL cutoff (205.2 µmol/L = 12 mg/dL, 176.8 µmol/L = 2 mg/dL)", () => {
  const { result } = calc(def, { bili: 205.2, cr: 176.8, inr: 2.0, map: 70, sf: 357, ...base }, { bili: "si", cr: "si" });
  assert.deepEqual(result.organs, { Liver: 3, Kidney: 2, Brain: 1, Coagulation: 2, Circulation: 1, Respiration: 2 });
  assert.equal(result.of, 11);
});

test("SI entries at every bilirubin and creatinine cutoff equivalent score as the mg/dL cutoff (B3.21, B1.5)", () => {
  const organs = (bili, cr) => calc(def, { bili, cr, inr: 1.2, map: 80, pf: 400, ...base }, { bili: "si", cr: "si" }).result.organs;
  // Bilirubin: 102.6 µmol/L = 6 mg/dL, 205.2 µmol/L = 12 mg/dL.
  assert.equal(organs(102.5, 80).Liver, 1); assert.equal(organs(102.6, 80).Liver, 2);
  assert.equal(organs(205.1, 80).Liver, 2); assert.equal(organs(205.2, 80).Liver, 3);
  // Creatinine: 176.8 µmol/L = 2 mg/dL, 309.4 µmol/L = 3.5 mg/dL.
  assert.equal(organs(20, 176.7).Kidney, 1); assert.equal(organs(20, 176.8).Kidney, 2);
  assert.equal(organs(20, 309.3).Kidney, 2); assert.equal(organs(20, 309.4).Kidney, 3);
});

test("B8.3: renal replacement therapy, intubated for HE, INR 2.5, MAP 69, SpO2/FiO2 214 → OF 16", () => {
  const { result } = calc(def, { bili: 102.6, rrt: true, he: "3-4", inr: 2.5, map: 69, sf: 214, age: 50, wbc: 10 }, { bili: "si" });
  assert.deepEqual(result.organs, { Liver: 2, Kidney: 3, Brain: 3, Coagulation: 3, Circulation: 2, Respiration: 3 });
  assert.equal(result.of, 16);
});

test("B8.3: mechanical ventilation not for HE scores respiration 3 whatever the ratios", () => {
  const { result } = calc(def, { bili: 1, cr: 1, inr: 1.2, map: 80, pf: 300, sf: 400, vent: true, ...base });
  assert.equal(result.organs.Respiration, 3);
  assert.equal(result.of, 8);
});

test("organ boundaries from B3.21", () => {
  const r = v => organScores({ he: "none", bili: 1, cr: 1, inr: 1, map: 80, pf: 400, ...v }).scores;
  assert.equal(r({ bili: 5.99 }).Liver, 1); assert.equal(r({ bili: 6 }).Liver, 2); assert.equal(r({ bili: 11.99 }).Liver, 2); assert.equal(r({ bili: 12 }).Liver, 3);
  assert.equal(r({ cr: 1.99 }).Kidney, 1); assert.equal(r({ cr: 2 }).Kidney, 2); assert.equal(r({ cr: 3.49 }).Kidney, 2); assert.equal(r({ cr: 3.5 }).Kidney, 3);
  assert.equal(r({ cr: undefined, rrt: true }).Kidney, 3);
  assert.equal(r({ he: "1-2" }).Brain, 2); assert.equal(r({ he: "3-4" }).Brain, 3);
  assert.equal(r({ inr: 1.99 }).Coagulation, 1); assert.equal(r({ inr: 2 }).Coagulation, 2); assert.equal(r({ inr: 2.49 }).Coagulation, 2); assert.equal(r({ inr: 2.5 }).Coagulation, 3);
  assert.equal(r({ map: 70 }).Circulation, 1); assert.equal(r({ map: 69.9 }).Circulation, 2); assert.equal(r({ map: undefined, vaso: true }).Circulation, 3); assert.equal(r({ map: 80, vaso: true }).Circulation, 3);
  assert.equal(r({ pf: 300.1 }).Respiration, 1); assert.equal(r({ pf: 300 }).Respiration, 2); assert.equal(r({ pf: 200.5 }).Respiration, 2); assert.equal(r({ pf: 200 }).Respiration, 3);
  assert.equal(r({ pf: undefined, sf: 357.1 }).Respiration, 1); assert.equal(r({ pf: undefined, sf: 357 }).Respiration, 2); assert.equal(r({ pf: undefined, sf: 214.5 }).Respiration, 2); assert.equal(r({ pf: undefined, sf: 214 }).Respiration, 3);
  // PaO2/FiO2 is used when both are entered.
  assert.equal(r({ pf: 150, sf: 400 }).Respiration, 3);
});

test("missing organ items are listed and nothing is calculated", () => {
  const { result, interp } = calc(def, { bili: 1, inr: 1.2, ...base });
  assert.equal(result.score, null);
  assert.deepEqual(result.missing, ["Creatinine (or renal replacement therapy)", "MAP (or vasopressors)", "PaO2/FiO2 or SpO2/FiO2 (or mechanical ventilation not for HE)"]);
  assert.match(interp.band, /^Enter the missing items: /);
});

test("the >70 cutoff uses the whole number shown", () => {
  // Find inputs around the cutoff from the formula itself: 70.4 shows 70 (not above), 70.5 shows 71 (above).
  assert.ok(clifCAclf(12, 50, 10) < 70);
  const r70 = { score: 70 }, r71 = { score: 71 };
  assert.equal(def.interpret({ ...r70, of: 14 }).band, "CLIF-C ACLF 70 or less");
  assert.equal(def.interpret({ ...r71, of: 14 }).band, "CLIF-C ACLF above 70");
});

test("CLIF-C ACLF and ACLF grade link to the acute-on-chronic liver failure page (B3.17, B3.21)", () => {
  const out = calc(def, { bili: 1, cr: 1, inr: 1.2, map: 80, pf: 400, ...base });
  assert.ok(out.interp.links.some(l => l.target === "em_aclf"));
  const g = calc(aclf, { bili: 1, cr: 1, he: "none", inr: 1, pf: 400 });
  assert.ok(g.interp.links.some(l => l.target === "em_aclf"));
  assert.match(def.references[0].url, /pubmed\.ncbi\.nlm\.nih\.gov\/24950482\/$/);
  assert.match(aclf.references[0].url, /pubmed\.ncbi\.nlm\.nih\.gov\/23474284\/$/);
});
