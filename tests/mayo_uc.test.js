// SPEC.md B8.5 Mayo and partial Mayo, B5.3 bands
import { test } from "node:test";
import assert from "node:assert/strict";
import mayo, { fullBand, partialBand } from "../js/calculators/ibd/mayo_uc.js";
import { calc } from "./helpers.js";

test("Mayo (full): subscores 2, 2, 2, 2 → 8, moderate; MES shown", () => {
  const { result, interp } = calc(mayo, { mode: "full", stool: 2, bleeding: 2, endo: 2, pga: 2 });
  assert.equal(result.score, 8);
  assert.equal(interp.band, "Moderate");
  assert.equal(result.mes, 2);
  assert.ok(result.details.some(d => d.label === "Mayo endoscopic score (MES)"));
});

test("Partial Mayo: subscores 2, 2, 2 → 6, moderate", () => {
  const { result, interp } = calc(mayo, { mode: "partial", stool: 2, bleeding: 2, pga: 2 });
  assert.equal(result.score, 6);
  assert.equal(interp.band, "Moderate");
});

test("Full Mayo bands", () => {
  assert.equal(fullBand(2, [1, 1, 0, 0]).band, "Remission");
  assert.equal(fullBand(3, [1, 1, 1, 0]).band, "Mild");
  assert.equal(fullBand(5, [2, 1, 1, 1]).band, "Mild");
  assert.equal(fullBand(6, [2, 2, 1, 1]).band, "Moderate");
  assert.equal(fullBand(10, [3, 3, 2, 2]).band, "Moderate");
  assert.equal(fullBand(11, [3, 3, 3, 2]).band, "Severe");
  assert.equal(fullBand(12, [3, 3, 3, 3]).band, "Severe");
  // Total 0–5 that does not meet remission (a subscore >1) is mild.
  assert.equal(fullBand(2, [2, 0, 0, 0]).band, "Mild");
  assert.equal(fullBand(2, [0, 0, 2, 0]).band, "Mild");
});

test("Full Mayo: subscores 2, 0, 0, 0 → 2, mild (remission criteria not met)", () => {
  const { result, interp } = calc(mayo, { mode: "full", stool: 2, bleeding: 0, endo: 0, pga: 0 });
  assert.equal(result.score, 2);
  assert.equal(interp.band, "Mild");
});

test("Partial Mayo bands", () => {
  assert.equal(partialBand(0).band, "Remission");
  assert.equal(partialBand(1).band, "Remission");
  assert.equal(partialBand(2).band, "Mild");
  assert.equal(partialBand(4).band, "Mild");
  assert.equal(partialBand(5).band, "Moderate");
  assert.equal(partialBand(6).band, "Moderate");
  assert.equal(partialBand(7).band, "Severe");
  assert.equal(partialBand(9).band, "Severe");
});
