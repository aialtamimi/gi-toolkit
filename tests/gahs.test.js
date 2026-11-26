// SPEC.md B8.3 GAHS
import { test } from "node:test";
import assert from "node:assert/strict";
import gahs from "../js/calculators/liver/gahs.js";
import { calc } from "./helpers.js";

test("GAHS: age 52, WBC 16, urea 6 mmol/L, INR 1.8, bilirubin 300 µmol/L → 11, poor prognosis", () => {
  const { result, interp } = calc(gahs, { age: 52, wbc: 16, urea: 6, inr: 1.8, bili: 300 }, { wbc: "si", urea: "si", bili: "si" });
  assert.equal(result.score, 11);
  assert.equal(interp.band, "Poor prognosis");
});
