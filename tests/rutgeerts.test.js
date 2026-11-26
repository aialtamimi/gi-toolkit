// SPEC.md B5.8 Rutgeerts and the B8.5 vectors.
import { test } from "node:test";
import assert from "node:assert/strict";
import rut, { I2A_NOTE } from "../js/calculators/ibd/rutgeerts.js";
import { calc } from "./helpers.js";

for (const s of ["i0", "i1", "i2a"]) {
  test(`Rutgeerts ${s} → no endoscopic recurrence`, () => {
    const { interp } = calc(rut, { score: s });
    assert.equal(interp.band, "No endoscopic recurrence");
    assert.equal(interp.text, "No endoscopic recurrence");
    assert.equal(interp.action, undefined);
  });
}

test("Rutgeerts i2a shows the lower-risk note; i0 and i1 do not", () => {
  assert.equal(I2A_NOTE, "i2a carries lower risk; individualize");
  assert.deepEqual(calc(rut, { score: "i2a" }).interp.notes, [I2A_NOTE]);
  assert.deepEqual(calc(rut, { score: "i1" }).interp.notes, []);
});

for (const s of ["i2b", "i3", "i4"]) {
  test(`Rutgeerts ${s} → endoscopic recurrence, consider escalating therapy`, () => {
    const { interp } = calc(rut, { score: s });
    assert.equal(interp.band, "Endoscopic recurrence");
    assert.equal(interp.action, "Endoscopic recurrence: consider escalating therapy.");
  });
}

test("Rutgeerts: i2 is selected as i2a or i2b only", () => {
  const values = rut.inputs[0].options.map(o => o.value);
  assert.deepEqual(values, ["i0", "i1", "i2a", "i2b", "i3", "i4"]);
});
