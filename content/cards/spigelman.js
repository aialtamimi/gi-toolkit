// SPEC.md B6.17 Spigelman classification of duodenal polyposis, modified (calculator)
import { ref } from "../../js/refs.js";
import { INTEGER_NOTE } from "../../js/num.js";

export const SURVEILLANCE = {
  0: "Every 4 years",
  I: "Every 2–3 years",
  II: "Every 1–3 years",
  III: "Every 6–12 months",
  IV: "Expert surveillance every 3–6 months and surgical evaluation"
};
export const AMPULLA_NOTE = "Assess the ampulla with a side-viewing scope.";

export function stage(points) {
  if (points <= 4) return "I";
  if (points <= 6) return "II";
  if (points <= 8) return "III";
  return "IV";
}

const hasPolyps = v => v.number !== undefined && v.number !== 0;

export default {
  id: "spigelman",
  spec: "B6.17",
  name: "Spigelman classification of duodenal polyposis, modified",
  short: "Spigelman",
  aliases: ["Spigelman", "duodenal polyposis", "familial adenomatous polyposis", "FAP", "duodenal adenoma", "ampullary adenoma"],
  category: "endoscopy",
  use: "No polyps = stage 0. Points: stage I 1–4, II 5–6, III 7–8, IV 9–12.",
  inputs: [
    { id: "number", label: "Number of polyps", type: "radio", style: "rows", options: [
      { label: "No polyps", value: 0 }, { label: "1–4 (1 point)", value: 1 }, { label: "5–20 (2 points)", value: 2 }, { label: ">20 (3 points)", value: 3 }] },
    { id: "size", label: "Polyp size", type: "radio", style: "rows", showIf: hasPolyps, options: [
      { label: "1–4 mm (1 point)", value: 1 }, { label: "5–10 mm (2 points)", value: 2 }, { label: ">10 mm (3 points)", value: 3 }] },
    { id: "histology", label: "Histology", type: "radio", style: "rows", showIf: hasPolyps, options: [
      { label: "Tubular (1 point)", value: 1 }, { label: "Tubulovillous (2 points)", value: 2 }, { label: "Villous (3 points)", value: 3 }] },
    { id: "dysplasia", label: "Dysplasia", type: "radio", style: "rows", showIf: hasPolyps, options: [
      { label: "Low-grade (1 point)", value: 1 }, { label: "High-grade (3 points)", value: 3 }] }
  ],
  compute(v) {
    if (v.number === 0) {
      return { score: 0, stage: "0", breakdown: [{ item: "Number of polyps: none", points: 0 }], display: "Stage 0", label: "Spigelman",
        rounding: INTEGER_NOTE };
    }
    const breakdown = [
      { item: "Number of polyps", points: v.number },
      { item: "Polyp size", points: v.size },
      { item: "Histology", points: v.histology },
      { item: "Dysplasia", points: v.dysplasia }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    const st = stage(score);
    return { score, stage: st, breakdown, display: [`Stage ${st}`, `${score} points`], label: "Spigelman", rounding: INTEGER_NOTE };
  },
  interpret(r) {
    return { band: `Stage ${r.stage}`, level: "neutral", action: `Surveillance (ACG 2015): ${SURVEILLANCE[r.stage]}.`, notes: [AMPULLA_NOTE],
      copy: r.stage === "0" ? "Spigelman stage 0 (no polyps)" : `Spigelman stage ${r.stage} (${r.score} points)` };
  },
  table: { columns: ["Item", "1 point", "2 points", "3 points"], rows: [
    ["Number of polyps", "1–4", "5–20", ">20"],
    ["Polyp size", "1–4 mm", "5–10 mm", ">10 mm"],
    ["Histology", "Tubular", "Tubulovillous", "Villous"],
    ["Dysplasia", "Low-grade", "", "High-grade"]
  ] },
  references: [
    ref("Spigelman AD et al. Upper gastrointestinal cancer in patients with familial adenomatous polyposis. Lancet 1989. PMID 2571019", "https://pubmed.ncbi.nlm.nih.gov/2571019/"),
    ref("Syngal S et al. ACG clinical guideline: genetic testing and management of hereditary gastrointestinal cancer syndromes. Am J Gastroenterol 2015. PMID 25645574", "https://pubmed.ncbi.nlm.nih.gov/25645574/")
  ]
};
