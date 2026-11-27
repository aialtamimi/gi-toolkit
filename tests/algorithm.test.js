// Bedside algorithm pages (SPEC.md B7.0): every decision path from B8.8, every weight-based dose from B8.7,
// the dose table in B7.0, the privacy rule for the weight, and the earlier pages' text carried over.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EMERGENCIES, CALCULATORS, CARDS, findItem } from "../js/registry.js";
import { stepStates, shownSteps, steps, entryAnswers, pageText, suggestedAnswers, suggestions, SUGGESTIONS } from "../js/algorithm.js";
import { DOSES, doseLine, parseWeight, terlipressinMg, validWeight, WEIGHT_MIN, WEIGHT_MAX } from "../js/doses.js";
import { calc } from "./helpers.js";
import { pathVectors, doseVectors, weightTable, suggestionVectors, CALC_NAMES, section } from "./spec_b7.js";

const page = id => EMERGENCIES.find(p => p.id === id);
const byName = name => DOSES.find(d => d.name === name);

// ---------- B8.8 decision paths ----------

const { shown, marks } = pathVectors();

test("B8.8 covers every algorithm page and every answer of every decision", () => {
  const algos = EMERGENCIES.filter(p => p.kind === "algorithm");
  assert.deepEqual([...new Set(shown.map(v => v.page))].sort(), algos.map(p => p.id).sort());
  for (const p of algos) {
    for (const d of steps(p).filter(s => s.type === "decision")) {
      for (const o of d.options) {
        assert.ok(shown.some(v => v.page === p.id && v.answers && v.answers[d.id] === o.value), `${p.id} ${d.id} = ${o.value} has no B8.8 vector`);
      }
    }
    assert.ok(shown.some(v => v.page === p.id && v.answers && !Object.keys(v.answers).length), `${p.id}: no "none" vector`);
  }
});

for (const v of shown) {
  const label = v.entry ? `entry point ${v.entry}` : Object.entries(v.answers).map(([d, a]) => `${d} = ${a}`).join("; ") || "none";
  test(`B8.8 ${v.page}, ${label}: steps shown ${v.shown.join(", ")}`, () => {
    const p = page(v.page);
    const answers = v.entry ? entryAnswers(p, v.entry) : v.answers;
    if (v.entry) assert.ok(Object.keys(answers).length > 0, "entry point sets answers");
    assert.deepEqual(shownSteps(p, answers), v.shown);
  });
}

for (const v of marks) {
  const label = Object.entries(v.answers).map(([d, a]) => `${d} = ${a}`).join("; ") || "none";
  test(`B8.8 full algorithm marks, ${v.page}, ${label}`, () => {
    const st = stepStates(page(v.page), v.answers);
    const ids = s => Object.keys(st).filter(k => st[k] === s);
    assert.deepEqual(ids("on"), v.on);
    assert.deepEqual(ids("off"), v.off);
    assert.deepEqual(ids("pending"), v.pending);
  });
}

test("full algorithm shows every step: each step is always shown, on, off or pending", () => {
  for (const p of EMERGENCIES.filter(p => p.kind === "algorithm")) {
    const st = stepStates(p, {});
    assert.deepEqual(Object.keys(st), steps(p).map(s => s.id));
    for (const s of Object.values(st)) assert.ok(["always", "on", "off", "pending"].includes(s));
  }
});

test("an unknown entry point chooses nothing", () => {
  assert.deepEqual(entryAnswers(page("em_ugib"), "nonexistent"), {});
  assert.deepEqual(entryAnswers(page("em_asuc"), "variceal"), {});
});

// ---------- B7.0 dose table and B8.7 weight-based doses ----------

test("B7.0 weight-based dose table matches js/doses.js (names, pages, rows)", () => {
  const rows = weightTable();
  const pageOf = num => EMERGENCIES.find(p => p.spec === num).id;
  assert.deepEqual(rows.map(r => r.name), DOSES.map(d => d.name));
  for (const r of rows) {
    const d = byName(r.name);
    assert.equal(d.page, pageOf(r.page), r.name);
    assert.equal(d.row, r.row.startsWith("none") ? null : r.row, r.name);
    assert.ok(r.shownAs.startsWith((d.tag ? d.tag + ". " : "") + d.label + ": "), `${r.name}: label "${d.label}" vs SPEC "${r.shownAs}"`);
  }
});

const vectors = doseVectors();

test("B8.7 has a vector for every weight-based dose", () => {
  for (const d of DOSES) assert.ok(vectors.some(v => v.name === d.name && v.shown), d.name);
});

for (const v of vectors) {
  test(`B8.7 ${v.name}, ${v.weight} kg: ${v.shown ?? "not calculated"}`, () => {
    assert.ok(byName(v.name), v.name);
    assert.equal(doseLine(byName(v.name).id, v.weight), v.shown);
  });
}

test("terlipressin weight bands: <50 kg 1 mg; 50–70 kg 1.5 mg; >70 kg 2 mg (both 50 and 70 in the middle band)", () => {
  assert.equal(terlipressinMg(49.99), 1);
  assert.equal(terlipressinMg(50), 1.5);
  assert.equal(terlipressinMg(60), 1.5);
  assert.equal(terlipressinMg(70), 1.5);
  assert.equal(terlipressinMg(70.01), 2);
  assert.equal(terlipressinMg(120), 2);
});

test("every weight-based dose, at the edges of the accepted range and in between, matches its B7.0 calculation", () => {
  const num = s => Number(s.replace(/^>/, ""));
  for (const w of [WEIGHT_MIN, 45, 50, 64.2, 70, 70.1, 88.88, 110, WEIGHT_MAX]) {
    const val = id => DOSES.find(d => d.id === id).value(w);
    const r1 = x => Math.round(x * 10) / 10;
    assert.equal(num(val("infliximab_5").split(" ")[0]), r1(5 * w));
    assert.equal(num(val("infliximab_10").split(" ")[0]), r1(10 * w));
    assert.equal(num(val("ciclosporin").split(" ")[0]), r1(2 * w));
    const [g1, ml1, , ml1b] = val("albumin_day1").split(" ").filter(t => /\d/.test(t));
    assert.equal(num(g1), r1(1.5 * w)); assert.equal(num(ml1), r1(7.5 * w)); assert.equal(num(ml1b), r1(6 * w));
    const [g3, ml3, , ml3b] = val("albumin_day3").split(" ").filter(t => /\d/.test(t));
    assert.equal(num(g3), r1(w)); assert.equal(num(ml3), r1(5 * w)); assert.equal(num(ml3b), r1(4 * w));
    assert.equal(num(val("ringer_infusion").split(" ")[0]), r1(1.5 * w));
    assert.equal(num(val("ringer_bolus").split(" ")[0]), r1(10 * w));
    assert.equal(num(val("urine_output").split(" ")[0]), r1(0.5 * w));
    assert.ok(val("terlipressin").startsWith(`${terlipressinMg(w)} mg IV every 4 hours for 48 hours`));
  }
});

test("weight field: blank, text and out-of-range entries give no dose; comma decimals accepted", () => {
  assert.deepEqual(parseWeight(""), { weight: null, error: null });
  assert.equal(parseWeight("abc").error, "Enter a number");
  assert.equal(parseWeight("19.9").error, "Enter weight between 20 and 350 kg");
  assert.equal(parseWeight("351").error, "Enter weight between 20 and 350 kg");
  assert.ok(section("B7.0").body.includes('any other entry shows "Enter weight between 20 and 350 kg"'));
  assert.equal(parseWeight("350.1").weight, null);
  assert.deepEqual(parseWeight("72,5"), { weight: 72.5, error: null });
  assert.equal(validWeight(null), false);
  for (const d of DOSES) assert.equal(doseLine(d.id, null), null);
});

