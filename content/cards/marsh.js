// SPEC.md B6.19 Marsh-Oberhuber classification of celiac disease. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "marsh",
  "spec": "B6.19",
  "name": "Marsh-Oberhuber classification of celiac disease",
  "short": "Marsh-Oberhuber",
  "aliases": [
    "Marsh",
    "Oberhuber",
    "celiac disease",
    "coeliac disease",
    "villous atrophy",
    "intraepithelial lymphocytes"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Marsh 3 is typical of celiac disease; Marsh 1–2 is non-specific. Interpret with tTG-IgA on a gluten-containing diet.",
  "table": {
    "columns": [
      "Type",
      "Histology"
    ],
    "rows": [
      [
        "0",
        "Normal"
      ],
      [
        "1",
        "Increased intraepithelial lymphocytes (>25 per 100 enterocytes; Oberhuber originally used >40), normal villi"
      ],
      [
        "2",
        "Increased intraepithelial lymphocytes plus crypt hyperplasia"
      ],
      [
        "3a",
        "Partial villous atrophy"
      ],
      [
        "3b",
        "Subtotal villous atrophy"
      ],
      [
        "3c",
        "Total villous atrophy"
      ]
    ]
  },
  "copy": row => `Marsh-Oberhuber: ${row[0]}`,
  "references": [
    ref("Oberhuber G et al. The histopathology of coeliac disease: time for a standardized report scheme for pathologists. Eur J Gastroenterol Hepatol 1999. PMID 10524652", "https://pubmed.ncbi.nlm.nih.gov/10524652/")
  ]
};
