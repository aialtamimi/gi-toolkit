// SPEC.md B6 reference cards: B8.6 vectors, and every table and clinical-use line checked against SPEC.md.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CARDS, EMERGENCIES, search, hrefFor, findItem } from "../js/registry.js";
import bbps, { INADEQUATE_ACTION } from "../content/cards/bbps.js";
import prague, { intervalRow, DYSPLASIA_NOTE } from "../content/cards/prague.js";
import nice, { SPEC_TABLE } from "../content/cards/nice.js";
import erefs, { MINOR_NOTE, USE_NOTE, CUTOFF_NOTE } from "../content/cards/erefs.js";
import spigelman, { SURVEILLANCE, AMPULLA_NOTE } from "../content/cards/spigelman.js";
import olga, { GRADES, MATRIX, HIGH_ACTION, LOW_ACTION } from "../content/cards/olga.js";
import { SPEC_REFS } from "../js/pages.js";
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

const SPEC_NUM = { bbps: "B6.1", la_grade: "B6.2", prague: "B6.3", paris: "B6.4", nice: "B6.5", zargar: "B6.6", bristol: "B6.7", lyon2: "B6.8",
  erefs: "B6.9", sydney_dmi: "B6.10", jnet: "B6.11", kudo: "B6.12", haggitt_kikuchi: "B6.13", sarin: "B6.14", hill: "B6.15", siewert: "B6.16",
  spigelman: "B6.17", olga: "B6.18", marsh: "B6.19", goligher: "B6.20", bismuth_corlette: "B6.21", strasberg: "B6.22" };
const CALCULATOR_CARDS = ["bbps", "prague", "erefs", "spigelman", "olga"];

test("all 22 B6 cards are registered in SPEC order; five are calculators", () => {
  assert.equal(CARDS.length, 22);
  assert.deepEqual(CARDS.filter(c => c.inputs).map(c => c.id), CALCULATOR_CARDS);
  for (const c of CARDS) assert.equal(/; calculator\)$/.test(section(c.spec).split("\n")[0]), CALCULATOR_CARDS.includes(c.id), c.id);
  assert.deepEqual(CARDS.map(c => c.id), Object.keys(SPEC_NUM));
  for (const c of CARDS) {
    assert.equal(c.spec, SPEC_NUM[c.id]);
    const cat = section(c.spec).match(/^Category: (.+?)\.$/m);
    assert.equal(c.category, { Motility: "motility", "GI bleeding": "bleeding", "Pancreas and biliary": "pancreas" }[cat?.[1]] || "endoscopy", c.id);
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
    bristol: "Bristol stool form: type 3", lyon2: "Lyon 2.0: Against GERD",
    sydney_dmi: "Sydney deep mural injury: type II", jnet: "JNET: Type 2B", kudo: "Kudo pit pattern: IIIS",
    haggitt_kikuchi: "Malignant polyp: Haggitt 2", sarin: "Sarin: IGV1", hill: "Hill grade III", siewert: "Siewert type III",
    marsh: "Marsh-Oberhuber: 2", goligher: "Goligher grade III", bismuth_corlette: "Bismuth-Corlette type IIIa", strasberg: "Strasberg type C"
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

// ---------- cards added in 0.10.0 (B6.9 to B6.22) ----------

const NEW_CARDS = CARDS.filter(c => Number(c.spec.split(".")[1]) >= 9);

test("B6.9 to B6.22: every reference is an exact PubMed link, and the PMIDs match SPEC.md", () => {
  assert.equal(NEW_CARDS.length, 14);
  for (const c of NEW_CARDS) {
    const specPmids = [...section(c.spec).matchAll(/\(PMID (\d+)\)\]\(https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)\/\)/g)].map(m => {
      assert.equal(m[1], m[2], `${c.id}: PMID and link differ in SPEC`);
      return m[1];
    });
    assert.ok(specPmids.length, `${c.id}: no PubMed source in SPEC`);
    const pmids = c.references.map(r => {
      const m = r.url.match(/^https:\/\/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)\/$/);
      assert.ok(m, `${c.id}: ${r.url} is not an exact PubMed link`);
      assert.ok(r.citation.endsWith(`PMID ${m[1]}`), `${c.id}: citation does not end with its PMID`);
      return m[1];
    });
    assert.deepEqual(pmids, specPmids, c.id);
  }
});

