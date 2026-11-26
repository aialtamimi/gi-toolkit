// SPEC.md B3.8 FIB-4
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export default {
  id: "fib4",
  name: "FIB-4",
  short: "FIB-4",
  aliases: ["FIB-4", "FIB4", "fibrosis", "MASLD", "NAFLD", "hepatitis C", "HCV"],
  category: "liver",
  use: "Non-invasive fibrosis index.",
  inputs: [
    { id: "mode", label: "Mode", type: "radio", default: "masld", options: [
      { label: "MASLD (AASLD 2023)", value: "masld" },
      { label: "Viral hepatitis (original HIV/HCV derivation)", value: "viral" } ] },
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "ast", label: "AST", type: "number", unit: "IU/L", min: 0, max: 20000 },
    { id: "alt", label: "ALT", type: "number", unit: "IU/L", min: 0.01, max: 20000 },
    { id: "plt", label: "Platelets", type: "number", analyte: "platelets", base: "si", min: 0.01, max: 2000 }
  ],
  compute(v) {
    const score = (v.age * v.ast) / (v.plt * Math.sqrt(v.alt));
    return { score, display: fmt(score, 2), label: "FIB-4",
      rounding: "Displayed to 2 decimal places (round half up); bands use the unrounded value.",
      breakdown: [{ item: "age × AST", value: fmt(v.age * v.ast, 1) }, { item: "platelets × √ALT", value: fmt(v.plt * Math.sqrt(v.alt), 3) }],
      age: v.age, mode: v.mode };
  },
  interpret(r) {
    const notes = [];
    if (r.age < 35) notes.push("FIB-4 is less accurate under 35 years.");
    let band, level, action, text;
    if (r.mode === "viral") {
      text = "Viral hepatitis cutoffs (original HIV/HCV derivation): <1.45 low risk; 1.45–3.25 indeterminate; >3.25 high risk.";
      if (r.score < 1.45) { band = "Low risk"; level = "low"; }
      else if (r.score <= 3.25) { band = "Indeterminate"; level = "intermediate"; }
      else { band = "High risk"; level = "high"; }
    } else {
      const low = r.age >= 65 ? 2.0 : 1.3;
      text = r.age >= 65
        ? "MASLD cutoffs (AASLD 2023), age ≥65: low risk <2.0; indeterminate 2.0–2.67; high risk >2.67."
        : "MASLD cutoffs (AASLD 2023): low risk <1.3; indeterminate 1.3–2.67; high risk >2.67.";
      if (r.score < low) { band = "Low risk"; level = "low"; action = "Repeat in 1–3 years"; }
      else if (r.score <= 2.67) { band = "Indeterminate"; level = "intermediate"; action = "Elastography (VCTE) or ELF test"; }
      else { band = "High risk"; level = "high"; action = "Refer to hepatology; elastography"; }
    }
    return { band, level, text, action, notes, copy: `FIB-4 ${fmt(r.score, 2)} (${r.mode === "viral" ? "viral" : "MASLD"}), ${band.toLowerCase()}` };
  },
  references: [
    ref("Rinella ME et al. AASLD Practice Guidance on the clinical assessment and management of nonalcoholic fatty liver disease. Hepatology 2023"),
    ref("Sterling RK et al. Development of a simple noninvasive index to predict significant fibrosis in patients with HIV/HCV coinfection. Hepatology 2006")
  ]
};
