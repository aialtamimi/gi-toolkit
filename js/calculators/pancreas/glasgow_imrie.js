// SPEC.md B4.3 Glasgow-Imrie score (PANCREAS)
import { ref } from "../../refs.js";
import { INTEGER_NOTE, isNum } from "../../num.js";
import { MONITORING_NOTE } from "./bisap.js";

// PaO2 cutoff as written in the spec for each unit: <8 kPa (<60 mmHg). No conversion is applied.
export function pao2Low(pao2, unit) { return unit === "kpa" ? pao2 < 8 : pao2 < 60; }

export default {
  id: "glasgow_imrie",
  name: "Glasgow-Imrie score",
  short: "Glasgow-Imrie",
  aliases: ["Glasgow-Imrie", "Glasgow Imrie", "Imrie", "modified Glasgow", "PANCREAS", "acute pancreatitis", "pancreatitis severity"],
  category: "pancreas",
  use: "Acute pancreatitis. One point each, within 48 hours (mnemonic PANCREAS).",
  inputs: [
    { id: "pao2Unit", label: "PaO2 unit", type: "radio", default: "mmhg", options: [
      { label: "mmHg", value: "mmhg" }, { label: "kPa", value: "kpa" } ] },
    { id: "pao2", label: "P, PaO2", type: "number", unit: "mmHg or kPa (as selected)", min: 0, max: 800 },
    { id: "age", label: "A, Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "wbc", label: "N, Neutrophils (WBC)", type: "number", analyte: "wbc", base: "si", min: 0, max: 500 },
    { id: "calcium", label: "C, Calcium", type: "number", analyte: "calcium", base: "si", min: 0, max: 10 },
    { id: "urea", label: "R, Renal (urea)", type: "number", analyte: "urea", base: "si", min: 0, max: 150 },
    { id: "ldh", label: "E, Enzymes: LDH", type: "number", unit: "IU/L", min: 0, max: 100000, optional: true },
    { id: "ast", label: "E, Enzymes: AST", type: "number", unit: "IU/L", min: 0, max: 100000, optional: true,
      help: "Enter LDH, AST or both. The item scores if LDH >600 IU/L or AST >200 IU/L." },
    { id: "albumin", label: "A, Albumin", type: "number", analyte: "albumin", base: "si", min: 0, max: 70 },
    { id: "glucose", label: "S, Sugar (glucose)", type: "number", analyte: "glucose", base: "si", min: 0, max: 200 }
  ],
  compute(v) {
    const enzymesEntered = isNum(v.ldh) || isNum(v.ast);
    const enzymes = (isNum(v.ldh) && v.ldh > 600) || (isNum(v.ast) && v.ast > 200);
    const breakdown = [
      { item: `P, PaO2 <8 kPa (<60 mmHg)`, points: pao2Low(v.pao2, v.pao2Unit) ? 1 : 0 },
      { item: "A, Age >55 years", points: v.age > 55 ? 1 : 0 },
      { item: "N, Neutrophils (WBC) >15 ×10⁹/L", points: v.wbc > 15 ? 1 : 0 },
      { item: "C, Calcium <2.0 mmol/L", points: v.calcium < 2.0 ? 1 : 0 },
      { item: "R, Renal (urea) >16 mmol/L", points: v.urea > 16 ? 1 : 0 },
      enzymesEntered ? { item: "E, Enzymes: LDH >600 IU/L or AST >200 IU/L", points: enzymes ? 1 : 0 }
        : { item: "E, Enzymes: LDH >600 IU/L or AST >200 IU/L", value: "pending (enter LDH or AST)" },
      { item: "A, Albumin <32 g/L", points: v.albumin < 32 ? 1 : 0 },
      { item: "S, Sugar (glucose) >10 mmol/L", points: v.glucose > 10 ? 1 : 0 }
    ];
    const score = breakdown.reduce((s, b) => s + (b.points || 0), 0);
    return { score, complete: enzymesEntered, display: String(score), label: enzymesEntered ? "Glasgow-Imrie" : "Glasgow-Imrie (incomplete)",
      rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const notes = [MONITORING_NOTE];
    if (r.score >= 3) return { band: "Severe pancreatitis", level: "high", text: "≥3 = severe pancreatitis.",
      action: "Consider HDU or ICU.", notes, copy: `Glasgow-Imrie ${r.score}, severe pancreatitis` };
    if (!r.complete) return { band: "Incomplete: enter LDH or AST", level: "neutral",
      text: "≥3 = severe pancreatitis. The enzymes item is not yet scored.", notes, copy: `Glasgow-Imrie ${r.score}, enzymes pending` };
    return { band: "Score below 3", level: "low", text: "≥3 = severe pancreatitis; this score is below 3.", notes,
      copy: `Glasgow-Imrie ${r.score}, below severe threshold` };
  },
  notes: "Use the worst values within 48 hours. Calcium, urea, albumin and glucose are compared in SI units, the units of the original criteria.",
  references: [
    ref("Blamey SL et al. Prognostic factors in acute pancreatitis. Gut 1984"),
    ref("Tenner S et al. ACG guideline: management of acute pancreatitis 2024", "https://guidelinecentral.com/guideline/12896")
  ]
};
