// SPEC.md B6 reference cards: B8.6 vectors, and every table and clinical-use line checked against SPEC.md.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CARDS, search, hrefFor } from "../js/registry.js";
import bbps, { INADEQUATE_ACTION } from "../content/cards/bbps.js";
import prague, { intervalRow, DYSPLASIA_NOTE } from "../content/cards/prague.js";
import nice, { SPEC_TABLE } from "../content/cards/nice.js";
import { calc } from "./helpers.js";

const SPEC = readFileSync(new URL("../SPEC.md", import.meta.url), "utf8");

// Returns the text of SPEC section "### B6.n ..." up to the next heading.
function section(num) {
  const start = SPEC.indexOf(`### ${num} `);
  assert.ok(start >= 0, num);
  const rest = SPEC.slice(start);
  const end = rest.slice(4).search(/\n#{2,3} /);
  return rest.slice(0, end + 4);
}
// All markdown tables in a section: [{ columns, rows }].
function tables(text) {
  const out = [];
  let cur = null;
  for (const line of text.split("\n")) {
    if (!line.startsWith("|")) { cur = null; continue; }
    const cells = line.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());
    if (cells.every(c => /^-+$/.test(c))) continue;
    if (!cur) { cur = { columns: cells, rows: [] }; out.push(cur); } else cur.rows.push(cells);
  }
  return out;
}

// ---------- B8.6 vectors ----------

test("BBPS: right 2, transverse 3, left 2 → 7, adequate", () => {
  const { result, interp } = calc(bbps, { right: 2, transverse: 3, left: 2 });
  assert.equal(result.score, 7);
  assert.equal(interp.band, "Adequate");
  assert.equal(interp.action, undefined);
});

test("BBPS: right 3, transverse 3, left 1 → 7, inadequate (a segment <2)", () => {
  const { result, interp } = calc(bbps, { right: 3, transverse: 3, left: 1 });
  assert.equal(result.score, 7);
  assert.equal(interp.band, "Inadequate (a segment <2)");
  assert.equal(interp.action, "Repeat colonoscopy within 1 year (US Multi-Society Task Force).");
  assert.equal(INADEQUATE_ACTION, interp.action);
});

test("BBPS: a total below 6 is reported as total <6; 2, 2, 2 is adequate", () => {
  assert.equal(calc(bbps, { right: 2, transverse: 2, left: 1 }).interp.band, "Inadequate (total <6)");
  assert.equal(calc(bbps, { right: 2, transverse: 2, left: 2 }).interp.band, "Adequate");
});

test('Prague: C 2 cm, M 5 cm → "C2M5"; surveillance every 3 years (ACG and ESGE)', () => {
  const { result, interp } = calc(prague, { c: 2, m: 5 });
  assert.equal(result.code, "C2M5");
  assert.equal(interp.band, "Surveillance: every 3 years (ACG and ESGE)");
  assert.ok(interp.notes.includes(DYSPLASIA_NOTE));
});

test("Prague: surveillance bands by maximum extent", () => {
  assert.deepEqual(intervalRow(0.9), ["<1 cm", "Not addressed", "No routine biopsy or surveillance"]);
  assert.deepEqual(intervalRow(1), ["1 to <3 cm", "Every 5 years", "Every 5 years"]);
  assert.deepEqual(intervalRow(2.9), ["1 to <3 cm", "Every 5 years", "Every 5 years"]);
  assert.deepEqual(intervalRow(3), ["3 to <10 cm", "Every 3 years", "Every 3 years"]);
  assert.deepEqual(intervalRow(10), ["≥10 cm", "Every 3 years", "Refer to a Barrett's expert center"]);
  assert.match(calc(prague, { c: 10, m: 12 }).interp.band, /ESGE refer to a barrett's expert center/);
});

test("Prague: C greater than M is flagged, not interpreted", () => {
  const { result, interp } = calc(prague, { c: 6, m: 5 });
  assert.equal(result.invalid, true);
  assert.equal(interp.band, "C cannot be greater than M");
});

// ---------- every card against SPEC.md ----------

const SPEC_NUM = { bbps: "B6.1", la_grade: "B6.2", prague: "B6.3", paris: "B6.4", nice: "B6.5", zargar: "B6.6", bristol: "B6.7", lyon2: "B6.8" };

test("all eight B6 cards are registered in SPEC order", () => {
  assert.deepEqual(CARDS.map(c => c.id), Object.keys(SPEC_NUM));
  for (const c of CARDS) {
    assert.equal(c.spec, SPEC_NUM[c.id]);
    assert.equal(c.category, "endoscopy");
    assert.ok(section(c.spec).includes(`(id: ${c.id.replace(/_/g, "\\_")}`), `${c.id} id in SPEC heading`);
    assert.equal(hrefFor(c.id), `#/card/${c.id}`);
    assert.ok(c.use && c.references.length);
  }
});

for (const c of CARDS) {
  test(`${c.id}: table matches SPEC.md ${c.spec} cell for cell`, () => {
    const specTable = tables(section(c.spec))[0];
    if (c.id === "nice") {
      assert.deepEqual(SPEC_TABLE, specTable);
      // The card shows the same cells transposed (one row per type).
      for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) assert.equal(c.table.rows[i][j + 1], specTable.rows[j][i + 1]);
    } else {
      assert.deepEqual(c.table, specTable);
    }
  });
}

test("table cards: clinical use and notes are SPEC text", () => {
  const exact = {
    la_grade: "Clinical use: grades B, C and D are conclusive evidence of GERD (Lyon 2.0); grade A is not conclusive.",
    zargar: "Clinical use: grades 0–2a usually allow early oral intake and discharge; grade 2b or higher carries high stricture risk; grade 3b carries the highest risk of complications and death.",
    bristol: "Used in Rome IV IBS subtyping."
  };
  for (const c of CARDS.filter(c => c.kind === "card")) {
    const text = section(c.spec);
    if (exact[c.id]) assert.equal(c.use, exact[c.id]);
    assert.ok(text.includes(c.use), `${c.id} use line not in SPEC`);
    for (const n of c.notes || []) assert.ok(text.includes(n), `${c.id} note not in SPEC`);
  }
});

test("table cards copy 'Classification: grade'", () => {
  const copies = Object.fromEntries(CARDS.filter(c => c.kind === "card").map(c => [c.id, c.copy(c.table.rows[2])]));
  assert.deepEqual(copies, {
    la_grade: "LA classification: grade C", paris: "Paris: 0-Is", nice: "NICE: Type 3", zargar: "Zargar: grade 2a",
    bristol: "Bristol stool form: type 3", lyon2: "Lyon 2.0: Against GERD"
  });
});

test("Zargar links to the caustic ingestion emergency page", () => {
  const z = CARDS.find(c => c.id === "zargar");
  assert.ok(z.links.some(l => l.target === "em_caustic"));
});

test("every card is reachable from search by name and short name", () => {
  for (const c of CARDS) {
    assert.ok(search(c.name).includes(c), c.name);
    assert.ok(search(c.short).includes(c), c.short);
  }
});
