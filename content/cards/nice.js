// SPEC.md B6.5 NICE classification for colorectal polyps (narrow-band imaging).
// The SPEC table lists features as rows and types as columns; it is shown transposed (one row per
// type, cell text unchanged) so that tapping a row selects a type.
import { ref } from "../../js/refs.js";

export const SPEC_TABLE = {
  columns: ["Feature", "Type 1", "Type 2", "Type 3"],
  rows: [
    ["Color", "Same or lighter than background", "Browner than background (verify color arises from vessels)", "Brown to dark brown relative to background; sometimes patchy whiter areas"],
    ["Vessels", "None, or isolated lacy vessels across the lesion", "Brown vessels surrounding white structures", "Areas of disrupted or missing vessels"],
    ["Surface pattern", "Dark or white spots of uniform size, or homogeneous absence of pattern", "Oval, tubular or branched white structures surrounded by brown vessels", "Amorphous or absent surface pattern"],
    ["Most likely pathology", "Hyperplastic (or sessile serrated lesion)", "Adenoma", "Deep submucosal invasive cancer"]
  ]
};
const transpose = t => ({
  columns: ["Type", ...t.rows.map(r => r[0])],
  rows: t.columns.slice(1).map((type, j) => [type, ...t.rows.map(r => r[j + 1])])
});

export default {
  id: "nice",
  spec: "B6.5",
  name: "NICE classification for colorectal polyps (narrow-band imaging)",
  short: "NICE (NBI)",
  aliases: ["NICE", "NBI", "narrow-band imaging", "NBI International Colorectal Endoscopic", "colorectal polyp", "optical diagnosis"],
  category: "endoscopy",
  kind: "card",
  use: "Type 3 suggests deep submucosal invasion: biopsy and refer for surgery rather than endoscopic resection.",
  table: transpose(SPEC_TABLE),
  copy: row => `NICE: ${row[0]}`,
  references: [ref("Hayashi N et al. Endoscopic prediction of deep submucosal invasive carcinoma: validation of the narrow-band imaging international colorectal endoscopic (NICE) classification. Gastrointest Endosc 2013")]
};
