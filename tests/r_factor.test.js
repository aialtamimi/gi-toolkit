// SPEC.md B8.3 R factor
import { test } from "node:test";
import assert from "node:assert/strict";
import rf from "../js/calculators/liver/r_factor.js";
import { calc, approx } from "./helpers.js";

test("R factor: ALT 400 (ULN 40), ALP 150 (ULN 120) → 8.0, hepatocellular", () => {
  const { result, interp } = calc(rf, { alt: 400, altUln: 40, alp: 150, alpUln: 120 });
  approx(result.score, 8.0);
  assert.equal(interp.band, "Hepatocellular");
});
