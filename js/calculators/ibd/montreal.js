// SPEC.md B5.9 Montreal classification (selectable card)
import { ref } from "../../refs.js";

const cd = v => v.disease === "cd";
const uc = v => v.disease === "uc";

export const CD = {
  age: [["A1", "A1: ≤16 years"], ["A2", "A2: 17–40 years"], ["A3", "A3: >40 years"]],
  location: [["L1", "L1: Terminal ileum"], ["L2", "L2: Colon"], ["L3", "L3: Ileocolon"]],
  behavior: [["B1", "B1: Non-stricturing, non-penetrating"], ["B2", "B2: Stricturing"], ["B3", "B3: Penetrating"]]
};
export const UC = {
  extent: [["E1", "E1: Proctitis (distal to the rectosigmoid junction)"], ["E2", "E2: Left-sided (distal to the splenic flexure)"],
    ["E3", "E3: Extensive (proximal to the splenic flexure)"]],
  severity: [["S0", "S0: Remission"], ["S1", "S1: Mild (≤4 stools/day, no systemic illness, normal inflammatory markers)"],
    ["S2", "S2: Moderate (>4 stools/day, minimal systemic toxicity)"],
    ["S3", "S3: Severe (≥6 bloody stools/day, pulse ≥90, temperature ≥37.5 °C, hemoglobin <10.5 g/dL, ESR ≥30)"]]
};
const radio = (id, label, list, showIf) => ({ id, label, type: "radio", showIf, options: list.map(([value, l]) => ({ label: l, value })) });

export function code(v) {
  if (v.disease === "cd") return `${v.age} ${v.location}${v.l4 ? "+L4" : ""} ${v.behavior}${v.perianal ? "p" : ""}`;
  return `${v.extent} ${v.severity}`;
}

export default {
  id: "montreal",
  name: "Montreal classification",
  short: "Montreal",
  aliases: ["Montreal", "Montreal classification", "Crohn's phenotype", "ulcerative colitis extent", "IBD classification", "Crohn disease", "UC", "CD"],
  category: "ibd",
  kind: "card",
  use: "Phenotype of Crohn's disease or ulcerative colitis. Output is a code such as \"A2 L3 B1p\" or \"E2 S2\".",
  inputs: [
    { id: "disease", label: "Disease", type: "radio", options: [{ label: "Crohn's disease", value: "cd" }, { label: "Ulcerative colitis", value: "uc" }] },
    radio("age", "Age at diagnosis (A)", CD.age, cd),
    radio("location", "Location (L)", CD.location, cd),
    { id: "l4", label: "L4: Isolated upper GI (added as modifier to L1–L3)", type: "checkbox", showIf: cd },
    radio("behavior", "Behavior (B)", CD.behavior, cd),
    { id: "perianal", label: "p: Perianal disease modifier", type: "checkbox", showIf: cd },
    radio("extent", "Extent (E)", UC.extent, uc),
    radio("severity", "Severity (S)", UC.severity, uc)
  ],
  compute(v) {
    const c = code(v);
    const find = (list, val) => list.find(([x]) => x === val)[1];
    const breakdown = v.disease === "cd"
      ? [{ item: "Age at diagnosis", value: find(CD.age, v.age) }, { item: "Location", value: find(CD.location, v.location) + (v.l4 ? "; L4: isolated upper GI modifier" : "") },
        { item: "Behavior", value: find(CD.behavior, v.behavior) + (v.perianal ? "; p: perianal disease" : "") }]
      : [{ item: "Extent", value: find(UC.extent, v.extent) }, { item: "Severity", value: find(UC.severity, v.severity) }];
    return { score: null, code: c, breakdown, display: c, label: v.disease === "cd" ? "Montreal (Crohn's disease)" : "Montreal (ulcerative colitis)",
      rounding: "Selection; no calculation." };
  },
  interpret(r) {
    return { band: r.code, level: "neutral", copy: `Montreal: ${r.code}` };
  },
  table: { columns: ["Item", "Options"], rows: [
    ["Crohn's disease: age at diagnosis (A)", "A1 ≤16 years; A2 17–40; A3 >40"],
    ["Crohn's disease: location (L)", "L1 terminal ileum; L2 colon; L3 ileocolon; L4 isolated upper GI (added as modifier to L1–L3)"],
    ["Crohn's disease: behavior (B)", "B1 non-stricturing, non-penetrating; B2 stricturing; B3 penetrating; p = perianal disease modifier"],
    ["Ulcerative colitis: extent (E)", "E1 proctitis (distal to the rectosigmoid junction); E2 left-sided (distal to the splenic flexure); E3 extensive (proximal to the splenic flexure)"],
    ["Ulcerative colitis: severity (S)", "S0 remission; S1 mild (≤4 stools/day, no systemic illness, normal inflammatory markers); S2 moderate (>4 stools/day, minimal systemic toxicity); S3 severe (≥6 bloody stools/day, pulse ≥90, temperature ≥37.5 °C, hemoglobin <10.5 g/dL, ESR ≥30)"]
  ] },
  references: [ref("Silverberg MS et al. Toward an integrated clinical, molecular and serological classification of inflammatory bowel disease: report of a Working Party of the 2005 Montreal World Congress of Gastroenterology. Can J Gastroenterol 2005")]
};
