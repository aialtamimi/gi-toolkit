// SPEC.md B5.4 UCEIS
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

const opts = labels => labels.map((label, i) => ({ label, value: i, points: i }));
export const ITEMS = [
  { id: "vascular", label: "Vascular pattern", options: opts(["Normal (or blurring or patchy loss of capillary margins)", "Patchy obliteration", "Complete obliteration"]) },
  { id: "bleeding", label: "Bleeding", options: opts(["None", "Mucosal: spots or streaks of coagulated blood that wash away",
    "Luminal mild: some free liquid blood in the lumen", "Luminal moderate or severe: frank blood in the lumen or oozing after washing"]) },
  { id: "erosions", label: "Erosions and ulcers", options: opts(["None", "Erosions: tiny (≤5 mm) flat defects, white or yellow",
    "Superficial ulcer: larger (>5 mm) discrete fibrin-covered ulcers, still superficial", "Deep ulcer: deeper excavated defects with a slightly raised edge"]) }
];

export default {
  id: "uceis",
  name: "UCEIS",
  short: "UCEIS",
  aliases: ["UCEIS", "Ulcerative Colitis Endoscopic Index of Severity", "endoscopic severity", "ulcerative colitis", "UC"],
  category: "ibd",
  use: "Score the most severe area. Range 0–8.",
  inputs: ITEMS.map(it => ({ id: it.id, label: it.label, type: "radio", options: it.options })),
  compute(v) {
    const breakdown = ITEMS.map(it => ({ item: it.label, points: v[it.id] }));
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "UCEIS", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    return { band: `UCEIS ${r.score} of 8`, level: "neutral",
      notes: ["In acute severe UC, UCEIS ≥7 at admission predicts need for rescue therapy."],
      copy: `UCEIS ${r.score}` };
  },
  references: [ref("Travis SP et al. Developing an instrument to assess the endoscopic severity of ulcerative colitis: the UCEIS. Gut 2012 (descriptors)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3292713/table/tbl6")]
};
