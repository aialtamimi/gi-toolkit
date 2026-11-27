// SPEC.md B10.3 London classification of anorectal function; vectors from B8.10.
import { test } from "node:test";
import assert from "node:assert/strict";
import london, { fmt } from "../js/calculators/motility/london.js";
import { calc } from "./helpers.js";
import { section, vectors } from "./motility_spec.js";

const NORMAL = { rair: "present", resting: "normal", squeeze: "normal", expulsion: "normal", dyssynergia: false, propulsion: false,
  fcs: "normal", dd: "normal", mtv: "normal" };
const run = extra => calc(london, { ...NORMAL, ...extra });
const found = o => o.result.findings.map(fmt);

const CASES = [
  [{}, [], "No disorder of anorectal function"],
  [{ rair: "absent" }, ["Rectoanal areflexia (major)"], "Major disorder"],
  [{ resting: "low", squeeze: "low" }, ["Combined anal hypotension and hypocontractility (major)"], "Major disorder"],
  [{ resting: "low" }, ["Anal hypotension with normal contractility (minor)"], "Minor disorder"],
  [{ squeeze: "low" }, ["Anal normotension with hypocontractility (minor)"], "Minor disorder"],
  [{ resting: "high" }, ["Anal hypertension (minor)"], "Minor disorder"],
  [{ resting: "high", squeeze: "low" }, ["Anal hypertension (minor)", "Anal hypocontractility (minor)"], "Minor disorder"],
  [{ expulsion: "abnormal", dyssynergia: true, propulsion: true }, ["Abnormal expulsion with dyssynergia and poor propulsion (minor)"], "Minor disorder"],
  [{ expulsion: "abnormal", dyssynergia: true }, ["Abnormal expulsion with dyssynergia (minor)"], "Minor disorder"],
  [{ expulsion: "abnormal", propulsion: true }, ["Abnormal expulsion with poor propulsion (minor)"], "Minor disorder"],
  [{ expulsion: "abnormal" }, ["Abnormal expulsion with a normal pushing pattern (inconclusive)"], "Inconclusive"],
  [{ dyssynergia: true }, ["Normal expulsion with an abnormal pushing pattern (inconclusive)"], "Inconclusive"],
  [{ fcs: "above", dd: "above" }, ["Rectal hyposensitivity (major)"], "Major disorder"],
  [{ mtv: "above" }, ["Borderline rectal hyposensitivity (minor)"], "Minor disorder"],
  [{ mtv: "below" }, ["Rectal hypersensitivity (major)"], "Major disorder"],
  [{ rair: "absent", resting: "high", expulsion: "abnormal", dyssynergia: true },
    ["Rectoanal areflexia (major)", "Anal hypertension (minor)", "Abnormal expulsion with dyssynergia (minor)"], "Major disorder"]
];

test("B8.10 London: one test case per SPEC row", () => {
  const rows = vectors("London");
  assert.equal(rows.length, CASES.length);
  rows.forEach((row, i) => {
    for (const f of CASES[i][1]) assert.ok(row.expected.toLowerCase().includes(f.toLowerCase()), `row ${i + 1}: ${f}`);
  });
});

CASES.forEach(([extra, expected, band], i) => {
  test(`B8.10 London row ${i + 1}: ${expected.join("; ") || band}`, () => {
    const o = run(extra);
    assert.deepEqual(found(o), expected);
    assert.equal(o.interp.band, band);
  });
});

test("London: both hyposensitivity and hypersensitivity are shown if both apply; parts with no finding show Normal", () => {
  const o = run({ fcs: "above", dd: "above", mtv: "below" });
  assert.deepEqual(found(o), ["Rectal hyposensitivity (major)", "Rectal hypersensitivity (major)"]);
  assert.deepEqual(o.interp.sections.map(s => s.lines[0]), ["Normal", "Normal", "Normal", "Rectal hyposensitivity (major); Rectal hypersensitivity (major)"]);
});

test("London: every finding and label is in the SPEC B10.3 table", () => {
  const text = section("B10.3");
  for (const [, expected] of CASES) for (const f of expected) {
    const [, name, label] = f.match(/^(.+) \((major|minor|inconclusive)\)$/);
    assert.ok(text.toLowerCase().includes(name.toLowerCase()), name);
    assert.ok(new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^|]*\\| ${label[0].toUpperCase()}${label.slice(1)}`, "i").test(text), `${name} label ${label}`);
  }
  for (const b of ["Major disorder", "Minor disorder", "Inconclusive", "No disorder of anorectal function"]) assert.ok(text.includes(`"${b}"`));
  assert.equal(london.references[0].url, "https://pubmed.ncbi.nlm.nih.gov/31407463/");
});
