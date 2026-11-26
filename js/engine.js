// Renders any calculator from its definition (SPEC.md B1.4).
// compute() always receives lab values converted to the unit system named by the input's
// `base` ("si" or "conv"), i.e. the unit the original formula uses.
import { ANALYTES, convert, unitLabel } from "./units.js";
import { store } from "./storage.js";
import { EMERGENCY_INDEX, findItem, hrefFor } from "./registry.js";

// Append children, skipping null, undefined and false (Element.append would print them as text).
export function appendAll(el, ...children) {
  el.append(...children.flat().filter(c => c !== null && c !== undefined && c !== false));
  return el;
}

// ---------- pure logic (testable in Node) ----------

export function isVisible(input, values) {
  return !input.showIf || !!input.showIf(values);
}

// raw: { [id]: string | boolean | value }, units: { [id]: "si" | "conv" }
// Returns { values (base units), entered, missing: [labels], errors: [{id, message}] }
// `entered` keeps each lab value exactly as typed with its unit system ({ value, system }), for
// criteria whose spec states a cutoff in both units (compared in the unit entered, SPEC.md B4).
export function collectValues(def, raw, units = {}) {
  const values = {};
  const entered = {};
  const errors = [];
  // First pass: non-number values so showIf can depend on them.
  for (const inp of def.inputs) {
    if (!inp.id) continue;
    if (inp.type === "checkbox") values[inp.id] = !!raw[inp.id];
    else if (inp.type === "radio") {
      const v = raw[inp.id] !== undefined ? raw[inp.id] : inp.default;
      if (v !== undefined && v !== null) values[inp.id] = v;
    }
  }
  for (const inp of def.inputs) {
    if (!inp.id || inp.type !== "number") continue;
    const s = raw[inp.id];
    if (s === undefined || s === null || String(s).trim() === "") continue;
    const n = typeof s === "number" ? s : Number(String(s).trim().replace(",", "."));
    if (!Number.isFinite(n)) { errors.push({ id: inp.id, message: "Enter a number" }); continue; }
    if (inp.integer && !Number.isInteger(n)) { errors.push({ id: inp.id, message: "Enter a whole number" }); continue; }
    let base = n;
    if (inp.analyte) base = convert(inp.analyte, n, units[inp.id] || inp.base, inp.base);
    if (inp.analyte) entered[inp.id] = { value: n, system: units[inp.id] || inp.base };
    if ((inp.min !== undefined && base < inp.min) || (inp.max !== undefined && base > inp.max)) {
      const sys = units[inp.id] || inp.base;
      const lo = inp.analyte ? convert(inp.analyte, inp.min, inp.base, sys) : inp.min;
      const hi = inp.analyte ? convert(inp.analyte, inp.max, inp.base, sys) : inp.max;
      const u = inp.analyte ? unitLabel(inp.analyte, sys) : (inp.unit || "");
      errors.push({ id: inp.id, message: `Outside accepted input range ${tidy(lo)} to ${tidy(hi)} ${u}`.trim() });
      continue;
    }
    values[inp.id] = base;
  }
  // Drop hidden inputs, then list missing required ones.
  const missing = [];
  for (const inp of def.inputs) {
    if (!inp.id) continue;
    if (!isVisible(inp, values)) { delete values[inp.id]; delete entered[inp.id]; continue; }
    if (inp.type === "checkbox" || inp.optional) continue;
    if (values[inp.id] === undefined && !errors.some(e => e.id === inp.id)) missing.push(inp.label);
  }
  for (const id of Object.keys(entered)) if (values[id] === undefined) delete entered[id];
  return { values, entered, missing, errors };
}

export function run(def, values, entered = {}) {
  const result = def.compute(values, { entered });
  const interp = def.interpret(result);
  return { result, interp };
}

// Evaluate with raw entries (numbers may already be in base units if `units` omitted).
export function evaluate(def, raw, units = {}) {
  const c = collectValues(def, raw, units);
  if (c.errors.length || c.missing.length) return { ...c, result: null, interp: null };
  return { ...c, ...run(def, c.values, c.entered) };
}

function tidy(x) {
  if (!Number.isFinite(x)) return String(x);
  return String(Number(x.toPrecision(4)));
}

