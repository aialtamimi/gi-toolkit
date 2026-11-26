// SPEC.md B5.8 Rutgeerts score (selectable card)
import { ref } from "../../refs.js";

export const ROWS = [
  { score: "i0", finding: "No lesions" },
  { score: "i1", finding: "≤5 aphthous lesions" },
  { score: "i2", finding: ">5 aphthous lesions with normal mucosa between, or skip areas of larger lesions, or lesions confined to the ileocolonic anastomosis (<1 cm). Modified: i2a = lesions confined to the anastomosis; i2b = more than 5 aphthous ulcers or larger lesions in the neo-terminal ileum" },
  { score: "i3", finding: "Diffuse aphthous ileitis with diffusely inflamed mucosa" },
  { score: "i4", finding: "Diffuse inflammation with larger ulcers, nodules and/or narrowing" }
];
// Selectable options: the i2 row plus its modified subcategories, both part of i2.
export const OPTIONS = [
  { value: "i0", row: "i0", label: "i0: No lesions" },
  { value: "i1", row: "i1", label: "i1: ≤5 aphthous lesions" },
  { value: "i2", row: "i2", label: "i2: >5 aphthous lesions with normal mucosa between, or skip areas of larger lesions, or lesions confined to the ileocolonic anastomosis (<1 cm)" },
  { value: "i2a", row: "i2", label: "i2a (modified): lesions confined to the anastomosis" },
  { value: "i2b", row: "i2", label: "i2b (modified): more than 5 aphthous ulcers or larger lesions in the neo-terminal ileum" },
  { value: "i3", row: "i3", label: "i3: Diffuse aphthous ileitis with diffusely inflamed mucosa" },
  { value: "i4", row: "i4", label: "i4: Diffuse inflammation with larger ulcers, nodules and/or narrowing" }
];

export default {
  id: "rutgeerts",
  name: "Rutgeerts score",
  short: "Rutgeerts",
  aliases: ["Rutgeerts", "postoperative recurrence", "post-operative Crohn's", "ileocolonic resection", "neo-terminal ileum", "Crohn disease"],
  category: "ibd",
  kind: "card",
  use: "Neo-terminal ileum 6–12 months after ileocolonic resection. Tap a score.",
  inputs: [{ id: "score", label: "Rutgeerts score", type: "radio", style: "rows",
    options: OPTIONS.map(o => ({ label: o.label, value: o.value })) }],
  compute(v) {
    const opt = OPTIONS.find(o => o.value === v.score);
    const row = ROWS.find(r => r.score === opt.row);
    return { score: null, option: opt, row, display: opt.value, label: "Rutgeerts", rounding: "Selection; no calculation.",
      breakdown: [{ item: "Finding", value: opt.value === opt.row ? row.finding : opt.label }] };
  },
  interpret(r) {
    const recurrence = r.row.score !== "i0" && r.row.score !== "i1";
    return { band: recurrence ? "Endoscopic recurrence" : "No endoscopic recurrence", level: recurrence ? "high" : "low",
      text: recurrence ? undefined : "No endoscopic recurrence",
      action: recurrence ? "Endoscopic recurrence: consider escalating therapy." : undefined,
      copy: `Rutgeerts: ${r.option.value}, ${recurrence ? "endoscopic recurrence" : "no endoscopic recurrence"}` };
  },
  table: { columns: ["Score", "Finding"], rows: ROWS.map(r => [r.score, r.finding]) },
  references: [ref("Rutgeerts P et al. Predictability of the postoperative course of Crohn's disease. Gastroenterology 1990")]
};
