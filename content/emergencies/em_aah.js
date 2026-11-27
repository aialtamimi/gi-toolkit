// SPEC.md B7.8 Severe alcohol-associated hepatitis: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_aah",
  "spec": "B7.8",
  "name": "Severe alcohol-associated hepatitis",
  "short": "Alcohol-associated hepatitis",
  "aliases": [
    "alcohol-associated hepatitis",
    "alcoholic hepatitis",
    "AAH",
    "prednisolone",
    "steroids"
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
      "text": "sepsis, GI bleeding, AKI, HE grade 3–4, organ failure (ACLF grade, B3.17): ICU.",
      "calcs": [
        "aclf"
      ]
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "jaundice (bilirubin >3 mg/dL) within 8 weeks of heavy alcohol use, AST >50 IU/L, AST to ALT >1.5, both <400 IU/L; severe if MELD >20 or Maddrey DF ≥32."
    },
    {
      "type": "step",
      "id": "H1",
      "chip": "Day 0",
      "title": "Assess severity and screen",
      "when": [],
      "items": [
        "Screen for infection (blood, urine, ascitic cultures, chest X-ray), GI bleeding and AKI; alcohol withdrawal management; nutrition (oral or enteral); thiamine.",
        "Transjugular liver biopsy only if the diagnosis is uncertain."
      ],
      "calcs": [
        "meld_na",
        "maddrey",
        "gahs",
        "abic"
      ],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "Day 0",
      "title": "Severe (MELD >20 or Maddrey 32 or more) and no contraindication (uncontrolled infection, active GI bleeding)?",
      "when": [],
      "items": [
        "MELD >51: steroids unlikely to help."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Steroids improved 30-day survival only at MELD 21–51, most at 25–39 (Arab, J Hepatol 2021).",
        "In STOPAH, prednisolone gave a trend to lower 28-day mortality; pentoxifylline gave no benefit (Thursz, NEJM 2015)."
      ],
      "options": [
        {
          "value": "Yes",
          "text": "prednisolone 40 mg once daily."
        },
        {
          "value": "No",
          "text": "supportive care, then reassess."
        }
      ]
    },
    {
      "type": "step",
      "id": "H2",
      "chip": "Day 0",
      "title": "Start prednisolone",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Prednisolone 40 mg once daily for 28 days if no contraindication."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "H3",
      "chip": "Day 0",
      "title": "Supportive care",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Supportive care, nutrition, abstinence; treat infection or bleeding first, then reassess."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D2",
      "chip": "Day 7",
      "title": "Lille 0.45 or more?",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Lille on day 7 (B3.5): ≥0.45 stop steroids."
      ],
      "calcs": [
        "lille"
      ],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "stop prednisolone (non-responder)."
        },
        {
          "value": "No",
          "text": "complete 28 days."
        }
      ]
    },
    {
      "type": "step",
      "id": "H4",
      "chip": "Day 7",
      "title": "Non-responder",
      "when": [
        [
          "D2",
          "Yes"
        ]
      ],
      "items": [
        "Stop prednisolone (non-responder); consider early transplant evaluation at an expert center."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "H5",
      "chip": "Day 7 to 28",
      "title": "Responder",
      "when": [
        [
          "D2",
          "No"
        ]
      ],
      "items": [
        "Complete 28 days of prednisolone."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "H6",
      "chip": "Long term",
      "title": "Then",
      "when": [],
      "items": [
        "Alcohol use disorder treatment; early liver transplant evaluation in selected non-responders at expert centers."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "pentoxifylline (no survival benefit in STOPAH, NEJM 2015); starting steroids with uncontrolled infection."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Prednisolone",
          "40 mg orally once daily for 28 days; stop at day 7 if Lille ≥0.45"
        ]
      ]
    }
  ],
  "related": [
    "maddrey",
    "meld_na",
    "gahs",
    "abic",
    "lille",
    "aclf"
  ],
  "references": [
    ref("Thursz MR et al. Prednisolone or pentoxifylline for alcoholic hepatitis (STOPAH). NEJM 2015. PMID 25901427", "https://pubmed.ncbi.nlm.nih.gov/25901427/"),
    ref("Louvet A et al. The Lille model. Hepatology 2007. PMID 17518367", "https://pubmed.ncbi.nlm.nih.gov/17518367/"),
    ref("Arab JP et al. Identification of optimal therapeutic window for steroid use in severe alcohol-associated hepatitis: a worldwide study. J Hepatol 2021. PMID 34166722", "https://pubmed.ncbi.nlm.nih.gov/34166722/")
  ]
};
