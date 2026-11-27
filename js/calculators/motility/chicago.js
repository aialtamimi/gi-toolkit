// SPEC.md B10.1 Chicago Classification v4.0 (high-resolution manometry)
import { ref } from "../../refs.js";

export const NOTES = [
  "Requires the Chicago Classification v4.0 protocol (supine and upright swallows, provocative tests).",
  "Exclude mechanical obstruction.",
  "Study off opioids when possible."
];
export const EGJOO_INCONCLUSIVE = "Inconclusive: obtain timed barium esophagram or FLIP, exclude mechanical obstruction and opioid effect.";
export const ABSENT_NOTE = "If IRP is borderline or pressurization is present, consider achalasia type I with supportive testing.";
export const SYMPTOM_NOTE = "Clinically relevant only with obstructive symptoms.";
export const IEM_INCONCLUSIVE = "Inconclusive: use supportive testing (contractile reserve on multiple rapid swallows, barium).";
export const FALLTHROUGH_NOTE = "Supine IRP above the upper limit, but the criteria for EGJ outflow obstruction (upright IRP and intrabolus pressure) are not met.";

const pct = (id, label) => ({ id, label, type: "number", unit: "%", min: 0, max: 100 });

// Rules 1 to 13 of B10.1, in order. Returns { rule, band, action?, note? }.
export function classify(v) {
  const supineHigh = v.irp_supine > v.uln_supine;
  const uprightHigh = v.irp_upright > v.uln_upright;
  const ineffective = v.failed + v.weak + v.fragmented;
  const noNormal = v.failed + v.weak + v.fragmented + v.premature + v.hyper >= 100;
  if (supineHigh) {
    if (v.failed === 100 && v.pep >= 20) return { rule: 1, band: "Achalasia type II" };
    if (v.failed === 100) return { rule: 2, band: "Achalasia type I" };
    if (noNormal && v.premature >= 20) return { rule: 3, band: "Achalasia type III" };
    if (uprightHigh && v.ibp >= 20) {
      if (v.symptoms && v.supportive) return { rule: 4, band: "EGJ outflow obstruction, clinically relevant" };
      return { rule: 5, band: "EGJ outflow obstruction, inconclusive", action: EGJOO_INCONCLUSIVE };
    }
  }
  const r = peristalsis(v, ineffective);
  return supineHigh ? { ...r, fallthrough: true } : r;
}

function peristalsis(v, ineffective) {
  if (v.failed === 100) return { rule: 6, band: "Absent contractility", action: ABSENT_NOTE };
  if (v.premature >= 20) return v.symptoms ? { rule: 7, band: "Distal esophageal spasm, clinically relevant" }
    : { rule: 8, band: "Distal esophageal spasm pattern, inconclusive", action: SYMPTOM_NOTE };
  if (v.hyper >= 20) return v.symptoms ? { rule: 9, band: "Hypercontractile esophagus, clinically relevant" }
    : { rule: 10, band: "Hypercontractile esophagus pattern, inconclusive", action: SYMPTOM_NOTE };
  if (ineffective > 70 || v.failed >= 50) return { rule: 11, band: "Ineffective esophageal motility" };
  if (ineffective >= 50) return { rule: 12, band: "Ineffective esophageal motility, inconclusive", action: IEM_INCONCLUSIVE };
  return { rule: 13, band: "Normal esophageal motility" };
}

const num = x => String(Number(x));

