// SPEC.md B3.20 FibroScan (VCTE) interpretation
// The result needs only the disease and liver stiffness (LSM). CAP is optional. Exam-quality
// inputs are optional, sit in a collapsed section below the result, and only add warnings.
import { ref } from "../../refs.js";
import { fmt, isNum } from "../../num.js";

// Fibrosis cutoffs (kPa). A value at or above a cutoff gets that stage; below the F2 cutoff = F0–F1.
export const CUTOFFS = {
  masld: { f2: 8.2, f3: 9.7, f4: 13.6, source: "Eddowes, Gastroenterology 2019" },
  alcohol: { f2: 9.0, f3: 12.9, f4: 18.6, source: "JHEP Reports 2020 review table" },
  hbv: { f2: 7.9, f3: 8.8, f4: 11.7, source: "Chon, PLoS One 2012 meta-analysis" },
  hcv: { f2: 7.1, f3: 9.5, f4: 12.5, source: "Castera, Gastroenterology 2005" }
};

export const DISEASES = [
  { label: "MASLD", value: "masld" },
  { label: "Alcohol-related", value: "alcohol" },
  { label: "Hepatitis B", value: "hbv" },
  { label: "Hepatitis C", value: "hcv" },
  { label: "Other/mixed", value: "other" }
];

export const ALCOHOL_NOTE = "Higher AST or bilirubin raises stiffness; repeat after abstinence.";
export const CAP_NOTE = "CAP is influenced by BMI and diabetes and grades steatosis only roughly; it does not measure inflammation or fibrosis.";
export const FLARE_WARNING = "Do not interpret LSM for fibrosis during a hepatitis flare. Repeat when ALT settles.";
export const VALID_WARNING = "Unreliable: fewer than 10 valid measurements. Repeat the exam.";
export const IQR_WARNING = "Unreliable: IQR/median above 30%. Repeat the exam.";
export const CONFOUNDER_WARNING = "LSM may overestimate fibrosis";

export function fibrosisStage(disease, lsm) {
  const c = CUTOFFS[disease];
  if (!c) return null;
  if (lsm >= c.f4) return "F4";
  if (lsm >= c.f3) return "F3";
  if (lsm >= c.f2) return "F2";
  return "F0–F1";
}

// Steatosis grade from CAP (dB/m), all diseases (Karlas, J Hepatol 2017).
export function steatosisGrade(cap) {
  if (cap < 248) return "S0";
  if (cap < 268) return "S1";
  if (cap < 280) return "S2";
  return "S3";
}

// Baveno VII: <10 cACLD unlikely; 10–15 suggestive; >15 highly suggestive; 25 or more: CSPH ruled in (Baveno VII).
export function baveno(lsm) {
  let text, level;
  if (lsm < 10) { text = "cACLD unlikely"; level = "low"; }
  else if (lsm <= 15) { text = "cACLD suggestive"; level = "intermediate"; }
  else { text = "cACLD highly suggestive"; level = "high"; }
  if (lsm >= 25) text += "; CSPH ruled in (Baveno VII)";
  return { text, level };
}

const CONFOUNDERS = [
  { id: "cAlt", label: "ALT >5 × ULN or acute hepatitis" },
  { id: "cChol", label: "Extrahepatic cholestasis" },
  { id: "cCong", label: "Heart failure or hepatic congestion" },
  { id: "cFast", label: "Fasting <3 hours" },
  { id: "cEtoh", label: "Heavy alcohol intake in the past weeks (alcohol-related disease)" }
];

// Exam-quality warnings. Missing values add no warning; nothing here blocks or hides the result.
export function examWarnings(v) {
  const w = [];
  if (isNum(v.valid) && v.valid < 10) w.push(VALID_WARNING);
  if (isNum(v.iqr) && v.iqr > 30 && v.lsm >= 7.1) w.push(IQR_WARNING);
  const conf = CONFOUNDERS.filter(c => v[c.id]).map(c => c.label);
  if (conf.length) w.push(CONFOUNDER_WARNING, ...conf.map(c => "Confounder: " + c));
  if (isNum(v.altX) && v.altX > 5) w.push(FLARE_WARNING);
  return { warnings: w, unreliable: w.includes(VALID_WARNING) || w.includes(IQR_WARNING) };
}

const STAGE_LEVEL = { "F0–F1": "low", F2: "intermediate", F3: "high", F4: "high" };
const Q = "quality";

