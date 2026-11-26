// SPEC.md B7.13 Acute cholangitis. Text copied verbatim from SPEC.md; tests/emergencies.test.js checks it.
import { ref } from "../../js/refs.js";

export default {
  id: "em_cholangitis",
  spec: "B7.13",
  name: "Acute cholangitis",
  short: "Cholangitis",
  aliases: ["acute cholangitis", "cholangitis", "ascending cholangitis", "biliary sepsis", "ERCP drainage"],
  category: "emergencies",
  blocks: [
    {
      "type": "section",
      "title": "Recognize",
      "text": "TG18 criteria (B4.8)."
    },
    {
      "type": "section",
      "title": "Do now",
      "text": "blood cultures, then IV antibiotics (within 1 hour in septic shock) covering gram-negative organisms and anaerobes per local resistance; fluids; correct coagulopathy if needed for sphincterotomy."
    },
    {
      "type": "section",
      "title": "Within hours",
      "text": "biliary drainage by ERCP rather than percutaneous drainage, within 48 hours ([ASGE 2021](https://guidelinecentral.com/guideline/1285200)); as soon as possible after resuscitation (ideally within 12 hours) in septic shock or TG18 grade III (ESGE 2019). If stable, combine drainage with sphincterotomy and stone removal; if unstable, stent alone."
    },
    {
      "type": "section",
      "title": "Then",
      "text": "antibiotics 4–7 days after source control (TG18); cholecystectomy for gallstone disease."
    },
    {
      "type": "section",
      "title": "Avoid",
      "text": "delaying drainage in grade II–III; full stone clearance in an unstable patient."
    }
  ],
  related: ["tg18_cholangitis", "asge_cbd"],
  references: [ref("Kiriyama S et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci 2018", "https://pubmed.ncbi.nlm.nih.gov/29032610/"), ref("ASGE guideline on the management of cholangitis 2021", "https://guidelinecentral.com/guideline/1285200"), ref("Manes G et al. Endoscopic management of common bile duct stones: European Society of Gastrointestinal Endoscopy (ESGE) guideline. Endoscopy 2019;51(5):472-491. doi:10.1055/a-0862-0346. PMID 30943551", "https://pubmed.ncbi.nlm.nih.gov/30943551/")]
};
