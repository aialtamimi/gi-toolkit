// SPEC.md B7.9 Spontaneous bacterial peritonitis: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_sbp",
  "spec": "B7.9",
  "name": "Spontaneous bacterial peritonitis",
  "short": "SBP",
  "aliases": [
    "spontaneous bacterial peritonitis",
    "SBP",
    "ascites infection",
    "paracentesis",
    "albumin"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": true,
  "entries": {},
  "blocks": [
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "shock, AKI, hepatic encephalopathy: ICU or HDU."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "ascitic PMN ≥250/mm³ (B3.12). Do a diagnostic paracentesis in every patient with cirrhosis and ascites admitted to hospital, and with any GI bleeding, infection signs, HE or AKI."
    },
    {
      "type": "step",
      "id": "S1",
      "chip": "0 h",
      "title": "Diagnostic paracentesis before antibiotics",
      "when": [],
      "items": [
        "Diagnostic paracentesis before antibiotics in every patient with cirrhosis and ascites who is admitted, has GI bleeding, or deteriorates (fever, abdominal pain, encephalopathy, AKI). Do not delay.",
        "Blood and ascitic cultures: inoculate blood culture bottles at the bedside."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0–6 h",
      "title": "Ascitic fluid result?",
      "when": [],
      "items": [
        "Ascitic fluid analysis (B3.12): PMN count, culture and Runyon criteria."
      ],
      "calcs": [
        "ascites"
      ],
      "doses": [],
      "why": null,
      "options": [
        {
          "value": "PMN 250/mm³ or more",
          "text": "treat as SBP."
        },
        {
          "value": "PMN <250/mm³, positive culture, symptomatic",
          "text": "treat."
        },
        {
          "value": "PMN <250/mm³, positive culture, asymptomatic",
          "text": "repeat paracentesis."
        },
        {
          "value": "PMN <250/mm³, culture negative or pending",
          "text": "SBP unlikely."
        },
        {
          "value": "Runyon criteria or polymicrobial culture",
          "text": "suspect secondary peritonitis."
        }
      ]
    },
    {
      "type": "step",
      "id": "S2",
      "chip": "0–6 h",
      "title": "Repeat paracentesis",
      "when": [
        [
          "D1",
          "PMN <250/mm³, positive culture, asymptomatic"
        ]
      ],
      "items": [
        "PMN <250/mm³ with positive culture and no symptoms: repeat paracentesis."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "S3",
      "chip": "0–6 h",
      "title": "SBP unlikely",
      "when": [
        [
          "D1",
          "PMN <250/mm³, culture negative or pending"
        ]
      ],
      "items": [
        "SBP unlikely: no SBP treatment.",
        "Look for another cause of deterioration.",
        "Act on the culture result when it returns."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "S4",
      "chip": "Now",
      "title": "Suspected secondary peritonitis",
      "when": [
        [
          "D1",
          "Runyon criteria or polymicrobial culture"
        ]
      ],
      "items": [
        "Runyon criteria or polymicrobial culture: suspect secondary peritonitis, urgent CT and surgical review."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "S5",
      "chip": "Within 6 h",
      "title": "Treat: antibiotics and albumin",
      "when": [
        [
          "D1",
          "PMN 250/mm³ or more"
        ],
        [
          "D1",
          "PMN <250/mm³, positive culture, symptomatic"
        ]
      ],
      "items": [
        "Empirical antibiotics: community-acquired, cefotaxime 2 g IV every 8 hours (or ceftriaxone) for 5–7 days; nosocomial, recent antibiotics or sepsis, piperacillin-tazobactam or a carbapenem per local resistance.",
        "IV albumin 1.5 g/kg within 6 hours of diagnosis (day 1) and 1 g/kg on day 3.",
        "Stop diuretics and nephrotoxins; review non-selective beta-blockers if systolic BP <90 mmHg, sodium <130 mmol/L or AKI."
      ],
      "calcs": [],
      "doses": [
        "albumin_day1",
        "albumin_day3"
      ],
      "why": "Albumin reduced renal failure and in-hospital death (Sort, NEJM 1999)."
    },
    {
      "type": "step",
      "id": "S6",
      "chip": "48 h",
      "title": "Check response",
      "when": [
        [
          "D1",
          "PMN 250/mm³ or more"
        ],
        [
          "D1",
          "PMN <250/mm³, positive culture, symptomatic"
        ]
      ],
      "items": [
        "Repeat paracentesis if no clinical improvement; PMN fall <25% = treatment failure, broaden antibiotics and look for secondary peritonitis."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "S7",
      "chip": "Before discharge",
      "title": "Prevent recurrence",
      "when": [
        [
          "D1",
          "PMN 250/mm³ or more"
        ],
        [
          "D1",
          "PMN <250/mm³, positive culture, symptomatic"
        ]
      ],
      "items": [
        "Long-term secondary prophylaxis after the first episode: norfloxacin 400 mg daily, ciprofloxacin 500 mg daily, or trimethoprim-sulfamethoxazole.",
        "Refer for liver transplant assessment."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "large-volume paracentesis during active SBP without albumin; non-steroidal anti-inflammatory drugs (NSAIDs); consider holding non-selective beta-blockers if systolic BP <90 mmHg, sodium <130 mmol/L or AKI."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Cefotaxime (community-acquired)",
          "2 g IV every 8 hours for 5–7 days"
        ],
        [
          "Ceftriaxone (alternative)",
          "1–2 g IV every 24 hours"
        ],
        [
          "Nosocomial or recent antibiotics",
          "Broader cover per local resistance (for example piperacillin-tazobactam or a carbapenem)"
        ],
        [
          "Albumin 20–25%",
          "1.5 g/kg on day 1 and 1 g/kg on day 3 (Sort, NEJM 1999)"
        ],
        [
          "Secondary prophylaxis",
          "Norfloxacin 400 mg daily, or ciprofloxacin 500 mg daily, or trimethoprim-sulfamethoxazole"
        ]
      ]
    }
  ],
  "related": [
    "ascites",
    "meld_na"
  ],
  "references": [
    ref("Sort P et al. Effect of intravenous albumin on renal impairment and mortality in patients with cirrhosis and spontaneous bacterial peritonitis. NEJM 1999. PMID 10432325", "https://pubmed.ncbi.nlm.nih.gov/10432325/")
  ]
};
