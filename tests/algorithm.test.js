// Bedside algorithm pages (SPEC.md B7.0): every decision path from B8.8, every weight-based dose from B8.7,
// the dose table in B7.0, the privacy rule for the weight, and the earlier pages' text carried over.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { EMERGENCIES, findItem } from "../js/registry.js";
import { stepStates, shownSteps, steps, entryAnswers, pageText } from "../js/algorithm.js";
import { DOSES, doseLine, parseWeight, terlipressinMg, validWeight, WEIGHT_MIN, WEIGHT_MAX } from "../js/doses.js";
import { pathVectors, doseVectors, weightTable } from "./spec_b7.js";

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
    assert.ok(r.shownAs.startsWith(d.label + ": "), `${r.name}: label "${d.label}" vs SPEC "${r.shownAs}"`);
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
    const [g1, ml1] = val("albumin_day1").split(" ").filter(t => /\d/.test(t));
    assert.equal(num(g1), r1(1.5 * w)); assert.equal(num(ml1), r1(7.5 * w));
    const [g3, ml3] = val("albumin_day3").split(" ").filter(t => /\d/.test(t));
    assert.equal(num(g3), r1(w)); assert.equal(num(ml3), r1(5 * w));
    assert.equal(num(val("ringer_infusion").split(" ")[0]), r1(1.5 * w));
    assert.equal(num(val("ringer_bolus").split(" ")[0]), r1(10 * w));
    assert.equal(num(val("urine_output").split(" ")[0]), r1(0.5 * w));
    assert.ok(val("terlipressin").startsWith(`${terlipressinMg(w)} mg IV every 4 hours for 48 hours`));
  }
});

test("weight field: blank, text and out-of-range entries give no dose; comma decimals accepted", () => {
  assert.deepEqual(parseWeight(""), { weight: null, error: null });
  assert.equal(parseWeight("abc").error, "Enter a number");
  assert.equal(parseWeight("19.9").error, "Outside accepted input range 20 to 350 kg");
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
    "hematemesis, coffee-ground vomit, melena; shock index (HR/SBP) >1 = high risk.",
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
    "large-volume paracentesis during active SBP without albumin; non-steroidal anti-inflammatory drugs (NSAIDs); consider holding non-selective beta-blockers if SBP <90 mmHg, sodium <130 mmol/L or AKI."
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

test("terlipressin keeps the earlier dose text and adds the weight bands", () => {
  const row = page("em_ugib").blocks.find(b => b.type === "table" && b.columns[1] === "Dose").rows.find(r => r[0] === "Terlipressin");
  assert.ok(row[1].startsWith("2 mg IV every 4 hours for the first 48 hours, then 1 mg every 4 hours (adjust by weight and local protocol)."));
  assert.ok(row[1].includes("<50 kg 1 mg; 50–70 kg 1.5 mg; >70 kg 2 mg"));
});

test("every why line names a trial or guideline, or states the reason in one short line", () => {
  for (const p of EMERGENCIES.filter(p => p.kind === "algorithm")) {
    for (const b of p.blocks) if (b.why) assert.ok(b.why.length <= 160 && /\.$/.test(b.why), `${p.id}: ${b.why}`);
  }
});

test("every built-in calculator referenced in the request is on its page", () => {
  const calcs = id => page(id).blocks.flatMap(b => b.calcs || []);
  assert.deepEqual(calcs("em_ugib"), ["gbs", "aims65", "child_pugh", "forrest"]);
  assert.deepEqual(calcs("em_asuc"), ["truelove_witts", "asuc_day3"]);
  assert.deepEqual(calcs("em_sbp"), ["ascites"]);
  assert.deepEqual(calcs("em_pancreatitis"), ["marshall", "atlanta", "bisap", "sirs", "mctsi"]);
  assert.deepEqual(calcs("em_cholangitis"), ["tg18_cholangitis"]);
  for (const id of ["gbs", "forrest", "child_pugh", "truelove_witts", "asuc_day3", "tg18_cholangitis", "bisap", "ascites"]) assert.ok(findItem(id));
});
