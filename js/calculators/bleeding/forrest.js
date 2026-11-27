// SPEC.md B2.5 Forrest classification (reference card with selection)
import { ref } from "../../refs.js";

export const ROWS = [
  { cls: "Ia", image: "img/forrest/forrest-ia.svg", alt: "Schematic of a round ulcer with a red arterial jet spurting from one point in the base, with droplets.", finding: "Active spurting", risk: "55% (active bleeding, Ia and Ib combined)", action: "Endoscopic therapy, then high-dose proton pump inhibitor (PPI)" },
  { cls: "Ib", image: "img/forrest/forrest-ib.svg", alt: "Schematic of a round ulcer with red blood oozing from the base and trickling over the rim, without a jet.", finding: "Active oozing", risk: "55% (combined with Ia)", action: "Endoscopic therapy, then high-dose proton pump inhibitor (PPI)" },
  { cls: "IIa", image: "img/forrest/forrest-iia.svg", alt: "Schematic of a round ulcer with a raised red-purple dome (non-bleeding visible vessel) in the base, without blood.", finding: "Non-bleeding visible vessel", risk: "43%", action: "Endoscopic therapy, then high-dose proton pump inhibitor (PPI)" },
  { cls: "IIb", image: "img/forrest/forrest-iib.svg", alt: "Schematic of a round ulcer with an irregular dark red-maroon clot covering part of the base.", finding: "Adherent clot", risk: "22%", action: "Consider clot removal and treat the underlying stigma; high-dose proton pump inhibitor (PPI)" },
  { cls: "IIc", image: "img/forrest/forrest-iic.svg", alt: "Schematic of a round ulcer with two flat brown-black spots on the base, nothing raised.", finding: "Flat pigmented spot", risk: "10%", action: "No endoscopic therapy; standard proton pump inhibitor (PPI)" },
  { cls: "III", image: "img/forrest/forrest-iii.svg", alt: "Schematic of a round ulcer with a clean pale yellow-white fibrin base.", finding: "Clean base", risk: "5%", action: "No endoscopic therapy; standard proton pump inhibitor (PPI); early feeding and discharge if otherwise stable" }
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
      options: ROWS.map(r => ({ label: `${r.cls}: ${r.finding}`, value: r.cls, image: { src: r.image, alt: r.alt } })) }
  ],
  compute(v) {
    const row = ROWS.find(r => r.cls === v.cls);
    return { score: null, display: `Forrest ${row.cls}`, label: "Class", row, rounding: "Selection; no calculation.",
      breakdown: [{ item: "Finding", value: row.finding }, { item: "Rebleeding risk without endoscopic therapy", value: row.risk }] };
  },
  interpret(r) {
    return {
      band: `Forrest ${r.row.cls}`, level: "neutral",
      figure: { src: r.row.image, alt: r.row.alt, caption: `Forrest ${r.row.cls}: ${r.row.finding}. Schematic, not to scale.` },
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
