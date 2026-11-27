// Path logic for the bedside algorithm pages (SPEC.md B7.0; test vectors B8.8). No DOM here.
// Answers are a plain object { D1: "Yes", ... } held in memory by the page; nothing is stored.

export const isStep = b => b.type === "step" || b.type === "decision";

export function steps(page) {
  return page.blocks.filter(isStep);
}

// State of every step: "always" (no condition), "on" (its answer is chosen), "off" (another answer is
// chosen, or its decision is itself off the path) or "pending" (its decision is not answered yet).
// A step follows its decision: if the decision is not shown, neither is the step.
export function stepStates(page, answers = {}) {
  const state = {};
  for (const s of steps(page)) {
    if (!s.when.length) { state[s.id] = "always"; continue; }
    const each = s.when.map(([d, v]) => {
      const ds = state[d];
      if (ds === undefined) throw new Error(`${page.id}: ${s.id} depends on ${d}, which is not an earlier step`);
      if (ds === "off" || ds === "pending") return ds;
      if (answers[d] === undefined) return "pending";
      return answers[d] === v ? "on" : "off";
    });
    state[s.id] = each.includes("on") ? "on" : each.includes("pending") ? "pending" : "off";
  }
  return state;
}

export const isShown = st => st === "always" || st === "on";

// Step ids shown in the normal view, in page order.
export function shownSteps(page, answers = {}) {
  const st = stepStates(page, answers);
  return steps(page).filter(s => isShown(st[s.id])).map(s => s.id);
}

// Answers for an entry point such as "variceal" on the upper GI bleeding page.
export function entryAnswers(page, entry) {
  return entry && page.entries && page.entries[entry] ? { ...page.entries[entry] } : {};
}

// Whole page as text in display order (used by the abbreviation check).
export function pageText(page) {
  return page.blocks.map(b => {
    if (b.type === "table") return [b.title || "", ...b.columns, ...b.rows.flat()].join(" | ");
    if (isStep(b)) return [b.chip, b.title, ...b.items, ...(b.options || []).map(o => `${o.value}: ${o.text}`), ...[].concat(b.why || [])].join("\n");
    return [b.title || "", b.text, ...[].concat(b.why || [])].join(" ");
  }).join("\n");
}

// Suggested answers from built-in calculators (SPEC.md B7.0 table; test vectors B8.9). A suggestion only
// outlines a button: the clinician must still choose the answer. Each rule takes the calculator's
// { result, interp } and returns { answers: [values], note } (no answers when none is suggested).
export const SUGGESTIONS = [
  { page: "em_ugib", decision: "D2", calc: "child_pugh",
    rule: ({ result }) => {
      if (result.score >= 10 && result.score <= 13) return { answers: ["Yes"] };
      if (result.score >= 14 && result.score <= 15) return { answers: ["No"], note: "Pre-emptive TIPS not recommended (Child-Pugh >13)" };
      return { answers: [] };
    } },
  { page: "em_ugib", decision: "D3", calc: "forrest",
    rule: ({ result }) => ({ answers: ["Ia", "Ib", "IIa", "IIb"].includes(result.row.cls) ? ["High-risk stigmata"] : ["Low-risk stigmata"] }) },
  { page: "em_asuc", decision: "D1", calc: "asuc_day3",
    rule: ({ result }) => ({ answers: result.oxford || result.lindgrenPositive ? ["Yes"] : ["No"] }) },
  { page: "em_sbp", decision: "D1", calc: "ascites",
    rule: ({ result }) => {
      if (!(typeof result.pmn === "number" && result.pmn >= 250)) return { answers: [] };
      return { answers: [result.runyonCount >= 2 ? "Runyon criteria or polymicrobial culture" : "PMN 250/mm³ or more"] };
    } },
  { page: "em_cholangitis", decision: "D1", calc: "tg18_cholangitis",
    rule: ({ result }) => ({ answers: result.dx.status === "Not met" ? [] : [`Grade ${["I", "II", "III"][result.sev.grade - 1]}`] }) },
  { page: "em_lgib", decision: "D2", calc: "oakland",
    rule: ({ result }) => ({ answers: [result.score <= 8 ? "Yes" : "No"] }) },
  { page: "em_alf", decision: "D2", calc: "kings",
    rule: ({ result }) => ({ answers: result.met ? ["Yes"] : [] }) },
  { page: "em_aah", decision: "D2", calc: "lille",
    rule: ({ result }) => ({ answers: [result.score >= 0.45 ? "Yes" : "No"] }) },
  { page: "em_he", decision: "D1", calc: "west_haven",
    rule: ({ result }) => ({ answers: [["3", "4"].includes(result.row.grade) ? "Yes" : "No"] }) },
  // Clinical owner decision: suggest Yes when the unrounded CLIF-C ACLF is above 70 or there are 4 or more organ
  // failures (EASL-CLIF definitions); the clinician still judges the days of support and the transplant option.
  { page: "em_aclf", decision: "D2", calc: "clif_c_aclf",
    rule: ({ result }) => ({ answers: (isFinite(result.raw) && result.raw > 70) || result.failures >= 4 ? ["Yes"] : [] }) },
  // Zargar is a B6 table card: its "result" is the tapped row, [grade, finding].
  { page: "em_caustic", decision: "D2", calc: "zargar",
    rule: ({ result }) => {
      const g = result.row[0];
      if (["0", "1", "2a"].includes(g)) return { answers: ["0–2a"] };
      if (["2b", "3a"].includes(g)) return { answers: ["2b–3a"] };
      if (g === "3b") return { answers: ["3b"] };
      if (g === "4") return { answers: ["Grade 4 (perforation)"] };
      return { answers: [] };
    } }
];

// Suggestions for one decision, given the latest outputs of the page's calculators
// ({ [calcId]: { result, interp } | null }). Returns { answers: [values], notes: [text] }.
export function suggestions(page, decisionId, outputs = {}) {
  const answers = new Set(), notes = [];
  for (const s of SUGGESTIONS) {
    if (s.page !== page.id || s.decision !== decisionId || !outputs[s.calc]) continue;
    const r = s.rule(outputs[s.calc]);
    for (const v of r.answers) answers.add(v);
    if (r.note) notes.push(r.note);
  }
  return { answers: [...answers], notes };
}

export function suggestedAnswers(page, decisionId, outputs = {}) {
  return suggestions(page, decisionId, outputs).answers;
}
