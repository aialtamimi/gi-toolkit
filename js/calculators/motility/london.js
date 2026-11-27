// SPEC.md B10.3 London classification of anorectal function (checklist)
import { ref } from "../../refs.js";

const SENSATIONS = [["fcs", "First constant sensation"], ["dd", "Desire to defecate"], ["mtv", "Maximum tolerated volume"]];
const SENSE_OPTIONS = [{ label: "Normal", value: "normal" }, { label: "Above upper limit", value: "above" }, { label: "Below lower limit", value: "below" }];
const yesNo = [{ label: "Yes", value: true }, { label: "No", value: false }];
const LEVELS = ["major", "minor", "inconclusive"];

const f = (part, text, label) => ({ part, text, label });

// Findings of B10.3, part by part.
export function findings(v) {
  const out = [];
  if (v.rair === "absent") out.push(f(1, "Rectoanal areflexia", "major"));
  if (v.resting === "low" && v.squeeze === "low") out.push(f(2, "Combined anal hypotension and hypocontractility", "major"));
  else if (v.resting === "low") out.push(f(2, "Anal hypotension with normal contractility", "major"));
  else if (v.resting === "normal" && v.squeeze === "low") out.push(f(2, "Anal normotension with hypocontractility", "major"));
  else if (v.resting === "high" && v.squeeze === "low") {
    out.push({ ...f(2, "Anal hypertension", "minor"), suffix: " with low squeeze pressure: not a named London pattern; report both findings." });
  } else if (v.resting === "high") out.push(f(2, "Anal hypertension", "minor"));
  if (v.expulsion === "abnormal") {
    if (v.dyssynergia && v.propulsion) out.push(f(3, "Abnormal expulsion with dyssynergia and poor propulsion", "minor"));
    else if (v.dyssynergia) out.push(f(3, "Abnormal expulsion with dyssynergia", "minor"));
    else if (v.propulsion) out.push(f(3, "Abnormal expulsion with poor propulsion", "minor"));
    else out.push(f(3, "Abnormal expulsion with a normal pushing pattern", "inconclusive"));
  } else if (v.dyssynergia && v.propulsion) out.push(f(3, "Normal expulsion with poor propulsion and dyssynergia", "inconclusive"));
  else if (v.dyssynergia) out.push(f(3, "Normal expulsion with dyssynergia", "inconclusive"));
  else if (v.propulsion) out.push(f(3, "Normal expulsion with poor propulsion", "inconclusive"));
  const above = SENSATIONS.filter(([id]) => v[id] === "above").length;
  const below = SENSATIONS.filter(([id]) => v[id] === "below").length;
  if (above >= 2) out.push(f(4, "Rectal hyposensitivity", "major"));
  else if (above === 1) out.push(f(4, "Borderline rectal hyposensitivity", "inconclusive"));
  if (below >= 1) out.push(f(4, "Rectal hypersensitivity", "major"));
  return out;
}

const PARTS = ["Part 1: rectoanal reflexes", "Part 2: anal tone and contractility", "Part 3: rectoanal coordination", "Part 4: rectal sensation"];
const BAND = { major: "Major disorder", minor: "Minor disorder", inconclusive: "Inconclusive" };
export const fmt = x => `${x.text} (${x.label})${x.suffix || ""}`;

export default {
  id: "london",
  name: "London classification of anorectal function",
  short: "London classification",
  aliases: ["London classification", "anorectal manometry", "high-resolution anorectal manometry", "HRAM", "balloon expulsion test",
    "dyssynergia", "dyssynergic defecation", "rectoanal inhibitory reflex", "RAIR", "rectal hyposensitivity", "anal hypotension"],
  category: "motility",
  use: "Checklist; judge every input against your laboratory's own normal values.",
  inputs: [
    { type: "heading", label: "Part 1: rectoanal reflexes" },
    { id: "rair", label: "Rectoanal inhibitory reflex (RAIR)", type: "radio", options: [{ label: "Present", value: "present" }, { label: "Absent", value: "absent" }] },
    { type: "heading", label: "Part 2: anal tone and contractility" },
    { id: "resting", label: "Resting pressure", type: "radio", options: [{ label: "Low", value: "low" }, { label: "Normal", value: "normal" }, { label: "High", value: "high" }] },
    { id: "squeeze", label: "Squeeze pressure", type: "radio", options: [{ label: "Low", value: "low" }, { label: "Normal", value: "normal" }] },
    { type: "heading", label: "Part 3: rectoanal coordination" },
    { id: "expulsion", label: "Balloon expulsion", type: "radio", options: [{ label: "Normal", value: "normal" }, { label: "Abnormal", value: "abnormal" }] },
    { id: "dyssynergia", label: "During push: dyssynergia", type: "radio", options: yesNo },
    { id: "propulsion", label: "During push: poor propulsion", type: "radio", options: yesNo },
    { type: "heading", label: "Part 4: rectal sensation" },
    ...SENSATIONS.map(([id, label]) => ({ id, label, type: "radio", options: SENSE_OPTIONS }))
  ],
  compute(v) {
    const list = findings(v);
    const worst = LEVELS.find(l => list.some(x => x.label === l));
    const band = worst ? BAND[worst] : "No disorder of anorectal function";
    return { score: null, findings: list, worst: worst || null, band, display: band, label: "London classification",
      rounding: "Checklist; no calculation.",
      breakdown: PARTS.map((p, i) => ({ item: p, value: list.filter(x => x.part === i + 1).map(fmt).join("; ") || "Normal" })) };
  },
  interpret(r) {
    const level = { major: "high", minor: "intermediate", inconclusive: "neutral" }[r.worst] || "low";
    return { band: r.band, level,
      sections: PARTS.map((p, i) => ({ title: p, lines: [r.findings.filter(x => x.part === i + 1).map(fmt).join("; ") || "Normal"] })),
      copy: r.findings.length ? `London classification: ${r.findings.map(fmt).join("; ")}` : "London classification: no disorder of anorectal function" };
  },
  references: [ref("Carrington EV et al. The international anorectal physiology working group (IAPWG) recommendations: standardized testing protocol and the London classification for disorders of anorectal function. Neurogastroenterol Motil 2020. PMID 31407463", "https://pubmed.ncbi.nlm.nih.gov/31407463/")]
};
