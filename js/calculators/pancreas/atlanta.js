// SPEC.md B4.6 Revised Atlanta classification
import { ref } from "../../refs.js";
import { MONITORING_NOTE } from "./bisap.js";

export const COLLECTIONS = {
  interstitial: { early: "Acute peripancreatic fluid collection (APFC)", late: "Pseudocyst" },
  necrotizing: { early: "Acute necrotic collection (ANC)", late: "Walled-off necrosis (WON)" }
};

export function severity(of, complications) {
  if (of === "persistent") return { band: "Severe", level: "high", text: "Persistent organ failure (>48 hours), single or multiple." };
  if (of === "transient" || complications) return { band: "Moderately severe", level: "intermediate",
    text: "Transient organ failure (resolves within 48 hours) and/or local or systemic complications without persistent organ failure." };
  return { band: "Mild", level: "low", text: "No organ failure; no local or systemic complications." };
}

const hasCollection = v => v.morph === "interstitial" || v.morph === "necrotizing";

export default {
  id: "atlanta",
  name: "Revised Atlanta classification",
  short: "Revised Atlanta",
  aliases: ["Atlanta", "Revised Atlanta", "acute pancreatitis", "pancreatitis severity", "pseudocyst", "walled-off necrosis", "WON", "APFC", "ANC"],
  category: "pancreas",
  use: "Diagnosis, severity and local collection name in acute pancreatitis.",
  inputs: [
    { type: "heading", label: "Diagnosis (needs 2 of 3)" },
    { id: "pain", label: "Typical abdominal pain", type: "checkbox" },
    { id: "enzymes", label: "Lipase or amylase >3 × upper limit of normal", type: "checkbox" },
    { id: "imaging", label: "Characteristic imaging findings", type: "checkbox" },
    { type: "heading", label: "Severity" },
    { id: "of", label: "Organ failure", type: "radio", options: [
      { label: "None", value: "none" },
      { label: "Transient (resolves within 48 hours)", value: "transient" },
      { label: "Persistent (>48 hours), single or multiple", value: "persistent" } ] },
    { id: "complications", label: "Local or systemic complications", type: "checkbox" },
    { type: "heading", label: "Local collection" },
    { id: "morph", label: "Collection", type: "radio", default: "none", options: [
      { label: "No collection", value: "none" },
      { label: "Interstitial edematous pancreatitis", value: "interstitial" },
      { label: "Necrotizing pancreatitis", value: "necrotizing" } ] },
    { id: "timing", label: "Time from onset", type: "radio", showIf: hasCollection, options: [
      { label: "Under 4 weeks", value: "early" }, { label: "After 4 weeks", value: "late" } ] }
  ],
  compute(v) {
    const dx = [v.pain, v.enzymes, v.imaging].filter(Boolean).length;
    const collection = hasCollection(v) ? COLLECTIONS[v.morph][v.timing] : null;
    // A local collection is a local complication (the spec lists collections under local findings).
    const complications = !!v.complications || !!collection;
    const sev = severity(v.of, complications);
    const breakdown = [
      { item: "Diagnosis criteria met", value: `${dx} of 3` },
      { item: "Organ failure", value: { none: "None", transient: "Transient (resolves within 48 hours)", persistent: "Persistent (>48 hours)" }[v.of] },
      { item: "Local or systemic complications", value: complications ? (v.complications ? "Yes" : "Yes (local collection)") : "No" },
      { item: "Local collection", value: collection || "None" }
    ];
    const row = collection ? { morph: v.morph === "interstitial" ? "Interstitial edematous pancreatitis" : "Necrotizing pancreatitis" } : undefined;
    return { score: null, dx, sev, collection, row, breakdown, display: sev.band, label: "Severity",
      rounding: "Categorical; no rounding." };
  },
  interpret(r) {
    const dxLine = r.dx >= 2
      ? `Diagnosis of acute pancreatitis: criteria met (${r.dx} of 3).`
      : `Diagnosis of acute pancreatitis needs 2 of 3 criteria; ${r.dx} of 3 ticked.`;
    const sections = [{ title: "Diagnosis", lines: [dxLine] }];
    if (r.collection) sections.push({ title: "Local collection", lines: [r.collection] });
    return { band: r.sev.band, level: r.sev.level, text: r.sev.text, sections, notes: [MONITORING_NOTE],
      copy: `Revised Atlanta: ${r.sev.band.toLowerCase()} acute pancreatitis${r.collection ? `; ${r.collection}` : ""}` };
  },
  table: { columns: ["Local collection", "Under 4 weeks", "After 4 weeks"], rows: [
    ["Interstitial edematous pancreatitis", COLLECTIONS.interstitial.early, COLLECTIONS.interstitial.late],
    ["Necrotizing pancreatitis", COLLECTIONS.necrotizing.early, COLLECTIONS.necrotizing.late]
  ] },
  references: [ref("Banks PA et al. Classification of acute pancreatitis 2012: revision of the Atlanta classification. Gut 2013")]
};
