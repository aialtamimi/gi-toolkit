// SPEC.md B8.2 Glasgow-Blatchford Score
import { test } from "node:test";
import assert from "node:assert/strict";
import gbs from "../js/calculators/bleeding/gbs.js";
import { calc } from "./helpers.js";

test("GBS: urea 9.0, Hb 11.0 g/dL male, SBP 105, pulse 110, melena → 9, not low", () => {
  const { result, interp } = calc(gbs, { urea: 9.0, hb: 11.0, sex: "M", sbp: 105, pulse: 110, melena: true }, { urea: "si", hb: "conv" });
  assert.equal(result.score, 9);
  assert.equal(interp.band, "Not low");
});

test("GBS: urea 5.0, Hb 13.5 male, SBP 120, pulse 80 → 0, low", () => {
  const { result, interp } = calc(gbs, { urea: 5.0, hb: 13.5, sex: "M", sbp: 120, pulse: 80 }, { urea: "si", hb: "conv" });
  assert.equal(result.score, 0);
  assert.equal(interp.band, "Low");
});

test("GBS: urea 30, Hb 8.5 female, SBP 85, pulse 120, all yes → 23 (maximum)", () => {
  const { result } = calc(gbs, { urea: 30, hb: 8.5, sex: "F", sbp: 85, pulse: 120, melena: true, syncope: true, hepatic: true, cardiac: true }, { urea: "si", hb: "conv" });
  assert.equal(result.score, 23);
});

test("GBS: SI hemoglobin and BUN inputs convert before scoring", () => {
  // Hb 110 g/L = 11.0 g/dL; BUN 25.21 mg/dL ≈ urea 9.0 mmol/L
  const { result } = calc(gbs, { urea: 25.21, hb: 110, sex: "M", sbp: 105, pulse: 110, melena: true }, { urea: "conv", hb: "si" });
  assert.equal(result.score, 9);
});
