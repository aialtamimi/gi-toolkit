// Helpers for the B10 motility tests: SPEC sections (B10 is the last part of SPEC.md) and the B8.10 rows.
import { readFileSync } from "node:fs";

export const SPEC = readFileSync(new URL("../SPEC.md", import.meta.url), "utf8");

export function section(num) {
  const start = SPEC.indexOf(`### ${num} `);
  if (start < 0) throw new Error(`SPEC section ${num} not found`);
  const rest = SPEC.slice(start);
  const end = rest.slice(4).search(/\n#{2,3} /);
  return end < 0 ? rest : rest.slice(0, end + 4);
}

const cells = line => line.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());

// B8.10 rows for one calculator: [{ inputs, expected }].
export function vectors(name) {
  return section("B8.10").split("\n").filter(l => l.startsWith(`| ${name} |`)).map(l => {
    const c = cells(l);
    return { inputs: c[1], expected: c[2] };
  });
}
