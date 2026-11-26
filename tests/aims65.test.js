// SPEC.md B8.2 AIMS65
import { test } from "node:test";
import assert from "node:assert/strict";
import aims65 from "../js/calculators/bleeding/aims65.js";
import { calc } from "./helpers.js";

test("AIMS65: albumin 2.8 g/dL, INR 1.6, normal mental status, SBP 100, age 70 → 3, mortality 10.3%", () => {
  const { result, interp } = calc(aims65, { albumin: 2.8, inr: 1.6, mental: false, sbp: 100, age: 70 }, { albumin: "conv" });
  assert.equal(result.score, 3);
  assert.equal(result.mortality, "10.3%");
  assert.match(interp.text, /10\.3%/);
});

test("AIMS65: albumin is compared with the cutoff for the unit entered (<3.0 g/dL or <30 g/L)", () => {
  const base = { inr: 1.0, sbp: 120, age: 40 };
  assert.equal(calc(aims65, { ...base, albumin: 29.9 }, { albumin: "si" }).result.score, 1);
  assert.equal(calc(aims65, { ...base, albumin: 30 }, { albumin: "si" }).result.score, 0);
  assert.equal(calc(aims65, { ...base, albumin: 2.99 }, { albumin: "conv" }).result.score, 1);
});
