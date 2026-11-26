// SPEC.md B4.5 Modified Marshall score
import { ref } from "../../refs.js";
import { INTEGER_NOTE, fmt } from "../../num.js";
import { MONITORING_NOTE } from "./bisap.js";

// Respiratory, PaO2/FiO2: >400 = 0; 301–400 = 1; 201–300 = 2; 101–200 = 3; ≤101 = 4.
// Bands are applied as contiguous ranges from their upper limits (see PR ambiguities:
// non-integer ratios, and 101 which appears in both "101–200" and "≤101"; "≤101" is applied).
export function respPoints(pf) {
  if (pf > 400) return 0;
  if (pf > 300) return 1;
  if (pf > 200) return 2;
  if (pf > 101) return 3;
  return 4;
}
// Renal, creatinine µmol/L (original unit): ≤134 = 0; 134–169 = 1; 170–310 = 2; 311–439 = 3; >439 = 4.
export function renalPoints(cr) {
  if (cr <= 134) return 0;
  if (cr <= 169) return 1;
  if (cr <= 310) return 2;
  if (cr <= 439) return 3;
  return 4;
}
export const CV_OPTIONS = [
  { label: ">90", value: 0, points: 0 },
  { label: "<90, fluid responsive", value: 1, points: 1 },
  { label: "<90, not fluid responsive", value: 2, points: 2 },
  { label: "<90, pH <7.3", value: 3, points: 3 },
  { label: "<90, pH <7.2", value: 4, points: 4 }
];
const FIO2_HELP = "FiO2 estimate for non-ventilated patients: room air 0.21; 2 L/min 0.25; 4 L/min 0.30; 6–8 L/min 0.40; 9–10 L/min 0.50.";

export default {
  id: "marshall",
  name: "Modified Marshall score",
  short: "Modified Marshall",
  aliases: ["Marshall", "Modified Marshall", "organ failure", "acute pancreatitis", "revised Atlanta"],
  category: "pancreas",
  use: "Score each organ 0–4. Any organ ≥2 = organ failure.",
  inputs: [
    { id: "respMode", label: "Respiratory input", type: "radio", default: "ratio", options: [
      { label: "PaO2/FiO2 ratio", value: "ratio" }, { label: "PaO2 and FiO2", value: "calc" } ] },
    { id: "pf", label: "PaO2/FiO2", type: "number", unit: "", min: 0, max: 700, showIf: v => v.respMode === "ratio", help: FIO2_HELP },
    { id: "pao2", label: "PaO2", type: "number", unit: "mmHg", min: 0, max: 800, showIf: v => v.respMode === "calc" },
    { id: "fio2", label: "FiO2", type: "number", unit: "fraction (0.21–1.0)", min: 0.21, max: 1, showIf: v => v.respMode === "calc", help: FIO2_HELP },
    { id: "cr", label: "Creatinine", type: "number", analyte: "creatinine", base: "si", min: 0, max: 3000 },
    { id: "cv", label: "Cardiovascular, systolic BP off inotropes (mmHg)", type: "radio", options: CV_OPTIONS }
  ],
  compute(v) {
    const pf = v.respMode === "calc" ? v.pao2 / v.fio2 : v.pf;
    const resp = respPoints(pf), renal = renalPoints(v.cr), cv = v.cv;
    const breakdown = [
      { item: `Respiratory, PaO2/FiO2 ${fmt(pf, 0)}`, points: resp },
      { item: `Renal, creatinine ${fmt(v.cr, 0)} µmol/L`, points: renal },
      { item: `Cardiovascular, SBP ${CV_OPTIONS[cv].label}`, points: cv }
    ];
    const failed = [["Respiratory", resp], ["Renal", renal], ["Cardiovascular", cv]].filter(([, p]) => p >= 2).map(([n]) => n);
    const details = [{ label: "Respiratory", value: String(resp) }, { label: "Renal", value: String(renal) }, { label: "Cardiovascular", value: String(cv) }];
    return { score: Math.max(resp, renal, cv), resp, renal, cv, pf, failed, details, breakdown,
      display: failed.length ? "Organ failure" : "No organ failure", label: "Modified Marshall",
      rounding: `${INTEGER_NOTE} PaO2/FiO2 is shown to the nearest whole number; points use the unrounded ratio.` };
  },
  interpret(r) {
    const notes = ["No formal correction exists for pre-existing chronic kidney disease.", MONITORING_NOTE];
    const summary = `Respiratory ${r.resp}, renal ${r.renal}, cardiovascular ${r.cv}`;
    if (r.failed.length) return { band: "Organ failure present", level: "high",
      text: `${summary}. Any organ ≥2 = organ failure (${r.failed.join(", ").toLowerCase()}).`, notes,
      copy: `Modified Marshall: ${summary.toLowerCase()}; organ failure present` };
    return { band: "No organ failure", level: "low", text: `${summary}. Any organ ≥2 = organ failure; none is ≥2.`, notes,
      copy: `Modified Marshall: ${summary.toLowerCase()}; no organ failure` };
  },
  notes: "Renal points use creatinine in µmol/L, the unit of the original table; mg/dL entries are converted first (mg/dL = µmol/L ÷ 88.4).",
  references: [ref("Banks PA et al. Classification of acute pancreatitis 2012: revision of the Atlanta classification. Gut 2013 (table)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4753186/table/T3")]
};
