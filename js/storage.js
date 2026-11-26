// localStorage wrapper. Only favorites, recent items, unit choices, theme and language are
// stored (Build Rule 4), plus the one-time disclaimer acceptance flag. No patient data.
const P = "gi-toolkit.";

function read(key, fallback) {
  try { const v = localStorage.getItem(P + key); return v === null ? fallback : JSON.parse(v); }
  catch { return fallback; }
}
function write(key, value) {
  try { localStorage.setItem(P + key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

export const store = {
  favorites: () => read("favorites", []),
  isFavorite: id => read("favorites", []).includes(id),
  toggleFavorite(id) {
    const f = read("favorites", []);
    const i = f.indexOf(id);
    if (i >= 0) f.splice(i, 1); else f.push(id);
    write("favorites", f);
    return i < 0;
  },
  recent: () => read("recent", []),
  addRecent(id) {
    const r = read("recent", []).filter(x => x !== id);
    r.unshift(id);
    write("recent", r.slice(0, 10));
  },
  defaultUnits: () => read("units.default", "si"),
  setDefaultUnits: s => write("units.default", s),
  fieldUnit: (calcId, fieldId) => read(`units.${calcId}.${fieldId}`, null),
  setFieldUnit: (calcId, fieldId, s) => write(`units.${calcId}.${fieldId}`, s),
  clearFieldUnits() {
    try { Object.keys(localStorage).filter(k => k.startsWith(P + "units.") && k !== P + "units.default").forEach(k => localStorage.removeItem(k)); } catch { /* ignore */ }
  },
  theme: () => read("theme", "system"),          // "light" | "dark" | "system"
  setTheme: t => write("theme", t),
  language: () => read("language", "en"),        // "en" | "ar"
  setLanguage: l => write("language", l),
  disclaimerAccepted: () => read("disclaimer.accepted", false),
  acceptDisclaimer: () => write("disclaimer.accepted", true)
};
