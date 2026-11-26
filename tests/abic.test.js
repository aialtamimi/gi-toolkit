// SPEC.md B8.3 ABIC
import { test } from "node:test";
import assert from "node:assert/strict";
import abic from "../js/calculators/liver/abic.js";
import { calc, approx } from "./helpers.js";

test("ABIC: age 50, bilirubin 10 mg/dL, creatinine 1.0 mg/dL, INR 1.8 → 7.54, intermediate", () => {
  const { result, interp } = calc(abic, { age: 50, bili: 10, cr: 1.0, inr: 1.8 }, { bili: "conv", cr: "conv" });
  approx(result.score, 7.54);
  assert.equal(interp.band, "Intermediate");
});
