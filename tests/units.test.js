// SPEC.md B8.1 Unit conversions
import { test } from "node:test";
import assert from "node:assert/strict";
import { approx } from "./helpers.js";
import { bilirubinUmolToMgdl, creatinineUmolToMgdl, bunMgdlToUreaMmol, convert } from "../js/units.js";

test("B8.1 Bilirubin 34.2 µmol/L = 2.00 mg/dL", () => approx(bilirubinUmolToMgdl(34.2), 2.00));
test("B8.1 Creatinine 106 µmol/L = 1.20 mg/dL", () => approx(creatinineUmolToMgdl(106), 1.20));
test("B8.1 BUN 25 mg/dL = urea 8.93 mmol/L", () => approx(bunMgdlToUreaMmol(25), 8.93));

test("B1.5 conversions round-trip and match the table", () => {
  approx(convert("albumin", 35, "si", "conv"), 3.5);
  approx(convert("hemoglobin", 135, "si", "conv"), 13.5);
  approx(convert("glucose", 10, "si", "conv"), 180);
  approx(convert("calcium", 2.0, "si", "conv"), 8.0);
  approx(convert("platelets", 150, "conv", "si"), 150);
  approx(convert("wbc", 12, "si", "conv"), 12);
  for (const a of ["bilirubin", "creatinine", "urea", "albumin", "hemoglobin", "glucose", "calcium"]) {
    approx(convert(a, convert(a, 7.3, "si", "conv"), "conv", "si"), 7.3, 6, a);
  }
});

// B8.1 exact equivalents (SPEC.md B1.5): converted values carry no floating-point noise.
test("B8.1 Bilirubin 205.2 µmol/L = 12 mg/dL exactly", () => assert.equal(bilirubinUmolToMgdl(205.2), 12));
test("B8.1 Bilirubin 102.6 µmol/L = 6 mg/dL exactly", () => assert.equal(bilirubinUmolToMgdl(102.6), 6));
test("B8.1 Creatinine 132.6 µmol/L = 1.5 mg/dL exactly", () => assert.equal(creatinineUmolToMgdl(132.6), 1.5));
test("B8.1 Creatinine 309.4 µmol/L = 3.5 mg/dL exactly", () => assert.equal(creatinineUmolToMgdl(309.4), 3.5));
test("B8.1 SAAG from 33 and 22 g/L (3.3 and 2.2 g/dL) = 1.1 g/dL exactly: portal hypertension", async () => {
  const { default: ascites } = await import("../js/calculators/liver/ascites.js");
  const { evaluate } = await import("../js/engine.js");
  for (const [vals, units] of [[{ salb: 33, aalb: 22 }, { salb: "si", aalb: "si" }], [{ salb: 3.3, aalb: 2.2 }, {}]]) {
    const out = evaluate(ascites, vals, units);
    assert.equal(out.result.saag, 1.1);
    assert.equal(out.interp.band, "Portal hypertension");
  }
});
