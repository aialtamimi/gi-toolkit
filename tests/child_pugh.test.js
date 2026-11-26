// SPEC.md B8.3 Child-Pugh
import { test } from "node:test";
import assert from "node:assert/strict";
import cp from "../js/calculators/liver/child_pugh.js";
import { calc } from "./helpers.js";

test("Child-Pugh: bilirubin 2.5 mg/dL, albumin 3.0 g/dL, INR 1.5, mild ascites, no HE → 8, class B", () => {
  const { result, interp } = calc(cp, { bili: 2.5, alb: 3.0, inr: 1.5, ascites: 2, he: 1 }, { bili: "conv", alb: "conv" });
  assert.equal(result.score, 8);
  assert.equal(interp.band, "Class B");
});
