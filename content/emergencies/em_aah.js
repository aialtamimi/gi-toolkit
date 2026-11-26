// SPEC.md B7.8 Severe alcohol-associated hepatitis. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_aah",
  spec: "B7.8",
  name: "Severe alcohol-associated hepatitis",
  short: "Alcohol-associated hepatitis",
  aliases: ["alcohol-associated hepatitis", "alcoholic hepatitis", "AAH", "prednisolone", "steroids"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "jaundice (bilirubin >3 mg/dL) within 8 weeks of heavy alcohol use, AST >50 IU/L, AST to ALT >1.5, both <400 IU/L; severe if MELD >20 or Maddrey DF ≥32."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "screen for infection (blood, urine, ascitic cultures, chest X-ray), GI bleeding and AKI; alcohol withdrawal management; nutrition (oral or enteral); thiamine."
    },
    {
      "type": "section",
      "title": "Treatment",
      "text": "prednisolone 40 mg once daily for 28 days if no contraindication. Lille on day 7 (B3.5): ≥0.45 stop steroids."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "alcohol use disorder treatment; early liver transplant evaluation in selected non-responders at expert centers."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "pentoxifylline (no survival benefit in STOPAH, NEJM 2015); starting steroids with uncontrolled infection."
    }
  ],
  related: ["maddrey", "meld_na", "gahs", "abic", "lille"],
  references: [ref("Thursz MR et al. Prednisolone or pentoxifylline for alcoholic hepatitis (STOPAH). NEJM 2015"), ref("Louvet A et al. The Lille model. Hepatology 2007")]
};
