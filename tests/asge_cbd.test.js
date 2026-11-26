// SPEC.md B8.4 ASGE choledocholithiasis and B4.9 criteria
import { test } from "node:test";
import assert from "node:assert/strict";
import asge, { ACTIONS } from "../js/calculators/pancreas/asge_cbd.js";
import { calc } from "./helpers.js";

// B8.4 gives no age; the result is intermediate for any age because the duct is dilated.
for (const age of [40, 60]) {
  test(`ASGE: CBD 8 mm, bilirubin 3 mg/dL, no stone seen, no cholangitis (age ${age}) → intermediate`, () => {
    const { result, interp } = calc(asge, { cbd: 8, bili: 3, age }, { bili: "conv" });
    assert.equal(result.level, "Intermediate");
    assert.equal(interp.action, ACTIONS.Intermediate);
  });
}

test("ASGE: bilirubin >4 mg/dL AND dilated duct → high", () => {
  const { result, interp } = calc(asge, { cbd: 7, bili: 4.1, age: 40 }, { bili: "conv" });
  assert.equal(result.level, "High");
  assert.equal(interp.action, "Proceed to ERCP");
});

test("ASGE: bilirubin >4 mg/dL with a 6 mm duct (not dilated) is not high", () => {
  assert.equal(calc(asge, { cbd: 6, bili: 5, age: 40 }, { bili: "conv" }).result.level, "Low");
  assert.equal(calc(asge, { cbd: 6, bili: 5, age: 40, lft: true }, { bili: "conv" }).result.level, "Intermediate");
});

test("ASGE: stone on imaging or cholangitis → high; no predictors → low", () => {
  assert.equal(calc(asge, { stone: true, cbd: 4, bili: 0.5, age: 30 }, { bili: "conv" }).result.level, "High");
  assert.equal(calc(asge, { cholangitis: true, cbd: 4, bili: 0.5, age: 30 }, { bili: "conv" }).result.level, "High");
  const low = calc(asge, { cbd: 4, bili: 0.5, age: 55 }, { bili: "conv" });
  assert.equal(low.result.level, "Low");
  assert.equal(low.interp.action, "Cholecystectomy with or without intraoperative cholangiography");
});
