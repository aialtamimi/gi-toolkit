// SPEC.md B8.4 Modified CTSI and B4.7 bands
import { test } from "node:test";
import assert from "node:assert/strict";
import mctsi, { band } from "../js/calculators/pancreas/mctsi.js";
import { calc } from "./helpers.js";

test("Modified CTSI: fluid collection, necrosis ≤30%, pleural effusion → 8, severe", () => {
  const { result, interp } = calc(mctsi, { inflammation: 4, necrosis: 2, extra: true });
  assert.equal(result.score, 8);
  assert.equal(interp.band, "Severe");
});

test("Modified CTSI bands: 0–2 mild; 4–6 moderate; 8–10 severe", () => {
  for (const s of [0, 2]) assert.equal(band(s).band, "Mild");
  for (const s of [4, 6]) assert.equal(band(s).band, "Moderate");
  for (const s of [8, 10]) assert.equal(band(s).band, "Severe");
  assert.equal(calc(mctsi, { inflammation: 4, necrosis: 4, extra: true }).result.score, 10);
});
