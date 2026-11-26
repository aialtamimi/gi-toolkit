// SPEC.md B5.3 Mayo score and partial Mayo
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

const opts = labels => labels.map((label, i) => ({ label, value: i, points: i }));
export const ITEMS = [
  { id: "stool", label: "Stool frequency", options: opts(["Normal for patient", "1–2 more than normal", "3–4 more than normal", "≥5 more than normal"]) },
  { id: "bleeding", label: "Rectal bleeding", options: opts(["None", "Streaks of blood with stool less than half the time", "Obvious blood with stool most of the time", "Blood alone passed"]) },
  { id: "endo", label: "Endoscopy (full mode only)", full: true, options: opts(["Normal or inactive", "Mild: erythema, decreased vascular pattern, mild friability",
    "Moderate: marked erythema, absent vascular pattern, friability, erosions", "Severe: spontaneous bleeding, ulceration"]) },
  { id: "pga", label: "Physician global assessment", options: opts(["Normal", "Mild", "Moderate", "Severe"]) }
];

// Remission ≤2 with no subscore >1; a total of 0–5 that does not meet remission is mild.
export function fullBand(total, subs) {
  if (total <= 2 && subs.every(s => s <= 1)) return { band: "Remission", level: "low" };
  if (total <= 5) return { band: "Mild", level: "low" };
  if (total <= 10) return { band: "Moderate", level: "intermediate" };
  return { band: "Severe", level: "high" };
}
export function partialBand(total) {
  if (total <= 1) return { band: "Remission", level: "low" };
  if (total <= 4) return { band: "Mild", level: "low" };
  if (total <= 6) return { band: "Moderate", level: "intermediate" };
  return { band: "Severe", level: "high" };
}

const MES = ["Normal or inactive", "Mild", "Moderate", "Severe"];

export default {
  id: "mayo_uc",
  name: "Mayo score and partial Mayo",
  short: "Mayo (UC)",
  aliases: ["Mayo", "Mayo score", "partial Mayo", "Mayo endoscopic score", "MES", "ulcerative colitis activity", "UC"],
  category: "ibd",
  use: "Ulcerative colitis activity. Full (4 items, 0–12) and partial (no endoscopy, 0–9).",
  inputs: [
    { id: "mode", label: "Mode", type: "radio", default: "full", options: [
      { label: "Full Mayo (0–12)", value: "full" }, { label: "Partial Mayo, no endoscopy (0–9)", value: "partial" } ] },
    ...ITEMS.map(it => ({ id: it.id, label: it.label, type: "radio", options: it.options,
      showIf: it.full ? (v => v.mode === "full") : undefined }))
  ],
  compute(v) {
    const used = ITEMS.filter(it => !it.full || v.mode === "full");
    const breakdown = used.map(it => ({ item: it.label.replace(" (full mode only)", ""), points: v[it.id] }));
    const subs = used.map(it => v[it.id]);
    const score = subs.reduce((s, x) => s + x, 0);
    const details = v.mode === "full" ? [{ label: "Mayo endoscopic score (MES)", value: `${v.endo} (${MES[v.endo]})` }] : [];
    return { score, subs, mode: v.mode, mes: v.mode === "full" ? v.endo : null, details, breakdown,
      display: String(score), label: v.mode === "full" ? "Full Mayo" : "Partial Mayo", rounding: INTEGER_NOTE };
  },
  interpret(r) {
    const b = r.mode === "full" ? fullBand(r.score, r.subs) : partialBand(r.score);
    const text = r.mode === "full"
      ? "Full Mayo: remission ≤2 with no subscore >1; mild 3–5, or 0–2 with a subscore >1; moderate 6–10; severe 11–12."
      : "Partial Mayo: remission 0–1; mild 2–4; moderate 5–6; severe 7–9.";
    const name = r.mode === "full" ? "Mayo" : "Partial Mayo";
    return { band: b.band, level: b.level, text,
      notes: ["In trials, the modified Mayo score excludes the physician global assessment and scores friability as 2."],
      copy: `${name} ${r.score}, ${b.band.toLowerCase()}${r.mes !== null ? `; MES ${r.mes}` : ""}` };
  },
  references: [ref("Schroeder KW et al. Coated oral 5-aminosalicylic acid therapy for mildly to moderately active ulcerative colitis. NEJM 1987"),
    ref("Lewis JD et al. Use of the noninvasive components of the Mayo score to assess clinical response in ulcerative colitis. Inflamm Bowel Dis 2008")]
};
