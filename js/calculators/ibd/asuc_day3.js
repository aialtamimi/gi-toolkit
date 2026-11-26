// SPEC.md B5.2 Day-3 response in acute severe UC: Oxford and Lindgren
import { ref } from "../../refs.js";
import { fmt } from "../../num.js";

export const oxford = (stools, crp) => stools > 8 || (stools >= 3 && stools <= 8 && crp > 45);
export const lindgrenIndex = (stools, crp) => stools + 0.14 * crp;

const ACTION = "Corticosteroid non-response: start rescue therapy (infliximab or ciclosporin) and involve the colorectal surgeon now.";

export default {
  id: "asuc_day3",
  name: "Day-3 response in acute severe UC: Oxford and Lindgren",
  short: "ASUC day 3",
  aliases: ["Oxford criteria", "Travis criteria", "Lindgren", "Swedish index", "ASUC", "acute severe ulcerative colitis", "steroid failure", "rescue therapy"],
  category: "ibd",
  use: "Inputs on day 3 of IV corticosteroids.",
  inputs: [
    { id: "stools", label: "Stool frequency on day 3", type: "number", unit: "per 24 h", min: 0, max: 50, integer: true },
    { id: "crp", label: "CRP on day 3", type: "number", unit: "mg/L", min: 0, max: 1000 }
  ],
  compute(v) {
    const ox = oxford(v.stools, v.crp);
    const lin = lindgrenIndex(v.stools, v.crp);
    const linPos = lin > 8;
    const breakdown = [
      { item: "Oxford: stool frequency >8, OR 3–8 with CRP >45 mg/L", value: ox ? "Positive" : "Negative" },
      { item: "Lindgren index = stool frequency + 0.14 × CRP", value: fmt(lin, 2) },
      { item: "Lindgren index >8", value: linPos ? "Positive" : "Negative" }
    ];
    return { score: lin, oxford: ox, lindgren: lin, lindgrenPositive: linPos, breakdown,
      display: `Oxford ${ox ? "positive" : "negative"}; Lindgren ${fmt(lin, 2)}`, label: "Day 3",
      rounding: "Lindgren index displayed to 2 decimal places (round half up); the >8 cutoff uses the unrounded value." };
  },
  interpret(r) {
    const any = r.oxford || r.lindgrenPositive;
    const sections = [
      { title: `Oxford (Travis): ${r.oxford ? "positive" : "negative"}`, level: r.oxford ? "high" : "low",
        lines: [r.oxford ? "About 85% need colectomy on that admission." : "Stool frequency >8, or 3–8 with CRP >45 mg/L, not met."] },
      { title: `Lindgren (Swedish index) ${fmt(r.lindgren, 2)}: ${r.lindgrenPositive ? "positive" : "negative"}`, level: r.lindgrenPositive ? "high" : "low",
        lines: [r.lindgrenPositive ? "About 72% need colectomy." : "Stool frequency + 0.14 × CRP >8 not met."] }
    ];
    const band = [r.oxford ? "Oxford positive" : "Oxford negative", r.lindgrenPositive ? "Lindgren positive" : "Lindgren negative"].join("; ");
    return { band, level: any ? "high" : "low", sections, action: any ? ACTION : undefined,
      links: [{ label: "Acute severe UC emergency page", target: "em_asuc" }],
      copy: `ASUC day 3: Oxford ${r.oxford ? "positive" : "negative"}; Lindgren ${fmt(r.lindgren, 2)}, ${r.lindgrenPositive ? "positive" : "negative"}` };
  },
  references: [ref("Travis SP et al. Predicting outcome in severe ulcerative colitis. Gut 1996", "https://pubmed.ncbi.nlm.nih.gov/8984031/"),
    ref("Lindgren SC et al. Early predictors of glucocorticosteroid treatment failure in severe and moderately severe attacks of ulcerative colitis. Eur J Gastroenterol Hepatol 1998")]
};
