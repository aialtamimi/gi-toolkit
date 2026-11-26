// SPEC.md B6.7 Bristol stool form scale
import { ref } from "../../js/refs.js";

export default {
  id: "bristol",
  spec: "B6.7",
  name: "Bristol stool form scale",
  short: "Bristol stool",
  aliases: ["Bristol", "Bristol stool form scale", "stool form", "stool type", "IBS subtype", "Rome IV"],
  category: "endoscopy",
  kind: "card",
  use: "Used in Rome IV IBS subtyping.",
  table: { columns: ["Type", "Description", "Suggests"], rows: [
    ["1", "Separate hard lumps, like nuts", "Slow transit"],
    ["2", "Sausage-shaped but lumpy", "Slow transit"],
    ["3", "Like a sausage with cracks on the surface", "Normal"],
    ["4", "Like a sausage or snake, smooth and soft", "Normal"],
    ["5", "Soft blobs with clear-cut edges", "Tending to fast transit"],
    ["6", "Fluffy pieces with ragged edges, mushy", "Fast transit"],
    ["7", "Watery, no solid pieces", "Fast transit"]
  ] },
  copy: row => `Bristol stool form: type ${row[0]}`,
  references: [ref("Lewis SJ, Heaton KW. Stool form scale as a useful guide to intestinal transit time. Scand J Gastroenterol 1997")]
};
