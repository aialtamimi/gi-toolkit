// Router, home, search, favorites, settings (SPEC.md B1.3, B1.6).
import { CATEGORIES, CALCULATORS, CARDS, EMERGENCIES, EMERGENCY_INDEX, findItem, hrefFor, itemsInCategory, search } from "./registry.js";
import { renderCard, renderEmergency } from "./pages.js";
import { renderCalculator, h, FOOTER_TEXT, L, footerNote } from "./engine.js";
import { t, lang, isArabic } from "./i18n.js";
import { store } from "./storage.js";
import { APP_VERSION, LAST_CLINICAL_REVIEW, CLINICAL_REVIEWER, DESIGNER } from "./version.js";

const main = document.getElementById("main");
const titleEl = document.getElementById("page-title");
const backBtn = document.getElementById("back-btn");

const DISCLAIMER = "GI Toolkit is a decision-support reference for clinicians, not a substitute for clinical judgment or local protocols. Verify every result before clinical use.";

// ---------- language and theme (Phase 4) ----------

// Arabic switches the interface to right-to-left. Calculator, card and emergency pages are marked
// English and left-to-right, so clinical text, numbers, units and tables keep their original order.
function applyPrefs() {
  const root = document.documentElement;
  const ar = isArabic();
  root.lang = ar ? "ar" : "en";
  root.dir = ar ? "rtl" : "ltr";
  root.dataset.theme = store.theme();
  backBtn.textContent = t("‹ Back");
  backBtn.setAttribute("aria-label", t("Back"));
  const homeBtn = document.querySelector(".home-btn");
  homeBtn.textContent = t("Home");
  homeBtn.setAttribute("aria-label", t("Home"));
}

function setTitle(t, showBack) {
  titleEl.textContent = t;
  document.title = t === "GI Toolkit" ? "GI Toolkit" : `${t} · GI Toolkit`;
  backBtn.hidden = !showBack;
}

function appFooter() {
  return h("footer", { class: "app-footer" },
    h("p", {}, t("GI Toolkit v{version} · Last clinical review: {review}", { version: APP_VERSION, review: t(LAST_CLINICAL_REVIEW) })),
    h("p", { class: "designer" }, DESIGNER),
    h("p", {}, h("a", { href: "#/about" }, t("About")), " · ", h("a", { href: "#/settings" }, t("Settings"))));
}

function itemLink(item) {
  const isEm = item.id.startsWith("em_");
  const fav = store.isFavorite(item.id);
  return h("li", {}, h("a", { class: "item-link", href: hrefFor(item.id) },
    isEm ? h("span", { class: "em-label" }, t("Emergency")) : null,
    h("span", { class: "item-name", lang: "en", dir: "ltr" }, item.name),
    item.short && item.short !== item.name ? h("span", { class: "item-short", lang: "en", dir: "ltr" }, item.short) : null,
    fav ? h("span", { class: "star", role: "img", "aria-label": t("Favorite") }, "★") : null));
}

function itemList(items) {
  return h("ul", { class: "item-list" }, items.map(itemLink));
}

// ---------- screens ----------

function home() {
  setTitle("GI Toolkit", false);
  const results = h("div", { class: "search-results", "aria-live": "polite" });
  const input = h("input", { type: "search", id: "search", class: "search", placeholder: t("Search calculators, aliases…"),
    "aria-label": t("Search"), autocomplete: "off", autocapitalize: "off", spellcheck: "false",
    oninput: () => showResults() });
  function showResults() {
    const q = input.value.trim();
    results.replaceChildren();
    sections.hidden = !!q;
    if (!q) return;
    const found = search(q);
    results.append(found.length ? itemList(found) : h("p", { class: "muted" }, t("No match.")));
  }

  const favs = store.favorites().map(findItem).filter(Boolean);
  const recent = store.recent().map(findItem).filter(Boolean);
  const tiles = h("div", { class: "tiles" }, CATEGORIES.map(c => {
    const n = c.id === "emergencies" ? EMERGENCIES.length : itemsInCategory(c.id).length;
    return h("a", { class: "tile" + (c.emergency ? " tile-emergency" : ""), href: `#/category/${c.id}` },
      h("span", { class: "tile-name" }, t(c.name)),
      h("span", { class: "tile-count" }, n ? t("Items: {n}", { n }) : t("Coming in a later update")));
  }));
  const sections = h("div", {},
    h("h2", {}, t("Categories")), tiles,
    favs.length ? [h("h2", {}, t("Favorites")), itemList(favs)] : null,
    recent.length ? [h("h2", {}, t("Recent")), itemList(recent)] : null);
  main.replaceChildren(h("div", { class: "home" }, h("div", { class: "search-wrap" }, input), results, sections), appFooter());
}

