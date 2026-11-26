// SPEC.md B8.5 CDAI and B5.6 weights
import { test } from "node:test";
import assert from "node:assert/strict";
import cdai, { band, weightTerm } from "../js/calculators/ibd/cdai.js";
import { calc, approx } from "./helpers.js";

const B8 = { stoolsSum: 28, painSum: 14, wellSum: 14, cArthritis: true, mass: 0, sex: "M", hct: 40, weight: 63, stdWeight: 70 };

test("CDAI: 7-day stools 28, pain 14, well-being 14, 1 complication, no antidiarrheal, no mass, male Hct 40%, weight 63 kg, standard 70 kg → 296, moderate", () => {
  const { result, interp } = calc(cdai, { entry: "sums", ...B8 });
  approx(result.score, 296, 2, "CDAI");
  assert.equal(result.display, "296");
  assert.equal(interp.band, "Moderate");
});

test("CDAI: 7-day diary gives the same result as direct sums", () => {
  const diary = { entry: "diary", cArthritis: true, mass: 0, sex: "M", hct: 40, weight: 63, stdWeight: 70 };
  const stools = [4, 4, 4, 4, 4, 4, 4], pain = [2, 2, 2, 2, 2, 2, 2], well = [2, 2, 2, 2, 2, 2, 2];
  for (let d = 1; d <= 7; d++) { diary[`stools${d}`] = stools[d - 1]; diary[`pain${d}`] = pain[d - 1]; diary[`well${d}`] = well[d - 1]; }
  const { result } = calc(cdai, diary);
  assert.deepEqual(result.sums, { stools: 28, pain: 14, well: 14 });
  approx(result.score, 296, 2, "CDAI diary");
});

test("CDAI: women use 42 − Hct; antidiarrheal ×30; mass ×10", () => {
  const { result } = calc(cdai, { entry: "sums", ...B8, sex: "F", hct: 44, antidiarrheal: true, mass: 5 });
  // 56 + 70 + 98 + 20 + 30 + 50 + (42 − 44) × 6 + 10 = 322
  approx(result.score, 322, 2, "CDAI");
});

test("CDAI body weight term is floored at −10", () => {
  approx(weightTerm(63, 70), 10, 2);
  assert.equal(weightTerm(90, 70), -10);
  approx(weightTerm(75, 70), -7.142857, 2);
});

test("CDAI bands", () => {
  assert.equal(band(149).band, "Remission");
  assert.equal(band(150).band, "Mild");
  assert.equal(band(219).band, "Mild");
  assert.equal(band(220).band, "Moderate");
  assert.equal(band(450).band, "Moderate");
  assert.equal(band(451).band, "Severe");
});
