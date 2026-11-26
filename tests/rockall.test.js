// SPEC.md B8.2 Rockall and B2.3 interpretation bands
import { test } from "node:test";
import assert from "node:assert/strict";
import rockall, { preEndoscopyBand, completeBand } from "../js/calculators/bleeding/rockall.js";
import { calc } from "./helpers.js";

test("Rockall: age 72, pulse 105, SBP 110, ischemic heart disease; peptic ulcer; visible vessel → pre-endoscopy 4, not low; complete 7, intermediate", () => {
  const { result, interp } = calc(rockall, { age: 72, pulse: 105, sbp: 110, comorbidity: 2, diagnosis: 1, stigmata: 2 });
  assert.equal(result.pre, 4);
  assert.equal(result.complete, 7);
  assert.equal(preEndoscopyBand(result.pre).band, "Not low risk");
  assert.equal(interp.band, "Intermediate risk");
  assert.equal(interp.copy, "Rockall pre-endoscopy 4, not low risk; complete 7, intermediate risk");
});

test("Rockall pre-endoscopy only: band comes from the pre-endoscopy score", () => {
  const low = calc(rockall, { age: 40, pulse: 80, sbp: 120, comorbidity: 0 });
  assert.equal(low.result.pre, 0);
  assert.equal(low.interp.band, "Low risk");
  const notLow = calc(rockall, { age: 65, pulse: 80, sbp: 120, comorbidity: 0 });
  assert.equal(notLow.result.pre, 1);
  assert.equal(notLow.interp.band, "Not low risk");
});

test("Rockall B2.3 band boundaries", () => {
  assert.equal(preEndoscopyBand(0).band, "Low risk");
  assert.equal(preEndoscopyBand(1).band, "Not low risk");
  assert.equal(completeBand(0).band, "Low risk");
  assert.equal(completeBand(2).band, "Low risk");
  assert.equal(completeBand(3).band, "Intermediate risk");
  assert.equal(completeBand(7).band, "Intermediate risk");
  assert.equal(completeBand(8).band, "High risk");
  assert.equal(completeBand(11).band, "High risk");
});
