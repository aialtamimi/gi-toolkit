// SPEC.md B8.4 Ranson and B4.2 criteria
import { test } from "node:test";
import assert from "node:assert/strict";
import ranson, { mortality } from "../js/calculators/pancreas/ranson.js";
import { calc } from "./helpers.js";

test("Ranson non-gallstone, admission only: age 60, WBC 18, glucose 180 mg/dL, LDH 400, AST 100 → 3 at admission, 48-hour items pending", () => {
  const { result, interp } = calc(ranson, { type: "non", age: 60, wbc: 18, glucose: 180, ldh: 400, ast: 100 }, { glucose: "conv" });
  assert.equal(result.admission, 3);
  assert.equal(result.score, 3);
  assert.equal(result.complete, false);
  assert.ok(interp.sections.some(s => s.title === "48-hour items pending"));
  assert.match(interp.copy, /48-hour items pending/);
  assert.equal(interp.band, "Severe pancreatitis");
});

test("Ranson gallstone version uses gallstone cutoffs and drops PaO2", () => {
  const { result } = calc(ranson, { type: "gallstone", age: 60, wbc: 18, glucose: 180, ldh: 400, ast: 100 }, { glucose: "conv" });
  assert.equal(result.admission, 0);   // age >70, WBC >18, glucose >220, LDH >400 not met; AST >250 not met
  assert.equal(result.pending.length, 5);
});

test("Ranson complete non-gallstone with 48-hour items", () => {
  const { result, interp } = calc(ranson, { type: "non", age: 50, wbc: 10, glucose: 150, ldh: 200, ast: 100,
    hctFall: 11, bunRise: 6, calcium: 7.9, pao2: 59, baseDeficit: 5, fluid: 7 }, { glucose: "conv", bunRise: "conv", calcium: "conv" });
  assert.equal(result.admission, 0);
  assert.equal(result.h48, 6);
  assert.equal(result.complete, true);
  assert.match(interp.text, /about 40%/);
});

test("Ranson complete, below 3 shows mortality under 5%", () => {
  const { result, interp } = calc(ranson, { type: "non", age: 50, wbc: 10, glucose: 150, ldh: 200, ast: 100,
    hctFall: 2, bunRise: 1, calcium: 9, pao2: 90, baseDeficit: 1, fluid: 2 }, { glucose: "conv", bunRise: "conv", calcium: "conv" });
  assert.equal(result.score, 0);
  assert.equal(interp.band, "Score below 3");
  assert.match(interp.text, /under 5%/);
});

test("Ranson commonly cited mortality bands", () => {
  assert.equal(mortality(2), "under 5%");
  assert.equal(mortality(3), "about 15%");
  assert.equal(mortality(4), "about 15%");
  assert.equal(mortality(5), "about 40%");
  assert.equal(mortality(6), "about 40%");
  assert.equal(mortality(7), "near 100%");
});
