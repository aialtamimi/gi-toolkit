// SPEC.md B3.12 Ascitic fluid analysis: SAAG and PMN
import { ref } from "../../refs.js";
import { fmt, isNum, tidy } from "../../num.js";

export default {
  id: "ascites",
  name: "Ascitic fluid analysis: SAAG and PMN",
  short: "Ascitic fluid",
  aliases: ["SAAG", "PMN", "ascitic fluid", "paracentesis", "SBP", "spontaneous bacterial peritonitis", "Runyon", "secondary peritonitis"],
  category: "liver",
  use: "SAAG, ascitic PMN count and secondary peritonitis flag. Each section calculates when its inputs are entered.",
  inputs: [
    { type: "heading", label: "SAAG" },
    { id: "salb", label: "Serum albumin (same day)", type: "number", analyte: "albumin", base: "conv", min: 0, max: 7, optional: true },
    { id: "aalb", label: "Ascitic albumin", type: "number", analyte: "albumin", base: "conv", min: 0, max: 7, optional: true },
    { id: "aprot", label: "Ascitic total protein", type: "number", analyte: "protein", base: "conv", min: 0, max: 15, optional: true },
    { type: "heading", label: "PMN count" },
    { id: "wbc", label: "Ascitic WBC", type: "number", unit: "/mm³", min: 0, max: 1000000, optional: true },
    { id: "neut", label: "Neutrophils", type: "number", unit: "%", min: 0, max: 100, optional: true },
    { id: "rbc", label: "Ascitic RBC", type: "number", unit: "/mm³", min: 0, max: 10000000, optional: true },
    { type: "heading", label: "Secondary peritonitis (Runyon criteria)" },
    { id: "aglu", label: "Ascitic glucose", type: "number", analyte: "glucose", base: "conv", min: 0, max: 2000, optional: true },
    { id: "aldh", label: "Ascitic LDH", type: "number", unit: "IU/L", min: 0, max: 100000, optional: true },
    { id: "ldhUln", label: "Serum LDH upper limit of normal", type: "number", unit: "IU/L", min: 1, max: 2000, optional: true }
  ],
  compute(v) {
    const r = { breakdown: [], details: [] };
    if (isNum(v.salb) && isNum(v.aalb)) {
      r.saag = tidy(v.salb - v.aalb);  // 3.3 − 2.2 must be 1.1, not 1.0999999999999996
      r.breakdown.push({ item: "SAAG = serum albumin − ascitic albumin (g/dL)", value: fmt(r.saag, 2) });
    }
    if (isNum(v.aprot)) r.aprot = v.aprot;
    if (isNum(v.wbc) && isNum(v.neut)) {
      const raw = v.wbc * v.neut / 100;
      r.pmnRaw = raw;
      r.bloody = isNum(v.rbc) && v.rbc > 10000;
      r.pmn = r.bloody ? raw - v.rbc / 250 : raw;
      r.breakdown.push({ item: "PMN = ascitic WBC × neutrophil fraction (/mm³)", value: fmt(raw, 0) });
      if (r.bloody) r.breakdown.push({ item: "Bloody tap (RBC >10,000/mm³): subtract RBC ÷ 250", value: "−" + fmt(v.rbc / 250, 0) },
        { item: "Corrected PMN (/mm³)", value: fmt(r.pmn, 0) });
    }
    const runyon = [];
    if (isNum(v.aprot)) runyon.push({ item: "Ascitic total protein >1 g/dL", met: v.aprot > 1 });
    if (isNum(v.aglu)) runyon.push({ item: "Glucose <50 mg/dL", met: v.aglu < 50 });
    if (isNum(v.aldh) && isNum(v.ldhUln)) runyon.push({ item: "LDH above the serum upper limit of normal", met: v.aldh > v.ldhUln });
    r.runyon = runyon;
    r.runyonCount = runyon.filter(x => x.met).length;
    runyon.forEach(x => r.breakdown.push({ item: "Runyon: " + x.item, value: x.met ? "Yes" : "No" }));
    if (isNum(r.saag)) { r.score = r.saag; r.display = fmt(r.saag, 2); r.label = "SAAG (g/dL)"; }
    else if (isNum(r.pmn)) { r.score = r.pmn; r.display = fmt(r.pmn, 0); r.label = "PMN (/mm³)"; }
    else { r.score = null; r.display = "—"; r.label = "Enter values"; }
    r.rounding = "SAAG displayed to 2 decimal places, PMN to the nearest whole cell (round half up); interpretations use unrounded values.";
    return r;
  },
  interpret(r) {
    const sections = [], copy = [];
    let band = "Enter serum and ascitic albumin, or ascitic WBC and neutrophils", level = "neutral";
    if (isNum(r.saag)) {
      const ph = r.saag >= 1.1;
      band = ph ? "Portal hypertension" : "Not portal hypertension";
      const lines = [ph ? "SAAG ≥1.1 g/dL = portal hypertension." :
        "SAAG <1.1 g/dL = not portal hypertension (peritoneal carcinomatosis, tuberculosis, pancreatic ascites, nephrotic syndrome)."];
      if (ph && isNum(r.aprot)) lines.push(r.aprot < 2.5 ? "Ascitic total protein <2.5 g/dL suggests cirrhosis." : "Ascitic total protein ≥2.5 g/dL suggests cardiac ascites or Budd-Chiari syndrome.");
      sections.push({ title: `SAAG ${fmt(r.saag, 2)} g/dL`, lines });
      copy.push(`SAAG ${fmt(r.saag, 2)}, ${band.toLowerCase()}${ph && isNum(r.aprot) ? (r.aprot < 2.5 ? ", suggests cirrhosis" : ", suggests cardiac ascites or Budd-Chiari") : ""}`);
    }
    const links = [];
    if (isNum(r.pmn)) {
      const sbp = r.pmn >= 250;
      sections.push({ title: `${r.bloody ? "Corrected PMN" : "PMN"} ${fmt(r.pmn, 0)}/mm³`, level: sbp ? "high" : undefined,
        lines: [sbp ? "PMN ≥250/mm³ = spontaneous bacterial peritonitis." : "PMN <250/mm³: below the spontaneous bacterial peritonitis threshold (≥250/mm³)."] });
      if (sbp) links.push({ label: "SBP emergency page", target: "em_sbp" });
      if (!isNum(r.saag)) band = sbp ? "Spontaneous bacterial peritonitis" : "PMN <250/mm³";
      copy.push(`${r.bloody ? "Corrected PMN" : "PMN"} ${fmt(r.pmn, 0)}, ${sbp ? "SBP" : "not SBP"}`);
    }
    if (r.runyon.length) {
      const flag = r.runyonCount >= 2;
      sections.push({ title: `Runyon criteria met: ${r.runyonCount} of ${r.runyon.length} entered`, level: flag ? "high" : undefined,
        lines: flag ? ["Consider secondary peritonitis: urgent CT abdomen and surgical review."] : ["Secondary peritonitis flag needs 2 or more criteria."] });
      if (flag) copy.push("secondary peritonitis flag");
    }
    return { band, level, sections, links, copy: copy.join("; ") || "Ascitic fluid analysis incomplete" };
  },
  notes: "In a bloody tap (RBC >10,000/mm³), subtract 1 PMN per 250 RBC.",
  references: [ref("Runyon BA et al. The serum-ascites albumin gradient is superior to the exudate-transudate concept. Ann Intern Med 1992"),
    ref("Runyon BA, Hoefs JC. Ascitic fluid analysis in the differentiation of spontaneous bacterial peritonitis from gastrointestinal tract perforation into ascitic fluid. Hepatology 1984")]
};
