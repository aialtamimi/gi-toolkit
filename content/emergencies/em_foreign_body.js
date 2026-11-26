// SPEC.md B7.14 Food bolus and foreign body ingestion. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_foreign_body",
  spec: "B7.14",
  name: "Food bolus and foreign body ingestion",
  short: "Foreign body",
  aliases: ["foreign body", "food bolus", "food impaction", "button battery", "battery ingestion", "magnet ingestion", "body packing"],
  category: "emergencies",
  blocks: [
    {
      "type": "source",
      "text": "[ESGE 2016](https://www.doi.org/10.1055/S-0042-100456)."
    },
    {
      "type": "table",
      "columns": [
        "Situation",
        "Timing of endoscopy"
      ],
      "rows": [
        [
          "Complete esophageal obstruction (cannot swallow saliva)",
          "Emergent: preferably within 2 hours, at the latest within 6 hours"
        ],
        [
          "Sharp-pointed object or battery in the esophagus",
          "Emergent: preferably within 2 hours, at the latest within 6 hours"
        ],
        [
          "Other esophageal foreign body without complete obstruction",
          "Urgent: within 24 hours"
        ],
        [
          "Stomach: sharp-pointed objects, magnets, batteries, large or long objects",
          "Urgent: within 24 hours"
        ],
        [
          "Stomach: medium-sized blunt objects",
          "Non-urgent: within 72 hours"
        ],
        [
          "Small blunt objects (not batteries or magnets) beyond the esophagus",
          "Observation; outpatient if feasible"
        ],
        [
          "Drug packets (body packing)",
          "No endoscopic removal; observe; surgery if obstruction or leak"
        ]
      ]
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "plain X-ray (neck, chest, abdomen) for radiopaque objects; CT if perforation is suspected; protect the airway (overtube or intubation if high aspiration risk)."
    },
    {
      "type": "section",
      "title": "Technique",
      "text": "food bolus can be gently pushed into the stomach or retrieved; take esophageal biopsies to look for eosinophilic esophagitis."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "barium swallow (aspiration risk, impairs endoscopy); blind pushing of sharp objects; delays with batteries."
    }
  ],
  related: [],
  references: [ref("Birk M et al. Removal of foreign bodies in the upper gastrointestinal tract in adults: ESGE Clinical Guideline. Endoscopy 2016", "https://www.doi.org/10.1055/S-0042-100456")]
};
