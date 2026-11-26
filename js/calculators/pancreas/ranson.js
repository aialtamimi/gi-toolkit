// SPEC.md B4.2 Ranson criteria (non-gallstone and gallstone)
import { ref } from "../../refs.js";
import { INTEGER_NOTE, isNum } from "../../num.js";
import { MONITORING_NOTE } from "./bisap.js";
import { asEntered } from "../../units.js";

// Cutoffs exactly as SPEC.md B4.2. Where the spec gives a cutoff in both units (glucose,
// BUN rise, calcium), the cutoff for the unit entered is applied with no conversion.
// `u(id)` returns { value, system } as entered.
const by = (e, si, conv) => (e.system === "si" ? si(e.value) : conv(e.value));
export const CRITERIA = {
  non: {
    admission: [
      { id: "age", item: "Age >55 years", met: v => v.age > 55 },
      { id: "wbc", item: "WBC >16 ×10⁹/L", met: v => v.wbc > 16 },
      { id: "glucose", item: "Glucose >200 mg/dL (>11.1 mmol/L)", met: (v, u) => by(u("glucose"), x => x > 11.1, x => x > 200) },
      { id: "ldh", item: "LDH >350 IU/L", met: v => v.ldh > 350 },
      { id: "ast", item: "AST >250 IU/L", met: v => v.ast > 250 }
    ],
    h48: [
      { id: "hctFall", item: "Hematocrit fall >10 percentage points", met: v => v.hctFall > 10 },
      { id: "bunRise", item: "BUN rise >5 mg/dL (urea >1.8 mmol/L)", met: (v, u) => by(u("bunRise"), x => x > 1.8, x => x > 5) },
      { id: "calcium", item: "Calcium <8 mg/dL (<2.0 mmol/L)", met: (v, u) => by(u("calcium"), x => x < 2.0, x => x < 8) },
      { id: "pao2", item: "PaO2 <60 mmHg", met: v => v.pao2 < 60 },
      { id: "baseDeficit", item: "Base deficit >4 mmol/L", met: v => v.baseDeficit > 4 },
      { id: "fluid", item: "Fluid sequestration >6 L", met: v => v.fluid > 6 }
    ]
  },
  gallstone: {
    admission: [
      { id: "age", item: "Age >70 years", met: v => v.age > 70 },
      { id: "wbc", item: "WBC >18 ×10⁹/L", met: v => v.wbc > 18 },
      { id: "glucose", item: "Glucose >220 mg/dL (>12.2 mmol/L)", met: (v, u) => by(u("glucose"), x => x > 12.2, x => x > 220) },
      { id: "ldh", item: "LDH >400 IU/L", met: v => v.ldh > 400 },
      { id: "ast", item: "AST >250 IU/L", met: v => v.ast > 250 }
    ],
    h48: [
      { id: "hctFall", item: "Hematocrit fall >10 percentage points", met: v => v.hctFall > 10 },
      { id: "bunRise", item: "BUN rise >2 mg/dL (urea >0.7 mmol/L)", met: (v, u) => by(u("bunRise"), x => x > 0.7, x => x > 2) },
      { id: "calcium", item: "Calcium <8 mg/dL (<2.0 mmol/L)", met: (v, u) => by(u("calcium"), x => x < 2.0, x => x < 8) },
      // PaO2: not used in the gallstone version.
      { id: "baseDeficit", item: "Base deficit >5 mmol/L", met: v => v.baseDeficit > 5 },
      { id: "fluid", item: "Fluid sequestration >4 L", met: v => v.fluid > 4 }
    ]
  }
};

export function mortality(score) {
  if (score <= 2) return "under 5%";
  if (score <= 4) return "about 15%";
  if (score <= 6) return "about 40%";
  return "near 100%";
}

const nonGallstone = v => v.type === "non";

