// SPEC.md B6.10 Sydney classification of deep mural injury after EMR. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "sydney_dmi",
  "spec": "B6.10",
  "name": "Sydney classification of deep mural injury after EMR",
  "short": "Sydney DMI",
  "aliases": [
    "Sydney classification",
    "deep mural injury",
    "DMI",
    "EMR perforation",
    "target sign",
    "endoscopic mucosal resection"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Types III–V need prompt clip closure; types IV–V also need antibiotics, admission and surgical review.",
  "table": {
    "columns": [
      "Type",
      "Finding",
      "Management"
    ],
    "rows": [
      [
        "0",
        "Normal blue-mat submucosa",
        "No closure needed"
      ],
      [
        "I",
        "Muscularis propria visible, not injured",
        "No closure needed"
      ],
      [
        "II",
        "Focal loss of the submucosal plane; muscle injury cannot be excluded",
        "Consider clip closure"
      ],
      [
        "III",
        "Muscle injured (target sign on the specimen or mirror target in the defect)",
        "Close promptly with through-the-scope or over-the-scope clips"
      ],
      [
        "IV",
        "Hole within a white cautery ring, no contamination",
        "Close promptly with through-the-scope or over-the-scope clips; antibiotics, admission and surgical review"
      ],
      [
        "V",
        "Hole with contamination",
        "Close promptly with through-the-scope or over-the-scope clips; antibiotics, admission and surgical review"
      ]
    ]
  },
  "links": [
    {
      "label": "Iatrogenic endoscopic perforation",
      "target": "em_perforation"
    }
  ],
  "copy": row => `Sydney deep mural injury: type ${row[0]}`,
  "references": [
    ref("Burgess NG et al. Deep mural injury and perforation after colonic endoscopic mucosal resection: a new classification and analysis of risk factors. Gut 2017. PMID 27464708", "https://pubmed.ncbi.nlm.nih.gov/27464708/")
  ]
};
