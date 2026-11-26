// SPEC.md B7.13 Acute cholangitis: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_cholangitis",
  "spec": "B7.13",
  "name": "Acute cholangitis",
  "short": "Cholangitis",
  "aliases": [
    "acute cholangitis",
    "cholangitis",
    "ascending cholangitis",
    "biliary sepsis",
    "ERCP drainage"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": false,
  "entries": {},
  "blocks": [
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "septic shock, altered consciousness, organ dysfunction (TG18 grade III): ICU."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "TG18 criteria (B4.8)."
    },
    {
      "type": "step",
      "id": "C1",
      "chip": "0–1 h",
      "title": "Diagnose, grade, culture and treat",
      "when": [],
      "items": [
        "TG18 diagnosis and severity (B4.8).",
        "Blood cultures, then IV antibiotics (within 1 hour in septic shock) covering gram-negative organisms and anaerobes per local resistance; see Antibiotic examples below.",
        "Fluids.",
        "Check INR and platelets; correct coagulopathy if needed for sphincterotomy."
      ],
      "calcs": [
        "tg18_cholangitis"
      ],
      "doses": [],
      "why": null
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0–1 h",
      "title": "TG18 severity grade?",
      "when": [],
      "items": [
        "Biliary drainage by ERCP rather than percutaneous drainage, within 48 hours ([ASGE 2021](https://guidelinecentral.com/guideline/1285200))."
      ],
      "calcs": [],
      "doses": [],
      "why": "ERCP within 48 h is associated with better outcomes (ASGE 2021).",
      "options": [
        {
          "value": "Grade III",
          "text": "organ support, then urgent drainage."
        },
        {
          "value": "Grade II",
          "text": "ERCP within 48 hours."
        },
        {
          "value": "Grade I",
          "text": "antibiotics, ERCP within 48 hours."
        }
      ]
    },
    {
      "type": "step",
      "id": "C2",
      "chip": "Within 12 h",
      "title": "Grade III (severe)",
      "when": [
        [
          "D1",
          "Grade III"
        ]
      ],
      "items": [
        "Organ support, then urgent biliary drainage as soon as possible after resuscitation (ideally within 12 hours) in septic shock or TG18 grade III (ESGE 2019)."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "C3",
      "chip": "Within 48 h",
      "title": "Grade II (moderate)",
      "when": [
        [
          "D1",
          "Grade II"
        ]
      ],
      "items": [
        "ERCP within 48 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "C4",
      "chip": "Within 48 h",
      "title": "Grade I (mild)",
      "when": [
        [
          "D1",
          "Grade I"
        ]
      ],
      "items": [
        "Antibiotics; ERCP within 48 hours, sooner if no response within 24 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "At ERCP",
      "title": "Stable at ERCP?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": null,
      "options": [
        {
          "value": "Stable",
          "text": "sphincterotomy and stone extraction."
        },
        {
          "value": "Unstable or coagulopathic",
          "text": "stent only."
        }
      ]
    },
    {
      "type": "step",
      "id": "C5",
      "chip": "At ERCP",
      "title": "Stable",
      "when": [
        [
          "D2",
          "Stable"
        ]
      ],
      "items": [
        "If stable, combine drainage with sphincterotomy and stone removal."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "C6",
      "chip": "At ERCP",
      "title": "Unstable or coagulopathic",
      "when": [
        [
          "D2",
          "Unstable or coagulopathic"
        ]
      ],
      "items": [
        "If unstable or coagulopathic, stent decompression alone; definitive treatment later."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "C7",
      "chip": "If ERCP fails",
      "title": "Other drainage",
      "when": [],
      "items": [
        "ERCP fails or is not possible: percutaneous or EUS-guided drainage."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "C8",
      "chip": "After source control",
      "title": "Antibiotic duration",
      "when": [],
      "items": [
        "Antibiotics 4–7 days after source control (TG18); at least 2 weeks if Enterococcus or Streptococcus bacteremia (TG18)."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "C9",
      "chip": "Same admission",
      "title": "Cholecystectomy",
      "when": [],
      "items": [
        "Cholecystectomy for gallstone disease, during the same admission when possible."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "delaying drainage in grade II–III; full stone clearance in an unstable patient."
    },
    {
      "type": "table",
      "columns": [
        "Situation",
        "Antibiotics"
      ],
      "rows": [
        [
          "Grade I–II, community-acquired",
          "Ceftriaxone plus metronidazole, or piperacillin-tazobactam"
        ],
        [
          "Grade III or healthcare-associated",
          "Piperacillin-tazobactam or meropenem; add vancomycin if indicated"
        ]
      ],
      "title": "Antibiotic examples (follow local resistance)"
    }
  ],
  "related": [
    "tg18_cholangitis",
    "asge_cbd"
  ],
  "references": [
    ref("Kiriyama S et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci 2018", "https://pubmed.ncbi.nlm.nih.gov/29032610/"),
    ref("ASGE guideline on the management of cholangitis 2021", "https://guidelinecentral.com/guideline/1285200"),
    ref("Manes G et al. Endoscopic management of common bile duct stones: European Society of Gastrointestinal Endoscopy (ESGE) guideline. Endoscopy 2019;51(5):472-491. doi:10.1055/a-0862-0346. PMID 30943551", "https://pubmed.ncbi.nlm.nih.gov/30943551/")
  ]
};
