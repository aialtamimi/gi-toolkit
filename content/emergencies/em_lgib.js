// SPEC.md B7.3 Acute lower GI bleeding: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_lgib",
  "spec": "B7.3",
  "name": "Acute lower GI bleeding",
  "short": "Lower GI bleeding",
  "aliases": [
    "lower GI bleeding",
    "LGIB",
    "hematochezia",
    "bright red blood per rectum",
    "rectal bleeding"
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
      "text": "shock index >1 or systolic BP <90 mmHg, ongoing large-volume hematochezia, Hb drop >2 g/dL: ICU or HDU."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "hematochezia or bright red blood per rectum. With hemodynamic instability, think of an upper GI source and do an upper endoscopy first."
    },
    {
      "type": "step",
      "id": "L1",
      "chip": "0–1 h",
      "title": "Resuscitate and risk-stratify",
      "when": [],
      "items": [
        "Resuscitate.",
        "Oakland score (B2.4).",
        "Transfuse at Hb <7 g/dL (8 g/dL in cardiovascular disease) (ACG 2023).",
        "Antithrombotics per B7.4.",
        "Hemodynamic instability: think of an upper GI source and do an upper endoscopy first."
      ],
      "calcs": [
        "oakland"
      ],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0–1 h",
      "title": "Hemodynamically unstable or ongoing brisk bleeding?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "CT angiography first."
        },
        {
          "value": "No",
          "text": "decide by the Oakland score."
        }
      ]
    },
    {
      "type": "step",
      "id": "L2",
      "chip": "Within hours",
      "title": "CT angiography first",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Hemodynamically significant ongoing bleeding: CT angiography first, then catheter angiography and embolization if a blush is seen (ACG 2023).",
        "Blush: catheter angiography and embolization.",
        "Negative CT angiography: colonoscopy after bowel preparation."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "After resuscitation",
      "title": "Oakland 8 or less?",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "consider early discharge, outpatient colonoscopy."
        },
        {
          "value": "No",
          "text": "admit, inpatient colonoscopy."
        }
      ]
    },
    {
      "type": "step",
      "id": "L3",
      "chip": "Discharge",
      "title": "Oakland 8 or less",
      "when": [
        [
          "D2",
          "Yes"
        ]
      ],
      "items": [
        "Oakland ≤8: consider early discharge with outpatient colonoscopy."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "L4",
      "chip": "Admission",
      "title": "Oakland more than 8",
      "when": [
        [
          "D2",
          "No"
        ]
      ],
      "items": [
        "Admit: inpatient colonoscopy after adequate bowel preparation; urgent colonoscopy within 24 hours has not improved outcomes."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Urgent colonoscopy within 24 h did not improve outcomes (ACG 2023)."
      ]
    },
    {
      "type": "step",
      "id": "L5",
      "chip": "At colonoscopy",
      "title": "Endoscopic therapy",
      "when": [],
      "items": [
        "Diverticular bleeding with high-risk stigmata (active bleeding, visible vessel, adherent clot): clips or band ligation.",
        "Post-polypectomy bleeding: clips."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "L6",
      "chip": "Discharge",
      "title": "Before discharge",
      "when": [],
      "items": [
        "Avoid non-aspirin non-steroidal anti-inflammatory drugs (NSAIDs).",
        "Continue aspirin for secondary prevention.",
        "Restart anticoagulants per B7.4."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "routine early colonoscopy without preparation; stopping aspirin used for secondary cardiovascular prevention."
    }
  ],
  "related": [
    "oakland"
  ],
  "references": [
    ref("Sengupta N et al. ACG guideline: management of acute lower GI bleeding 2023. PMID 36735555", "https://pubmed.ncbi.nlm.nih.gov/36735555/")
  ]
};
