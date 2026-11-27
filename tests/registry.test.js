// Structural checks for every Phase 1 calculator (Build Rule 2).
import { test } from "node:test";
import assert from "node:assert/strict";
import { CALCULATORS, search } from "../js/registry.js";

const PHASE1 = ["gbs", "aims65", "rockall", "oakland", "forrest",
  "child_pugh", "meld_na", "meld3", "maddrey", "lille", "gahs", "abic", "fib4", "apri", "nfs", "albi",
  "ascites", "r_factor", "aih_simplified", "leipzig", "west_haven", "aclf", "clif_c_aclf", "kings", "baveno7", "fibroscan"];
const PHASE2 = ["bisap", "ranson", "glasgow_imrie", "sirs", "marshall", "atlanta", "mctsi", "tg18_cholangitis", "asge_cbd",
  "truelove_witts", "asuc_day3", "mayo_uc", "uceis", "hbi", "cdai", "ses_cd", "rutgeerts", "montreal", "jalan"];

test("registry contains every B2, B3, B4 and B5 calculator (B5.10 Jalan included)", () => {
  assert.deepEqual(CALCULATORS.map(c => c.id).sort(), [...PHASE1, ...PHASE2].sort());
});

test("B4 tools are in the pancreas category and B5 tools in IBD", () => {
  for (const id of PHASE2.slice(0, 9)) assert.equal(CALCULATORS.find(c => c.id === id).category, "pancreas", id);
  for (const id of PHASE2.slice(9)) assert.equal(CALCULATORS.find(c => c.id === id).category, "ibd", id);
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
  assert.equal(search("BISAP")[0].id, "bisap");
  assert.ok(search("cholangitis").some(c => c.id === "tg18_cholangitis"));
  assert.ok(search("crohn").some(c => c.id === "cdai"));
  assert.ok(search("ASUC").some(c => c.id === "asuc_day3"));
});

test("footer and About page show the designer credit", async () => {
  const { DESIGNER } = await import("../js/version.js");
  assert.equal(DESIGNER, "Designed by Dr. Abdulaziz Altamimi");
  const { readFileSync } = await import("node:fs");
  const app = readFileSync(new URL("../js/app.js", import.meta.url), "utf8");
  const uses = app.match(/h\("p", \{ class: "designer" \}, DESIGNER\)/g) || [];
  assert.equal(uses.length, 2, "DESIGNER should be rendered in appFooter() and about()");
});

test("all pages reachable from search (B1.9 Phase 3): every calculator, card and emergency page", async () => {
  const { CARDS, EMERGENCIES } = await import("../js/registry.js");
  const all = [...CALCULATORS, ...CARDS, ...EMERGENCIES];
  assert.equal(all.length, 45 + 8 + 18);
  for (const item of all) assert.ok(search(item.name).includes(item), item.name);
});
