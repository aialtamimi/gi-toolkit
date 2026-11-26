// SPEC.md B4.9 ASGE 2019 choledocholithiasis risk
import { ref } from "../../refs.js";

export const DILATED_MM = 6;    // Dilated common bile duct: >6 mm with gallbladder in situ.

export function risk(v) {
  const dilated = v.cbd > DILATED_MM;
  const high = [
    { item: "Common bile duct stone on ultrasound or cross-sectional imaging", met: !!v.stone },
    { item: "Clinical ascending cholangitis", met: !!v.cholangitis },
    { item: "Total bilirubin >4 mg/dL AND dilated common bile duct", met: v.bili > 4 && dilated }
  ];
  const intermediate = [
    { item: "Abnormal liver tests", met: !!v.lft },
    { item: "Age >55 years", met: v.age > 55 },
    { item: "Dilated common bile duct on imaging (>6 mm)", met: dilated }
  ];
  const level = high.some(x => x.met) ? "High" : intermediate.some(x => x.met) ? "Intermediate" : "Low";
  return { level, high, intermediate, dilated };
}

export const ACTIONS = {
  High: "Proceed to ERCP",
  Intermediate: "EUS, MRCP, laparoscopic intraoperative cholangiography or intraoperative ultrasound",
  Low: "Cholecystectomy with or without intraoperative cholangiography"
};

export default {
  id: "asge_cbd",
  name: "ASGE 2019 choledocholithiasis risk",
  short: "ASGE CBD stone risk",
  aliases: ["ASGE", "choledocholithiasis", "CBD stone", "common bile duct stone", "ERCP", "Buxbaum"],
  category: "pancreas",
  use: "Risk of common bile duct stones in symptomatic cholelithiasis (any one criterion places the patient in that risk group).",
  inputs: [
    { type: "heading", label: "High-risk criteria" },
    { id: "stone", label: "Common bile duct stone on ultrasound or cross-sectional imaging", type: "checkbox" },
    { id: "cholangitis", label: "Clinical ascending cholangitis", type: "checkbox" },
    { id: "bili", label: "Total bilirubin", type: "number", analyte: "bilirubin", base: "conv", min: 0, max: 100 },
    { id: "cbd", label: "Common bile duct diameter (gallbladder in situ)", type: "number", unit: "mm", min: 0, max: 50 },
    { type: "heading", label: "Intermediate-risk criteria" },
    { id: "lft", label: "Abnormal liver tests", type: "checkbox" },
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 }
  ],
  compute(v) {
    const r = risk(v);
    const yn = b => (b ? "Yes" : "No");
    const breakdown = [...r.high.map(x => ({ item: `High: ${x.item}`, value: yn(x.met) })),
      ...r.intermediate.map(x => ({ item: `Intermediate: ${x.item}`, value: yn(x.met) }))];
    return { score: null, ...r, row: { risk: r.level }, breakdown, display: `${r.level} risk`, label: "ASGE 2019",
      rounding: "Categorical; no rounding. Bilirubin is compared in mg/dL, the unit of the original criteria." };
  },
  interpret(r) {
    const lvl = { High: "high", Intermediate: "intermediate", Low: "low" }[r.level];
    const met = (r.level === "High" ? r.high : r.intermediate).filter(x => x.met).map(x => x.item);
    return { band: `${r.level} risk`, level: lvl,
      text: r.level === "Low" ? "No predictors." : `Criteria met: ${met.join("; ")}.`,
      action: ACTIONS[r.level],
      notes: ["Dilated common bile duct: >6 mm with gallbladder in situ."],
      copy: `ASGE 2019 choledocholithiasis: ${r.level.toLowerCase()} risk` };
  },
  table: { columns: ["Risk", "Criteria (any one)", "Action"], rows: [
    ["High", "Common bile duct stone on ultrasound or cross-sectional imaging; OR clinical ascending cholangitis; OR total bilirubin >4 mg/dL AND dilated common bile duct", ACTIONS.High],
    ["Intermediate", "Abnormal liver tests; OR age >55 years; OR dilated common bile duct on imaging", ACTIONS.Intermediate],
    ["Low", "No predictors", ACTIONS.Low]
  ] },
  references: [ref("Buxbaum JL et al. ASGE guideline on the role of endoscopy in the evaluation and management of choledocholithiasis. Gastrointest Endosc 2019 (criteria table)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8594622/table/T17")]
};
