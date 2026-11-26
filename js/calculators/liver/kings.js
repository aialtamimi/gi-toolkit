// SPEC.md B3.18 King's College criteria
import { ref } from "../../refs.js";
import { isNum } from "../../num.js";

const MET_TEXT = "Meets King's College criteria: poor prognosis without transplant. Contact a liver transplant center now.";
const apap = v => v.type === "apap";
const nonApap = v => v.type === "non";

export function evaluate(v) {
  const inrHigh = (isNum(v.inr) && v.inr > 6.5) || (isNum(v.pt) && v.pt > 100);
  if (v.type === "apap") {
    const ph = isNum(v.ph) && v.ph < 7.30;
    const triad = { inr: inrHigh, cr: isNum(v.cr) && v.cr > 300, he: !!v.he34 };
    const triadMet = triad.inr && triad.cr && triad.he;
    const lactate = !!v.modified && ((isNum(v.lac4) && v.lac4 > 3.5) || (isNum(v.lac12) && v.lac12 > 3.0));
    const criteria = [
      { item: "Arterial pH <7.30 after adequate fluid resuscitation", met: ph },
      { item: "INR >6.5 (PT >100 s)", met: triad.inr },
      { item: "Creatinine >3.4 mg/dL (>300 µmol/L)", met: triad.cr },
      { item: "HE grade 3–4", met: triad.he },
      { item: "All three of INR, creatinine and HE within 24 hours", met: triadMet }
    ];
    if (v.modified) criteria.push({ item: "Modified: arterial lactate >3.5 mmol/L at 4 hours or >3.0 mmol/L at 12 hours after fluid resuscitation", met: lactate });
    return { met: ph || triadMet || lactate, criteria };
  }
  const minor = [
    { item: "Age <10 or >40 years", met: isNum(v.age) && (v.age < 10 || v.age > 40) },
    { item: "Cause non-A non-B hepatitis, halothane, or idiosyncratic drug reaction", met: !!v.cause },
    { item: "Jaundice to encephalopathy >7 days", met: !!v.jaundice7 },
    { item: "INR >3.5 (PT >50 s)", met: (isNum(v.inr) && v.inr > 3.5) || (isNum(v.pt) && v.pt > 50) },
    { item: "Bilirubin >17.6 mg/dL (>300 µmol/L)", met: isNum(v.bili) && v.bili > 300 }
  ];
  const count = minor.filter(m => m.met).length;
  return { met: inrHigh || count >= 3, count, inrHigh,
    criteria: [{ item: "INR >6.5 (PT >100 s) regardless of HE grade", met: inrHigh }, ...minor] };
}

export default {
  id: "kings",
  name: "King's College criteria",
  short: "King's College",
  aliases: ["King's College", "Kings College", "KCC", "acute liver failure", "ALF", "acetaminophen", "paracetamol", "transplant listing"],
  category: "liver",
  use: "Checklist for listing in acute liver failure. Enter what is available; criteria are evaluated from entered values.",
  inputs: [
    { id: "type", label: "Type", type: "radio", options: [
      { label: "Acetaminophen", value: "apap" }, { label: "Non-acetaminophen", value: "non" } ] },
    { id: "ph", label: "Arterial pH after adequate fluid resuscitation", type: "number", unit: "", min: 6.5, max: 8, optional: true, showIf: apap },
    { id: "inr", label: "INR", type: "number", unit: "", min: 0.5, max: 30, optional: true, showIf: v => !!v.type },
    { id: "pt", label: "PT (if INR not available)", type: "number", unit: "seconds", min: 0, max: 300, optional: true, showIf: v => !!v.type },
    { id: "cr", label: "Creatinine", type: "number", analyte: "creatinine", base: "si", min: 0, max: 3000, optional: true, showIf: apap },
    { id: "he34", label: "HE grade 3–4", type: "checkbox", showIf: apap },
    { id: "modified", label: "Use modified criteria (lactate)", type: "checkbox", showIf: apap },
    { id: "lac4", label: "Arterial lactate at 4 hours after fluid resuscitation", type: "number", unit: "mmol/L", min: 0, max: 40, optional: true, showIf: v => apap(v) && v.modified },
    { id: "lac12", label: "Arterial lactate at 12 hours after fluid resuscitation", type: "number", unit: "mmol/L", min: 0, max: 40, optional: true, showIf: v => apap(v) && v.modified },
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120, optional: true, showIf: nonApap },
    { id: "cause", label: "Cause non-A non-B hepatitis, halothane, or idiosyncratic drug reaction", type: "checkbox", showIf: nonApap },
    { id: "jaundice7", label: "Jaundice to encephalopathy >7 days", type: "checkbox", showIf: nonApap },
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "si", min: 0, max: 2000, optional: true, showIf: nonApap }
  ],
  compute(v) {
    const e = evaluate(v);
    return { score: e.met ? 1 : 0, ...e, display: e.met ? "Criteria met" : "Criteria not met", label: "King's College",
      rounding: "Checklist; no rounding.",
      breakdown: e.criteria.map(c => ({ item: c.item, value: c.met ? "Met" : "Not met" })) };
  },
  interpret(r) {
    const links = [{ label: "Acute liver failure emergency page", target: "em_alf" }];
    const countTxt = r.count !== undefined ? ` (${r.count} of 5 minor criteria)` : "";
    if (r.met) return { band: "Criteria met", level: "high", action: MET_TEXT, links, copy: `King's College criteria met${countTxt}` };
    return { band: "Criteria not met by entered values", level: "neutral", links,
      text: "Missing values count as not met. Reassess as results return.",
      copy: `King's College criteria not met${countTxt}` };
  },
  notes: "Creatinine and bilirubin cutoffs are applied in µmol/L (300 µmol/L); mg/dL entries are converted (× 88.4 and × 17.1).",
  references: [ref("O'Grady JG et al. Early indicators of prognosis in fulminant hepatic failure. Gastroenterology 1989")]
};
