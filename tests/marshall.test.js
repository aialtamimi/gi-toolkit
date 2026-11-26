// SPEC.md B8.4 Modified Marshall and B4.5 table
import { test } from "node:test";
import assert from "node:assert/strict";
import marshall, { respPoints, renalPoints } from "../js/calculators/pancreas/marshall.js";
import { calc } from "./helpers.js";

test("Modified Marshall: PaO2/FiO2 250, creatinine 1.2 mg/dL, SBP 120 → respiratory 2, renal 0, cardiovascular 0: organ failure present", () => {
  const { result, interp } = calc(marshall, { respMode: "ratio", pf: 250, cr: 1.2, cv: 0 }, { cr: "conv" });
  assert.equal(result.resp, 2);
  assert.equal(result.renal, 0);
  assert.equal(result.cv, 0);
  assert.equal(interp.band, "Organ failure present");
});

test("Modified Marshall: PaO2 and FiO2 entry gives the same ratio", () => {
  const { result } = calc(marshall, { respMode: "calc", pao2: 75, fio2: 0.3, cr: 106, cv: 0 }, { cr: "si" });
  assert.equal(result.pf, 250);
  assert.equal(result.resp, 2);
});

test("Modified Marshall respiratory bands", () => {
  assert.equal(respPoints(401), 0);
  assert.equal(respPoints(400), 1);
  assert.equal(respPoints(301), 1);
  assert.equal(respPoints(300), 2);
  assert.equal(respPoints(201), 2);
  assert.equal(respPoints(200), 3);
  assert.equal(respPoints(102), 3);
  assert.equal(respPoints(101), 4);
});

test("Modified Marshall renal bands (µmol/L)", () => {
  assert.equal(renalPoints(134), 0);
  assert.equal(renalPoints(135), 1);
  assert.equal(renalPoints(169), 1);
  assert.equal(renalPoints(170), 2);
  assert.equal(renalPoints(310), 2);
  assert.equal(renalPoints(311), 3);
  assert.equal(renalPoints(439), 3);
  assert.equal(renalPoints(440), 4);
});

test("Modified Marshall: all organs <2 → no organ failure", () => {
  const { interp } = calc(marshall, { respMode: "ratio", pf: 350, cr: 150, cv: 1 }, { cr: "si" });
  assert.equal(interp.band, "No organ failure");
});
