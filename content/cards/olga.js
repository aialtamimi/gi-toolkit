// SPEC.md B6.18 OLGA and OLGIM gastritis staging (calculator)
import { ref } from "../../js/refs.js";

export const GRADES = ["none", "mild", "moderate", "severe"];
const LABEL = { none: "None", mild: "Mild", moderate: "Moderate", severe: "Severe" };
// MATRIX[antrum][corpus], rows antrum none → severe, columns corpus none → severe.
export const MATRIX = [
  ["0", "I", "II", "II"],
  ["I", "I", "II", "III"],
  ["II", "II", "III", "IV"],
  ["III", "III", "IV", "IV"]
];
export const HIGH_ACTION = "H. pylori eradication and high-quality endoscopy every 3 years (MAPS III).";
export const LOW_ACTION = "Eradicate H. pylori; no routine surveillance unless other risk factors (first-degree family history, incomplete intestinal metaplasia, persistent H. pylori): individualize.";

export const stageOf = (antrum, corpus) => MATRIX[GRADES.indexOf(antrum)][GRADES.indexOf(corpus)];

const gradeOptions = GRADES.map(g => ({ label: LABEL[g], value: g }));

export default {
  id: "olga",
  spec: "B6.18",
  name: "OLGA and OLGIM gastritis staging",
  short: "OLGA / OLGIM",
  aliases: ["OLGA", "OLGIM", "gastritis staging", "atrophic gastritis", "gastric intestinal metaplasia", "MAPS III", "gastric cancer risk"],
  category: "endoscopy",
  use: "Choose atrophy (OLGA) or intestinal metaplasia (OLGIM); score the antrum (including the incisura) and the corpus each none, mild, moderate or severe.",
  inputs: [
    { id: "system", label: "Score", type: "radio", options: [
      { label: "Atrophy (OLGA)", value: "olga" }, { label: "Intestinal metaplasia (OLGIM)", value: "olgim" }] },
    { id: "antrum", label: "Antrum (including the incisura)", type: "radio", options: gradeOptions },
    { id: "corpus", label: "Corpus", type: "radio", options: gradeOptions }
  ],
  compute(v) {
    const st = stageOf(v.antrum, v.corpus);
    const sys = v.system === "olga" ? "OLGA" : "OLGIM";
    return { score: null, stage: st, system: sys, display: `${sys} stage ${st}`, label: sys,
      breakdown: [{ item: "Antrum (including the incisura)", value: LABEL[v.antrum] }, { item: "Corpus", value: LABEL[v.corpus] },
        { item: "Stage from the B6.18 matrix", value: st }],
      rounding: "Matrix lookup; no calculation." };
  },
  interpret(r) {
    const high = r.stage === "III" || r.stage === "IV";
    return { band: high ? "High risk (stage III–IV)" : "Lower risk (stage 0–II)", level: high ? "high" : "low", action: high ? HIGH_ACTION : LOW_ACTION,
      copy: `${r.system} stage ${r.stage}, ${high ? "high risk" : "lower risk"}` };
  },
  table: { columns: ["Antrum \\ Corpus", "None", "Mild", "Moderate", "Severe"],
    rows: GRADES.map((g, i) => [LABEL[g], ...MATRIX[i]]) },
  references: [
    ref("Rugge M et al. Gastritis staging in clinical practice: the OLGA staging system. Gut 2007. PMID 17142647", "https://pubmed.ncbi.nlm.nih.gov/17142647/"),
    ref("Capelle LG et al. The staging of gastritis with the OLGA system by using intestinal metaplasia as an accurate alternative for atrophic gastritis. Gastrointest Endosc 2010. PMID 20381801", "https://pubmed.ncbi.nlm.nih.gov/20381801/"),
    ref("Dinis-Ribeiro M et al. Management of epithelial precancerous conditions and early neoplasia of the stomach (MAPS III). Endoscopy 2025. PMID 40112834", "https://pubmed.ncbi.nlm.nih.gov/40112834/")
  ]
};
