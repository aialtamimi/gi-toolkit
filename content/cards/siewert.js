// SPEC.md B6.16 Siewert classification of adenocarcinoma of the gastroesophageal junction. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "siewert",
  "spec": "B6.16",
  "name": "Siewert classification of adenocarcinoma of the gastroesophageal junction",
  "short": "Siewert",
  "aliases": [
    "Siewert",
    "junctional adenocarcinoma",
    "gastroesophageal junction cancer",
    "GEJ adenocarcinoma",
    "cardia cancer"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Type I is treated as esophageal cancer; type II is staged as esophageal cancer, with the surgical approach decided by the multidisciplinary team; type III is staged as gastric cancer.",
  "table": {
    "columns": [
      "Type",
      "Tumor center",
      "Staging and treatment"
    ],
    "rows": [
      [
        "I",
        "1–5 cm above the gastroesophageal junction",
        "Esophageal cancer"
      ],
      [
        "II",
        "1 cm above to 2 cm below the gastroesophageal junction",
        "Staged as esophageal cancer (AJCC 8th edition: epicenter within 2 cm of the gastroesophageal junction). Surgical approach decided by the multidisciplinary team."
      ],
      [
        "III",
        "2–5 cm below the gastroesophageal junction",
        "Staged as gastric cancer"
      ]
    ]
  },
  "copy": row => `Siewert type ${row[0]}`,
  "references": [
    ref("Siewert JR, Stein HJ. Classification of adenocarcinoma of the oesophagogastric junction. Br J Surg 1998. PMID 9823902", "https://pubmed.ncbi.nlm.nih.gov/9823902/")
  ]
};
