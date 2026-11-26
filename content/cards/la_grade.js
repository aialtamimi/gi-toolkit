// SPEC.md B6.2 Los Angeles classification of erosive esophagitis
import { ref } from "../../js/refs.js";

export default {
  id: "la_grade",
  spec: "B6.2",
  name: "Los Angeles classification of erosive esophagitis",
  short: "LA grade",
  aliases: ["Los Angeles", "LA grade", "LA classification", "erosive esophagitis", "reflux esophagitis", "GERD"],
  category: "endoscopy",
  kind: "card",
  use: "Clinical use: grades B, C and D are conclusive evidence of GERD (Lyon 2.0); grade A is not conclusive.",
  table: { columns: ["Grade", "Definition"], rows: [
    ["A", "One or more mucosal breaks ≤5 mm, not extending between the tops of two mucosal folds"],
    ["B", "One or more mucosal breaks >5 mm, not continuous between the tops of two mucosal folds"],
    ["C", "Mucosal breaks continuous between the tops of two or more folds, involving <75% of the circumference"],
    ["D", "Mucosal breaks involving ≥75% of the circumference"]
  ] },
  copy: row => `LA classification: grade ${row[0]}`,
  links: [{ label: "Lyon Consensus 2.0", target: "lyon2" }],
  references: [ref("Lundell LR et al. Endoscopic assessment of oesophagitis: clinical and functional correlates and further validation of the Los Angeles classification. Gut 1999")]
};
