// Unit conversion helpers (SPEC.md B1.5).
// Each analyte has an SI unit and a conventional unit. Calculator inputs declare which
// system the original formula uses ("base"); the engine converts the entered value to
// that base before compute() is called.
import { tidy } from "./num.js";

export const ANALYTES = {
  bilirubin:  { name: "Bilirubin",  si: "µmol/L", conv: "mg/dL", siToConv: v => v / 17.1, convToSi: v => v * 17.1 },
  creatinine: { name: "Creatinine", si: "µmol/L", conv: "mg/dL", siToConv: v => v / 88.4, convToSi: v => v * 88.4 },
  urea:       { name: "Urea / BUN", si: "urea mmol/L", conv: "BUN mg/dL", siToConv: v => v / 0.357, convToSi: v => v * 0.357 },
  albumin:    { name: "Albumin",    si: "g/L", conv: "g/dL", siToConv: v => v / 10, convToSi: v => v * 10 },
  hemoglobin: { name: "Hemoglobin", si: "g/L", conv: "g/dL", siToConv: v => v / 10, convToSi: v => v * 10 },
  glucose:    { name: "Glucose",    si: "mmol/L", conv: "mg/dL", siToConv: v => v * 18, convToSi: v => v / 18 },
  calcium:    { name: "Calcium",    si: "mmol/L", conv: "mg/dL", siToConv: v => v * 4.0, convToSi: v => v / 4.0 },
  platelets:  { name: "Platelets",  si: "×10⁹/L", conv: "×10³/µL", siToConv: v => v, convToSi: v => v },
  wbc:        { name: "WBC",        si: "×10⁹/L", conv: "×10³/µL", siToConv: v => v, convToSi: v => v },
  // Total protein uses the same g/L to g/dL arithmetic as albumin (not listed in B1.5; unit arithmetic only).
  protein:    { name: "Total protein", si: "g/L", conv: "g/dL", siToConv: v => v / 10, convToSi: v => v * 10 }
};

// Converted values are rounded to 12 significant digits. Without this, floating-point arithmetic leaves
// exact equivalents just below a cutoff (205.2 µmol/L ÷ 17.1 = 11.999999999999998 mg/dL instead of 12), so an
// SI entry at the SI equivalent of a cutoff could miss the criterion. Twelve significant digits removes that
// noise (about 1e-15) while keeping full precision for small values, so formulas are unaffected.
// Tests: tests/unit_cutoffs.test.js.

// Convert `value` entered in `fromSystem` ("si" | "conv") to `toSystem`.
export function convert(analyte, value, fromSystem, toSystem) {
  const a = ANALYTES[analyte];
  if (!a) throw new Error(`Unknown analyte ${analyte}`);
  if (value === null || value === undefined || Number.isNaN(value)) return value;
  if (fromSystem === toSystem) return value;
  return tidy(fromSystem === "si" ? a.siToConv(value) : a.convToSi(value));
}

export function unitLabel(analyte, system) {
  return ANALYTES[analyte][system];
}

// Convenience functions named after B1.5 rows.
export const bilirubinUmolToMgdl = v => convert("bilirubin", v, "si", "conv");
export const creatinineUmolToMgdl = v => convert("creatinine", v, "si", "conv");
export const bunMgdlToUreaMmol = v => convert("urea", v, "conv", "si");
export const albuminGlToGdl = v => convert("albumin", v, "si", "conv");
export const hemoglobinGlToGdl = v => convert("hemoglobin", v, "si", "conv");
export const glucoseMmolToMgdl = v => convert("glucose", v, "si", "conv");
export const calciumMmolToMgdl = v => convert("calcium", v, "si", "conv");

// For criteria whose spec states a cutoff in both unit systems (SPEC.md B4 preamble): returns the
// value as the user entered it and its system, so the cutoff written for that unit is applied
// without conversion. Falls back to the base value when no entry was recorded.
export function asEntered(ctx, id, baseValue, baseSystem) {
  const e = ctx && ctx.entered && ctx.entered[id];
  return e ? { value: e.value, system: e.system } : { value: baseValue, system: baseSystem };
}
