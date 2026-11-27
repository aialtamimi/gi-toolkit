// SPEC.md B1.6: home tiles in order; every calculator and card in exactly one category; moved cards still open.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, CALCULATORS, CARDS, itemsInCategory, search, hrefFor, findItem } from "../js/registry.js";

test("home tiles in the B1.6 order", () => {
  assert.deepEqual(CATEGORIES.map(c => c.name),
    ["GI bleeding", "Liver", "Pancreas and biliary", "IBD", "Motility", "Endoscopy classifications", "Emergencies"]);
});

test("every calculator and card appears in exactly one category", () => {
  const cats = CATEGORIES.filter(c => c.id !== "emergencies");
  for (const item of [...CALCULATORS, ...CARDS]) {
    const n = cats.filter(c => itemsInCategory(c.id).includes(item)).length;
    assert.equal(n, 1, item.id);
  }
});

test("moved cards: Sarin after Forrest in GI bleeding; Bismuth-Corlette and Strasberg in Pancreas and biliary; Motility list", () => {
  const ids = cat => itemsInCategory(cat).map(i => i.id);
  const bleeding = ids("bleeding");
  assert.equal(bleeding[bleeding.indexOf("forrest") + 1], "sarin");
  assert.deepEqual(ids("pancreas").slice(-2), ["bismuth_corlette", "strasberg"]);
  assert.deepEqual(ids("motility"), ["chicago", "eckardt", "london", "bristol", "lyon2"]);
  for (const id of ["sarin", "bismuth_corlette", "strasberg", "lyon2", "bristol"]) {
    assert.ok(!ids("endoscopy").includes(id), id);
    assert.equal(hrefFor(id), `#/card/${id}`);
    assert.equal(findItem(id).id, id);
    assert.ok(search(findItem(id).name).includes(findItem(id)), id);
  }
  assert.equal(ids("endoscopy").length, 17);
});

test("links to moved cards still resolve (LA grade → Lyon 2.0, Hill → Lyon 2.0)", () => {
  for (const c of CARDS) for (const l of c.links || []) assert.ok(findItem(l.target), `${c.id} → ${l.target}`);
});
