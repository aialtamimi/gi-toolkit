// The twelve pages converted to bedside algorithms in version 0.7.0 keep every line, dose and source of
// their classic pages. tests/fixtures/b7_classic_0.6.2.md holds the classic SPEC text; every clause,
// table row, source line, note and related calculator in it must still be on the new page.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EMERGENCIES } from "../js/registry.js";
import { pageText } from "../js/algorithm.js";
import { CALC_NAMES, cells } from "./spec_b7.js";

const FIXTURE = readFileSync(new URL("./fixtures/b7_classic_0.6.2.md", import.meta.url), "utf8");
const SECTIONS = FIXTURE.split(/\n(?=### B7\.)/).filter(s => s.startsWith("### B7."));

// Clauses the new page words differently on purpose, mapped to the new wording (none: every clause is kept verbatim).
const REWORDED = {};

// Table rows changed later by a clinical owner decision: the row must still exist (same first cell) and its new
// text must contain the listed phrase.
const OWNER_CHANGED_ROWS = {
  em_hrs: { Terlipressin: "Preferably continuous infusion, starting 2–3 mg/24 hours (Baveno VIII)" }  // version 0.9.0
};

const norm = s => s.toLowerCase().replace(/\s+/g, " ").trim();

function clauses(text) {
  return text.split(/; |\. (?=[A-Z(])/).map(c => c.replace(/[.\s]+$/, "").trim()).filter(c => c.length > 2);
}

test("the fixture holds the twelve classic pages", () => {
  assert.equal(SECTIONS.length, 12);
});

for (const sec of SECTIONS) {
  const head = sec.match(/^### (B7\.\d+) (.+?) \(id: (.+)\)$/m);
  const id = head[3].replace(/\\_/g, "_");
  test(`${id} (${head[1]}): every classic clause, table row, source, note and related calculator is kept`, () => {
    const page = EMERGENCIES.find(p => p.id === id);
    assert.equal(page.kind, "algorithm");
    const text = norm(pageText(page));
    const tables = page.blocks.filter(b => b.type === "table");
    const missing = [];
    for (const line of sec.split("\n").slice(1)) {
      let m;
      if (!line.trim()) continue;
      if ((m = line.match(/^- \*\*(.+?):\*\* (.*)$/))) {
        for (const c of clauses(m[2])) {
          const want = REWORDED[c] || c;
          if (!text.includes(norm(want))) missing.push(`${m[1]}: ${c}`);
        }
      } else if (line.startsWith("|")) {
        const row = cells(line);
        if (row.every(x => /^-+$/.test(x))) continue;
        const changed = (OWNER_CHANGED_ROWS[id] || {})[row[0]];
        if (changed) {
          if (!tables.some(t => t.rows.some(r => r[0] === row[0] && r.join(" | ").includes(changed)))) missing.push(`changed row: ${row[0]}`);
          continue;
        }
        const found = tables.some(t => JSON.stringify(t.columns) === JSON.stringify(row) || t.rows.some(r => JSON.stringify(r) === JSON.stringify(row)));
        if (!found) missing.push(`table row: ${row.join(" | ")}`);
      } else if ((m = line.match(/^Sources?: (.*)$/))) {
        if (!page.blocks.some(b => b.type === "source" && b.text === m[1])) missing.push(`source: ${m[1]}`);
      } else if ((m = line.match(/^Show: "(.*)"$/))) {
        if (!page.blocks.some(b => b.type === "note" && b.text === m[1])) missing.push(`note: ${m[1]}`);
      } else if ((m = line.match(/^Related: (.*)\.$/))) {
        for (const n of m[1].split(", ")) if (!page.related.includes(CALC_NAMES[n])) missing.push(`related: ${n}`);
      } else {
        missing.push(`unparsed fixture line: ${line}`);
      }
    }
    assert.deepEqual(missing, []);
  });
}

test("the classic pages' sources are all still cited", () => {
  const old = {
    em_lgib: ["Sengupta N"], em_antithrombotic: ["Abraham NS", "Sengupta N", "Sung JJ"], em_toxic_megacolon: ["Jalan KN"],
    em_alf: ["Lee WM, Stravitz RT", "Lee WM et al."], em_aah: ["Thursz MR", "Louvet A"], em_hrs: ["Nadim MK"],
    em_he: ["Vilstrup H", "Bass NM", "Rahimi RS"], em_foreign_body: ["Birk M"], em_caustic: ["Zargar SA"],
    em_acpo: ["Naveed M"], em_volvulus: ["Naveed M"], em_perforation: ["Paspatis GA"]
  };
  for (const [id, authors] of Object.entries(old)) {
    const refs = EMERGENCIES.find(p => p.id === id).references;
    for (const a of authors) assert.ok(refs.some(r => r.citation.startsWith(a)), `${id}: ${a}`);
  }
});
