// SPEC.md B3.19 Baveno VIII non-invasive portal hypertension. The old id baveno7 redirects here (js/registry.js).
import { ref } from "../../refs.js";
import { fmt, isNum } from "../../num.js";

export const ETIOLOGIES = [
  { label: "Viral", value: "viral" },
  { label: "Alcohol", value: "alcohol" },
  { label: "MASLD", value: "masld" },
  { label: "Other", value: "other" }
];

export const TEXT = {
  cacldOut: "cACLD ruled out; negligible 3-year risk of decompensation.",
  psvd: "LSM <10 kPa with clinical or imaging signs of portal hypertension: suspect vascular liver disease (porto-sinusoidal vascular disorder, PSVD).",
  suggestive: "Suggestive of cACLD.",
  highly: "Highly suggestive of cACLD.",
  repeatFasting: "Repeat fasting LSM to confirm.",
  csphIn: "CSPH ruled in.",
  csphOut: "CSPH ruled out; repeat LSM in 12 months.",
  indeterminate: "CSPH indeterminate: repeat non-invasive tests in 12 months or add SSM.",
  obese: "Obese MASLD: the LSM rule for CSPH does not apply; use ANTICIPATE-NASH or NICER (probability 75% or more), not built in.",
  treat: "Start a non-selective beta-blocker, preferably carvedilol.",
  endoAlways: "Screening endoscopy only if not eligible for carvedilol or a non-selective beta-blocker; patients on these drugs do not need screening endoscopy.",
  endoAvoid: "If not eligible: screening endoscopy can be avoided (LSM <20 kPa and platelets ≥150, Baveno VI criteria; or SSM <40 kPa).",
  endoNeeded: "Not eligible: screening endoscopy. No varices: repeat upper endoscopy in 2 years (active etiology) or 3 years (etiology removed or suppressed).",
  ruleOfFive: "Rule of five: LSM 10, 15, 20, 25 kPa = progressively higher risk of decompensation and liver-related death.",
  repeatYearly: "Repeat non-invasive tests every 12 months in cACLD; the most recent value guides decisions.",
  stages: "Stages of cirrhosis (Baveno VIII): compensated without or with CSPH; decompensated (overt ascites, variceal bleeding, overt HE grade 2 or more); further decompensation; recompensation (etiology cured, controlled or suppressed; no ascites off diuretics; no overt HE off prophylaxis; no variceal rebleeding; for 6 months or more; Child-Pugh A5/A6)."
};

// v: { lsm, etiology, plt?, ssm?, obese?, eligible? ("yes" | "no") }
export function baveno8(v) {
  const obeseMasld = v.etiology === "masld" && !!v.obese;
  const lsmRuleApplies = ["viral", "alcohol"].includes(v.etiology) || (v.etiology === "masld" && !obeseMasld);
  const inByLsm = lsmRuleApplies && v.lsm >= 25;
  const inBySsm = isNum(v.ssm) && v.ssm > 55;
  const outRule = isNum(v.plt) && v.lsm <= 15 && v.plt >= 150;
  const csph = inByLsm || inBySsm ? "in" : outRule ? "out" : "indeterminate";
  const cacld = v.lsm < 10 ? "out" : v.lsm <= 15 ? "suggestive" : "highly";
  const avoidable = (isNum(v.plt) && v.lsm < 20 && v.plt >= 150) || (isNum(v.ssm) && v.ssm < 40);
  const reached = [25, 20, 15, 10].find(t => v.lsm >= t) || null;
  return { csph, cacld, inByLsm, inBySsm, outRule, obeseMasld, lsmRuleApplies, avoidable, reached };
}

const BAND = { in: "CSPH ruled in", out: "CSPH ruled out", indeterminate: "CSPH indeterminate" };
const LEVEL = { in: "high", out: "low", indeterminate: "intermediate" };
const CACLD_TEXT = { out: TEXT.cacldOut, suggestive: TEXT.suggestive, highly: TEXT.highly };

