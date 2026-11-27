// SPEC.md B10.2 Eckardt score (achalasia symptoms)
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

const FREQUENCY = ["None", "Occasional", "Daily", "Every meal"];
export const ITEMS = [
  ["dysphagia", "Dysphagia", FREQUENCY],
  ["regurgitation", "Regurgitation", FREQUENCY],
  ["pain", "Retrosternal pain", FREQUENCY],
  ["weight", "Weight loss", ["None", "<5 kg", "5–10 kg", ">10 kg"]]
];

export function stage(score) {
  if (score <= 1) return "0";
  if (score <= 3) return "I";
  if (score <= 6) return "II";
  return "III";
}

export default {
  id: "eckardt",
  name: "Eckardt score",
  short: "Eckardt",
  aliases: ["Eckardt", "Eckardt score", "achalasia symptom score", "achalasia", "achalasia treatment failure"],
  category: "motility",
  use: "Total 0–12. Stage 0: 0–1; stage I: 2–3; stage II: 4–6; stage III: >6. After treatment, a score >3 is treatment failure.",
  inputs: [
    ...ITEMS.map(([id, label, opts]) => ({ id, label, type: "radio", style: "rows",
      options: opts.map((text, pts) => ({ label: `${pts}: ${text}`, value: pts, points: pts })) })),
    { id: "timing", label: "Timing", type: "radio", options: [{ label: "Before treatment", value: "before" }, { label: "After treatment", value: "after" }] }
  ],
  compute(v) {
    const breakdown = ITEMS.map(([id, label]) => ({ item: label, points: v[id] }));
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    const st = stage(score);
    return { score, stage: st, after: v.timing === "after", breakdown, display: [`${score} of 12`, `Stage ${st}`], label: "Eckardt", rounding: INTEGER_NOTE };
  },
  interpret(r) {
    if (!r.after) return { band: `Stage ${r.stage}`, level: "neutral", copy: `Eckardt ${r.score}, stage ${r.stage}` };
    const failure = r.score > 3;
    const band = failure ? "Treatment failure (score >3)" : "No treatment failure (score 3 or less)";
    return { band, level: failure ? "high" : "low", text: `Stage ${r.stage}.`, copy: `Eckardt ${r.score} after treatment, ${band.toLowerCase()}` };
  },
  table: { columns: ["Item", "0", "1", "2", "3"], rows: ITEMS.map(([, label, opts]) => [label, ...opts]) },
  references: [ref("Eckardt VF et al. Predictors of outcome in patients with achalasia treated by pneumatic dilation. Gastroenterology 1992. PMID 1451966", "https://pubmed.ncbi.nlm.nih.gov/1451966/")]
};
