// SPEC.md B6.14 Sarin classification of gastric varices. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "sarin",
  "spec": "B6.14",
  "name": "Sarin classification of gastric varices",
  "short": "Sarin",
  "aliases": [
    "Sarin",
    "gastric varices",
    "GOV1",
    "GOV2",
    "IGV1",
    "IGV2",
    "fundal varices"
  ],
  "category": "bleeding",
  "kind": "card",
  "use": "Treatment depends on the type: see the bleeding source decision in variceal bleeding (B7.1).",
  "table": {
    "columns": [
      "Type",
      "Location"
    ],
    "rows": [
      [
        "GOV1",
        "Esophageal varices extending along the lesser curve"
      ],
      [
        "GOV2",
        "Esophageal varices extending toward the fundus"
      ],
      [
        "IGV1",
        "Isolated gastric varices in the fundus"
      ],
      [
        "IGV2",
        "Isolated gastric varices elsewhere (body, antrum, pylorus, duodenum)"
      ]
    ]
  },
  "links": [
    {
      "label": "Bleeding source decision",
      "target": "em_ugib",
      "entry": "source"
    }
  ],
  "copy": row => `Sarin: ${row[0]}`,
  "references": [
    ref("Sarin SK et al. Prevalence, classification and natural history of gastric varices: a long-term follow-up study in 568 portal hypertension patients. Hepatology 1992. PMID 1446890", "https://pubmed.ncbi.nlm.nih.gov/1446890/")
  ]
};
