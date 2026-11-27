// SPEC.md B7.15 Caustic ingestion: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_caustic",
  "spec": "B7.15",
  "name": "Caustic ingestion",
  "short": "Caustic ingestion",
  "aliases": [
    "caustic ingestion",
    "corrosive ingestion",
    "acid ingestion",
    "alkali ingestion",
    "lye"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": false,
  "entries": {},
  "entryWords": {},
  "blocks": [
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "stridor or airway edema, signs of perforation, shock, severe acidosis: ICU and surgery."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "acid or alkali ingestion; drooling, dysphagia, odynophagia, stridor, chest or abdominal pain. Symptoms do not predict injury severity."
    },
    {
      "type": "step",
      "id": "K1",
      "chip": "0 h",
      "title": "Airway, assessment and imaging",
      "when": [],
      "items": [
        "Airway assessment (early intubation if stridor or airway edema); IV access; NPO; identify the agent; CT chest and abdomen with IV contrast if perforation or transmural necrosis is suspected; surgical team involvement for severe cases.",
        "Psychiatric review if intentional."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0–12 h",
      "title": "Perforation or transmural necrosis (clinical or CT)?",
      "when": [],
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
          "text": "endoscopy within 12–48 hours."
        }
      ]
    },
    {
      "type": "step",
      "id": "K2",
      "chip": "Now",
      "title": "Emergency surgery",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Perforation or transmural necrosis: emergency surgery."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "K3",
      "chip": "12–48 h",
      "title": "Endoscopy",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Endoscopy within 12–48 hours to grade injury (Zargar, B6.6), unless perforation is evident."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "12–48 h",
      "title": "Zargar grade?",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [],
      "calcs": [
        "zargar"
      ],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "0–2a",
          "text": "early oral intake, discharge."
        },
        {
          "value": "2b–3a",
          "text": "admit, enteral nutrition."
        },
        {
          "value": "3b",
          "text": "ICU, surgical evaluation."
        },
        {
          "value": "Grade 4 (perforation)",
          "text": "emergency surgery."
        }
      ]
    },
    {
      "type": "step",
      "id": "K4",
      "chip": "Day 1",
      "title": "Grade 0–2a",
      "when": [
        [
          "D2",
          "0–2a"
        ]
      ],
      "items": [
        "Grade 0–2a: oral intake early and discharge."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "K5",
      "chip": "Admission",
      "title": "Grade 2b–3a",
      "when": [
        [
          "D2",
          "2b–3a"
        ]
      ],
      "items": [
        "Grade 2b–3: admit, nutritional support, monitor for perforation; stricture surveillance from about 3 weeks.",
        "Enteral nutrition (tube placed under endoscopic guidance)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "K6",
      "chip": "Now",
      "title": "Grade 3b",
      "when": [
        [
          "D2",
          "3b"
        ]
      ],
      "items": [
        "ICU, surgical evaluation.",
        "Monitor for perforation, enteral nutrition, stricture surveillance from about 3 weeks if no surgery."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "K7",
      "chip": "Now",
      "title": "Grade 4 (perforation)",
      "when": [
        [
          "D2",
          "Grade 4 (perforation)"
        ]
      ],
      "items": [
        "Grade 4 (perforation): emergency surgery."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "K8",
      "chip": "Weeks to years",
      "title": "Then",
      "when": [],
      "items": [
        "Dilation for strictures.",
        "Long-term esophageal cancer risk: surveillance endoscopy from 15–20 years after ingestion (ASGE)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "induced vomiting, neutralizing agents, blind nasogastric tube, routine corticosteroids; endoscopy between day 5 and day 15 (weakest wall, higher perforation risk)."
    }
  ],
  "related": [
    "zargar"
  ],
  "references": [
    ref("Zargar SA et al. The role of fiberoptic endoscopy in the management of corrosive ingestion and modified endoscopic classification of burns. Gastrointest Endosc 1991. PMID 2032601", "https://pubmed.ncbi.nlm.nih.gov/2032601/"),
    ref("Hirota WK et al. ASGE guideline: the role of endoscopy in the surveillance of premalignant conditions of the upper GI tract. Gastrointest Endosc 2006. PMID 16564854", "https://pubmed.ncbi.nlm.nih.gov/16564854/")
  ]
};
