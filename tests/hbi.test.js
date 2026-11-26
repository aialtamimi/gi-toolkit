// SPEC.md B8.5 Harvey-Bradshaw Index and B5.5 bands
import { test } from "node:test";
import assert from "node:assert/strict";
import hbi, { band } from "../js/calculators/ibd/hbi.js";
import { calc } from "./helpers.js";
import { evaluate } from "../js/engine.js";

test("HBI: well-being 2, pain 2, 5 liquid stools, no mass, 1 complication → 10, moderate", () => {
  const { result, interp } = calc(hbi, { wellbeing: 2, pain: 2, stools: 5, mass: 0, arthralgia: true });
  assert.equal(result.score, 10);
  assert.equal(interp.band, "Moderate");
});

test("HBI bands: <5 remission; 5–7 mild; 8–16 moderate; >16 severe", () => {
  assert.equal(band(4).band, "Remission");
  assert.equal(band(5).band, "Mild");
  assert.equal(band(7).band, "Mild");
  assert.equal(band(8).band, "Moderate");
  assert.equal(band(16).band, "Moderate");
  assert.equal(band(17).band, "Severe");
});

test("HBI: liquid stools must be a whole number", () => {
  const out = evaluate(hbi, { wellbeing: 0, pain: 0, stools: 2.5, mass: 0 });
  assert.equal(out.errors[0].id, "stools");
});
