// SPEC.md B3.21 CLIF-C OF and CLIF-C ACLF score
import { ref } from "../../refs.js";
import { fmt, isNum } from "../../num.js";

// Converted lab values can carry floating-point noise (205.2 µmol/L ÷ 17.1 = 11.999999999999998 mg/dL);
// compare cutoffs on the value trimmed to 12 significant digits so exact equivalents score correctly.
const clean = x => Number(x.toPrecision(12));

export function organScores(v) {
  const s = {}, missing = [];
  if (isNum(v.bili)) { const b = clean(v.bili); s.Liver = b < 6 ? 1 : b < 12 ? 2 : 3; } else missing.push("Bilirubin");
  if (v.rrt) s.Kidney = 3;
  else if (isNum(v.cr)) { const c = clean(v.cr); s.Kidney = c < 2 ? 1 : c < 3.5 ? 2 : 3; } else missing.push("Creatinine (or renal replacement therapy)");
  s.Brain = { none: 1, "1-2": 2, "3-4": 3 }[v.he];
  if (isNum(v.inr)) s.Coagulation = v.inr < 2 ? 1 : v.inr < 2.5 ? 2 : 3; else missing.push("INR");
  if (v.vaso) s.Circulation = 3;
  else if (isNum(v.map)) s.Circulation = v.map >= 70 ? 1 : 2; else missing.push("MAP (or vasopressors)");
  if (v.vent) s.Respiration = 3;
  else if (isNum(v.pf)) s.Respiration = v.pf > 300 ? 1 : v.pf > 200 ? 2 : 3;
  else if (isNum(v.sf)) s.Respiration = v.sf > 357 ? 1 : v.sf > 214 ? 2 : 3;
  else missing.push("PaO2/FiO2 or SpO2/FiO2 (or mechanical ventilation not for HE)");
  return { scores: s, missing };
}

export const clifCAclf = (of, age, wbc) => 10 * (0.33 * of + 0.04 * age + 0.63 * Math.log(wbc) - 2);

// Organ failures by the EASL-CLIF definitions (B3.17), counted from the CLIF-C OF inputs: every organ scoring 3,
// plus kidney failure from creatinine ≥2 mg/dL (kidney score 2 or 3).
export function organFailures(scores) {
  return Object.keys(scores).filter(k => (k === "Kidney" ? scores[k] >= 2 : scores[k] === 3));
}

const ACTION = "After 3–7 days of full organ support, with 4 or more organ failures or a score above 70 and no transplant option: discuss withdrawal of organ support and palliative care with the family (B7.20).";
const NOTE_ABOVE_70 = "A score of 70 or more after 48 h of ICU support was associated with 100% 28-day mortality in one ICU cohort (Engelmann, Crit Care 2018).";
const LINK = { label: "Acute-on-chronic liver failure emergency page", target: "em_aclf" };

export default {
  id: "clif_c_aclf",
  name: "CLIF-C OF and CLIF-C ACLF score",
  short: "CLIF-C ACLF",
  aliases: ["CLIF-C ACLF", "CLIF-C OF", "CLIF-C", "ACLF score", "acute-on-chronic liver failure", "ACLF prognosis"],
  category: "liver",
  use: "Prognosis in ACLF. CLIF-C OF (6–18) from six organs, then the CLIF-C ACLF score with age and WBC.",
  inputs: [
    { type: "heading", label: "CLIF-C OF" },
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 },
    { id: "cr", label: "Creatinine", type: "number", analyte: "creatinine", base: "conv", min: 0, max: 30, optional: true },
    { id: "rrt", label: "Renal replacement therapy", type: "checkbox" },
    { id: "he", label: "Hepatic encephalopathy (West Haven)", type: "radio", default: "none", options: [
      { label: "None", value: "none" }, { label: "Grade 1–2", value: "1-2" }, { label: "Grade 3–4, or intubated for HE", value: "3-4" } ] },
    { id: "inr", label: "INR", type: "number", unit: "", min: 0.5, max: 20 },
    { id: "map", label: "Mean arterial pressure (MAP)", type: "number", unit: "mmHg", min: 0, max: 250, optional: true },
    { id: "vaso", label: "Vasopressors", type: "checkbox" },
    { id: "pf", label: "PaO2/FiO2", type: "number", unit: "", min: 0, max: 700, optional: true, help: "Used when entered; otherwise SpO2/FiO2." },
    { id: "sf", label: "SpO2/FiO2", type: "number", unit: "", min: 0, max: 700, optional: true },
    { id: "vent", label: "Mechanical ventilation not for HE", type: "checkbox" },
    { type: "heading", label: "CLIF-C ACLF" },
    { id: "age", label: "Age", type: "number", unit: "years", min: 1, max: 120 },
    { id: "wbc", label: "WBC", type: "number", analyte: "wbc", base: "si", min: 0.1, max: 500 }
  ],
  compute(v) {
    const { scores, missing } = organScores(v);
    if (missing.length) {
      return { score: null, missing, display: "—", label: "Enter the missing items",
        breakdown: Object.entries(scores).map(([k, p]) => ({ item: k, points: p })), rounding: "Not calculated." };
    }
    const of = Object.values(scores).reduce((a, b) => a + b, 0);
    const raw = clifCAclf(of, v.age, v.wbc);
    const failed = organFailures(scores);
    return { score: raw, of, raw, organs: scores, failed, failures: failed.length,
      display: [`CLIF-C ACLF ${fmt(raw, 1)}`, `CLIF-C OF ${of}`, `Organ failures: ${failed.length}`], label: "CLIF-C",
      breakdown: [...Object.entries(scores).map(([k, p]) => ({ item: k, points: p })),
        { item: "CLIF-C OF (sum, 6–18)", points: of },
        { item: "CLIF-C ACLF = 10 × (0.33 × OF + 0.04 × age + 0.63 × ln WBC − 2)", value: fmt(raw, 1) },
        { item: "Organ failures (EASL-CLIF definitions)", value: failed.length ? `${failed.length}: ${failed.join(", ")}` : "0" }],
      rounding: "CLIF-C ACLF shown to 1 decimal place (round half up); the >70 cutoff uses the unrounded value." };
  },
  interpret(r) {
    if (r.missing) return { band: `Enter the missing items: ${r.missing.join("; ")}`, level: "neutral", links: [LINK],
      copy: "CLIF-C ACLF incomplete" };
    const high = r.raw > 70;
    const many = r.failures >= 4;
    return { band: high ? "CLIF-C ACLF above 70" : "CLIF-C ACLF 70 or less", level: high || many ? "high" : "neutral",
      text: `Organ failures (EASL-CLIF): ${r.failures}${r.failures ? ` (${r.failed.join(", ").toLowerCase()})` : ""}.`,
      action: high || many ? ACTION : undefined, notes: high ? [NOTE_ABOVE_70] : [], links: [LINK],
      copy: `CLIF-C ACLF ${fmt(r.raw, 1)} (CLIF-C OF ${r.of}, ${r.failures} organ failure${r.failures === 1 ? "" : "s"}), ${high ? "above 70" : "70 or less"}` };
  },
  references: [ref("Jalan R et al. Development and validation of a prognostic score to predict mortality in patients with acute-on-chronic liver failure (CLIF-C ACLF). J Hepatol 2014. PMID 24950482", "https://pubmed.ncbi.nlm.nih.gov/24950482/"),
    ref("Engelmann C et al. Validation of CLIF-C ACLF score to define a threshold for futility of intensive care support for patients with acute-on-chronic liver failure. Crit Care 2018. PMID 30305132", "https://pubmed.ncbi.nlm.nih.gov/30305132/")]
};
