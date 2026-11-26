// SPEC.md B7.7 Acute liver failure. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_alf",
  spec: "B7.7",
  name: "Acute liver failure",
  short: "Acute liver failure",
  aliases: ["acute liver failure", "ALF", "fulminant hepatic failure", "acetaminophen overdose", "paracetamol overdose", "N-acetylcysteine"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "INR ≥1.5 and any degree of hepatic encephalopathy, without pre-existing cirrhosis, illness <26 weeks (AASLD)."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "contact the liver transplant center at once; ICU if HE grade ≥2; N-acetylcysteine for acetaminophen cases (and consider for non-acetaminophen ALF with early HE grade 1–2; Lee, Gastroenterology 2009); glucose every 1–2 hours; check acetaminophen level, viral serology (hepatitis A, B with delta, E, HSV), autoimmune markers, ceruloplasmin, pregnancy test, toxicology."
    },
    {
      "type": "section",
      "title": "Within hours",
      "text": "King's College criteria (B3.18). Intubate for HE grade 3–4. Intracranial pressure measures: head of bed 30°, sodium target 145–155 mmol/L with hypertonic saline."
    },
    {
      "type": "section",
      "title": "Clue to Wilson disease",
      "text": "ALP to bilirubin ratio <4 and AST to ALT ratio >2.2."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "sedatives, lactulose (bowel distension), routine fresh frozen plasma (FFP) to correct INR (masks prognosis), nephrotoxins."
    },
    {
      "type": "table",
      "columns": [
        "Drug",
        "Dose"
      ],
      "rows": [
        [
          "N-acetylcysteine, 21-hour IV regimen",
          "150 mg/kg over 1 hour, then 50 mg/kg over 4 hours, then 100 mg/kg over 16 hours; continue the last rate beyond 21 hours in ALF until INR improves (or use the local two-bag regimen)"
        ]
      ]
    }
  ],
  related: ["kings", "meld_na"],
  references: [ref("Lee WM, Stravitz RT, Larson AM. Introduction to the revised American Association for the Study of Liver Diseases Position Paper on acute liver failure 2011. Hepatology 2012;55(3):965-7. doi:10.1002/hep.25551. PMID 22213561", "https://pubmed.ncbi.nlm.nih.gov/22213561/"), ref("Lee WM et al. Intravenous N-acetylcysteine improves transplant-free survival in early stage non-acetaminophen acute liver failure. Gastroenterology 2009")]
};
