// Weight-based doses on the bedside algorithm pages (SPEC.md B7.0; test vectors B8.7).
// Pure functions: the weight is passed in and never stored (Build Rule 4).
import { roundHalfUp } from "./num.js";

export const WEIGHT_MIN = 20;
export const WEIGHT_MAX = 350;
export const DOSE_ROUNDING = "Calculated values are shown to 1 decimal place (round half up), without a trailing \".0\"; mL of 20% albumin is calculated from the unrounded grams (1 g = 5 mL).";

// 1 decimal place, round half up, no trailing ".0".
export function amount(x) {
  return String(roundHalfUp(x, 1));
}

export function validWeight(w) {
  return typeof w === "number" && Number.isFinite(w) && w >= WEIGHT_MIN && w <= WEIGHT_MAX;
}

// Terlipressin dose by weight: <50 kg 1 mg; 50–70 kg 1.5 mg; >70 kg 2 mg.
export function terlipressinMg(w) {
  if (w < 50) return 1;
  if (w <= 70) return 1.5;
  return 2;
}

// `name` is the name used in SPEC.md ("Weight-based:" lines and the B7.0 table);
// `page` and `row` place the calculated line under the matching Doses table row.
export const DOSES = [
  { id: "terlipressin", name: "terlipressin", page: "em_ugib", row: "Terlipressin",
    label: "Terlipressin by weight",
    value: w => `${amount(terlipressinMg(w))} mg IV every 4 hours for 48 hours, then 1 mg every 4 hours` },
  { id: "infliximab_5", name: "infliximab 5 mg/kg", page: "em_asuc", row: "Infliximab (rescue)",
    label: "Infliximab 5 mg/kg", value: w => `${amount(5 * w)} mg IV` },
  { id: "infliximab_10", name: "infliximab 10 mg/kg", page: "em_asuc", row: "Infliximab (rescue)",
    label: "Infliximab 10 mg/kg", value: w => `${amount(10 * w)} mg IV` },
  { id: "ciclosporin", name: "ciclosporin", page: "em_asuc", row: "Ciclosporin (rescue)",
    label: "Ciclosporin 2 mg/kg/day", value: w => `${amount(2 * w)} mg/day continuous IV infusion` },
  { id: "albumin_day1", name: "albumin day 1", page: "em_sbp", row: "Albumin 20–25%",
    label: "Albumin day 1, 1.5 g/kg", value: w => `${amount(1.5 * w)} g = ${amount(1.5 * w * 5)} mL of 20% albumin` },
  { id: "albumin_day3", name: "albumin day 3", page: "em_sbp", row: "Albumin 20–25%",
    label: "Albumin day 3, 1 g/kg", value: w => `${amount(w)} g = ${amount(w * 5)} mL of 20% albumin` },
  { id: "ringer_infusion", name: "lactated Ringer's infusion", page: "em_pancreatitis", row: "Lactated Ringer's",
    label: "Lactated Ringer's 1.5 mL/kg/h", value: w => `${amount(1.5 * w)} mL/h` },
  { id: "ringer_bolus", name: "lactated Ringer's bolus", page: "em_pancreatitis", row: "Lactated Ringer's",
    label: "Lactated Ringer's bolus if hypovolemic, 10 mL/kg", value: w => `${amount(10 * w)} mL` },
  { id: "urine_output", name: "urine output target", page: "em_pancreatitis", row: null,
    label: "Urine output target >0.5 mL/kg/h", value: w => `>${amount(0.5 * w)} mL/h` }
];

export const findDose = id => DOSES.find(d => d.id === id);

// Full line for a weight, or null when the weight is blank or outside 20–350 kg.
export function doseLine(id, w) {
  const d = findDose(id);
  if (!d) throw new Error(`Unknown dose ${id}`);
  return validWeight(w) ? `${d.label}: ${d.value(w)}` : null;
}

// Parse the weight field text ("72,5" accepted). Returns { weight, error }.
export function parseWeight(text) {
  const s = String(text ?? "").trim();
  if (!s) return { weight: null, error: null };
  const n = Number(s.replace(",", "."));
  if (!Number.isFinite(n)) return { weight: null, error: "Enter a number" };
  if (!validWeight(n)) return { weight: null, error: `Outside accepted input range ${WEIGHT_MIN} to ${WEIGHT_MAX} kg` };
  return { weight: n, error: null };
}
