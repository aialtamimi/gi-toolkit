// SPEC.md B7.1 Non-variceal upper GI bleeding. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_ugib",
  spec: "B7.1",
  name: "Non-variceal upper GI bleeding",
  short: "Upper GI bleeding",
  aliases: ["upper GI bleeding", "UGIB", "non-variceal", "peptic ulcer bleeding", "hematemesis", "melena", "coffee-ground"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "hematemesis, coffee-ground vomit, melena; shock index (HR/SBP) >1 = high risk."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "two large-bore cannulas; crystalloid resuscitation; GBS (B2.1). Transfuse at Hb <7 g/dL (target 7–9); use 8 g/dL threshold in cardiovascular disease. Hold antithrombotics per B7.4."
    },
    {
      "type": "section",
      "title": "Within hours",
      "text": "upper endoscopy within 24 hours of presentation after resuscitation (ACG 2021, ESGE 2021). IV erythromycin 250 mg 30–120 minutes before endoscopy if no contraindication (QT prolongation)."
    },
    {
      "type": "section",
      "title": "At endoscopy",
      "text": "treat Forrest Ia, Ib, IIa (B2.5) with thermal contact therapy, clips, or sclerosant injection; epinephrine injection only in combination. Hemostatic powder as temporary therapy for active bleeding. Over-the-scope clip for recurrent ulcer bleeding."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "high-dose proton pump inhibitor (PPI) for 3 days after endoscopic hemostasis, then twice daily to complete 2 weeks, then once daily. Test for H. pylori and treat. Rebleeding: repeat endoscopy; if it fails, transcatheter arterial embolization, then surgery."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "tranexamic acid (no benefit and more venous thrombosis in HALT-IT, Lancet 2020); urgent endoscopy within 6 hours does not improve mortality (Lau, NEJM 2020)."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Erythromycin",
          "250 mg IV over 5–30 minutes, given 30–120 minutes before endoscopy"
        ],
        [
          "Pantoprazole or esomeprazole, high dose",
          "80 mg IV bolus, then 8 mg/h infusion for 72 hours; or 40 mg IV twice daily as intermittent high dose"
        ]
      ]
    }
  ],
  related: ["gbs", "aims65", "rockall", "forrest"],
  references: [ref("Laine L et al. ACG Clinical Guideline: Upper GI and Ulcer Bleeding. Am J Gastroenterol 2021"), ref("Gralnek IM et al. ESGE NVUGIH guideline update. Endoscopy 2021"), ref("HALT-IT Trial Collaborators. Effects of a high-dose 24-h infusion of tranexamic acid on death and thromboembolic events in patients with acute gastrointestinal bleeding (HALT-IT). Lancet 2020"), ref("Lau JYW et al. Timing of endoscopy for acute upper gastrointestinal bleeding. NEJM 2020")]
};
