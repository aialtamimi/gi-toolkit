// SPEC.md B8.3 APRI
import { test } from "node:test";
import assert from "node:assert/strict";
import apri from "../js/calculators/liver/apri.js";
import { calc, approx } from "./helpers.js";

test("APRI: AST 90, ULN 40, platelets 100 → 2.25; significant fibrosis likely; cirrhosis likely", () => {
  const { result } = calc(apri, { ast: 90, astUln: 40, plt: 100 });
  approx(result.score, 2.25);
  assert.equal(result.fibrosis, "likely");
  assert.equal(result.cirrhosis, "likely");
});
