// SPEC.md B8.5 Oxford / Lindgren and B5.2 rules
import { test } from "node:test";
import assert from "node:assert/strict";
import day3, { oxford, lindgrenIndex } from "../js/calculators/ibd/asuc_day3.js";
import { calc, approx } from "./helpers.js";

const ACTION = "Corticosteroid non-response: start rescue therapy (infliximab or ciclosporin) and involve the colorectal surgeon now.";

test("Oxford / Lindgren: day-3 stools 5, CRP 50 mg/L → Oxford positive", () => {
  const { result, interp } = calc(day3, { stools: 5, crp: 50 });
  assert.equal(result.oxford, true);
  assert.equal(interp.action, ACTION);
});

test("Oxford / Lindgren: day-3 stools 6, CRP 30 mg/L → Oxford negative; Lindgren 10.2, positive", () => {
  const { result, interp } = calc(day3, { stools: 6, crp: 30 });
  assert.equal(result.oxford, false);
  approx(result.lindgren, 10.2, 2, "Lindgren");
  assert.equal(result.lindgrenPositive, true);
  assert.equal(interp.action, ACTION);
});

test("Oxford rule boundaries", () => {
  assert.equal(oxford(9, 0), true);
  assert.equal(oxford(8, 45), false);
  assert.equal(oxford(8, 46), true);
  assert.equal(oxford(3, 46), true);
  assert.equal(oxford(2, 100), false);
});

test("Lindgren >8 is strict; both negative gives no action", () => {
  assert.equal(lindgrenIndex(8, 0), 8);
  const { result, interp } = calc(day3, { stools: 2, crp: 10 });
  assert.equal(result.lindgrenPositive, false);
  assert.equal(result.oxford, false);
  assert.equal(interp.action, undefined);
});
