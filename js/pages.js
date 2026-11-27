// Renders classification reference cards (SPEC.md B6) and emergency pages (SPEC.md B7).
import { h, renderCalculator, linkTo, copyText, appendAll, resultText, levelClass } from "./engine.js";
import { findItem, hrefFor } from "./registry.js";
import { stepStates, isShown, isStep, entryAnswers, suggestions } from "./algorithm.js";
import { findDose, doseLine, parseWeight, DOSES, DOSE_ROUNDING } from "./doses.js";

export const NO_SOURCE_TEXT = "No source is listed in SPEC.md for this page yet.";

// SPEC section numbers used as cross-references in emergency page text, mapped to the item they name.
export const SPEC_REFS = {
  "B2.1": "gbs", "B2.2": "aims65", "B2.4": "oakland", "B2.5": "forrest",
  "B3.5": "lille", "B3.12": "ascites", "B3.16": "west_haven", "B3.18": "kings",
  "B4.5": "marshall", "B4.6": "atlanta", "B4.8": "tg18_cholangitis",
  "B5.1": "truelove_witts", "B5.2": "asuc_day3",
  "B6.6": "zargar", "B7.4": "em_antithrombotic", "B7.6": "em_toxic_megacolon", "B7.13": "em_cholangitis"
};

// Splits text into plain strings, markdown links [label](https://...) and SPEC cross-references.
export function tokenize(text) {
  const re = /\[([^\]]+)\]\((https:\/\/[^)\s]+)\)|\b(B\d\.\d+)\b/g;
  const out = [];
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ type: "text", text: text.slice(last, m.index) });
    if (m[1]) out.push({ type: "url", label: m[1], url: m[2] });
    else out.push({ type: "ref", spec: m[3], target: SPEC_REFS[m[3]] });
    last = re.lastIndex;
  }
  if (last < text.length) out.push({ type: "text", text: text.slice(last) });
  return out;
}

function richText(text) {
  return tokenize(text).map(t => {
    if (t.type === "text") return t.text;
    if (t.type === "url") return h("a", { href: t.url, target: "_blank", rel: "noopener noreferrer" }, t.label);
    const item = t.target && findItem(t.target);
    if (!item) return t.spec;
    const name = item.short || item.name;
    return h("a", { class: "inline-link", href: hrefFor(item.id) }, item.id.startsWith("em_") ? name : `open ${name}`);
  });
}

function refList(refs) {
  return h("ul", { class: "refs" }, refs.map(r => h("li", {},
    h("a", { href: r.url, target: "_blank", rel: "noopener noreferrer" }, r.citation),
    r.searchLink ? h("span", { class: "muted" }, " (PubMed search)") : null)));
}

function table(t, opts = {}) {
  return h("div", { class: "table-scroll" },
    h("table", { class: "ref-table" + (opts.tap ? " tap-table" : "") },
      h("thead", {}, h("tr", {}, t.columns.map(c => h("th", { scope: "col" }, opts.rich ? richText(c) : c)))),
      h("tbody", {}, t.rows.map((r, i) => {
        if (!opts.tap) return h("tr", {}, r.map(c => h("td", {}, opts.rich ? richText(c) : c)));
        // Tap anywhere on the row; the first cell is a real button for keyboard and screen readers.
        const btn = h("button", { type: "button", class: "row-select", "aria-pressed": "false" }, r[0]);
        const tr = h("tr", {}, h("td", {}, btn), r.slice(1).map(c => h("td", {}, c)));
        tr.addEventListener("click", () => opts.tap(i, tr));
        return tr;
      }))));
}

// ---------- B6 reference cards ----------

