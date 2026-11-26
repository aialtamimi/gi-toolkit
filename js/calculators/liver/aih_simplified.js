// SPEC.md B3.14 Simplified autoimmune hepatitis score
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

export const iggPoints = x => x > 1.10 ? 2 : x > 1 ? 1 : 0;   // IgG as multiple of ULN

export default {
  id: "aih_simplified",
  name: "Simplified autoimmune hepatitis score",
  short: "AIH simplified",
  aliases: ["AIH", "autoimmune hepatitis", "Hennes", "simplified AIH score", "IAIHG"],
  category: "liver",
  use: "Simplified diagnostic criteria for autoimmune hepatitis.",
  inputs: [
    { id: "ab", label: "Autoantibodies (maximum 2 points in total)", type: "radio", options: [
      { label: "None of the below", value: 0, points: 0 },
      { label: "ANA or SMA ≥1:40", value: 1, points: 1 },
      { label: "ANA or SMA ≥1:80, or LKM ≥1:40, or SLA positive", value: 2, points: 2 } ] },
    { id: "igg", label: "IgG as a multiple of the upper limit of normal", type: "number", unit: "× ULN", min: 0, max: 10,
      help: ">ULN = 1 point; >1.10 × ULN = 2 points" },
    { id: "hist", label: "Liver histology", type: "radio", options: [
      { label: "Neither compatible nor typical, or not done", value: 0, points: 0 },
      { label: "Compatible with AIH", value: 1, points: 1 },
      { label: "Typical of AIH", value: 2, points: 2 } ] },
    { id: "noViral", label: "Absence of viral hepatitis", type: "checkbox", points: 2 }
  ],
  compute(v) {
    const breakdown = [
      { item: "Autoantibodies", points: v.ab },
      { item: "IgG", points: iggPoints(v.igg) },
      { item: "Liver histology", points: v.hist },
      { item: "Absence of viral hepatitis", points: v.noViral ? 2 : 0 }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "AIH score", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const text = "≥7 definite AIH; 6 probable AIH; ≤5 not diagnostic.";
    if (r.score >= 7) return { band: "Definite AIH", level: "neutral", text, copy: `Simplified AIH score ${r.score}, definite AIH` };
    if (r.score === 6) return { band: "Probable AIH", level: "neutral", text, copy: `Simplified AIH score ${r.score}, probable AIH` };
    return { band: "Not diagnostic", level: "neutral", text, copy: `Simplified AIH score ${r.score}, not diagnostic` };
  },
  references: [ref("Hennes EM et al. Hepatology 2008", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7366136/table/T1")]
};
