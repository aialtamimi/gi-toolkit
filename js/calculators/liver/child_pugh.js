// SPEC.md B3.1 Child-Pugh (computed in mg/dL and g/dL)
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

export function biliPoints(b, cholestatic) {   // mg/dL
  if (cholestatic) return b < 4 ? 1 : b <= 10 ? 2 : 3;
  return b < 2 ? 1 : b <= 3 ? 2 : 3;
}
export const albPoints = a => a > 3.5 ? 1 : a >= 2.8 ? 2 : 3;   // g/dL
export const inrPoints = i => i < 1.7 ? 1 : i <= 2.3 ? 2 : 3;

const CLASSES = [
  { min: 5, max: 6, cls: "A", survival: "100% / 85%" },
  { min: 7, max: 9, cls: "B", survival: "80% / 60%" },
  { min: 10, max: 15, cls: "C", survival: "45% / 35%" }
];

export default {
  id: "child_pugh",
  name: "Child-Pugh",
  short: "Child-Pugh",
  aliases: ["Child-Pugh", "Child Pugh", "CTP", "Child-Turcotte-Pugh", "cirrhosis"],
  category: "liver",
  use: "Severity of cirrhosis. Range 5–15.",
  inputs: [
    { id: "cholestatic", label: "Cholestatic disease (PBC or PSC)", type: "checkbox" },
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 },
    { id: "alb", label: "Albumin", type: "number", analyte: "albumin", base: "conv", min: 0, max: 7 },
    { id: "inr", label: "INR", type: "number", unit: "", min: 0.5, max: 20 },
    { id: "ascites", label: "Ascites", type: "radio", options: [
      { label: "None", value: 1, points: 1 },
      { label: "Mild, or controlled with diuretics", value: 2, points: 2 },
      { label: "Moderate to severe, or refractory", value: 3, points: 3 } ] },
    { id: "he", label: "Hepatic encephalopathy", type: "radio", options: [
      { label: "None", value: 1, points: 1 },
      { label: "Grade 1–2, or controlled with medication", value: 2, points: 2 },
      { label: "Grade 3–4, or refractory", value: 3, points: 3 } ] }
  ],
  compute(v) {
    const breakdown = [
      { item: v.cholestatic ? "Bilirubin (cholestatic cutoffs, mg/dL)" : "Bilirubin (mg/dL)", points: biliPoints(v.bili, v.cholestatic) },
      { item: "Albumin (g/dL)", points: albPoints(v.alb) },
      { item: "INR", points: inrPoints(v.inr) },
      { item: "Ascites", points: v.ascites },
      { item: "Hepatic encephalopathy", points: v.he }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "Child-Pugh", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const c = CLASSES.find(c => r.score >= c.min && r.score <= c.max);
    return { band: `Class ${c.cls}`, level: "neutral",
      text: `Commonly cited survival (1 year / 2 years): ${c.survival}`,
      copy: `Child-Pugh ${r.score}, class ${c.cls}` };
  },
  notes: "Bilirubin cutoffs are applied in mg/dL; µmol/L entries are converted (÷ 17.1) before scoring.",
  references: [ref("Pugh RN et al. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg 1973")]
};