export function renderCard(root, card, opts = {}) {
  if (card.inputs) return renderCalculator(root, card, opts);
  const preview = h("span", { class: "copy-preview" }, "Tap a row to select it.");
  const copyBtn = h("button", { type: "button", class: "btn btn-primary copy-btn", disabled: true, onclick: async () => {
    const ok = await copyText(preview.textContent);
    copyBtn.replaceChildren((ok ? "Copied" : "Copy failed"));
    setTimeout(() => { copyBtn.replaceChildren("Copy"); }, 1500);
  } }, "Copy");
  let tbl;
  const select = (i, tr) => {
    tbl.querySelectorAll("tbody tr").forEach(r => { r.classList.remove("selected"); r.querySelector(".row-select").setAttribute("aria-pressed", "false"); });
    tr.classList.add("selected");
    tr.querySelector(".row-select").setAttribute("aria-pressed", "true");
    preview.textContent = card.copy(card.table.rows[i]);
    copyBtn.disabled = false;
  };
  tbl = table(card.table, { tap: select });
  appendAll(root,
    tbl,
    h("div", { class: "copy-row card-copy", "aria-live": "polite" }, copyBtn, preview),
    h("p", { class: "card-use" }, card.use),
    ...(card.notes || []).map(n => h("p", { class: "note" }, n)),
    card.links && card.links.length ? h("div", { class: "links" }, card.links.map(l => linkTo(l.target, l.label))) : null,
    h("h3", {}, "Source"),
    refList(card.references));
}

// ---------- B7 emergency pages ----------

const isDosesTable = b => b.columns[1] === "Dose";

function whyLine(text) {
  return text ? h("p", { class: "why" }, h("span", { class: "why-tag" }, "Why: "), richText(text)) : null;
}

function classicBlock(b) {
  if (b.type === "section") return h("section", { class: "em-section" }, h("h3", {}, b.title), h("p", {}, richText(b.text)), whyLine(b.why));
  if (b.type === "table") {
    return h("div", { class: "em-table" }, isDosesTable(b) ? h("h3", {}, "Doses (adult doses)") : b.title ? h("h3", {}, b.title) : null, table(b, { rich: true }));
  }
  if (b.type === "note") return h("p", { class: "em-note" }, richText(b.text));
  if (b.type === "source") return h("p", { class: "em-source muted" }, "Source: ", richText(b.text));
  return null;
}

function pageEnd(page) {
  const related = page.related.map(findItem).filter(Boolean);
  return [
    related.length ? h("section", { class: "em-related" }, h("h3", {}, "Related calculators"),
      h("div", { class: "links" }, related.map(c => linkTo(c.id, c.name)))) : null,
    h("h3", {}, "Sources"),
    page.references.length ? refList(page.references) : h("p", { class: "muted" }, NO_SOURCE_TEXT)
  ];
}

export function renderEmergency(root, page, opts = {}) {
  if (page.kind === "algorithm") return renderAlgorithm(root, page, opts);
  appendAll(root, ...page.blocks.map(classicBlock), ...pageEnd(page));
}

// ---------- B7.0 bedside algorithm pages ----------

