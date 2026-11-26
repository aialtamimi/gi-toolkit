// SPEC.md B8.4 TG18 cholangitis and B4.8 criteria
import { test } from "node:test";
import assert from "node:assert/strict";
import tg18, { ACTIONS } from "../js/calculators/pancreas/tg18_cholangitis.js";
import { calc } from "./helpers.js";

test("TG18: temperature 39.2 °C, WBC 14, bilirubin 3 mg/dL, dilated duct with stone, age 80, albumin normal, no organ dysfunction → definite; grade II", () => {
  const { result, interp } = calc(tg18, { temp: 39.2, wbc: 14, bili: 3, dilatation: true, cause: true, age: 80 }, { wbc: "si", bili: "conv" });
  assert.equal(result.dx.status, "Definite");
  assert.equal(result.sev.grade, 2);
  assert.equal(interp.band, "Grade II (moderate)");
  assert.equal(interp.action, ACTIONS[2]);
  assert.equal(interp.action, "Early biliary drainage (ERCP) with antibiotics.");
});

test("TG18: any organ dysfunction → grade III", () => {
  const { result, interp } = calc(tg18, { temp: 37, wbc: 8, bili: 1, age: 50, odHep: true }, { wbc: "si", bili: "conv" });
  assert.equal(result.sev.grade, 3);
  assert.equal(interp.action, "Organ support and urgent biliary drainage once stabilized.");
});

test("TG18: suspected when A plus B only; grade I action", () => {
  const { result, interp } = calc(tg18, { temp: 38.5, wbc: 8, bili: 2, age: 50 }, { wbc: "si", bili: "conv" });
  assert.equal(result.dx.status, "Suspected");
  assert.equal(result.sev.grade, 1);
  assert.equal(interp.action, "Antibiotics and supportive care; biliary drainage if no response within 24 hours.");
});

test("TG18: bilirubin 34 µmol/L meets B-1 (cutoff for the unit entered)", () => {
  const si = calc(tg18, { temp: 38.5, wbc: 8, bili: 34, age: 50 }, { wbc: "si", bili: "si" });
  assert.equal(si.result.dx.b1, true);
  assert.equal(si.result.dx.status, "Suspected");
  assert.equal(calc(tg18, { temp: 38.5, wbc: 8, bili: 33.9, age: 50 }, { wbc: "si", bili: "si" }).result.dx.b1, false);
  assert.equal(calc(tg18, { temp: 38.5, wbc: 8, bili: 1.99, age: 50 }, { wbc: "si", bili: "conv" }).result.dx.b1, false);
});

test("TG18: CRP ≥10 mg/L meets A-2; no A item means criteria not met", () => {
  assert.equal(calc(tg18, { temp: 37, wbc: 8, crp: 10, bili: 2.5, age: 50, dilatation: true }, { wbc: "si", bili: "conv" }).result.dx.status, "Definite");
  assert.equal(calc(tg18, { temp: 37, wbc: 8, crp: 9.9, bili: 2.5, age: 50, dilatation: true }, { wbc: "si", bili: "conv" }).result.dx.status, "Not met");
});

test("B8.4 TG18: temperature 38.5 °C, WBC 8, bilirubin 34 µmol/L, age 50, no imaging findings → B-1 met; suspected; grade I", () => {
  const { result } = calc(tg18, { temp: 38.5, wbc: 8, bili: 34, age: 50 }, { wbc: "si", bili: "si" });
  assert.equal(result.dx.b1, true);
  assert.equal(result.dx.status, "Suspected");
  assert.equal(result.sev.grade, 1);
});
