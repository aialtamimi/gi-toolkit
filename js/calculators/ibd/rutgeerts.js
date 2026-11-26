// SPEC.md B5.8 Rutgeerts score (selectable card)
import { ref } from "../../refs.js";

export const ROWS = [
  { score: "i0", finding: "No lesions" },
  { score: "i1", finding: "≤5 aphthous lesions" },
  { score: "i2", finding: ">5 aphthous lesions with normal mucosa between, or skip areas of larger lesions, or lesions confined to the ileocolonic anastomosis (<1 cm). Modified: i2a = lesions confined to the anastomosis; i2b = more than 5 aphthous ulcers or larger lesions in the neo-terminal ileum" },
  { score: "i3", finding: "Diffuse aphthous ileitis with diffusely inflamed mucosa" },
  { score: "i4", finding: "Diffuse inflammation with larger ulcers, nodules and/or narrowing" }
];
// Selectable options: i2 is selected as its modified subcategory (i2a or i2b), because the
// result differs between them (SPEC.md B5.8).
export const OPTIONS = [
  { value: "i0", row: "i0", label: "i0: No lesions", recurrence: false },
  { value: "i1", row: "i1", label: "i1: ≤5 aphthous lesions", recurrence: false },
  { value: "i2a", row: "i2", label: "i2a: Lesions confined to the anastomosis", recurrence: false },
  { value: "i2b", row: "i2", label: "i2b: More than 5 aphthous ulcers or larger lesions in the neo-terminal ileum", recurrence: true },
  { value: "i3", row: "i3", label: "i3: Diffuse aphthous ileitis with diffusely inflamed mucosa", recurrence: true },
  { value: "i4", row: "i4", label: "i4: Diffuse inflammation with larger ulcers, nodules and/or narrowing", recurrence: true }
];
export const I2A_NOTE = "i2a carries lower risk; individualize";

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
      breakdown: [{ item: "Finding", value: opt.value === opt.row ? row.finding : opt.label.replace(/^i2[ab]: /, "") }] };
  },
  interpret(r) {
    const recurrence = r.option.recurrence;
    return { band: recurrence ? "Endoscopic recurrence" : "No endoscopic recurrence", level: recurrence ? "high" : "low",
      text: recurrence ? undefined : "No endoscopic recurrence",
      action: recurrence ? "Endoscopic recurrence: consider escalating therapy." : undefined,
      notes: r.option.value === "i2a" ? [I2A_NOTE] : [],
      copy: `Rutgeerts: ${r.option.value}, ${recurrence ? "endoscopic recurrence" : "no endoscopic recurrence"}` };
  },
  table: { columns: ["Score", "Finding"], rows: ROWS.map(r => [r.score, r.finding]) },
  references: [ref("Rutgeerts P et al. Predictability of the postoperative course of Crohn's disease. Gastroenterology 1990")]
};
