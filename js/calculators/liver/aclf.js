// SPEC.md B3.17 ACLF grade, EASL-CLIF (CANONIC)
import { ref } from "../../refs.js";
import { isNum } from "../../num.js";

const MORTALITY = { 0: "4.7%", 1: "22.1%", 2: "32.0%", 3: "76.7%" };

export function organs(v) {
  const crDys = v.cr >= 1.5 && v.cr < 2.0;            // Creatinine 1.5–1.9 mg/dL
  const heDys = v.he === "1-2";
  const resp = v.vent || (isNum(v.pf) && v.pf <= 200) || (isNum(v.sf) && v.sf <= 214);
  return {
    failures: {
      Liver: v.bili >= 12,
      Kidney: v.cr >= 2.0 || !!v.rrt,
      Brain: v.he === "3-4",
      Coagulation: v.inr >= 2.5,
      Circulation: !!v.vaso,
      Respiration: !!resp
    },
    crDys, heDys
  };
}

export function grade(v) {
  const { failures, crDys, heDys } = organs(v);
  const failed = Object.keys(failures).filter(k => failures[k]);
  const n = failed.length;
  if (n === 0) return { grade: 0, failed, reason: "No organ failure" };
  if (n >= 3) return { grade: 3, failed, reason: "Three or more organ failures" };
  if (n === 2) return { grade: 2, failed, reason: "Two organ failures" };
  const o = failed[0];
  if (o === "Kidney") return { grade: 1, failed, reason: "Kidney failure alone" };
  if (o === "Brain") return crDys
    ? { grade: 1, failed, reason: "Brain failure with creatinine 1.5–1.9" }
    : { grade: 0, failed, reason: "Brain failure alone with creatinine <1.5" };
  return (crDys || heDys)
    ? { grade: 1, failed, reason: `One ${o.toLowerCase()} failure with creatinine 1.5–1.9 and/or HE grade 1–2` }
    : { grade: 0, failed, reason: `One non-kidney organ failure (${o.toLowerCase()}) with creatinine <1.5 and no HE` };
}

export default {
  id: "aclf",
  name: "ACLF grade, EASL-CLIF",
  short: "ACLF",
  aliases: ["ACLF", "acute-on-chronic liver failure", "CLIF", "EASL-CLIF", "CANONIC", "decompensated cirrhosis"],
  category: "liver",
  use: "For acutely decompensated cirrhosis.",
  inputs: [
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 },
    { id: "cr", label: "Creatinine", type: "number", analyte: "creatinine", base: "conv", min: 0, max: 30 },
    { id: "rrt", label: "Renal replacement therapy", type: "checkbox" },
    { id: "he", label: "Hepatic encephalopathy (West Haven)", type: "radio", default: "none", options: [
      { label: "None", value: "none" }, { label: "Grade 1–2", value: "1-2" }, { label: "Grade 3–4", value: "3-4" } ] },
    { id: "inr", label: "INR", type: "number", unit: "", min: 0.5, max: 20 },
    { id: "vaso", label: "Vasopressors (terlipressin and/or catecholamines)", type: "checkbox" },
    { type: "heading", label: "Respiration (any one = failure)" },
    { id: "pf", label: "PaO2/FiO2", type: "number", unit: "", min: 0, max: 700, optional: true },
    { id: "sf", label: "SpO2/FiO2", type: "number", unit: "", min: 0, max: 700, optional: true },
    { id: "vent", label: "Mechanical ventilation not for HE", type: "checkbox" }
  ],
  compute(v) {
    const g = grade(v);
    const { failures, crDys, heDys } = organs(v);
    const breakdown = Object.keys(failures).map(k => ({ item: `${k} failure`, value: failures[k] ? "Yes" : "No" }));
    breakdown.push({ item: "Kidney dysfunction (creatinine 1.5–1.9 mg/dL)", value: crDys ? "Yes" : "No" },
      { item: "Brain dysfunction (HE grade 1–2)", value: heDys ? "Yes" : "No" });
    return { score: g.grade, ...g, display: g.grade === 0 ? "No ACLF" : `Grade ${g.grade}`, label: "ACLF",
      rounding: "Categorical; no rounding.", breakdown };
  },
  interpret(r) {
    const band = r.grade === 0 ? "No ACLF" : `ACLF grade ${r.grade}`;
    return { band, level: "neutral", text: `${r.reason}. 28-day mortality: ${MORTALITY[r.grade]}.`,
      // SPEC.md B3.17: every result links to the acute-on-chronic liver failure page (B7.20).
      links: [{ label: "Acute-on-chronic liver failure emergency page", target: "em_aclf" }],
      copy: `${band} (${r.failed.length} organ failure${r.failed.length === 1 ? "" : "s"}${r.failed.length ? ": " + r.failed.join(", ").toLowerCase() : ""})` };
  },
  notes: "Failure definitions: liver bilirubin ≥12 mg/dL; kidney creatinine ≥2.0 mg/dL or renal replacement therapy; brain HE grade 3–4; coagulation INR ≥2.5; circulation vasopressors; respiration PaO2/FiO2 ≤200, or SpO2/FiO2 ≤214, or mechanical ventilation not for HE.",
  references: [ref("Moreau R et al. Acute-on-chronic liver failure (CANONIC). Gastroenterology 2013. PMID 23474284", "https://pubmed.ncbi.nlm.nih.gov/23474284/")]
};
