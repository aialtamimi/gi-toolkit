// SPEC.md B8.2 Oakland
import { test } from "node:test";
import assert from "node:assert/strict";
import oakland from "../js/calculators/bleeding/oakland.js";
import { calc } from "./helpers.js";

test("Oakland: age 35, female, no previous admission, DRE no blood, HR 65, SBP 135, Hb 135 g/L → 6, low", () => {
  const { result, interp } = calc(oakland, { age: 35, sex: "F", prev: false, dre: false, hr: 65, sbp: 135, hb: 135 }, { hb: "si" });
  assert.equal(result.score, 6);
  assert.equal(interp.band, "Low");
});

test("Oakland: age 75, male, previous admission, DRE blood, HR 105, SBP 100, Hb 85 g/L → 28, not low", () => {
  const { result, interp } = calc(oakland, { age: 75, sex: "M", prev: true, dre: true, hr: 105, sbp: 100, hb: 85 }, { hb: "si" });
  assert.equal(result.score, 28);
  assert.equal(interp.band, "Not low");
});
