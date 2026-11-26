// SPEC.md B3.13 R factor and Hy's law
import { ref } from "../../refs.js";
import { fmt, isNum } from "../../num.js";

export default {
  id: "r_factor",
  name: "R factor and Hy's law",
  short: "R factor",
  aliases: ["R factor", "R ratio", "Hy's law", "DILI", "drug-induced liver injury", "liver injury pattern"],
  category: "liver",
  use: "Pattern of liver injury and Hy's law flag.",
  inputs: [
    { id: "alt", label: "ALT", type: "number", unit: "IU/L", min: 0, max: 50000 },
    { id: "altUln", label: "ALT upper limit of normal", type: "number", unit: "IU/L", min: 1, max: 500 },
    { id: "alp", label: "ALP", type: "number", unit: "IU/L", min: 0.01, max: 50000 },
    { id: "alpUln", label: "ALP upper limit of normal", type: "number", unit: "IU/L", min: 1, max: 1000 },
    { type: "heading", label: "Hy's law (optional)" },
    { id: "ast", label: "AST", type: "number", unit: "IU/L", min: 0, max: 50000, optional: true },
    { id: "astUln", label: "AST upper limit of normal", type: "number", unit: "IU/L", min: 1, max: 500, optional: true },
    { id: "bili", label: "Total bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100, optional: true },
    { id: "biliUln", label: "Total bilirubin upper limit of normal", type: "number", analyte: "bilirubin", base: "conv", min: 0.01, max: 10, optional: true }
  ],
  compute(v) {
    const altX = v.alt / v.altUln, alpX = v.alp / v.alpUln;
    const score = altX / alpX;
    const r = { score, display: fmt(score, 2), label: "R",
      rounding: "Displayed to 2 decimal places (round half up); the pattern uses the unrounded value.",
      breakdown: [{ item: "ALT / ALT ULN", value: fmt(altX, 2) }, { item: "ALP / ALP ULN", value: fmt(alpX, 2) }],
      altX, alpX };
    const astX = isNum(v.ast) && isNum(v.astUln) ? v.ast / v.astUln : null;
    if (astX !== null) r.breakdown.push({ item: "AST / AST ULN", value: fmt(astX, 2) });
    if (isNum(v.bili) && isNum(v.biliUln)) {
      r.biliX = v.bili / v.biliUln;
      r.breakdown.push({ item: "Total bilirubin / ULN", value: fmt(r.biliX, 2) });
      r.hy = (altX > 3 || (astX !== null && astX > 3)) && r.biliX > 2 && alpX < 2;
    }
    return r;
  },
  interpret(r) {
    let band;
    if (r.score >= 5) band = "Hepatocellular";
    else if (r.score > 2) band = "Mixed";
    else band = "Cholestatic";
    const sections = [];
    if (r.hy === true) sections.push({ title: "Hy's law", level: "high", lines: ["Hy's law pattern: high risk of severe drug-induced liver injury."] });
    else if (r.hy === false) sections.push({ title: "Hy's law", lines: ["Hy's law criteria not met (ALT or AST >3 × ULN and total bilirubin >2 × ULN with ALP <2 × ULN)."] });
    return { band, level: "neutral", text: "R ≥5 hepatocellular; R >2 to <5 mixed; R ≤2 cholestatic.", sections,
      copy: `R factor ${fmt(r.score, 2)}, ${band.toLowerCase()}${r.hy ? "; Hy's law pattern" : ""}` };
  },
  references: [ref("Chalasani NP et al. ACG Clinical Guideline: diagnosis and management of idiosyncratic drug-induced liver injury. Am J Gastroenterol 2021")]
};
