// SPEC.md B8.3 FibroScan (B3.20) test vectors
import { test } from "node:test";
import assert from "node:assert/strict";
import fs, { fibrosisStage, steatosisGrade, baveno, ALCOHOL_NOTE, IQR_WARNING, VALID_WARNING, FLARE_WARNING, CONFOUNDER_WARNING } from "../js/calculators/liver/fibroscan.js";
import { calc } from "./helpers.js";
import { evaluate } from "../js/engine.js";

test("FibroScan: MASLD 10.5 kPa, CAP 310 → F3, S3", () => {
  const { result } = calc(fs, { disease: "masld", lsm: 10.5, cap: 310 });
  assert.equal(result.stage, "F3");
  assert.equal(result.steatosis, "S3");
  assert.deepEqual(result.display, ["Fibrosis: F3", "Steatosis: S3"]);
});

test("FibroScan: MASLD 6.5 kPa, CAP 240 → F0–F1, S0", () => {
  const { result } = calc(fs, { disease: "masld", lsm: 6.5, cap: 240 });
  assert.equal(result.stage, "F0–F1");
  assert.equal(result.steatosis, "S0");
});

test("FibroScan: hepatitis C 13.0 kPa → F4", () => {
  assert.equal(calc(fs, { disease: "hcv", lsm: 13.0 }).result.stage, "F4");
});

test("FibroScan: hepatitis B 10.0 kPa → F3", () => {
  assert.equal(calc(fs, { disease: "hbv", lsm: 10.0 }).result.stage, "F3");
});

test("FibroScan: alcohol-related 16 kPa → F3, with the abstinence note", () => {
  const { result, interp } = calc(fs, { disease: "alcohol", lsm: 16 });
  assert.equal(result.stage, "F3");
  assert.ok(interp.notes.includes(ALCOHOL_NOTE));
  assert.equal(ALCOHOL_NOTE, "Higher AST or bilirubin raises stiffness; repeat after abstinence.");
});

test("FibroScan: other 12 kPa → cACLD suggestive (no F stage)", () => {
  const { result, interp } = calc(fs, { disease: "other", lsm: 12 });
  assert.equal(result.stage, null);
  assert.equal(result.baveno.text, "cACLD suggestive");
  assert.deepEqual(result.display, ["Baveno VII: cACLD suggestive"]);
  assert.equal(interp.band, "Baveno VII: cACLD suggestive");
});

test("FibroScan: CAP 250 → S1; CAP 270 → S2", () => {
  assert.equal(calc(fs, { disease: "masld", lsm: 6, cap: 250 }).result.steatosis, "S1");
  assert.equal(calc(fs, { disease: "masld", lsm: 6, cap: 270 }).result.steatosis, "S2");
});

test("FibroScan: MASLD 9.0 kPa with IQR/median 35% → F2 shown, plus unreliable-exam warning", () => {
  const { result, interp } = calc(fs, { disease: "masld", lsm: 9.0, iqr: 35 });
  assert.equal(result.stage, "F2");
  assert.deepEqual(result.display, ["Fibrosis: F2"]);
  assert.ok(result.unreliable);
  assert.deepEqual(interp.sections[0].lines, [IQR_WARNING]);
});

test("FibroScan: result needs only disease and kPa", () => {
  const out = evaluate(fs, { disease: "hcv", lsm: 8 });
  assert.deepEqual(out.missing, []);
  assert.equal(out.result.stage, "F2");
  assert.deepEqual(out.interp.sections, []);
  assert.deepEqual(evaluate(fs, { disease: "hcv" }).missing, ["2. Liver stiffness"]);
});

test("FibroScan: exam-quality inputs only add warnings; the stage is unchanged", () => {
  const plain = calc(fs, { disease: "hbv", lsm: 9 }).result.stage;
  const { result } = calc(fs, { disease: "hbv", lsm: 9, valid: 6, iqr: 40, altX: 6, cFast: true });
  assert.equal(result.stage, plain);
  assert.deepEqual(result.warnings, [VALID_WARNING, IQR_WARNING, CONFOUNDER_WARNING, "Confounder: Fasting <3 hours", FLARE_WARNING]);
  // IQR/median >30% with LSM <7.1 is not a warning.
  assert.deepEqual(calc(fs, { disease: "masld", lsm: 6.5, iqr: 35 }).result.warnings, []);
});

test("FibroScan: stage cutoffs are 'at or above'", () => {
  const cases = { masld: [8.2, 9.7, 13.6], hcv: [7.1, 9.5, 12.5], hbv: [7.9, 8.8, 11.7], alcohol: [9.0, 12.9, 18.6] };
  for (const [d, [f2, f3, f4]] of Object.entries(cases)) {
    assert.equal(fibrosisStage(d, f2 - 0.01), "F0–F1", d);
    assert.equal(fibrosisStage(d, f2), "F2", d);
    assert.equal(fibrosisStage(d, f3), "F3", d);
    assert.equal(fibrosisStage(d, f4), "F4", d);
  }
});

test("FibroScan: steatosis and Baveno VII boundaries", () => {
  assert.equal(steatosisGrade(247), "S0");
  assert.equal(steatosisGrade(248), "S1");
  assert.equal(steatosisGrade(268), "S2");
  assert.equal(steatosisGrade(280), "S3");
  assert.equal(baveno(9.9).text, "cACLD unlikely");
  assert.equal(baveno(10).text, "cACLD suggestive");
  assert.equal(baveno(15).text, "cACLD suggestive");
  assert.equal(baveno(15.1).text, "cACLD highly suggestive");
  assert.equal(baveno(24.9).text, "cACLD highly suggestive");
  assert.equal(baveno(25).text, "cACLD highly suggestive; CSPH ruled in (Baveno VII)");
});

test("FibroScan: a Baveno VII line is shown under the result for every disease", () => {
  for (const disease of ["masld", "alcohol", "hbv", "hcv"]) {
    assert.equal(calc(fs, { disease, lsm: 12 }).interp.text, "Baveno VII: cACLD suggestive.", disease);
  }
});

test("FibroScan: other/mixed 27 kPa → CSPH ruled in (Baveno VII)", () => {
  const { result, interp } = calc(fs, { disease: "other", lsm: 27 });
  assert.deepEqual(result.display, ["Baveno VII: cACLD highly suggestive; CSPH ruled in (Baveno VII)"]);
  assert.equal(interp.level, "high");
});

test("FibroScan: the alcohol-related reference links to JHEP Reports 2020;2(3):100101", () => {
  const r = fs.references.find(r => r.citation.includes("100101"));
  assert.equal(r.url, "https://pmc.ncbi.nlm.nih.gov/articles/PMC7267467/");
  assert.match(r.citation, /doi:10\.1016\/j\.jhepr\.2020\.100101/);
});
