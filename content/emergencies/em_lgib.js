// SPEC.md B7.3 Acute lower GI bleeding. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_lgib",
  spec: "B7.3",
  name: "Acute lower GI bleeding",
  short: "Lower GI bleeding",
  aliases: ["lower GI bleeding", "LGIB", "hematochezia", "bright red blood per rectum", "rectal bleeding"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "hematochezia or bright red blood per rectum. With hemodynamic instability, think of an upper GI source and do an upper endoscopy first."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "resuscitate; Oakland score (B2.4). Transfuse at Hb <7 g/dL (8 g/dL in cardiovascular disease) (ACG 2023)."
    },
    {
      "type": "section",
      "title": "Within hours",
      "text": "hemodynamically significant ongoing bleeding: CT angiography first, then catheter angiography and embolization if a blush is seen (ACG 2023)."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "inpatient colonoscopy after adequate bowel preparation; urgent colonoscopy within 24 hours has not improved outcomes. Oakland ≤8: consider early discharge with outpatient colonoscopy."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "routine early colonoscopy without preparation; stopping aspirin used for secondary cardiovascular prevention."
    }
  ],
  related: ["oakland"],
  references: [ref("Sengupta N et al. ACG guideline: management of acute lower GI bleeding 2023", "https://gastroenterology.acponline.org/archives/2023/03/24/2.htm")]
};
