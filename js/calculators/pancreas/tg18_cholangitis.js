// SPEC.md B4.8 Tokyo Guidelines 2018 for acute cholangitis
import { ref } from "../../refs.js";
import { isNum } from "../../num.js";
import { asEntered } from "../../units.js";

export const ORGAN_DYSFUNCTION = [
  { id: "odCv", label: "Hypotension needing dopamine ≥5 µg/kg/min or any norepinephrine" },
  { id: "odNeuro", label: "Disturbed consciousness" },
  { id: "odResp", label: "PaO2/FiO2 <300" },
  { id: "odRenal", label: "Oliguria or creatinine >2.0 mg/dL" },
  { id: "odHep", label: "PT-INR >1.5" },
  { id: "odHeme", label: "Platelets <100 ×10⁹/L" }
];

export const ACTIONS = {
  1: "Antibiotics and supportive care; biliary drainage if no response within 24 hours.",
  2: "Early biliary drainage (ERCP) with antibiotics.",
  3: "Organ support and urgent biliary drainage once stabilized."
};

// B-1 total bilirubin ≥2 mg/dL (≥34 µmol/L): the cutoff for the unit entered is applied, no conversion.
export function biliB1(b) { return b.system === "si" ? b.value >= 34 : b.value >= 2; }

export function diagnosis(v, ctx) {
  const a1 = v.temp > 38 || !!v.chills;
  const a2 = v.wbc < 4 || v.wbc > 10 || (isNum(v.crp) && v.crp >= 10);
  const b1 = biliB1(asEntered(ctx, "bili", v.bili, "conv"));
  const b2 = !!v.enzymes;
  const c1 = !!v.dilatation, c2 = !!v.cause;
  const A = a1 || a2, B = b1 || b2, C = c1 || c2;
  const status = A && B && C ? "Definite" : A && (B || C) ? "Suspected" : "Not met";
  return { a1, a2, b1, b2, c1, c2, A, B, C, status };
}

export function severity(v) {
  const od = ORGAN_DYSFUNCTION.filter(o => v[o.id]);
  const g2 = [
    { item: "WBC >12 or <4 ×10⁹/L", met: v.wbc > 12 || v.wbc < 4 },
    { item: "Fever ≥39 °C", met: v.temp >= 39 },
    { item: "Age ≥75", met: v.age >= 75 },
    { item: "Total bilirubin ≥5 mg/dL", met: v.bili >= 5 },
    { item: "Albumin <0.7 × lower limit of normal", met: !!v.lowAlb }
  ];
  const g2Count = g2.filter(x => x.met).length;
  const grade = od.length ? 3 : g2Count >= 2 ? 2 : 1;
  return { grade, od, g2, g2Count };
}

