// Independent parsers of SPEC.md Part B7 (emergency pages) and the B8.7 and B8.8 vectors.
// Tests compare the content files in content/emergencies/ with what these parsers read from SPEC.md.
import { readFileSync } from "node:fs";

export const SPEC = readFileSync(new URL("../SPEC.md", import.meta.url), "utf8");

// SPEC calculator names (in "Calculators:" and "Related:" lines) mapped to calculator ids.
export const CALC_NAMES = {
  GBS: "gbs", AIMS65: "aims65", Rockall: "rockall", Forrest: "forrest", "Child-Pugh": "child_pugh", "MELD 3.0": "meld3",
  "West Haven": "west_haven", Oakland: "oakland", "Truelove and Witts": "truelove_witts", "Day-3 Oxford": "asuc_day3",
  UCEIS: "uceis", Mayo: "mayo_uc", "King's College criteria": "kings", MELD: "meld_na", Maddrey: "maddrey", GAHS: "gahs",
  ABIC: "abic", Lille: "lille", "Ascitic fluid analysis": "ascites", "ACLF grade": "aclf", BISAP: "bisap", Ranson: "ranson",
  "Glasgow-Imrie": "glasgow_imrie", SIRS: "sirs", Marshall: "marshall", "Revised Atlanta": "atlanta", "modified CTSI": "mctsi",
  "TG18 cholangitis": "tg18_cholangitis", "ASGE choledocholithiasis risk": "asge_cbd", Zargar: "zargar", "Jalan criteria": "jalan", "CLIF-C ACLF": "clif_c_aclf"
};