export default {
  id: "ranson",
  name: "Ranson criteria",
  short: "Ranson",
  aliases: ["Ranson", "Ranson's criteria", "acute pancreatitis", "pancreatitis severity", "gallstone pancreatitis"],
  category: "pancreas",
  use: "Acute pancreatitis. One point per criterion; needs the 48-hour values to complete.",
  inputs: [
    { id: "type", label: "Version", type: "radio", default: "non", options: [
      { label: "Non-gallstone", value: "non" }, { label: "Gallstone", value: "gallstone" } ] },
    { type: "heading", label: "On admission" },
    { id: "age", label: "Age", type: "number", unit: "years", min: 0, max: 120 },
    { id: "wbc", label: "WBC", type: "number", analyte: "wbc", base: "si", min: 0, max: 500 },
    { id: "glucose", label: "Glucose", type: "number", analyte: "glucose", base: "conv", min: 0, max: 3000 },
    { id: "ldh", label: "LDH", type: "number", unit: "IU/L", min: 0, max: 100000 },
    { id: "ast", label: "AST", type: "number", unit: "IU/L", min: 0, max: 100000 },
    { type: "heading", label: "At 48 hours (leave blank until available)" },
    { id: "hctFall", label: "Hematocrit fall since admission", type: "number", unit: "percentage points", min: -100, max: 100, optional: true },
    { id: "bunRise", label: "BUN / urea rise since admission", type: "number", analyte: "urea", base: "conv", min: -400, max: 400, optional: true,
      help: "Enter the rise (48-hour value minus admission value)." },
    { id: "calcium", label: "Calcium", type: "number", analyte: "calcium", base: "conv", min: 0, max: 30, optional: true },
    { id: "pao2", label: "PaO2", type: "number", unit: "mmHg", min: 0, max: 800, optional: true, showIf: nonGallstone },
    { id: "baseDeficit", label: "Base deficit", type: "number", unit: "mmol/L", min: -50, max: 50, optional: true },
    { id: "fluid", label: "Fluid sequestration", type: "number", unit: "L", min: 0, max: 50, optional: true }
  ],
  compute(v, ctx) {
    const set = CRITERIA[v.type];
    const base = { glucose: "conv", bunRise: "conv", calcium: "conv" };
    const u = id => asEntered(ctx, id, v[id], base[id]);
    const breakdown = [];
    let admission = 0, h48 = 0;
    for (const c of set.admission) {
      const p = c.met(v, u) ? 1 : 0;
      admission += p;
      breakdown.push({ item: `Admission: ${c.item}`, points: p });
    }
    const pending = [];
    for (const c of set.h48) {
      if (!isNum(v[c.id])) { pending.push(c.item); breakdown.push({ item: `48 h: ${c.item}`, value: "pending" }); continue; }
      const p = c.met(v, u) ? 1 : 0;
      h48 += p;
      breakdown.push({ item: `48 h: ${c.item}`, points: p });
    }
    const score = admission + h48;
    const complete = pending.length === 0;
    const details = [{ label: "Admission score", value: String(admission) },
      { label: "48-hour score", value: complete ? String(h48) : `${h48} so far (${pending.length} pending)` }];
    return { score, admission, h48, complete, pending, type: v.type, details, breakdown,
      display: String(score), label: complete ? "Ranson" : (pending.length === set.h48.length ? "Ranson at admission" : "Ranson (incomplete)"),
      rounding: INTEGER_NOTE };
  },
  interpret(r) {
    const version = r.type === "non" ? "non-gallstone" : "gallstone";
    const notes = [MONITORING_NOTE, "Commonly cited mortality: 0–2 under 5%; 3–4 about 15%; 5–6 about 40%; ≥7 near 100%."];
    const sections = [];
    if (!r.complete) sections.push({ title: "48-hour items pending", lines: r.pending });
    const severe = r.score >= 3;
    let band, level, text;
    if (severe) {
      band = "Severe pancreatitis"; level = "high";
      text = "≥3 = severe pancreatitis.";
    } else if (r.complete) {
      band = "Score below 3"; level = "low";
      text = "≥3 = severe pancreatitis; this score is below 3.";
    } else {
      band = "Incomplete: 48-hour items pending"; level = "neutral";
      text = "≥3 = severe pancreatitis. The score can only rise as 48-hour items are added.";
    }
    if (r.complete) text += ` Commonly cited mortality for ${r.score}: ${mortality(r.score)}.`;
    const copy = r.complete
      ? `Ranson (${version}) ${r.score}${severe ? ", severe pancreatitis" : ""}`
      : `Ranson (${version}) ${r.score} at admission${r.h48 ? ` plus ${r.h48} at 48 h so far` : ""}, 48-hour items pending${severe ? ", severe pancreatitis" : ""}`;
    return { band, level, text, sections, notes, copy };
  },
  notes: "Glucose, BUN rise and calcium are compared with the cutoff written for the unit entered (mg/dL or mmol/L), with no conversion.",
  references: [
    ref("Ranson JH et al. Prognostic signs and the role of operative management in acute pancreatitis. Surg Gynecol Obstet 1974"),
    ref("Ranson JH. Etiological and prognostic factors in human acute pancreatitis: a review. Am J Gastroenterol 1982"),
    ref("Tenner S et al. ACG guideline: management of acute pancreatitis 2024", "https://guidelinecentral.com/guideline/12896")
  ]
};
