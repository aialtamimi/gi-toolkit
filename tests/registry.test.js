// Structural checks for every Phase 1 calculator (Build Rule 2).
import { test } from "node:test";
import assert from "node:assert/strict";
import { CALCULATORS, search } from "../js/registry.js";

const PHASE1 = ["gbs", "aims65", "rockall", "oakland", "forrest",
  "child_pugh", "meld_na", "meld3", "maddrey", "lille", "gahs", "abic", "fib4", "apri", "nfs", "albi",
  "ascites", "r_factor", "aih_simplified", "leipzig", "west_haven", "aclf", "kings", "baveno7", "fibroscan"];

test("registry contains every B2 and B3 calculator", () => {
  assert.deepEqual(CALCULATORS.map(c => c.id).sort(), [...PHASE1].sort());
});

for (const c of CALCULATORS) {
  test(`${c.id}: definition has inputs with units, compute, interpret and linked references`, () => {
    assert.ok(c.name && c.category && Array.isArray(c.inputs) && c.inputs.length);
    assert.equal(typeof c.compute, "function");
    assert.equal(typeof c.interpret, "function");
    assert.ok(c.references.length > 0);
    for (const r of c.references) assert.match(r.url, /^https:\/\//);
    const ids = c.inputs.filter(i => i.id).map(i => i.id);
    assert.equal(new Set(ids).size, ids.length, "duplicate input ids");
    for (const i of c.inputs.filter(i => i.type === "number")) {
      assert.ok(i.analyte || i.unit !== undefined, `${i.id} has no unit`);
      if (i.analyte) assert.ok(i.base === "si" || i.base === "conv", `${i.id} base`);
    }
  });
}

test("search matches names and aliases", () => {
  assert.equal(search("blatchford")[0].id, "gbs");
  assert.equal(search("VCTE")[0].id, "fibroscan");
  assert.ok(search("elastography").some(c => c.id === "fibroscan"));
  assert.ok(search("wilson").some(c => c.id === "leipzig"));
  assert.ok(search("meld").length >= 2);
});
