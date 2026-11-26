// SPEC.md B6.6 Zargar classification of caustic injury
import { ref } from "../../js/refs.js";

export default {
  id: "zargar",
  spec: "B6.6",
  name: "Zargar classification of caustic injury",
  short: "Zargar",
  aliases: ["Zargar", "caustic injury", "corrosive injury", "caustic ingestion grade"],
  category: "endoscopy",
  kind: "card",
  use: "Clinical use: grades 0–2a usually allow early oral intake and discharge; grade 2b or higher carries high stricture risk; grade 3b carries the highest risk of complications and death.",
  table: { columns: ["Grade", "Endoscopic finding"], rows: [
    ["0", "Normal"],
    ["1", "Edema and hyperemia of the mucosa"],
    ["2a", "Friability, hemorrhages, erosions, blisters, whitish membranes, exudates and superficial ulcers"],
    ["2b", "Grade 2a plus deep discrete or circumferential ulcers"],
    ["3a", "Small scattered areas of necrosis"],
    ["3b", "Extensive necrosis"],
    ["4", "Perforation"]
  ] },
  copy: row => `Zargar: grade ${row[0]}`,
  links: [{ label: "Caustic ingestion emergency page", target: "em_caustic" }],
  references: [ref("Zargar SA et al. The role of fiberoptic endoscopy in the management of corrosive ingestion and modified endoscopic classification of burns. Gastrointest Endosc 1991")]
};
