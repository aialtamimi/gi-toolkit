// SPEC.md B8.1 Unit conversions
import { test } from "node:test";
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
