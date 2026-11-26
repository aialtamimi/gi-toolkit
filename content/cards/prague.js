// SPEC.md B6.3 Prague C and M criteria with Barrett's surveillance
import { ref } from "../../js/refs.js";

export const INTERVALS = [
  ["<1 cm", "Not addressed", "No routine biopsy or surveillance"],
  ["1 to <3 cm", "Every 5 years", "Every 5 years"],
  ["3 to <10 cm", "Every 3 years", "Every 3 years"],
  ["≥10 cm", "Every 3 years", "Refer to a Barrett's expert center"]
];
export function intervalRow(m) {
  if (m < 1) return INTERVALS[0];
  if (m < 3) return INTERVALS[1];
  if (m < 10) return INTERVALS[2];
  return INTERVALS[3];
}
export const DYSPLASIA_NOTE = "Dysplasia (indefinite, low or high grade) needs confirmation by a second expert GI pathologist and is managed differently.";
const num = x => String(Number(x));

export default {
  id: "prague",
  spec: "B6.3",
  name: "Prague C and M criteria with Barrett's surveillance",
  short: "Prague C and M",
  aliases: ["Prague", "Prague C and M", "Prague C&M", "Barrett's esophagus", "Barrett", "Barrett's surveillance"],
  category: "endoscopy",
  use: "Landmark: top of the gastric folds. Islands are not included. Surveillance intervals are for non-dysplastic Barrett's.",
  inputs: [
    { id: "c", label: "C = circumferential extent (cm above the gastroesophageal junction)", type: "number", unit: "cm", min: 0, max: 25 },
    { id: "m", label: "M = maximum extent", type: "number", unit: "cm", min: 0, max: 25 }
  ],
  compute(v) {
    if (v.c > v.m) return { invalid: true, score: null, display: "Check C and M", label: "Prague",
      rounding: "Values shown as entered.", breakdown: [] };
    const row = intervalRow(v.m);
    const code = `C${num(v.c)}M${num(v.m)}`;
    return { score: null, code, interval: row, row: { m: row[0] }, display: code, label: "Prague",
      rounding: "Values shown as entered.",
      breakdown: [{ item: "Maximum extent (M)", value: row[0] }, { item: "ACG 2022", value: row[1] }, { item: "ESGE 2023", value: row[2] }] };
  },
  interpret(r) {
    if (r.invalid) return { band: "C cannot be greater than M", level: "neutral",
      text: "C is the circumferential extent and M the maximum extent, so C is at most M.", copy: "Prague: check C and M" };
    const [m, acg, esge] = r.interval;
    const same = acg === esge;
    return { band: same ? `Surveillance: ${acg.toLowerCase()} (ACG and ESGE)` : `M ${m}: ACG ${acg.toLowerCase()}; ESGE ${esge.toLowerCase()}`,
      level: "neutral",
      text: "Barrett's esophagus requires intestinal metaplasia in columnar mucosa of the tubular esophagus. Surveillance intervals for non-dysplastic Barrett's:",
      sections: [{ title: "ACG 2022", lines: [acg] }, { title: "ESGE 2023", lines: [esge] }],
      notes: [DYSPLASIA_NOTE],
      copy: same ? `Prague ${r.code}; surveillance ${acg.toLowerCase()} (ACG and ESGE)` : `Prague ${r.code}; ACG ${acg.toLowerCase()}; ESGE ${esge.toLowerCase()}` };
  },
  table: { columns: ["Maximum extent (M)", "ACG 2022", "ESGE 2023"], rows: INTERVALS },
  references: [
    ref("Shaheen NJ et al. ACG Clinical Guideline: diagnosis and management of Barrett's esophagus 2022 (Table 5)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10259184/table/T5"),
    ref("Weusten B et al. ESGE guideline on Barrett's esophagus 2023", "https://www.thieme-connect.de/products/ejournals/html/10.1055/a-2176-2440?lang=de"),
    ref("Sharma P et al. The development and validation of an endoscopic grading system for Barrett's esophagus: the Prague C & M criteria. Gastroenterology 2006;131(5):1392-9. doi:10.1053/j.gastro.2006.08.032. PMID 17101315", "https://pubmed.ncbi.nlm.nih.gov/17101315/")
  ]
};
