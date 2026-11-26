// SPEC.md B5.9 Montreal. B8 has no vector; these checks use the B5.9 output examples.
import { test } from "node:test";
import assert from "node:assert/strict";
import montreal from "../js/calculators/ibd/montreal.js";
import { calc } from "./helpers.js";

test('Montreal Crohn\'s disease → "A2 L3 B1p"', () => {
  const { result } = calc(montreal, { disease: "cd", age: "A2", location: "L3", behavior: "B1", perianal: true });
  assert.equal(result.code, "A2 L3 B1p");
});

test('Montreal ulcerative colitis → "E2 S2"', () => {
  const { result, interp } = calc(montreal, { disease: "uc", extent: "E2", severity: "S2" });
  assert.equal(result.code, "E2 S2");
  assert.equal(interp.copy, "Montreal: E2 S2");
});

test("Montreal L4 modifier is added to L1–L3", () => {
  assert.equal(calc(montreal, { disease: "cd", age: "A1", location: "L1", l4: true, behavior: "B2" }).result.code, "A1 L1+L4 B2");
});
