// SPEC.md B8.3 King's College criteria
import { test } from "node:test";
import assert from "node:assert/strict";
import kings from "../js/calculators/liver/kings.js";
import { calc } from "./helpers.js";

test("King's (non-acetaminophen): INR 4.0, age 45, bilirubin 20 mg/dL → criteria met (3 of 5)", () => {
  const { result, interp } = calc(kings, { type: "non", inr: 4.0, age: 45, bili: 20 }, { bili: "conv" });
  assert.equal(result.met, true);
  assert.equal(result.count, 3);
  assert.equal(interp.action, "Meets King's College criteria: poor prognosis without transplant. Contact a liver transplant center now.");
});
