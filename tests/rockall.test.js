// SPEC.md B8.2 Rockall
import { test } from "node:test";
import assert from "node:assert/strict";
import rockall from "../js/calculators/bleeding/rockall.js";
import { calc } from "./helpers.js";

test("Rockall: age 72, pulse 105, SBP 110, ischemic heart disease; peptic ulcer; visible vessel → pre 4, complete 7", () => {
  const { result } = calc(rockall, { age: 72, pulse: 105, sbp: 110, comorbidity: 2, diagnosis: 1, stigmata: 2 });
  assert.equal(result.pre, 4);
  assert.equal(result.complete, 7);
});
