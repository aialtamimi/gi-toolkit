// SPEC.md B7.1 Upper GI bleeding: non-variceal and variceal: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_ugib",
  "spec": "B7.1",
  "name": "Upper GI bleeding: non-variceal and variceal",
  "short": "Upper GI bleeding",
  "aliases": [
    "upper GI bleeding",
    "UGIB",
    "non-variceal",
    "peptic ulcer bleeding",
    "hematemesis",
    "melena",
    "coffee-ground"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": true,
  "entries": {
    "variceal": {
      "D1": "Yes"
    }
  },
  "entryWords": {
    "variceal": [
      "variceal bleeding",
      "varices",
      "esophageal varices",
      "terlipressin",
      "TIPS",
      "band ligation"
    ]
  },
  "blocks": [
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "shock (systolic BP <90 mmHg or shock index >1), ongoing hematemesis, altered consciousness, Hb drop >2 g/dL: ICU or HDU, protect the airway."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "hematemesis, coffee-ground vomit, melena; shock index (heart rate/systolic BP) >1 = high risk. Variceal bleeding: upper GI bleeding in known or suspected cirrhosis or portal hypertension."
    },
    {
      "type": "step",
      "id": "U1",
      "chip": "0–1 h",
      "title": "First hour, all patients",
      "when": [],
      "items": [
        "Two large-bore cannulas; crystalloid resuscitation; bloods: CBC, INR, urea, creatinine, liver tests, crossmatch.",
        "GBS (B2.1) and AIMS65 (B2.2). GBS 0–1 with no other concern: outpatient management can be considered.",
        "Non-variceal: transfuse at Hb <7 g/dL, target 7–9 g/dL (8 g/dL threshold in cardiovascular disease).",
        "Suspected variceal: target 7–8 g/dL, individualized (Baveno VIII).",
        "Hold antithrombotics per B7.4.",
        "IV erythromycin 250 mg 30–90 minutes before endoscopy if no contraindication (QT prolongation).",
        "Start high-dose IV proton pump inhibitor now: pantoprazole or esomeprazole 80 mg IV bolus, then 8 mg/h infusion until endoscopy. Do not delay endoscopy for it."
      ],
      "calcs": [
        "gbs",
        "aims65"
      ],
      "doses": [],
      "why": [
        "Restrictive transfusion lowered mortality (Villanueva, NEJM 2013).",
        "Reduces high-risk stigmata and need for endoscopic therapy, but not mortality, rebleeding or surgery (Sreedharan, Cochrane 2010; ESGE 2021)."
      ]
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0–1 h",
      "title": "Known or suspected cirrhosis or portal hypertension?",
      "when": [],
      "items": [
        "Clues: stigmata of chronic liver disease, ascites, known varices, low platelets, splenomegaly.",
        "If uncertain, start the variceal pathway until endoscopy shows otherwise."
      ],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "variceal pathway."
        },
        {
          "value": "No",
          "text": "non-variceal pathway."
        }
      ]
    },
    {
      "type": "step",
      "id": "V1",
      "chip": "Before endoscopy",
      "title": "Variceal: before endoscopy",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Intensive or intermediate care.",
        "Intubate before endoscopy if altered consciousness or active hematemesis.",
        "Transfusion target Hb 7–8 g/dL, individualized for cardiovascular disease, age, hemodynamics and ongoing bleeding.",
        "Vasoactive drug as soon as possible, for 2–5 days or until TIPS; monitor sodium on terlipressin.",
        "Antibiotic prophylaxis at presentation with a third-generation cephalosporin (ceftriaxone 1 g IV every 24 hours, up to 7 days); duration individualized (Child-Pugh A: shorter course or none).",
        "Lactulose to prevent or treat overt hepatic encephalopathy; continue during admission.",
        "Early oral nutrition.",
        "No routine fresh frozen plasma, platelets or fibrinogen (platelets or fibrinogen only if bleeding is not controlled); no recombinant factor VIIa or tranexamic acid.",
        "Hold anticoagulants until bleeding is controlled.",
        "Cautious nasogastric tube.",
        "Erythromycin before endoscopy."
      ],
      "calcs": [],
      "doses": [
        "terlipressin"
      ],
      "why": [
        "Antibiotic prophylaxis reduces infection, rebleeding and death (Chavez-Tapia, Cochrane Database Syst Rev 2010; Baveno VIII). Over-transfusion raises portal pressure."
      ]
    },
    {
      "type": "step",
      "id": "V2",
      "chip": "Within 12 h",
      "title": "Variceal: endoscopy and imaging",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Endoscopy within 12 hours (as soon as possible if unstable).",
        "Contrast CT or MRI of the abdomen in every variceal bleed (portal vein thrombosis, HCC, collaterals)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D4",
      "chip": "At endoscopy",
      "title": "Bleeding source?",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "OV: esophageal varices; GOV: gastroesophageal varices; IGV: isolated gastric varices."
      ],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "OV or GOV1",
          "text": "band ligation."
        },
        {
          "value": "GOV2 or IGV1",
          "text": "cyanoacrylate, then TIPS."
        }
      ]
    },
    {
      "type": "step",
      "id": "V8",
      "chip": "At endoscopy",
      "title": "Esophageal varices or GOV1",
      "when": [
        [
          "D4",
          "OV or GOV1"
        ]
      ],
      "items": [
        "Esophageal varices: band ligation.",
        "Clips, over-the-scope clips, hemostatic powder or fibrin are not first-line."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "V9",
      "chip": "At endoscopy, then within 24–72 h",
      "title": "Gastric varices GOV2 or IGV1",
      "when": [
        [
          "D4",
          "GOV2 or IGV1"
        ]
      ],
      "items": [
        "Gastric varices GOV2 or IGV1: cyanoacrylate injection.",
        "Acute: cyanoacrylate injection, or EUS-guided coil plus cyanoacrylate in experienced centres.",
        "Definitive: TIPS with or without variceal embolization as soon as possible (<24–72 hours) if Child-Pugh score <14 (Child-Pugh A, B, or C up to 13).",
        "If TIPS is contraindicated: transvenous obliteration, endoscopic (including EUS) or surgical options after multidisciplinary discussion."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "V3",
      "chip": "After endoscopy",
      "title": "Variceal: after endoscopy",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Continue vasoactive drug for 2–5 days.",
        "Continue ceftriaxone, up to 7 days in total.",
        "Stop the proton pump inhibitor unless there is another indication."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "After endoscopy",
      "title": "Pre-emptive TIPS criteria met?",
      "when": [
        [
          "D4",
          "OV or GOV1"
        ]
      ],
      "items": [
        "Child-Pugh C 10–13, or Child-Pugh B >7 with active bleeding at endoscopy, or HVPG 20 mmHg or more.",
        "Also consider: age <75, creatinine <3 mg/dL, no heart failure.",
        "ACLF, overt HE, high bilirubin, high MELD and severe alcohol-associated hepatitis are not absolute contraindications."
      ],
      "calcs": [
        "child_pugh"
      ],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "pre-emptive TIPS."
        },
        {
          "value": "No",
          "text": "continue vasoactive drug."
        }
      ]
    },
    {
      "type": "step",
      "id": "V4",
      "chip": "Within 72 h",
      "title": "Pre-emptive TIPS",
      "when": [
        [
          "D2",
          "Yes"
        ]
      ],
      "items": [
        "Pre-emptive TIPS with a covered stent within 72 hours, ideally <24 hours.",
        "Window missed: TIPS within 2 weeks (Child-Pugh C 10–13) or within 1 week (Child-Pugh B >7 with active bleeding) may still help."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Pre-emptive TIPS improved survival in high-risk patients (Garcia-Pagan, NEJM 2010)."
      ]
    },
    {
      "type": "step",
      "id": "V5",
      "chip": "Days 2–5",
      "title": "Continue vasoactive drug",
      "when": [
        [
          "D2",
          "No"
        ]
      ],
      "items": [
        "Continue the vasoactive drug for 2–5 days; a shorter course (even 24 hours) can be considered after successful hemostasis if carvedilol or a non-selective beta-blocker is then started."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "V6",
      "chip": "If failure",
      "title": "Persistent bleeding or early rebleeding",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Treatment failure: uncontrolled bleeding or rebleeding within 5 days.",
        "Refractory bleeding (persistent bleeding or early rebleeding): covered self-expanding metal stent preferred over balloon tamponade as a bridge to TIPS or transplant.",
        "Consider salvage TIPS in every patient with refractory bleeding, regardless of age, Child-Pugh or MELD, case by case."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "V7",
      "chip": "Before discharge",
      "title": "Variceal: before discharge",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Carvedilol (preferred over propranolol or nadolol) when the vasoactive drug stops, plus band ligation every 2–4 weeks until eradication.",
        "Iron if Hb <10 g/dL.",
        "Evaluate for liver transplant.",
        "Proton pump inhibitors are not routinely used for post-banding ulcers.",
        "After eradication: endoscopy at 3–6 months, then every 6–12 months (AASLD 2017)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "N1",
      "chip": "Before endoscopy",
      "title": "Non-variceal: before endoscopy",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Upper endoscopy within 24 hours of presentation after resuscitation (ACG 2021, ESGE 2021)."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Endoscopy within 6 h did not lower mortality, even with GBS 12 or more (Lau, NEJM 2020)."
      ]
    },
    {
      "type": "step",
      "id": "N2",
      "chip": "Within 24 h",
      "title": "Non-variceal: endoscopic therapy by Forrest class",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Forrest Ia, Ib, IIa (B2.5): thermal contact therapy, clips, or sclerosant injection; epinephrine injection only in combination.",
        "Forrest IIb: consider clot removal and treat the underlying stigma.",
        "Forrest IIc and III: no endoscopic therapy.",
        "Hemostatic powder as temporary therapy for active bleeding."
      ],
      "calcs": [
        "forrest"
      ],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D3",
      "chip": "After endoscopy",
      "title": "High-risk or low-risk stigmata?",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Forrest (B2.5): high-risk stigmata are Ia, Ib, IIa and IIb; low-risk stigmata are IIc and III."
      ],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "High-risk stigmata",
          "text": "Forrest Ia, Ib, IIa, IIb; high-dose IV proton pump inhibitor."
        },
        {
          "value": "Low-risk stigmata",
          "text": "Forrest IIc, III; oral proton pump inhibitor."
        }
      ]
    },
    {
      "type": "step",
      "id": "N3",
      "chip": "72 h, then to day 14",
      "title": "High-risk stigmata",
      "when": [
        [
          "D3",
          "High-risk stigmata"
        ]
      ],
      "items": [
        "High-risk stigmata (endoscopic therapy done, or Forrest IIb): continue the infusion for 72 hours after endoscopy (or 40 mg IV twice daily), then oral twice daily to day 14, then once daily."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "N4",
      "chip": "After endoscopy",
      "title": "Low-risk stigmata",
      "when": [
        [
          "D3",
          "Low-risk stigmata"
        ]
      ],
      "items": [
        "Low-risk stigmata: stop the infusion; oral proton pump inhibitor once daily; early feeding; consider discharge."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "N5",
      "chip": "After endoscopy",
      "title": "Non-variceal: second-look endoscopy",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "No routine second-look endoscopy; repeat only if rebleeding (ESGE 2021, ACG 2021)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "N6",
      "chip": "If rebleeding",
      "title": "Non-variceal: rebleeding",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Repeat endoscopy (over-the-scope clip for recurrent ulcer bleeding); if it fails, transcatheter arterial embolization, then surgery."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "N7",
      "chip": "Discharge",
      "title": "Non-variceal: discharge",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Test for H. pylori and treat; repeat the test later if negative during the bleed.",
        "Avoid non-steroidal anti-inflammatory drugs (NSAIDs).",
        "Restart aspirin for secondary prevention as soon as hemostasis is secured (B7.4)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "all patients: tranexamic acid. Non-variceal: urgent endoscopy within 6 hours does not improve mortality (Lau, NEJM 2020). Variceal: fresh frozen plasma or platelets to \"correct\" INR alone; over-transfusion (raises portal pressure); proton pump inhibitor continued long term without indication.",
      "why": "Tranexamic acid gave no benefit and more venous thrombosis (HALT-IT, Lancet 2020)."
    },
    {
      "type": "table",
      "columns": [
        "Feature",
        "Variceal",
        "Non-variceal"
      ],
      "rows": [
        [
          "Endoscopy timing",
          "Within 12 hours",
          "Within 24 hours"
        ],
        [
          "First drugs",
          "Vasoactive drug + ceftriaxone",
          "Proton pump inhibitor"
        ],
        [
          "Proton pump inhibitor",
          "Start before endoscopy; stop after unless another indication",
          "Start before endoscopy; 72 h infusion if high-risk stigmata"
        ],
        [
          "Endoscopic therapy",
          "Band ligation or cyanoacrylate",
          "Forrest-based therapy"
        ],
        [
          "Follow-up",
          "Beta-blocker, ligation, TIPS",
          "H. pylori, aspirin restart"
        ]
      ],
      "title": "Key differences"
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Erythromycin",
          "250 mg IV over 5–30 minutes, given 30–90 minutes before endoscopy"
        ],
        [
          "Pantoprazole or esomeprazole, high dose",
          "80 mg IV bolus, then 8 mg/h infusion for 72 hours; or 40 mg IV twice daily as intermittent high dose"
        ],
        [
          "Terlipressin",
          "IV every 4 hours for 48 hours (<50 kg: 1 mg; 50–70 kg: 1.5 mg; >70 kg: 2 mg), then 1 mg every 4 hours"
        ],
        [
          "Octreotide",
          "50 µg IV bolus, then 50 µg/h infusion for 2–5 days; bolus can be repeated in the first hour"
        ],
        [
          "Somatostatin",
          "250 µg IV bolus, then 250–500 µg/h infusion"
        ],
        [
          "Ceftriaxone",
          "1 g IV every 24 hours, maximum 7 days; duration individualized (Child-Pugh A: shorter course or none)"
        ]
      ]
    }
  ],
  "related": [
    "gbs",
    "aims65",
    "rockall",
    "forrest",
    "child_pugh",
    "meld3",
    "west_haven"
  ],
  "references": [
    ref("Laine L et al. ACG Clinical Guideline: Upper GI and Ulcer Bleeding. Am J Gastroenterol 2021. PMID 33929377", "https://pubmed.ncbi.nlm.nih.gov/33929377/"),
    ref("Gralnek IM et al. ESGE NVUGIH guideline update. Endoscopy 2021. PMID 33567467", "https://pubmed.ncbi.nlm.nih.gov/33567467/"),
    ref("Sreedharan A et al. Proton pump inhibitor treatment initiated prior to endoscopic diagnosis in upper gastrointestinal bleeding. Cochrane Database Syst Rev 2010. PMID 20614440", "https://pubmed.ncbi.nlm.nih.gov/20614440/"),
    ref("Baveno VIII Faculty. Baveno VIII - Advancing consensus in portal hypertension. J Hepatol 2026;85:993-1018. PMID 42624290", "https://pubmed.ncbi.nlm.nih.gov/42624290/"),
    ref("Gralnek IM et al. ESGE variceal guideline 2022", "https://pubmed.ncbi.nlm.nih.gov/36174643"),
    ref("Garcia-Tsao G et al. Portal hypertensive bleeding in cirrhosis: risk stratification, diagnosis, and management: 2016 practice guidance by the American Association for the Study of Liver Diseases. Hepatology 2017. PMID 27786365", "https://pubmed.ncbi.nlm.nih.gov/27786365/"),
    ref("HALT-IT Trial Collaborators. Effects of a high-dose 24-h infusion of tranexamic acid on death and thromboembolic events in patients with acute gastrointestinal bleeding (HALT-IT). Lancet 2020. PMID 32563378", "https://pubmed.ncbi.nlm.nih.gov/32563378/"),
    ref("Lau JYW et al. Timing of endoscopy for acute upper gastrointestinal bleeding. NEJM 2020. PMID 32242355", "https://pubmed.ncbi.nlm.nih.gov/32242355/"),
    ref("Villanueva C et al. Transfusion strategies for acute upper gastrointestinal bleeding. NEJM 2013. PMID 23281973", "https://pubmed.ncbi.nlm.nih.gov/23281973/"),
    ref("Garcia-Pagan JC et al. Early use of TIPS in patients with cirrhosis and variceal bleeding. NEJM 2010. PMID 20573925", "https://pubmed.ncbi.nlm.nih.gov/20573925/"),
    ref("Chavez-Tapia NC et al. Antibiotic prophylaxis for cirrhotic patients with upper gastrointestinal bleeding. Cochrane Database Syst Rev 2010. PMID 20824832", "https://pubmed.ncbi.nlm.nih.gov/20824832/")
  ]
};
