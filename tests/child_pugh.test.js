// SPEC.md B8.3 Child-Pugh
import { test } from "node:test";
import assert from "node:assert/strict";
import cp from "../js/calculators/liver/child_pugh.js";
import { calc } from "./helpers.js";

test("Child-Pugh: bilirubin 2.5 mg/dL, albumin 3.0 g/dL, INR 1.5, mild ascites, no HE → 8, class B", () => {
  const { result, interp } = calc(cp, { bili: 2.5, alb: 3.0, inr: 1.5, ascites: 2, he: 1 }, { bili: "conv", alb: "conv" });
  assert.equal(result.score, 8);
  assert.equal(interp.band, "Class B");
});

test("Child-Pugh: bilirubin 34 µmol/L scores 2 points (µmol/L cutoffs as entered)", () => {
  const base = { alb: 3.6, inr: 1.0, ascites: 1, he: 1 };
  const si = calc(cp, { ...base, bili: 34 }, { bili: "si", alb: "conv" });
  assert.equal(si.result.breakdown[0].points, 2);
  assert.equal(calc(cp, { ...base, bili: 33.9 }, { bili: "si", alb: "conv" }).result.breakdown[0].points, 1);
  assert.equal(calc(cp, { ...base, bili: 50 }, { bili: "si", alb: "conv" }).result.breakdown[0].points, 2);
  assert.equal(calc(cp, { ...base, bili: 51 }, { bili: "si", alb: "conv" }).result.breakdown[0].points, 3);
});

test("Child-Pugh: cholestatic µmol/L cutoffs and albumin g/L cutoffs as entered", () => {
  const base = { inr: 1.0, ascites: 1, he: 1, cholestatic: true };
  assert.equal(calc(cp, { ...base, bili: 68, alb: 36 }, { bili: "si", alb: "si" }).result.breakdown[0].points, 2);
  assert.equal(calc(cp, { ...base, bili: 171, alb: 36 }, { bili: "si", alb: "si" }).result.breakdown[0].points, 3);
  const alb = a => calc(cp, { ...base, bili: 20, alb: a }, { bili: "si", alb: "si" }).result.breakdown[1].points;
  assert.equal(alb(36), 1);
  assert.equal(alb(35), 2);
  assert.equal(alb(28), 2);
  assert.equal(alb(27.9), 3);
});
