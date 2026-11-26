// SPEC.md B3.5 Lille model
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export default {
  id: "lille",
  name: "Lille model",
  short: "Lille",
  aliases: ["Lille", "steroid response", "alcoholic hepatitis", "alcohol-associated hepatitis", "prednisolone"],
  category: "liver",
  use: "Day-7 response to corticosteroids in alcohol-associated hepatitis.",
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "alb", label: "Albumin, day 0", type: "number", analyte: "albumin", base: "si", min: 0, max: 70 },
    { id: "bili0", label: "Bilirubin, day 0", type: "number", analyte: "bilirubin", base: "si", min: 0, max: 2000 },
    { id: "bili7", label: "Bilirubin, day 7", type: "number", analyte: "bilirubin", base: "si", min: 0, max: 2000 },
    { id: "cr", label: "Creatinine", type: "number", analyte: "creatinine", base: "conv", min: 0, max: 30 },
    { id: "pt", label: "PT, day 0", type: "number", unit: "seconds", min: 0, max: 200 }
  ],
  compute(v) {
    const renal = v.cr > 1.3 ? 1 : 0;
    const terms = [
      { item: "Constant", value: 3.19 },
      { item: "−0.101 × age", value: -0.101 * v.age },
      { item: "+0.147 × albumin d0 (g/L)", value: 0.147 * v.alb },
      { item: "+0.0165 × (bili d0 − bili d7) (µmol/L)", value: 0.0165 * (v.bili0 - v.bili7) },
      { item: `−0.206 × renal insufficiency (${renal}: creatinine ${renal ? ">" : "≤"} 1.3 mg/dL)`, value: -0.206 * renal },
      { item: "−0.0065 × bili d0 (µmol/L)", value: -0.0065 * v.bili0 },
      { item: "−0.0096 × PT d0 (s)", value: -0.0096 * v.pt }
    ];
    const R = terms.reduce((s, t) => s + t.value, 0);
    const lille = Math.exp(-R) / (1 + Math.exp(-R));
    return { score: lille, R, display: fmt(lille, 3), label: "Lille",
      rounding: "Displayed to 3 decimal places (round half up); the band uses the unrounded value.",
      details: [{ label: "R", value: fmt(R, 4) }],
      breakdown: terms.map(t => ({ item: t.item, value: fmt(t.value, 4) })) };
  },
  interpret(r) {
    if (r.score < 0.45) return { band: "Responder", level: "neutral", text: "Responder; 6-month survival about 85%",
      action: "Continue prednisolone to complete 28 days", copy: `Lille ${fmt(r.score, 3)}, responder` };
    return { band: "Non-responder", level: "neutral", text: "Non-responder; 6-month survival about 25%",
      action: "Stop corticosteroids; consider early liver transplant evaluation at an expert center",
      copy: `Lille ${fmt(r.score, 3)}, non-responder` };
  },
  notes: "Renal insufficiency = 1 if creatinine >1.3 mg/dL (>115 µmol/L), else 0. Creatinine entered in µmol/L is converted to mg/dL (÷ 88.4) before this test.",
  references: [ref("Louvet A et al. The Lille model. Hepatology 2007")]
};
