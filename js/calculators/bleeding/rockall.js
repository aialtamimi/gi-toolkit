// SPEC.md B2.3 Rockall Score (pre-endoscopy and complete on one screen)
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

export function agePoints(a) { return a < 60 ? 0 : a < 80 ? 1 : 2; }
export function shockPoints(sbp, pulse) {
  if (sbp < 100) return 2;           // Hypotension
  return pulse >= 100 ? 1 : 0;       // Tachycardia / None
}
const SHOCK_LABEL = ["None (SBP ≥100 and pulse <100)", "Tachycardia (SBP ≥100 and pulse ≥100)", "Hypotension (SBP <100)"];

export default {
  id: "rockall",
  name: "Rockall Score",
  short: "Rockall",
  aliases: ["Rockall", "upper GI bleed", "rebleeding", "UGIB mortality"],
  category: "bleeding",
  use: "Rebleeding and mortality. Pre-endoscopy (first three items, 0–7) and complete (all five, 0–11).",
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "sbp", label: "Systolic BP", type: "number", unit: "mmHg", min: 0, max: 300 },
    { id: "pulse", label: "Pulse", type: "number", unit: "/min", min: 0, max: 300 },
    { id: "comorbidity", label: "Comorbidity", type: "radio", options: [
      { label: "None major", value: 0, points: 0 },
      { label: "Cardiac failure, ischemic heart disease, any major comorbidity", value: 2, points: 2 },
      { label: "Renal failure, liver failure, disseminated malignancy", value: 3, points: 3 }
    ] },
    { type: "heading", label: "After endoscopy (complete score)" },
    { id: "diagnosis", label: "Diagnosis", type: "radio", optional: true, options: [
      { label: "Mallory-Weiss tear, or no lesion and no stigmata", value: 0, points: 0 },
      { label: "All other diagnoses", value: 1, points: 1 },
      { label: "Upper GI malignancy", value: 2, points: 2 }
    ] },
    { id: "stigmata", label: "Stigmata of recent hemorrhage", type: "radio", optional: true, options: [
      { label: "None or dark spot only", value: 0, points: 0 },
      { label: "Blood in upper GI tract, adherent clot, visible or spurting vessel", value: 2, points: 2 }
    ] }
  ],
  compute(v) {
    const shock = shockPoints(v.sbp, v.pulse);
    const breakdown = [
      { item: "Age", points: agePoints(v.age) },
      { item: `Shock: ${SHOCK_LABEL[shock]}`, points: shock },
      { item: "Comorbidity", points: v.comorbidity }
    ];
    const pre = breakdown.reduce((s, b) => s + b.points, 0);
    const hasComplete = v.diagnosis !== undefined && v.stigmata !== undefined;
    let complete = null;
    if (hasComplete) {
      breakdown.push({ item: "Diagnosis", points: v.diagnosis }, { item: "Stigmata of recent hemorrhage", points: v.stigmata });
      complete = pre + v.diagnosis + v.stigmata;
    }
    const details = [{ label: "Pre-endoscopy score (0–7)", value: String(pre) },
      { label: "Complete score (0–11)", value: hasComplete ? String(complete) : "Enter diagnosis and stigmata" }];
    return {
      score: hasComplete ? complete : pre, pre, complete,
      display: hasComplete ? String(complete) : String(pre),
      label: hasComplete ? "Complete Rockall" : "Pre-endoscopy Rockall",
      rounding: INTEGER_NOTE, breakdown, details
    };
  },
  interpret(r) {
    const lines = [];
    let band = "No interpretation band in SPEC.md for this score", level = "neutral";
    if (r.complete !== null) {
      if (r.complete <= 2) { band = "Low risk"; level = "low"; lines.push("Complete score ≤2 = low risk of rebleeding and death."); }
      else if (r.complete >= 8) { band = "High risk"; level = "high"; lines.push("Complete score ≥8 = high risk."); }
    } else if (r.pre === 0) {
      band = "Low risk"; level = "low"; lines.push("Pre-endoscopy score 0 = low risk.");
    }
    const copy = r.complete !== null
      ? `Rockall pre-endoscopy ${r.pre}, complete ${r.complete}${level !== "neutral" ? ", " + band.toLowerCase() : ""}`
      : `Rockall pre-endoscopy ${r.pre}${level !== "neutral" ? ", " + band.toLowerCase() : ""}`;
    return { band, level, text: lines.join(" "), copy,
      notes: ["Interpretation: pre-endoscopy score 0 = low risk; complete score ≤2 = low risk of rebleeding and death; complete score ≥8 = high risk."] };
  },
  notes: "Shock is derived automatically from SBP and pulse inputs.",
  references: [ref("Rockall TA et al. Gut 1996 (table)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4753192/table/T1")]
};
