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

// Exact SI equivalents of the mg/dL-only cutoffs (B3.17, converted per B1.5) count as the cutoff.
const SI = { bili: "si", cr: "si" };

test("ACLF: bilirubin 205.2 µmol/L (= 12 mg/dL) is liver failure; 205.1 µmol/L is not", () => {
  const at = calc(aclf, { bili: 205.2, cr: 80, inr: 1.2, he: "none" }, SI).result;
  assert.deepEqual(at.failed, ["Liver"]);
  const below = calc(aclf, { bili: 205.1, cr: 80, inr: 1.2, he: "none" }, SI).result;
  assert.deepEqual(below.failed, []);
});

test("ACLF: creatinine 176.8 µmol/L (= 2.0 mg/dL) is kidney failure → grade 1; 176.7 µmol/L is not", () => {
  const at = calc(aclf, { bili: 20, cr: 176.8, inr: 1.2, he: "none" }, SI);
  assert.deepEqual(at.result.failed, ["Kidney"]);
  assert.equal(at.result.grade, 1);
  const below = calc(aclf, { bili: 20, cr: 176.7, inr: 1.2, he: "none" }, SI).result;
  assert.deepEqual(below.failed, []);
});

test("ACLF: creatinine 132.6 µmol/L (= 1.5 mg/dL) is kidney dysfunction, so liver failure at 205.2 µmol/L → grade 1", () => {
  const { result } = calc(aclf, { bili: 205.2, cr: 132.6, inr: 1.2, he: "none" }, SI);
  assert.equal(result.grade, 1);
  assert.equal(result.breakdown.find(b => b.item.startsWith("Kidney dysfunction")).value, "Yes");
  const below = calc(aclf, { bili: 205.2, cr: 132.5, inr: 1.2, he: "none" }, SI).result;
  assert.equal(below.grade, 0);
});
