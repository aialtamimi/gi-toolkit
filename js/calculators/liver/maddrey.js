// SPEC.md B3.4 Maddrey discriminant function
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export default {
  id: "maddrey",
  name: "Maddrey discriminant function",
  short: "Maddrey DF",
  aliases: ["Maddrey", "DF", "discriminant function", "alcoholic hepatitis", "alcohol-associated hepatitis"],
  category: "liver",
  use: "Severity of alcohol-associated hepatitis.",
  inputs: [
    { id: "pt", label: "PT, patient", type: "number", unit: "seconds", min: 0, max: 200 },
    { id: "ptc", label: "PT, control", type: "number", unit: "seconds", min: 0, max: 100 },
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 }
  ],
  compute(v) {
    const ptTerm = 4.6 * (v.pt - v.ptc);
    const df = ptTerm + v.bili;
    return { score: df, display: fmt(df, 1), label: "DF",
      rounding: "Displayed to 1 decimal place (round half up); the band uses the unrounded value.",
      breakdown: [{ item: "4.6 × (PT patient − PT control)", value: fmt(ptTerm, 2) }, { item: "Bilirubin (mg/dL)", value: fmt(v.bili, 2) }] };
  },
  interpret(r) {
    if (r.score >= 32) return { band: "Severe alcohol-associated hepatitis", level: "neutral",
      action: "Consider prednisolone 40 mg once daily for 28 days if no contraindication (active infection, uncontrolled GI bleeding, renal failure, pancreatitis). Reassess with Lille on day 7.",
      copy: `Maddrey DF ${fmt(r.score, 1)}, severe` };
    return { band: "Not severe", level: "neutral", copy: `Maddrey DF ${fmt(r.score, 1)}, not severe` };
  },
  references: [ref("Maddrey WC et al. Corticosteroid therapy of alcoholic hepatitis. Gastroenterology 1978")]
};