// ---------- DOM ----------

export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else if (k === "text") el.textContent = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c === null || c === undefined || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

const LEVEL_CLASS = { low: "lvl-low", intermediate: "lvl-int", high: "lvl-high", neutral: "lvl-neutral" };

export function linkTo(target, label) {
  if (findItem(target)) return h("a", { class: "btn btn-link", href: hrefFor(target) }, label);
  const planned = EMERGENCY_INDEX.find(e => e.id === target);
  return h("span", { class: "btn btn-link disabled", "aria-disabled": "true" }, label, " ", (planned ? "(coming in a later update)" : "(not available)"));
}

export function renderCalculator(root, def, opts = {}) {
  const raw = {};
  const units = {};
  const defaultSys = store.defaultUnits();
  for (const inp of def.inputs) {
    if (inp.analyte) units[inp.id] = store.fieldUnit(def.id, inp.id) || defaultSys;
    if (inp.type === "radio" && inp.default !== undefined) raw[inp.id] = inp.default;
  }

  const form = h("form", { class: "inputs", autocomplete: "off", onsubmit: e => e.preventDefault() });
  const fieldEls = {};
  // Inputs with `group` go into a collapsed section placed below the result (def.groups[group] = label).
  const groupEls = {};
  for (const [g, label] of Object.entries(def.groups || {})) {
    groupEls[g] = h("details", { class: "input-group" }, h("summary", {}, label),
      h("form", { class: "inputs", autocomplete: "off", onsubmit: e => e.preventDefault() }));
  }
  def.inputs.forEach((inp, i) => {
    const el = renderInput(def, inp, i, raw, units, update);
    if (inp.id) fieldEls[inp.id] = el;
    (inp.group ? groupEls[inp.group].querySelector("form") : form).append(el);
  });
  const resetBtn = h("button", { type: "button", class: "btn btn-secondary", onclick: () => opts.onReset && opts.onReset() }, "Clear inputs");
  form.append(h("div", { class: "form-actions" }, resetBtn));

  const card = h("div", { class: "result-card", id: "result", "aria-live": "polite" });
  const bar = h("button", { type: "button", class: "sticky-bar", onclick: () => card.scrollIntoView({ behavior: "smooth", block: "start" }) });

  const tableBlock = def.table ? renderTable(def.table) : null;

  const info = h("div", { class: "calc-info" },
    def.notes ? h("p", { class: "note" }, def.notes) : null,
    h("h3", {}, "References"),
    h("ul", { class: "refs" }, def.references.map(r => h("li", {},
      h("a", { href: r.url, target: "_blank", rel: "noopener noreferrer" }, r.citation),
      r.searchLink ? h("span", { class: "muted" }, " (PubMed search)") : null)))
  );

  root.append(
    h("div", { class: "calc-grid" },
      h("div", { class: "col-inputs" }, form),
      h("div", { class: "col-result" }, card, ...Object.values(groupEls), tableBlock, info)
    ),
    bar
  );

  function update() {
    const c = collectValues(def, raw, units);
    // field visibility and errors
    for (const inp of def.inputs) {
      if (!inp.id) continue;
      const el = fieldEls[inp.id];
      el.hidden = !isVisible(inp, c.values);
      const err = c.errors.find(e => e.id === inp.id);
      const errEl = el.querySelector(".field-error");
      if (errEl) errEl.textContent = err ? err.message : "";
      el.classList.toggle("has-error", !!err);
    }
    // headings: hide a heading if every following input until the next heading is hidden
    const kids = [...form.children];
    kids.forEach((k, i) => {
      if (!k.classList.contains("input-heading")) return;
      let any = false;
      for (let j = i + 1; j < kids.length && !kids[j].classList.contains("input-heading"); j++) {
        if (kids[j].classList.contains("field") && !kids[j].hidden) any = true;
      }
      k.hidden = !any;
    });
    card.replaceChildren();
    bar.replaceChildren();
    if (c.errors.length || c.missing.length) {
      const msg = c.errors.length ? "Check highlighted inputs." : `To calculate, enter: ${c.missing.join(", ")}.`;
      card.append(h("p", { class: "result-pending" }, msg));
      bar.append(h("span", { class: "bar-pending" }, c.errors.length ? "Check inputs" : `${c.missing.length} input${c.missing.length === 1 ? "" : "s"} to go`));
      if (tableBlock) highlightRow(tableBlock, null);
      return;
    }
    let out;
    try { out = run(def, c.values, c.entered); }
    catch (e) {
      card.append(h("p", { class: "result-pending" }, "Unable to calculate with these values."));
      console.error(e);
      return;
    }
    renderResult(card, def, out.result, out.interp);
    const shown = Array.isArray(out.result.display) ? out.result.display.join(" · ") : out.result.display;
    bar.append(
      h("span", { class: "bar-value" }, `${out.result.label}: ${shown}`),
      h("span", { class: `badge ${LEVEL_CLASS[out.interp.level] || "lvl-neutral"}` }, out.interp.band)
    );
    if (tableBlock && out.result.row) highlightRow(tableBlock, def.table.rows.findIndex(r => r[0] === Object.values(out.result.row)[0]));
  }

  update();
  return { update };
}

