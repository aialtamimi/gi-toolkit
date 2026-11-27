// Drug classes are written in full with the abbreviation in brackets at first use on each page
// (SPEC.md B1.8, clinical owner decision on Phase 3), and Phase 3 sources carry a DOI or PMID.
import { test } from "node:test";
import assert from "node:assert/strict";
import { CALCULATORS, CARDS, EMERGENCIES } from "../js/registry.js";
import { calc } from "./helpers.js";
import { pageText } from "../js/algorithm.js";

export const DRUG_CLASSES = {
  PPI: "proton pump inhibitor",
  DOAC: "direct oral anticoagulant",
  VKA: "vitamin K antagonist",
  PCC: "prothrombin complex concentrate",
  FFP: "fresh frozen plasma",
  NSAIDs: "non-steroidal anti-inflammatory drugs"
};

// Text of a page in the order it is shown.
function emergencyText(p) {
  if (p.kind === "algorithm") return pageText(p);
  return p.blocks.map(b => b.type === "table" ? [...b.columns, ...b.rows.flat()].join(" | ") : `${b.title || ""} ${b.text}`).join("\n");
}
function cardText(c) {
  return [c.table.columns.join(" | "), ...c.table.rows.map(r => r.join(" | ")), c.use, ...(c.notes || [])].join("\n");
}

function checkFirstUse(text, where) {
  for (const [abbr, full] of Object.entries(DRUG_CLASSES)) {
    const first = text.search(new RegExp(`\\b${abbr}\\b`));
    if (first < 0) continue;
    const expanded = text.toLowerCase().indexOf(`${full} (${abbr}`.toLowerCase());
    assert.ok(expanded >= 0 && expanded < first, `${where}: "${abbr}" is used before "${full} (${abbr})"`);
  }
}

for (const p of EMERGENCIES) {
  test(`${p.id}: drug classes are written in full at first use`, () => checkFirstUse(emergencyText(p), p.id));
}
for (const c of CARDS.filter(c => c.kind === "card")) {
  test(`${c.id}: drug classes are written in full at first use`, () => checkFirstUse(cardText(c), c.id));
}

test("Forrest: every result's action writes proton pump inhibitor (PPI) in full", () => {
  const forrest = CALCULATORS.find(c => c.id === "forrest");
  for (const o of forrest.inputs[0].options) {
    const { interp } = calc(forrest, { cls: o.value });
    checkFirstUse(`${interp.action}\n${interp.notes.join("\n")}`, `forrest ${o.value}`);
    assert.match(interp.action, /proton pump inhibitor \(PPI\)/);
  }
});

test("every emergency page lists at least one source", () => {
  for (const p of EMERGENCIES) assert.ok(p.references.length > 0, p.id);
});

test("Ogilvie syndrome and volvulus cite Naveed 2020; perforation cites Paspatis 2020", () => {
  const cites = id => EMERGENCIES.find(p => p.id === id).references;
  for (const id of ["em_acpo", "em_volvulus"]) {
    const r = cites(id).find(r => r.citation.startsWith("Naveed M"));
    assert.ok(r && r.citation.includes("doi:10.1016/j.gie.2019.09.007") && r.url === "https://doi.org/10.1016/j.gie.2019.09.007", id);
  }
  const p = cites("em_perforation").find(r => r.citation.startsWith("Paspatis GA"));
  assert.ok(p && p.citation.includes("doi:10.1055/a-1222-3191") && p.url === "https://doi.org/10.1055/a-1222-3191");
});

test("expanded citations carry a PMID and link to their PubMed record", () => {
  const all = [...EMERGENCIES, ...CARDS].flatMap(x => x.references);
  const expected = {
    "Lee WM, Stravitz RT, Larson AM": "22213561",
    "Manes G": "30943551",
    "Jalan KN": "5305933",
    "Rahimi RS": "25243839",
    "Lundell LR": "10403727",
    "Sharma P": "17101315"
  };
  for (const [author, pmid] of Object.entries(expected)) {
    const r = all.find(r => r.citation.startsWith(author));
    assert.ok(r, author);
    assert.ok(r.citation.includes(`PMID ${pmid}`), `${author} PMID`);
    assert.equal(r.url, `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`);
  }
});
