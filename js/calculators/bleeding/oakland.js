// SPEC.md B2.4 Oakland Score
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

export const agePts = a => a < 40 ? 0 : a < 70 ? 1 : 2;
export const hrPts = h => h < 70 ? 0 : h < 90 ? 1 : h < 110 ? 2 : 3;
export const sbpPts = s => s < 90 ? 5 : s < 120 ? 4 : s < 130 ? 3 : s < 160 ? 2 : 0;
export const hbPts = h => h < 70 ? 22 : h < 90 ? 17 : h < 110 ? 13 : h < 130 ? 8 : h < 160 ? 4 : 0; // g/L

export default {
  id: "oakland",
  name: "Oakland Score",
  short: "Oakland",
  aliases: ["Oakland", "lower GI bleed", "LGIB", "safe discharge"],
  category: "bleeding",
  use: "Safe discharge in acute lower GI bleeding. Range 0–35.",
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "sex", label: "Sex", type: "radio", options: [{ label: "Female", value: "F", points: 0 }, { label: "Male", value: "M", points: 1 }] },
    { id: "prev", label: "Previous admission for lower GI bleeding", type: "checkbox", points: 1 },
    { id: "dre", label: "Digital rectal exam: blood", type: "checkbox", points: 1 },
    { id: "hr", label: "Heart rate", type: "number", unit: "/min", min: 0, max: 300 },
    { id: "sbp", label: "Systolic BP", type: "number", unit: "mmHg", min: 0, max: 300 },
    { id: "hb", label: "Hemoglobin", type: "number", analyte: "hemoglobin", base: "si", min: 0, max: 250 }
  ],
  compute(v) {
    const breakdown = [
      { item: "Age (years)", points: agePts(v.age) },
      { item: "Sex", points: v.sex === "M" ? 1 : 0 },
      { item: "Previous admission for lower GI bleeding", points: v.prev ? 1 : 0 },
      { item: "Digital rectal exam", points: v.dre ? 1 : 0 },
      { item: "Heart rate (/min)", points: hrPts(v.hr) },
      { item: "Systolic BP (mmHg)", points: sbpPts(v.sbp) },
      { item: "Hemoglobin (g/L)", points: hbPts(v.hb) }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "Oakland", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    if (r.score <= 8) return { band: "Low", level: "low",
      action: "About 95% probability of safe discharge. Consider early discharge with outpatient colonoscopy if no other reason to admit (ACG 2023, BSG 2019).",
      copy: `Oakland ${r.score}, low risk` };
    return { band: "Not low", level: "high", action: "Admit for inpatient management.", copy: `Oakland ${r.score}, not low risk` };
  },
  references: [
    ref("Oakland K et al. Lancet Gastroenterol Hepatol 2017"),
    ref("Sengupta N et al. ACG guideline 2023 (lower GI bleeding)", "https://gastroenterology.acponline.org/archives/2023/03/24/2.htm"),
    ref("Oakland K et al. BSG guideline: diagnosis and management of acute lower gastrointestinal bleeding. Gut 2019")
  ]
};