function highlightRow(block, idx) {
  block.querySelectorAll("tbody tr").forEach((tr, i) => tr.classList.toggle("selected", i === idx));
}

function renderTable(t) {
  return h("div", { class: "ref-table-wrap" },
    h("h3", {}, "Full table"),
    h("div", { class: "table-scroll" },
      h("table", { class: "ref-table" },
        h("thead", {}, h("tr", {}, t.columns.map(c => h("th", { scope: "col" }, c)))),
        h("tbody", {}, t.rows.map(r => h("tr", {}, r.map(c => h("td", {}, c)))))
      )));
}

function fieldId(def, inp) { return `f-${def.id}-${inp.id}`; }

function renderInput(def, inp, idx, raw, units, update) {
  if (inp.type === "heading") return h("h3", { class: "input-heading" }, inp.label);
  const id = fieldId(def, inp);
  const err = h("div", { class: "field-error", role: "alert" });
  const help = inp.help ? h("div", { class: "field-help" }, inp.help) : null;

  if (inp.type === "number") {
    const input = h("input", { id, type: "text", inputmode: inp.integer ? "numeric" : "decimal", enterkeyhint: "next", autocomplete: "off",
      oninput: e => { raw[inp.id] = e.target.value; update(); } });
    let unitEl;
    if (inp.analyte) {
      const a = ANALYTES[inp.analyte];
      const seg = h("div", { class: "unit-toggle", role: "group", "aria-label": `${inp.label} unit` });
      const mk = sys => h("button", { type: "button", class: "unit-btn", "aria-pressed": String(units[inp.id] === sys),
        onclick: () => {
          if (units[inp.id] === sys) return;
          const prev = units[inp.id];
          const n = Number(String(raw[inp.id] ?? "").replace(",", "."));
          if (String(raw[inp.id] ?? "").trim() !== "" && Number.isFinite(n)) {
            const conv = convert(inp.analyte, n, prev, sys);
            raw[inp.id] = String(Number(conv.toPrecision(4)));
            input.value = raw[inp.id];
          }
          units[inp.id] = sys;
          store.setFieldUnit(def.id, inp.id, sys);
          seg.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.sys === sys)));
          update();
        } }, a[sys]);
      const bSi = mk("si"); bSi.dataset.sys = "si";
      const bConv = mk("conv"); bConv.dataset.sys = "conv";
      seg.append(bSi, bConv);
      unitEl = seg;
    } else if (inp.unit) {
      unitEl = h("span", { class: "unit" }, inp.unit);
    }
    return h("div", { class: "field field-number" + (inp.optional ? " optional" : "") },
      h("label", { for: id }, inp.label, inp.optional ? h("span", { class: "muted" }, " (optional)") : null),
      h("div", { class: "number-row" }, input, unitEl),
      help, err);
  }

  if (inp.type === "checkbox") {
    const input = h("input", { id, type: "checkbox", onchange: e => { raw[inp.id] = e.target.checked; update(); } });
    return h("div", { class: "field field-check" },
      h("label", { for: id, class: "check-label" }, input, h("span", { class: "check-text" }, inp.label),
        inp.points !== undefined ? h("span", { class: "pts" }, `+${inp.points}`) : null),
      help, err);
  }

  if (inp.type === "radio") {
    const name = id;
    const group = h("div", { class: "radio-group" + (inp.style === "rows" ? " rows" : "") + (inp.options.length > 3 || inp.options.some(o => o.label.length > 28) ? " stacked" : ""), role: "radiogroup", "aria-labelledby": id + "-l" });
    inp.options.forEach((o, i) => {
      const oid = `${id}-${i}`;
      const input = h("input", { id: oid, type: "radio", name, value: String(i), checked: inp.default !== undefined && o.value === inp.default,
        onchange: () => { raw[inp.id] = o.value; update(); } });
      group.append(h("label", { for: oid, class: "radio-label" }, input, h("span", { class: "radio-text" }, o.label),
        o.points !== undefined && inp.style !== "rows" && !/\([+−-]?\d+\)$/.test(o.label) ? h("span", { class: "pts" }, `${o.points > 0 ? "+" : ""}${o.points}`) : null));
    });
    return h("div", { class: "field field-radio" + (inp.optional ? " optional" : "") },
      h("div", { class: "field-label", id: id + "-l" }, inp.label, inp.optional ? h("span", { class: "muted" }, " (optional)") : null),
      group, help, err);
  }
  throw new Error(`Unknown input type ${inp.type}`);
}

