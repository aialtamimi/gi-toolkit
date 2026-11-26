// SPEC.md B5.1 Truelove and Witts
import { ref } from "../../refs.js";
import { isNum } from "../../num.js";

export function systemic(v) {
  return [
    { item: "Heart rate >90/min", entered: isNum(v.hr), met: isNum(v.hr) && v.hr > 90 },
    { item: "Temperature >37.8 °C", entered: isNum(v.temp), met: isNum(v.temp) && v.temp > 37.8 },
    { item: "Hemoglobin <10.5 g/dL", entered: isNum(v.hb), met: isNum(v.hb) && v.hb < 10.5 },
    { item: "ESR >30 mm/h", entered: isNum(v.esr), met: isNum(v.esr) && v.esr > 30 },
    { item: "CRP >30 mg/L (accepted as an alternative to ESR)", entered: isNum(v.crp), met: isNum(v.crp) && v.crp > 30 }
  ];
}

export function classify(v) {
  const sys = systemic(v);
  const anySys = sys.some(s => s.met);
  if (v.stools >= 6 && v.blood === "bloody" && anySys) return { severity: "Severe", sys };
  if (v.stools < 4 && v.blood === "little" && v.mildConfirm && !anySys) return { severity: "Mild", sys };
  return { severity: "Moderate", sys };
}

const mildCandidate = v => isNum(v.stools) && v.stools < 4 && v.blood === "little";

export default {
  id: "truelove_witts",
  name: "Truelove and Witts",
  short: "Truelove and Witts",
  aliases: ["Truelove and Witts", "Truelove Witts", "acute severe ulcerative colitis", "ASUC", "ulcerative colitis severity", "UC"],
  category: "ibd",
  use: "Severity of ulcerative colitis flare.",
  inputs: [
    { id: "stools", label: "Stools per day", type: "number", unit: "/day", min: 0, max: 50, integer: true },
    { id: "blood", label: "Blood in stool", type: "radio", options: [
      { label: "Little or no blood", value: "little" }, { label: "Bloody stools", value: "bloody" } ] },
    { type: "heading", label: "Systemic features (enter what is available)" },
    { id: "hr", label: "Heart rate", type: "number", unit: "/min", min: 0, max: 300, optional: true },
    { id: "temp", label: "Temperature", type: "number", unit: "°C", min: 25, max: 45, optional: true },
    { id: "hb", label: "Hemoglobin", type: "number", analyte: "hemoglobin", base: "conv", min: 0, max: 25, optional: true },
    { id: "esr", label: "ESR", type: "number", unit: "mm/h", min: 0, max: 200, optional: true },
    { id: "crp", label: "CRP", type: "number", unit: "mg/L", min: 0, max: 1000, optional: true },
    { id: "mildConfirm", label: "No systemic toxicity and normal ESR", type: "checkbox", showIf: mildCandidate,
      help: "Mild needs all of: <4 stools per day, little or no blood, no systemic toxicity, normal ESR." }
  ],
  compute(v) {
    const c = classify(v);
    const breakdown = [
      { item: "Stools per day", value: String(v.stools) },
      { item: "Blood in stool", value: v.blood === "bloody" ? "Bloody stools" : "Little or no blood" },
      ...c.sys.map(s => ({ item: s.item, value: s.entered ? (s.met ? "Yes" : "No") : "not entered" }))
    ];
    if (mildCandidate(v)) breakdown.push({ item: "No systemic toxicity and normal ESR", value: v.mildConfirm ? "Yes" : "No" });
    return { score: null, severity: c.severity, breakdown, display: c.severity, label: "Truelove and Witts",
      rounding: "Categorical; no rounding." };
  },
  interpret(r) {
    if (r.severity === "Severe") return { band: "Severe (acute severe UC)", level: "high",
      text: "≥6 bloody stools per day AND at least one of: heart rate >90/min, temperature >37.8 °C, hemoglobin <10.5 g/dL, ESR >30 mm/h (CRP >30 mg/L accepted as an alternative).",
      action: "Acute severe ulcerative colitis: admit. Open the ASUC emergency page.",
      links: [{ label: "Acute severe UC emergency page", target: "em_asuc" }],
      copy: "Truelove and Witts: severe (acute severe UC)" };
    if (r.severity === "Mild") return { band: "Mild", level: "low",
      text: "<4 stools per day, little or no blood, no systemic toxicity, normal ESR.", copy: "Truelove and Witts: mild" };
    return { band: "Moderate", level: "intermediate", text: "Between mild and severe.", copy: "Truelove and Witts: moderate" };
  },
  table: { columns: ["Severity", "Criteria"], rows: [
    ["Severe (acute severe UC)", "≥6 bloody stools per day AND at least one of: heart rate >90/min, temperature >37.8 °C, hemoglobin <10.5 g/dL, ESR >30 mm/h (CRP >30 mg/L accepted as an alternative)"],
    ["Moderate", "Between mild and severe"],
    ["Mild", "<4 stools per day, little or no blood, no systemic toxicity, normal ESR"]
  ] },
  references: [ref("Truelove SC, Witts LJ. Cortisone in ulcerative colitis. BMJ 1955"),
    ref("Raine T et al. ECCO guidelines on therapeutics in ulcerative colitis. J Crohns Colitis 2022")]
};
