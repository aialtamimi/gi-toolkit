// SPEC.md B7.9 Spontaneous bacterial peritonitis. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_sbp",
  spec: "B7.9",
  name: "Spontaneous bacterial peritonitis",
  short: "SBP",
  aliases: ["spontaneous bacterial peritonitis", "SBP", "ascites infection", "paracentesis", "albumin"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "ascitic PMN ≥250/mm³ (B3.12). Do a diagnostic paracentesis in every patient with cirrhosis and ascites admitted to hospital, and with any GI bleeding, infection signs, HE or AKI."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "empirical antibiotics; IV albumin; blood and ascitic cultures (inoculate blood culture bottles at the bedside)."
    },
    {
      "type": "section",
      "title": "Within 48 hours",
      "text": "repeat paracentesis if no clinical improvement; PMN fall <25% = treatment failure, broaden antibiotics and look for secondary peritonitis."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "long-term secondary prophylaxis after the first episode."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "large-volume paracentesis during active SBP without albumin; NSAIDs; consider holding non-selective beta-blockers if SBP <90 mmHg, sodium <130 mmol/L or AKI."
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
  related: ["ascites", "meld_na"],
  references: [ref("Sort P et al. Effect of intravenous albumin on renal impairment and mortality in patients with cirrhosis and spontaneous bacterial peritonitis. NEJM 1999")]
};
