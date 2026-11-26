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
    if (isStep(b)) return [b.chip, b.title, ...b.items, ...(b.options || []).map(o => `${o.value}: ${o.text}`), b.why || ""].join("\n");
    return [b.title || "", b.text, b.why || ""].join(" ");
  }).join("\n");
}