export default {
  id: "fibroscan",
  name: "FibroScan (VCTE) interpretation",
  short: "FibroScan",
  aliases: ["FibroScan", "elastography", "VCTE", "LSM", "CAP", "transient elastography", "steatosis", "fibrosis stage"],
  category: "liver",
  use: "Fibrosis stage from liver stiffness (kPa) by liver disease, and steatosis grade from CAP (dB/m). The result appears as soon as disease and kPa are entered.",
  groups: { [Q]: "Exam quality (optional)" },
  inputs: [
    { id: "disease", label: "1. Disease", type: "radio", options: DISEASES },
    { id: "lsm", label: "2. Liver stiffness", type: "number", unit: "kPa", min: 1, max: 80 },
    { id: "cap", label: "3. CAP", type: "number", unit: "dB/m", min: 50, max: 450, optional: true },
    { id: "iqr", label: "IQR/median", type: "number", unit: "%", min: 0, max: 100, optional: true, group: Q },
    { id: "valid", label: "Number of valid measurements", type: "number", unit: "", min: 0, max: 100, integer: true, optional: true, group: Q },
    { id: "altX", label: "ALT as multiple of ULN", type: "number", unit: "× ULN", min: 0, max: 200, optional: true, group: Q },
    { type: "heading", label: "Confounders", group: Q },
    ...CONFOUNDERS.map(c => ({ id: c.id, label: c.label, type: "checkbox", group: Q }))
  ],
  compute(v) {
    const stage = fibrosisStage(v.disease, v.lsm);
    const steatosis = isNum(v.cap) ? steatosisGrade(v.cap) : null;
    const bav = baveno(v.lsm);
    const q = examWarnings(v);
    const display = [stage ? `Fibrosis: ${stage}` : `Baveno VII: ${bav.text}`];
    if (steatosis) display.push(`Steatosis: ${steatosis}`);
    const c = CUTOFFS[v.disease];
    const breakdown = [{ item: "Liver stiffness", value: `${fmt(v.lsm, 1)} kPa` }];
    if (c) breakdown.push({ item: `Cutoffs (${c.source})`, value: `F2 ${c.f2}, F3 ${c.f3}, F4 ${c.f4} kPa` });
    else breakdown.push({ item: "Other/mixed", value: "No F stage; Baveno VII only" });
    if (steatosis) breakdown.push({ item: "CAP (Karlas, J Hepatol 2017)", value: `${fmt(v.cap, 0)} dB/m` });
    return { score: v.lsm, disease: v.disease, stage, steatosis, baveno: bav, cutoffs: c || null, ...q, breakdown, display,
      label: "FibroScan", rounding: "Cutoffs applied to the values as entered; no rounding." };
  },
  interpret(r) {
    const diseaseLabel = DISEASES.find(d => d.value === r.disease).label;
    const sections = r.warnings.length ? [{ title: "Exam quality warning", level: "high", box: true, lines: r.warnings }] : [];
    const notes = [];
    if (r.disease === "alcohol") notes.push(ALCOHOL_NOTE);
    if (r.steatosis) notes.push(CAP_NOTE);
    const capCopy = r.steatosis ? `; steatosis ${r.steatosis}` : "";
    const qualCopy = r.unreliable ? "; exam unreliable" : "";
    if (!r.stage) {
      return { band: `Baveno VII: ${r.baveno.text}`, level: r.baveno.level,
        text: "Baveno VII: <10 kPa cACLD unlikely; 10–15 suggestive; >15 highly suggestive; 25 or more: CSPH ruled in (Baveno VII).",
        sections, notes,
        copy: `FibroScan ${diseaseLabel} ${fmt(r.score, 1)} kPa: ${r.baveno.text}${capCopy}${qualCopy}` };
    }
    return { band: `Fibrosis ${r.stage} (${diseaseLabel} cutoffs)`, level: STAGE_LEVEL[r.stage],
      text: `Baveno VII: ${r.baveno.text}.`,
      sections, notes,
      copy: `FibroScan ${diseaseLabel} ${fmt(r.score, 1)} kPa: fibrosis ${r.stage}${capCopy}${qualCopy}` };
  },
  notes: "Use the XL probe when the M probe fails or the skin-to-liver capsule distance is ≥25 mm. Cutoffs differ between diseases: always choose the correct disease.",
  references: [
    ref("Eddowes PJ et al. Accuracy of FibroScan controlled attenuation parameter and liver stiffness measurement in assessing steatosis and fibrosis in patients with nonalcoholic fatty liver disease. Gastroenterology 2019"),
    ref("Castera L et al. Prospective comparison of transient elastography, Fibrotest, APRI, and liver biopsy in chronic hepatitis C. Gastroenterology 2005"),
    ref("Chon YE et al. Performance of transient elastography for the staging of liver fibrosis in patients with chronic hepatitis B: a meta-analysis. PLoS One 2012"),
    ref("JHEP Reports 2020;2(3):100101. doi:10.1016/j.jhepr.2020.100101 (review table: liver stiffness cutoffs in alcohol-related liver disease)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC7267467/"),
    ref("Karlas T et al. Individual patient data meta-analysis of controlled attenuation parameter (CAP). J Hepatol 2017"),
    ref("de Franchis R et al. Baveno VII. J Hepatol 2022")
  ]
};
