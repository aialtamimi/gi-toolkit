// SPEC.md B8.3 ACLF
import { test } from "node:test";
import assert from "node:assert/strict";
import aclf from "../js/calculators/liver/aclf.js";
import { calc } from "./helpers.js";

const U = { bili: "conv", cr: "conv" };

test("ACLF: bilirubin 14 mg/dL, creatinine 1.7 mg/dL, no other failures → grade 1", () => {
  const { result, interp } = calc(aclf, { bili: 14, cr: 1.7, inr: 1.2, he: "none" }, U);
  assert.equal(result.grade, 1);
  assert.equal(interp.band, "ACLF grade 1");
});

test("ACLF: creatinine 2.2 mg/dL, INR 2.6 → grade 2", () => {
  const { result, interp } = calc(aclf, { bili: 1.0, cr: 2.2, inr: 2.6, he: "none" }, U);
  assert.equal(result.grade, 2);
  assert.equal(interp.band, "ACLF grade 2");
});
