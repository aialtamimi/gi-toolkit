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

test("King's: creatinine 3.4 mg/dL does not meet >3.4 mg/dL (cutoff for the unit entered)", () => {
  const out = calc(kings, { type: "apap", inr: 7, cr: 3.4, he34: true }, { cr: "conv" });
  assert.equal(out.result.criteria.find(c => c.item.startsWith("Creatinine")).met, false);
  const out2 = calc(kings, { type: "apap", inr: 7, cr: 3.41, he34: true }, { cr: "conv" });
  assert.equal(out2.result.met, true);
});

test("King's: bilirubin uses >17.6 mg/dL or >300 µmol/L as entered", () => {
  const bili = (b, sys) => calc(kings, { type: "non", age: 30, bili: b }, { bili: sys }).result.criteria.find(c => c.item.startsWith("Bilirubin")).met;
  assert.equal(bili(17.6, "conv"), false);
  assert.equal(bili(17.61, "conv"), true);
  assert.equal(bili(300, "si"), false);
  assert.equal(bili(301, "si"), true);
});
