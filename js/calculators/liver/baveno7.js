// SPEC.md B3.19 Baveno VII non-invasive portal hypertension
import { ref } from "../../refs.js";
import { fmt, isNum } from "../../num.js";

export function baveno(lsm, plt) {
  const hasPlt = isNum(plt);
  return [
    { rule: "LSM <10 kPa", text: "Compensated advanced chronic liver disease (cACLD) ruled out (no other signs)", met: lsm < 10, key: "cacld_out" },
    { rule: "LSM 10–15 kPa", text: "Suggestive of cACLD", met: lsm >= 10 && lsm <= 15, key: "cacld_suggestive" },
    { rule: "LSM >15 kPa", text: "Highly suggestive of cACLD", met: lsm > 15, key: "cacld_high" },
    { rule: "LSM ≤15 kPa and platelets ≥150", text: "Clinically significant portal hypertension (CSPH) ruled out", met: hasPlt ? (lsm <= 15 && plt >= 150) : null, key: "csph_out" },
    { rule: "LSM ≥25 kPa", text: "CSPH ruled in (viral, alcohol and non-obese MASLD)", met: lsm >= 25, key: "csph_in" },
    { rule: "LSM <20 kPa and platelets >150", text: "Screening endoscopy for varices can be avoided (Baveno VI/VII)", met: hasPlt ? (lsm < 20 && plt > 150) : null, key: "endo_avoid" }
  ];
}

export default {
  id: "baveno7",
  name: "Baveno VII non-invasive portal hypertension",
  short: "Baveno VII",
  aliases: ["Baveno VII", "Baveno", "CSPH", "portal hypertension", "cACLD", "varices screening", "LSM"],
  category: "liver",
  use: "Liver stiffness by VCTE and platelets.",
  inputs: [
    { id: "lsm", label: "Liver stiffness (VCTE)", type: "number", unit: "kPa", min: 1, max: 80 },
    { id: "plt", label: "Platelets", type: "number", analyte: "platelets", base: "si", min: 0, max: 2000 }
  ],
  compute(v) {
    const rules = baveno(v.lsm, v.plt);
    return { score: v.lsm, rules, display: `${fmt(v.lsm, 1)} kPa`, label: "LSM",
      rounding: "Rules applied to the values as entered.",
      breakdown: rules.map(r => ({ item: r.rule, value: r.met === null ? "Needs platelets" : r.met ? "Met" : "Not met" })) };
  },
  interpret(r) {
    const met = r.rules.filter(x => x.met);
    const csphIn = met.some(x => x.key === "csph_in");
    return { band: met.map(x => x.text).join("; "), level: "neutral",
      sections: [{ title: "Rules met", lines: met.map(x => `${x.rule}: ${x.text}`) }],
      copy: `Baveno VII (LSM ${fmt(r.score, 1)} kPa): ${met.map(x => x.text).join("; ")}`,
      csphIn };
  },
  references: [ref("de Franchis R et al. Baveno VII: renewing consensus in portal hypertension. J Hepatol 2022")]
};
