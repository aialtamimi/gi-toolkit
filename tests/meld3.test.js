// SPEC.md B8.3 MELD 3.0
import { test } from "node:test";
import assert from "node:assert/strict";
import meld3 from "../js/calculators/liver/meld3.js";
import { calc, approx } from "./helpers.js";

const U = { bili: "conv", cr: "conv", alb: "conv" };

test("MELD 3.0: female, bili 2.0, INR 1.5, Cr 1.2, Na 130, albumin 3.0 → 22 (unrounded 21.54); survival 92.5%", () => {
  const { result } = calc(meld3, { sex: "F", bili: 2.0, inr: 1.5, cr: 1.2, na: 130, alb: 3.0 }, U);
  assert.equal(result.score, 22);
  approx(result.raw, 21.54);
  approx(result.survival, 92.5, 1);
});

test("MELD 3.0: same values, male → 20 (unrounded 20.21); survival 94.7%", () => {
  const { result } = calc(meld3, { sex: "M", bili: 2.0, inr: 1.5, cr: 1.2, na: 130, alb: 3.0 }, U);
  assert.equal(result.score, 20);
  approx(result.raw, 20.21);
  approx(result.survival, 94.7, 1);
});

test("MELD 3.0: male, bili 0.8, INR 1.0, Cr 0.7, Na 140, albumin 4.0 → 6; survival 99.5%", () => {
  const { result } = calc(meld3, { sex: "M", bili: 0.8, inr: 1.0, cr: 0.7, na: 140, alb: 4.0 }, U);
  assert.equal(result.score, 6);
  approx(result.survival, 99.5, 1);
});
