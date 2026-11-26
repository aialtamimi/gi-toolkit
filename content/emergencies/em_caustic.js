// SPEC.md B7.15 Caustic ingestion. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_caustic",
  spec: "B7.15",
  name: "Caustic ingestion",
  short: "Caustic ingestion",
  aliases: ["caustic ingestion", "corrosive ingestion", "acid ingestion", "alkali ingestion", "lye"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "acid or alkali ingestion; drooling, dysphagia, odynophagia, stridor, chest or abdominal pain. Symptoms do not predict injury severity."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "airway assessment (early intubation if stridor or airway edema); IV access; NPO; identify the agent; CT chest and abdomen with IV contrast if perforation or transmural necrosis is suspected; surgical team involvement for severe cases."
    },
    {
      "type": "section",
      "title": "Within hours",
      "text": "endoscopy within 12–48 hours to grade injury (Zargar, B6.6), unless perforation is evident."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "grade 0–2a: oral intake early and discharge. Grade 2b–3: admit, nutritional support, monitor for perforation; stricture surveillance from about 3 weeks."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "induced vomiting, neutralizing agents, blind nasogastric tube, routine corticosteroids; endoscopy between day 5 and day 15 (weakest wall, higher perforation risk)."
    }
  ],
  related: ["zargar"],
  references: [ref("Zargar SA et al. The role of fiberoptic endoscopy in the management of corrosive ingestion and modified endoscopic classification of burns. Gastrointest Endosc 1991")]
};
