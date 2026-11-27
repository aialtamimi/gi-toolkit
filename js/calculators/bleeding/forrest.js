// SPEC.md B2.5 Forrest classification (reference card with selection)
import { ref } from "../../refs.js";

export const ROWS = [
  { cls: "Ia", finding: "Active spurting", risk: "55% (active bleeding, Ia and Ib combined)", action: "Endoscopic therapy, then high-dose proton pump inhibitor (PPI)" },
  { cls: "Ib", finding: "Active oozing", risk: "55% (combined with Ia)", action: "Endoscopic therapy, then high-dose proton pump inhibitor (PPI)" },
  { cls: "IIa", finding: "Non-bleeding visible vessel", risk: "43%", action: "Endoscopic therapy, then high-dose proton pump inhibitor (PPI)" },
  { cls: "IIb", finding: "Adherent clot", risk: "22%", action: "Consider clot removal and treat the underlying stigma; high-dose proton pump inhibitor (PPI)" },
  { cls: "IIc", finding: "Flat pigmented spot", risk: "10%", action: "No endoscopic therapy; standard proton pump inhibitor (PPI)" },
  { cls: "III", finding: "Clean base", risk: "5%", action: "No endoscopic therapy; standard proton pump inhibitor (PPI); early feeding and discharge if otherwise stable" }
];

export default {
  id: "forrest",
  name: "Forrest classification",
  short: "Forrest",
  aliases: ["Forrest", "peptic ulcer", "ulcer stigmata", "rebleeding"],
  category: "bleeding",
  kind: "card",
  use: "Peptic ulcer stigmata at endoscopy. Tap a class to see rebleeding risk and action.",
  inputs: [
    { id: "cls", label: "Forrest class", type: "radio", style: "rows",
      options: ROWS.map(r => ({ label: `${r.cls}: ${r.finding}`, value: r.cls })) }
  ],
  compute(v) {
    const row = ROWS.find(r => r.cls === v.cls);
    return { score: null, display: `Forrest ${row.cls}`, label: "Class", row, rounding: "Selection; no calculation.",
      breakdown: [{ item: "Finding", value: row.finding }, { item: "Rebleeding risk without endoscopic therapy", value: row.risk }] };
  },
  interpret(r) {
    return {
      band: `Forrest ${r.row.cls}`, level: "neutral",
      text: `Rebleeding risk without endoscopic therapy: ${r.row.risk}`,
      action: r.row.action,
      notes: ["High-dose PPI after endoscopic hemostasis: continuous or intermittent high dose for 3 days, then twice daily to complete 2 weeks, then once daily (ACG 2021)."],
      copy: `Forrest: ${r.row.cls}`
    };
  },
  table: {
    columns: ["Class", "Finding", "Rebleeding risk without endoscopic therapy", "Action"],
    rows: ROWS.map(r => [r.cls, r.finding, r.risk, r.action])
  },
  references: [
    ref("Laine L, Peterson WL. Bleeding peptic ulcer. NEJM 1994"),
    ref("Laine L et al. ACG Clinical Guideline: Upper GI and Ulcer Bleeding. Am J Gastroenterol 2021. PMID 33929377", "https://pubmed.ncbi.nlm.nih.gov/33929377/")
  ]
};