function category(id) {
  const cat = CATEGORIES.find(c => c.id === id);
  if (!cat) return notFound();
  setTitle(t(cat.name), true);
  let body;
  if (id === "emergencies") {
    body = h("ol", { class: "item-list emergency-index" }, EMERGENCY_INDEX.map(e => {
      const page = EMERGENCIES.find(p => p.id === e.id);
      return h("li", {}, page
        ? h("a", { class: "item-link", href: `#/emergency/${e.id}` }, h("span", { class: "em-label" }, t("Emergency")), h("span", { class: "item-name", lang: "en", dir: "ltr" }, e.name))
        : h("span", { class: "item-link disabled" }, h("span", { class: "em-label" }, t("Emergency")), h("span", { class: "item-name", lang: "en", dir: "ltr" }, e.name), h("span", { class: "item-short" }, t("Coming in a later update"))));
    }));
  } else {
    const items = itemsInCategory(id);
    body = items.length ? itemList(items) : h("p", { class: "muted" }, t("Coming in a later update"));
  }
  main.replaceChildren(h("div", { class: "page" }, body), appFooter());
}

// Page header with title, one-line use and favorite toggle, shared by calculators, cards and emergencies.
function itemPage(def, render) {
  const id = def.id;
  setTitle(def.short || def.name, true);
  store.addRecent(id);
  // The visible text is the accessible name; aria-pressed carries the on/off state.
  const favBtn = h("button", { type: "button", class: "fav-btn", "aria-pressed": String(store.isFavorite(id)), onclick: () => {
      const on = store.toggleFavorite(id);
      favBtn.setAttribute("aria-pressed", String(on));
      favBtn.replaceChildren(L(on ? "★ Favorite" : "☆ Favorite"));
    } }, L(store.isFavorite(id) ? "★ Favorite" : "☆ Favorite"));
  const isEm = id.startsWith("em_");
  const root = h("div", { class: isEm ? "emergency" : "calc" });
  const header = h("div", { class: "calc-header" },
    h("div", {}, isEm ? h("span", { class: "em-label" }, L("Emergency")) : null, h("h2", {}, def.name),
      def.use && !(def.kind === "card" && !def.inputs) ? h("p", { class: "use" }, def.use) : null), favBtn);  // table cards show their clinical use below the table
  // Clinical pages stay English and left-to-right in every interface language.
  main.replaceChildren(h("div", { class: "page item-page", lang: "en", dir: "ltr" }, header, root), appFooter());
  render(root);
}

function calc(id) {
  const def = CALCULATORS.find(c => c.id === id);
  if (!def) return notFound();
  itemPage(def, root => renderCalculator(root, def, { onReset: () => calc(id) }));
}

function card(id) {
  const def = CARDS.find(c => c.id === id);
  if (!def) return notFound();
  itemPage(def, root => renderCard(root, def, { onReset: () => card(id) }));
}

function emergency(id) {
  const page = EMERGENCIES.find(c => c.id === id);
  if (!page) return notFound();
  itemPage(page, root => renderEmergency(root, page));
}

function about() {
  setTitle(t("About"), true);
  main.replaceChildren(h("div", { class: "page prose" },
    h("h2", {}, t("Disclaimer")),
    h("p", {}, t(DISCLAIMER)),
    footerNote(FOOTER_TEXT),
    h("h2", {}, t("Version and review")),
    h("dl", { class: "details" },
      h("dt", {}, t("Version")), h("dd", {}, APP_VERSION),
      h("dt", {}, t("Last clinical review")), h("dd", {}, t(LAST_CLINICAL_REVIEW)),
      h("dt", {}, t("Reviewer")), h("dd", {}, t(CLINICAL_REVIEWER))),
    h("p", { class: "designer" }, DESIGNER),
    h("h2", {}, t("Reference policy")),
    h("p", {}, t("Every formula, point value, cutoff and interpretation comes only from the project specification (SPEC.md), which was written from guidelines and original papers. Each calculator shows its sources. Where the specification gives no link for a source, the app links to a PubMed search for that citation.")),
    h("p", {}, t("Rounding is never silent: each result states the rounding rule used.")),
    isArabic() ? h("p", {}, t("Clinical content (calculator names, results, interpretations, drug names, doses, scores and formulas) stays in English.")) : null,
    h("h2", {}, t("Privacy")),
    h("p", {}, t("No patient data is stored or sent anywhere. The app makes no network calls while you use it and has no analytics or trackers. Only favorites, recent items, unit choices, theme, language and your disclaimer acceptance are kept on this device."))
  ), appFooter());
}

