// SPEC.md B3.7 ABIC score
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export default {
  id: "abic",
  name: "ABIC score",
  short: "ABIC",
  aliases: ["ABIC", "alcoholic hepatitis", "alcohol-associated hepatitis"],
  category: "liver",
  use: "90-day survival in alcohol-associated hepatitis.",
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 },
    { id: "cr", label: "Creatinine", type: "number", analyte: "creatinine", base: "conv", min: 0, max: 30 },
    { id: "inr", label: "INR", type: "number", unit: "", min: 0.5, max: 20 }
  ],
  compute(v) {
    const terms = [
      { item: "0.1 × age", value: 0.1 * v.age },
      { item: "0.08 × bilirubin (mg/dL)", value: 0.08 * v.bili },
      { item: "0.3 × creatinine (mg/dL)", value: 0.3 * v.cr },
      { item: "0.8 × INR", value: 0.8 * v.inr }
    ];
    const score = terms.reduce((s, t) => s + t.value, 0);
    return { score, display: fmt(score, 2), label: "ABIC",
      rounding: "Displayed to 2 decimal places (round half up); the band uses the unrounded value.",
      breakdown: terms.map(t => ({ item: t.item, value: fmt(t.value, 3) })) };
  },
  interpret(r) {
    if (r.score < 6.71) return { band: "Low", level: "low", text: "Risk (90-day survival, Dominguez, AJG 2008): Low (about 100%)", copy: `ABIC ${fmt(r.score, 2)}, low risk` };
    if (r.score < 9.0) return { band: "Intermediate", level: "intermediate", text: "Risk (90-day survival, Dominguez, AJG 2008): Intermediate (about 70%)", copy: `ABIC ${fmt(r.score, 2)}, intermediate risk` };
    return { band: "High", level: "high", text: "Risk (90-day survival, Dominguez, AJG 2008): High (about 25%)", copy: `ABIC ${fmt(r.score, 2)}, high risk` };
  },
  references: [ref("Dominguez M et al. A new scoring system for prognostic stratification of patients with alcoholic hepatitis. Am J Gastroenterol 2008")]
};
