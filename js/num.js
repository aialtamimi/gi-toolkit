// Numeric helpers. No clinical content lives here.

// Round half up (away from zero for .5 on positive numbers) to `dp` decimal places.
// Uses exponent notation to avoid binary floating-point artefacts (e.g. 1.005).
export function roundHalfUp(x, dp = 0) {
  if (!Number.isFinite(x)) return x;
  const sign = x < 0 ? -1 : 1;
  const shifted = Number(Math.abs(x) + "e" + dp);
  // Guard against representation error such as 8.924999999999999 that should be 8.925.
  const nudged = Math.round(Number(shifted.toPrecision(15)));
  return sign * Number(nudged + "e-" + dp);
}

// Format a number with a fixed number of decimals using round-half-up.
export function fmt(x, dp = 0) {
  if (x === null || x === undefined || !Number.isFinite(x)) return "";
  const r = roundHalfUp(x, dp);
  const s = r.toFixed(dp);
  return s === "-0" || /^-0\.0*$/.test(s) ? s.slice(1) : s.replace("-", "−");
}

export const isNum = v => typeof v === "number" && Number.isFinite(v);

// Removes floating-point noise (about 1e-15) by rounding to 12 significant digits, so a value that is exactly a
// cutoff is compared as the cutoff (205.2 / 17.1 = 11.999999999999998 becomes 12; 3.3 − 2.2 = 1.0999999999999996
// becomes 1.1). Used for unit conversion (js/units.js) and for values derived from lab entries before a cutoff.
export const tidy = x => (Number.isFinite(x) ? Number(x.toPrecision(12)) : x);

export function roundingNote(dp) {
  if (dp === 0) return "Displayed rounded to the nearest whole number (round half up); bands use the unrounded value.";
  return `Displayed rounded to ${dp} decimal place${dp === 1 ? "" : "s"} (round half up); bands use the unrounded value.`;
}

export const INTEGER_NOTE = "Integer points; no rounding.";
