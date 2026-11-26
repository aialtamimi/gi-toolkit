// SPEC.md B7.11 Overt hepatic encephalopathy. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_he",
  spec: "B7.11",
  name: "Overt hepatic encephalopathy",
  short: "Hepatic encephalopathy",
  aliases: ["hepatic encephalopathy", "HE", "overt hepatic encephalopathy", "lactulose", "rifaximin", "encephalopathy"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "West Haven grade 2–4 (B3.16) in cirrhosis; exclude other causes (glucose, sepsis, drugs, intracranial bleed; CT head if focal signs, first episode, or fall)."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "find and treat precipitants (infection, GI bleeding, constipation, dehydration, hypokalemia or hyponatremia, sedatives, AKI, TIPS); protect the airway in grade 3–4; lactulose."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "rifaximin added to lactulose after a recurrence (Bass, NEJM 2010); review benzodiazepines and opioids; nutrition with normal protein intake (1.2–1.5 g/kg/day)."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "protein restriction; sedatives; under-dosed lactulose."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "Lactulose",
          "25 mL orally every 1–2 hours until at least 2 soft bowel movements, then titrate to 2–3 soft bowel movements per day; enema if unable to take orally"
        ],
        [
          "Polyethylene glycol 3350 (alternative)",
          "4 L over 4 hours (HELP trial, JAMA Intern Med 2014)"
        ],
        [
          "Rifaximin",
          "550 mg orally twice daily"
        ]
      ]
    }
  ],
  related: ["west_haven", "meld_na", "child_pugh"],
  references: [ref("Vilstrup H et al. Hepatic encephalopathy in chronic liver disease: 2014 Practice Guideline by AASLD and EASL. Hepatology 2014"), ref("Bass NM et al. Rifaximin treatment in hepatic encephalopathy. NEJM 2010"), ref("Rahimi RS et al. Lactulose vs polyethylene glycol 3350-electrolyte solution for treatment of overt hepatic encephalopathy: the HELP randomized clinical trial. JAMA Intern Med 2014")]
};
