// SPEC.md B7.4 Anticoagulants and antiplatelets in GI bleeding: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_antithrombotic",
  "spec": "B7.4",
  "name": "Anticoagulants and antiplatelets in GI bleeding",
  "short": "Anticoagulants in GI bleeding",
  "aliases": [
    "anticoagulants",
    "antiplatelets",
    "antithrombotic",
    "warfarin",
    "DOAC",
    "apixaban",
    "rivaroxaban",
    "dabigatran",
    "aspirin",
    "reversal",
    "PCC"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": true,
  "entries": {},
  "entryWords": {},
  "blocks": [
    {
      "type": "source",
      "text": "[ACG-CAG 2022](https://gastroenterology.acponline.org/archives/2022/03/25/1.htm) and ACG 2023 lower GI bleeding guideline."
    },
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "hemodynamic instability despite resuscitation, ongoing transfusion need, or bleeding into a critical site (intracranial, airway): treat as life-threatening; ICU; reversal with hematology input."
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0 h",
      "title": "Life-threatening bleeding?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "No",
          "text": "no routine reversal."
        },
        {
          "value": "Yes",
          "text": "reversal with hematology input."
        }
      ]
    },
    {
      "type": "step",
      "id": "T1",
      "chip": "0 h",
      "title": "No routine reversal",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "No routine reversal: follow the drug table below."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "T2",
      "chip": "0 h",
      "title": "Reversal with hematology input",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Life-threatening bleeding: reversal with hematology input.",
        "Warfarin: 4-factor prothrombin complex concentrate (PCC) by INR (INR 2 to <4: 25 units/kg, max 2500 units; INR 4–6: 35 units/kg, max 3500 units; INR >6: 50 units/kg, max 5000 units) plus vitamin K 10 mg slow IV (product label).",
        "INR below 2: no label dose; discuss with hematology.",
        "Dabigatran: idarucizumab 5 g IV.",
        "Apixaban or rivaroxaban: andexanet alfa where available, or 4-factor PCC; dose per product label or local protocol, with hematology."
      ],
      "calcs": [],
      "doses": [
        "pcc_inr2",
        "pcc_inr4",
        "pcc_inr6"
      ],
      "why": []
    },
    {
      "type": "step",
      "id": "T3",
      "chip": "After hemostasis",
      "title": "When to restart",
      "when": [],
      "items": [
        "Aspirin for secondary prevention: do not stop; if stopped, restart as soon as hemostasis is secured, preferably within 3–5 days (ESGE 2021).",
        "Dual antiplatelet therapy: continue aspirin; if the P2Y12 inhibitor is held, restart as soon as possible (ideally within 5 days) with cardiology.",
        "Warfarin or direct oral anticoagulant (DOAC): resume once bleeding is controlled, preferably within or soon after 7 days, based on thrombotic risk (ESGE 2021)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "note",
      "text": "Restart anticoagulation once hemostasis is secure, individualized with cardiology or hematology."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Acute GI bleeding"
      ],
      "rows": [
        [
          "Warfarin",
          "Suggest against fresh frozen plasma (FFP) and against vitamin K routinely; if reversal is needed, use 4-factor prothrombin complex concentrate (PCC) rather than FFP"
        ],
        [
          "Direct oral anticoagulant (DOAC; dabigatran, rivaroxaban, apixaban, edoxaban)",
          "Suggest against routine PCC, idarucizumab and andexanet alfa; most bleeding settles with time because of short half-life"
        ],
        [
          "Life-threatening bleeding on vitamin K antagonist (VKA) or DOAC",
          "Reversal agents may be considered (ACG 2023) with hematology input"
        ],
        [
          "Antiplatelet drugs",
          "Suggest against platelet transfusion"
        ],
        [
          "Aspirin for secondary cardiovascular prevention",
          "Avoid stopping, or resume as soon as hemostasis is secured; continuing aspirin lowered mortality (Sung, Ann Intern Med 2010)"
        ],
        [
          "Dual antiplatelet therapy after recent coronary stent",
          "Do not stop both drugs; decide with cardiology"
        ]
      ],
      "title": "Acute GI bleeding, drug by drug"
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "4-factor prothrombin complex concentrate (warfarin, life-threatening bleeding)",
          "By INR: INR 2 to <4: 25 units/kg, max 2500 units; INR 4–6: 35 units/kg, max 3500 units; INR >6: 50 units/kg, max 5000 units (product label). INR below 2: no label dose; discuss with hematology"
        ],
        [
          "Vitamin K (warfarin, life-threatening bleeding)",
          "10 mg slow IV, with 4-factor prothrombin complex concentrate"
        ],
        [
          "Idarucizumab (dabigatran, life-threatening bleeding)",
          "5 g IV"
        ],
        [
          "Andexanet alfa or 4-factor prothrombin complex concentrate (apixaban or rivaroxaban, life-threatening bleeding)",
          "Dose per product label or local protocol, with hematology"
        ]
      ]
    }
  ],
  "related": [],
  "references": [
    ref("Abraham NS et al. ACG-CAG guideline: management of anticoagulants and antiplatelets during acute GI bleeding 2022. PMID 35297395", "https://pubmed.ncbi.nlm.nih.gov/35297395/"),
    ref("Sengupta N et al. ACG guideline: management of acute lower GI bleeding 2023. PMID 36735555", "https://pubmed.ncbi.nlm.nih.gov/36735555/"),
    ref("Sung JJ et al. Continuation of low-dose aspirin therapy in peptic ulcer bleeding: a randomized trial. Ann Intern Med 2010. PMID 19949136", "https://pubmed.ncbi.nlm.nih.gov/19949136/"),
    ref("Gralnek IM et al. ESGE NVUGIH guideline update. Endoscopy 2021. PMID 33567467", "https://pubmed.ncbi.nlm.nih.gov/33567467/")
  ]
};
