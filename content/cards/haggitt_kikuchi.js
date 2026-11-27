// SPEC.md B6.13 Malignant colorectal polyp: Haggitt and Kikuchi levels. Generated from SPEC.md; tests/cards.test.js checks the table, clinical use and notes.
import { ref } from "../../js/refs.js";

export default {
  "id": "haggitt_kikuchi",
  "spec": "B6.13",
  "name": "Malignant colorectal polyp: Haggitt and Kikuchi levels",
  "short": "Haggitt and Kikuchi",
  "aliases": [
    "Haggitt",
    "Kikuchi",
    "malignant polyp",
    "sm1",
    "sm2",
    "sm3",
    "submucosal invasion",
    "T1 colorectal cancer"
  ],
  "category": "endoscopy",
  "kind": "card",
  "use": "Lymph node risk rises with Haggitt level 4 and Kikuchi sm2–sm3.",
  "table": {
    "columns": [
      "Level",
      "Polyp type",
      "Depth of invasion"
    ],
    "rows": [
      [
        "Haggitt 0",
        "Pedunculated",
        "Intramucosal"
      ],
      [
        "Haggitt 1",
        "Pedunculated",
        "Head"
      ],
      [
        "Haggitt 2",
        "Pedunculated",
        "Neck"
      ],
      [
        "Haggitt 3",
        "Pedunculated",
        "Stalk"
      ],
      [
        "Haggitt 4",
        "Pedunculated or sessile",
        "Submucosa below the stalk; all invasive sessile cancers are level 4"
      ],
      [
        "Kikuchi sm1",
        "Sessile",
        "Upper third of the submucosa"
      ],
      [
        "Kikuchi sm2",
        "Sessile",
        "Middle third of the submucosa"
      ],
      [
        "Kikuchi sm3",
        "Sessile",
        "Lower third of the submucosa"
      ]
    ]
  },
  "notes": [
    "Endoscopic resection is curative when: submucosal invasion <1000 µm, well or moderately differentiated (or papillary), no lymphovascular invasion, tumor budding grade 1, negative vertical margin (JSCCR 2019); otherwise discuss surgery."
  ],
  "copy": row => `Malignant polyp: ${row[0]}`,
  "references": [
    ref("Haggitt RC et al. Prognostic factors in colorectal carcinomas arising in adenomas: implications for lesions removed by endoscopic polypectomy. Gastroenterology 1985. PMID 4007423", "https://pubmed.ncbi.nlm.nih.gov/4007423/"),
    ref("Kikuchi R et al. Management of early invasive colorectal cancer. Risk of recurrence and clinical guidelines. Dis Colon Rectum 1995. PMID 7497841", "https://pubmed.ncbi.nlm.nih.gov/7497841/"),
    ref("Hashiguchi Y et al. Japanese Society for Cancer of the Colon and Rectum (JSCCR) guidelines 2019 for the treatment of colorectal cancer. Int J Clin Oncol 2020. PMID 31203527", "https://pubmed.ncbi.nlm.nih.gov/31203527/")
  ]
};
