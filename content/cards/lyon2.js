// SPEC.md B6.8 Lyon Consensus 2.0 for GERD
import { ref } from "../../js/refs.js";

export default {
  id: "lyon2",
  spec: "B6.8",
  name: "Lyon Consensus 2.0 for GERD",
  short: "Lyon 2.0",
  aliases: ["Lyon", "Lyon 2.0", "Lyon Consensus", "GERD", "reflux", "acid exposure time", "AET", "pH monitoring", "MNBI"],
  category: "motility",
  kind: "card",
  use: "Prolonged wireless pH monitoring off PPI is preferred for unproven GERD.",
  table: { columns: ["Evidence level", "Endoscopy", "Reflux monitoring off proton pump inhibitor (PPI)"], rows: [
    ["Conclusive for GERD", "LA grade B, C or D esophagitis; biopsy-proven Barrett's esophagus; peptic stricture", "Acid exposure time (AET) >6% (24-hour study, or on ≥2 days of a wireless study)"],
    ["Borderline or inconclusive", "LA grade A", "AET 4–6%; reflux episodes 40–80 per day"],
    ["Against GERD", "Normal endoscopy (supportive only)", "AET <4% on every day of the study, with <40 reflux episodes per day"]
  ] },
  notes: ["Adjunctive evidence: reflux episodes >80 per day supports GERD; mean nocturnal baseline impedance (MNBI) <1500 Ω supports GERD and >2500 Ω argues against it."],
  copy: row => `Lyon 2.0: ${row[0]}`,
  links: [{ label: "Los Angeles classification", target: "la_grade" }],
  references: [ref("Gyawali CP et al. Updates to the modern diagnosis of GERD: Lyon consensus 2.0. Gut 2024", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10846564/")]
};