// ---------- privacy: the weight is never stored ----------

test("the weight and the answers are kept in memory only (Build Rule 4)", () => {
  for (const f of ["js/pages.js", "js/algorithm.js", "js/doses.js"]) {
    const src = readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
    assert.ok(!/localStorage|sessionStorage|indexedDB|storage\.js|document\.cookie|store\./.test(src), `${f} touches storage`);
  }
  const storage = readFileSync(new URL("../js/storage.js", import.meta.url), "utf8");
  assert.ok(!/weight|answer/i.test(storage));
});

// ---------- the earlier pages' text, doses and sources are kept ----------

const CARRIED = {
  em_ugib: [
    "hematemesis, coffee-ground vomit, melena; shock index (heart rate/systolic BP) >1 = high risk.",
    "two large-bore cannulas", "crystalloid resuscitation", "GBS (B2.1)",
    "Transfuse at Hb <7 g/dL (target 7–9); use 8 g/dL threshold in cardiovascular disease.",
    "Hold antithrombotics per B7.4.",
    "upper endoscopy within 24 hours of presentation after resuscitation (ACG 2021, ESGE 2021)",
    "IV erythromycin 250 mg 30–120 minutes before endoscopy if no contraindication (QT prolongation).",
    "Forrest Ia, Ib, IIa (B2.5): thermal contact therapy, clips, or sclerosant injection; epinephrine injection only in combination.",
    "Hemostatic powder as temporary therapy for active bleeding.",
    "over-the-scope clip for recurrent ulcer bleeding",
    "80 mg IV bolus, then 8 mg/h", "72 hours", "twice daily", "to day 14, then once daily",
    "Test for H. pylori and treat",
    "Rebleeding", "repeat endoscopy", "if it fails, transcatheter arterial embolization, then surgery.",
    "tranexamic acid", "venous thrombosis", "HALT-IT, Lancet 2020",
    "urgent endoscopy within 6 hours does not improve mortality (Lau, NEJM 2020).",
    // from the variceal page
    "upper GI bleeding in known or suspected cirrhosis or portal hypertension.",
    "Vasoactive drug as soon as variceal bleeding is suspected, before endoscopy, continued 2–5 days.",
    "Antibiotic prophylaxis: ceftriaxone 1 g", "every 24 hours for up to 7 days.",
    "Restrictive transfusion: Hb threshold 7 g/dL, target 7–9 g/dL ([ESGE 2022](https://pubmed.ncbi.nlm.nih.gov/36174643)).",
    "Protect the airway if massive hematemesis or HE grade 3–4.", "Erythromycin before endoscopy.",
    "Endoscopy within 12 hours.", "Esophageal varices: band ligation.", "Gastric varices GOV2 or IGV1: cyanoacrylate injection.",
    "Pre-emptive TIPS within 72 hours (ideally 24)", "Child-Pugh C 10–13, or Child-Pugh B >7 with active bleeding at endoscopy, or HVPG >20 mmHg.",
    "Refractory bleeding", "balloon tamponade or esophageal stent as bridge to rescue TIPS.",
    "Start non-selective beta-blocker (carvedilol or propranolol) when vasoactive drug stops", "band ligation every 1–4 weeks until eradication.",
    "Lactulose to prevent",
    "fresh frozen plasma or platelets to \"correct\" INR alone; over-transfusion (raises portal pressure); proton pump inhibitor continued long term without indication."
  ],
  em_asuc: [
    "Truelove and Witts severe (B5.1): ≥6 bloody stools/day plus systemic toxicity.",
    "Admit.", "IV corticosteroids", "Venous thromboembolism prophylaxis with low-molecular-weight heparin", "Stool culture and C. difficile toxin",
    "Flexible sigmoidoscopy with biopsies for CMV", "Plain abdominal X-ray", "correct potassium and magnesium", "involve the surgeon early",
    "Oxford criteria (B5.2)", "Rescue therapy with infliximab or ciclosporin",
    "No response to rescue within 5–7 days, or deterioration, toxic megacolon, perforation or massive bleeding: colectomy.",
    "non-steroidal anti-inflammatory drugs (NSAIDs), opioids, anticholinergics and antidiarrheals; delaying surgery in non-responders."
  ],
  em_sbp: [
    "ascitic PMN ≥250/mm³ (B3.12). Do a diagnostic paracentesis in every patient with cirrhosis and ascites admitted to hospital, and with any GI bleeding, infection signs, HE or AKI.",
    "Empirical antibiotics", "IV albumin", "Blood and ascitic cultures: inoculate blood culture bottles at the bedside.",
    "Repeat paracentesis if no clinical improvement; PMN fall <25% = treatment failure, broaden antibiotics and look for secondary peritonitis.",
    "Long-term secondary prophylaxis after the first episode",
    "large-volume paracentesis during active SBP without albumin; non-steroidal anti-inflammatory drugs (NSAIDs); consider holding non-selective beta-blockers if systolic BP <90 mmHg, sodium <130 mmol/L or AKI."
  ],
  em_pancreatitis: [
    "ACG 2024 (Tenner, Am J Gastroenterol 2024).",
    "2 of 3: typical pain, lipase or amylase >3 × ULN, imaging (B4.6). Ultrasound for gallstones in every patient; check triglycerides and calcium.",
    "Moderately aggressive fluids with lactated Ringer's", "urine output", "heart rate", "BUN", "hematocrit", "for the first 24–48 hours", "Analgesia.", "BISAP and SIRS.",
    "Urgent ERCP (within 24 hours) only if concomitant cholangitis.",
    "Early oral feeding within 24–48 hours as tolerated (low-fat solid diet in mild pancreatitis); enteral rather than parenteral feeding in severe pancreatitis.",
    "Mild gallstone pancreatitis: cholecystectomy during the same admission.",
    "Suspected infected necrosis", "step-up approach", "delaying drainage until walled-off (about 4 weeks) where possible.",
    "aggressive fluids (more fluid overload without benefit; WATERFALL, NEJM 2022); prophylactic antibiotics; early ERCP in biliary pancreatitis without cholangitis; CT in the first 72 hours unless the diagnosis is unclear."
  ],
  em_cholangitis: [
    "TG18 criteria (B4.8).",
    "Blood cultures, then IV antibiotics (within 1 hour in septic shock) covering gram-negative organisms and anaerobes per local resistance",
    "Fluids.", "correct coagulopathy if needed for sphincterotomy.",
    "Biliary drainage by ERCP rather than percutaneous drainage, within 48 hours ([ASGE 2021](https://guidelinecentral.com/guideline/1285200)).",
    "as soon as possible after resuscitation (ideally within 12 hours) in septic shock or TG18 grade III (ESGE 2019).",
    "If stable, combine drainage with sphincterotomy and stone removal.", "If unstable or coagulopathic, stent decompression alone",
    "Antibiotics 4–7 days after source control (TG18)", "Cholecystectomy for gallstone disease",
    "delaying drainage in grade II–III; full stone clearance in an unstable patient."
  ]
};

