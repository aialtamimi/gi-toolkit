// SPEC.md B3.9 APRI
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export function fibrosisBand(a) { return a < 0.5 ? "unlikely" : a > 1.5 ? "likely" : "indeterminate"; }
export function cirrhosisBand(a) { return a < 1.0 ? "unlikely" : a > 2.0 ? "likely" : "indeterminate"; }

export default {
  id: "apri",
  name: "APRI",
  short: "APRI",
  aliases: ["APRI", "AST to platelet ratio", "fibrosis", "cirrhosis", "WHO"],
  category: "liver",
  use: "AST to platelet ratio index (WHO cutoffs).",
  inputs: [
    { id: "ast", label: "AST", type: "number", unit: "IU/L", min: 0, max: 20000 },
    { id: "astUln", label: "AST upper limit of normal", type: "number", unit: "IU/L", min: 1, max: 200 },
    { id: "plt", label: "Platelets", type: "number", analyte: "platelets", base: "si", min: 0.01, max: 2000 }
  ],
  compute(v) {
    const score = (v.ast / v.astUln) / v.plt * 100;
    return { score, display: fmt(score, 2), label: "APRI",
      rounding: "Displayed to 2 decimal places (round half up); bands use the unrounded value.",
      breakdown: [{ item: "AST / AST ULN", value: fmt(v.ast / v.astUln, 3) }, { item: "Platelets (×10⁹/L)", value: fmt(v.plt, 0) }],
      fibrosis: fibrosisBand(score), cirrhosis: cirrhosisBand(score) };
  },
  interpret(r) {
    const lines = [
      `Significant fibrosis (F2 or more): ${r.fibrosis} (<0.5 unlikely, >1.5 likely).`,
      `Cirrhosis: ${r.cirrhosis} (<1.0 unlikely, >2.0 likely).`
    ];
    return { band: `Significant fibrosis ${r.fibrosis}; cirrhosis ${r.cirrhosis}`, level: "neutral", text: lines.join(" "),
      notes: ["Values in between the cutoffs are indeterminate."],
      copy: `APRI ${fmt(r.score, 2)}, significant fibrosis ${r.fibrosis}, cirrhosis ${r.cirrhosis}` };
  },
  references: [ref("WHO Guidelines for the prevention, care and treatment of persons with chronic hepatitis C infection (APRI cutoffs)")]
};
