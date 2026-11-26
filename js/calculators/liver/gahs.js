// SPEC.md B3.6 Glasgow Alcoholic Hepatitis Score
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

export const pts = {
  age: a => a < 50 ? 1 : 2,
  wbc: w => w < 15 ? 1 : 2,
  urea: u => u < 5 ? 1 : 2,
  inr: i => i < 1.5 ? 1 : i <= 2.0 ? 2 : 3,
  bili: b => b < 125 ? 1 : b <= 250 ? 2 : 3
};

export default {
  id: "gahs",
  name: "Glasgow Alcoholic Hepatitis Score",
  short: "GAHS",
  aliases: ["GAHS", "Glasgow alcoholic hepatitis", "alcohol-associated hepatitis"],
  category: "liver",
  use: "Prognosis in alcohol-associated hepatitis. Range 5–12.",
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "wbc", label: "WBC", type: "number", analyte: "wbc", base: "si", min: 0, max: 200 },
    { id: "urea", label: "Urea", type: "number", analyte: "urea", base: "si", min: 0, max: 150 },
    { id: "inr", label: "PT ratio or INR", type: "number", unit: "", min: 0.5, max: 20 },
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "si", min: 0, max: 2000 }
  ],
  compute(v) {
    const breakdown = [
      { item: "Age (years)", points: pts.age(v.age) },
      { item: "WBC (×10⁹/L)", points: pts.wbc(v.wbc) },
      { item: "Urea (mmol/L)", points: pts.urea(v.urea) },
      { item: "PT ratio or INR", points: pts.inr(v.inr) },
      { item: "Bilirubin (µmol/L)", points: pts.bili(v.bili) }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "GAHS", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    if (r.score >= 9) return { band: "Poor prognosis", level: "neutral",
      text: "≥9 = poor prognosis (28-day survival about 46% untreated); in patients with DF ≥32, a GAHS ≥9 identifies those most likely to benefit from corticosteroids.",
      copy: `GAHS ${r.score}, poor prognosis` };
    return { band: "Better prognosis", level: "neutral", text: "<9 = better prognosis (28-day survival about 87%).",
      copy: `GAHS ${r.score}, better prognosis` };
  },
  references: [ref("Forrest EH et al. Glasgow alcoholic hepatitis score. Gut 2005")]
};