// Doses table rows of the earlier pages (the variceal erythromycin row is the same drug and dose as the upper GI row).
const OLD_DOSE_ROWS = {
  em_ugib: [
    ["Erythromycin", "250 mg IV over 5–30 minutes, given 30–120 minutes before endoscopy"],
    ["Pantoprazole or esomeprazole, high dose", "80 mg IV bolus, then 8 mg/h infusion for 72 hours; or 40 mg IV twice daily as intermittent high dose"],
    ["Octreotide", "50 µg IV bolus, then 50 µg/h infusion for 2–5 days; bolus can be repeated in the first hour"],
    ["Somatostatin", "250 µg IV bolus, then 250–500 µg/h infusion"],
    ["Ceftriaxone", "1 g IV every 24 hours, maximum 7 days"]
  ],
  em_asuc: [
    ["Methylprednisolone", "60 mg IV every 24 hours"], ["Hydrocortisone (alternative)", "100 mg IV every 6 hours"],
    ["Infliximab (rescue)", "5 mg/kg IV; accelerated or higher dosing (e.g., 10 mg/kg) may be considered in severe inflammation or low albumin"],
    ["Ciclosporin (rescue)", "2 mg/kg/day continuous IV infusion; monitor levels, blood pressure, renal function, magnesium"]
  ],
  em_sbp: [
    ["Cefotaxime (community-acquired)", "2 g IV every 8 hours for 5–7 days"], ["Ceftriaxone (alternative)", "1–2 g IV every 24 hours"],
    ["Nosocomial or recent antibiotics", "Broader cover per local resistance (for example piperacillin-tazobactam or a carbapenem)"],
    ["Albumin 20–25%", "1.5 g/kg on day 1 and 1 g/kg on day 3 (Sort, NEJM 1999)"],
    ["Secondary prophylaxis", "Norfloxacin 400 mg daily, or ciprofloxacin 500 mg daily, or trimethoprim-sulfamethoxazole"]
  ],
  em_pancreatitis: [
    ["Lactated Ringer's", "1.5 mL/kg/h; add a 10 mL/kg bolus if hypovolemic; reassess frequently and reduce in cardiac or renal disease"],
    ["Rectal indomethacin (post-ERCP pancreatitis prevention, high-risk ERCP)", "100 mg per rectum around the time of ERCP"]
  ],
  em_cholangitis: []
};

const OLD_RELATED = {
  em_ugib: ["gbs", "aims65", "rockall", "forrest", "child_pugh", "meld3", "west_haven"],
  em_asuc: ["truelove_witts", "asuc_day3", "uceis", "mayo_uc"],
  em_sbp: ["ascites", "meld_na"],
  em_pancreatitis: ["bisap", "ranson", "glasgow_imrie", "sirs", "marshall", "atlanta", "mctsi"],
  em_cholangitis: ["tg18_cholangitis", "asge_cbd"]
};

const OLD_SOURCES = {
  em_ugib: ["Laine L", "Gralnek IM et al. ESGE NVUGIH", "HALT-IT", "Lau JYW", "de Franchis R", "Gralnek IM et al. ESGE variceal guideline 2022"],
  em_asuc: ["Travis SP", "Raine T"],
  em_sbp: ["Sort P"],
  em_pancreatitis: ["Tenner S", "de-Madaria E", "Banks PA"],
  em_cholangitis: ["Kiriyama S", "ASGE guideline on the management of cholangitis 2021", "Manes G"]
};

for (const [id, fragments] of Object.entries(CARRIED)) {
  test(`${id}: every line of the earlier page is kept (text, doses, related calculators, sources)`, () => {
    const p = page(id);
    const text = pageText(p).toLowerCase();
    for (const f of fragments) assert.ok(text.includes(f.toLowerCase()), `missing: ${f}`);
    const doses = p.blocks.find(b => b.type === "table" && b.columns[1] === "Dose");
    for (const row of OLD_DOSE_ROWS[id]) assert.ok(doses.rows.some(r => r[0] === row[0] && r[1] === row[1]), `dose row: ${row[0]}`);
    for (const r of OLD_RELATED[id]) assert.ok(p.related.includes(r), `related: ${r}`);
    for (const s of OLD_SOURCES[id]) assert.ok(p.references.some(r => r.citation.startsWith(s)), `source: ${s}`);
  });
}

test("terlipressin has one doses row, by weight (decision 3)", () => {
  const rows = page("em_ugib").blocks.find(b => b.type === "table" && b.columns[1] === "Dose").rows.filter(r => r[0] === "Terlipressin");
  assert.deepEqual(rows, [["Terlipressin", "IV every 4 hours for 48 hours (<50 kg: 1 mg; 50–70 kg: 1.5 mg; >70 kg: 2 mg), then 1 mg every 4 hours"]]);
  assert.ok(!pageText(page("em_ugib")).includes("adjust by weight"));
});

test("every why line names a trial or guideline, or states the reason in one short line", () => {
  for (const p of EMERGENCIES.filter(p => p.kind === "algorithm")) {
    for (const b of p.blocks) for (const w of [].concat(b.why || [])) assert.ok(w.length <= 200 && /\.$/.test(w), `${p.id}: ${w}`);
  }
});

test("every built-in calculator referenced in the request is on its page", () => {
  const calcs = id => page(id).blocks.flatMap(b => b.calcs || []);
  assert.deepEqual(calcs("em_ugib"), ["gbs", "aims65", "child_pugh", "forrest"]);
  assert.deepEqual(calcs("em_asuc"), ["truelove_witts", "asuc_day3"]);
  assert.deepEqual(calcs("em_sbp"), ["ascites"]);
  assert.deepEqual(calcs("em_pancreatitis"), ["marshall", "atlanta", "bisap", "sirs", "marshall", "mctsi"]);
  assert.deepEqual(calcs("em_cholangitis"), ["tg18_cholangitis"]);
  for (const id of ["gbs", "forrest", "child_pugh", "truelove_witts", "asuc_day3", "tg18_cholangitis", "bisap", "ascites"]) assert.ok(findItem(id));
});

// ---------- clinical owner decisions on PR 8 ----------

test("upper GI bleeding D3 buttons show the Forrest classes (decision 1)", () => {
  const d3 = steps(page("em_ugib")).find(s => s.id === "D3");
  assert.deepEqual(d3.options.map(o => [o.value, o.text]), [
    ["High-risk stigmata", "Forrest Ia, Ib, IIa, IIb; high-dose IV proton pump inhibitor."],
    ["Low-risk stigmata", "Forrest IIc, III; oral proton pump inhibitor."]]);
});

test("acute severe UC: day 5–7 decision only on the rescue path; deterioration line on the steroid path (decision 6)", () => {
  const p = page("em_asuc");
  const d2 = steps(p).find(s => s.id === "D2");
  assert.equal(d2.title, "Responding to rescue therapy?");
  assert.deepEqual(d2.when, [["D1", "Yes"]]);
  assert.deepEqual(d2.options.map(o => o.value), ["Yes", "No"]);
  assert.deepEqual(steps(p).find(s => s.id === "A4").items, ["Continue rescue therapy and plan maintenance."]);
  assert.ok(steps(p).find(s => s.id === "A5").items[0].endsWith(": colectomy."));
  assert.ok(steps(p).find(s => s.id === "A3").items.includes("Deterioration at any time: urgent surgical review and reassess for rescue therapy."));
  assert.ok(!shownSteps(p, { D1: "No" }).some(id => ["D2", "A4", "A5"].includes(id)));
});

