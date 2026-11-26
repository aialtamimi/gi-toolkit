// SPEC.md B3.20 FibroScan (VCTE) interpretation
import { ref } from "../../refs.js";
import { fmt, isNum } from "../../num.js";
import { baveno } from "./baveno7.js";

export function quality(v) {
  const msgs = [];
  if (v.valid < 10) msgs.push("Unreliable: fewer than 10 valid measurements. Repeat the exam.");
  if (v.iqr > 30 && v.lsm >= 7.1) msgs.push("Unreliable: IQR/median above 30%. Repeat the exam.");
  const reliable = v.valid >= 10 && (v.iqr <= 30 || v.lsm < 7.1);
  return { reliable, messages: reliable ? ["Reliable exam."] : msgs };
}

// Returns { key, text, source } for the LSM interpretation by liver disease.
export function lsmInterpretation(disease, lsm, altX) {
  switch (disease) {
    case "masld":
      if (lsm < 8) return { key: "low", text: "Low risk of advanced fibrosis", source: "AASLD 2023; EASL-EASD-EASO 2024" };
      if (lsm <= 12) return { key: "indeterminate", text: "Indeterminate; consider ELF, MR elastography or hepatology review", source: "AASLD 2023; EASL-EASD-EASO 2024" };
      return { key: "high", text: "High risk of advanced fibrosis; refer to hepatology", source: "AASLD 2023; EASL-EASD-EASO 2024" };
    case "alcohol":
      if (lsm < 8) return { key: "ruled_out", text: "Advanced fibrosis ruled out", source: "EASL NIT guideline 2021" };
      if (lsm < 12) return { key: "indeterminate", text: "Indeterminate", source: "EASL NIT guideline 2021" };
      if (lsm < 15) return { key: "likely", text: "Advanced fibrosis likely", source: "EASL NIT guideline 2021" };
      return { key: "cacld", text: "Compensated advanced chronic liver disease highly likely", source: "EASL NIT guideline 2021" };
    case "hcv":
      if (lsm < 7.1) return { key: "f0f1", text: "F0–F1", source: "Castera, Gastroenterology 2005" };
      if (lsm < 9.5) return { key: "f2", text: "Significant fibrosis (≥F2)", source: "Castera, Gastroenterology 2005" };
      if (lsm < 12.5) return { key: "f3", text: "Advanced fibrosis (≥F3)", source: "Castera, Gastroenterology 2005" };
      return { key: "f4", text: "Cirrhosis (F4)", source: "Castera, Gastroenterology 2005" };
    case "hbv": {
      if (!isNum(altX)) return { key: "need_alt", text: "Enter ALT (as a multiple of ULN) to choose the hepatitis B cutoffs (ALT normal or ALT raised).", source: "NICE CG165; EASL HBV 2017" };
      const raised = altX > 1;
      const upper = raised ? 12 : 9;
      const table = raised ? "Hepatitis B, ALT raised (1–5 × ULN)" : "Hepatitis B, ALT normal";
      if (lsm < 6) return { key: "unlikely", table, text: "Significant fibrosis unlikely", source: "NICE CG165; EASL HBV 2017" };
      if (lsm <= upper) return { key: "indeterminate", table, text: "Indeterminate", source: "NICE CG165; EASL HBV 2017" };
      return { key: "likely", table, text: "Advanced fibrosis or cirrhosis likely", source: "NICE CG165; EASL HBV 2017" };
    }
    default:
      return { key: "baveno_only", text: "Use the Baveno VII rule of five only (below)", source: "Baveno VII 2022" };
  }
}

export function capGrade(cap) {
  if (cap < 248) return "S0 (none)";
  if (cap < 268) return "S1 (mild)";
  if (cap < 280) return "S2 (moderate)";
  return "S3 (severe)";
}

export function bavenoLine(lsm) {
  const parts = [];
  if (lsm < 10) parts.push("cACLD ruled out");
  else if (lsm <= 15) parts.push("cACLD suggestive");
  else parts.push("cACLD highly suggestive");
  if (lsm >= 25) parts.push("clinically significant portal hypertension");
  return parts;
}

const DISEASES = [
  { label: "MASLD", value: "masld" },
  { label: "Alcohol-related", value: "alcohol" },
  { label: "Hepatitis C", value: "hcv" },
  { label: "Hepatitis B", value: "hbv" },
  { label: "Other or mixed", value: "other" }
];
const CONFOUNDERS = [
  { id: "cAlt", label: "ALT >5 × ULN or acute hepatitis" },
  { id: "cChol", label: "Extrahepatic cholestasis" },
  { id: "cCong", label: "Heart failure or hepatic congestion" },
  { id: "cFast", label: "Fasting <3 hours" },
  { id: "cEtoh", label: "Heavy alcohol intake in the past weeks (alcohol-related disease)" }
];