export function section(num) {
  const start = SPEC.indexOf(`### ${num} `);
  if (start < 0) throw new Error(`SPEC section ${num} not found`);
  const rest = SPEC.slice(start);
  const heading = rest.slice(0, rest.indexOf("\n"));
  const end = rest.slice(4).search(/\n#{2,3} /) + 4;
  return { heading, body: rest.slice(heading.length + 1, end) };
}

function headingInfo(heading) {
  const hm = heading.match(/^### (B7\.\d+) (.+?) \(id: (.+)\)$/);
  return { num: hm[1], name: hm[2], id: hm[3].replace(/\\_/g, "_") };
}

export const cells = line => line.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());

export function isAlgorithm(num) {
  return /^Bedside algorithm \(B7\.0\)\./m.test(section(num).body);
}

// Classic template page: sections, tables, notes and sources.
export function parseClassic(num) {
  const { heading, body } = section(num);
  const blocks = [];
  let related = [];
  let table = null;
  for (const line of body.split("\n")) {
    if (!line.startsWith("|")) table = null;
    let m;
    if (!line.trim()) continue;
    if ((m = line.match(/^- \*\*(.+?):\*\* (.*)$/))) blocks.push({ type: "section", title: m[1], text: m[2] });
    else if (line.startsWith("|")) {
      const c = cells(line);
      if (c.every(x => /^-+$/.test(x))) continue;
      if (!table) { table = { type: "table", columns: c, rows: [] }; blocks.push(table); } else table.rows.push(c);
    }
    else if ((m = line.match(/^Show: "(.*)"$/))) blocks.push({ type: "note", text: m[1] });
    else if ((m = line.match(/^Sources?: (.*)$/))) blocks.push({ type: "source", text: m[1] });
    else if ((m = line.match(/^Related: (.*)\.$/))) related = m[1].split(",").map(s => s.trim());
    else throw new Error(`unparsed SPEC line in ${num}: ${line}`);
  }
  return { ...headingInfo(heading), blocks, related };
}

// Dose names used in "Weight-based:" lines, from the B7.0 table.
export function weightTable() {
  const { body } = section("B7.0");
  const lines = body.split("\n");
  const start = lines.findIndex(l => l.startsWith("|") && cells(l)[0] === "Name");
  const end = lines.findIndex((l, i) => i > start && !l.startsWith("|"));
  return lines.slice(start + 2, end < 0 ? undefined : end).map(l => {
    const [name, where, calculation, shownAs] = cells(l);
    const i = where.indexOf(", ");
    const [page, row] = [where.slice(0, i), where.slice(i + 2)];
    return { name, page, row, calculation, shownAs };
  });
}

// Bedside algorithm page (B7.0 format). Returns the same block model as content/emergencies/<id>.js,
// with calculator names and dose names still as written in SPEC (`calcNames`, `doseNames`).
export function parseAlgorithm(num) {
  const { heading, body } = section(num);
  const page = { ...headingInfo(heading), kind: "algorithm", weight: null, entries: {}, entryWords: {}, blocks: [], related: [] };
  let table = null, tableTitle = null, current = null;
  for (const line of body.split("\n")) {
    if (!line.startsWith("|")) table = null;
    if (!line.trim()) continue;
    let m;
    if ((m = line.match(/^Bedside algorithm \(B7\.0\)\. Weight field: (yes|no)\.$/))) { page.weight = m[1] === "yes"; continue; }
    if ((m = line.match(/^Entry point (\w+): (.+?) \(.*\)\.$/))) { page.entries[m[1]] = parseAnswers(m[2]); continue; }
    if ((m = line.match(/^Search words that open the (\w+) pathway: (.*)\.$/))) { page.entryWords[m[1]] = m[2].split(", "); continue; }
    if (line === "Algorithm:") { current = null; continue; }
    if ((m = line.match(/^Sources?: (.*)$/))) { page.blocks.push({ type: "source", text: m[1] }); current = null; continue; }
    if ((m = line.match(/^Show: "(.*)"$/))) { page.blocks.push({ type: "note", text: m[1] }); current = null; continue; }
    if ((m = line.match(/^Related: (.*)\.$/))) { page.related = m[1].split(",").map(s => s.trim()); continue; }
    if ((m = line.match(/^\*\*(.+)\*\*$/))) { tableTitle = m[1]; continue; }
    if (line.startsWith("|")) {
      const c = cells(line);
      if (c.every(x => /^-+$/.test(x))) continue;
      if (!table) {
        table = { type: "table", columns: c, rows: [] };
        if (tableTitle) { table.title = tableTitle; tableTitle = null; }
        page.blocks.push(table);
      } else table.rows.push(c);
      continue;
    }
    if ((m = line.match(/^- \*\*(\w+) · (.+?) · (.+?)\*\*(?: \(shown when (.+)\))?$/))) {
      current = { type: "step", id: m[1], chip: m[2], title: m[3], when: m[4] ? parseAnswers(m[4], true) : [],
        items: [], calcNames: [], doseNames: [], why: [] };
      page.blocks.push(current);
      continue;
    }
    if ((m = line.match(/^- \*\*(.+?):\*\* (.*)$/))) {
      current = { type: m[1] === "Red flags" ? "redflags" : "section", title: m[1], text: m[2] };
      page.blocks.push(current);
      continue;
    }
    if ((m = line.match(/^ {2}- (.*)$/))) {
      if (!current) throw new Error(`indented line without a block in ${num}: ${line}`);
      const t = m[1];
      let n;
      if ((n = t.match(/^Calculators: (.*)\.$/))) current.calcNames = n[1].split(", ");
      else if ((n = t.match(/^Weight-based: (.*)\.$/))) current.doseNames = n[1].split(", ");
      else if ((n = t.match(/^Why: (.*)$/))) { if (Array.isArray(current.why)) current.why.push(n[1]); else current.why = n[1]; }
      else if ((n = t.match(/^Answer (.+?): (.*)$/))) {
        current.type = "decision";
        (current.options ||= []).push({ value: n[1], text: n[2] });
      }
      else if (current.items) current.items.push(t);
      else throw new Error(`unexpected indented line in ${num}: ${line}`);
      continue;
    }
    throw new Error(`unparsed SPEC line in ${num}: ${line}`);
  }
  return page;
}

// "D1 = Yes; D2 = No" -> [["D1", "Yes"], ["D2", "No"]] (or an object when asObject).
function parseAnswers(s, asPairs = false) {
  const pairs = s.split("; ").map(p => { const i = p.indexOf(" = "); return [p.slice(0, i), p.slice(i + 3)]; });
  return asPairs ? pairs : Object.fromEntries(pairs);
}

// B8.7 rows: { name, weight, shown } (shown null when "not calculated").
export function doseVectors() {
  const { body } = section("B8.7");
  return body.split("\n").filter(l => l.startsWith("|")).slice(2).map(l => {
    const [name, weight, shown] = cells(l);
    return { name, weight: Number(weight), shown: shown === "not calculated" ? null : shown };
  });
}

// B8.8 rows: path vectors and full-view marks.
export function pathVectors() {
  const { body } = section("B8.8");
  const tables = body.split("\n\n").map(p => p.split("\n").filter(l => l.startsWith("|"))).filter(t => t.length);
  const list = s => s === "none" ? [] : s.split(", ");
  const answers = s => {
    if (s === "none") return { answers: {} };
    const e = s.match(/^entry point (\w+)$/);
    if (e) return { entry: e[1] };
    return { answers: parseAnswers(s) };
  };
  const shown = tables[0].slice(2).map(l => { const c = cells(l); return { page: c[0].replace(/\\_/g, "_"), ...answers(c[1]), shown: list(c[2]) }; });
  const marks = tables[1].slice(2).map(l => { const c = cells(l); return { page: c[0].replace(/\\_/g, "_"), ...answers(c[1]), on: list(c[2]), off: list(c[3]), pending: list(c[4]) }; });
  return { shown, marks };
}

// B8.9 rows: { page, decision, calc (SPEC name), inputs (text), suggested: [values], notes: [text] }.
export function suggestionVectors() {
  const { body } = section("B8.9");
  return body.split("\n").filter(l => l.startsWith("|")).slice(2).map(l => {
    const [page, decision, calc, inputs, suggested, note] = cells(l);
    return { page: page.replace(/\\_/g, "_"), decision, calc, inputs, suggested: suggested === "none" ? [] : suggested.split("; "),
      notes: !note || note === "none" ? [] : [note] };
  });
}
