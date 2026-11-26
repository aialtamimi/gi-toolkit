import assert from "node:assert/strict";
import { evaluate } from "../js/engine.js";

// "Decimal results: match to 2 decimal places unless the result is rounded by rule" (B8).
export function approx(actual, expected, dp = 2, msg) {
  const tol = 0.5 * Math.pow(10, -dp) + 1e-9;
  assert.ok(Math.abs(actual - expected) <= tol, `${msg || "value"}: expected ${expected} (±${tol}), got ${actual}`);
}

// Run a calculator through the engine's input pipeline (unit conversion, visibility, required inputs).
export function calc(def, raw, units = {}) {
  const out = evaluate(def, raw, units);
  assert.deepEqual(out.errors, [], `input errors: ${JSON.stringify(out.errors)}`);
  assert.deepEqual(out.missing, [], `missing inputs: ${out.missing.join(", ")}`);
  return out;
}