// Weight and answers live in this closure only: they are never stored and are gone when the page closes
// (Build Rule 4). opts.entry opens the page with that entry point's answers chosen (e.g. "variceal").
export function renderAlgorithm(root, page, opts = {}) {
  let weight = null;
  const answers = entryAnswers(page, opts.entry);
  let full = false;
  const doseEls = [];
  const stepEls = {};
  const stepDefs = page.blocks.filter(isStep);
  const outputs = {};   // latest result of each built-in calculator, for "Suggested" answers

  // ----- weight-based doses -----
  function doseItem(id) {
    const d = findDose(id);
    const el = h("li", { class: "dose-line" });
    doseEls.push({ d, el });
    return el;
  }
  function updateDoses() {
    for (const { d, el } of doseEls) {
      const line = doseLine(d.id, weight);
      const text = line && d.tag ? line.slice(d.tag.length + 2) : line;
      el.replaceChildren(...(line && d.tag ? [h("span", { class: "dose-tag" }, d.tag), " ", text] : [text || `${d.label}: enter weight (kg) at the top to calculate.`]));
      el.classList.toggle("dose-pending", !line);
      el.classList.toggle("dose-target", !!d.tag);
    }
  }
  const pageDoseIds = [...new Set([...stepDefs.flatMap(s => s.doses), ...DOSES.filter(d => d.page === page.id).map(d => d.id)])];

  function weightPanel() {
    const err = h("div", { class: "field-error", role: "alert" });
    const input = h("input", { id: `em-weight-${page.id}`, type: "text", inputmode: "decimal", enterkeyhint: "done", autocomplete: "off",
      oninput: e => { const p = parseWeight(e.target.value); weight = p.weight; err.textContent = p.error || ""; panel.classList.toggle("has-error", !!p.error); updateDoses(); } });
    const panel = h("section", { class: "weight-panel field field-number", "aria-label": "Weight-based doses" },
      h("label", { for: input.id }, "Weight"),
      h("div", { class: "number-row" }, input, h("span", { class: "unit" }, "kg")),
      h("div", { class: "field-help" }, "Kept on this page only and never stored. Weight-based doses calculate automatically."),
      err,
      h("ul", { class: "dose-list", "aria-live": "polite" }, pageDoseIds.map(doseItem)),
      h("p", { class: "rounding" }, "Rounding: " + DOSE_ROUNDING));
    return panel;
  }

  // ----- built-in calculators -----
  // `where` is the step id (or "redflags"): it prefixes input ids, so a calculator can appear in two places.
  function embedCalc(id, where) {
    const def = findItem(id);
    if (!def) return null;
    const status = h("span", { class: "embed-status muted" }, "Not calculated");
    const body = h("div", { class: "embed-body" });
    const onResult = out => {
      outputs[id] = out;
      if (stepEls.ready) update();
      if (!out) { status.className = "embed-status muted"; status.replaceChildren("Not calculated"); return; }
      status.className = `embed-status badge ${levelClass(out.interp.level)}`;
      const value = resultText(out.result);
      status.replaceChildren(value && value !== "—" ? `${value} · ${out.interp.band}` : out.interp.band);
    };
    const mount = () => {
      body.replaceChildren();
      renderCalculator(body, def, { embedded: true, idPrefix: `${page.id}-${where}`, hideLinks: [page.id], onReset: mount, onResult });
    };
    mount();
    return h("details", { class: "embed-calc" },
      h("summary", {}, h("span", { class: "embed-name" }, h("span", { class: "embed-tag" }, "Calculator"), def.name), status),
      body);
  }

  // ----- steps -----
  function pathTag(s) {
    if (!s.when.length) return null;
    const names = s.when.map(([d, v]) => {
      const dec = stepDefs.find(x => x.id === d);
      const o = dec && (dec.options || []).find(x => x.value === v);
      return o ? `${v} (${o.text.replace(/\.$/, "")})` : v;
    });
    return h("p", { class: "path-tag" }, h("span", { class: "path-label" }, "Path: "), names.join(" or "), h("span", { class: "path-state" }));
  }

  function choose(dec, value) {
    if (answers[dec.id] === value) delete answers[dec.id]; else answers[dec.id] = value;
    update();
  }

  function stepCard(s) {
    const isDecision = s.type === "decision";
    const answerBtns = isDecision ? s.options.map(o => {
      const b = h("button", { type: "button", class: "answer-btn", "aria-pressed": "false", onclick: () => choose(s, o.value) },
        h("span", { class: "answer-value" }, o.value), h("span", { class: "answer-text" }, o.text.replace(/\.$/, "")),
        h("span", { class: "suggested-label", hidden: true }, "Suggested"));
      b.dataset.value = o.value;
      return b;
    }) : [];
    const hint = isDecision ? h("p", { class: "answer-hint muted" }, "Choose an answer to show the next steps.") : null;
    const note = isDecision ? h("p", { class: "suggested-note", hidden: true, "aria-live": "polite" }) : null;
    const tag = pathTag(s);
    const card = h("li", { class: "algo-step" + (isDecision ? " decision" : ""), id: `step-${page.id}-${s.id}` },
      h("div", { class: "step-head" }, h("span", { class: "chip" }, s.chip), isDecision ? h("span", { class: "decision-label" }, "Decision") : null),
      h("h3", { class: "step-title" }, s.title),
      tag,
      s.items.length ? h("ul", { class: "step-items" }, s.items.map(t => h("li", {}, richText(t)))) : null,
      s.calcs.map(c => embedCalc(c, s.id)),
      s.doses.length ? h("ul", { class: "dose-list step-doses", "aria-live": "polite" }, s.doses.map(doseItem)) : null,
      isDecision ? h("div", { class: "answers", role: "group", "aria-label": s.title }, answerBtns) : null,
      note,
      hint,
      whyLine(s.why));
    stepEls[s.id] = { card, tag, answerBtns, hint, note };
    return card;
  }

  function update() {
    const st = stepStates(page, answers);
    for (const s of stepDefs) {
      const { card, tag, answerBtns, hint, note } = stepEls[s.id];
      const state = st[s.id];
      card.hidden = !full && !isShown(state);
      card.classList.toggle("on-path", state === "on");
      card.classList.toggle("off-path", state === "off");
      card.classList.toggle("pending-path", state === "pending");
      if (tag) tag.querySelector(".path-state").textContent = state === "off" ? " · off the chosen path" : state === "pending" ? " · not yet decided" : "";
      const sugg = s.type === "decision" ? suggestions(page, s.id, outputs) : { answers: [], notes: [] };
      const suggested = sugg.answers;
      if (note) { note.textContent = sugg.notes.join(" "); note.hidden = !sugg.notes.length; }
      for (const b of answerBtns) {
        b.setAttribute("aria-pressed", String(answers[s.id] === b.dataset.value));
        const sug = suggested.includes(b.dataset.value);
        b.classList.toggle("suggested", sug);
        b.querySelector(".suggested-label").hidden = !sug;
      }
      if (hint) hint.hidden = answers[s.id] !== undefined || full;
    }
    fullBtn.setAttribute("aria-pressed", String(full));
    fullBtn.replaceChildren(full ? "Show my path only" : "Show full algorithm");
  }

  const fullBtn = h("button", { type: "button", class: "btn btn-secondary full-toggle", "aria-pressed": "false", onclick: () => { full = !full; update(); } }, "Show full algorithm");
  const clearBtn = h("button", { type: "button", class: "btn btn-secondary", onclick: () => { for (const k of Object.keys(answers)) delete answers[k]; update(); } }, "Clear answers");
  const toolbar = h("div", { class: "algo-toolbar" }, h("h3", {}, "Algorithm"), h("div", { class: "algo-actions" }, fullBtn, clearBtn));

  // ----- doses table with calculated lines under weight-based rows -----
  function dosesTable(b) {
    const rows = b.rows.map(r => {
      const ids = page.weight ? DOSES.filter(d => d.page === page.id && d.row === r[0]).map(d => d.id) : [];
      return h("tr", {}, h("td", {}, richText(r[0])),
        h("td", {}, richText(r[1]), ids.length ? h("ul", { class: "dose-list table-doses" }, ids.map(doseItem)) : null));
    });
    return h("div", { class: "em-table" }, h("h3", {}, "Doses (adult doses)"),
      h("div", { class: "table-scroll" }, h("table", { class: "ref-table" },
        h("thead", {}, h("tr", {}, b.columns.map(c => h("th", { scope: "col" }, c)))),
        h("tbody", {}, rows))));
  }

  // ----- assemble in SPEC order -----
  const out = [];
  let list = null;
  for (const b of page.blocks) {
    if (isStep(b)) {
      if (!list) { list = h("ol", { class: "algo-steps" }); out.push(toolbar, list); }
      list.append(stepCard(b));
      continue;
    }
    if (b.type === "redflags") {
      out.push(h("section", { class: "red-flags", "aria-label": "Red flags" },
        h("h3", {}, "Red flags"), h("p", {}, richText(b.text)), (b.calcs || []).map(c => embedCalc(c, "redflags"))));
      if (page.weight) out.push(weightPanel());
      continue;
    }
    if (b.type === "table" && isDosesTable(b)) { out.push(dosesTable(b)); continue; }
    out.push(classicBlock(b));
  }
  appendAll(root, ...out, ...pageEnd(page));
  stepEls.ready = true;
  updateDoses();
  update();

  // Entry point: scroll to the first decision it answers (for example D1 for "variceal").
  const first = opts.entry && Object.keys(answers)[0];
  if (first && stepEls[first]) requestAnimationFrame(() => stepEls[first].card.scrollIntoView({ block: "start" }));
}