test("SBP: PMN <250/mm³ with culture negative or pending (decision 7)", () => {
  const p = page("em_sbp");
  assert.ok(steps(p).find(s => s.id === "D1").options.some(o => o.value === "PMN <250/mm³, culture negative or pending" && o.text === "SBP unlikely."));
  assert.deepEqual(steps(p).find(s => s.id === "S3").items,
    ["SBP unlikely: no SBP treatment.", "Look for another cause of deterioration.", "Act on the culture result when it returns."]);
});

test("systolic BP is written in full; SBP only means spontaneous bacterial peritonitis (decision 8)", () => {
  for (const p of EMERGENCIES.filter(p => p.kind === "algorithm")) {
    const text = pageText(p);
    assert.ok(!/SBP\s*[<>≤≥]|\/SBP|SBP\)/.test(text), `${p.id}: SBP used for blood pressure`);
    if (p.id !== "em_sbp") assert.ok(!/\bSBP\b/.test(text), `${p.id}: SBP on a page other than SBP`);
  }
  assert.ok(pageText(page("em_ugib")).includes("shock index (heart rate/systolic BP) >1"));
});

test("urine output line is labelled \"Target, not a dose\" (decision 9)", () => {
  assert.ok(doseLine("urine_output", 70).startsWith("Target, not a dose. "));
  assert.ok(doseLine("protein_target", 70).startsWith("Target, not a dose. "));
  assert.deepEqual(DOSES.filter(d => d.tag).map(d => d.id), ["urine_output", "protein_target", "aclf_energy", "aclf_protein", "aclf_glucose"]);
  for (const d of DOSES.filter(d => d.tag)) assert.equal(d.tag, "Target, not a dose");
});

test("albumin is shown in grams and mL of 20% and 25% albumin (decision 10)", () => {
  assert.equal(doseLine("albumin_day1", 80), "Albumin day 1, 1.5 g/kg: 120 g = 600 mL of 20% albumin or 480 mL of 25% albumin");
  assert.equal(doseLine("albumin_day3", 80), "Albumin day 3, 1 g/kg: 80 g = 400 mL of 20% albumin or 320 mL of 25% albumin");
});

test("oral prednisolone 40 mg once daily, then taper by 5 mg per week, in the step and the doses table (decision 11)", () => {
  const p = page("em_asuc");
  const doses = p.blocks.find(b => b.type === "table" && b.columns[1] === "Dose");
  assert.ok(doses.rows.some(r => r[0].startsWith("Prednisolone") && r[1] === "40 mg orally once daily, then taper by 5 mg per week"));
  assert.ok(steps(p).find(s => s.id === "A3").items[0].includes("oral prednisolone 40 mg once daily once improving, then taper by 5 mg per week"));
});

test("why lines name their sources (decision 12)", () => {
  const why = (pid, sid) => steps(page(pid)).find(s => s.id === sid).why.join(" ");
  assert.ok(why("em_ugib", "V1").includes("(Chavez-Tapia, Cochrane Database Syst Rev 2010; Baveno VII)"));
  assert.ok(why("em_asuc", "A1").endsWith("(Grainge, Lancet 2010)."));
  assert.ok(why("em_asuc", "A5").endsWith("(Randall, Br J Surg 2010)."));
});

// B8.9: calculator inputs written in SPEC, as raw inputs in each calculator's own units.
const SUGGESTION_INPUTS = {
  "bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.0, ascites moderate to severe, encephalopathy none": { bili: 3.5, alb: 2.5, inr: 2.0, ascites: 3, he: 1 },
  "bilirubin 1.5 mg/dL, albumin 3.6 g/dL, INR 1.2, ascites none, encephalopathy none": { bili: 1.5, alb: 3.6, inr: 1.2, ascites: 1, he: 1 },
  "bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.5, ascites moderate to severe, encephalopathy grade 1–2": { bili: 3.5, alb: 2.5, inr: 2.5, ascites: 3, he: 2 },
  "bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.5, ascites moderate to severe, encephalopathy grade 3–4": { bili: 3.5, alb: 2.5, inr: 2.5, ascites: 3, he: 3 },
  "bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.5, ascites moderate to severe, encephalopathy none": { bili: 3.5, alb: 2.5, inr: 2.5, ascites: 3, he: 1 },
  "IIb": { cls: "IIb" },
  "IIc": { cls: "IIc" },
  "stools 9, CRP 10 mg/L": { stools: 9, crp: 10 },
  "stools 4, CRP 20 mg/L": { stools: 4, crp: 20 },
  "WBC 500/mm³, neutrophils 60%": { wbc: 500, neut: 60 },
  "WBC 300/mm³, neutrophils 50%": { wbc: 300, neut: 50 },
  "WBC 1000/mm³, neutrophils 90%, total protein 1.5 g/dL, glucose 40 mg/dL": { wbc: 1000, neut: 90, aprot: 1.5, aglu: 40 },
  "WBC 1000/mm³, neutrophils 90%, total protein 1.5 g/dL, glucose 60 mg/dL": { wbc: 1000, neut: 90, aprot: 1.5, aglu: 60 },
  "WBC 300/mm³, neutrophils 50%, total protein 1.5 g/dL, glucose 40 mg/dL": { wbc: 300, neut: 50, aprot: 1.5, aglu: 40 },
  "temperature 38.5 °C, WBC 15 ×10⁹/L, bilirubin 3 mg/dL, biliary dilatation, age 50": { temp: 38.5, wbc: 15, bili: 3, dilatation: true, age: 50 },
  "temperature 38.5 °C, WBC 15 ×10⁹/L, bilirubin 3 mg/dL, biliary dilatation, age 80": { temp: 38.5, wbc: 15, bili: 3, dilatation: true, age: 80 },
  "temperature 38.5 °C, WBC 8 ×10⁹/L, bilirubin 0.8 mg/dL, age 80, hypotension needing vasopressors": { temp: 38.5, wbc: 8, bili: 0.8, age: 80, odCv: true },
  "age 35, female, heart rate 75/min, systolic BP 125 mmHg, hemoglobin 140 g/L": { age: 35, sex: "F", hr: 75, sbp: 125, hb: 140 },
  "age 35, female, heart rate 75/min, systolic BP 125 mmHg, hemoglobin 140 g/L, blood on rectal exam": { age: 35, sex: "F", hr: 75, sbp: 125, hb: 140, dre: true },
  "acetaminophen, arterial pH 7.2": { type: "apap", ph: 7.2 },
  "acetaminophen, arterial pH 7.35": { type: "apap", ph: 7.35 },
  "age 50, albumin 25 g/L, bilirubin day 0 300 µmol/L, day 7 280 µmol/L, creatinine 1.0 mg/dL, PT 20 s": { age: 50, alb: 25, bili0: 300, bili7: 280, cr: 1.0, pt: 20 },
  "age 50, albumin 30 g/L, bilirubin day 0 300 µmol/L, day 7 150 µmol/L, creatinine 1.0 mg/dL, PT 15 s": { age: 50, alb: 30, bili0: 300, bili7: 150, cr: 1.0, pt: 15 },
  "grade 3": { grade: "3" }, "grade 4": { grade: "4" }, "grade 2": { grade: "2" }, "minimal": { grade: "Minimal" },
  "bilirubin 13 mg/dL, creatinine 4 mg/dL, HE grade 3–4, INR 2.6, vasopressors, PaO2/FiO2 400, age 60, WBC 20 ×10⁹/L": { bili: 13, cr: 4, he: "3-4", inr: 2.6, vaso: true, pf: 400, age: 60, wbc: 20 },
  "bilirubin 7 mg/dL, creatinine 2.5 mg/dL, HE grade 1–2, INR 2.2, MAP 65 mmHg, PaO2/FiO2 250, age 50, WBC 10 ×10⁹/L": { bili: 7, cr: 2.5, he: "1-2", inr: 2.2, map: 65, pf: 250, age: 50, wbc: 10 },
  "bilirubin 13 mg/dL, creatinine 2.5 mg/dL, HE grade 3–4, INR 2.6, MAP 75 mmHg, PaO2/FiO2 400, age 40, WBC 5 ×10⁹/L": { bili: 13, cr: 2.5, he: "3-4", inr: 2.6, map: 75, pf: 400, age: 40, wbc: 5 },
  "bilirubin 13 mg/dL, creatinine 2.5 mg/dL, HE grade 3–4, INR 2.2, MAP 75 mmHg, PaO2/FiO2 400, age 40, WBC 5 ×10⁹/L": { bili: 13, cr: 2.5, he: "3-4", inr: 2.2, map: 75, pf: 400, age: 40, wbc: 5 },
  // Zargar is a table card: the "input" is the tapped row.
  "grade 0": { row: "0" }, "grade 2a": { row: "2a" }, "grade 2b": { row: "2b" }, "grade 3a": { row: "3a" }, "grade 3b": { row: "3b" }
};
SUGGESTION_INPUTS["grade 4"] = { grade: "4", row: "4" };

