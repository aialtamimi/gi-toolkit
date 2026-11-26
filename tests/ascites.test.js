// SPEC.md B8.3 Ascitic fluid analysis
import { test } from "node:test";
import assert from "node:assert/strict";
import ascites from "../js/calculators/liver/ascites.js";
import { calc, approx } from "./helpers.js";

const U = { salb: "conv", aalb: "conv", aprot: "conv" };

test("Ascitic fluid: serum albumin 3.0, ascitic albumin 1.0, ascitic protein 1.0 g/dL → SAAG 2.0, portal hypertension, suggests cirrhosis", () => {
  const { result, interp } = calc(ascites, { salb: 3.0, aalb: 1.0, aprot: 1.0 }, U);
  approx(result.saag, 2.0);
  assert.equal(interp.band, "Portal hypertension");
  assert.ok(interp.sections[0].lines.includes("Ascitic total protein <2.5 g/dL suggests cirrhosis."));
});

test("Ascitic PMN: WBC 500/mm³, neutrophils 60% → PMN 300, SBP", () => {
  const { result, interp } = calc(ascites, { wbc: 500, neut: 60 });
  approx(result.pmn, 300);
  assert.equal(interp.band, "Spontaneous bacterial peritonitis");
});

test("Ascitic PMN, bloody tap: WBC 1000, neutrophils 30%, RBC 25,000 → corrected PMN 200, not SBP", () => {
  const { result, interp } = calc(ascites, { wbc: 1000, neut: 30, rbc: 25000 });
  approx(result.pmn, 200);
  assert.equal(result.pmn >= 250, false);
  assert.match(interp.copy, /Corrected PMN 200, not SBP/);
});
