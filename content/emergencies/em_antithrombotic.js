// SPEC.md B7.4 Anticoagulants and antiplatelets in GI bleeding. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_antithrombotic",
  spec: "B7.4",
  name: "Anticoagulants and antiplatelets in GI bleeding",
  short: "Anticoagulants in GI bleeding",
  aliases: ["anticoagulants", "antiplatelets", "antithrombotic", "warfarin", "DOAC", "apixaban", "rivaroxaban", "dabigatran", "aspirin", "reversal", "PCC"],
  category: "emergencies",
  blocks: [
    {
      "type": "source",
      "text": "[ACG-CAG 2022](https://gastroenterology.acponline.org/archives/2022/03/25/1.htm) and ACG 2023 lower GI bleeding guideline."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Acute GI bleeding"
      ],
      "rows": [
        [
          "Warfarin",
          "Suggest against fresh frozen plasma and against vitamin K routinely; if reversal is needed, use 4-factor PCC rather than FFP"
        ],
        [
          "DOAC (dabigatran, rivaroxaban, apixaban, edoxaban)",
          "Suggest against routine PCC, idarucizumab and andexanet alfa; most bleeding settles with time because of short half-life"
        ],
        [
          "Life-threatening bleeding on VKA or DOAC",
          "Reversal agents may be considered (ACG 2023) with hematology input"
        ],
        [
          "Antiplatelet drugs",
          "Suggest against platelet transfusion"
        ],
        [
          "Aspirin for secondary cardiovascular prevention",
          "Avoid stopping, or resume as soon as hemostasis is secured; continuing aspirin lowered mortality (Sung, Ann Intern Med 2010)"
        ],
        [
          "Dual antiplatelet therapy after recent coronary stent",
          "Do not stop both drugs; decide with cardiology"
        ]
      ]
    },
    {
      "type": "note",
      "text": "Restart anticoagulation once hemostasis is secure, individualized with cardiology or hematology."
    }
  ],
  related: [],
  references: [ref("Abraham NS et al. ACG-CAG guideline: management of anticoagulants and antiplatelets during acute GI bleeding 2022", "https://gastroenterology.acponline.org/archives/2022/03/25/1.htm"), ref("Sengupta N et al. ACG guideline: management of acute lower GI bleeding 2023", "https://gastroenterology.acponline.org/archives/2023/03/24/2.htm"), ref("Sung JJ et al. Continuation of low-dose aspirin therapy in peptic ulcer bleeding: a randomized trial. Ann Intern Med 2010")]
};
