// SPEC.md B8.5 Truelove and Witts and B5.1 criteria
import { test } from "node:test";
import assert from "node:assert/strict";
import tw from "../js/calculators/ibd/truelove_witts.js";
import { calc } from "./helpers.js";

test("Truelove and Witts: 8 bloody stools/day, HR 100 → severe", () => {
  const { result, interp } = calc(tw, { stools: 8, blood: "bloody", hr: 100 });
  assert.equal(result.severity, "Severe");
  assert.equal(interp.action, "Acute severe ulcerative colitis: admit. Open the ASUC emergency page.");
  assert.ok(interp.links.some(l => l.target === "em_asuc"));
});

test("Truelove and Witts: ≥6 bloody stools without a systemic feature → moderate", () => {
  assert.equal(calc(tw, { stools: 6, blood: "bloody", hr: 90, temp: 37.8, hb: 10.5, esr: 30, crp: 30 }, { hb: "conv" }).result.severity, "Moderate");
});

test("Truelove and Witts: each systemic feature alone qualifies with ≥6 bloody stools", () => {
  for (const extra of [{ temp: 37.9 }, { hb: 10.4 }, { esr: 31 }, { crp: 31 }]) {
    assert.equal(calc(tw, { stools: 6, blood: "bloody", ...extra }, { hb: "conv" }).result.severity, "Severe", JSON.stringify(extra));
  }
});

test("Truelove and Witts: mild needs <4 stools, little or no blood, and no systemic toxicity with normal ESR", () => {
  assert.equal(calc(tw, { stools: 3, blood: "little", mildConfirm: true }).result.severity, "Mild");
  assert.equal(calc(tw, { stools: 3, blood: "little" }).result.severity, "Moderate");
  assert.equal(calc(tw, { stools: 4, blood: "little", mildConfirm: true }).result.severity, "Moderate");
  assert.equal(calc(tw, { stools: 3, blood: "little", mildConfirm: true, hr: 95 }).result.severity, "Moderate");
});
