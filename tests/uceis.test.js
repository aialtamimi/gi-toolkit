// SPEC.md B8.5 UCEIS
import { test } from "node:test";
import assert from "node:assert/strict";
import uceis from "../js/calculators/ibd/uceis.js";
import { calc } from "./helpers.js";

test("UCEIS: 2, 2, 2 → 6", () => {
  const { result, interp } = calc(uceis, { vascular: 2, bleeding: 2, erosions: 2 });
  assert.equal(result.score, 6);
  assert.ok(interp.notes.includes("In acute severe UC, UCEIS ≥7 at admission predicts need for rescue therapy."));
});

test("UCEIS: range 0–8", () => {
  assert.equal(calc(uceis, { vascular: 0, bleeding: 0, erosions: 0 }).result.score, 0);
  assert.equal(calc(uceis, { vascular: 2, bleeding: 3, erosions: 3 }).result.score, 8);
});
