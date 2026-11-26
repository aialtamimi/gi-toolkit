// SPEC.md B6.4 Paris classification of superficial lesions
import { ref } from "../../js/refs.js";

export default {
  id: "paris",
  spec: "B6.4",
  name: "Paris classification of superficial lesions",
  short: "Paris",
  aliases: ["Paris", "Paris classification", "superficial lesion", "polyp morphology", "0-IIc", "0-Is"],
  category: "endoscopy",
  kind: "card",
  use: "Depressed (0-IIc) components carry a higher risk of submucosal invasion.",
  table: { columns: ["Type", "Description"], rows: [
    ["0-Ip", "Pedunculated"],
    ["0-Isp", "Subpedunculated"],
    ["0-Is", "Sessile (protruding ≥2.5 mm in the colon, about the height of closed biopsy forceps)"],
    ["0-IIa", "Slightly elevated (<2.5 mm)"],
    ["0-IIb", "Flat"],
    ["0-IIc", "Slightly depressed"],
    ["0-III", "Excavated (ulcer)"]
  ] },
  copy: row => `Paris: ${row[0]}`,
  references: [ref("The Paris endoscopic classification of superficial neoplastic lesions: esophagus, stomach, and colon. Gastrointest Endosc 2003")]
};
