// SPEC.md B4.4 SIRS. B8 has no vector; these checks use the B4.4 criteria directly.
import { test } from "node:test";
import assert from "node:assert/strict";
import sirs from "../js/calculators/pancreas/sirs.js";
import { calc } from "./helpers.js";

test("SIRS: values on the cutoffs meet no criterion", () => {
  const { result, interp } = calc(sirs, { temp: 38, hr: 90, rr: 20, paco2: 32, wbc: 12, bands: 10 }, { wbc: "si" });
  assert.equal(result.score, 0);
  assert.equal(interp.band, "SIRS absent");
});

test("SIRS: two criteria = SIRS present", () => {
  const { result, interp } = calc(sirs, { temp: 35.9, hr: 91, rr: 16, wbc: 8 }, { wbc: "si" });
  assert.equal(result.score, 2);
  assert.equal(interp.band, "SIRS present");
});

test("SIRS: PaCO2 <32 and bands >10% count", () => {
  const { result } = calc(sirs, { temp: 37, hr: 80, rr: 16, paco2: 31, wbc: 8, bands: 11 }, { wbc: "si" });
  assert.equal(result.score, 2);
});
