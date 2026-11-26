// SPEC.md B8.5 SES-CD and B5.7 bands
import { test } from "node:test";
import assert from "node:assert/strict";
import ses, { band } from "../js/calculators/ibd/ses_cd.js";
import { calc } from "./helpers.js";

const seg = (s, [a, b, c, d]) => ({ [`${s}_size`]: a, [`${s}_ulcerated`]: b, [`${s}_affected`]: c, [`${s}_narrowing`]: d });

test("SES-CD: ileum 2/2/2/1, right colon 1/1/1/0, others 0 → 10, moderate", () => {
  const { result, interp } = calc(ses, { ...seg("ileum", [2, 2, 2, 1]), ...seg("right", [1, 1, 1, 0]) });
  assert.equal(result.score, 10);
  assert.equal(interp.band, "Moderate");
});

test("SES-CD: segments not reached are excluded and listed", () => {
  const { result, interp } = calc(ses, { ...seg("ileum", [3, 3, 3, 3]), ileum_nr: true, ...seg("right", [1, 1, 1, 0]) });
  assert.equal(result.score, 3);
  assert.deepEqual(result.notReached, ["Ileum"]);
  assert.match(interp.copy, /not reached: ileum/);
});

test("SES-CD bands: 0–2 remission; 3–6 mild; 7–15 moderate; ≥16 severe", () => {
  assert.equal(band(2).band, "Remission");
  assert.equal(band(3).band, "Mild");
  assert.equal(band(6).band, "Mild");
  assert.equal(band(7).band, "Moderate");
  assert.equal(band(15).band, "Moderate");
  assert.equal(band(16).band, "Severe");
});
