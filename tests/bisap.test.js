// SPEC.md B8.4 BISAP and B4.1 criteria
import { test } from "node:test";
import assert from "node:assert/strict";
import bisap, { MONITORING_NOTE } from "../js/calculators/pancreas/bisap.js";
import { calc } from "./helpers.js";
import { evaluate } from "../js/engine.js";

test("BISAP: BUN 30 mg/dL, GCS 15, SIRS present, age 65, no effusion → 3, higher risk", () => {
  const { result, interp } = calc(bisap, { bun: 30, gcs: 15, sirs: true, age: 65 }, { bun: "conv" });
  assert.equal(result.score, 3);
  assert.equal(interp.band, "Higher risk");
  assert.ok(interp.notes.includes(MONITORING_NOTE));
});

test("BISAP: urea entered in mmol/L converts to BUN before scoring (urea 10.71 mmol/L = BUN 30 mg/dL)", () => {
  const { result } = calc(bisap, { bun: 10.71, gcs: 15, sirs: true, age: 65 }, { bun: "si" });
  assert.equal(result.score, 3);
});

test("BISAP: urea is compared with the mmol/L cutoff as entered (>8.9 mmol/L), BUN with >25 mg/dL", () => {
  // 8.92 mmol/L = 24.99 mg/dL: meets >8.9 mmol/L as entered.
  assert.equal(calc(bisap, { bun: 8.92, gcs: 15, age: 40 }, { bun: "si" }).result.score, 1);
  assert.equal(calc(bisap, { bun: 8.9, gcs: 15, age: 40 }, { bun: "si" }).result.score, 0);
  assert.equal(calc(bisap, { bun: 25, gcs: 15, age: 40 }, { bun: "conv" }).result.score, 0);
});

test("BISAP B4.1 cutoffs are strict: BUN 25, GCS 15, age 60 score 0; 0–2 lower risk", () => {
  const { result, interp } = calc(bisap, { bun: 25, gcs: 15, age: 60 }, { bun: "conv" });
  assert.equal(result.score, 0);
  assert.equal(interp.band, "Lower risk");
  const r2 = calc(bisap, { bun: 25.1, gcs: 14, age: 61, sirs: true, effusion: true }, { bun: "conv" });
  assert.equal(r2.result.score, 5);
});

test("BISAP rejects a non-integer GCS", () => {
  const out = evaluate(bisap, { bun: 30, gcs: 14.5, age: 65 }, { bun: "conv" });
  assert.equal(out.errors[0].id, "gcs");
});
