// SPEC.md B3.11 ALBI grade
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export default {
  id: "albi",
  name: "ALBI grade",
  short: "ALBI",
  aliases: ["ALBI", "albumin-bilirubin", "HCC", "hepatocellular carcinoma"],
  category: "liver",
  use: "Liver function in HCC.",
  inputs: [
    { id: "bili", label: "Bilirubin", type: "number", analyte: "bilirubin", base: "si", min: 0.01, max: 2000 },
    { id: "alb", label: "Albumin", type: "number", analyte: "albumin", base: "si", min: 0, max: 70 }
  ],
  compute(v) {
    const a = 0.66 * Math.log10(v.bili), b = -0.085 * v.alb;
    const score = a + b;
    return { score, display: fmt(score, 2), label: "ALBI",
      rounding: "Displayed to 2 decimal places (round half up); the grade uses the unrounded value.",
      breakdown: [{ item: "0.66 × log10(bilirubin, µmol/L)", value: fmt(a, 3) }, { item: "−0.085 × albumin (g/L)", value: fmt(b, 3) }] };
  },
  interpret(r) {
    const text = "Grade 1: ≤−2.60. Grade 2: >−2.60 to ≤−1.39. Grade 3: >−1.39.";
    const g = r.score <= -2.60 ? 1 : r.score <= -1.39 ? 2 : 3;
    return { band: `Grade ${g}`, level: "neutral", text, copy: `ALBI ${fmt(r.score, 2)}, grade ${g}` };
  },
  references: [ref("Johnson PJ et al. Assessment of liver function in patients with hepatocellular carcinoma: the ALBI grade. J Clin Oncol 2015")]
};
