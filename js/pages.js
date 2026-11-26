// Renders classification reference cards (SPEC.md B6) and emergency pages (SPEC.md B7).
import { h, renderCalculator, linkTo, copyText, appendAll } from "./engine.js";
import { findItem, hrefFor } from "./registry.js";

export const NO_SOURCE_TEXT = "No source is listed in SPEC.md for this page yet.";

// SPEC section numbers used as cross-references in emergency page text, mapped to the item they name.
export const SPEC_REFS = {
  "B2.1": "gbs", "B2.4": "oakland", "B2.5": "forrest",
  "B3.5": "lille", "B3.12": "ascites", "B3.16": "west_haven", "B3.18": "kings",
  "B4.6": "atlanta", "B4.8": "tg18_cholangitis",
  "B5.1": "truelove_witts", "B5.2": "asuc_day3",
  "B6.6": "zargar", "B7.4": "em_antithrombotic"
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

export function renderEmergency(root, page) {
  const body = page.blocks.map(b => {
    if (b.type === "section") return h("section", { class: "em-section" }, h("h3", {}, b.title), h("p", {}, richText(b.text)));
    if (b.type === "table") {
      const isDoses = b.columns[1] === "Dose";
      return h("div", { class: "em-table" }, isDoses ? h("h3", {}, "Doses (adult doses)") : null, table(b, { rich: true }));
    }
    if (b.type === "note") return h("p", { class: "em-note" }, richText(b.text));
    if (b.type === "source") return h("p", { class: "em-source muted" }, "Source: ", richText(b.text));
    return null;
  });
  const related = page.related.map(findItem).filter(Boolean);
  appendAll(root,
    ...body,
    related.length ? h("section", { class: "em-related" }, h("h3", {}, "Related calculators"),
      h("div", { class: "links" }, related.map(c => linkTo(c.id, c.name)))) : null,
    h("h3", {}, "Sources"),
    page.references.length ? refList(page.references) : h("p", { class: "muted" }, NO_SOURCE_TEXT));
}
