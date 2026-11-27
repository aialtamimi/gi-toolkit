// SPEC.md B6.20 Goligher classification of internal hemorrhoids. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "goligher",
  "spec": "B6.20",
  "name": "Goligher classification of internal hemorrhoids",
  "short": "Goligher",
  "aliases": [
    "Goligher",
    "hemorrhoids",
    "haemorrhoids",
    "piles",
    "hemorrhoid grade",
    "rubber band ligation"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Grade IV, or failed office treatment: hemorrhoidectomy.",
  "table": {
    "columns": [
      "Grade",
      "Finding",
      "Management (ASCRS 2024)"
    ],
    "rows": [
      [
        "I",
        "Bleeding, no prolapse",
        "Fiber, fluids, office procedures such as rubber band ligation"
      ],
      [
        "II",
        "Prolapse that reduces spontaneously",
        "Fiber, fluids, office procedures such as rubber band ligation"
      ],
      [
        "III",
        "Prolapse that needs manual reduction",
        "Rubber band ligation or surgery"
      ],
      [
        "IV",
        "Irreducible prolapse",
        "Hemorrhoidectomy"
      ]
    ]
  },
  "copy": row => `Goligher grade ${row[0]}`,
  "references": [
    ref("Hawkins AT et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Management of Hemorrhoids. Dis Colon Rectum 2024. PMID 38294832", "https://pubmed.ncbi.nlm.nih.gov/38294832/")
  ]
};
