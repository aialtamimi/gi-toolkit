// Weight-based doses on the bedside algorithm pages (SPEC.md B7.0; test vectors B8.7).
// Pure functions: the weight is passed in and never stored (Build Rule 4).
import { roundHalfUp } from "./num.js";

export const WEIGHT_MIN = 20;
export const WEIGHT_MAX = 350;
export const DOSE_ROUNDING = "Calculated values are shown to 1 decimal place (round half up), without a trailing \".0\"; mL of albumin is calculated from the unrounded grams (20% albumin: 1 g = 5 mL; 25% albumin: 1 g = 4 mL).";
export const WEIGHT_RANGE_MESSAGE = "Enter weight between 20 and 350 kg";
export const NAC_MAX_DOSING_WEIGHT = 100;

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

// `tag` marks a line that is not a dose (shown before the label).
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
    label: "Albumin day 1, 1.5 g/kg", value: w => `${amount(1.5 * w)} g = ${amount(1.5 * w * 5)} mL of 20% albumin or ${amount(1.5 * w * 4)} mL of 25% albumin` },
  { id: "albumin_day3", name: "albumin day 3", page: "em_sbp", row: "Albumin 20–25%",
    label: "Albumin day 3, 1 g/kg", value: w => `${amount(w)} g = ${amount(w * 5)} mL of 20% albumin or ${amount(w * 4)} mL of 25% albumin` },
  { id: "ringer_infusion", name: "lactated Ringer's infusion", page: "em_pancreatitis", row: "Lactated Ringer's",
    label: "Lactated Ringer's 1.5 mL/kg/h", value: w => `${amount(1.5 * w)} mL/h` },
  { id: "ringer_bolus", name: "lactated Ringer's bolus", page: "em_pancreatitis", row: "Lactated Ringer's",
    label: "Lactated Ringer's bolus if hypovolemic, 10 mL/kg", value: w => `${amount(10 * w)} mL` },
  { id: "urine_output", name: "urine output target", page: "em_pancreatitis", row: null,
    tag: "Target, not a dose", label: "Urine output >0.5 mL/kg/h", value: w => `>${amount(0.5 * w)} mL/h` },
  ...[["2", "INR 2 to <4", 25, 2500], ["4", "INR 4–6", 35, 3500], ["6", "INR >6", 50, 5000]].map(([k, band, perKg, max]) => ({
    id: `pcc_inr${k}`, name: `prothrombin complex concentrate ${band}`, page: "em_antithrombotic",
    row: "4-factor prothrombin complex concentrate (warfarin, life-threatening bleeding)",
    label: `4-factor prothrombin complex concentrate, ${band}, ${perKg} units/kg (max ${max} units)`,
    value: w => (perKg * w > max ? `${max} units IV (maximum)` : `${amount(perKg * w)} units IV`) })),
  ...[[150, "over 1 hour"], [50, "over 4 hours"], [100, "over 16 hours"]].map(([perKg, over]) => ({
    id: `nac_${perKg}`, name: `N-acetylcysteine ${perKg} mg/kg`, page: "em_alf", row: "N-acetylcysteine, 21-hour IV regimen",
    label: `N-acetylcysteine ${perKg} mg/kg ${over}`,
    // Dosing weight capped at 100 kg (US label; clinical owner decision).
    value: w => `${amount(perKg * Math.min(w, NAC_MAX_DOSING_WEIGHT))} mg${w > NAC_MAX_DOSING_WEIGHT ? " (dosing weight capped at 100 kg)" : ""}` })),
  ...[["1", 1], ["1.5", 1.5]].map(([k, perKg]) => ({
    id: `albumin_challenge_${k.replace(".", "_")}`, name: `albumin challenge ${k} g/kg`, page: "em_hrs",
    row: "Albumin 20–25%, fluid challenge if volume status is unclear",
    label: `Albumin challenge, ${k} g/kg`,
    value: w => `${amount(perKg * w)} g = ${amount(perKg * w * 5)} mL of 20% albumin or ${amount(perKg * w * 4)} mL of 25% albumin` })),
  { id: "protein_target", name: "protein target", page: "em_he", row: null,
    tag: "Target, not a dose", label: "Protein 1.2–1.5 g/kg/day", value: w => `${amount(1.2 * w)}–${amount(1.5 * w)} g/day` }
];

export const findDose = id => DOSES.find(d => d.id === id);

// Full line for a weight, or null when the weight is blank or outside 20–350 kg.
export function doseLine(id, w) {
  const d = findDose(id);
  if (!d) throw new Error(`Unknown dose ${id}`);
  if (!validWeight(w)) return null;
  return `${d.tag ? d.tag + ". " : ""}${d.label}: ${d.value(w)}`;
}

// Parse the weight field text ("72,5" accepted). Returns { weight, error }.
export function parseWeight(text) {
  const s = String(text ?? "").trim();
  if (!s) return { weight: null, error: null };
  const n = Number(s.replace(",", "."));
  if (!Number.isFinite(n)) return { weight: null, error: "Enter a number" };
  if (!validWeight(n)) return { weight: null, error: WEIGHT_RANGE_MESSAGE };
  return { weight: n, error: null };
}
