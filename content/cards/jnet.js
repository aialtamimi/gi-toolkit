// SPEC.md B6.11 JNET classification (narrow-band imaging with magnification). Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "jnet",
  "spec": "B6.11",
  "name": "JNET classification (narrow-band imaging with magnification)",
  "short": "JNET",
  "aliases": [
    "JNET",
    "Japan NBI Expert Team",
    "NBI magnification",
    "magnifying narrow-band imaging",
    "colorectal polyp",
    "optical diagnosis"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Type 2B needs en bloc resection and pit pattern assessment; type 3 suggests deep submucosal invasion: surgery.",
  "table": {
    "columns": [
      "Type",
      "Vessel pattern",
      "Surface pattern",
      "Likely histology",
      "Action"
    ],
    "rows": [
      [
        "1",
        "Invisible",
        "Regular dark or white spots, like normal mucosa",
        "Hyperplastic polyp or sessile serrated lesion",
        "Resect sessile serrated lesions; small rectosigmoid hyperplastic polyps can be left"
      ],
      [
        "2A",
        "Regular caliber and distribution (meshed or spiral)",
        "Regular tubular, branched or papillary",
        "Low-grade intramucosal neoplasia",
        "Endoscopic resection"
      ],
      [
        "2B",
        "Variable caliber, irregular distribution",
        "Irregular or obscure",
        "High-grade intramucosal neoplasia or shallow submucosal invasive cancer",
        "En bloc resection; add magnifying chromoendoscopy (pit pattern)"
      ],
      [
        "3",
        "Loose vessel areas, interruption of thick vessels",
        "Amorphous areas",
        "Deep submucosal invasive cancer",
        "Surgery"
      ]
    ]
  },
  "links": [
    {
      "label": "NICE",
      "target": "nice"
    },
    {
      "label": "Kudo pit pattern",
      "target": "kudo"
    }
  ],
  "copy": row => `JNET: Type ${row[0]}`,
  "references": [
    ref("Sano Y et al. Narrow-band imaging (NBI) magnifying endoscopic classification of colorectal tumors proposed by the Japan NBI Expert Team. Dig Endosc 2016. PMID 26927367", "https://pubmed.ncbi.nlm.nih.gov/26927367/")
  ]
};
