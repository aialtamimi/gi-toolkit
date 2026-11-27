// SPEC.md B7.2 Acute variceal bleeding: merged into B7.1 (upper GI bleeding).
// This entry keeps "Variceal bleeding" in the emergency index and in search; it opens the
// upper GI bleeding page at the variceal pathway (entry point "variceal": D1 answered Yes).
export default {
  id: "em_variceal",
  spec: "B7.2",
  name: "Acute variceal bleeding",
  short: "Variceal bleeding",
  aliases: ["variceal bleeding", "varices", "esophageal varices", "portal hypertension bleeding", "terlipressin", "TIPS", "band ligation"],
  category: "emergencies",
  redirect: { page: "em_ugib", entry: "variceal" }
};
