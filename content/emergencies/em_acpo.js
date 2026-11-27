// SPEC.md B7.16 Acute colonic pseudo-obstruction, Ogilvie syndrome: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_acpo",
  "spec": "B7.16",
  "name": "Acute colonic pseudo-obstruction, Ogilvie syndrome",
  "short": "Ogilvie syndrome",
  "aliases": [
    "Ogilvie syndrome",
    "acute colonic pseudo-obstruction",
    "ACPO",
    "neostigmine",
    "colonic dilatation"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": false,
  "entries": {},
  "entryWords": {},
  "blocks": [
    {
      "type": "source",
      "text": "[Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007](https://doi.org/10.1016/j.gie.2019.09.007)."
    },
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "cecum >12 cm, peritonitis, perforation, signs of ischemia: surgical review."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "marked colonic dilatation without mechanical obstruction (confirm with CT), usually in hospitalized or post-operative patients. Cecal diameter >12 cm or prolonged distension raises perforation risk."
    },
    {
      "type": "step",
      "id": "O1",
      "chip": "0–24 h",
      "title": "Treat the cause and decompress",
      "when": [],
      "items": [
        "Treat the cause (electrolytes, especially potassium and magnesium; stop opioids and anticholinergics; treat infection); NPO; nasogastric and rectal tube; mobilize; serial X-rays every 12–24 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "24–48 h",
      "title": "Improving?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "continue conservative care."
        },
        {
          "value": "No, or cecum >12 cm",
          "text": "consider neostigmine."
        }
      ]
    },
    {
      "type": "step",
      "id": "O2",
      "chip": "24–48 h",
      "title": "Improving",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Continue conservative care."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "24–48 h",
      "title": "Contraindication to neostigmine?",
      "when": [
        [
          "D1",
          "No, or cecum >12 cm"
        ]
      ],
      "items": [
        "Mechanical obstruction, bradycardia, active bronchospasm or recent myocardial infarction."
      ],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "No",
          "text": "neostigmine."
        },
        {
          "value": "Yes, or neostigmine fails",
          "text": "colonoscopic decompression."
        }
      ]
    },
    {
      "type": "step",
      "id": "O3",
      "chip": "24–48 h",
      "title": "Neostigmine",
      "when": [
        [
          "D2",
          "No"
        ]
      ],
      "items": [
        "If no response in 24–48 hours: neostigmine with cardiac monitoring and atropine at the bedside.",
        "Neostigmine 2 mg IV over 3–5 minutes; may repeat once."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Neostigmine gave prompt decompression in most patients (Ponec, NEJM 1999)."
      ]
    },
    {
      "type": "step",
      "id": "O4",
      "chip": "24–48 h",
      "title": "Colonoscopic decompression",
      "when": [
        [
          "D2",
          "Yes, or neostigmine fails"
        ]
      ],
      "items": [
        "Neostigmine failure or contraindication: colonoscopic decompression with tube placement."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "O5",
      "chip": "After decompression",
      "title": "After decompression",
      "when": [],
      "items": [
        "Daily polyethylene glycol reduces recurrence (Sgouros, Gut 2006).",
        "Perforation or peritonitis: surgery."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "neostigmine with mechanical obstruction, bradycardia, active bronchospasm or recent myocardial infarction."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Neostigmine",
          "2 mg IV over 3–5 minutes; may be repeated once if no response"
        ]
      ]
    }
  ],
  "related": [],
  "references": [
    ref("Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007. PMID 31791596", "https://pubmed.ncbi.nlm.nih.gov/31791596/"),
    ref("Ponec RJ et al. Neostigmine for the treatment of acute colonic pseudo-obstruction. NEJM 1999. PMID 10403850", "https://pubmed.ncbi.nlm.nih.gov/10403850/"),
    ref("Sgouros SN et al. Effect of polyethylene glycol electrolyte balanced solution on patients with acute colonic pseudo obstruction after resolution of colonic dilation: a prospective, randomised, placebo controlled trial. Gut 2006. PMID 16306137", "https://pubmed.ncbi.nlm.nih.gov/16306137/")
  ]
};
