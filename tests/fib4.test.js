// SPEC.md B8.3 FIB-4
import { test } from "node:test";
import assert from "node:assert/strict";
import fib4 from "../js/calculators/liver/fib4.js";
import { calc, approx } from "./helpers.js";

test("FIB-4 (MASLD): age 55, AST 60, ALT 50, platelets 150 → 3.11, high", () => {
  const { result, interp } = calc(fib4, { mode: "masld", age: 55, ast: 60, alt: 50, plt: 150 });
  approx(result.score, 3.11);
  assert.equal(interp.band, "High risk");
  assert.equal(interp.action, "Refer to hepatology; elastography");
});

test("FIB-4 (MASLD): age 70, AST 30, ALT 25, platelets 200 → 2.10, indeterminate (age ≥65 low cutoff 2.0)", () => {
  const { result, interp } = calc(fib4, { mode: "masld", age: 70, ast: 30, alt: 25, plt: 200 });
  approx(result.score, 2.10);
  assert.equal(interp.band, "Indeterminate");
  assert.equal(interp.action, "Elastography (VCTE) or ELF test");
});
