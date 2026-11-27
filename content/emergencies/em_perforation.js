// SPEC.md B7.18 Iatrogenic endoscopic perforation: bedside algorithm page (SPEC.md B7.0).
// Text copied verbatim from SPEC.md; tests/emergencies.test.js checks every block against SPEC.md.
import { ref } from "../../js/refs.js";

export default {
  "id": "em_perforation",
  "spec": "B7.18",
  "name": "Iatrogenic endoscopic perforation",
  "short": "Perforation",
  "aliases": [
    "iatrogenic perforation",
    "endoscopic perforation",
    "perforation",
    "over-the-scope clip",
    "pneumoperitoneum"
  ],
  "category": "emergencies",
  "kind": "algorithm",
  "weight": false,
  "entries": {},
  "entryWords": {},
  "blocks": [
    {
      "type": "source",
      "text": "[Paspatis GA et al. Diagnosis and management of iatrogenic endoscopic perforations: ESGE Position Statement - Update 2020. Endoscopy 2020;52:792-810. doi:10.1055/a-1222-3191](https://doi.org/10.1055/a-1222-3191)."
    },
    {
      "type": "redflags",
      "title": "Red flags",
      "text": "tension pneumoperitoneum (ventilation or circulation compromised), sepsis, peritonitis."
    },
    {
      "type": "section",
      "title": "Recognize",
      "text": "visible defect, fat or extraluminal structures during the procedure; or post-procedure pain, subcutaneous emphysema, fever, tachycardia."
    },
    {
      "type": "decision",
      "id": "D1",
      "chip": "0 h",
      "title": "Recognized during the procedure?",
      "when": [],
      "items": [],
      "calcs": [],
      "doses": [],
      "why": [],
      "options": [
        {
          "value": "Yes",
          "text": "close at once if the field is clean."
        },
        {
          "value": "No",
          "text": "delayed recognition."
        }
      ]
    },
    {
      "type": "step",
      "id": "P1",
      "chip": "During the procedure",
      "title": "Recognized during the procedure",
      "when": [
        [
          "D1",
          "Yes"
        ]
      ],
      "items": [
        "If recognized during the procedure and the field is clean, close endoscopically at once (through-the-scope clips for small defects; over-the-scope clip or other devices for larger ones); switch to CO2 insufflation; decompress tension pneumoperitoneum with a needle if ventilation or circulation is compromised; IV broad-spectrum antibiotics; NPO; urgent surgical consultation.",
        "Then CT."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "P2",
      "chip": "Delayed",
      "title": "Delayed recognition",
      "when": [
        [
          "D1",
          "No"
        ]
      ],
      "items": [
        "CT, antibiotics, NPO, urgent surgical review; endoscopic closure only in selected early cases."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "P3",
      "chip": "Closure",
      "title": "By site (ESGE 2020)",
      "when": [],
      "items": [
        "Esophagus: clips or over-the-scope clip; covered stent or endoscopic vacuum therapy for larger defects.",
        "ERCP: duodenal wall (scope) perforation: endoscopic closure or surgery; periampullary: biliary and/or pancreatic stent; guidewire or retroperitoneal air only: conservative.",
        "Colon: clips or over-the-scope clip.",
        "After colonic EMR: deep mural injury by the Sydney classification (B6.10)."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "step",
      "id": "P4",
      "chip": "Then",
      "title": "Leak and surgery",
      "when": [],
      "items": [
        "CT to assess the leak; surgery if endoscopic closure fails, the defect is large, or peritonitis or sepsis develops."
      ],
      "calcs": [],
      "doses": [],
      "why": []
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "delaying surgical review; air insufflation."
    }
  ],
  "related": [
    "sydney_dmi"
  ],
  "references": [
    ref("Paspatis GA et al. Diagnosis and management of iatrogenic endoscopic perforations: ESGE Position Statement - Update 2020. Endoscopy 2020;52:792-810. doi:10.1055/a-1222-3191. PMID 32781470", "https://pubmed.ncbi.nlm.nih.gov/32781470/")
  ]
};
