// SPEC.md B8.3 NAFLD Fibrosis Score
import { test } from "node:test";
import assert from "node:assert/strict";
import nfs from "../js/calculators/liver/nfs.js";
import { calc, approx } from "./helpers.js";

test("NFS: age 55, BMI 32, diabetes, AST 40, ALT 50, platelets 180, albumin 4.0 g/dL → 0.31, indeterminate", () => {
  const { result, interp } = calc(nfs, { age: 55, bmi: 32, ifg: true, ast: 40, alt: 50, plt: 180, alb: 4.0 }, { alb: "conv" });
  approx(result.score, 0.31);
  assert.equal(interp.band, "Indeterminate");
});