test("B6.9 to B6.22: every search alias finds its card", () => {
  for (const c of NEW_CARDS) {
    assert.ok(c.aliases.length >= 4, c.id);
    for (const a of c.aliases) assert.ok(search(a).includes(c), `${c.id}: "${a}"`);
  }
  const top = q => search(q)[0].id;
  assert.equal(top("EoE"), "erefs");
  assert.equal(top("deep mural injury"), "sydney_dmi");
  assert.equal(top("pit pattern"), "kudo");
  assert.equal(top("malignant polyp"), "haggitt_kikuchi");
  assert.equal(top("GOV2"), "sarin");
  assert.equal(top("flap valve"), "hill");
  assert.equal(top("FAP"), "spigelman");
  assert.equal(top("OLGIM"), "olga");
  assert.equal(top("celiac disease"), "marsh");
  assert.equal(top("hemorrhoids"), "goligher");
  assert.equal(top("Klatskin tumor"), "bismuth_corlette");
  assert.equal(top("bile duct injury"), "strasberg");
  assert.equal(top("LST"), "paris");
});

test("table cards: SPEC 'Links:' lines are the card links, and every link opens an existing item", () => {
  for (const c of CARDS.filter(c => c.kind === "card" && Number(c.spec.split(".")[1]) >= 9)) {
    const m = section(c.spec).match(/Links: (.+?)\.?$/m);
    const specLinks = m ? [...m[1].matchAll(/([^,(]+?) \(([a-z0-9_\\]+)(?:, entry point (\w+))?\)/g)]
      .map(x => ({ label: x[1].trim(), target: x[2].replace(/\\_/g, "_"), ...(x[3] ? { entry: x[3] } : {}) })) : [];
    assert.deepEqual(c.links || [], specLinks, c.id);
  }
  for (const c of CARDS) for (const l of c.links || []) {
    assert.ok(findItem(l.target), `${c.id} → ${l.target}`);
    if (l.entry) assert.ok(findItem(l.target).entries[l.entry], `${c.id} → ${l.target}/${l.entry}`);
  }
  const targets = id => CARDS.find(c => c.id === id).links.map(l => l.target);
  assert.deepEqual(targets("sydney_dmi"), ["em_perforation"]);
  assert.deepEqual(targets("jnet"), ["nice", "kudo"]);
  assert.deepEqual(targets("sarin"), ["em_ugib"]);
  assert.deepEqual(targets("hill"), ["lyon2"]);
});

test("Sarin opens the upper GI bleeding page at D4 'Bleeding source?' with the variceal pathway chosen", () => {
  const sarin = CARDS.find(c => c.id === "sarin");
  assert.deepEqual(sarin.links, [{ label: "Bleeding source decision", target: "em_ugib", entry: "source" }]);
  const ugib = EMERGENCIES.find(p => p.id === "em_ugib");
  assert.deepEqual(ugib.entries.source, { D1: "Yes" });
  assert.deepEqual(ugib.entryFocus, { source: "D4" });
  assert.equal(ugib.blocks.find(b => b.id === "D4").title, "Bleeding source?");
  assert.equal(`${hrefFor("em_ugib")}/source`, "#/emergency/em_ugib/source");
});

test("perforation page links to the Sydney card (P3 and Related); the UGIB bleeding-source decision cites Sarin", () => {
  const perf = EMERGENCIES.find(p => p.id === "em_perforation");
  assert.deepEqual(perf.related, ["sydney_dmi"]);
  const p3 = perf.blocks.find(b => b.id === "P3");
  assert.ok(p3.items.includes("After colonic EMR: deep mural injury by the Sydney classification (B6.10)."));
  const ugib = EMERGENCIES.find(p => p.id === "em_ugib");
  const d4 = ugib.blocks.find(b => b.id === "D4");
  assert.ok(d4.items.includes("OV: esophageal varices; GOV: gastroesophageal varices; IGV: isolated gastric varices (Sarin, B6.14)."));
  assert.equal(SPEC_REFS["B6.10"], "sydney_dmi");
  assert.equal(SPEC_REFS["B6.14"], "sarin");
});

test("Paris: mixed types and LST rows, and the en bloc note", () => {
  const paris = CARDS.find(c => c.id === "paris");
  assert.deepEqual(paris.table.rows.slice(7).map(r => r[0]),
    ["Mixed types", "LST-G homogeneous", "LST-G nodular mixed", "LST-NG flat elevated", "LST-NG pseudodepressed"]);
  assert.deepEqual(paris.notes, ["LST-NG pseudodepressed and LST-G nodular mixed carry the highest risk of submucosal invasion: en bloc resection."]);
  assert.equal(paris.copy(paris.table.rows[11]), "Paris: LST-NG pseudodepressed");
});

test("BBPS: note on the screen is SPEC text", () => {
  assert.equal(bbps.notes, "Total 0–9. Adequate preparation: 2 or more in every segment (total 6 or more). Inadequate: repeat colonoscopy within 1 year.");
  assert.ok(section("B6.1").includes(`Note shown on the screen: "${bbps.notes}"`));
});

// B8.6 vectors for the new calculator cards

const erefsInput = (p, d) => Object.fromEntries(["edema", "rings", "exudates", "furrows", "stricture"]
  .flatMap((f, i) => [[`p_${f}`, p[i]], [`d_${f}`, d[i]]]));

test("EREFS: proximal 1,1,0,1,0 and distal 1,2,1,2,0 → proximal 3, distal 6, total 9", () => {
  const { result, interp } = calc(erefs, erefsInput([1, 1, 0, 1, 0], [1, 2, 1, 2, 0]));
  assert.deepEqual([result.proximal, result.distal, result.score], [3, 6, 9]);
  assert.equal(interp.band, "Proximal 3, distal 6, total 9");
  assert.equal(result.breakdown.length, 10);
  assert.deepEqual(interp.notes, [MINOR_NOTE, USE_NOTE, CUTOFF_NOTE]);
  for (const n of interp.notes) assert.ok(section("B6.9").includes(`Note: "${n}"`));
  assert.equal(interp.action, undefined);
});

test("EREFS: every feature at its maximum → 9, 9, 18; every feature 0 → 0, 0, 0", () => {
  const max = calc(erefs, erefsInput([1, 3, 2, 2, 1], [1, 3, 2, 2, 1])).result;
  assert.deepEqual([max.proximal, max.distal, max.score], [9, 9, 18]);
  const zero = calc(erefs, erefsInput([0, 0, 0, 0, 0], [0, 0, 0, 0, 0])).result;
  assert.deepEqual([zero.proximal, zero.distal, zero.score], [0, 0, 0]);
});

test("EREFS: input options are the SPEC grades", () => {
  const spec = Object.fromEntries(erefs.table.rows);
  for (const inp of erefs.inputs.filter(i => i.id)) {
    const feature = inp.label;
    const grades = spec[feature].split("; ");
    assert.deepEqual(inp.options.map(o => o.value), grades.map((_, i) => i), inp.id);
    grades.forEach((g, i) => assert.equal(g.replace(/^\d+ /, "").toLowerCase(), inp.options[i].label.replace(/^\d+: /, "").toLowerCase(), inp.id));
  }
});

const SPIG = { "1–4": 1, "5–20": 2, ">20": 3 };
const spig = (n, size, hist, dys) => calc(spigelman, { number: SPIG[n], size: { "1–4 mm": 1, "5–10 mm": 2, ">10 mm": 3 }[size],
  histology: { tubular: 1, tubulovillous: 2, villous: 3 }[hist], dysplasia: { low: 1, high: 3 }[dys] });

test("Spigelman: B8.6 vectors", () => {
  const none = calc(spigelman, { number: 0 });
  assert.equal(none.interp.band, "Stage 0");
  assert.equal(none.interp.action, "Surveillance (ACG 2015): Every 4 years.");
  const cases = [
    [["1–4", "1–4 mm", "tubular", "low"], 4, "I", "Every 2–3 years"],
    [["5–20", "5–10 mm", "tubular", "low"], 6, "II", "Every 1–3 years"],
    [["5–20", "5–10 mm", "tubulovillous", "low"], 7, "III", "Every 6–12 months"],
    [["5–20", "1–4 mm", "tubular", "high"], 7, "III", "Every 6–12 months"],
    [[">20", ">10 mm", "villous", "high"], 12, "IV", "Expert surveillance every 3–6 months and surgical evaluation"],
    [[">20", "5–10 mm", "tubulovillous", "low"], 8, "III", "Every 6–12 months"],
    [[">20", ">10 mm", "tubulovillous", "low"], 9, "IV", "Expert surveillance every 3–6 months and surgical evaluation"]
  ];
  for (const [args, points, stage, interval] of cases) {
    const { result, interp } = spig(...args);
    assert.equal(result.score, points, args.join(", "));
    assert.equal(interp.band, `Stage ${stage}`, args.join(", "));
    assert.equal(interp.action, `Surveillance (ACG 2015): ${interval}.`);
    assert.deepEqual(interp.notes, [AMPULLA_NOTE]);
  }
});

test("Spigelman: no polyps hides the other items; stage table and note are SPEC text", () => {
  const out = calc(spigelman, { number: 0 });
  assert.deepEqual(out.missing, []);
  assert.deepEqual(tables(section("B6.17"))[1].rows, Object.entries(SURVEILLANCE).sort((a, b) => (a[0] === "0" ? -1 : b[0] === "0" ? 1 : 0)));
  assert.ok(section("B6.17").includes(`Note: "${AMPULLA_NOTE}"`));
  assert.ok(section("B6.17").includes(spigelman.use));
});

test("OLGA and OLGIM: B8.6 vectors", () => {
  const run = (system, antrum, corpus) => calc(olga, { system, antrum, corpus });
  let o = run("olga", "moderate", "mild");
  assert.equal(o.result.display, "OLGA stage II"); assert.equal(o.interp.band, "Lower risk (stage 0–II)"); assert.equal(o.interp.action, LOW_ACTION);
  o = run("olga", "mild", "severe");
  assert.equal(o.result.display, "OLGA stage III"); assert.equal(o.interp.band, "High risk (stage III–IV)"); assert.equal(o.interp.action, HIGH_ACTION);
  o = run("olgim", "severe", "moderate");
  assert.equal(o.result.display, "OLGIM stage IV"); assert.equal(o.interp.band, "High risk (stage III–IV)");
  o = run("olga", "none", "none");
  assert.equal(o.result.display, "OLGA stage 0"); assert.equal(o.interp.band, "Lower risk (stage 0–II)");
});

test("OLGA and OLGIM: every matrix cell gives the stage in the SPEC.md B6.18 matrix", () => {
  const m = tables(section("B6.18"))[0];
  assert.equal(m.rows.length, 4);
  for (const system of ["olga", "olgim"]) GRADES.forEach((antrum, i) => GRADES.forEach((corpus, j) => {
    const { result, interp } = calc(olga, { system, antrum, corpus });
    assert.equal(result.stage, m.rows[i][j + 1], `${system} ${antrum}/${corpus}`);
    assert.equal(result.stage, MATRIX[i][j]);
    assert.equal(interp.band, ["III", "IV"].includes(result.stage) ? "High risk (stage III–IV)" : "Lower risk (stage 0–II)");
  }));
  for (const a of [HIGH_ACTION, LOW_ACTION, "High risk (stage III–IV)", "Lower risk (stage 0–II)"]) assert.ok(section("B6.18").includes(`"${a}"`));
});

test("clinical owner decisions on PR 16 are on the cards word for word", () => {
  const card = id => CARDS.find(c => c.id === id);
  const row = (id, first) => card(id).table.rows.find(r => r[0] === first);
  assert.equal(row("sydney_dmi", "II")[2], "Clip closure (muscle injury cannot be excluded)");
  assert.equal(row("erefs", "Exudates")[1], "0 none; 1 mild (10% or less of the surface); 2 severe (>10% of the surface)");
  assert.equal(CUTOFF_NOTE, "No validated cut-off; higher scores mean more active disease. Use to compare over time; histology (15 or more eosinophils per high-power field) is still required.");
  assert.deepEqual(card("bismuth_corlette").references.map(r => r.url),
    ["https://pubmed.ncbi.nlm.nih.gov/1079096/", "https://pubmed.ncbi.nlm.nih.gov/1309988/"]);
  assert.equal(row("siewert", "II")[2], "Staged as esophageal cancer (AJCC 8th edition: epicenter within 2 cm of the gastroesophageal junction). Surgical approach decided by the multidisciplinary team.");
  assert.equal(row("siewert", "III")[2], "Staged as gastric cancer");
  assert.equal(row("jnet", "1")[4], "Diminutive (5 mm or less) rectosigmoid hyperplastic polyps can be left in place only with a high-confidence optical diagnosis; resect sessile serrated lesions.");
  assert.match(row("kudo", "VI")[2], /en bloc resection; high-grade VI may indicate deep invasion, so consider surgery$/);
  assert.match(row("kudo", "VN")[2], /surgery$/);
  assert.match(section("B6.3"), /^### B6\.3 .*\(id: prague; calculator\)/);
});
