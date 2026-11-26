// SPEC.md B7.16 Acute colonic pseudo-obstruction, Ogilvie syndrome. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_acpo",
  spec: "B7.16",
  name: "Acute colonic pseudo-obstruction, Ogilvie syndrome",
  short: "Ogilvie syndrome",
  aliases: ["Ogilvie syndrome", "acute colonic pseudo-obstruction", "ACPO", "neostigmine", "colonic dilatation"],
  category: "emergencies",
  blocks: [
    {
      "type": "source",
      "text": "[Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007](https://doi.org/10.1016/j.gie.2019.09.007)."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "marked colonic dilatation without mechanical obstruction (confirm with CT), usually in hospitalized or post-operative patients. Cecal diameter >12 cm or prolonged distension raises perforation risk."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "treat the cause (electrolytes, especially potassium and magnesium; stop opioids and anticholinergics; treat infection); NPO; nasogastric and rectal tube; mobilize; serial X-rays every 12–24 hours."
    },
    {
      "type": "section",
      "title": "If no response in 24–48 hours",
      "text": "neostigmine with cardiac monitoring and atropine at the bedside."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "neostigmine failure or contraindication: colonoscopic decompression with tube placement. Perforation or peritonitis: surgery."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "neostigmine with mechanical obstruction, bradycardia, active bronchospasm or recent myocardial infarction."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Neostigmine",
          "2 mg IV over 3–5 minutes; may be repeated once if no response"
        ]
      ]
    }
  ],
  related: [],
  references: [ref("Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007. PMID 31791596", "https://doi.org/10.1016/j.gie.2019.09.007")]
};
