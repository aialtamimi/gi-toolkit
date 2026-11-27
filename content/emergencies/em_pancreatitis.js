// SPEC.md B7.12 Acute pancreatitis: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_pancreatitis",
  "spec": "B7.12",
  "name": "Acute pancreatitis",
  "short": "Acute pancreatitis",
  "aliases": [
    "acute pancreatitis",
    "pancreatitis",
    "lactated Ringer's",
    "biliary pancreatitis",
    "necrotizing pancreatitis"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": true,
  "entries": {},
  "entryWords": {},
  "blocks": [
    {
      "type": "source",
      "text": "ACG 2024 (Tenner, Am J Gastroenterol 2024)."
    },
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "persistent SIRS >48 hours, organ failure (modified Marshall score 2 or more), cholangitis: HDU or ICU; cholangitis needs ERCP within 24 hours.",
      "calcs": [
        "marshall"
      ]
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "2 of 3: typical pain, lipase or amylase >3 × ULN, imaging (B4.6). Ultrasound for gallstones in every patient; check triglycerides and calcium."
    },
    {
      "type": "step",
      "id": "P1",
      "chip": "0–6 h",
      "title": "Diagnose, grade and start fluids",
      "when": [],
      "items": [
        "Revised Atlanta diagnosis (B4.6): 2 of 3.",
        "Ultrasound for gallstones.",
        "Bloods: triglycerides, calcium, liver tests, BUN, hematocrit.",
        "BISAP and SIRS.",
        "Analgesia.",
        "Moderately aggressive fluids with lactated Ringer's: 1.5 mL/kg/h, plus a 10 mL/kg bolus if hypovolemic."
      ],
      "calcs": [
        "atlanta",
        "bisap",
        "sirs"
      ],
      "doses": [
        "ringer_infusion",
        "ringer_bolus"
      ],
      "why": [
        "Aggressive fluids caused more fluid overload without benefit (WATERFALL, NEJM 2022)."
      ]
    },
    {
      "type": "step",
      "id": "P2",
      "chip": "6–48 h",
      "title": "Reassess often and feed early",
      "when": [],
      "items": [
        "Reassess often: heart rate, urine output >0.5 mL/kg/h, BUN, hematocrit; monitor closely for the first 24–48 hours; reduce fluids if fluid overload.",
        "Red flag: organ failure, modified Marshall score 2 or more (B4.5): HDU or ICU.",
        "No prophylactic antibiotics.",
        "Early oral feeding within 24–48 hours as tolerated (low-fat solid diet in mild pancreatitis); enteral rather than parenteral feeding in severe pancreatitis."
      ],
      "calcs": [
        "marshall"
      ],
      "doses": [
        "urine_output"
      ],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "Within 24 h",
      "title": "Cholangitis?",
      "when": [],
      "items": [
        "Urgent ERCP (within 24 hours) only if concomitant cholangitis."
      ],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "ERCP within 24 hours."
        },
        {
          "value": "No",
          "text": "no early ERCP."
        }
      ]
    },
    {
      "type": "step",
      "id": "P3",
      "chip": "Within 24 h",
      "title": "ERCP for cholangitis",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Cholangitis: ERCP within 24 hours (B7.13)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "P4",
      "chip": "No early ERCP",
      "title": "Gallstone pancreatitis without cholangitis",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Gallstone pancreatitis without cholangitis: no early ERCP."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Urgent ERCP without cholangitis gave no benefit (APEC, Lancet 2020)."
      ]
    },
    {
      "type": "step",
      "id": "P5",
      "chip": "Same admission",
      "title": "Treat the cause",
      "when": [],
      "items": [
        "Mild gallstone pancreatitis: cholecystectomy during the same admission.",
        "Alcohol: brief intervention and referral."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Fewer recurrent gallstone complications (PONCHO, Lancet 2015)."
      ]
    },
    {
      "type": "step",
      "id": "P6",
      "chip": "After 72 h",
      "title": "If deteriorating",
      "when": [],
      "items": [
        "Contrast CT (modified CTSI).",
        "Suspected infected necrosis (fever, gas on CT): antibiotics; step-up approach, endoscopic first, delaying drainage until walled-off (about 4 weeks) where possible."
      ],
      "calcs": [
        "mctsi"
      ],
      "doses": [],
      "why": [
        "Postponed drainage was not worse and needed fewer interventions (POINTER, NEJM 2021)."
      ]
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "aggressive fluids (more fluid overload without benefit; WATERFALL, NEJM 2022); prophylactic antibiotics; early ERCP in biliary pancreatitis without cholangitis; CT in the first 72 hours unless the diagnosis is unclear."
    },
    {
      "type": "table",
      "columns": [
        "Item",
        "Dose"
      ],
      "rows": [
        [
          "Lactated Ringer's",
          "1.5 mL/kg/h; add a 10 mL/kg bolus if hypovolemic; reassess frequently and reduce in cardiac or renal disease"
        ],
        [
          "Rectal indomethacin (post-ERCP pancreatitis prevention, high-risk ERCP)",
          "100 mg per rectum around the time of ERCP"
        ]
      ]
    }
  ],
  "related": [
    "bisap",
    "ranson",
    "glasgow_imrie",
    "sirs",
    "marshall",
    "atlanta",
    "mctsi"
  ],
  "references": [
    ref("Tenner S et al. ACG guideline: management of acute pancreatitis. Am J Gastroenterol 2024", "https://guidelinecentral.com/guideline/12896"),
    ref("de-Madaria E et al. Aggressive or moderate fluid resuscitation in acute pancreatitis (WATERFALL). NEJM 2022;387:989-1000. PMID 36103415", "https://pubmed.ncbi.nlm.nih.gov/36103415/"),
    ref("Banks PA et al. Classification of acute pancreatitis 2012: revision of the Atlanta classification. Gut 2013"),
    ref("Schepers NJ et al. Urgent ERCP with sphincterotomy versus conservative treatment in predicted severe acute gallstone pancreatitis (APEC). Lancet 2020. PMID 32682482", "https://pubmed.ncbi.nlm.nih.gov/32682482/"),
    ref("da Costa DW et al. Same-admission versus interval cholecystectomy for mild gallstone pancreatitis (PONCHO). Lancet 2015. PMID 26460661", "https://pubmed.ncbi.nlm.nih.gov/26460661/"),
    ref("Boxhoorn L et al. Immediate versus postponed intervention for infected necrotizing pancreatitis (POINTER). NEJM 2021. PMID 34614330", "https://pubmed.ncbi.nlm.nih.gov/34614330/")
  ]
};
