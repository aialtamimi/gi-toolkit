// SPEC.md B3.2 MELD and MELD-Na (OPTN policy 2016–2023)
import { ref } from "../../refs.js";
import { roundHalfUp, fmt } from "../../num.js";

export const MORTALITY_BANDS = [
  { test: m => m <= 9, label: "≤9", mortality: "1.9%" },
  { test: m => m >= 10 && m <= 19, label: "10–19", mortality: "6.0%" },
  { test: m => m >= 20 && m <= 29, label: "20–29", mortality: "19.6%" },
  { test: m => m >= 30 && m <= 39, label: "30–39", mortality: "52.6%" },
  { test: m => m >= 40, label: "≥40", mortality: "71.3%" }
];
export const meldMortality = m => MORTALITY_BANDS.find(b => b.test(m));

export function bound(v) {
  let cr = v.dialysis ? 4.0 : Math.min(Math.max(v.cr, 1.0), 4.0);
  const bili = Math.max(v.bili, 1.0);
  const inr = Math.max(v.inr, 1.0);
  const na = Math.min(Math.max(v.na, 125), 137);
  return { cr, bili, inr, na };
}

export default {
  id: "meld_na",
  name: "MELD and MELD-Na",
  short: "MELD-Na",
  aliases: ["MELD", "MELD-Na", "MELD Na", "MELD sodium", "OPTN"],
  category: "liver",
  use: "Original MELD and MELD-Na (OPTN policy 2016–2023).",
  inputs: [
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 },
    { id: "inr", label: "INR", type: "number", unit: "", min: 0.5, max: 20 },
    { id: "cr", label: "Creatinine", type: "number", analyte: "creatinine", base: "conv", min: 0, max: 30 },
    { id: "na", label: "Sodium", type: "number", unit: "mmol/L", min: 90, max: 180 },
    { id: "dialysis", label: "Dialysis at least twice in the past 7 days, or CVVHD for 24 hours in the past 7 days", type: "checkbox" }
  ],
  compute(v) {
    const b = bound(v);
    const bracketRaw = 0.957 * Math.log(b.cr) + 0.378 * Math.log(b.bili) + 1.120 * Math.log(b.inr) + 0.643;
    const bracket = roundHalfUp(bracketRaw, 1);
    const meldi = roundHalfUp(bracket * 10, 0);   // bracket already has one decimal; removes float noise
    let meldNaRaw = meldi;
    if (meldi > 11) meldNaRaw = meldi + 1.32 * (137 - b.na) - 0.033 * meldi * (137 - b.na);
    const meldNa = Math.min(roundHalfUp(meldNaRaw, 0), 40);
    const breakdown = [
      { item: "Creatinine used (mg/dL, bounded 1.0–4.0)", value: fmt(b.cr, 2) },
      { item: "Bilirubin used (mg/dL, minimum 1.0)", value: fmt(b.bili, 2) },
      { item: "INR used (minimum 1.0)", value: fmt(b.inr, 2) },
      { item: "Sodium used (mmol/L, bounded 125–137)", value: fmt(b.na, 1) },
      { item: "Bracket term (unrounded)", value: fmt(bracketRaw, 4) },
      { item: "Bracket term rounded to 1 decimal (round half up)", value: fmt(bracket, 1) },
      { item: "MELD(i) = 10 × bracket", value: String(meldi) },
      { item: meldi > 11 ? "MELD-Na unrounded" : "MELD(i) ≤11, so MELD-Na = MELD(i)", value: fmt(meldNaRaw, 2) }
    ];
    return {
      score: meldNa, meldi, meldNa, meldNaRaw, bracketRaw, bracket,
      display: String(meldNa), label: "MELD-Na",
      rounding: "Bracket term rounded to 1 decimal (round half up) before × 10 (OPTN); MELD-Na rounded to the nearest whole number and capped at 40.",
      details: [{ label: "MELD(i) (original MELD)", value: String(meldi) }, { label: "MELD-Na unrounded", value: fmt(meldNaRaw, 2) }],
      breakdown
    };
  },
  interpret(r) {
    const mNa = meldMortality(r.meldNa), mI = meldMortality(r.meldi);
    return {
      band: `MELD-Na ${mNa.label}`, level: "neutral",
      text: `90-day mortality (Wiesner, Gastroenterology 2003): MELD ${mNa.label}: ${mNa.mortality}.`,
      sections: [{ title: "Original MELD(i)", lines: [`MELD(i) ${r.meldi}: 90-day mortality for MELD ${mI.label}: ${mI.mortality}`] }],
      notes: ["MDCalc may differ by 1 point because of the OPTN bracket rounding."],
      copy: `MELD(i) ${r.meldi}, MELD-Na ${r.meldNa}`
    };
  },
  notes: "Bounds: bilirubin, INR and creatinine below 1.0 are set to 1.0. Creatinine above 4.0 is set to 4.0. Dialysis sets creatinine to 4.0. Sodium is bounded to 125–137 mmol/L.",
  references: [
    ref("Kamath PS et al. A model to predict survival in patients with end-stage liver disease. Hepatology 2001"),
    ref("OPTN MELD policy", "https://optn.transplant.hrsa.gov/"),
    ref("Wiesner R et al. Model for end-stage liver disease (MELD) and allocation of donor livers. Gastroenterology 2003")
  ]
};
