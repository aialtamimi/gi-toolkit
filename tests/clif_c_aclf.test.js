// SPEC.md B3.21 CLIF-C OF and CLIF-C ACLF score; vectors from B8.3.
import { test } from "node:test";
import assert from "node:assert/strict";
import def, { organScores, organFailures, clifCAclf } from "../js/calculators/liver/clif_c_aclf.js";
import aclf from "../js/calculators/liver/aclf.js";
import { calc, approx } from "./helpers.js";

const base = { he: "none", age: 50, wbc: 10 };
const ACTION = "After 3–7 days of full organ support, with 4 or more organ failures or a score above 70 and no transplant option: discuss withdrawal of organ support and palliative care with the family (B7.20).";
const NOTE = "A score of 70 or more after 48 h of ICU support was associated with 100% 28-day mortality in one ICU cohort (Engelmann, Crit Care 2018).";

test("B8.3 clinical owner vector: OF 12, age 50, WBC 10 → 54.1, 70 or less, 1 organ failure (kidney)", () => {
  const { result, interp } = calc(def, { bili: 7, cr: 2.5, he: "1-2", inr: 2.2, map: 65, pf: 250, age: 50, wbc: 10 });
  assert.equal(result.of, 12);
  approx(result.raw, 54.11, 2);
  assert.equal(result.display[0], "CLIF-C ACLF 54.1");
  assert.deepEqual(result.failed, ["Kidney"]);
  assert.equal(interp.band, "CLIF-C ACLF 70 or less");
  assert.equal(interp.action, undefined);
  assert.deepEqual(interp.notes, []);
});

test("B8.3 clinical owner vector: OF 16, age 60, WBC 20 → 75.7, above 70, action and Engelmann note, 5 organ failures", () => {
  const { result, interp } = calc(def, { bili: 13, cr: 4, he: "3-4", inr: 2.6, vaso: true, pf: 400, age: 60, wbc: 20 });
  assert.equal(result.of, 16);
  approx(result.raw, 75.67, 2);
  assert.equal(result.display[0], "CLIF-C ACLF 75.7");
  assert.equal(result.failures, 5);
  assert.equal(interp.band, "CLIF-C ACLF above 70");
  assert.equal(interp.level, "high");
  assert.equal(interp.action, ACTION);
  assert.deepEqual(interp.notes, [NOTE]);
});

test("B8.3: lowest organ scores give OF 6, CLIF-C ACLF 34.3 and no organ failure", () => {
  const { result } = calc(def, { bili: 1, cr: 1, inr: 1.2, map: 80, sf: 400, ...base });
  assert.equal(result.of, 6);
  assert.equal(result.display[0], "CLIF-C ACLF 34.3");
  assert.equal(result.failures, 0);
});

test("B8.3: SI entries at the exact cutoff equivalents (205.2 µmol/L = 12 mg/dL, 176.8 µmol/L = 2 mg/dL) → OF 11, 2 organ failures", () => {
  const { result } = calc(def, { bili: 205.2, cr: 176.8, inr: 2.0, map: 70, sf: 357, ...base }, { bili: "si", cr: "si" });
  assert.deepEqual(result.organs, { Liver: 3, Kidney: 2, Brain: 1, Coagulation: 2, Circulation: 1, Respiration: 2 });
  assert.equal(result.of, 11);
  assert.deepEqual(result.failed, ["Liver", "Kidney"]);
});

test("B8.3: renal replacement therapy, intubated for HE, INR 2.5, MAP 69, SpO2/FiO2 214 → OF 16, 4 organ failures", () => {
  const { result } = calc(def, { bili: 102.6, rrt: true, he: "3-4", inr: 2.5, map: 69, sf: 214, age: 50, wbc: 10 }, { bili: "si" });
  assert.deepEqual(result.organs, { Liver: 2, Kidney: 3, Brain: 3, Coagulation: 3, Circulation: 2, Respiration: 3 });
  assert.equal(result.of, 16);
  assert.deepEqual(result.failed, ["Kidney", "Brain", "Coagulation", "Respiration"]);
});

