// SPEC.md B6.15 Hill grade of the gastroesophageal flap valve. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "hill",
  "spec": "B6.15",
  "name": "Hill grade of the gastroesophageal flap valve",
  "short": "Hill grade",
  "aliases": [
    "Hill",
    "Hill grade",
    "flap valve",
    "gastroesophageal flap valve",
    "hiatal hernia",
    "GERD"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Grades III–IV are associated with GERD.",
  "table": {
    "columns": [
      "Grade",
      "Appearance"
    ],
    "rows": [
      [
        "I",
        "Prominent ridge closely approximated to the scope"
      ],
      [
        "II",
        "Ridge present; opens with respiration and closes promptly"
      ],
      [
        "III",
        "Ridge barely present, often not closing around the scope"
      ],
      [
        "IV",
        "No ridge; junction wide open; hiatal hernia always present"
      ]
    ]
  },
  "links": [
    {
      "label": "Lyon Consensus 2.0",
      "target": "lyon2"
    }
  ],
  "copy": row => `Hill grade ${row[0]}`,
  "references": [
    ref("Hill LD et al. The gastroesophageal flap valve: in vitro and in vivo observations. Gastrointest Endosc 1996. PMID 8934159", "https://pubmed.ncbi.nlm.nih.gov/8934159/")
  ]
};
