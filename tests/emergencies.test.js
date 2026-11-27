// SPEC.md B7 emergency pages: every block checked verbatim against SPEC.md, plus order, links and search.
// Classic pages use the B7 template; bedside algorithm pages use the B7.0 format (tests/spec_b7.js parses both).
import { test } from "node:test";
import assert from "node:assert/strict";
import { EMERGENCIES, EMERGENCY_INDEX, REDIRECTS, findItem, search, hrefFor } from "../js/registry.js";
import { SPEC_REFS, tokenize } from "../js/pages.js";
import { DOSES } from "../js/doses.js";
import { SPEC, CALC_NAMES, isAlgorithm, parseClassic, parseAlgorithm } from "./spec_b7.js";

const NUMS = Array.from({ length: 18 }, (_, i) => `B7.${i + 1}`).filter(n => n !== "B7.2");
const ALGORITHM_NUMS = NUMS.filter(isAlgorithm);
const CLASSIC = NUMS.filter(n => !isAlgorithm(n)).map(parseClassic);
const ALGORITHMS = ALGORITHM_NUMS.map(parseAlgorithm);
const ALL = [...CLASSIC, ...ALGORITHMS];

test("five bedside algorithm pages: B7.1, B7.5, B7.9, B7.12, B7.13", () => {
  assert.deepEqual(ALGORITHM_NUMS, ["B7.1", "B7.5", "B7.9", "B7.12", "B7.13"]);
  assert.deepEqual(EMERGENCIES.filter(p => p.kind === "algorithm").map(p => p.spec), ALGORITHM_NUMS);
});

test("18 index entries in the B7.19 order with the B7.19 names, on 17 pages plus the variceal entry", () => {
  const order = SPEC.match(/in this order: (.*)\.\n/)[1].split(",").map(s => s.trim());
  assert.equal(EMERGENCY_INDEX.length, 18);
  assert.deepEqual(EMERGENCY_INDEX.map(e => e.name), order);
  assert.deepEqual(EMERGENCY_INDEX.map(e => findItem(e.id).short), order);
  assert.equal(EMERGENCIES.length, 17);
  assert.deepEqual(EMERGENCIES.map(p => p.id), EMERGENCY_INDEX.map(e => e.id).filter(id => id !== "em_variceal"));
  assert.deepEqual([...EMERGENCIES.map(p => p.id)].sort(), ALL.map(p => p.id).sort());
});

for (const spec of CLASSIC) {
  test(`${spec.id} (${spec.num}): every section, table, note and source line is verbatim SPEC text`, () => {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    assert.equal(page.spec, spec.num);
    assert.equal(page.name, spec.name);
    assert.equal(page.kind, undefined);
    assert.deepEqual(page.blocks, spec.blocks);
  });
}

// The page file stores calculator ids and dose ids; SPEC names them.
function withNames(page) {
  const calcName = id => Object.keys(CALC_NAMES).find(k => CALC_NAMES[k] === id);
  const doseName = id => DOSES.find(d => d.id === id).name;
  return page.blocks.map(b => {
    if (b.type === "step" || b.type === "decision") {
      const { calcs, doses, ...rest } = b;
      return { ...rest, calcNames: calcs.map(calcName), doseNames: doses.map(doseName) };
    }
    if (b.type === "redflags" && b.calcs) { const { calcs, ...rest } = b; return { ...rest, calcNames: calcs.map(calcName) }; }
    return b;
  });
}
const sortKeys = o => Array.isArray(o) ? o.map(sortKeys) : o && typeof o === "object"
  ? Object.fromEntries(Object.keys(o).sort().map(k => [k, sortKeys(o[k])])) : o;

