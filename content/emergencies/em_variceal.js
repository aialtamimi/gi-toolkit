// SPEC.md B7.2 Acute variceal bleeding. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_variceal",
  spec: "B7.2",
  name: "Acute variceal bleeding",
  short: "Variceal bleeding",
  aliases: ["variceal bleeding", "varices", "esophageal varices", "portal hypertension bleeding", "terlipressin", "TIPS", "band ligation"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "upper GI bleeding in known or suspected cirrhosis or portal hypertension."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "vasoactive drug as soon as variceal bleeding is suspected, before endoscopy, continued 2–5 days. Antibiotic prophylaxis: ceftriaxone 1 g every 24 hours for up to 7 days. Restrictive transfusion: Hb threshold 7 g/dL, target 7–9 g/dL ([ESGE 2022](https://pubmed.ncbi.nlm.nih.gov/36174643)). Protect the airway if massive hematemesis or HE grade 3–4. Erythromycin before endoscopy."
    },
    {
      "type": "section",
      "title": "Within hours",
      "text": "endoscopy within 12 hours. Esophageal varices: band ligation. Gastric varices GOV2 or IGV1: cyanoacrylate injection."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "pre-emptive TIPS within 72 hours (ideally 24) if Child-Pugh C 10–13, or Child-Pugh B >7 with active bleeding at endoscopy, or HVPG >20 mmHg. Refractory bleeding: balloon tamponade or esophageal stent as bridge to rescue TIPS. Start non-selective beta-blocker (carvedilol or propranolol) when vasoactive drug stops; repeat band ligation every 1–4 weeks until eradication. Lactulose to prevent HE."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "fresh frozen plasma or platelets to \"correct\" INR alone; over-transfusion (raises portal pressure); proton pump inhibitor continued long term without indication."
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
          "2 mg IV every 4 hours for the first 48 hours, then 1 mg every 4 hours (adjust by weight and local protocol)"
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
          "1 g IV every 24 hours, maximum 7 days"
        ],
        [
          "Erythromycin",
          "250 mg IV 30–120 minutes before endoscopy"
        ]
      ]
    }
  ],
  related: ["child_pugh", "meld3", "west_haven"],
  references: [ref("de Franchis R et al. Baveno VII: renewing consensus in portal hypertension. J Hepatol 2022"), ref("Gralnek IM et al. ESGE variceal guideline 2022", "https://pubmed.ncbi.nlm.nih.gov/36174643")]
};
