// SPEC.md B7.7 Acute liver failure: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_alf",
  "spec": "B7.7",
  "name": "Acute liver failure",
  "short": "Acute liver failure",
  "aliases": [
    "acute liver failure",
    "ALF",
    "fulminant hepatic failure",
    "acetaminophen overdose",
    "paracetamol overdose",
    "N-acetylcysteine"
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
      "text": "HE grade 2 or more: ICU; grade 3–4: intubate; hypoglycemia; shock; signs of raised intracranial pressure (hypertension with bradycardia, pupil changes)."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "INR ≥1.5 and any degree of hepatic encephalopathy, without pre-existing cirrhosis, illness <26 weeks (AASLD)."
    },
    {
      "type": "step",
      "id": "F1",
      "chip": "0–1 h",
      "title": "Call the transplant center and investigate",
      "when": [],
      "items": [
        "Contact the liver transplant center at once; ICU if HE grade ≥2; glucose every 1–2 hours.",
        "N-acetylcysteine for acetaminophen cases (and consider for non-acetaminophen ALF with early HE grade 1–2; Lee, Gastroenterology 2009).",
        "Check acetaminophen level, viral serology (hepatitis A, B with delta, E, HSV), autoimmune markers, ceruloplasmin, pregnancy test, toxicology.",
        "Add arterial ammonia, lactate and phosphate.",
        "Arterial ammonia >150–200 µmol/L raises the risk of intracranial hypertension (EASL 2017)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0–1 h",
      "title": "Acetaminophen (paracetamol) cause?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "N-acetylcysteine 21-hour regimen."
        },
        {
          "value": "No",
          "text": "cause-specific treatment."
        }
      ]
    },
    {
      "type": "step",
      "id": "F2",
      "chip": "0–21 h and beyond",
      "title": "N-acetylcysteine",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "N-acetylcysteine 21-hour regimen; continue until INR improves.",
        "Dosing weight capped at 100 kg (US label); follow local protocol."
      ],
      "calcs": [],
      "doses": [
        "nac_150",
        "nac_50",
        "nac_100"
      ],
      "why": []
    },
    {
      "type": "step",
      "id": "F3",
      "chip": "0–6 h",
      "title": "Cause-specific treatment",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Consider N-acetylcysteine if HE grade 1–2 (Lee, Gastroenterology 2009).",
        "Cause-specific treatment (AASLD 2011):",
        "HSV: IV acyclovir.",
        "Hepatitis B: entecavir or tenofovir.",
        "Amanita mushroom: N-acetylcysteine plus silibinin or penicillin G.",
        "Acute fatty liver of pregnancy or HELLP: urgent delivery.",
        "Wilson disease: urgent transplant listing, plasma exchange as bridge. Clue to Wilson disease: ALP to bilirubin ratio <4 and AST to ALT ratio >2.2.",
        "Budd-Chiari: anticoagulation, consider TIPS.",
        "Autoimmune: discuss corticosteroids with the transplant center.",
        "Dosing weight capped at 100 kg (US label); follow local protocol."
      ],
      "calcs": [],
      "doses": [
        "nac_150",
        "nac_50",
        "nac_100"
      ],
      "why": []
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "Within hours",
      "title": "King's College criteria met?",
      "when": [],
      "items": [
        "King's College criteria (B3.18).",
        "Not met may mean incomplete data; reassess at least daily."
      ],
      "calcs": [
        "kings"
      ],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "urgent transplant listing."
        },
        {
          "value": "No",
          "text": "reassess at least daily."
        }
      ]
    },
    {
      "type": "step",
      "id": "F4",
      "chip": "Now",
      "title": "Urgent transplant listing",
      "when": [
        [
          "D2",
          "Yes"
        ]
      ],
      "items": [
        "Urgent transplant listing."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "F5",
      "chip": "Daily",
      "title": "Reassess",
      "when": [
        [
          "D2",
          "No"
        ]
      ],
      "items": [
        "Reassess King's College criteria at least daily."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "F6",
      "chip": "ICU",
      "title": "ICU care",
      "when": [],
      "items": [
        "Intubate for HE grade 3–4.",
        "Intracranial pressure measures: head of bed 30°, sodium target 145–155 mmol/L with hypertonic saline.",
        "Glucose every 1–2 hours.",
        "Low threshold for antibiotics.",
        "Continuous renal replacement therapy for AKI, acidosis or high ammonia (EASL 2017).",
        "No routine fresh frozen plasma (FFP)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "sedatives, lactulose (bowel distension), routine fresh frozen plasma (FFP) to correct INR (masks prognosis), nephrotoxins."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "N-acetylcysteine, 21-hour IV regimen",
          "150 mg/kg over 1 hour, then 50 mg/kg over 4 hours, then 100 mg/kg over 16 hours; continue the last rate beyond 21 hours in ALF until INR improves (or use the local two-bag regimen)"
        ]
      ]
    }
  ],
  "related": [
    "kings",
    "meld_na"
  ],
  "references": [
    ref("Lee WM, Stravitz RT, Larson AM. Introduction to the revised American Association for the Study of Liver Diseases Position Paper on acute liver failure 2011. Hepatology 2012;55(3):965-7. doi:10.1002/hep.25551. PMID 22213561", "https://pubmed.ncbi.nlm.nih.gov/22213561/"),
    ref("Lee WM et al. Intravenous N-acetylcysteine improves transplant-free survival in early stage non-acetaminophen acute liver failure. Gastroenterology 2009. PMID 19524577", "https://pubmed.ncbi.nlm.nih.gov/19524577/"),
    ref("European Association for the Study of the Liver. EASL Clinical Practical Guidelines on the management of acute (fulminant) liver failure. J Hepatol 2017. PMID 28417882", "https://pubmed.ncbi.nlm.nih.gov/28417882/")
  ]
};