test("B8.3: mechanical ventilation not for HE scores respiration 3 whatever the ratios (1 organ failure)", () => {
  const { result } = calc(def, { bili: 1, cr: 1, inr: 1.2, map: 80, pf: 300, sf: 400, vent: true, ...base });
  assert.equal(result.organs.Respiration, 3);
  assert.equal(result.of, 8);
  assert.deepEqual(result.failed, ["Respiration"]);
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
  assert.equal(r({ pf: 150, sf: 400 }).Respiration, 3); // PaO2/FiO2 takes priority
});

test("organ failures follow the EASL-CLIF definitions: kidney from creatinine ≥2 mg/dL, every other organ only at score 3", () => {
  const f = v => organFailures(organScores({ he: "none", bili: 1, cr: 1, inr: 1, map: 80, pf: 400, ...v }).scores);
  assert.deepEqual(f({}), []);
  assert.deepEqual(f({ cr: 1.99 }), []);
  assert.deepEqual(f({ cr: 2 }), ["Kidney"]);
  assert.deepEqual(f({ cr: 3.5 }), ["Kidney"]);
  assert.deepEqual(f({ bili: 11.99 }), []);
  assert.deepEqual(f({ bili: 12 }), ["Liver"]);
  assert.deepEqual(f({ he: "1-2" }), []);
  assert.deepEqual(f({ he: "3-4" }), ["Brain"]);
  assert.deepEqual(f({ inr: 2.49 }), []);
  assert.deepEqual(f({ inr: 2.5 }), ["Coagulation"]);
  assert.deepEqual(f({ map: 60 }), []);
  assert.deepEqual(f({ vaso: true }), ["Circulation"]);
  assert.deepEqual(f({ pf: 201 }), []);
  assert.deepEqual(f({ pf: 200 }), ["Respiration"]);
});

test("4 or more organ failures with a score of 70 or less still gives the action text, without the Engelmann note", () => {
  const { result, interp } = calc(def, { bili: 13, cr: 2.5, he: "3-4", inr: 2.6, map: 75, pf: 400, age: 40, wbc: 5 });
  assert.equal(result.failures, 4);
  assert.ok(result.raw <= 70);
  assert.equal(interp.band, "CLIF-C ACLF 70 or less");
  assert.equal(interp.action, ACTION);
  assert.deepEqual(interp.notes, []);
});

test("missing organ items are listed and nothing is calculated", () => {
  const { result, interp } = calc(def, { bili: 1, inr: 1.2, ...base });
  assert.equal(result.score, null);
  assert.deepEqual(result.missing, ["Creatinine (or renal replacement therapy)", "MAP (or vasopressors)", "PaO2/FiO2 or SpO2/FiO2 (or mechanical ventilation not for HE)"]);
  assert.match(interp.band, /^Enter the missing items: /);
});

test("the >70 cutoff uses the unrounded value: 70.4 shows 70.4 and is above 70; 70.0 is not", () => {
  const i = raw => def.interpret({ raw, score: raw, of: 14, failures: 0, failed: [] });
  assert.equal(i(70.4).band, "CLIF-C ACLF above 70");
  assert.equal(i(70.04).band, "CLIF-C ACLF above 70");
  assert.equal(i(70).band, "CLIF-C ACLF 70 or less");
  assert.ok(clifCAclf(12, 50, 10) < 70);
});

test("CLIF-C ACLF links to the page; ACLF grade links only for grade 1–3 (B3.17, B3.21)", () => {
  const out = calc(def, { bili: 1, cr: 1, inr: 1.2, map: 80, pf: 400, ...base });
  assert.ok(out.interp.links.some(l => l.target === "em_aclf"));
  const none = calc(aclf, { bili: 1, cr: 1, he: "none", inr: 1, pf: 400 });
  assert.equal(none.interp.band, "No ACLF");
  assert.deepEqual(none.interp.links, []);
  const g1 = calc(aclf, { bili: 1, cr: 2.5, he: "none", inr: 1, pf: 400 });
  assert.equal(g1.interp.band, "ACLF grade 1");
  assert.ok(g1.interp.links.some(l => l.target === "em_aclf"));
  assert.match(def.references[0].url, /pubmed\.ncbi\.nlm\.nih\.gov\/24950482\/$/);
  assert.equal(def.references[1].url, "https://pubmed.ncbi.nlm.nih.gov/30305132/");
  assert.match(aclf.references[0].url, /pubmed\.ncbi\.nlm\.nih\.gov\/23474284\/$/);
});
