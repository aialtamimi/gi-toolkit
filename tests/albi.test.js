// SPEC.md B8.3 ALBI
import { test } from "node:test";
import assert from "node:assert/strict";
import albi from "../js/calculators/liver/albi.js";
import { calc, approx } from "./helpers.js";

test("ALBI: bilirubin 34 µmol/L, albumin 35 g/L → −1.96, grade 2", () => {
  const { result, interp } = calc(albi, { bili: 34, alb: 35 }, { bili: "si", alb: "si" });
  approx(result.score, -1.96);
  assert.equal(interp.band, "Grade 2");
});
