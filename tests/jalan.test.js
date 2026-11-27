// SPEC.md B5.10 Jalan criteria for toxic megacolon; vectors from B8.5.
import { test } from "node:test";
import assert from "node:assert/strict";
import jalan from "../js/calculators/ibd/jalan.js";
import { calc } from "./helpers.js";

const run = raw => calc(jalan, raw);

test("B8.5 Jalan: dilatation; fever, heart rate, anemia; dehydration → criteria met (B 3 of 4, C 1 of 4)", () => {
  const { result, interp } = run({ dilatation: true, fever: true, hr: true, anemia: true, dehydration: true });
  assert.equal(result.met, true);
  assert.equal(result.b, 3);
  assert.equal(result.c, 1);
  assert.equal(interp.band, "Criteria met");
  assert.equal(interp.level, "high");
  assert.equal(interp.action, "Toxic megacolon: urgent surgical review and the toxic megacolon algorithm.");
});

test("B8.5 Jalan: dilatation; fever, heart rate; dehydration, hypotension → not met (B 2 of 4)", () => {
  const { result, interp } = run({ dilatation: true, fever: true, hr: true, dehydration: true, hypotension: true });
  assert.equal(result.met, false);
  assert.equal(result.b, 2);
  assert.equal(interp.band, "Criteria not met");
});

test("B8.5 Jalan: no dilatation → not met even with all of B", () => {
  const { result } = run({ fever: true, hr: true, neut: true, anemia: true, consciousness: true });
  assert.equal(result.met, false);
  assert.equal(result.a, false);
});

test("B8.5 Jalan: dilatation and all 4 of B but none of C → not met (C 0 of 4)", () => {
  const { result } = run({ dilatation: true, fever: true, hr: true, neut: true, anemia: true });
  assert.equal(result.met, false);
  assert.equal(result.c, 0);
});

test("Jalan shows a breakdown of A, B and C, and a reference with a link", () => {
  const { result } = run({ dilatation: true });
  assert.deepEqual(result.breakdown.map(b => b.value), ["Yes", "0 of 4", "0 of 4"]);
  assert.match(jalan.references[0].url, /pubmed\.ncbi\.nlm\.nih\.gov\/5305933/);
});
