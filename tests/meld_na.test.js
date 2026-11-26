// SPEC.md B8.3 MELD / MELD-Na
import { test } from "node:test";
import assert from "node:assert/strict";
import meld from "../js/calculators/liver/meld_na.js";
import { calc, approx } from "./helpers.js";

const U = { bili: "conv", cr: "conv" };

test("MELD: bilirubin 2.0, INR 1.5, creatinine 1.2, Na 130 → MELD(i) 15; MELD-Na 21 (unrounded 20.78)", () => {
  const { result } = calc(meld, { bili: 2.0, inr: 1.5, cr: 1.2, na: 130 }, U);
  assert.equal(result.meldi, 15);
  assert.equal(result.meldNa, 21);
  approx(result.meldNaRaw, 20.78);
});

test("MELD: bilirubin 0.8, INR 1.0, creatinine 0.7, Na 140 → MELD(i) 6; MELD-Na 6 (all values bounded)", () => {
  const { result } = calc(meld, { bili: 0.8, inr: 1.0, cr: 0.7, na: 140 }, U);
  assert.equal(result.meldi, 6);
  assert.equal(result.meldNa, 6);
});

test("MELD: bilirubin 5.0, INR 2.0, creatinine 2.0, Na 128, dialysis → MELD(i) 34; MELD-Na 36 (unrounded 35.78)", () => {
  const { result } = calc(meld, { bili: 5.0, inr: 2.0, cr: 2.0, na: 128, dialysis: true }, U);
  assert.equal(result.meldi, 34);
  assert.equal(result.meldNa, 36);
  approx(result.meldNaRaw, 35.78);
});
