// SPEC.md B10.2 Eckardt score; vectors from B8.10.
import { test } from "node:test";
import assert from "node:assert/strict";
import eckardt from "../js/calculators/motility/eckardt.js";
import { calc } from "./helpers.js";
import { section, vectors } from "./motility_spec.js";

const run = (d, r, p, w, timing = "before") => calc(eckardt, { dysphagia: d, regurgitation: r, pain: p, weight: w, timing });

const CASES = [
  [[1, 1, 0, 0], 2, "I"], [[0, 1, 0, 0], 1, "0"], [[2, 2, 0, 0], 4, "II"], [[3, 2, 1, 0], 6, "II"],
  [[3, 3, 1, 0], 7, "III"], [[3, 3, 3, 3], 12, "III"]
];

test("B8.10 Eckardt: one test case per SPEC row", () => {
  assert.equal(vectors("Eckardt").length, CASES.length + 2);
});

for (const [args, score, stage] of CASES) {
  test(`B8.10 Eckardt ${args.join(", ")} before treatment → ${score}, stage ${stage}`, () => {
    const { result, interp } = run(...args);
    assert.equal(result.score, score);
    assert.equal(interp.band, `Stage ${stage}`);
  });
}

test("B8.10 Eckardt after treatment: 3 is not treatment failure, 4 is", () => {
  let o = run(2, 1, 0, 0, "after");
  assert.equal(o.result.score, 3);
  assert.equal(o.result.stage, "I");
  assert.equal(o.interp.band, "Treatment success (score 3 or less)");
  o = run(2, 1, 1, 0, "after");
  assert.equal(o.result.score, 4);
  assert.equal(o.result.stage, "II");
  assert.equal(o.interp.band, "Treatment failure (score >3)");
});

test("Eckardt: table and bands are SPEC B10.2 text", () => {
  const text = section("B10.2");
  for (const row of eckardt.table.rows) assert.ok(text.includes(`| ${row.join(" | ")} |`), row[0]);
  for (const b of ["Treatment failure (score >3)", "Treatment success (score 3 or less)"]) assert.ok(text.includes(`"${b}"`));
  assert.equal(eckardt.references[0].url, "https://pubmed.ncbi.nlm.nih.gov/1451966/");
  assert.ok(text.includes("(PMID 1451966)](https://pubmed.ncbi.nlm.nih.gov/1451966/)"));
});
