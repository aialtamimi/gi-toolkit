// SPEC.md B7 emergency pages: every block checked verbatim against SPEC.md, plus order, links and search.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EMERGENCIES, EMERGENCY_INDEX, findItem, search, hrefFor } from "../js/registry.js";
import { SPEC_REFS, PRESCRIBING_FOOTER, tokenize } from "../js/pages.js";

const SPEC = readFileSync(new URL("../SPEC.md", import.meta.url), "utf8");

// Independent parser of a SPEC B7 page into the same block model as content/emergencies/<id>.js.
function parsePage(num) {
  const start = SPEC.indexOf(`### ${num} `);
  const rest = SPEC.slice(start);
  const heading = rest.slice(0, rest.indexOf("\n"));
  const body = rest.slice(heading.length + 1, rest.slice(4).search(/\n#{2,3} /) + 4);
  const blocks = [];
  let related = [];
  let table = null;
  for (const line of body.split("\n")) {
    if (!line.startsWith("|")) table = null;
    let m;
    if (!line.trim()) continue;
    if ((m = line.match(/^- \*\*(.+?):\*\* (.*)$/))) blocks.push({ type: "section", title: m[1], text: m[2] });
    else if (line.startsWith("|")) {
      const cells = line.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());
      if (cells.every(c => /^-+$/.test(c))) continue;
      if (!table) { table = { type: "table", columns: cells, rows: [] }; blocks.push(table); } else table.rows.push(cells);
    }
    else if ((m = line.match(/^Show: "(.*)"$/))) blocks.push({ type: "note", text: m[1] });
    else if ((m = line.match(/^Sources?: (.*)$/))) blocks.push({ type: "source", text: m[1] });
    else if ((m = line.match(/^Related: (.*)\.$/))) related = m[1].split(",").map(s => s.trim());
    else assert.fail(`unparsed SPEC line in ${num}: ${line}`);
  }
  const hm = heading.match(/^### (B7\.\d+) (.+?) \(id: (.+)\)$/);
  return { num: hm[1], name: hm[2], id: hm[3].replace(/\\_/g, "_"), blocks, related };
}

const PAGES = Array.from({ length: 18 }, (_, i) => parsePage(`B7.${i + 1}`));

test("18 emergency pages, in the B7.19 index order with the B7.19 names", () => {
  const order = SPEC.match(/in this order: (.*)\.\n/)[1].split(",").map(s => s.trim());
  assert.equal(EMERGENCIES.length, 18);
  assert.deepEqual(EMERGENCIES.map(p => p.short), order);
  assert.deepEqual(EMERGENCIES.map(p => p.id), EMERGENCY_INDEX.map(e => e.id));
  assert.deepEqual(EMERGENCIES.map(p => p.id), PAGES.map(p => p.id));
});

for (const spec of PAGES) {
  test(`${spec.id} (${spec.num}): every section, table, note and source line is verbatim SPEC text`, () => {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    assert.equal(page.spec, spec.num);
    assert.equal(page.name, spec.name);
    assert.deepEqual(page.blocks, spec.blocks);
  });

  test(`${spec.id}: related calculators match the SPEC "Related:" line and exist`, () => {
    const page = EMERGENCIES.find(p => p.id === spec.id);
    assert.equal(page.related.length, spec.related.length);
    for (const id of page.related) assert.ok(findItem(id), `${id} not found`);
  });
}

test("related calculator buttons map each SPEC name to the right calculator", () => {
  const pairs = EMERGENCIES.flatMap(p => p.related.map((id, i) => [PAGES.find(s => s.id === p.id).related[i], id]));
  const expected = {
    GBS: "gbs", AIMS65: "aims65", Rockall: "rockall", Forrest: "forrest", "Child-Pugh": "child_pugh", "MELD 3.0": "meld3",
    "West Haven": "west_haven", Oakland: "oakland", "Truelove and Witts": "truelove_witts", "Day-3 Oxford": "asuc_day3",
    UCEIS: "uceis", Mayo: "mayo_uc", "King's College criteria": "kings", MELD: "meld_na", Maddrey: "maddrey", GAHS: "gahs",
    ABIC: "abic", Lille: "lille", "Ascitic fluid analysis": "ascites", "ACLF grade": "aclf", BISAP: "bisap", Ranson: "ranson",
    "Glasgow-Imrie": "glasgow_imrie", SIRS: "sirs", Marshall: "marshall", "Revised Atlanta": "atlanta", "modified CTSI": "mctsi",
    "TG18 cholangitis": "tg18_cholangitis", "ASGE choledocholithiasis risk": "asge_cbd", Zargar: "zargar"
  };
  for (const [name, id] of pairs) assert.equal(id, expected[name], name);
});

test("every SPEC cross-reference in page text links to an existing item", () => {
  const refs = new Set();
  for (const p of EMERGENCIES) for (const b of p.blocks) {
    const texts = b.type === "table" ? [...b.columns, ...b.rows.flat()] : [b.text];
    for (const t of texts) for (const tok of tokenize(t)) if (tok.type === "ref") refs.add(tok.spec);
  }
  assert.ok(refs.size > 0);
  for (const r of refs) assert.ok(SPEC_REFS[r] && findItem(SPEC_REFS[r]), `${r} has no link target`);
});

test("inline markdown links in page text are parsed as links", () => {
  const toks = tokenize("Restrictive transfusion ([ESGE 2022](https://pubmed.ncbi.nlm.nih.gov/36174643)). GBS (B2.1).");
  assert.deepEqual(toks.filter(t => t.type !== "text"), [
    { type: "url", label: "ESGE 2022", url: "https://pubmed.ncbi.nlm.nih.gov/36174643" },
    { type: "ref", spec: "B2.1", target: "gbs" }]);
});

test("prescribing footer is the SPEC B7 text", () => {
  assert.ok(SPEC.includes(`show the footer "${PRESCRIBING_FOOTER}"`));
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