const suggestionRows = suggestionVectors();

test("B8.9 covers every suggestion rule, and every rule's calculator is on the page with the decision", () => {
  for (const r of SUGGESTIONS) {
    assert.ok(suggestionRows.some(v => v.page === r.page && v.decision === r.decision && CALC_NAMES[v.calc] === r.calc), `${r.page} ${r.decision}`);
    const p = page(r.page);
    assert.ok(p.blocks.some(b => (b.calcs || []).includes(r.calc)), `${r.calc} not on ${r.page}`);
    assert.equal(steps(p).find(s => s.id === r.decision).type, "decision");
  }
});

for (const v of suggestionRows) {
  test(`B8.9 ${v.page} ${v.decision}, ${v.calc} (${v.inputs}): suggested ${v.suggested.join("; ") || "none"}${v.notes.length ? `, note "${v.notes[0]}"` : ""}`, () => {
    const raw = SUGGESTION_INPUTS[v.inputs];
    assert.ok(raw, `no raw inputs for "${v.inputs}"`);
    const id = CALC_NAMES[v.calc];
    const def = [...CALCULATORS, ...CARDS].find(c => c.id === id);
    const out = def.inputs ? calc(def, raw) : { result: { row: def.table.rows.find(r => r[0] === raw.row) }, interp: null };
    assert.ok(out.result.row || def.inputs, `no table row "${raw.row}"`);
    const p = page(v.page);
    const sug = suggestions(p, v.decision, { [id]: { result: out.result, interp: out.interp } });
    const got = sug.answers;
    assert.deepEqual(got, v.suggested);
    assert.deepEqual(sug.notes, v.notes);
    const d = steps(p).find(s => s.id === v.decision);
    for (const g of got) assert.ok(d.options.some(o => o.value === g), `"${g}" is not an answer of ${v.decision}`);
  });
}

test("a suggestion never chooses an answer: no calculator output changes the shown steps", () => {
  const p = page("em_asuc");
  assert.deepEqual(shownSteps(p, {}), ["A1", "D1"]);
  assert.deepEqual(suggestedAnswers(p, "D1", {}), []);
  assert.deepEqual(suggestedAnswers(p, "D1", { asuc_day3: null }), []);
});

// Decision 14: exact PubMed links for the trials and sources named by the clinical owner.
const PMIDS = {
  "Villanueva C": "23281973", "Garcia-Pagan JC": "20573925", "Lau JYW": "32242355", "HALT-IT": "32563378",
  "Laharie D": "23063316", "Williams JG": "27595142", "Sort P": "10432325", "de-Madaria E": "36103415",
  "Schepers NJ": "32682482", "da Costa DW": "26460661", "Boxhoorn L": "34614330", "Chavez-Tapia NC": "20824832",
  "Grainge MJ": "20149425", "Randall J": "20101648"
};

