// SPEC.md B5.8 Rutgeerts. B8 has no vector; these checks confirm each selection against B5.8.
import { test } from "node:test";
import assert from "node:assert/strict";
import rut from "../js/calculators/ibd/rutgeerts.js";
import { calc } from "./helpers.js";

for (const s of ["i0", "i1"]) {
  test(`Rutgeerts ${s} → no endoscopic recurrence`, () => {
    const { interp } = calc(rut, { score: s });
    assert.equal(interp.band, "No endoscopic recurrence");
    assert.equal(interp.text, "No endoscopic recurrence");
  });
}
for (const s of ["i2", "i2a", "i2b", "i3", "i4"]) {
  test(`Rutgeerts ${s} → endoscopic recurrence`, () => {
    const { interp } = calc(rut, { score: s });
    assert.equal(interp.band, "Endoscopic recurrence");
    assert.equal(interp.action, "Endoscopic recurrence: consider escalating therapy.");
  });
}
