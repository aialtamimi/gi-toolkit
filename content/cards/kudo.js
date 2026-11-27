// SPEC.md B6.12 Kudo pit pattern classification. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "kudo",
  "spec": "B6.12",
  "name": "Kudo pit pattern classification",
  "short": "Kudo pit pattern",
  "aliases": [
    "Kudo",
    "pit pattern",
    "magnifying chromoendoscopy",
    "colorectal polyp",
    "VN",
    "VI"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Type VI needs en bloc resection (high-grade VI may indicate deep invasion, so consider surgery); type VN suggests deep submucosal invasion: surgery.",
  "table": {
    "columns": [
      "Type",
      "Pit pattern",
      "Likely histology and action"
    ],
    "rows": [
      [
        "I",
        "Round",
        "Normal"
      ],
      [
        "II",
        "Stellar or papillary",
        "Hyperplastic"
      ],
      [
        "IIIS",
        "Small tubular or round",
        "Depressed adenoma or early cancer"
      ],
      [
        "IIIL",
        "Large tubular or roundish",
        "Adenoma"
      ],
      [
        "IV",
        "Branch-like or gyrus-like",
        "Adenoma, often villous"
      ],
      [
        "VI",
        "Irregular",
        "High-grade dysplasia or superficial submucosal cancer: en bloc resection; high-grade VI may indicate deep invasion, so consider surgery"
      ],
      [
        "VN",
        "Non-structural",
        "Deep submucosal invasion: surgery"
      ]
    ]
  },
  "copy": row => `Kudo pit pattern: ${row[0]}`,
  "references": [
    ref("Kudo S et al. Diagnosis of colorectal tumorous lesions by magnifying endoscopy. Gastrointest Endosc 1996. PMID 8836710", "https://pubmed.ncbi.nlm.nih.gov/8836710/")
  ]
};
