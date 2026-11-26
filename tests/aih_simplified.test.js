// SPEC.md B8.3 Simplified AIH score
import { test } from "node:test";
import assert from "node:assert/strict";
import aih from "../js/calculators/liver/aih_simplified.js";
import { calc } from "./helpers.js";

test("AIH simplified: ANA 1:80, IgG 1.2 × ULN, typical histology, no viral hepatitis → 8, definite", () => {
  const { result, interp } = calc(aih, { ab: 2, igg: 1.2, hist: 2, noViral: true });
  assert.equal(result.score, 8);
  assert.equal(interp.band, "Definite AIH");
});
