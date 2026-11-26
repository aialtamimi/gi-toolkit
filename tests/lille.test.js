// SPEC.md B8.3 Lille
import { test } from "node:test";
import assert from "node:assert/strict";
import lille from "../js/calculators/liver/lille.js";
import { calc, approx } from "./helpers.js";

const U = { alb: "si", bili0: "si", bili7: "si", cr: "conv" };

test("Lille: age 50, albumin 30 g/L, bili d0 250, d7 150 µmol/L, creatinine 1.0 mg/dL, PT 18 s → 0.083, responder", () => {
  const { result, interp } = calc(lille, { age: 50, alb: 30, bili0: 250, bili7: 150, cr: 1.0, pt: 18 }, U);
  approx(result.score, 0.083, 3);
  assert.equal(interp.band, "Responder");
});

test("Lille: age 55, albumin 25, bili d0 300, d7 310, creatinine 1.6 mg/dL, PT 22 s → 0.772, non-responder", () => {
  const { result, interp } = calc(lille, { age: 55, alb: 25, bili0: 300, bili7: 310, cr: 1.6, pt: 22 }, U);
  approx(result.score, 0.772, 3);
  assert.equal(interp.band, "Non-responder");
});

test("Lille: renal insufficiency uses the creatinine cutoff for the unit entered (>115 µmol/L or >1.3 mg/dL)", () => {
  const base = { age: 50, alb: 30, bili0: 250, bili7: 150, pt: 18 };
  const renalOf = (cr, sys) => calc(lille, { ...base, cr }, { cr: sys, alb: "si", bili0: "si", bili7: "si" }).result.breakdown
    .find(b => b.item.includes("renal insufficiency")).item.includes("(1:");
  assert.equal(renalOf(115, "si"), false);   // 115 µmol/L = 1.3009 mg/dL, but not >115 µmol/L as entered
  assert.equal(renalOf(116, "si"), true);
  assert.equal(renalOf(1.3, "conv"), false);
  assert.equal(renalOf(1.31, "conv"), true);
});
