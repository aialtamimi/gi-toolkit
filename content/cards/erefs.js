// SPEC.md B6.9 EREFS, endoscopic reference score for eosinophilic esophagitis (calculator)
import { ref } from "../../js/refs.js";
import { INTEGER_NOTE } from "../../js/num.js";

// [id, feature, options as [points, label]]
export const FEATURES = [
  ["edema", "Edema", [[0, "Absent"], [1, "Present"]]],
  ["rings", "Rings", [[0, "None"], [1, "Mild (subtle ridges)"], [2, "Moderate (distinct rings, standard scope passes)"], [3, "Severe (scope does not pass)"]]],
  ["exudates", "Exudates", [[0, "None"], [1, "Mild (10% or less of the surface)"], [2, "Severe (>10% of the surface)"]]],
  ["furrows", "Furrows", [[0, "None"], [1, "Mild"], [2, "Severe"]]],
  ["stricture", "Stricture", [[0, "Absent"], [1, "Present"]]]
];
export const REGIONS = [["p", "Proximal esophagus"], ["d", "Distal esophagus"]];
export const MINOR_NOTE = "Minor features, not scored: crepe-paper mucosa, narrow-caliber esophagus.";
export const USE_NOTE = "Score before biopsies; use the score to follow response to treatment.";
export const CUTOFF_NOTE = "No validated cut-off; higher scores mean more active disease. Use to compare over time; histology (15 or more eosinophils per high-power field) is still required.";

export default {
  id: "erefs",
  spec: "B6.9",
  name: "EREFS, endoscopic reference score for eosinophilic esophagitis",
  short: "EREFS",
  aliases: ["EREFS", "eosinophilic esophagitis", "EoE", "eosinophilic oesophagitis", "rings", "furrows", "exudates", "esophageal edema"],
  category: "endoscopy",
  use: "Score the proximal and the distal esophagus separately; each region 0–9, total 0–18.",
  inputs: REGIONS.flatMap(([r, region]) => [
    { type: "heading", label: region },
    ...FEATURES.map(([id, label, opts]) => ({ id: `${r}_${id}`, label, type: "radio", style: "rows",
      options: opts.map(([pts, text]) => ({ label: `${pts}: ${text}`, value: pts, points: pts })) }))
  ]),
  compute(v) {
    const region = r => FEATURES.reduce((s, [id]) => s + v[`${r}_${id}`], 0);
    const proximal = region("p"), distal = region("d");
    const score = proximal + distal;
    const breakdown = REGIONS.flatMap(([r, region]) => FEATURES.map(([id, label]) => ({ item: `${region}: ${label}`, points: v[`${r}_${id}`] })));
    return { score, proximal, distal, breakdown, label: "EREFS",
      display: [`Total ${score} of 18`, `Proximal ${proximal}, distal ${distal}`], rounding: INTEGER_NOTE };
  },
  interpret(r) {
    return { band: `Proximal ${r.proximal}, distal ${r.distal}, total ${r.score}`, level: "neutral",
      notes: [MINOR_NOTE, USE_NOTE, CUTOFF_NOTE],
      copy: `EREFS ${r.score} (proximal ${r.proximal}, distal ${r.distal})` };
  },
  table: { columns: ["Feature", "Grades"], rows: [
    ["Edema", "0 absent; 1 present"],
    ["Rings", "0 none; 1 mild (subtle ridges); 2 moderate (distinct rings, standard scope passes); 3 severe (scope does not pass)"],
    ["Exudates", "0 none; 1 mild (10% or less of the surface); 2 severe (>10% of the surface)"],
    ["Furrows", "0 none; 1 mild; 2 severe"],
    ["Stricture", "0 absent; 1 present"]
  ] },
  references: [ref("Hirano I et al. Endoscopic assessment of the oesophageal features of eosinophilic oesophagitis: validation of a novel classification and grading system. Gut 2013. PMID 22619364", "https://pubmed.ncbi.nlm.nih.gov/22619364/")]
};
