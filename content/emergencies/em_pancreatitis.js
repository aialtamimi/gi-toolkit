// SPEC.md B7.12 Acute pancreatitis. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_pancreatitis",
  spec: "B7.12",
  name: "Acute pancreatitis",
  short: "Acute pancreatitis",
  aliases: ["acute pancreatitis", "pancreatitis", "lactated Ringer's", "biliary pancreatitis", "necrotizing pancreatitis"],
  category: "emergencies",
  blocks: [
    {
      "type": "source",
      "text": "ACG 2024 (Tenner, Am J Gastroenterol 2024)."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "2 of 3: typical pain, lipase or amylase >3 × ULN, imaging (B4.6). Ultrasound for gallstones in every patient; check triglycerides and calcium."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "moderately aggressive fluids with lactated Ringer's; monitor urine output, heart rate, BUN and hematocrit closely for the first 24–48 hours; analgesia; BISAP and SIRS."
    },
    {
      "type": "section",
      "title": "Within hours",
      "text": "urgent ERCP (within 24 hours) only if concomitant cholangitis."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "early oral feeding within 24–48 hours as tolerated (low-fat solid diet in mild pancreatitis); enteral rather than parenteral feeding in severe pancreatitis. Mild biliary pancreatitis: cholecystectomy during the same admission. Infected necrosis: step-up approach, delaying drainage until walled-off (about 4 weeks) where possible."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "aggressive fluids (more fluid overload without benefit; WATERFALL, NEJM 2022); prophylactic antibiotics; early ERCP in biliary pancreatitis without cholangitis; CT in the first 72 hours unless the diagnosis is unclear."
    },
    {
      "type": "table",
      "columns": [
        "Item",
        "Dose"
      ],
      "rows": [
        [
          "Lactated Ringer's",
          "1.5 mL/kg/h; add a 10 mL/kg bolus if hypovolemic; reassess frequently and reduce in cardiac or renal disease"
        ],
        [
          "Rectal indomethacin (post-ERCP pancreatitis prevention, high-risk ERCP)",
          "100 mg per rectum around the time of ERCP"
        ]
      ]
    }
  ],
  related: ["bisap", "ranson", "glasgow_imrie", "sirs", "marshall", "atlanta", "mctsi"],
  references: [ref("Tenner S et al. ACG guideline: management of acute pancreatitis. Am J Gastroenterol 2024", "https://guidelinecentral.com/guideline/12896"), ref("de-Madaria E et al. Aggressive or moderate fluid resuscitation in acute pancreatitis (WATERFALL). NEJM 2022"), ref("Banks PA et al. Classification of acute pancreatitis 2012: revision of the Atlanta classification. Gut 2013")]
};
