// SPEC.md B4.3 Glasgow-Imrie. B8 has no vector; these checks use the B4.3 criteria directly.
import { test } from "node:test";
import assert from "node:assert/strict";
import gi, { pao2Low } from "../js/calculators/pancreas/glasgow_imrie.js";
import { calc } from "./helpers.js";

const SI = { wbc: "si", calcium: "si", urea: "si", albumin: "si", glucose: "si" };

test("Glasgow-Imrie: every criterion met → 8, severe, consider HDU or ICU", () => {
  const { result, interp } = calc(gi, { pao2Unit: "kpa", pao2: 7.9, age: 56, wbc: 15.1, calcium: 1.9, urea: 16.1, ldh: 601, albumin: 31, glucose: 10.1 }, SI);
  assert.equal(result.score, 8);
  assert.equal(interp.band, "Severe pancreatitis");
  assert.equal(interp.action, "Consider HDU or ICU.");
});

test("Glasgow-Imrie: values on the cutoffs score 0", () => {
  const { result, interp } = calc(gi, { pao2Unit: "mmhg", pao2: 60, age: 55, wbc: 15, calcium: 2.0, urea: 16, ldh: 600, ast: 200, albumin: 32, glucose: 10 }, SI);
  assert.equal(result.score, 0);
  assert.equal(interp.band, "Score below 3");
});

test("Glasgow-Imrie: enzymes item scores on AST alone; PaO2 cutoff per unit", () => {
  const { result } = calc(gi, { pao2Unit: "mmhg", pao2: 59, age: 40, wbc: 10, calcium: 2.2, urea: 5, ast: 201, albumin: 40, glucose: 6 }, SI);
  assert.equal(result.score, 2);
  assert.equal(pao2Low(7.99, "kpa"), true);
  assert.equal(pao2Low(8, "kpa"), false);
  assert.equal(pao2Low(59.9, "mmhg"), true);
});

test("Glasgow-Imrie: without LDH or AST the result is marked incomplete", () => {
  const { result, interp } = calc(gi, { pao2Unit: "mmhg", pao2: 90, age: 40, wbc: 10, calcium: 2.2, urea: 5, albumin: 40, glucose: 6 }, SI);
  assert.equal(result.complete, false);
  assert.equal(interp.band, "Incomplete: enter LDH or AST");
});
