// SPEC.md B8.3 FibroScan (B3.20) test vectors
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "../js/calculators/liver/fibroscan.js";
import { calc } from "./helpers.js";

test("FibroScan: MASLD, LSM 10.5, IQR/median 15%, 10 valid, CAP 310, ALT normal → reliable; MASLD indeterminate; Baveno cACLD suggestive; CAP S3", () => {
  const { result, interp } = calc(fs, { disease: "masld", lsm: 10.5, iqr: 15, valid: 10, cap: 310, altX: 1 });
  assert.equal(result.quality.reliable, true);
  assert.deepEqual(result.quality.messages, ["Reliable exam."]);
  assert.equal(result.lsm.key, "indeterminate");
  assert.deepEqual(result.baveno, ["cACLD suggestive"]);
  assert.equal(result.cap, "S3 (severe)");
  assert.ok(!interp.sections.some(s => s.title.startsWith("Step 2")));
});

test("FibroScan: hepatitis C, LSM 13.0, IQR/median 20%, 12 valid → reliable; cirrhosis (F4); Baveno cACLD suggestive", () => {
  const { result } = calc(fs, { disease: "hcv", lsm: 13.0, iqr: 20, valid: 12 });
  assert.equal(result.quality.reliable, true);
  assert.equal(result.lsm.text, "Cirrhosis (F4)");
  assert.deepEqual(result.baveno, ["cACLD suggestive"]);
});

test("FibroScan: hepatitis B, LSM 10.0, ALT normal, IQR/median 18%, 10 valid → reliable; advanced fibrosis or cirrhosis likely", () => {
  const { result } = calc(fs, { disease: "hbv", lsm: 10.0, altX: 1, iqr: 18, valid: 10 });
  assert.equal(result.quality.reliable, true);
  assert.equal(result.lsm.text, "Advanced fibrosis or cirrhosis likely");
});

test("FibroScan: hepatitis B, LSM 10.0, ALT 2 × ULN, IQR/median 18%, 10 valid → reliable; indeterminate", () => {
  const { result } = calc(fs, { disease: "hbv", lsm: 10.0, altX: 2, iqr: 18, valid: 10 });
  assert.equal(result.quality.reliable, true);
  assert.equal(result.lsm.text, "Indeterminate");
});

test("FibroScan: MASLD, LSM 9.0, IQR/median 35%, 10 valid → unreliable (IQR/median >30% with LSM ≥7.1): repeat", () => {
  const { result, interp } = calc(fs, { disease: "masld", lsm: 9.0, iqr: 35, valid: 10 });
  assert.equal(result.quality.reliable, false);
  assert.deepEqual(result.quality.messages, ["Unreliable: IQR/median above 30%. Repeat the exam."]);
  assert.ok(interp.sections.find(s => s.title === "Step 3: LSM interpretation").muted);
});

test("FibroScan: MASLD, LSM 6.5, IQR/median 35%, 10 valid → reliable (LSM <7.1); low risk", () => {
  const { result } = calc(fs, { disease: "masld", lsm: 6.5, iqr: 35, valid: 10 });
  assert.equal(result.quality.reliable, true);
  assert.equal(result.lsm.key, "low");
});

test("FibroScan: any disease, ALT 6 × ULN → do-not-interpret warning shown", () => {
  for (const disease of ["masld", "alcohol", "hcv", "hbv", "other"]) {
    const { interp } = calc(fs, { disease, lsm: 9, iqr: 10, valid: 10, altX: 6 });
    const step2 = interp.sections.find(s => s.title === "Step 2: Confounders");
    assert.ok(step2 && step2.lines.includes("Do not interpret LSM for fibrosis during a hepatitis flare. Repeat when ALT settles."), disease);
  }
});

test("FibroScan: alcohol-related, LSM 16, IQR/median 20%, 11 valid, platelets 120 → reliable; cACLD highly likely; Baveno highly suggestive", () => {
  const { result } = calc(fs, { disease: "alcohol", lsm: 16, iqr: 20, valid: 11, plt: 120 });
  assert.equal(result.quality.reliable, true);
  assert.equal(result.lsm.text, "Compensated advanced chronic liver disease highly likely");
  assert.deepEqual(result.baveno, ["cACLD highly suggestive"]);
});
