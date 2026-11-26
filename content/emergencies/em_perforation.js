// SPEC.md B7.18 Iatrogenic endoscopic perforation. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_perforation",
  spec: "B7.18",
  name: "Iatrogenic endoscopic perforation",
  short: "Perforation",
  aliases: ["iatrogenic perforation", "endoscopic perforation", "perforation", "over-the-scope clip", "pneumoperitoneum"],
  category: "emergencies",
  blocks: [
    {
      "type": "source",
      "text": "[Paspatis GA et al. Diagnosis and management of iatrogenic endoscopic perforations: ESGE Position Statement - Update 2020. Endoscopy 2020;52:792-810. doi:10.1055/a-1222-3191](https://doi.org/10.1055/a-1222-3191)."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "visible defect, fat or extraluminal structures during the procedure; or post-procedure pain, subcutaneous emphysema, fever, tachycardia."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "if recognized during the procedure and the field is clean, close endoscopically at once (through-the-scope clips for small defects; over-the-scope clip or other devices for larger ones); switch to CO2 insufflation; decompress tension pneumoperitoneum with a needle if ventilation or circulation is compromised; IV broad-spectrum antibiotics; NPO; urgent surgical consultation."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "CT to assess the leak; surgery if endoscopic closure fails, the defect is large, or peritonitis or sepsis develops."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "delaying surgical review; air insufflation."
    }
  ],
  related: [],
  references: [ref("Paspatis GA et al. Diagnosis and management of iatrogenic endoscopic perforations: ESGE Position Statement - Update 2020. Endoscopy 2020;52:792-810. doi:10.1055/a-1222-3191. PMID 32781470", "https://doi.org/10.1055/a-1222-3191")]
};
