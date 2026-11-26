// SPEC.md B5.6 Crohn's Disease Activity Index
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export const COMPLICATIONS = [
  ["cArthritis", "Arthritis or arthralgia"],
  ["cIritis", "Iritis or uveitis"],
  ["cSkin", "Erythema nodosum, pyoderma gangrenosum or aphthous stomatitis"],
  ["cAnal", "Anal fissure, fistula or abscess"],
  ["cFistula", "Other fistula"],
  ["cFever", "Fever >37.8 °C in the past week"]
];
const DAYS = [1, 2, 3, 4, 5, 6, 7];

export function weightTerm(weight, standard) {
  const t = 100 * (1 - weight / standard);
  return t < -10 ? -10 : t;
}

// Contiguous bands: <150 remission; 150 to <220 mild; 220–450 moderate; >450 severe.
export function band(score) {
  if (score < 150) return { band: "Remission", level: "low" };
  if (score < 220) return { band: "Mild", level: "low" };
  if (score <= 450) return { band: "Moderate", level: "intermediate" };
  return { band: "Severe", level: "high" };
}

const diary = v => v.entry === "diary";
const sums = v => v.entry === "sums";

export function sevenDaySums(v) {
  if (v.entry === "sums") return { stools: v.stoolsSum, pain: v.painSum, well: v.wellSum };
  const add = k => DAYS.reduce((s, d) => s + v[`${k}${d}`], 0);
  return { stools: add("stools"), pain: add("pain"), well: add("well") };
}

export default {
  id: "cdai",
  name: "Crohn's Disease Activity Index",
  short: "CDAI",
  aliases: ["CDAI", "Crohn's Disease Activity Index", "Best index", "Crohn's disease activity", "Crohn disease", "CD"],
  category: "ibd",
  use: "Crohn's disease activity over the past 7 days.",
  inputs: [
    { id: "entry", label: "Entry", type: "radio", default: "sums", options: [
      { label: "Direct entry of 7-day sums", value: "sums" }, { label: "7-day diary", value: "diary" } ] },
    { id: "stoolsSum", label: "Liquid or very soft stools, sum over 7 days", type: "number", unit: "stools", min: 0, max: 350, integer: true, showIf: sums },
    { id: "painSum", label: "Abdominal pain, sum of 7 daily ratings (0 none to 3 severe)", type: "number", unit: "(0–21)", min: 0, max: 21, integer: true, showIf: sums },
    { id: "wellSum", label: "General well-being, sum of 7 daily ratings (0 well to 4 terrible)", type: "number", unit: "(0–28)", min: 0, max: 28, integer: true, showIf: sums },
    ...DAYS.flatMap(d => [
      { type: "heading", label: `Diary day ${d}` },
      { id: `stools${d}`, label: `Day ${d}: liquid or very soft stools`, type: "number", unit: "stools", min: 0, max: 50, integer: true, showIf: diary },
      { id: `pain${d}`, label: `Day ${d}: abdominal pain (0 none to 3 severe)`, type: "number", unit: "(0–3)", min: 0, max: 3, integer: true, showIf: diary },
      { id: `well${d}`, label: `Day ${d}: general well-being (0 well to 4 terrible)`, type: "number", unit: "(0–4)", min: 0, max: 4, integer: true, showIf: diary }
    ]),
    { type: "heading", label: "Complications (count of categories present)" },
    ...COMPLICATIONS.map(([id, label]) => ({ id, label, type: "checkbox", points: 20 })),
    { type: "heading", label: "Other items" },
    { id: "antidiarrheal", label: "Antidiarrheal (diphenoxylate, loperamide or opiates)", type: "checkbox", points: 30 },
    { id: "mass", label: "Abdominal mass", type: "radio", options: [
      { label: "None (0)", value: 0, points: 0 }, { label: "Questionable (2)", value: 2, points: 2 }, { label: "Definite (5)", value: 5, points: 5 } ] },
    { id: "sex", label: "Sex", type: "radio", options: [{ label: "Male", value: "M" }, { label: "Female", value: "F" }] },
    { id: "hct", label: "Hematocrit", type: "number", unit: "%", min: 0, max: 100 },
    { id: "weight", label: "Body weight", type: "number", unit: "kg", min: 1, max: 400 },
    { id: "stdWeight", label: "Standard weight", type: "number", unit: "kg", min: 1, max: 400 }
  ],
  compute(v) {
    const s = sevenDaySums(v);
    const comp = COMPLICATIONS.filter(([id]) => v[id]).length;
    const hctDiff = (v.sex === "M" ? 47 : 42) - v.hct;
    const wt = weightTerm(v.weight, v.stdWeight);
    const rows = [
      [`Liquid or very soft stools (7-day sum ${s.stools}) × 2`, s.stools * 2],
      [`Abdominal pain (7-day sum ${s.pain}) × 5`, s.pain * 5],
      [`General well-being (7-day sum ${s.well}) × 7`, s.well * 7],
      [`Complications (${comp} categories) × 20`, comp * 20],
      [`Antidiarrheal (${v.antidiarrheal ? 1 : 0}) × 30`, v.antidiarrheal ? 30 : 0],
      [`Abdominal mass (${v.mass}) × 10`, v.mass * 10],
      [`Hematocrit (${v.sex === "M" ? "men: 47" : "women: 42"} − ${fmt(v.hct, 1)} = ${fmt(hctDiff, 1)}) × 6`, hctDiff * 6],
      [`Body weight: 100 × (1 − weight / standard weight)${100 * (1 - v.weight / v.stdWeight) < -10 ? ", below −10 so −10 used" : ""} × 1`, wt]
    ];
    const score = rows.reduce((t, [, p]) => t + p, 0);
    return { score, sums: s, display: fmt(score, 0), label: "CDAI",
      breakdown: rows.map(([item, p]) => ({ item, value: fmt(p, 1) })),
      rounding: "Displayed rounded to the nearest whole number (round half up); terms shown to 1 decimal place; bands use the unrounded value." };
  },
  interpret(r) {
    const b = band(r.score);
    return { ...b, text: "<150 remission; 150–219 mild; 220–450 moderate; >450 severe.",
      notes: ["Clinical response: fall of ≥100 points (≥70 in some trials)."],
      copy: `CDAI ${fmt(r.score, 0)}, ${b.band.toLowerCase()}` };
  },
  references: [ref("Best WR et al. Development of a Crohn's disease activity index. Gastroenterology 1976 (weights)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10321231/table/T2")]
};
