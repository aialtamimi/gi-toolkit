// SPEC.md B5.5 Harvey-Bradshaw Index
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

const opts = labels => labels.map((label, i) => ({ label, value: i, points: i }));
export const COMPLICATIONS = [
  ["arthralgia", "Arthralgia"], ["uveitis", "Uveitis"], ["en", "Erythema nodosum"], ["aphthous", "Aphthous ulcers"],
  ["pg", "Pyoderma gangrenosum"], ["fissure", "Anal fissure"], ["fistula", "New fistula"], ["abscess", "Abscess"]
];

export function band(score) {
  if (score < 5) return { band: "Remission", level: "low" };
  if (score <= 7) return { band: "Mild", level: "low" };
  if (score <= 16) return { band: "Moderate", level: "intermediate" };
  return { band: "Severe", level: "high" };
}

export default {
  id: "hbi",
  name: "Harvey-Bradshaw Index",
  short: "HBI",
  aliases: ["HBI", "Harvey-Bradshaw", "Harvey Bradshaw", "Crohn's disease activity", "Crohn disease", "CD"],
  category: "ibd",
  use: "Crohn's disease activity. Use the previous day's values.",
  inputs: [
    { id: "wellbeing", label: "General well-being", type: "radio", options: opts(["Very well", "Slightly below par", "Poor", "Very poor", "Terrible"]) },
    { id: "pain", label: "Abdominal pain", type: "radio", options: opts(["None", "Mild", "Moderate", "Severe"]) },
    { id: "stools", label: "Liquid stools per day", type: "number", unit: "/day", min: 0, max: 50, integer: true },
    { id: "mass", label: "Abdominal mass", type: "radio", options: opts(["None", "Dubious", "Definite", "Definite and tender"]) },
    { type: "heading", label: "Complications (1 point each)" },
    ...COMPLICATIONS.map(([id, label]) => ({ id, label, type: "checkbox", points: 1 }))
  ],
  compute(v) {
    const comp = COMPLICATIONS.filter(([id]) => v[id]).length;
    const breakdown = [
      { item: "General well-being", points: v.wellbeing },
      { item: "Abdominal pain", points: v.pain },
      { item: "Liquid stools per day", points: v.stools },
      { item: "Abdominal mass", points: v.mass },
      { item: "Complications", points: comp }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "HBI", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const b = band(r.score);
    return { ...b, text: "<5 remission; 5–7 mild; 8–16 moderate; >16 severe.", copy: `HBI ${r.score}, ${b.band.toLowerCase()}` };
  },
  references: [ref("Harvey RF, Bradshaw JM. A simple index of Crohn's-disease activity. Lancet 1980")]
};
