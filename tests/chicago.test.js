// SPEC.md B10.1 Chicago Classification v4.0; vectors from B8.10.
import { test } from "node:test";
import assert from "node:assert/strict";
import chicago, { NOTES, EGJOO_INCONCLUSIVE, ABSENT_NOTE, SYMPTOM_NOTE, IEM_INCONCLUSIVE, FALLTHROUGH_NOTE } from "../js/calculators/motility/chicago.js";
import { evaluate } from "../js/engine.js";
import { calc } from "./helpers.js";
import { section, vectors } from "./motility_spec.js";

const ZERO = { failed: 0, weak: 0, fragmented: 0, premature: 0, hyper: 0, pep: 0, ibp: 0 };
// Default upper limits come from the inputs themselves (15 and 12 mmHg), as on the screen.
const run = (irp_supine, irp_upright, extra = {}) => calc(chicago, { irp_supine, irp_upright, ...ZERO, ...extra });

// Same order as the Chicago rows of B8.10.
const CASES = [
  [[30, 25, { failed: 100, pep: 40 }], "Achalasia type II"],
  [[30, 25, { failed: 100, pep: 20 }], "Achalasia type II"],
  [[30, 25, { failed: 100, pep: 19 }], "Achalasia type I"],
  [[28, 20, { failed: 30, weak: 20, fragmented: 10, premature: 40 }], "Achalasia type III"],
  [[28, 20, { premature: 30, ibp: 30 }], "EGJ outflow obstruction, inconclusive"],
  [[22, 18, { ibp: 25, symptoms: true, supportive: true }], "EGJ outflow obstruction, clinically relevant"],
  [[22, 18, { ibp: 25, symptoms: true }], "EGJ outflow obstruction, inconclusive"],
  [[22, 10, { ibp: 25 }], "Normal esophageal motility"],
  [[22, 18, { ibp: 19 }], "Normal esophageal motility"],
  [[15, 12, { failed: 100 }], "Absent contractility"],
  [[22, 18, { failed: 100, uln_supine: "25", uln_upright: "20" }], "Absent contractility"],
  [[10, 8, { premature: 20, symptoms: true }], "Distal esophageal spasm, clinically relevant"],
  [[10, 8, { premature: 30 }], "Distal esophageal spasm pattern, inconclusive"],
  [[10, 8, { hyper: 25, symptoms: true }], "Hypercontractile esophagus, clinically relevant"],
  [[10, 8, { hyper: 25 }], "Hypercontractile esophagus pattern, inconclusive"],
  [[10, 8, { failed: 50 }], "Ineffective esophageal motility"],
  [[10, 8, { failed: 20, weak: 40, fragmented: 20 }], "Ineffective esophageal motility"],
  [[10, 8, { failed: 20, weak: 50 }], "Ineffective esophageal motility, inconclusive"],
  [[10, 8, { weak: 50 }], "Ineffective esophageal motility, inconclusive"],
  [[10, 8, { weak: 40 }], "Normal esophageal motility"]
];

test("B8.10 Chicago: one test case per SPEC row, with the same expected band", () => {
  const rows = vectors("Chicago");
  assert.equal(rows.length, CASES.length);
  rows.forEach((row, i) => assert.ok(row.expected.startsWith(CASES[i][1]), `row ${i + 1}: ${row.expected}`));
});

CASES.forEach(([args, band], i) => {
  test(`B8.10 Chicago row ${i + 1}: ${band}`, () => {
    const { interp } = run(...args);
    assert.equal(interp.band, band);
    for (const n of NOTES) assert.ok(interp.notes.includes(n));
  });
});

test("Chicago: actions and notes per rule", () => {
  assert.equal(run(22, 18, { ibp: 25, symptoms: true }).interp.action, EGJOO_INCONCLUSIVE);
  assert.equal(run(22, 18, { ibp: 25, supportive: true }).interp.action, EGJOO_INCONCLUSIVE);
  assert.equal(run(22, 18, { ibp: 25, symptoms: true, supportive: true }).interp.action, undefined);
  assert.equal(run(10, 8, { failed: 100 }).interp.action, ABSENT_NOTE);
  assert.equal(run(10, 8, { premature: 30 }).interp.action, SYMPTOM_NOTE);
  assert.equal(run(10, 8, { hyper: 30 }).interp.action, SYMPTOM_NOTE);
  assert.equal(run(10, 8, { weak: 60 }).interp.action, IEM_INCONCLUSIVE);
  assert.ok(run(22, 10, { ibp: 25 }).interp.notes.includes(FALLTHROUGH_NOTE));
  assert.ok(!run(10, 8, {}).interp.notes.includes(FALLTHROUGH_NOTE));
  assert.equal(run(10, 8, {}).interp.level, "low");
});

test("Chicago: supine IRP above the limit without EGJOO criteria still classifies peristalsis", () => {
  assert.equal(run(22, 10, { premature: 30, symptoms: true }).interp.band, "Distal esophageal spasm, clinically relevant");
  assert.equal(run(22, 10, { failed: 60 }).interp.band, "Ineffective esophageal motility");
});

test("Chicago: premature 20% or more with normal peristalsis and IRP high is not type III", () => {
  assert.equal(run(28, 10, { premature: 30 }).interp.band, "Distal esophageal spasm pattern, inconclusive");
});

test("Chicago: upper limits default to 15 and 12 mmHg and can be edited; IRP at the limit is not above it", () => {
  const ins = Object.fromEntries(chicago.inputs.filter(i => i.id).map(i => [i.id, i]));
  assert.equal(ins.uln_supine.default, 15);
  assert.equal(ins.uln_upright.default, 12);
  assert.equal(run(15, 12, { ibp: 50, symptoms: true, supportive: true }).interp.band, "Normal esophageal motility");
  assert.equal(run(16, 13, { ibp: 50, symptoms: true, supportive: true }).interp.band, "EGJ outflow obstruction, clinically relevant");
  assert.equal(run(16, 13, { ibp: 50, symptoms: true, supportive: true, uln_supine: "20", uln_upright: "15" }).interp.band, "Normal esophageal motility");
  const cleared = evaluate(chicago, { irp_supine: 10, irp_upright: 8, ...ZERO, uln_supine: "" });
  assert.ok(cleared.missing.some(m => m.startsWith("IRP upper limit of normal, supine")));
});

test("Chicago: every band, action and note is SPEC B10.1 text", () => {
  const text = section("B10.1");
  for (const [, band] of CASES) assert.ok(text.includes(`| ${band} |`), band);
  for (const n of [...NOTES, EGJOO_INCONCLUSIVE, ABSENT_NOTE, SYMPTOM_NOTE, IEM_INCONCLUSIVE, FALLTHROUGH_NOTE]) assert.ok(text.includes(`"${n}"`), n);
  assert.match(text, /\[Yadlapati R et al\. Neurogastroenterol Motil 2021 \(PMID 33373111\)\]\(https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/33373111\/\)/);
  assert.equal(chicago.references[0].url, "https://pubmed.ncbi.nlm.nih.gov/33373111/");
});

test("Chicago: breakdown lists the rule applied and the inputs", () => {
  const { result } = run(30, 25, { failed: 100, pep: 40 });
  assert.equal(result.breakdown.at(-1).value, "1");
  assert.equal(result.breakdown[0].value, "30 mmHg (above the upper limit 15)");
  assert.equal(run(10, 8, { failed: 20, weak: 30, fragmented: 10 }).result.ineffective, 60);
});
