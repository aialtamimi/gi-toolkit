// SPEC.md B7.10 Hepatorenal syndrome, HRS-AKI. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_hrs",
  spec: "B7.10",
  name: "Hepatorenal syndrome, HRS-AKI",
  short: "HRS-AKI",
  aliases: ["hepatorenal syndrome", "HRS", "HRS-AKI", "AKI in cirrhosis", "terlipressin"],
  category: "emergencies",
  blocks: [
    {
      "type": "source",
      "text": "[ICA-ADQI consensus, J Hepatol 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11193657)."
    },
    {
      "type": "section",
      "title": "Recognize (2024 criteria)",
      "text": "cirrhosis with ascites; AKI by KDIGO (creatinine rise ≥0.3 mg/dL within 48 hours, or ≥50% from baseline within 7 days, and/or urine output ≤0.5 mL/kg/h for ≥6 hours); no improvement in creatinine and/or urine output within 24 hours of adequate volume resuscitation; no strong evidence of another primary cause. A 48-hour albumin trial is no longer required."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "stop diuretics, non-steroidal anti-inflammatory drugs (NSAIDs) and other nephrotoxins; review non-selective beta-blockers; look for and treat infection; if volume status is unclear, fluid challenge with 250–500 mL crystalloid or 1–1.5 g/kg of 20–25% albumin; reassess at 24 hours."
    },
    {
      "type": "section",
      "title": "Treatment",
      "text": "terlipressin plus albumin (first line); norepinephrine plus albumin in ICU if terlipressin is contraindicated or unavailable."
    },
    {
      "type": "section",
      "title": "Stop vasoconstrictor when",
      "text": "creatinine returns to within 0.3 mg/dL of baseline; severe adverse event; no improvement after 48 hours at maximum tolerated dose; renal replacement therapy needed; or 14 days reached."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "terlipressin with hypoxia, ischemic heart or vascular disease, or fluid overload; continuing albumin when there is pulmonary edema."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Terlipressin",
          "Continuous infusion 2 mg/day, or IV bolus 1–2 mg every 6 hours; if creatinine has not fallen by 25%, increase by at least 2 mg/day every 24 hours up to 12 mg/day"
        ],
        [
          "Albumin 20–25%",
          "20–40 g/day, adjusted daily to volume status"
        ],
        [
          "Norepinephrine",
          "0.5 mg/h IV, increase by 0.5 mg/h every 4 hours up to 3 mg/h to raise MAP (ICU, central line)"
        ]
      ]
    }
  ],
  related: ["meld3", "aclf"],
  references: [ref("Nadim MK et al. ICA-ADQI consensus on hepatorenal syndrome. J Hepatol 2024", "https://pmc.ncbi.nlm.nih.gov/articles/PMC11193657")]
};
