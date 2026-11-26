// SPEC.md B2.2 AIMS65
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";
import { asEntered } from "../../units.js";

// Albumin <3.0 g/dL (<30 g/L): the cutoff for the unit entered is applied, no conversion (B1.5).
export function albuminLow(a) { return a.system === "si" ? a.value < 30 : a.value < 3.0; }

const MORTALITY = ["0.3%", "1.2%", "5.3%", "10.3%", "16.5%", "24.5%"];

export default {
  id: "aims65",
  name: "AIMS65",
  short: "AIMS65",
  aliases: ["AIMS65", "AIMS 65", "upper GI bleed", "UGIB mortality"],
  category: "bleeding",
  use: "In-hospital mortality in upper GI bleeding. One point each, range 0–5.",
  inputs: [
    { id: "albumin", label: "Albumin", type: "number", analyte: "albumin", base: "conv", min: 0, max: 7 },
    { id: "inr", label: "INR", type: "number", unit: "", min: 0.5, max: 20 },
    { id: "mental", label: "Mental status altered (GCS <14, disorientation, lethargy, stupor or coma)", type: "checkbox", points: 1 },
    { id: "sbp", label: "Systolic BP", type: "number", unit: "mmHg", min: 0, max: 300 },
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 }
  ],
  compute(v, ctx) {
    const breakdown = [
      { item: "A, Albumin <3.0 g/dL (<30 g/L)", points: albuminLow(asEntered(ctx, "albumin", v.albumin, "conv")) ? 1 : 0 },
      { item: "I, INR >1.5", points: v.inr > 1.5 ? 1 : 0 },
      { item: "M, Mental status altered", points: v.mental ? 1 : 0 },
      { item: "S, Systolic BP ≤90 mmHg", points: v.sbp <= 90 ? 1 : 0 },
      { item: "65, Age ≥65 years", points: v.age >= 65 ? 1 : 0 }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "AIMS65", rounding: INTEGER_NOTE, breakdown, mortality: MORTALITY[score] };
  },
  interpret(r) {
    const text = `In-hospital mortality: ${r.mortality}`;
    if (r.score <= 1) return { band: "Low", level: "low", text, copy: `AIMS65 ${r.score}, low, in-hospital mortality ${r.mortality}` };
    return { band: "High", level: "high", text,
      action: "Score ≥2 identifies higher mortality risk; consider monitored bed",
      copy: `AIMS65 ${r.score}, high, in-hospital mortality ${r.mortality}` };
  },
  notes: "Age criterion ≥65 years follows the MDCalc convention.",
  references: [ref("Saltzman JR et al. AIMS65 Gastrointest Endosc 2011")]
};
