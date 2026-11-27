// SPEC.md B5.10 Jalan criteria for toxic megacolon (checklist; built into the toxic megacolon page, B7.6)
import { ref } from "../../refs.js";

export const PART_B = [
  { id: "fever", label: "Fever >38.6 °C" },
  { id: "hr", label: "Heart rate >120/min" },
  { id: "neut", label: "Neutrophil count >10.5 ×10⁹/L" },
  { id: "anemia", label: "Anemia" }
];
export const PART_C = [
  { id: "dehydration", label: "Dehydration" },
  { id: "consciousness", label: "Altered consciousness" },
  { id: "electrolytes", label: "Electrolyte disturbance" },
  { id: "hypotension", label: "Hypotension" }
];

export function jalan(v) {
  const a = !!v.dilatation;
  const b = PART_B.filter(x => v[x.id]).length;
  const c = PART_C.filter(x => v[x.id]).length;
  return { a, b, c, met: a && b >= 3 && c >= 1 };
}

const ACTION = "Toxic megacolon: urgent surgical review and the toxic megacolon algorithm.";

export default {
  id: "jalan",
  name: "Jalan criteria for toxic megacolon",
  short: "Jalan criteria",
  aliases: ["Jalan criteria", "Jalan", "toxic megacolon", "toxic colitis", "colonic dilatation"],
  category: "ibd",
  use: "Checklist: colonic dilatation >6 cm plus at least 3 of 4 (B) plus at least 1 of 4 (C).",
  inputs: [
    { type: "heading", label: "A. Required" },
    { id: "dilatation", label: "Colonic dilatation >6 cm on X-ray", type: "checkbox" },
    { type: "heading", label: "B. At least 3 of 4" },
    ...PART_B.map(x => ({ id: x.id, label: x.label, type: "checkbox" })),
    { type: "heading", label: "C. At least 1 of 4" },
    ...PART_C.map(x => ({ id: x.id, label: x.label, type: "checkbox" }))
  ],
  compute(v) {
    const r = jalan(v);
    return { score: r.met ? 1 : 0, ...r, display: r.met ? "Criteria met" : "Criteria not met", label: "Jalan criteria",
      rounding: "Checklist; no rounding.",
      breakdown: [
        { item: "A. Colonic dilatation >6 cm on X-ray", value: r.a ? "Yes" : "No" },
        { item: "B. Fever, heart rate, neutrophils, anemia (at least 3 of 4)", value: `${r.b} of 4` },
        { item: "C. Dehydration, altered consciousness, electrolyte disturbance, hypotension (at least 1 of 4)", value: `${r.c} of 4` }
      ] };
  },
  interpret(r) {
    if (r.met) return { band: "Criteria met", level: "high", action: ACTION,
      links: [{ label: "Toxic megacolon emergency page", target: "em_toxic_megacolon" }],
      copy: `Jalan criteria met (B ${r.b} of 4, C ${r.c} of 4)` };
    return { band: "Criteria not met", level: "neutral",
      copy: `Jalan criteria not met (A ${r.a ? "yes" : "no"}, B ${r.b} of 4, C ${r.c} of 4)` };
  },
  references: [ref("Jalan KN et al. An experience of ulcerative colitis. I. Toxic dilation in 55 cases. Gastroenterology 1969;57(1):68-82 (Jalan criteria). PMID 5305933", "https://pubmed.ncbi.nlm.nih.gov/5305933/")]
};