test("trial and source references link to their exact PubMed record (decision 14)", () => {
  const all = [...CALCULATORS, ...CARDS, ...EMERGENCIES].flatMap(x => x.references || []);
  for (const [author, pmid] of Object.entries(PMIDS)) {
    const refs = all.filter(r => r.citation.startsWith(author));
    assert.ok(refs.length > 0, author);
    for (const r of refs) {
      assert.equal(r.url, `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, author);
      assert.equal(r.searchLink, false, author);
      assert.ok(r.citation.includes(`PMID ${pmid}`), author);
    }
  }
  assert.ok(all.find(r => r.citation.startsWith("de-Madaria E")).citation.includes("NEJM 2022;387:989-1000"));
  const b9 = SPEC_B9();
  for (const pmid of Object.values(PMIDS)) assert.ok(b9.includes(`PMID ${pmid}`), `B9 lacks PMID ${pmid}`);
});

function SPEC_B9() {
  return readFileSync(new URL("../SPEC.md", import.meta.url), "utf8").split("## Part B9: References")[1];
}

// ---------- follow-up decisions (version 0.6.1) ----------

test("SBP secondary peritonitis step starts broad-spectrum antibiotics with anaerobic cover (EASL 2018)", () => {
  const s4 = steps(page("em_sbp")).find(s => s.id === "S4");
  assert.deepEqual(s4.when, [["D1", "Runyon criteria or polymicrobial culture"]]);
  assert.ok(s4.items.includes("Start broad-spectrum antibiotics with anaerobic cover (for example ceftriaxone plus metronidazole, or piperacillin-tazobactam per local resistance) (EASL 2018)."));
});

test("SBP suggestion: secondary peritonitis only with PMN ≥250/mm³ and 2 or more Runyon criteria, and then alone", () => {
  const p = page("em_sbp");
  const run = r => suggestedAnswers(p, "D1", { ascites: { result: r } });
  assert.deepEqual(run({ pmn: 250, runyonCount: 2 }), ["Runyon criteria or polymicrobial culture"]);
  assert.deepEqual(run({ pmn: 250, runyonCount: 3 }), ["Runyon criteria or polymicrobial culture"]);
  assert.deepEqual(run({ pmn: 250, runyonCount: 1 }), ["PMN 250/mm³ or more"]);
  assert.deepEqual(run({ pmn: 249, runyonCount: 3 }), []);
  assert.deepEqual(run({ runyonCount: 2 }), []);
  for (const r of [{ pmn: 900, runyonCount: 2 }, { pmn: 900, runyonCount: 0 }]) assert.equal(run(r).length, 1);
});

test("pre-emptive TIPS suggestion: Child-Pugh 10–13 Yes; 14–15 No with the note; otherwise none", () => {
  const p = page("em_ugib");
  const run = score => suggestions(p, "D2", { child_pugh: { result: { score } } });
  for (const sc of [5, 7, 8, 9]) assert.deepEqual(run(sc), { answers: [], notes: [] }, String(sc));
  for (const sc of [10, 13]) assert.deepEqual(run(sc), { answers: ["Yes"], notes: [] }, String(sc));
  for (const sc of [14, 15]) assert.deepEqual(run(sc), { answers: ["No"], notes: ["Pre-emptive TIPS not recommended (Child-Pugh >13)"] }, String(sc));
  assert.ok(pageText(p).includes("Salvage TIPS is not recommended if Child-Pugh >13."));
});

test("SBP page cites EASL 2018 and AASLD 2021 with exact PubMed links", () => {
  const refs = page("em_sbp").references;
  const easl = refs.find(r => r.citation.startsWith("EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis"));
  const aasld = refs.find(r => r.citation.startsWith("Biggins SW et al."));
  assert.ok(easl && easl.citation.includes("J Hepatol 2018") && easl.citation.includes("PMID 29653741"));
  assert.equal(easl.url, "https://pubmed.ncbi.nlm.nih.gov/29653741/");
  assert.ok(aasld && aasld.citation.includes("Hepatology 2021") && aasld.citation.includes("PMID 33942342"));
  assert.equal(aasld.url, "https://pubmed.ncbi.nlm.nih.gov/33942342/");
  const b9 = SPEC_B9();
  assert.ok(b9.includes("(PMID 29653741)](https://pubmed.ncbi.nlm.nih.gov/29653741/)"));
  assert.ok(b9.includes("(PMID 33942342)](https://pubmed.ncbi.nlm.nih.gov/33942342/)"));
});

test("acute pancreatitis: modified Marshall in the red flags box and in step P2, under the red flag line", async () => {
  const p = page("em_pancreatitis");
  assert.deepEqual(p.blocks.find(b => b.type === "redflags").calcs, ["marshall"]);
  const p2 = steps(p).find(s => s.id === "P2");
  assert.deepEqual(p2.calcs, ["marshall"]);
  assert.ok(p2.items.includes("Red flag: organ failure, modified Marshall score 2 or more (B4.5): HDU or ICU."));
  // The two copies get different input ids.
  const { fieldId } = await import("../js/engine.js");
  const marshall = findItem("marshall");
  const ids = where => marshall.inputs.filter(i => i.id).map(i => fieldId(marshall, i, `em_pancreatitis-${where}`));
  const a = ids("redflags"), b = ids("P2");
  assert.equal(new Set([...a, ...b]).size, a.length + b.length);
  assert.equal(fieldId(marshall, marshall.inputs.find(i => i.id), undefined), `f-marshall-${marshall.inputs.find(i => i.id).id}`);
});

// ---------- upper GI bleeding follow-up (version 0.6.2) ----------

test("upper GI bleeding step 1 starts the high-dose IV proton pump inhibitor, with its own why line", () => {
  const u1 = steps(page("em_ugib")).find(s => s.id === "U1");
  assert.ok(u1.items.includes("Start high-dose IV proton pump inhibitor now: pantoprazole or esomeprazole 80 mg IV bolus, then 8 mg/h infusion until endoscopy. Do not delay endoscopy for it."));
  assert.deepEqual(u1.why, [
    "Restrictive transfusion lowered mortality (Villanueva, NEJM 2013).",
    "Reduces high-risk stigmata and need for endoscopic therapy, but not mortality, rebleeding or surgery (Sreedharan, Cochrane 2010; ESGE 2021)."]);
  assert.ok(!pageText(page("em_ugib")).includes("may be started"));
  assert.ok(!steps(page("em_ugib")).find(s => s.id === "N1").items.some(i => /proton pump inhibitor/.test(i)));
});

test("variceal pathway: after-endoscopy step before the pre-emptive TIPS decision; surveillance before discharge", () => {
  const p = page("em_ugib");
  const ids = steps(p).map(s => s.id);
  assert.ok(ids.indexOf("V2") < ids.indexOf("V3") && ids.indexOf("V3") < ids.indexOf("D2"));
  const v3 = steps(p).find(s => s.id === "V3");
  assert.equal(v3.chip, "After endoscopy");
  assert.deepEqual(v3.when, [["D1", "Yes"]]);
  assert.deepEqual(v3.items, ["Continue vasoactive drug for 2–5 days.", "Continue ceftriaxone, up to 7 days in total.",
    "Stop the proton pump inhibitor unless there is another indication.", "Lactulose to prevent hepatic encephalopathy."]);
  const v7 = steps(p).find(s => s.id === "V7");
  assert.ok(v7.items.includes("After eradication: endoscopy at 3–6 months, then every 6–12 months (AASLD 2017)."));
  assert.ok(v7.items.includes("Start non-selective beta-blocker (carvedilol or propranolol) when vasoactive drug stops."));
  // Lactulose and stopping the proton pump inhibitor appear once, in the after-endoscopy step.
  assert.equal(pageText(p).split("Lactulose to prevent hepatic encephalopathy.").length - 1, 1);
  const d2 = steps(p).find(s => s.id === "D2");
  assert.deepEqual(d2.options.map(o => o.value), ["Yes", "No"]);
});

test("non-variceal pathway: proton pump inhibitor by stigmata, and no routine second-look endoscopy", () => {
  const p = page("em_ugib");
  assert.deepEqual(steps(p).find(s => s.id === "N3").items, ["High-risk stigmata (endoscopic therapy done, or Forrest IIb): continue the infusion for 72 hours after endoscopy (or 40 mg IV twice daily), then oral twice daily to day 14, then once daily."]);
  assert.deepEqual(steps(p).find(s => s.id === "N4").items, ["Low-risk stigmata: stop the infusion; oral proton pump inhibitor once daily; early feeding; consider discharge."]);
  const n5 = steps(p).find(s => s.id === "N5");
  assert.deepEqual(n5.when, [["D1", "No"]]);
  assert.deepEqual(n5.items, ["No routine second-look endoscopy; repeat only if rebleeding (ESGE 2021, ACG 2021)."]);
  assert.ok(steps(p).find(s => s.id === "N6").items[0].startsWith("Repeat endoscopy (over-the-scope clip"));
  assert.ok(steps(p).find(s => s.id === "N7").items[0].startsWith("Test for H. pylori and treat"));
});

test("key differences table has the proton pump inhibitor row", () => {
  const t = page("em_ugib").blocks.find(b => b.type === "table" && b.title === "Key differences");
  assert.deepEqual(t.rows.find(r => r[0] === "Proton pump inhibitor"),
    ["Proton pump inhibitor", "Start before endoscopy; stop after unless another indication", "Start before endoscopy; 72 h infusion if high-risk stigmata"]);
});

test("upper GI bleeding guidelines and the new sources link to their exact PubMed record", () => {
  const all = [...CALCULATORS, ...CARDS, ...EMERGENCIES].flatMap(x => x.references || []);
  const expect = {
    "Gralnek IM et al. ESGE NVUGIH": "33567467",
    "Laine L et al. ACG Clinical Guideline": "33929377",
    "Sreedharan A": "20614440",
    "Garcia-Tsao G": "27786365"
  };
  for (const [start, pmid] of Object.entries(expect)) {
    const refs = all.filter(r => r.citation.startsWith(start));
    assert.ok(refs.length > 0, start);
    for (const r of refs) {
      assert.equal(r.url, `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, start);
      assert.ok(r.citation.includes(`PMID ${pmid}`), start);
    }
    assert.ok(SPEC_B9().includes(`(PMID ${pmid})](https://pubmed.ncbi.nlm.nih.gov/${pmid}/)`), `B9 ${start}`);
  }
  const ugib = page("em_ugib").references.map(r => r.citation);
  assert.ok(ugib.some(c => c.startsWith("Sreedharan A")) && ugib.some(c => c.startsWith("Garcia-Tsao G")));
});

