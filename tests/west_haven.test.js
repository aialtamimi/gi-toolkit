// SPEC.md B3.16 West Haven. B8 has no test vector for West Haven; these checks confirm each
// selection returns its B3.16 row unchanged.
import { test } from "node:test";
import assert from "node:assert/strict";
import wh from "../js/calculators/liver/west_haven.js";
import { calc } from "./helpers.js";

const B316 = [
  ["Minimal", "Abnormal psychometric or neurophysiological tests only", "Covert"],
  ["1", "Trivial lack of awareness, euphoria or anxiety, shortened attention span, impaired addition or subtraction, altered sleep rhythm", "Covert"],
  ["2", "Lethargy or apathy, disorientation for time, obvious personality change, inappropriate behavior, dyspraxia, asterixis", "Overt"],
  ["3", "Somnolence to semi-stupor, responsive to stimuli, confused, gross disorientation, bizarre behavior", "Overt"],
  ["4", "Coma", "Overt"]
];

for (const [grade, features, category] of B316) {
  test(`West Haven ${grade} returns the B3.16 row`, () => {
    const { result, interp } = calc(wh, { grade });
    assert.equal(result.row.features, features);
    assert.equal(result.row.category, category);
    assert.equal(interp.text, features);
  });
}
