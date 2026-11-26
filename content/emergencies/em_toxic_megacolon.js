// SPEC.md B7.6 Toxic megacolon. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_toxic_megacolon",
  spec: "B7.6",
  name: "Toxic megacolon",
  short: "Toxic megacolon",
  aliases: ["toxic megacolon", "Jalan criteria", "colonic dilatation", "toxic colitis"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize (Jalan criteria)",
      "text": "colonic dilatation >6 cm on X-ray PLUS at least 3 of: fever >38.6 °C, heart rate >120/min, neutrophil count >10.5 ×10⁹/L, anemia; PLUS at least 1 of: dehydration, altered consciousness, electrolyte disturbance, hypotension."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "urgent surgical review; NPO, nasogastric decompression; IV fluids and electrolytes; broad-spectrum antibiotics; IV corticosteroids if IBD (and treat C. difficile if present); serial abdominal X-rays."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "no improvement within 24–72 hours, perforation, or worsening: colectomy."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "colonoscopy, opioids, anticholinergics, antidiarrheals."
    }
  ],
  related: [],
  references: [ref("Jalan KN et al. An experience of ulcerative colitis. I. Toxic dilation in 55 cases. Gastroenterology 1969;57(1):68-82. PMID 5305933 (Jalan criteria)", "https://pubmed.ncbi.nlm.nih.gov/5305933/")]
};
