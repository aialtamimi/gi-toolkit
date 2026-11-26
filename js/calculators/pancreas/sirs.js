// SPEC.md B4.4 SIRS criteria
import { ref } from "../../refs.js";
import { INTEGER_NOTE, isNum } from "../../num.js";
import { MONITORING_NOTE } from "./bisap.js";

export default {
  id: "sirs",
  name: "SIRS criteria",
  short: "SIRS",
  aliases: ["SIRS", "systemic inflammatory response syndrome", "acute pancreatitis", "persistent SIRS"],
  category: "pancreas",
  use: "Two or more criteria = SIRS.",
  inputs: [
    { id: "temp", label: "Temperature", type: "number", unit: "°C", min: 25, max: 45 },
    { id: "hr", label: "Heart rate", type: "number", unit: "/min", min: 0, max: 300 },
    { id: "rr", label: "Respiratory rate", type: "number", unit: "/min", min: 0, max: 100 },
    { id: "paco2", label: "PaCO2", type: "number", unit: "mmHg", min: 0, max: 200, optional: true },
    { id: "wbc", label: "WBC", type: "number", analyte: "wbc", base: "si", min: 0, max: 500 },
    { id: "bands", label: "Bands", type: "number", unit: "%", min: 0, max: 100, optional: true }
  ],
  compute(v) {
    const breakdown = [
      { item: "Temperature >38 °C or <36 °C", points: (v.temp > 38 || v.temp < 36) ? 1 : 0 },
      { item: "Heart rate >90/min", points: v.hr > 90 ? 1 : 0 },
      { item: "Respiration: rate >20/min or PaCO2 <32 mmHg", points: (v.rr > 20 || (isNum(v.paco2) && v.paco2 < 32)) ? 1 : 0 },
      { item: "WBC >12 or <4 ×10⁹/L, or >10% bands", points: (v.wbc > 12 || v.wbc < 4 || (isNum(v.bands) && v.bands > 10)) ? 1 : 0 }
    ];
    const score = breakdown.reduce((s, b) => s + b.points, 0);
    return { score, display: `${score} of 4`, label: "SIRS criteria met", rounding: INTEGER_NOTE, breakdown };
  },
  interpret(r) {
    const notes = ["Persistent SIRS beyond 48 hours predicts organ failure and death in acute pancreatitis.", MONITORING_NOTE];
    if (r.score >= 2) return { band: "SIRS present", level: "high", text: "Two or more criteria = SIRS.", notes,
      copy: `SIRS present (${r.score} of 4 criteria)` };
    return { band: "SIRS absent", level: "low", text: "Two or more criteria = SIRS; fewer than 2 are met.", notes,
      copy: `SIRS absent (${r.score} of 4 criteria)` };
  },
  references: [
    ref("Bone RC et al. Definitions for sepsis and organ failure (ACCP/SCCM Consensus Conference). Chest 1992"),
    ref("Tenner S et al. ACG guideline: management of acute pancreatitis 2024", "https://guidelinecentral.com/guideline/12896")
  ]
};