export default {
  id: "fibroscan",
  name: "FibroScan (VCTE) interpretation",
  short: "FibroScan",
  aliases: ["FibroScan", "elastography", "VCTE", "LSM", "CAP", "transient elastography", "steatosis"],
  category: "liver",
  use: "Checks exam quality, then interprets liver stiffness (LSM, kPa) by liver disease, and CAP (dB/m) for steatosis.",
  inputs: [
    { id: "disease", label: "Liver disease", type: "radio", options: DISEASES },
    { id: "lsm", label: "LSM", type: "number", unit: "kPa", min: 1, max: 80 },
    { id: "iqr", label: "IQR/median", type: "number", unit: "%", min: 0, max: 100 },
    { id: "valid", label: "Number of valid measurements", type: "number", unit: "", min: 0, max: 100 },
    { id: "cap", label: "CAP", type: "number", unit: "dB/m", min: 50, max: 450, optional: true },
    { id: "altX", label: "ALT as multiple of ULN", type: "number", unit: "× ULN", min: 0, max: 200, optional: true },
    { id: "plt", label: "Platelets", type: "number", analyte: "platelets", base: "si", min: 0, max: 2000, optional: true },
    { id: "probe", label: "Probe (for display only)", type: "radio", optional: true, options: [{ label: "M", value: "M" }, { label: "XL", value: "XL" }] },
    { type: "heading", label: "Confounders" },
    ...CONFOUNDERS.map(c => ({ id: c.id, label: c.label, type: "checkbox" }))
  ],
  compute(v) {
    const q = quality(v);
    const lsmI = lsmInterpretation(v.disease, v.lsm, v.altX);
    const confounders = CONFOUNDERS.filter(c => v[c.id]).map(c => c.label);
    const plat = isNum(v.plt) ? baveno(v.lsm, v.plt).filter(r => r.key === "csph_out" || r.key === "endo_avoid") : null;
    return {
      score: v.lsm, display: `${fmt(v.lsm, 1)} kPa`, label: "LSM" + (v.probe ? ` (${v.probe} probe)` : ""),
      rounding: "Rules applied to the values as entered.",
      quality: q, lsm: lsmI, baveno: bavenoLine(v.lsm), plateletRules: plat,
      cap: isNum(v.cap) ? capGrade(v.cap) : null, confounders,
      altFlare: isNum(v.altX) && v.altX > 5,
      breakdown: [
        { item: "Valid measurements", value: String(v.valid) },
        { item: "IQR/median", value: `${v.iqr}%` },
        { item: "LSM", value: `${v.lsm} kPa` },
        ...(isNum(v.cap) ? [{ item: "CAP", value: `${v.cap} dB/m` }] : [])
      ]
    };
  },
  interpret(r) {
    const sections = [];
    sections.push({ title: "Step 1: Quality", level: r.quality.reliable ? "low" : "high", lines: r.quality.messages, box: true });
    const warn = [];
    if (r.confounders.length) warn.push("LSM may overestimate fibrosis", ...r.confounders.map(c => "Confounder: " + c));
    if (r.altFlare) warn.push("Do not interpret LSM for fibrosis during a hepatitis flare. Repeat when ALT settles.");
    if (warn.length) sections.push({ title: "Step 2: Confounders", level: "intermediate", lines: warn });
    const muted = !r.quality.reliable;
    sections.push({ title: "Step 3: LSM interpretation" + (r.lsm.table ? ` (${r.lsm.table})` : ""), muted,
      lines: [r.lsm.text, `Source: ${r.lsm.source}`] });
    const bav = [`Baveno VII: ${r.baveno.join("; ")}`];
    if (r.plateletRules) r.plateletRules.forEach(p => bav.push(`${p.rule}: ${p.met ? p.text : "not met"}`));
    sections.push({ title: "Step 4: Baveno VII", muted, lines: bav });
    if (r.cap) sections.push({ title: "Step 5: CAP (steatosis)", muted,
      lines: [`Steatosis grade ${r.cap}`, "CAP is influenced by BMI and diabetes and grades steatosis only roughly; it does not measure inflammation or fibrosis."] });
    const band = r.quality.reliable ? `Reliable; ${r.lsm.text}` : "Unreliable exam: repeat";
    return {
      band, level: "neutral", sections,
      notes: ["Use the XL probe when the M probe fails or the skin-to-liver capsule distance is ≥25 mm. Cutoffs differ between diseases: always choose the correct disease."],
      copy: `FibroScan LSM ${fmt(r.score, 1)} kPa: ${r.quality.reliable ? "reliable" : "unreliable"}; ${r.lsm.text}; Baveno: ${r.baveno.join(", ")}${r.cap ? "; CAP " + r.cap.split(" ")[0] : ""}`
    };
  },
  references: [
    ref("Rinella ME et al. AASLD Practice Guidance on NAFLD. Hepatology 2023"),
    ref("EASL-EASD-EASO Clinical Practice Guidelines on the management of MASLD. J Hepatol 2024"),
    ref("EASL Clinical Practice Guidelines on non-invasive tests for evaluation of liver disease severity and prognosis, 2021 update. J Hepatol 2021"),
    ref("Castera L et al. Prospective comparison of transient elastography, Fibrotest, APRI, and liver biopsy in chronic hepatitis C. Gastroenterology 2005"),
    ref("NICE CG165 Hepatitis B (chronic): diagnosis and management", "https://www.nice.org.uk/guidance/cg165"),
    ref("EASL 2017 Clinical Practice Guidelines on the management of hepatitis B virus infection. J Hepatol 2017"),
    ref("de Franchis R et al. Baveno VII. J Hepatol 2022"),
    ref("Karlas T et al. Individual patient data meta-analysis of controlled attenuation parameter (CAP). J Hepatol 2017")
  ]
};
