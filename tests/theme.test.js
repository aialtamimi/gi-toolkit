// Phase 4 dark mode: every light colour variable has a dark value, and text/background pairs meet
// WCAG AA contrast (4.5:1) in both themes.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../css/app.css", import.meta.url), "utf8");
const block = re => Object.fromEntries([...css.match(re)[1].matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map(m => [m[1], m[2]]));
const LIGHT = block(/:root \{([^}]*)\}/);
const DARK = block(/:root\[data-theme="dark"\] \{([^}]*)\}/);
const SYSTEM = block(/:root\[data-theme="system"\] \{([^}]*)\}/);

function lum(hex) {
  const c = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const PAIRS = [
  ["text", "bg"], ["muted", "bg"], ["text", "surface"], ["muted", "surface"], ["primary", "bg"], ["primary-text", "primary"],
  ["header-text", "header-bg"], ["low-fg", "low-bg"], ["int-fg", "int-bg"], ["high-fg", "high-bg"], ["neu-fg", "neu-bg"],
  ["high-fg", "bg"], ["emergency-text", "bg"], ["on-emergency", "emergency"], ["star-text", "bg"], ["banner-text", "banner-bg"],
  ["text", "selected-bg"], ["primary", "selected-bg"]
];

test("dark theme overrides every colour variable, and the device-following theme matches it", () => {
  const colourVars = Object.keys(LIGHT);
  assert.ok(colourVars.length >= 25);
  for (const v of colourVars) assert.ok(DARK[v], `--${v} has no dark value`);
  assert.deepEqual(SYSTEM, DARK);
});

for (const [name, theme] of [["light", LIGHT], ["dark", DARK]]) {
  test(`${name} theme: text and background pairs meet WCAG AA 4.5:1`, () => {
    for (const [fg, bg] of PAIRS) {
      const r = ratio(theme[fg], theme[bg]);
      assert.ok(r >= 4.5, `${name}: --${fg} on --${bg} is ${r.toFixed(2)}:1`);
    }
  });
}

test("index.html starts in the device-following theme to avoid a flash before scripts run", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<html lang="en" dir="ltr" data-theme="system">/);
});
