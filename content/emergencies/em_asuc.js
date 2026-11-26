// SPEC.md B7.5 Acute severe ulcerative colitis. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_asuc",
  spec: "B7.5",
  name: "Acute severe ulcerative colitis",
  short: "Acute severe UC",
  aliases: ["acute severe ulcerative colitis", "ASUC", "severe UC", "ulcerative colitis flare", "infliximab rescue", "ciclosporin"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "Truelove and Witts severe (B5.1): ≥6 bloody stools/day plus systemic toxicity."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "admit; IV corticosteroids; venous thromboembolism prophylaxis with low-molecular-weight heparin; stool culture and C. difficile toxin; flexible sigmoidoscopy with biopsies (CMV); plain abdominal X-ray; correct potassium and magnesium; involve colorectal surgeon early."
    },
    {
      "type": "section",
      "title": "Day 3",
      "text": "Oxford criteria (B5.2). If positive: rescue therapy with infliximab or ciclosporin."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "no response to rescue within 5–7 days, or deterioration, toxic megacolon, perforation or massive bleeding: colectomy."
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
  related: ["truelove_witts", "asuc_day3", "uceis", "mayo_uc"],
  references: [ref("Travis SP et al. Predicting outcome in severe ulcerative colitis. Gut 1996", "https://pubmed.ncbi.nlm.nih.gov/8984031/"), ref("Raine T et al. ECCO guidelines on therapeutics in ulcerative colitis. J Crohns Colitis 2022")]
};