export default {
  id: "tg18_cholangitis",
  name: "Tokyo Guidelines 2018 for acute cholangitis",
  short: "TG18 cholangitis",
  aliases: ["TG18", "Tokyo Guidelines", "Tokyo criteria", "cholangitis", "acute cholangitis", "ascending cholangitis", "Charcot"],
  category: "pancreas",
  use: "Two parts on one screen: diagnosis, then severity.",
  inputs: [
    { type: "heading", label: "A. Systemic inflammation" },
    { id: "temp", label: "Temperature", type: "number", unit: "°C", min: 25, max: 45 },
    { id: "chills", label: "Shaking chills", type: "checkbox" },
    { id: "wbc", label: "WBC", type: "number", analyte: "wbc", base: "si", min: 0, max: 500 },
    { id: "crp", label: "CRP", type: "number", unit: "mg/L", min: 0, max: 1000, optional: true,
      help: "CRP ≥1 mg/dL = ≥10 mg/L." },
    { type: "heading", label: "B. Cholestasis" },
    { id: "bili", label: "Total bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 },
    { id: "enzymes", label: "ALP, GGT, AST or ALT >1.5 × ULN", type: "checkbox" },
    { type: "heading", label: "C. Imaging" },
    { id: "dilatation", label: "C-1 Biliary dilatation", type: "checkbox" },
    { id: "cause", label: "C-2 Evidence of the cause (stricture, stone, stent)", type: "checkbox" },
    { type: "heading", label: "Severity: grade II items" },
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "lowAlb", label: "Albumin <0.7 × lower limit of normal", type: "checkbox" },
    { type: "heading", label: "Severity: grade III, organ dysfunction (any one)" },
    ...ORGAN_DYSFUNCTION.map(o => ({ id: o.id, label: o.label, type: "checkbox" }))
  ],
  compute(v, ctx) {
    const dx = diagnosis(v, ctx);
    const sev = severity(v);
    const yn = b => (b ? "Yes" : "No");
    const breakdown = [
      { item: "A-1 Fever >38 °C and/or shaking chills", value: yn(dx.a1) },
      { item: "A-2 WBC <4 or >10 ×10⁹/L, or CRP ≥1 mg/dL (≥10 mg/L)", value: yn(dx.a2) },
      { item: "B-1 Total bilirubin ≥2 mg/dL (≥34 µmol/L)", value: yn(dx.b1) },
      { item: "B-2 ALP, GGT, AST or ALT >1.5 × ULN", value: yn(dx.b2) },
      { item: "C-1 Biliary dilatation", value: yn(dx.c1) },
      { item: "C-2 Evidence of the cause", value: yn(dx.c2) },
      ...sev.g2.map(x => ({ item: `Grade II: ${x.item}`, value: yn(x.met) })),
      ...ORGAN_DYSFUNCTION.map(o => ({ item: `Grade III: ${o.label}`, value: yn(!!v[o.id]) }))
    ];
    const details = [{ label: "Diagnosis", value: dx.status === "Not met" ? "Criteria not met" : dx.status },
      { label: "Severity", value: `Grade ${["I", "II", "III"][sev.grade - 1]}` }];
    return { score: sev.grade, dx, sev, details, breakdown,
      display: `${dx.status === "Not met" ? "Criteria not met" : dx.status}; grade ${["I", "II", "III"][sev.grade - 1]}`,
      label: "TG18", rounding: "Categorical; no rounding. B-1 bilirubin uses the cutoff written for the unit entered (≥2 mg/dL or ≥34 µmol/L); the grade II cutoff (≥5 mg/dL) is given in mg/dL only, so µmol/L entries are converted (÷17.1)." };
  },
  interpret(r) {
    const roman = ["I", "II", "III"][r.sev.grade - 1];
    const name = { 1: "Grade I (mild)", 2: "Grade II (moderate)", 3: "Grade III (severe)" }[r.sev.grade];
    const level = { 1: "low", 2: "intermediate", 3: "high" }[r.sev.grade];
    const dxText = { Definite: "Definite diagnosis: one item in each of A, B and C.",
      Suspected: "Suspected diagnosis: one item in A plus one item in B or C.",
      "Not met": "Criteria for suspected or definite acute cholangitis are not met." }[r.dx.status];
    const sevLine = r.sev.grade === 3
      ? `Organ dysfunction: ${r.sev.od.map(o => o.label).join("; ")}.`
      : r.sev.grade === 2 ? `Grade II: ${r.sev.g2Count} of 5 items (any two).` : "Neither grade II nor grade III.";
    const sections = [{ title: "Diagnosis", lines: [dxText] }, { title: name, level, lines: [sevLine] }];
    return { band: name, level, sections, action: ACTIONS[r.sev.grade],
      links: [{ label: "Cholangitis emergency page", target: "em_cholangitis" }],
      copy: `TG18 cholangitis: ${r.dx.status === "Not met" ? "criteria not met" : r.dx.status.toLowerCase()}; grade ${roman}` };
  },
  references: [ref("Kiriyama S et al. Tokyo Guidelines 2018: diagnostic criteria and severity grading of acute cholangitis. J Hepatobiliary Pancreat Sci 2018", "https://pubmed.ncbi.nlm.nih.gov/29032610/"),
    ref("ASGE guideline on the management of cholangitis 2021", "https://guidelinecentral.com/guideline/1285200")]
};