function radioGroup(name, options, current, onchange) {
  return h("div", { class: "radio-group", role: "radiogroup", "aria-labelledby": `${name}-h` },
    options.map(([v, text, attrs]) => h("label", { class: "radio-label" },
      h("input", { type: "radio", name, value: v, checked: current === v, onchange: () => onchange(v) }),
      h("span", { class: "radio-text", ...(attrs || {}) }, text))));
}

function settings() {
  setTitle(t("Settings"), true);
  const msg = h("p", { class: "muted", "aria-live": "polite" });
  const unitGroup = radioGroup("units",
    [["si", t("SI (µmol/L, g/L, mmol/L)")], ["conv", t("Conventional (mg/dL, g/dL)")]], store.defaultUnits(),
    v => { store.setDefaultUnits(v); store.clearFieldUnits(); msg.textContent = t("Saved. Per-field unit choices were reset to this default."); });
  const themeGroup = radioGroup("theme",
    [["light", t("Light")], ["dark", t("Dark")], ["system", t("Same as device")]], store.theme(),
    v => { store.setTheme(v); applyPrefs(); });
  const langGroup = radioGroup("language",
    [["en", "English", { lang: "en", dir: "ltr" }], ["ar", "العربية", { lang: "ar", dir: "rtl" }]], lang(),
    v => { store.setLanguage(v); applyPrefs(); settings(); });
  main.replaceChildren(h("div", { class: "page prose" },
    h("h2", { id: "language-h" }, t("Language")),
    langGroup,
    h("h2", { id: "theme-h" }, t("Theme")),
    themeGroup,
    h("h2", { id: "units-h" }, t("Default units")),
    h("p", {}, t("Saudi laboratories report SI units, so SI is the default. Each lab field also has its own toggle, which is remembered.")),
    unitGroup, msg
  ), appFooter());
}

function notFound() {
  setTitle(t("Not found"), true);
  main.replaceChildren(h("div", { class: "page" }, h("p", {}, t("This page does not exist.")), h("a", { href: "#/" }, t("Go home"))), appFooter());
}

// ---------- router ----------

function route() {
  const parts = (location.hash.replace(/^#\/?/, "") || "").split("/").filter(Boolean);
  window.scrollTo(0, 0);
  if (parts.length === 0) return home();
  if (parts[0] === "calc" && parts[1]) return calc(parts[1]);
  if (parts[0] === "category" && parts[1]) return category(parts[1]);
  if (parts[0] === "about") return about();
  if (parts[0] === "settings") return settings();
  if (parts[0] === "card" && parts[1]) return card(parts[1]);
  if (parts[0] === "emergency" && parts[1]) return emergency(parts[1]);
  return notFound();
}

backBtn.addEventListener("click", () => {
  if (history.length > 1) history.back(); else location.hash = "#/";
});
window.addEventListener("hashchange", route);

// ---------- first launch disclaimer ----------

function disclaimerGate() {
  if (store.disclaimerAccepted()) return;
  const dlg = h("div", { class: "modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "disc-title" },
    h("div", { class: "modal-box" },
      h("h2", { id: "disc-title" }, t("Before you start")),
      h("p", {}, t(DISCLAIMER)),
      footerNote(FOOTER_TEXT),
      h("button", { type: "button", class: "btn btn-primary", onclick: () => { store.acceptDisclaimer(); dlg.remove(); } }, t("I understand and accept"))));
  document.body.append(dlg);
  dlg.querySelector("button").focus();
}

// ---------- service worker and update prompt ----------

let updateRequested = false;

function showUpdate(reg) {
  if (document.getElementById("update-banner")) return;
  const b = h("button", { type: "button", id: "update-banner", class: "update-banner", onclick: () => {
    updateRequested = true;
    if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
    else location.reload();
  } }, t("Update available, tap to refresh"));
  document.body.append(b);
}

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // Reload only when the user tapped "Update available"; the first install also fires this event.
    if (refreshing || !updateRequested) return;
    refreshing = true;
    location.reload();
  });
  navigator.serviceWorker.register("./sw.js").then(reg => {
    if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg);
    reg.addEventListener("updatefound", () => {
      const nw = reg.installing;
      if (!nw) return;
      nw.addEventListener("statechange", () => {
        if (nw.state === "installed" && navigator.serviceWorker.controller) showUpdate(reg);
      });
    });
  }).catch(() => {});
}

applyPrefs();
route();
disclaimerGate();
