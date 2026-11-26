// SPEC.md B2.5 Forrest. B8 has no test vector for Forrest; these checks confirm each
// selection returns its B2.5 row unchanged.
import { test } from "node:test";
import assert from "node:assert/strict";
import forrest from "../js/calculators/bleeding/forrest.js";
import { calc } from "./helpers.js";

const B25 = {
  Ia: ["Active spurting", "55% (active bleeding, Ia and Ib combined)", "Endoscopic therapy, then high-dose PPI"],
  Ib: ["Active oozing", "55% (combined with Ia)", "Endoscopic therapy, then high-dose PPI"],
  IIa: ["Non-bleeding visible vessel", "43%", "Endoscopic therapy, then high-dose PPI"],
  IIb: ["Adherent clot", "22%", "Consider clot removal and treat the underlying stigma; high-dose PPI"],
  IIc: ["Flat pigmented spot", "10%", "No endoscopic therapy; standard PPI"],
  III: ["Clean base", "5%", "No endoscopic therapy; standard PPI; early feeding and discharge if otherwise stable"]
};

for (const [cls, [finding, risk, action]] of Object.entries(B25)) {
  test(`Forrest ${cls} returns the B2.5 row`, () => {
    const { result, interp } = calc(forrest, { cls });
    assert.equal(result.row.finding, finding);
    assert.equal(interp.action, action);
    assert.equal(interp.text, `Rebleeding risk without endoscopic therapy: ${risk}`);
    assert.equal(interp.copy, `Forrest: ${cls}`);
  });
}
