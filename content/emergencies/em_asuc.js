// SPEC.md B7.5 Acute severe ulcerative colitis: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_asuc",
  "spec": "B7.5",
  "name": "Acute severe ulcerative colitis",
  "short": "Acute severe UC",
  "aliases": [
    "acute severe ulcerative colitis",
    "ASUC",
    "severe UC",
    "ulcerative colitis flare",
    "infliximab rescue",
    "ciclosporin"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": true,
  "entries": {},
  "blocks": [
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "colonic dilatation >6 cm (B7.6), perforation, massive bleeding, peritonism: urgent surgical review."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "Truelove and Witts severe (B5.1): ≥6 bloody stools/day plus systemic toxicity."
    },
    {
      "type": "step",
      "id": "A1",
      "chip": "Day 0",
      "title": "Admit, investigate, start IV corticosteroids",
      "when": [],
      "items": [
        "Admit.",
        "Bloods: CBC, CRP, albumin, potassium, magnesium; correct potassium and magnesium.",
        "Stool culture and C. difficile toxin.",
        "Flexible sigmoidoscopy with biopsies for CMV.",
        "Plain abdominal X-ray.",
        "Venous thromboembolism prophylaxis with low-molecular-weight heparin.",
        "IV corticosteroids: methylprednisolone 60 mg every 24 hours or hydrocortisone 100 mg every 6 hours.",
        "Screen now for TB (IGRA, chest X-ray), hepatitis B, hepatitis C and HIV in case rescue therapy is needed.",
        "Inform the colorectal surgeon; involve the surgeon early."
      ],
      "calcs": [
        "truelove_witts"
      ],
      "doses": [],
      "why": "Venous thromboembolism risk is markedly higher during IBD flares."
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "Day 3",
      "title": "Day-3 criteria positive (Oxford or Lindgren)?",
      "when": [],
      "items": [
        "Oxford criteria (B5.2) on day 3 of IV corticosteroids."
      ],
      "calcs": [
        "asuc_day3"
      ],
      "doses": [],
      "why": null,
      "options": [
        {
          "value": "Yes",
          "text": "rescue therapy."
        },
        {
          "value": "No",
          "text": "continue IV corticosteroids."
        }
      ]
    },
    {
      "type": "step",
      "id": "A2",
      "chip": "Day 3",
      "title": "Rescue therapy",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Rescue therapy with infliximab or ciclosporin.",
        "Infliximab 5 mg/kg IV (consider 10 mg/kg or accelerated dosing with low albumin or high CRP).",
        "Or ciclosporin 2 mg/kg/day continuous IV infusion (avoid with low magnesium, low cholesterol or renal impairment)."
      ],
      "calcs": [],
      "doses": [
        "infliximab_5",
        "infliximab_10",
        "ciclosporin"
      ],
      "why": "Infliximab and ciclosporin have similar efficacy as rescue (CYSIF, Lancet 2012; CONSTRUCT, Lancet Gastroenterol Hepatol 2016)."
    },
    {
      "type": "step",
      "id": "A3",
      "chip": "Day 3 onward",
      "title": "Continue IV corticosteroids",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "Continue IV corticosteroids; switch to oral prednisolone 40 mg once improving."
      ],
      "calcs": [],
      "doses": [],
      "why": null
    },
    {
      "type": "step",
      "id": "A4",
      "chip": "Day 5–7",
      "title": "Colectomy if no response",
      "when": [],
      "items": [
        "No response to rescue within 5–7 days, or deterioration, toxic megacolon, perforation or massive bleeding: colectomy."
      ],
      "calcs": [],
      "doses": [],
      "why": "Delayed colectomy increases complications and mortality."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "non-steroidal anti-inflammatory drugs (NSAIDs), opioids, anticholinergics and antidiarrheals; delaying surgery in non-responders."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Methylprednisolone",
          "60 mg IV every 24 hours"
        ],
        [
          "Hydrocortisone (alternative)",
          "100 mg IV every 6 hours"
        ],
        [
          "Infliximab (rescue)",
          "5 mg/kg IV; accelerated or higher dosing (e.g., 10 mg/kg) may be considered in severe inflammation or low albumin"
        ],
        [
          "Ciclosporin (rescue)",
          "2 mg/kg/day continuous IV infusion; monitor levels, blood pressure, renal function, magnesium"
        ]
      ]
    }
  ],
  "related": [
    "truelove_witts",
    "asuc_day3",
    "uceis",
    "mayo_uc"
  ],
  "references": [
    ref("Travis SP et al. Predicting outcome in severe ulcerative colitis. Gut 1996", "https://pubmed.ncbi.nlm.nih.gov/8984031/"),
    ref("Raine T et al. ECCO guidelines on therapeutics in ulcerative colitis. J Crohns Colitis 2022"),
    ref("Laharie D et al. Ciclosporin versus infliximab in patients with severe ulcerative colitis refractory to intravenous steroids (CYSIF). Lancet 2012"),
    ref("Williams JG et al. Infliximab versus ciclosporin for steroid-resistant acute severe ulcerative colitis (CONSTRUCT). Lancet Gastroenterol Hepatol 2016")
  ]
};
