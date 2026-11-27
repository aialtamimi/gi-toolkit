// SPEC.md B6.22 Strasberg classification of bile duct injury. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "strasberg",
  "spec": "B6.22",
  "name": "Strasberg classification of bile duct injury",
  "short": "Strasberg",
  "aliases": [
    "Strasberg",
    "bile duct injury",
    "biliary injury",
    "cholecystectomy injury",
    "bile leak"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "A and small D: usually ERCP (stent with or without sphincterotomy); B, C, larger D and E: hepatobiliary surgical centre.",
  "table": {
    "columns": [
      "Type",
      "Injury"
    ],
    "rows": [
      [
        "A",
        "Cystic duct or liver-bed duct leak"
      ],
      [
        "B",
        "Occluded aberrant right hepatic duct"
      ],
      [
        "C",
        "Transected aberrant right hepatic duct (leak)"
      ],
      [
        "D",
        "Lateral injury to a major duct"
      ],
      [
        "E1",
        "Transection >2 cm from the confluence"
      ],
      [
        "E2",
        "Transection <2 cm from the confluence"
      ],
      [
        "E3",
        "At the confluence, confluence preserved"
      ],
      [
        "E4",
        "Confluence destroyed"
      ],
      [
        "E5",
        "Aberrant right duct plus common hepatic duct"
      ]
    ]
  },
  "copy": row => `Strasberg type ${row[0]}`,
  "references": [
    ref("Strasberg SM et al. An analysis of the problem of biliary injury during laparoscopic cholecystectomy. J Am Coll Surg 1995. PMID 8000648", "https://pubmed.ncbi.nlm.nih.gov/8000648/")
  ]
};
