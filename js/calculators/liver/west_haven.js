// SPEC.md B3.16 West Haven grading of hepatic encephalopathy (selectable card)
import { ref } from "../../refs.js";

export const ROWS = [
  { grade: "Minimal", features: "Abnormal psychometric or neurophysiological tests only", category: "Covert" },
  { grade: "1", features: "Trivial lack of awareness, euphoria or anxiety, shortened attention span, impaired addition or subtraction, altered sleep rhythm", category: "Covert" },
  { grade: "2", features: "Lethargy or apathy, disorientation for time, obvious personality change, inappropriate behavior, dyspraxia, asterixis", category: "Overt" },
  { grade: "3", features: "Somnolence to semi-stupor, responsive to stimuli, confused, gross disorientation, bizarre behavior", category: "Overt" },
  { grade: "4", features: "Coma", category: "Overt" }
];

export default {
  id: "west_haven",
  name: "West Haven grading of hepatic encephalopathy",
  short: "West Haven",
  aliases: ["West Haven", "hepatic encephalopathy", "HE grade", "encephalopathy"],
  category: "liver",
  kind: "card",
  use: "Grade hepatic encephalopathy. Tap a grade.",
  inputs: [{ id: "grade", label: "Grade", type: "radio", style: "rows",
    options: ROWS.map(r => ({ label: `${r.grade === "Minimal" ? "Minimal" : "Grade " + r.grade}: ${r.features}`, value: r.grade })) }],
  compute(v) {
    const row = ROWS.find(r => r.grade === v.grade);
    return { score: null, row, display: row.grade === "Minimal" ? "Minimal" : `Grade ${row.grade}`, label: "West Haven",
      rounding: "Selection; no calculation.", breakdown: [{ item: "Features", value: row.features }, { item: "Category", value: row.category }] };
  },
  interpret(r) {
    const name = r.row.grade === "Minimal" ? "Minimal" : `Grade ${r.row.grade}`;
    return { band: `${name} (${r.row.category})`, level: "neutral", text: r.row.features,
      links: [{ label: "Hepatic encephalopathy emergency page", target: "em_he" }],
      copy: `West Haven: ${name}, ${r.row.category.toLowerCase()}` };
  },
  table: { columns: ["Grade", "Features", "Category"], rows: ROWS.map(r => [r.grade, r.features, r.category]) },
  references: [ref("Vilstrup H et al. Hepatic encephalopathy in chronic liver disease: 2014 Practice Guideline by AASLD and EASL. Hepatology 2014")]
};