export default {
  id: "chicago",
  name: "Chicago Classification v4.0",
  short: "Chicago v4.0",
  aliases: ["Chicago Classification", "Chicago v4.0", "CCv4.0", "high-resolution manometry", "HRM", "esophageal manometry", "achalasia",
    "EGJ outflow obstruction", "EGJOO", "distal esophageal spasm", "hypercontractile esophagus", "jackhammer esophagus",
    "ineffective esophageal motility", "absent contractility", "IRP"],
  category: "motility",
  use: "Inputs from the high-resolution manometry report. Rules are applied in order; the first that applies gives the result.",
  inputs: [
    { type: "heading", label: "EGJ relaxation" },
    { id: "irp_supine", label: "Median IRP, supine", type: "number", unit: "mmHg", min: 0, max: 200 },
    { id: "irp_upright", label: "Median IRP, upright", type: "number", unit: "mmHg", min: 0, max: 200 },
    { id: "uln_supine", label: "IRP upper limit of normal, supine (default 15, Medtronic; edit for other systems)", type: "number", unit: "mmHg", min: 1, max: 100, default: 15 },
    { id: "uln_upright", label: "IRP upper limit of normal, upright (default 12, Medtronic; edit for other systems)", type: "number", unit: "mmHg", min: 1, max: 100, default: 12 },
    { type: "heading", label: "Swallows (% of swallows)" },
    pct("failed", "Failed swallows (DCI <100 mmHg·s·cm)"),
    pct("weak", "Weak swallows (DCI 100–450 mmHg·s·cm)"),
    pct("fragmented", "Fragmented swallows (break >5 cm, DCI >450 mmHg·s·cm)"),
    pct("premature", "Premature swallows (DL <4.5 s, DCI >450 mmHg·s·cm)"),
    pct("hyper", "Hypercontractile swallows (DCI >8000 mmHg·s·cm)"),
    pct("pep", "Panesophageal pressurization"),
    pct("ibp", "Supine swallows with elevated intrabolus pressure (% of supine swallows)"),
    { type: "heading", label: "Clinical context" },
    { id: "symptoms", label: "Obstructive symptoms (dysphagia and/or non-cardiac chest pain)", type: "checkbox" },
    { id: "supportive", label: "Supportive test abnormal (timed barium esophagram or FLIP)", type: "checkbox" }
  ],
  compute(v) {
    const c = classify(v);
    const ineffective = v.failed + v.weak + v.fragmented;
    const noNormal = v.failed + v.weak + v.fragmented + v.premature + v.hyper >= 100;
    const vs = (x, uln) => `${num(x)} mmHg (${x > uln ? "above" : "not above"} the upper limit ${num(uln)})`;
    return { score: null, ...c, ineffective, display: c.band, label: "Chicago v4.0", rounding: "Values used as entered; no rounding.",
      breakdown: [
        { item: "Median IRP, supine", value: vs(v.irp_supine, v.uln_supine) },
        { item: "Median IRP, upright", value: vs(v.irp_upright, v.uln_upright) },
        { item: "Failed swallows", value: `${num(v.failed)}%` },
        { item: "Ineffective swallows (failed + weak + fragmented)", value: `${num(ineffective)}%` },
        { item: "Premature swallows", value: `${num(v.premature)}%` },
        { item: "Hypercontractile swallows", value: `${num(v.hyper)}%` },
        { item: "Panesophageal pressurization", value: `${num(v.pep)}%` },
        { item: "Supine swallows with elevated intrabolus pressure", value: `${num(v.ibp)}%` },
        { item: "Normal peristalsis", value: noNormal ? "Absent" : "Present" },
        { item: "Obstructive symptoms", value: v.symptoms ? "Yes" : "No" },
        { item: "Supportive test abnormal", value: v.supportive ? "Yes" : "No" },
        { item: "Rule applied (B10.1)", value: String(c.rule) }
      ] };
  },
  interpret(r) {
    const notes = [...(r.fallthrough ? [FALLTHROUGH_NOTE] : []), ...NOTES];
    const level = r.rule === 13 ? "low" : "neutral";
    return { band: r.band, level, ...(r.action ? { action: r.action } : {}), notes, copy: `Chicago v4.0: ${r.band}` };
  },
  references: [ref("Yadlapati R et al. Esophageal motility disorders on high-resolution manometry: Chicago classification version 4.0. Neurogastroenterol Motil 2021. PMID 33373111", "https://pubmed.ncbi.nlm.nih.gov/33373111/")]
};
