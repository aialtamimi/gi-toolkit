// SPEC.md B4.1 BISAP
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

export const MONITORING_NOTE = "Scores support but do not replace close monitoring in the first 24–48 hours.";

export default {
  id: "bisap",
  name: "BISAP",
  short: "BISAP",
  aliases: ["BISAP", "acute pancreatitis", "pancreatitis severity", "Wu"],
  category: "pancreas",
  use: "Acute pancreatitis. One point each, range 0–5, within 24 hours of admission.",
  inputs: [
    // Original criterion is BUN >25 mg/dL (Wu, Gut 2008), so the formula unit is BUN mg/dL.
    { id: "bun", label: "BUN / urea", type: "number", analyte: "urea", base: "conv", min: 0, max: 400 },
    { id: "gcs", label: "Glasgow Coma Scale", type: "number", unit: "points (3–15)", min: 3, max: 15, integer: true },
    { id: "sirs", label: "SIRS: 2 or more SIRS criteria (B4.4)", type: "checkbox", points: 1 },
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "effusion", label: "Pleural effusion on imaging", type: "checkbox", points: 1 }
  ],
  compute(v) {
    const breakdown = [
      { item: "B, BUN >25 mg/dL (urea >8.9 mmol/L)", points: v.bun > 25 ? 1 : 0 },
      { item: "I, Impaired mental status (GCS <15)", points: v.gcs < 15 ? 1 : 0 },
      { item: "S, SIRS (2 or more SIRS criteria)", points: v.sirs ? 1 : 0 },
      { item: "A, Age >60 years", points: v.age > 60 ? 1 : 0 },
      { item: "P, Pleural effusion on imaging", points: v.effusion ? 1 : 0 }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "BISAP", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const links = [{ label: "SIRS criteria calculator", target: "sirs" }];
    if (r.score <= 2) return { band: "Lower risk", level: "low", text: "0–2 = lower risk.", links, notes: [MONITORING_NOTE],
      copy: `BISAP ${r.score}, lower risk` };
    return { band: "Higher risk", level: "high", text: "≥3 = higher risk of organ failure and in-hospital mortality.", links, notes: [MONITORING_NOTE],
      copy: `BISAP ${r.score}, higher risk` };
  },
  notes: "BUN is compared in mg/dL, the unit of the original criterion; a urea value entered in mmol/L is converted first (urea mmol/L = BUN mg/dL × 0.357).",
  references: [
    ref("Wu BU et al. The early prediction of mortality in acute pancreatitis: a large population-based study. Gut 2008"),
    ref("Tenner S et al. ACG guideline: management of acute pancreatitis 2024", "https://guidelinecentral.com/guideline/12896")
  ]
};
