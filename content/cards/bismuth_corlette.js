// SPEC.md B6.21 Bismuth-Corlette classification of hilar biliary strictures. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "bismuth_corlette",
  "spec": "B6.21",
  "name": "Bismuth-Corlette classification of hilar biliary strictures",
  "short": "Bismuth-Corlette",
  "aliases": [
    "Bismuth",
    "Bismuth-Corlette",
    "hilar stricture",
    "Klatskin tumor",
    "perihilar cholangiocarcinoma",
    "biliary stricture"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Guides drainage and surgery: plan with MRCP before ERCP; types III–IV at an expert centre.",
  "table": {
    "columns": [
      "Type",
      "Level"
    ],
    "rows": [
      [
        "I",
        "Below the confluence"
      ],
      [
        "II",
        "At the confluence"
      ],
      [
        "IIIa",
        "Extends to the right hepatic duct"
      ],
      [
        "IIIb",
        "Extends to the left hepatic duct"
      ],
      [
        "IV",
        "Both sides, or multifocal"
      ]
    ]
  },
  "copy": row => `Bismuth-Corlette type ${row[0]}`,
  "references": [
    ref("Bismuth H, Corlette MB. Intrahepatic cholangioenteric anastomosis in carcinoma of the hilus of the liver. Surg Gynecol Obstet 1975. PMID 1079096", "https://pubmed.ncbi.nlm.nih.gov/1079096/"),
    ref("Bismuth H et al. Management strategies in resection for hilar cholangiocarcinoma. Ann Surg 1992. PMID 1309988", "https://pubmed.ncbi.nlm.nih.gov/1309988/")
  ]
};
