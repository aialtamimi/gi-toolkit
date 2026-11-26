// SPEC.md B3.3 MELD 3.0
import { ref } from "../../refs.js";
import { roundHalfUp, fmt } from "../../num.js";

export function bound(v) {
  const cr = v.dialysis ? 3.0 : Math.min(Math.max(v.cr, 1.0), 3.0);
  return {
    cr,
    bili: Math.max(v.bili, 1.0),
    inr: Math.max(v.inr, 1.0),
    na: Math.min(Math.max(v.na, 125), 137),
    alb: Math.min(Math.max(v.alb, 1.5), 3.5)
  };
}
export const survival90 = meld => 100 * Math.pow(0.946, Math.exp(0.17698 * meld - 3.56));

export default {
  id: "meld3",
  name: "MELD 3.0",
  short: "MELD 3.0",
  aliases: ["MELD 3.0", "MELD3", "MELD", "OPTN", "transplant"],
  category: "liver",
  use: "Current OPTN allocation score (since July 2023) for age 12 and older.",
  inputs: [
    { id: "sex", label: "Sex", type: "radio", options: [{ label: "Male", value: "M" }, { label: "Female", value: "F" }] },
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 },
    { id: "inr", label: "INR", type: "number", unit: "", min: 0.5, max: 20 },
    { id: "cr", label: "Creatinine", type: "number", analyte: "creatinine", base: "conv", min: 0, max: 30 },
    { id: "na", label: "Sodium", type: "number", unit: "mmol/L", min: 90, max: 180 },
    { id: "alb", label: "Albumin", type: "number", analyte: "albumin", base: "conv", min: 0, max: 7 },
    { id: "dialysis", label: "Dialysis at least twice in the past 7 days, or CVVHD for 24 hours in the past 7 days", type: "checkbox" }
  ],
  compute(v) {
    const b = bound(v);
    const lnB = Math.log(b.bili), lnI = Math.log(b.inr), lnC = Math.log(b.cr);
    const terms = [
      { item: "1.33 (if female)", value: v.sex === "F" ? 1.33 : 0 },
      { item: "4.56 × ln(Bili)", value: 4.56 * lnB },
      { item: "0.82 × (137 − Na)", value: 0.82 * (137 - b.na) },
      { item: "−0.24 × (137 − Na) × ln(Bili)", value: -0.24 * (137 - b.na) * lnB },
      { item: "9.09 × ln(INR)", value: 9.09 * lnI },
      { item: "11.14 × ln(Cr)", value: 11.14 * lnC },
      { item: "1.85 × (3.5 − Alb)", value: 1.85 * (3.5 - b.alb) },
      { item: "−1.83 × (3.5 − Alb) × ln(Cr)", value: -1.83 * (3.5 - b.alb) * lnC },
      { item: "Constant", value: 6 }
    ];
    const raw = terms.reduce((s, t) => s + t.value, 0);
    const score = Math.min(roundHalfUp(raw, 0), 40);
    const surv = survival90(score);
    return {
      score, raw, survival: surv, display: String(score), label: "MELD 3.0",
      rounding: "Rounded to the nearest whole number (round half up) and capped at 40; 90-day survival computed from the rounded score and shown to 1 decimal place.",
      details: [{ label: "Unrounded", value: fmt(raw, 2) }, { label: "Estimated 90-day survival", value: fmt(surv, 1) + "%" }],
      breakdown: [
        { item: "Values used after bounds", value: `Bili ${fmt(b.bili, 2)} mg/dL, INR ${fmt(b.inr, 2)}, Cr ${fmt(b.cr, 2)} mg/dL, Na ${fmt(b.na, 1)} mmol/L, Alb ${fmt(b.alb, 2)} g/dL` },
        ...terms.map(t => ({ item: t.item, value: fmt(t.value, 3) }))
      ]
    };
  },
  interpret(r) {
    return { band: `MELD 3.0 ${r.score}`, level: "neutral",
      text: `Estimated 90-day survival: ${fmt(r.survival, 1)}% (S90 = 100 × 0.946^exp(0.17698 × MELD 3.0 − 3.56)).`,
      notes: ["If IV albumin was given recently, interpret albumin with caution."],
      copy: `MELD 3.0 ${r.score}, est. 90-day survival ${fmt(r.survival, 1)}%` };
  },
  notes: "Bounds: bilirubin, INR and creatinine below 1.0 are set to 1.0. Creatinine above 3.0 is set to 3.0, and dialysis sets creatinine to 3.0. Sodium bounded 125–137 mmol/L. Albumin bounded 1.5–3.5 g/dL.",
  references: [
    ref("Kim WR et al. Gastroenterology 2021; OPTN", "https://optn.transplant.hrsa.gov/media/uq4bmlan/liver_meld_peld_1a_1b_presentation_winter-2022-pc.pdf")
  ]
};
