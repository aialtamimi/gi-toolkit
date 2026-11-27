// SPEC.md B2.1 Glasgow-Blatchford Score
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

export function ureaPoints(u) {           // mmol/L
  if (u < 6.5) return 0;
  if (u < 8.0) return 2;
  if (u < 10.0) return 3;
  if (u <= 25.0) return 4;
  return 6;
}
export function hbPoints(hb, sex) {       // g/dL
  if (sex === "M") {
    if (hb >= 13.0) return 0;
    if (hb >= 12.0) return 1;
    if (hb >= 10.0) return 3;
    return 6;
  }
  if (hb >= 12.0) return 0;
  if (hb >= 10.0) return 1;
  return 6;
}
export function sbpPoints(s) {
  if (s >= 110) return 0;
  if (s >= 100) return 1;
  if (s >= 90) return 2;
  return 3;
}

export default {
  id: "gbs",
  name: "Glasgow-Blatchford Score",
  short: "GBS",
  aliases: ["GBS", "Blatchford", "upper GI bleed", "UGIB"],
  category: "bleeding",
  use: "Pre-endoscopy, upper GI bleeding, need for intervention. Range 0–23.",
  inputs: [
    { id: "urea", label: "Urea", type: "number", analyte: "urea", base: "si", min: 0, max: 150 },
    { id: "sex", label: "Sex", type: "radio", options: [{ label: "Male", value: "M" }, { label: "Female", value: "F" }] },
    { id: "hb", label: "Hemoglobin", type: "number", analyte: "hemoglobin", base: "conv", min: 0, max: 25 },
    { id: "sbp", label: "Systolic BP", type: "number", unit: "mmHg", min: 0, max: 300 },
    { id: "pulse", label: "Pulse", type: "number", unit: "/min", min: 0, max: 300 },
    { id: "melena", label: "Presentation with melena", type: "checkbox", points: 1 },
    { id: "syncope", label: "Presentation with syncope", type: "checkbox", points: 2 },
    { id: "hepatic", label: "Hepatic disease (history or clinical/lab evidence)", type: "checkbox", points: 2 },
    { id: "cardiac", label: "Cardiac failure (history or clinical/echo evidence)", type: "checkbox", points: 2 }
  ],
  compute(v) {
    const breakdown = [
      { item: "Urea (mmol/L)", points: ureaPoints(v.urea) },
      { item: `Hemoglobin, ${v.sex === "M" ? "men" : "women"} (g/dL)`, points: hbPoints(v.hb, v.sex) },
      { item: "Systolic BP (mmHg)", points: sbpPoints(v.sbp) },
      { item: "Pulse ≥100/min", points: v.pulse >= 100 ? 1 : 0 },
      { item: "Presentation with melena", points: v.melena ? 1 : 0 },
      { item: "Presentation with syncope", points: v.syncope ? 2 : 0 },
      { item: "Hepatic disease", points: v.hepatic ? 2 : 0 },
      { item: "Cardiac failure", points: v.cardiac ? 2 : 0 }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "GBS", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const notes = ["In high-risk patients (GBS ≥12), urgent endoscopy within 6 hours did not lower 30-day mortality compared with 6–24 hours (Lau, NEJM 2020)."];
    if (r.score <= 1) {
      return { band: "Low", level: "low",
        action: "Very low risk. ACG 2021 and ESGE 2021: outpatient management without inpatient endoscopy can be considered.",
        notes, copy: `GBS ${r.score}, low risk` };
    }
    return { band: "Not low", level: "high",
      action: "Admit. Resuscitate, then upper endoscopy within 24 hours. Higher scores mean higher need for transfusion or intervention.",
      notes, copy: `GBS ${r.score}, not low risk` };
  },
  references: [
    ref("Blatchford O et al. Lancet 2000 (points table)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5299211/table/tab2d"),
    ref("Laine L et al. ACG Clinical Guideline: Upper GI and Ulcer Bleeding. Am J Gastroenterol 2021. PMID 33929377", "https://pubmed.ncbi.nlm.nih.gov/33929377/"),
    ref("Gralnek IM et al. ESGE NVUGIH guideline update. Endoscopy 2021. PMID 33567467", "https://pubmed.ncbi.nlm.nih.gov/33567467/"),
    ref("Lau JYW et al. Timing of endoscopy for acute upper gastrointestinal bleeding. NEJM 2020. PMID 32242355", "https://pubmed.ncbi.nlm.nih.gov/32242355/")
  ]
};
