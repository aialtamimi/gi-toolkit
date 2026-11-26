// SPEC.md B8.3 Maddrey
import { test } from "node:test";
import assert from "node:assert/strict";
import maddrey from "../js/calculators/liver/maddrey.js";
import { calc, approx } from "./helpers.js";

test("Maddrey: PT 20 s, control 12 s, bilirubin 10 mg/dL → 46.8, severe", () => {
  const { result, interp } = calc(maddrey, { pt: 20, ptc: 12, bili: 10 }, { bili: "conv" });
  approx(result.score, 46.8);
  assert.equal(result.display, "46.8");
  assert.equal(interp.band, "Severe alcohol-associated hepatitis");
});
