// SPEC.md B4.6 Revised Atlanta. B8 has no vector; these checks use the B4.6 tables directly.
import { test } from "node:test";
import assert from "node:assert/strict";
import atlanta from "../js/calculators/pancreas/atlanta.js";
import { calc } from "./helpers.js";

test("Atlanta: no organ failure, no complications → mild; diagnosis 2 of 3", () => {
  const { result, interp } = calc(atlanta, { pain: true, enzymes: true, of: "none" });
  assert.equal(interp.band, "Mild");
  assert.equal(result.dx, 2);
  assert.match(interp.sections[0].lines[0], /criteria met \(2 of 3\)/);
});

test("Atlanta: transient organ failure → moderately severe", () => {
  assert.equal(calc(atlanta, { of: "transient" }).interp.band, "Moderately severe");
});

test("Atlanta: complications without persistent organ failure → moderately severe", () => {
  assert.equal(calc(atlanta, { of: "none", complications: true }).interp.band, "Moderately severe");
});

test("Atlanta: persistent organ failure → severe", () => {
  assert.equal(calc(atlanta, { of: "persistent", complications: true }).interp.band, "Severe");
});

test("Atlanta: collection names by morphology and timing", () => {
  const cases = [["interstitial", "early", "Acute peripancreatic fluid collection (APFC)"], ["interstitial", "late", "Pseudocyst"],
    ["necrotizing", "early", "Acute necrotic collection (ANC)"], ["necrotizing", "late", "Walled-off necrosis (WON)"]];
  for (const [morph, timing, name] of cases) {
    const { result, interp } = calc(atlanta, { of: "none", morph, timing });
    assert.equal(result.collection, name);
    assert.equal(interp.band, "Moderately severe");   // a local collection is a local complication
  }
});

test("Atlanta: one diagnostic criterion is not enough", () => {
  const { interp } = calc(atlanta, { pain: true, of: "none" });
  assert.match(interp.sections[0].lines[0], /needs 2 of 3/);
});
