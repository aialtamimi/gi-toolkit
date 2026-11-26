// SPEC.md B3.10 NAFLD Fibrosis Score
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export default {
  id: "nfs",
  name: "NAFLD Fibrosis Score",
  short: "NFS",
  aliases: ["NFS", "NAFLD fibrosis score", "MASLD", "fibrosis"],
  category: "liver",
  use: "Probability of advanced fibrosis in NAFLD/MASLD.",
  inputs: [
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "bmi", label: "BMI", type: "number", unit: "kg/m²", min: 5, max: 100 },
    { id: "ifg", label: "IFG or diabetes", type: "checkbox" },
    { id: "ast", label: "AST", type: "number", unit: "IU/L", min: 0, max: 20000 },
    { id: "alt", label: "ALT", type: "number", unit: "IU/L", min: 0.01, max: 20000 },
    { id: "plt", label: "Platelets", type: "number", analyte: "platelets", base: "si", min: 0, max: 2000 },
    { id: "alb", label: "Albumin", type: "number", analyte: "albumin", base: "conv", min: 0, max: 7 }
  ],
  compute(v) {
    const terms = [
      { item: "Constant", value: -1.675 },
      { item: "0.037 × age", value: 0.037 * v.age },
      { item: "0.094 × BMI", value: 0.094 * v.bmi },
      { item: "1.13 × IFG or diabetes", value: v.ifg ? 1.13 : 0 },
      { item: "0.99 × AST/ALT", value: 0.99 * (v.ast / v.alt) },
      { item: "−0.013 × platelets", value: -0.013 * v.plt },
      { item: "−0.66 × albumin (g/dL)", value: -0.66 * v.alb }
    ];
    const score = terms.reduce((s, t) => s + t.value, 0);
    return { score, age: v.age, display: fmt(score, 2), label: "NFS",
      rounding: "Displayed to 2 decimal places (round half up); bands use the unrounded value.",
      breakdown: terms.map(t => ({ item: t.item, value: fmt(t.value, 3) })) };
  },
  interpret(r) {
    const low = r.age >= 65 ? 0.12 : -1.455;
    const lowTxt = r.age >= 65 ? "≤0.12 (age ≥65)" : "≤−1.455";
    const text = `Low probability ${lowTxt}; high probability ≥0.676; between = indeterminate.`;
    if (r.score <= low) return { band: "Low probability of advanced fibrosis", level: "low", text, copy: `NFS ${fmt(r.score, 2)}, low probability` };
    if (r.score >= 0.676) return { band: "High probability of advanced fibrosis", level: "high", text, copy: `NFS ${fmt(r.score, 2)}, high probability` };
    return { band: "Indeterminate", level: "intermediate", text, copy: `NFS ${fmt(r.score, 2)}, indeterminate` };
  },
  references: [ref("Angulo P et al. The NAFLD fibrosis score. Hepatology 2007")]
};
