// SPEC.md B7.6 Toxic megacolon: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_toxic_megacolon",
  "spec": "B7.6",
  "name": "Toxic megacolon",
  "short": "Toxic megacolon",
  "aliases": [
    "toxic megacolon",
    "Jalan criteria",
    "colonic dilatation",
    "toxic colitis"
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
      "text": "perforation, peritonitis, massive bleeding, shock: emergency surgery."
    },
    {
      "type": "section",
      "title": "Recognize (Jalan criteria)",
      "text": "colonic dilatation >6 cm on X-ray PLUS at least 3 of: fever >38.6 °C, heart rate >120/min, neutrophil count >10.5 ×10⁹/L, anemia; PLUS at least 1 of: dehydration, altered consciousness, electrolyte disturbance, hypotension."
    },
    {
      "type": "step",
      "id": "M1",
      "chip": "0 h",
      "title": "Confirm and start supportive care",
      "when": [],
      "items": [
        "Jalan criteria (B5.10): colonic dilatation >6 cm plus 3 or more of 4 plus 1 or more of 4.",
        "Urgent surgical review; NPO, nasogastric decompression; IV fluids and electrolytes; broad-spectrum antibiotics; IV corticosteroids if IBD (and treat C. difficile if present); serial abdominal X-rays."
      ],
      "calcs": [
        "jalan"
      ],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "M2",
      "chip": "0 h",
      "title": "Treat the cause",
      "when": [],
      "items": [
        "IBD: IV hydrocortisone 100 mg every 6 hours or methylprednisolone 60 mg IV every 24 hours (B7.5).",
        "C. difficile: vancomycin 500 mg orally or by nasogastric tube 4 times daily plus metronidazole 500 mg IV every 8 hours; add rectal vancomycin if ileus (IDSA/SHEA 2017).",
        "Correct potassium and magnesium."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "24–72 h",
      "title": "Improving?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "continue, serial X-rays."
        },
        {
          "value": "No",
          "text": "colectomy."
        }
      ]
    },
    {
      "type": "step",
      "id": "M3",
      "chip": "24–72 h",
      "title": "Improving",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "Continue treatment and serial abdominal X-rays."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "M4",
      "chip": "24–72 h",
      "title": "Colectomy",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "No improvement within 24–72 hours, perforation, or worsening: colectomy.",
        "Subtotal colectomy with end ileostomy."
      ],
      "calcs": [],
      "doses": [],
      "why": [
        "Delayed colectomy increases complications (Randall, Br J Surg 2010)."
      ]
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "colonoscopy, opioids, anticholinergics, antidiarrheals."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Hydrocortisone (IBD)",
          "100 mg IV every 6 hours"
        ],
        [
          "Methylprednisolone (IBD, alternative)",
          "60 mg IV every 24 hours"
        ],
        [
          "Vancomycin (C. difficile)",
          "500 mg orally or by nasogastric tube 4 times daily (never IV for C. difficile); add rectal vancomycin if ileus"
        ],
        [
          "Metronidazole (C. difficile)",
          "500 mg IV every 8 hours"
        ]
      ]
    }
  ],
  "related": [
    "jalan"
  ],
  "references": [
    ref("Jalan KN et al. An experience of ulcerative colitis. I. Toxic dilation in 55 cases. Gastroenterology 1969;57(1):68-82 (Jalan criteria). PMID 5305933", "https://pubmed.ncbi.nlm.nih.gov/5305933/"),
    ref("McDonald LC et al. Clinical practice guidelines for Clostridium difficile infection in adults and children: 2017 update by IDSA and SHEA. Clin Infect Dis 2018. PMID 29462280", "https://pubmed.ncbi.nlm.nih.gov/29462280/"),
    ref("Randall J et al. Delayed surgery for acute severe colitis is associated with increased risk of postoperative complications. Br J Surg 2010. PMID 20101648", "https://pubmed.ncbi.nlm.nih.gov/20101648/")
  ]
};