// ---------- twelve pages converted in version 0.7.0 ----------

test("version 0.7.0 sources link to their exact PubMed record, with the PMID at the end of the citation", () => {
  const all = [...CALCULATORS, ...CARDS, ...EMERGENCIES].flatMap(x => x.references || []);
  const expect = {
    "Sengupta N": "36735555", "Abraham NS": "35297395", "Gralnek IM et al. ESGE NVUGIH": "33567467", "Sung JJ": "19949136",
    "McDonald LC": "29462280", "Randall J": "20101648", "Lee WM et al. Intravenous N-acetylcysteine": "19524577",
    "European Association for the Study of the Liver. EASL Clinical Practical Guidelines on the management of acute": "28417882",
    "Thursz MR": "25901427", "Louvet A": "17518367", "Arab JP": "34166722", "Nadim MK": "38527522", "Wong F": "33657294",
    "Vilstrup H": "25042402", "Bass NM": "20335583", "Birk M": "26862844", "Zargar SA": "2032601", "Ponec RJ": "10403850",
    "Sgouros SN": "16306137"
  };
  for (const [start, pmid] of Object.entries(expect)) {
    const refs = all.filter(r => r.citation.startsWith(start));
    assert.ok(refs.length > 0, start);
    for (const r of refs) {
      assert.equal(r.url, `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, start);
      assert.ok(r.citation.endsWith(`PMID ${pmid}`), `${start}: PMID not at the end`);
    }
    assert.ok(SPEC_B9().includes(`(PMID ${pmid})](https://pubmed.ncbi.nlm.nih.gov/${pmid}/)`), `B9 ${start}`);
  }
});

test("weight field on exactly the pages with a weight-based dose", () => {
  const withWeight = EMERGENCIES.filter(p => p.weight).map(p => p.id).sort();
  assert.deepEqual(withWeight, ["em_aclf", "em_alf", "em_antithrombotic", "em_asuc", "em_he", "em_hrs", "em_pancreatitis", "em_sbp", "em_ugib"]);
  for (const p of EMERGENCIES) assert.equal(p.weight, DOSES.some(d => d.page === p.id), p.id);
});

test("prothrombin complex concentrate never exceeds its cap", () => {
  for (const w of [20, 60, 99.9, 100, 100.1, 142.9, 143, 350]) {
    for (const [id, perKg, max] of [["pcc_inr2", 25, 2500], ["pcc_inr4", 35, 3500], ["pcc_inr6", 50, 5000]]) {
      const units = Number(DOSES.find(d => d.id === id).value(w).split(" ")[0]);
      assert.equal(units, Math.min(Math.round(perKg * w * 10) / 10, max), `${id} ${w} kg`);
      assert.equal(/\(maximum\)$/.test(doseLine(id, w)), perKg * w > max, `${id} ${w} kg maximum label`);
    }
  }
});

test("no page uses SBP for blood pressure, or an abbreviated drug name (polyethylene glycol 3350, prothrombin complex concentrate)", () => {
  for (const p of EMERGENCIES) {
    const text = pageText(p);
    assert.ok(!/SBP\s*[<>≤≥]|\/SBP|SBP\)/.test(text), `${p.id}: SBP used for blood pressure`);
    if (p.id !== "em_sbp") assert.ok(!/\bSBP\b/.test(text), `${p.id}: SBP on a page other than SBP`);
    assert.ok(!/\bPEG\b/.test(text), `${p.id}: PEG`);
  }
});

test("Zargar is built into the caustic page as its B6 table card, unchanged", () => {
  const z = findItem("zargar");
  assert.equal(z.inputs, undefined);
  assert.equal(z.table.rows.length, 7);
  assert.deepEqual(steps(page("em_caustic")).find(s => s.id === "D2").calcs, ["zargar"]);
});

// ---------- clinical owner decisions on PR 11 ----------

test("anticoagulants: red flags box, INR below 2 line, and doses for DOAC reversal per label or local protocol (decisions 1–3)", () => {
  const p = page("em_antithrombotic");
  assert.equal(p.blocks.find(b => b.type === "redflags").text,
    "hemodynamic instability despite resuscitation, ongoing transfusion need, or bleeding into a critical site (intracranial, airway): treat as life-threatening; ICU; reversal with hematology input.");
  const t2 = steps(p).find(s => s.id === "T2");
  assert.ok(t2.items.includes("INR below 2: no label dose; discuss with hematology."));
  assert.ok(t2.items.includes("Apixaban or rivaroxaban: andexanet alfa where available, or 4-factor PCC; dose per product label or local protocol, with hematology."));
  const doses = p.blocks.find(b => b.type === "table" && b.columns[1] === "Dose").rows;
  assert.deepEqual(doses.map(r => r[0]), [
    "4-factor prothrombin complex concentrate (warfarin, life-threatening bleeding)",
    "Vitamin K (warfarin, life-threatening bleeding)",
    "Idarucizumab (dabigatran, life-threatening bleeding)",
    "Andexanet alfa or 4-factor prothrombin complex concentrate (apixaban or rivaroxaban, life-threatening bleeding)"]);
  assert.ok(doses[0][1].endsWith("INR below 2: no label dose; discuss with hematology"));
  assert.equal(doses[3][1], "Dose per product label or local protocol, with hematology");
  // No DOAC dose is calculated.
  assert.deepEqual(DOSES.filter(d => d.page === "em_antithrombotic").map(d => d.id), ["pcc_inr2", "pcc_inr4", "pcc_inr6"]);
});

test("N-acetylcysteine: dosing weight capped at 100 kg; 150 kg gives 15,000, 5,000 and 10,000 mg (decision 4)", () => {
  assert.equal(doseLine("nac_150", 150), "N-acetylcysteine 150 mg/kg over 1 hour: 15000 mg (dosing weight capped at 100 kg)");
  assert.equal(doseLine("nac_50", 150), "N-acetylcysteine 50 mg/kg over 4 hours: 5000 mg (dosing weight capped at 100 kg)");
  assert.equal(doseLine("nac_100", 150), "N-acetylcysteine 100 mg/kg over 16 hours: 10000 mg (dosing weight capped at 100 kg)");
  assert.equal(doseLine("nac_150", 100), "N-acetylcysteine 150 mg/kg over 1 hour: 15000 mg");
  assert.equal(doseLine("nac_150", 100.1), "N-acetylcysteine 150 mg/kg over 1 hour: 15000 mg (dosing weight capped at 100 kg)");
  assert.equal(doseLine("nac_150", 99.9), "N-acetylcysteine 150 mg/kg over 1 hour: 14985 mg");
  for (const sid of ["F2", "F3"]) {
    const s = steps(page("em_alf")).find(x => x.id === sid);
    assert.ok(s.items.includes("Dosing weight capped at 100 kg (US label); follow local protocol."), sid);
    assert.ok(!s.items.some(i => /100–110 kg/.test(i)), sid);
  }
});

test("King's College: Yes-only suggestion, with the incomplete-data line (decision 5)", () => {
  const d2 = steps(page("em_alf")).find(s => s.id === "D2");
  assert.ok(d2.items.includes("Not met may mean incomplete data; reassess at least daily."));
  assert.deepEqual(suggestedAnswers(page("em_alf"), "D2", { kings: { result: { met: false } } }), []);
  assert.deepEqual(suggestedAnswers(page("em_alf"), "D2", { kings: { result: { met: true } } }), ["Yes"]);
});

test("caustic: grade 3b care, and a grade 4 (perforation) answer suggested by Zargar grade 4 (decision 6)", () => {
  const p = page("em_caustic");
  const d2 = steps(p).find(s => s.id === "D2");
  assert.deepEqual(d2.options.map(o => o.value), ["0–2a", "2b–3a", "3b", "Grade 4 (perforation)"]);
  assert.deepEqual(steps(p).find(s => s.id === "K6").items,
    ["ICU, surgical evaluation.", "Monitor for perforation, enteral nutrition, stricture surveillance from about 3 weeks if no surgery."]);
  assert.deepEqual(steps(p).find(s => s.id === "K7").items, ["Grade 4 (perforation): emergency surgery."]);
  const row = findItem("zargar").table.rows.find(r => r[0] === "4");
  assert.deepEqual(suggestedAnswers(p, "D2", { zargar: { result: { row } } }), ["Grade 4 (perforation)"]);
});

test("caustic cites Hirota, ASGE 2006, for esophageal cancer surveillance (decision 7)", () => {
  const r = page("em_caustic").references.find(r => r.citation.startsWith("Hirota WK"));
  assert.ok(r && r.citation.endsWith("PMID 16564854"));
  assert.equal(r.url, "https://pubmed.ncbi.nlm.nih.gov/16564854/");
  assert.ok(SPEC_B9().includes("(PMID 16564854)](https://pubmed.ncbi.nlm.nih.gov/16564854/)"));
});

test("toxic megacolon doses: methylprednisolone 60 mg IV every 24 hours; vancomycin never IV for C. difficile (decision 9)", () => {
  const p = page("em_toxic_megacolon");
  const rows = Object.fromEntries(p.blocks.find(b => b.type === "table" && b.columns[1] === "Dose").rows);
  assert.equal(rows["Methylprednisolone (IBD, alternative)"], "60 mg IV every 24 hours");
  assert.equal(rows["Vancomycin (C. difficile)"], "500 mg orally or by nasogastric tube 4 times daily (never IV for C. difficile); add rectal vancomycin if ileus");
  assert.equal(rows["Metronidazole (C. difficile)"], "500 mg IV every 8 hours");
  assert.ok(steps(p).find(s => s.id === "M2").items[0].includes("methylprednisolone 60 mg IV every 24 hours"));
});

test("alcohol-associated hepatitis uses MELD or MELD-Na, not MELD 3.0 (decision 10)", () => {
  const p = page("em_aah");
  assert.ok(steps(p).find(s => s.id === "D1").items.includes("Use MELD or MELD-Na (B3.2), not MELD 3.0. Thresholds (>20; 21–51) come from studies using MELD."));
  assert.ok(steps(p).find(s => s.id === "H1").calcs.includes("meld_na"));
  assert.ok(!p.blocks.some(b => (b.calcs || []).includes("meld3")));
});

test("foreign body red flags give the destination (decision 11)", () => {
  assert.ok(page("em_foreign_body").blocks.find(b => b.type === "redflags").text.endsWith(
    "battery in the esophagus: emergent endoscopy (within 2 h, at most 6 h). Airway compromise: secure the airway first (ICU or anesthesia). Perforation signs: CT and surgical review."));
});

// ---------- acute-on-chronic liver failure page (B7.20, version 0.8.0) ----------

test("ACLF page: in the index after acute liver failure, and found by 'ACLF' and 'acute-on-chronic liver failure'", async () => {
  const { EMERGENCY_INDEX, search } = await import("../js/registry.js");
  const ids = EMERGENCY_INDEX.map(e => e.id);
  assert.equal(ids[ids.indexOf("em_alf") + 1], "em_aclf");
  assert.equal(EMERGENCY_INDEX.find(e => e.id === "em_aclf").name, "Acute-on-chronic liver failure (ACLF)");
  for (const q of ["ACLF", "acute-on-chronic liver failure", "Acute-on-chronic liver failure", "acute on chronic"]) {
    assert.ok(search(q).some(i => i.id === "em_aclf"), q);
  }
  assert.equal(search("acute-on-chronic liver failure")[0].id, "em_aclf");
});

test("ACLF page: Yes is suggested when the unrounded CLIF-C ACLF is above 70 or there are 4 or more organ failures", () => {
  const p = page("em_aclf");
  assert.deepEqual(p.blocks.flatMap(b => b.calcs || []), ["aclf", "clif_c_aclf"]);
  const run = (raw, failures = 0) => suggestedAnswers(p, "D2", { clif_c_aclf: { result: { raw, score: raw, failures } } });
  assert.deepEqual(run(70), []);
  assert.deepEqual(run(70.4), ["Yes"]);
  assert.deepEqual(run(70.04), ["Yes"]);
  assert.deepEqual(run(54), []);
  assert.deepEqual(run(54, 3), []);
  assert.deepEqual(run(54, 4), ["Yes"]);
  assert.deepEqual(run(null), []);
  // Incomplete calculator: no score, no failures counted.
  assert.deepEqual(suggestedAnswers(p, "D2", { clif_c_aclf: { result: { score: null, missing: ["INR"] } } }), []);
});

test("ACLF page: weight-based CRRT dose and nutrition targets; tidal volume is not calculated", () => {
  assert.equal(doseLine("aclf_crrt", 80), "Continuous renal replacement therapy, effluent dose 25–30 mL/kg/h: 2000–2400 mL/h");
  const a5 = steps(page("em_aclf")).find(s => s.id === "A5").items;
  assert.ok(a5.some(i => i.includes("lung-protective ventilation (6 mL/kg predicted body weight)")));
  assert.ok(a5.some(i => i.includes("continuous, effluent dose 25–30 mL/kg/h")));
  for (const id of ["aclf_energy", "aclf_protein", "aclf_glucose"]) assert.ok(doseLine(id, 80).startsWith("Target, not a dose. "), id);
  assert.ok(!DOSES.some(d => d.page === "em_aclf" && /mL\/kg\b(?!\/h)/.test(d.label)), "no tidal volume dose");
  const rows = Object.fromEntries(page("em_aclf").blocks.find(b => b.type === "table" && b.columns[1] === "Dose").rows);
  assert.equal(rows["Hydrocortisone (septic shock, norepinephrine >0.25 µg/kg/min)"], "50 mg IV every 6 hours (200 mg/day), maximum 10 days");
});

test("ACLF page: references link to their exact PubMed record", () => {
  const expect = { "European Association for the Study of the Liver. EASL Clinical Practice Guidelines on acute-on-chronic": "37364789",
    "Bajaj JS": "35006099", "Moreau R": "23474284", "Jalan R": "24950482", "Gustot T": "25877702", "Artru F": "28645736",
    "Engelmann C et al. Granulocyte": "34364917", "Wong F": "33657294", "Engelmann C et al. Validation of CLIF-C ACLF": "30305132" };
  const refs = page("em_aclf").references;
  for (const [start, pmid] of Object.entries(expect)) {
    const r = refs.find(r => r.citation.startsWith(start));
    assert.ok(r, start);
    assert.equal(r.url, `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, start);
    assert.ok(r.citation.endsWith(`PMID ${pmid}`), start);
    assert.ok(SPEC_B9().includes(`(PMID ${pmid})](https://pubmed.ncbi.nlm.nih.gov/${pmid}/)`), `B9 ${start}`);
  }
});
