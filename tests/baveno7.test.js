// SPEC.md B8.3 Baveno VII
import { test } from "node:test";
import assert from "node:assert/strict";
import baveno7 from "../js/calculators/liver/baveno7.js";
import { calc } from "./helpers.js";

const met = r => r.rules.filter(x => x.met).map(x => x.key);

test("Baveno VII: LSM 27 kPa, platelets 120 → CSPH ruled in", () => {
  const { result } = calc(baveno7, { lsm: 27, plt: 120 });
  assert.ok(met(result).includes("csph_in"));
});

test("Baveno VII: LSM 12 kPa, platelets 180 → cACLD suggestive; CSPH ruled out; screening endoscopy can be avoided", () => {
  const { result } = calc(baveno7, { lsm: 12, plt: 180 });
  assert.deepEqual(met(result).sort(), ["cacld_suggestive", "csph_out", "endo_avoid"]);
});