export default {
  id: "baveno8",
  name: "Baveno VIII non-invasive portal hypertension",
  short: "Baveno VIII",
  aliases: ["Baveno VIII", "Baveno", "CSPH", "portal hypertension", "cACLD", "varices screening", "LSM", "spleen stiffness", "SSM"],
  category: "liver",
  use: "Liver stiffness (VCTE), etiology, and optionally platelets and spleen stiffness.",
  inputs: [
    { id: "lsm", label: "Liver stiffness LSM (VCTE)", type: "number", unit: "kPa", min: 1, max: 80 },
    { id: "etiology", label: "Etiology", type: "radio", options: ETIOLOGIES },
    { id: "obese", label: "BMI 30 or more", type: "checkbox", showIf: v => v.etiology === "masld" },
    { id: "plt", label: "Platelets", type: "number", analyte: "platelets", base: "si", min: 0, max: 2000, optional: true },
    { id: "ssm", label: "Spleen stiffness SSM (100 Hz VCTE)", type: "number", unit: "kPa", min: 1, max: 100, optional: true },
    { id: "eligible", label: "Eligible for carvedilol or a non-selective beta-blocker", type: "radio", optional: true,
      options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }] }
  ],
  compute(v) {
    const b = baveno8(v);
    const yn = x => (x ? "Yes" : "No");
    return { score: v.lsm, ...b, eligible: v.eligible, display: [`LSM ${fmt(v.lsm, 1)} kPa: ${CACLD_TEXT[b.cacld].replace(/[;.].*$/, "")}`, BAND[b.csph]],
      label: "Baveno VIII", rounding: "Rules applied to the values as entered.",
      breakdown: [
        { item: "CSPH ruled in by LSM ≥25 kPa (viral, alcohol, MASLD without BMI ≥30)", value: b.lsmRuleApplies ? yn(b.inByLsm) : "Not applicable" },
        { item: "CSPH ruled in by SSM >55 kPa", value: isNum(v.ssm) ? yn(b.inBySsm) : "Needs SSM" },
        { item: "CSPH ruled out: LSM ≤15 kPa and platelets ≥150", value: isNum(v.plt) ? yn(b.outRule) : "Needs platelets" },
        { item: "Screening endoscopy avoidable: LSM <20 kPa and platelets ≥150, or SSM <40 kPa", value: yn(b.avoidable) }
      ] };
  },
  interpret(r) {
    const cacldLines = [CACLD_TEXT[r.cacld]];
    if (r.cacld === "out") cacldLines.push(TEXT.psvd); else cacldLines.push(TEXT.repeatFasting);
    const csphLines = [{ in: TEXT.csphIn, out: TEXT.csphOut, indeterminate: TEXT.indeterminate }[r.csph]];
    if (r.obeseMasld) csphLines.push(TEXT.obese);
    const endo = [TEXT.endoAlways];
    if (r.avoidable) endo.push(TEXT.endoAvoid);
    else if (r.eligible === "no") endo.push(TEXT.endoNeeded);
    const sections = [
      { title: "cACLD", lines: cacldLines },
      { title: BAND[r.csph], level: LEVEL[r.csph], lines: csphLines },
      { title: "Screening endoscopy", lines: endo },
      { title: "Rule of five", lines: [TEXT.ruleOfFive, r.reached ? `This LSM: ≥${r.reached} kPa.` : "This LSM: below 10 kPa."] }
    ];
    return { band: BAND[r.csph], level: LEVEL[r.csph], sections,
      action: r.csph === "in" ? TEXT.treat : undefined,
      notes: [TEXT.repeatYearly, TEXT.stages],
      copy: `Baveno VIII (LSM ${fmt(r.score, 1)} kPa): ${CACLD_TEXT[r.cacld].replace(/[;.].*$/, "")}; ${BAND[r.csph]}` };
  },
  references: [ref("Baveno VIII Faculty. Baveno VIII - Advancing consensus in portal hypertension. J Hepatol 2026;85:993-1018. PMID 42624290", "https://pubmed.ncbi.nlm.nih.gov/42624290/")]
};
