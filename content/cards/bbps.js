// SPEC.md B6.1 Boston Bowel Preparation Scale (calculator)
import { ref } from "../../js/refs.js";
import { INTEGER_NOTE } from "../../js/num.js";

export const ROWS = [
  ["0", "Unprepared segment; mucosa not seen because of solid stool that cannot be cleared"],
  ["1", "Portion of mucosa seen; other areas not well seen because of staining, residual stool and/or opaque liquid"],
  ["2", "Minor residual staining, small fragments of stool and/or opaque liquid, but mucosa well seen"],
  ["3", "Entire mucosa well seen; no residual staining, stool or opaque liquid"]
];
export const INADEQUATE_ACTION = "Repeat colonoscopy within 1 year (US Multi-Society Task Force).";
const SEGMENTS = [["right", "Right colon"], ["transverse", "Transverse colon"], ["left", "Left colon"]];
const options = ROWS.map(([s, d]) => ({ label: `${s}: ${d}`, value: Number(s) }));

export default {
  id: "bbps",
  spec: "B6.1",
  name: "Boston Bowel Preparation Scale",
  short: "BBPS",
  aliases: ["BBPS", "Boston Bowel Preparation Scale", "bowel preparation", "bowel prep", "colonoscopy preparation"],
  category: "endoscopy",
  use: "Score each segment (right, transverse, left) after cleaning. Total 0–9.",
  notes: "Total 0–9. Adequate preparation: 2 or more in every segment (total 6 or more). Inadequate: repeat colonoscopy within 1 year.",
  inputs: SEGMENTS.map(([id, label]) => ({ id, label, type: "radio", style: "rows", options })),
  compute(v) {
    const breakdown = SEGMENTS.map(([id, label]) => ({ item: label, points: v[id] }));
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    const lowSegment = SEGMENTS.filter(([id]) => v[id] < 2).map(([, l]) => l);
    return { score, lowSegment, adequate: score >= 6 && lowSegment.length === 0, breakdown,
      display: String(score), label: "BBPS", rounding: INTEGER_NOTE };
  },
  interpret(r) {
    const text = "Adequate preparation: total ≥6 with every segment ≥2.";
    if (r.adequate) return { band: "Adequate", level: "low", text, copy: `BBPS ${r.score}, adequate` };
    const why = r.score < 6 ? "total <6" : "a segment <2";
    return { band: `Inadequate (${why})`, level: "high", text, action: INADEQUATE_ACTION,
      copy: `BBPS ${r.score}, inadequate (${why})` };
  },
  table: { columns: ["Score", "Description"], rows: ROWS },
  references: [ref("Lai EJ et al. The Boston bowel preparation scale: a valid and reliable instrument for colonoscopy-oriented research. Gastrointest Endosc 2009")]
};
