// SPEC.md B8.3 Leipzig
import { test } from "node:test";
import assert from "node:assert/strict";
import leipzig from "../js/calculators/liver/leipzig.js";
import { calc } from "./helpers.js";

test("Leipzig: KF rings present, ceruloplasmin 0.08 g/L, all others not done → 4, diagnosis established", () => {
  const { result, interp } = calc(leipzig, { kf: "Present", cerulo: "<0.1 g/L" });
  assert.equal(result.score, 4);
  assert.equal(interp.band, "Diagnosis established");
});
