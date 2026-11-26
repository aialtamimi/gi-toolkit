// SPEC.md B5.7 SES-CD
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

export const SEGMENTS = [
  ["ileum", "Ileum"], ["right", "Right colon"], ["transverse", "Transverse colon"], ["left", "Left colon and sigmoid"], ["rectum", "Rectum"]
];
const opts = labels => labels.map((label, i) => ({ label, value: i, points: i }));
export const VARIABLES = [
  ["size", "Size of ulcers", opts(["None", "Aphthous (0.1–0.5 cm)", "Large (0.5–2 cm)", "Very large (>2 cm)"])],
  ["ulcerated", "Ulcerated surface", opts(["None", "<10%", "10–30%", ">30%"])],
  ["affected", "Affected surface", opts(["Unaffected", "<50%", "50–75%", ">75%"])],
  ["narrowing", "Narrowing", opts(["None", "Single, can be passed", "Multiple, can be passed", "Cannot be passed"])]
];

export function band(score) {
  if (score <= 2) return { band: "Remission", level: "low" };
  if (score <= 6) return { band: "Mild", level: "low" };
  if (score <= 15) return { band: "Moderate", level: "intermediate" };
  return { band: "Severe", level: "high" };
}

export default {
  id: "ses_cd",
  name: "SES-CD",
  short: "SES-CD",
  aliases: ["SES-CD", "Simple Endoscopic Score for Crohn's Disease", "Crohn's endoscopy", "Crohn disease", "CD"],
  category: "ibd",
  use: "Score 4 variables in each of 5 segments. Total 0–56. Mark segments not reached; they are excluded from the total.",
  inputs: SEGMENTS.flatMap(([seg, name]) => [
    { type: "heading", label: name },
    { id: `${seg}_nr`, label: `${name}: not reached`, type: "checkbox" },
    ...VARIABLES.map(([vid, vlabel, options]) => ({ id: `${seg}_${vid}`, label: `${name}: ${vlabel.toLowerCase()}`, type: "radio",
      default: 0, options, showIf: v => !v[`${seg}_nr`] }))
  ]),
  compute(v) {
    const breakdown = [];
    const notReached = [];
    let score = 0;
    for (const [seg, name] of SEGMENTS) {
      if (v[`${seg}_nr`]) { notReached.push(name); breakdown.push({ item: name, value: "not reached" }); continue; }
      const sub = VARIABLES.reduce((s, [vid]) => s + v[`${seg}_${vid}`], 0);
      score += sub;
      breakdown.push({ item: `${name} (${VARIABLES.map(([vid]) => v[`${seg}_${vid}`]).join("/")})`, points: sub });
    }
    const details = notReached.length ? [{ label: "Segments not reached (excluded)", value: notReached.join(", ") }] : [];
    return { score, notReached, details, breakdown, display: String(score), label: "SES-CD", rounding: INTEGER_NOTE };
  },
  interpret(r) {
    const b = band(r.score);
    return { ...b, text: "0–2 remission; 3–6 mild; 7–15 moderate; ≥16 severe.",
      copy: `SES-CD ${r.score}, ${b.band.toLowerCase()}${r.notReached.length ? ` (not reached: ${r.notReached.join(", ").toLowerCase()})` : ""}` };
  },
  references: [ref("Daperno M et al. Development and validation of a new, simplified endoscopic activity score for Crohn's disease: the SES-CD. Gastrointest Endosc 2004")]
};
