// SPEC.md B7.17 Colonic volvulus. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_volvulus",
  spec: "B7.17",
  name: "Colonic volvulus",
  short: "Volvulus",
  aliases: ["colonic volvulus", "volvulus", "sigmoid volvulus", "cecal volvulus", "coffee-bean sign", "whirl sign"],
  category: "emergencies",
  blocks: [
    {
      "type": "source",
      "text": "[Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007](https://doi.org/10.1016/j.gie.2019.09.007)."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "abdominal distension and pain; CT shows whirl sign or coffee-bean sign."
    },
    {
      "type": "section",
      "title": "Sigmoid volvulus without ischemia or perforation",
      "text": "endoscopic detorsion and decompression, leave a decompression tube; then elective sigmoidectomy during the same admission (high recurrence)."
    },
    {
      "type": "section",
      "title": "Sigmoid volvulus with ischemia, perforation or peritonitis",
      "text": "emergency surgery."
    },
    {
      "type": "section",
      "title": "Cecal volvulus",
      "text": "surgery; endoscopic detorsion is not recommended."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "endoscopic detorsion when there is mucosal necrosis."
    }
  ],
  related: [],
  references: [ref("Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007. PMID 31791596", "https://doi.org/10.1016/j.gie.2019.09.007")]
};
