// SPEC.md B8.1 Unit conversions
import { test } from "node:test";
import assert from "node:assert/strict";
import { approx } from "./helpers.js";
import { bilirubinUmolToMgdl, creatinineUmolToMgdl, bunMgdlToUreaMmol, convert } from "../js/units.js";

test("B8.1 Bilirubin 34.2 µmol/L = 2.00 mg/dL", () => approx(bilirubinUmolToMgdl(34.2), 2.00));
test("B8.1 Creatinine 106 µmol/L = 1.20 mg/dL", () => approx(creatinineUmolToMgdl(106), 1.20));
test("B8.1 BUN 25 mg/dL = urea 8.93 mmol/L", () => approx(bunMgdlToUreaMmol(25), 8.93));

test("B1.5 conversions round-trip and match the table", () => {
  approx(convert("albumin", 35, "si", "conv"), 3.5);
  approx(convert("hemoglobin", 135, "si", "conv"), 13.5);
  approx(convert("glucose", 10, "si", "conv"), 180);
  approx(convert("calcium", 2.0, "si", "conv"), 8.0);
  approx(convert("platelets", 150, "conv", "si"), 150);
  approx(convert("wbc", 12, "si", "conv"), 12);
  for (const a of ["bilirubin", "creatinine", "urea", "albumin", "hemoglobin", "glucose", "calcium"]) {
    approx(convert(a, convert(a, 7.3, "si", "conv"), "conv", "si"), 7.3, 6, a);
  }
});

// Converted values are trimmed to 12 significant digits, so an exact equivalent of a cutoff written in one unit
// only compares as that cutoff (205.2 µmol/L ÷ 17.1 was 11.999999999999998 mg/dL before the trim).
test("B1.5 exact equivalents of single-unit cutoffs convert to the cutoff exactly", () => {
  const cases = [
    ["bilirubin", 102.6, "si", 6], ["bilirubin", 205.2, "si", 12], ["bilirubin", 85.5, "si", 5], ["bilirubin", 68.4, "si", 4],
    ["creatinine", 132.6, "si", 1.5], ["creatinine", 176.8, "si", 2], ["creatinine", 309.4, "si", 3.5],
    ["hemoglobin", 100, "si", 10], ["hemoglobin", 105, "si", 10.5], ["hemoglobin", 120, "si", 12], ["hemoglobin", 130, "si", 13],
    ["hemoglobin", 7, "conv", 70], ["hemoglobin", 9, "conv", 90], ["hemoglobin", 11, "conv", 110], ["hemoglobin", 13, "conv", 130], ["hemoglobin", 16, "conv", 160],
    ["albumin", 3.2, "conv", 32], ["glucose", 180, "conv", 10], ["calcium", 8, "conv", 2],
    ["protein", 10, "si", 1], ["protein", 25, "si", 2.5]
  ];
  for (const [a, v, from, want] of cases) {
    assert.equal(convert(a, v, from, from === "si" ? "conv" : "si"), want, `${a} ${v} (${from})`);
  }
});

test("B1.5 every exactly typeable equivalent of a 2-decimal value converts back to that value exactly", () => {
  for (const a of ["bilirubin", "creatinine", "urea", "albumin", "hemoglobin", "glucose", "calcium", "protein"]) {
    for (const [base, entry] of [["conv", "si"], ["si", "conv"]]) {
      for (let i = 1; i <= 5000; i++) {
        const want = i / 100;
        const equivalent = convert(a, want, base, entry);
        const typed = Number(equivalent.toFixed(6));
        if (Math.abs(typed - equivalent) > 1e-9) continue; // not exactly typeable
        assert.equal(convert(a, typed, entry, base), want, `${a}: ${typed} ${entry} → ${base}`);
      }
    }
  }
});

test("B1.5 conversion trim leaves empty, missing and non-finite values unchanged", () => {
  assert.equal(convert("bilirubin", null, "si", "conv"), null);
  assert.equal(convert("bilirubin", undefined, "si", "conv"), undefined);
  assert.ok(Number.isNaN(convert("bilirubin", NaN, "si", "conv")));
  assert.equal(convert("bilirubin", Infinity, "si", "conv"), Infinity);
  assert.equal(convert("bilirubin", 0, "si", "conv"), 0);
});
