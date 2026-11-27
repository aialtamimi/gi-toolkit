// SPEC.md B7.14 Food bolus and foreign body ingestion: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_foreign_body",
  "spec": "B7.14",
  "name": "Food bolus and foreign body ingestion",
  "short": "Foreign body",
  "aliases": [
    "foreign body",
    "food bolus",
    "food impaction",
    "button battery",
    "battery ingestion",
    "magnet ingestion",
    "body packing"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": false,
  "entries": {},
  "entryWords": {},
  "blocks": [
    {
      "type": "source",
      "text": "[ESGE 2016](https://www.doi.org/10.1055/S-0042-100456)."
    },
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "cannot swallow saliva, drooling, airway compromise, perforation signs (fever, crepitus, chest pain, peritonitis), battery in the esophagus: emergent endoscopy (within 2 h, at most 6 h). Airway compromise: secure the airway first (ICU or anesthesia). Perforation signs: CT and surgical review."
    },
    {
      "type": "step",
      "id": "B1",
      "chip": "0 h",
      "title": "History and imaging",
      "when": [],
      "items": [
        "History: object, time, symptoms.",
        "Plain X-ray (neck, chest, abdomen) for radiopaque objects; CT if perforation is suspected; protect the airway (overtube or intubation if high aspiration risk)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0 h",
      "title": "Object and location?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Complete esophageal obstruction (cannot swallow saliva)",
          "text": "Emergent: preferably within 2 hours, at the latest within 6 hours."
        },
        {
          "value": "Sharp-pointed object or battery in the esophagus",
          "text": "Emergent: preferably within 2 hours, at the latest within 6 hours."
        },
        {
          "value": "Other esophageal foreign body without complete obstruction",
          "text": "Urgent: within 24 hours."
        },
        {
          "value": "Stomach (sharp-pointed objects, magnets, batteries, large or long objects)",
          "text": "Urgent: within 24 hours."
        },
        {
          "value": "Stomach (medium-sized blunt objects)",
          "text": "Non-urgent: within 72 hours."
        },
        {
          "value": "Small blunt objects (not batteries or magnets) beyond the esophagus",
          "text": "Observation; outpatient if feasible."
        },
        {
          "value": "Drug packets (body packing)",
          "text": "No endoscopic removal; observe; surgery if obstruction or leak."
        }
      ]
    },
    {
      "type": "step",
      "id": "B2",
      "chip": "Within 2–6 h",
      "title": "Complete esophageal obstruction",
      "when": [
        [
          "D1",
          "Complete esophageal obstruction (cannot swallow saliva)"
        ]
      ],
      "items": [
        "Emergent endoscopy: preferably within 2 hours, at the latest within 6 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "B3",
      "chip": "Within 2–6 h",
      "title": "Sharp-pointed object or battery in the esophagus",
      "when": [
        [
          "D1",
          "Sharp-pointed object or battery in the esophagus"
        ]
      ],
      "items": [
        "Emergent endoscopy: preferably within 2 hours, at the latest within 6 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Batteries in the esophagus cause severe injury within hours (ESGE 2016)."
      ]
    },
    {
      "type": "step",
      "id": "B4",
      "chip": "Within 24 h",
      "title": "Other esophageal foreign body",
      "when": [
        [
          "D1",
          "Other esophageal foreign body without complete obstruction"
        ]
      ],
      "items": [
        "Urgent endoscopy: within 24 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "B5",
      "chip": "Within 24 h",
      "title": "Stomach: sharp, magnets, batteries, large or long",
      "when": [
        [
          "D1",
          "Stomach (sharp-pointed objects, magnets, batteries, large or long objects)"
        ]
      ],
      "items": [
        "Urgent endoscopy: within 24 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "B6",
      "chip": "Within 72 h",
      "title": "Stomach: medium-sized blunt objects",
      "when": [
        [
          "D1",
          "Stomach (medium-sized blunt objects)"
        ]
      ],
      "items": [
        "Non-urgent endoscopy: within 72 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "B7",
      "chip": "Observe",
      "title": "Small blunt objects beyond the esophagus",
      "when": [
        [
          "D1",
          "Small blunt objects (not batteries or magnets) beyond the esophagus"
        ]
      ],
      "items": [
        "Observation; outpatient if feasible."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "B8",
      "chip": "Observe",
      "title": "Drug packets (body packing)",
      "when": [
        [
          "D1",
          "Drug packets (body packing)"
        ]
      ],
      "items": [
        "No endoscopic removal; observe; surgery if obstruction or leak."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "B9",
      "chip": "At endoscopy",
      "title": "Technique",
      "when": [],
      "items": [
        "Food bolus can be gently pushed into the stomach or retrieved.",
        "Overtube or protector hood for sharp objects."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "B10",
      "chip": "After removal",
      "title": "After removal",
      "when": [],
      "items": [
        "Take esophageal biopsies to look for eosinophilic esophagitis.",
        "Look for stricture or malignancy."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "barium swallow (aspiration risk, impairs endoscopy); blind pushing of sharp objects; delays with batteries."
    },
    {
      "type": "table",
      "columns": [
        "Situation",
        "Timing of endoscopy"
      ],
      "rows": [
        [
          "Complete esophageal obstruction (cannot swallow saliva)",
          "Emergent: preferably within 2 hours, at the latest within 6 hours"
        ],
        [
          "Sharp-pointed object or battery in the esophagus",
          "Emergent: preferably within 2 hours, at the latest within 6 hours"
        ],
        [
          "Other esophageal foreign body without complete obstruction",
          "Urgent: within 24 hours"
        ],
        [
          "Stomach: sharp-pointed objects, magnets, batteries, large or long objects",
          "Urgent: within 24 hours"
        ],
        [
          "Stomach: medium-sized blunt objects",
          "Non-urgent: within 72 hours"
        ],
        [
          "Small blunt objects (not batteries or magnets) beyond the esophagus",
          "Observation; outpatient if feasible"
        ],
        [
          "Drug packets (body packing)",
          "No endoscopic removal; observe; surgery if obstruction or leak"
        ]
      ],
      "title": "Timing of endoscopy (ESGE 2016)"
    }
  ],
  "related": [],
  "references": [
    ref("Birk M et al. Removal of foreign bodies in the upper gastrointestinal tract in adults: ESGE Clinical Guideline. Endoscopy 2016. PMID 26862844", "https://pubmed.ncbi.nlm.nih.gov/26862844/")
  ]
};
