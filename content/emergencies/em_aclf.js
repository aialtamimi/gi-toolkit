// SPEC.md B7.20 Acute-on-chronic liver failure: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_aclf",
  "spec": "B7.20",
  "name": "Acute-on-chronic liver failure",
  "short": "Acute-on-chronic liver failure (ACLF)",
  "aliases": [
    "acute-on-chronic liver failure",
    "acute on chronic liver failure",
    "ACLF",
    "decompensated cirrhosis with organ failure",
    "CLIF-C",
    "organ failure in cirrhosis"
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
      "text": "need for organ support (vasopressors, ventilation, renal replacement), massive bleeding, HE grade 3–4, septic shock: ICU within 6 hours."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "acute decompensation of cirrhosis (ascites, HE, GI bleeding, infection, jaundice) with organ failure by EASL-CLIF criteria; the ACLF grade (B3.17) gives 28-day mortality."
    },
    {
      "type": "step",
      "id": "A1",
      "chip": "0–6 h",
      "title": "Grade and find the precipitant",
      "when": [],
      "items": [
        "ACLF grade (B3.17).",
        "Screen every patient for precipitants: infection (blood, urine and ascitic cultures, diagnostic paracentesis, chest X-ray), alcohol-associated hepatitis, GI bleeding, drug-induced liver injury, hepatitis B flare (HBsAg, HBV DNA), hepatitis A and E, autoimmune hepatitis.",
        "Infection suspected: broad-spectrum antibiotics per local epidemiology as soon as possible.",
        "Septic shock or worsening ACLF: cover all likely pathogens; de-escalate at 24–72 hours by microbiology; consider antifungals in nosocomial septic shock with fungal risk factors."
      ],
      "calcs": [
        "aclf"
      ],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0–6 h",
      "title": "ICU criteria? (organ support, massive bleeding, HE grade 3–4, septic shock)",
      "when": [],
      "items": [
        "Decide case by case with severe comorbidity or frailty."
      ],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "ICU within 6 hours."
        },
        {
          "value": "No",
          "text": "HDU or ward with close monitoring."
        }
      ]
    },
    {
      "type": "step",
      "id": "A2",
      "chip": "Within 6 h",
      "title": "ICU",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "ICU within 6 hours."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "A3",
      "chip": "Daily",
      "title": "HDU or ward",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "HDU or ward with close monitoring; reassess daily."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "A4",
      "chip": "0–24 h",
      "title": "Treat the precipitant",
      "when": [],
      "items": [
        "Infection or spontaneous bacterial peritonitis: see B7.9.",
        "Variceal bleeding: see B7.1; consider pre-emptive or rescue TIPS if no contraindication; HE alone is not an absolute contraindication.",
        "Alcohol-associated hepatitis: see B7.8; no corticosteroids with ACLF grade 3 or uncontrolled infection; if given, monitor closely for infection.",
        "Hepatitis B flare: entecavir or tenofovir at once, without waiting for HBV DNA; refer for transplant if severe (MELD >30, ACLF grade 2–3).",
        "Autoimmune hepatitis: corticosteroids; transplant assessment if bilirubin or MELD-Na has not improved after 7 days."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "A5",
      "chip": "0–72 h",
      "title": "Organ support, by failing organ",
      "when": [],
      "items": [
        "Circulation: albumin or balanced crystalloids for initial fluids (albumin if large volumes plus vasopressors); norepinephrine first line; target MAP 65 mmHg or more; terlipressin or vasopressin as second line; hydrocortisone 200 mg/day (50 mg IV every 6 hours) if norepinephrine >0.25 µg/kg/min, maximum 10 days. No dopamine.",
        "Kidney: manage as HRS-AKI (B7.10). Terlipressin: higher risk of respiratory failure in ACLF grade 3 or volume overload (CONFIRM, NEJM 2021). Renal replacement therapy if potassium >6.5 mmol/L, pH <7.2, refractory fluid overload or anuria; continuous, effluent dose 25–30 mL/kg/h.",
        "Brain: manage HE (B7.11); grade 3–4: intubate to protect the airway.",
        "Respiration: high-flow nasal oxygen over non-invasive ventilation for hypoxemic failure; lung-protective ventilation (6 mL/kg predicted body weight); SpO2 target 92–100%.",
        "Coagulation: no prophylactic correction of INR or platelets; if bleeding, guide products by viscoelastic tests; venous thromboembolism prophylaxis (low-molecular-weight heparin or mechanical, by coagulopathy).",
        "Nutrition: oral first, then enteral (nasojejunal preferred), parenteral only if enteral fails; energy 30–35 kcal/kg/day; protein 1.2–1.5 g/kg/day, no protein restriction; IV glucose 2–3 g/kg/day if fasting >12 hours; watch for refeeding syndrome."
      ],
      "calcs": [],
      "doses": [
        "aclf_crrt",
        "aclf_energy",
        "aclf_protein",
        "aclf_glucose"
      ],
      "why": []
    },
    {
      "type": "step",
      "id": "A6",
      "chip": "Early",
      "title": "Transplant referral",
      "when": [],
      "items": [
        "Refer early to a transplant center, especially ACLF grade 2–3."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Transplant in ACLF grade 3 gave good survival in selected patients (Artru, J Hepatol 2017)."
      ]
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "Day 3–7",
      "title": "After 3–7 days of full organ support: 4 or more organ failures or CLIF-C ACLF >70, and no transplant option?",
      "when": [],
      "items": [
        "CLIF-C ACLF score (B3.21); it also counts organ failures by the EASL-CLIF definitions from the same inputs."
      ],
      "calcs": [
        "clif_c_aclf"
      ],
      "doses": [],
      "why": [
        "Judge prognosis after 3–7 days of full organ support, not at admission (EASL 2023; Gustot, Hepatology 2015)."
      ],
      "options": [
        {
          "value": "Yes",
          "text": "discuss withdrawal of organ support and palliative care."
        },
        {
          "value": "No",
          "text": "continue full support and transplant evaluation."
        }
      ]
    },
    {
      "type": "step",
      "id": "A7",
      "chip": "Day 3–7",
      "title": "Withdrawal of organ support",
      "when": [
        [
          "D2",
          "Yes"
        ]
      ],
      "items": [
        "Discuss withdrawal of organ support and palliative care with the family."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "A8",
      "chip": "Day 3–7",
      "title": "Continue full support",
      "when": [
        [
          "D2",
          "No"
        ]
      ],
      "items": [
        "Continue full support and transplant evaluation; repeat the score."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "routine granulocyte colony-stimulating factor (GRAFT, J Hepatol 2021); routine plasma exchange or extracorporeal liver support outside trials; dopamine; protein restriction; prophylactic fresh frozen plasma or platelets."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Hydrocortisone (septic shock, norepinephrine >0.25 µg/kg/min)",
          "50 mg IV every 6 hours (200 mg/day), maximum 10 days"
        ],
        [
          "Continuous renal replacement therapy",
          "Effluent dose 25–30 mL/kg/h"
        ],
        [
          "Energy (target, not a dose)",
          "30–35 kcal/kg/day"
        ],
        [
          "Protein (target, not a dose)",
          "1.2–1.5 g/kg/day, no protein restriction"
        ],
        [
          "IV glucose (target, not a dose)",
          "2–3 g/kg/day if fasting >12 hours"
        ]
      ]
    }
  ],
  "related": [
    "aclf",
    "clif_c_aclf",
    "meld_na",
    "west_haven"
  ],
  "references": [
    ref("European Association for the Study of the Liver. EASL Clinical Practice Guidelines on acute-on-chronic liver failure. J Hepatol 2023. PMID 37364789", "https://pubmed.ncbi.nlm.nih.gov/37364789/"),
    ref("Bajaj JS et al. ACG Clinical Guideline: acute-on-chronic liver failure. Am J Gastroenterol 2022. PMID 35006099", "https://pubmed.ncbi.nlm.nih.gov/35006099/"),
    ref("Moreau R et al. Acute-on-chronic liver failure (CANONIC). Gastroenterology 2013. PMID 23474284", "https://pubmed.ncbi.nlm.nih.gov/23474284/"),
    ref("Jalan R et al. Development and validation of a prognostic score to predict mortality in patients with acute-on-chronic liver failure (CLIF-C ACLF). J Hepatol 2014. PMID 24950482", "https://pubmed.ncbi.nlm.nih.gov/24950482/"),
    ref("Gustot T et al. Clinical course of acute-on-chronic liver failure syndrome and effects on prognosis. Hepatology 2015. PMID 25877702", "https://pubmed.ncbi.nlm.nih.gov/25877702/"),
    ref("Artru F et al. Liver transplantation in the most severely ill cirrhotic patients: a multicenter study in acute-on-chronic liver failure grade 3. J Hepatol 2017. PMID 28645736", "https://pubmed.ncbi.nlm.nih.gov/28645736/"),
    ref("Engelmann C et al. Granulocyte-colony stimulating factor to treat acute-on-chronic liver failure: a multicenter randomized trial (GRAFT). J Hepatol 2021. PMID 34364917", "https://pubmed.ncbi.nlm.nih.gov/34364917/"),
    ref("Wong F et al. Terlipressin plus albumin for the treatment of type 1 hepatorenal syndrome (CONFIRM). NEJM 2021. PMID 33657294", "https://pubmed.ncbi.nlm.nih.gov/33657294/"),
    ref("Engelmann C et al. Validation of CLIF-C ACLF score to define a threshold for futility of intensive care support for patients with acute-on-chronic liver failure. Crit Care 2018. PMID 30305132", "https://pubmed.ncbi.nlm.nih.gov/30305132/")
  ]
};
