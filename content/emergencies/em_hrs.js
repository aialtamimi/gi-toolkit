// SPEC.md B7.10 Hepatorenal syndrome, HRS-AKI: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_hrs",
  "spec": "B7.10",
  "name": "Hepatorenal syndrome, HRS-AKI",
  "short": "HRS-AKI",
  "aliases": [
    "hepatorenal syndrome",
    "HRS",
    "HRS-AKI",
    "AKI in cirrhosis",
    "terlipressin"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": true,
  "entries": {},
  "entryWords": {},
  "blocks": [
    {
      "type": "source",
      "text": "[ICA-ADQI consensus, J Hepatol 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11193657)."
    },
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "hyperkalemia, severe acidosis, fluid overload or SpO2 <90%, anuria: ICU, consider renal replacement therapy."
    },
    {
      "type": "section",
      "title": "Recognize (2024 criteria)",
      "text": "cirrhosis with ascites; AKI by KDIGO (creatinine rise ≥0.3 mg/dL within 48 hours, or ≥50% from baseline within 7 days, and/or urine output ≤0.5 mL/kg/h for ≥6 hours); no improvement in creatinine and/or urine output within 24 hours of adequate volume resuscitation; no strong evidence of another primary cause. A 48-hour albumin trial is no longer required."
    },
    {
      "type": "step",
      "id": "R1",
      "chip": "0 h",
      "title": "Stop, look and challenge",
      "when": [],
      "items": [
        "Stop diuretics, non-steroidal anti-inflammatory drugs (NSAIDs) and other nephrotoxins; review non-selective beta-blockers; look for and treat infection; if volume status is unclear, fluid challenge with 250–500 mL crystalloid or 1–1.5 g/kg of 20–25% albumin; reassess at 24 hours.",
        "Diagnostic paracentesis to exclude spontaneous bacterial peritonitis; urinalysis; renal ultrasound."
      ],
      "calcs": [],
      "doses": [
        "albumin_challenge_1",
        "albumin_challenge_1_5"
      ],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "24 h",
      "title": "No improvement after volume, and no other likely cause?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "HRS-AKI, start vasoconstrictor plus albumin."
        },
        {
          "value": "No",
          "text": "treat the other cause."
        }
      ]
    },
    {
      "type": "step",
      "id": "R2",
      "chip": "24 h",
      "title": "Start vasoconstrictor plus albumin",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "HRS-AKI: terlipressin plus albumin (first line); norepinephrine plus albumin in ICU if terlipressin is contraindicated or unavailable.",
        "Terlipressin preferably by continuous infusion, starting 2–3 mg/24 hours (Baveno VIII); escalation and stop rules as below."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Terlipressin improved HRS reversal but caused more respiratory failure (CONFIRM, NEJM 2021)."
      ]
    },
    {
      "type": "step",
      "id": "R3",
      "chip": "24 h",
      "title": "Treat the other cause",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Another cause is likely: treat the other cause."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "R4",
      "chip": "Daily",
      "title": "Daily review",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Check creatinine, volume status and SpO2 daily; escalate per the Doses table.",
        "Stop vasoconstrictor when: creatinine returns to within 0.3 mg/dL of baseline; severe adverse event; no improvement after 48 hours at maximum tolerated dose; renal replacement therapy needed; or 14 days reached."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "R5",
      "chip": "Then",
      "title": "Transplant referral",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Refer for liver transplant assessment."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "terlipressin with hypoxia, ischemic heart or vascular disease, or fluid overload; continuing albumin when there is pulmonary edema; terlipressin if SpO2 <90%."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Terlipressin",
          "Preferred: continuous infusion, starting 2–3 mg/24 hours (Baveno VIII). Alternative: IV bolus 1–2 mg every 6 hours. If creatinine has not fallen by 25%, increase by at least 2 mg/day every 24 hours up to 12 mg/day"
        ],
        [
          "Albumin 20–25%",
          "20–40 g/day, adjusted daily to volume status"
        ],
        [
          "Norepinephrine",
          "0.5 mg/h IV, increase by 0.5 mg/h every 4 hours up to 3 mg/h to raise MAP (ICU, central line)"
        ],
        [
          "Albumin 20–25%, fluid challenge if volume status is unclear",
          "1–1.5 g/kg"
        ]
      ]
    }
  ],
  "related": [
    "meld3",
    "aclf"
  ],
  "references": [
    ref("Nadim MK et al. ICA-ADQI consensus on hepatorenal syndrome. J Hepatol 2024. PMID 38527522", "https://pubmed.ncbi.nlm.nih.gov/38527522/"),
    ref("Wong F et al. Terlipressin plus albumin for the treatment of type 1 hepatorenal syndrome (CONFIRM). NEJM 2021. PMID 33657294", "https://pubmed.ncbi.nlm.nih.gov/33657294/"),
    ref("Baveno VIII Faculty. Baveno VIII - Advancing consensus in portal hypertension. J Hepatol 2026;85:993-1018. PMID 42624290", "https://pubmed.ncbi.nlm.nih.gov/42624290/")
  ]
};
