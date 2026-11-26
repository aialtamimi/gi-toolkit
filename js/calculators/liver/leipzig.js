// SPEC.md B3.15 Leipzig score for Wilson disease
import { ref } from "../../refs.js";
import { INTEGER_NOTE } from "../../num.js";

const ND = { label: "Not done", value: "nd", points: 0 };
const opt = (label, points) => ({ label: `${label} (${points > 0 ? "+" : ""}${points})`, value: label, points });

export const ITEMS = [
  { id: "kf", label: "Kayser-Fleischer rings", options: [opt("Present", 2), opt("Absent", 0)] },
  { id: "neuro", label: "Neuropsychiatric symptoms or typical brain MRI", options: [opt("Severe", 2), opt("Mild", 1), opt("Absent", 0)] },
  { id: "cerulo", label: "Serum ceruloplasmin", options: [opt(">0.2 g/L", 0), opt("0.1–0.2 g/L", 1), opt("<0.1 g/L", 2)] },
  { id: "hemolysis", label: "Coombs-negative hemolytic anemia", options: [opt("Present", 1), opt("Absent", 0)] },
  { id: "livercu", label: "Liver copper (no cholestasis)", options: [opt(">4 µmol/g (>250 µg/g)", 2), opt("0.8–4 µmol/g", 1), opt("<0.8 µmol/g", -1)] },
  { id: "rhodanine", label: "Rhodanine-positive granules (only if no quantitative liver copper)", options: [opt("Present", 1)],
    showIf: v => v.livercu === undefined || v.livercu === "nd" },
  { id: "urinecu", label: "24-hour urinary copper (no acute hepatitis)", options: [opt("Normal", 0), opt("1–2 × ULN", 1), opt(">2 × ULN", 2), opt("Normal but >5 × ULN after D-penicillamine", 2)] },
  { id: "atp7b", label: "ATP7B mutations", options: [opt("Both chromosomes", 4), opt("One", 1), opt("None", 0)] }
];

export default {
  id: "leipzig",
  name: "Leipzig score for Wilson disease",
  short: "Leipzig",
  aliases: ["Leipzig", "Wilson disease", "Wilson's disease", "ceruloplasmin", "Ferenci"],
  category: "liver",
  use: "Diagnosis of Wilson disease. Each item can be marked \"not done\" (0 points).",
  inputs: ITEMS.map(it => ({ id: it.id, label: it.label, type: "radio", default: "nd", showIf: it.showIf,
    options: [ND, ...it.options] })),
  compute(v) {
    const breakdown = ITEMS.map(it => {
      const hidden = it.showIf && !it.showIf(v);
      const val = hidden ? "nd" : (v[it.id] ?? "nd");
      const o = it.options.find(o => o.value === val);
      return { item: it.label + (o ? `: ${o.value}` : ": not done"), points: o ? o.points : 0 };
    });
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: String(score), label: "Leipzig", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const text = "≥4 diagnosis established; 3 possible, more tests needed; ≤2 very unlikely.";
    if (r.score >= 4) return { band: "Diagnosis established", level: "neutral", text, copy: `Leipzig ${r.score}, diagnosis established` };
    if (r.score === 3) return { band: "Possible, more tests needed", level: "neutral", text, copy: `Leipzig ${r.score}, possible` };
    return { band: "Very unlikely", level: "neutral", text, copy: `Leipzig ${r.score}, very unlikely` };
  },
  references: [ref("Ferenci P et al. Liver Int 2003; EASL 2012", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8584493/table/jcm-10-05097-t001")]
};
