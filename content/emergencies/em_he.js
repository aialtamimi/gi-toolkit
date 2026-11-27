// SPEC.md B7.11 Overt hepatic encephalopathy: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_he",
  "spec": "B7.11",
  "name": "Overt hepatic encephalopathy",
  "short": "Hepatic encephalopathy",
  "aliases": [
    "hepatic encephalopathy",
    "HE",
    "overt hepatic encephalopathy",
    "lactulose",
    "rifaximin",
    "encephalopathy"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": true,
  "entries": {},
  "entryWords": {},
  "blocks": [
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "grade 3–4, seizures, focal signs, hypoglycemia: ICU."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "West Haven grade 2–4 (B3.16) in cirrhosis; exclude other causes (glucose, sepsis, drugs, intracranial bleed; CT head if focal signs, first episode, or fall)."
    },
    {
      "type": "step",
      "id": "E1",
      "chip": "0 h",
      "title": "Confirm and grade",
      "when": [],
      "items": [
        "Grade with West Haven.",
        "A normal ammonia makes HE unlikely; a high ammonia alone does not confirm it (AASLD-EASL 2014)."
      ],
      "calcs": [
        "west_haven"
      ],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0 h",
      "title": "Grade 3–4?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "ICU, protect airway."
        },
        {
          "value": "No",
          "text": "ward, oral lactulose."
        }
      ]
    },
    {
      "type": "step",
      "id": "E2",
      "chip": "0 h",
      "title": "ICU",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "ICU; protect the airway in grade 3–4; lactulose by nasogastric tube or enema."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "E3",
      "chip": "0 h",
      "title": "Ward",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Ward; oral lactulose."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "E4",
      "chip": "0–24 h",
      "title": "Find and treat precipitants",
      "when": [],
      "items": [
        "Find and treat precipitants (infection, GI bleeding, constipation, dehydration, hypokalemia or hyponatremia, sedatives, AKI, TIPS)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "E5",
      "chip": "0–24 h",
      "title": "Treat with lactulose or polyethylene glycol 3350",
      "when": [],
      "items": [
        "Lactulose, or polyethylene glycol 3350 (see Doses)."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Polyethylene glycol 3350 resolved HE faster than lactulose (HELP, JAMA Intern Med 2014)."
      ]
    },
    {
      "type": "decision",
      "id": "D2",
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
          "text": "continue."
        },
        {
          "value": "No",
          "text": "look for another cause."
        }
      ]
    },
    {
      "type": "step",
      "id": "E6",
      "chip": "24–48 h",
      "title": "Improving",
      "when": [
        [
          "D2",
          "Yes"
        ]
      ],
      "items": [
        "Continue treatment."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "E7",
      "chip": "24–48 h",
      "title": "Not improving",
      "when": [
        [
          "D2",
          "No"
        ]
      ],
      "items": [
        "Look for another cause, check lactulose response (2–3 soft stools/day), consider adding rifaximin."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "E8",
      "chip": "Before discharge",
      "title": "Prevent recurrence",
      "when": [],
      "items": [
        "Rifaximin added to lactulose after a recurrence (Bass, NEJM 2010); review benzodiazepines and opioids; nutrition with normal protein intake (1.2–1.5 g/kg/day).",
        "Lactulose as secondary prophylaxis.",
        "Consider transplant referral.",
        "Recurrent or persistent HE despite optimal therapy: consider embolization of large spontaneous portosystemic shunts (especially with preserved liver function) and transplant evaluation; L-ornithine L-aspartate can be considered (Baveno VIII)."
      ],
      "calcs": [],
      "doses": [
        "protein_target"
      ],
      "why": [
        "Rifaximin reduced recurrence and HE hospitalization (Bass, NEJM 2010)."
      ]
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "protein restriction; sedatives; under-dosed lactulose."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Lactulose",
          "25 mL orally every 1–2 hours until at least 2 soft bowel movements, then titrate to 2–3 soft bowel movements per day; enema if unable to take orally"
        ],
        [
          "Polyethylene glycol 3350 (alternative)",
          "4 L over 4 hours (HELP trial, JAMA Intern Med 2014)"
        ],
        [
          "Rifaximin",
          "550 mg orally twice daily"
        ]
      ]
    }
  ],
  "related": [
    "west_haven",
    "meld_na",
    "child_pugh"
  ],
  "references": [
    ref("Vilstrup H et al. Hepatic encephalopathy in chronic liver disease: 2014 Practice Guideline by AASLD and EASL. Hepatology 2014. PMID 25042402", "https://pubmed.ncbi.nlm.nih.gov/25042402/"),
    ref("Bass NM et al. Rifaximin treatment in hepatic encephalopathy. NEJM 2010. PMID 20335583", "https://pubmed.ncbi.nlm.nih.gov/20335583/"),
    ref("Rahimi RS et al. Lactulose vs polyethylene glycol 3350-electrolyte solution for treatment of overt hepatic encephalopathy: the HELP randomized clinical trial. JAMA Intern Med 2014;174(11):1727-33. doi:10.1001/jamainternmed.2014.4746. PMID 25243839", "https://pubmed.ncbi.nlm.nih.gov/25243839/"),
    ref("Baveno VIII Faculty. Baveno VIII - Advancing consensus in portal hypertension. J Hepatol 2026;85:993-1018. PMID 42624290", "https://pubmed.ncbi.nlm.nih.gov/42624290/")
  ]
};
