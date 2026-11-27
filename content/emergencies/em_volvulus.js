// SPEC.md B7.17 Colonic volvulus: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_volvulus",
  "spec": "B7.17",
  "name": "Colonic volvulus",
  "short": "Volvulus",
  "aliases": [
    "colonic volvulus",
    "volvulus",
    "sigmoid volvulus",
    "cecal volvulus",
    "coffee-bean sign",
    "whirl sign"
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
      "text": "peritonitis, perforation, shock, signs of ischemia: emergency surgery."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "abdominal distension and pain; CT shows whirl sign or coffee-bean sign."
    },
    {
      "type": "step",
      "id": "Y1",
      "chip": "0 h",
      "title": "Confirm and prepare",
      "when": [],
      "items": [
        "CT; resuscitate; nasogastric tube; involve surgeons."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0 h",
      "title": "Sigmoid or cecal?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Sigmoid",
          "text": "check for ischemia, perforation or peritonitis."
        },
        {
          "value": "Cecal",
          "text": "surgery."
        }
      ]
    },
    {
      "type": "step",
      "id": "Y2",
      "chip": "Now",
      "title": "Cecal volvulus",
      "when": [
        [
          "D1",
          "Cecal"
        ]
      ],
      "items": [
        "Cecal volvulus: surgery; endoscopic detorsion is not recommended."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "0 h",
      "title": "Ischemia, perforation or peritonitis?",
      "when": [
        [
          "D1",
          "Sigmoid"
        ]
      ],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "emergency surgery."
        },
        {
          "value": "No",
          "text": "endoscopic detorsion."
        }
      ]
    },
    {
      "type": "step",
      "id": "Y3",
      "chip": "Now",
      "title": "Sigmoid volvulus with ischemia, perforation or peritonitis",
      "when": [
        [
          "D2",
          "Yes"
        ]
      ],
      "items": [
        "Sigmoid volvulus with ischemia, perforation or peritonitis: emergency surgery."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "Y4",
      "chip": "Within hours",
      "title": "Endoscopic detorsion",
      "when": [
        [
          "D2",
          "No"
        ]
      ],
      "items": [
        "Sigmoid volvulus without ischemia or perforation: endoscopic detorsion and decompression, leave a decompression tube; then elective sigmoidectomy during the same admission (high recurrence).",
        "Necrotic mucosa at endoscopy: stop, surgery."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Recurrence after detorsion alone is high (ASGE 2020)."
      ]
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "endoscopic detorsion when there is mucosal necrosis."
    }
  ],
  "related": [],
  "references": [
    ref("Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007. PMID 31791596", "https://doi.org/10.1016/j.gie.2019.09.007")
  ]
};