for (const spec of ALGORITHMS) {
  test(`${spec.id} (${spec.num}): every red flag, step, decision, answer, why line, table and source is verbatim SPEC text`, () => {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    assert.equal(page.spec, spec.num);
    assert.equal(page.name, spec.name);
    assert.equal(page.kind, "algorithm");
    assert.equal(page.weight, spec.weight);
    assert.deepEqual(page.entries, spec.entries);
    assert.deepEqual(sortKeys(withNames(page)), sortKeys(spec.blocks));
  });

  test(`${spec.id}: layout follows B7.0 (red flags first, then Recognize, steps, Avoid, tables)`, () => {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    const types = page.blocks.filter(b => b.type !== "source").map(b => b.type === "decision" ? "step" : b.type === "section" ? b.title : b.type);
    assert.equal(types[0], "redflags");
    assert.equal(types[1], "Recognize");
    const firstStep = types.indexOf("step"), lastStep = types.lastIndexOf("step");
    assert.equal(firstStep, 2);
    assert.ok(types.slice(firstStep, lastStep + 1).every(t => t === "step"), "steps are contiguous");
    assert.equal(types[lastStep + 1], "Avoid");
    assert.ok(types.slice(lastStep + 2).every(t => t === "table"));
  });

  test(`${spec.id}: decisions, answers and "shown when" references are consistent`, () => {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    const seen = new Map();
    for (const b of page.blocks.filter(b => b.type === "step" || b.type === "decision")) {
      assert.ok(!seen.has(b.id), `duplicate step id ${b.id}`);
      for (const [d, v] of b.when) {
        assert.ok(seen.has(d), `${b.id} depends on ${d}, which is not an earlier step`);
        assert.equal(seen.get(d).type, "decision", `${d} is not a decision`);
        assert.ok(seen.get(d).options.some(o => o.value === v), `${b.id}: ${d} has no answer "${v}"`);
      }
      if (b.type === "decision") {
        assert.ok(b.options.length >= 2, `${b.id} needs at least 2 answers`);
        assert.equal(new Set(b.options.map(o => o.value)).size, b.options.length);
      }
      seen.set(b.id, b);
    }
    // Every answer leads somewhere (a step shown for it).
    for (const d of [...seen.values()].filter(b => b.type === "decision")) {
      for (const o of d.options) {
        assert.ok([...seen.values()].some(s => s.when.some(([x, v]) => x === d.id && v === o.value)), `${d.id} answer "${o.value}" shows no step`);
      }
    }
    for (const [entry, ans] of Object.entries(page.entries)) {
      for (const [d, v] of Object.entries(ans)) assert.ok(seen.get(d).options.some(o => o.value === v), `entry ${entry}`);
    }
  });

  test(`${spec.id}: built-in calculators exist, at most once per block (each copy gets its own input ids)`, () => {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    const ids = page.blocks.flatMap(b => b.calcs || []);
    assert.ok(ids.length > 0);
    for (const b of page.blocks) if (b.calcs) assert.equal(new Set(b.calcs).size, b.calcs.length, `${b.id || b.type}: calculator listed twice`);
    for (const id of ids) assert.ok(findItem(id) && findItem(id).inputs, `${id} is not a calculator`);
  });

  test(`${spec.id}: weight field only when the page has weight-based doses, and every dose is placed`, () => {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    const stepDoses = page.blocks.flatMap(b => b.doses || []);
    const pageDoses = DOSES.filter(d => d.page === page.id);
    assert.equal(page.weight, pageDoses.length > 0);
    assert.deepEqual([...new Set(stepDoses)].sort(), pageDoses.map(d => d.id).sort(), "each dose appears in a step");
    const dosesTable = page.blocks.find(b => b.type === "table" && b.columns[1] === "Dose");
    for (const d of pageDoses.filter(d => d.row)) assert.ok(dosesTable.rows.some(r => r[0] === d.row), `${d.id}: no "${d.row}" row`);
  });
}

test("variceal bleeding (B7.2) opens the upper GI bleeding page at the variceal pathway", () => {
  assert.match(SPEC, /### B7\.2 Acute variceal bleeding \(id: em\\_variceal\)\n\nMerged into B7\.1\./);
  const v = findItem("em_variceal");
  assert.deepEqual(REDIRECTS, [v]);
  assert.deepEqual(v.redirect, { page: "em_ugib", entry: "variceal" });
  assert.equal(v.short, "Variceal bleeding");
  assert.equal(hrefFor("em_variceal"), "#/emergency/em_ugib/variceal");
  assert.deepEqual(findItem("em_ugib").entries.variceal, { D1: "Yes" });
  for (const q of ["Variceal bleeding", "variceal bleeding", "Acute variceal bleeding", "varices"]) {
    assert.equal(search(q)[0].id, "em_variceal", q);
    assert.equal(hrefFor(search(q)[0].id), "#/emergency/em_ugib/variceal", q);
  }
});

test("related calculators match the SPEC \"Related:\" line, in order, and exist", () => {
  for (const spec of ALL) {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    assert.deepEqual(page.related, spec.related.map(n => CALC_NAMES[n]), spec.id);
    for (const id of page.related) assert.ok(findItem(id), `${id} not found`);
  }
});

function blockTexts(b) {
  if (b.type === "table") return [...b.columns, ...b.rows.flat()];
  if (b.type === "step" || b.type === "decision") return [b.title, ...b.items, ...(b.options || []).map(o => o.text), b.why || ""];
  return [b.text, b.why || ""];
}

test("every SPEC cross-reference in page text links to an existing item", () => {
  const refs = new Set();
  for (const p of EMERGENCIES) for (const b of p.blocks) for (const t of blockTexts(b)) for (const tok of tokenize(t)) if (tok.type === "ref") refs.add(tok.spec);
  assert.ok(refs.size > 0);
  for (const r of refs) assert.ok(SPEC_REFS[r] && findItem(SPEC_REFS[r]), `${r} has no link target`);
});

test("inline markdown links in page text are parsed as links", () => {
  const toks = tokenize("Restrictive transfusion ([ESGE 2022](https://pubmed.ncbi.nlm.nih.gov/36174643)). GBS (B2.1).");
  assert.deepEqual(toks.filter(t => t.type !== "text"), [
    { type: "url", label: "ESGE 2022", url: "https://pubmed.ncbi.nlm.nih.gov/36174643" },
    { type: "ref", spec: "B2.1", target: "gbs" }]);
});

test("every emergency page has a route and is reachable from search", () => {
  for (const p of EMERGENCIES) {
    assert.equal(hrefFor(p.id), `#/emergency/${p.id}`);
    assert.ok(search(p.name).includes(p), p.name);
    assert.ok(search(p.short).includes(p), p.short);
    assert.ok(p.aliases.length > 0);
    for (const r of p.references) assert.match(r.url, /^https:\/\//);
  }
});
