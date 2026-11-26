// SPEC.md B4.7 Modified CT severity index
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";
import { MONITORING_NOTE } from "./bisap.js";

export const INFLAMMATION = [
  { label: "Normal pancreas", value: 0, points: 0 },
  { label: "Intrinsic pancreatic abnormalities with or without peripancreatic fat inflammation", value: 2, points: 2 },
  { label: "Pancreatic or peripancreatic fluid collection, or peripancreatic fat necrosis", value: 4, points: 4 }
];
export const NECROSIS = [
  { label: "None", value: 0, points: 0 },
  { label: "≤30%", value: 2, points: 2 },
  { label: ">30%", value: 4, points: 4 }
];

export function band(score) {
  if (score <= 2) return { band: "Mild", level: "low" };
  if (score <= 6) return { band: "Moderate", level: "intermediate" };
  return { band: "Severe", level: "high" };
}

export default {
  id: "mctsi",
  name: "Modified CT severity index",
  short: "Modified CTSI",
  aliases: ["mCTSI", "CTSI", "modified CT severity index", "Mortele", "Balthazar", "acute pancreatitis", "necrosis"],
  category: "pancreas",
  use: "CT severity of acute pancreatitis. Range 0–10.",
  inputs: [
    { id: "inflammation", label: "Pancreatic inflammation", type: "radio", options: INFLAMMATION },
    { id: "necrosis", label: "Pancreatic necrosis", type: "radio", options: NECROSIS },
    { id: "extra", label: "Extrapancreatic complications: any of pleural effusion, ascites, vascular, parenchymal or GI tract involvement", type: "checkbox", points: 2 }
  ],
  compute(v) {
    const breakdown = [
      { item: `Pancreatic inflammation: ${INFLAMMATION.find(o => o.value === v.inflammation).label}`, points: v.inflammation },
      { item: `Pancreatic necrosis: ${NECROSIS.find(o => o.value === v.necrosis).label}`, points: v.necrosis },
      { item: "Extrapancreatic complications", points: v.extra ? 2 : 0 }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "Modified CTSI", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const b = band(r.score);
    return { ...b, text: "0–2 mild; 4–6 moderate; 8–10 severe.",
      notes: ["CT is best done 72–96 hours after onset; early CT underestimates necrosis.", MONITORING_NOTE],
      copy: `Modified CTSI ${r.score}, ${b.band.toLowerCase()}` };
  },
  references: [ref("Mortele KJ et al. A modified CT severity index for evaluating acute pancreatitis. AJR 2004")]
};