export function renderResult(card, def, r, it) {
  const lvl = LEVEL_CLASS[it.level] || "lvl-neutral";
  card.append(
    h("div", { class: "result-head" },
      h("div", { class: "result-label" }, r.label),
      Array.isArray(r.display)
        ? h("div", { class: "result-values" }, r.display.map(d => h("div", { class: "result-value" }, d)))
        : h("div", { class: "result-value" }, r.display)),
    h("div", { class: `band ${lvl}` }, h("span", { class: "band-tag" }, "Band"), h("span", { class: "band-text" }, it.band))
  );
  if (r.details && r.details.length) {
    card.append(h("dl", { class: "details" }, r.details.flatMap(d => [h("dt", {}, d.label), h("dd", {}, d.value)])));
  }
  if (it.text) card.append(h("p", { class: "interp" }, it.text));
  if (it.action) card.append(h("div", { class: "action" }, h("div", { class: "action-tag" }, "Suggested action"), h("p", {}, it.action)));
  for (const s of it.sections || []) {
    card.append(h("div", { class: `section ${s.level ? LEVEL_CLASS[s.level] : ""} ${s.box ? "boxed" : ""} ${s.muted ? "muted-section" : ""}` },
      h("h3", { class: "section-title" }, s.title, s.muted ? h("span", { class: "muted" }, " (greyed out: exam unreliable)") : null),
      h("ul", {}, s.lines.map(l => h("li", {}, l)))));
  }
  if (it.links && it.links.length) card.append(h("div", { class: "links" }, it.links.map(l => linkTo(l.target, l.label))));
  for (const n of it.notes || []) card.append(h("p", { class: "note" }, n));
  if (r.breakdown && r.breakdown.length) {
    const hasPts = r.breakdown.some(b => b.points !== undefined);
    card.append(h("details", { class: "breakdown", open: true },
      h("summary", {}, (hasPts ? "Points breakdown" : "Breakdown")),
      h("table", {}, h("tbody", {}, r.breakdown.map(b => h("tr", {},
        h("td", {}, b.item),
        h("td", { class: "num" }, b.points !== undefined ? String(b.points).replace("-", "−") : b.value)))))));
  }
  if (r.rounding) card.append(h("p", { class: "rounding" }, "Rounding: " + r.rounding));
  const copyBtn = h("button", { type: "button", class: "btn btn-primary copy-btn", onclick: async () => {
    const ok = await copyText(it.copy);
    copyBtn.replaceChildren((ok ? "Copied" : "Copy failed"));
    setTimeout(() => { copyBtn.replaceChildren("Copy result"); }, 1500);
  } }, "Copy result");
  card.append(h("div", { class: "copy-row" }, copyBtn, h("span", { class: "copy-preview" }, it.copy)));
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* fall through */ }
  try {
    const ta = h("textarea", { readonly: true });
    ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
    ta.value = text;
    document.body.append(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch { return false; }
}
