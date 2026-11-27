// List of all calculators, cards and emergencies (SPEC.md B1.3).
import gbs from "./calculators/bleeding/gbs.js";
import aims65 from "./calculators/bleeding/aims65.js";
import rockall from "./calculators/bleeding/rockall.js";
import oakland from "./calculators/bleeding/oakland.js";
import forrest from "./calculators/bleeding/forrest.js";
import child_pugh from "./calculators/liver/child_pugh.js";
import meld_na from "./calculators/liver/meld_na.js";
import meld3 from "./calculators/liver/meld3.js";
import maddrey from "./calculators/liver/maddrey.js";
import lille from "./calculators/liver/lille.js";
import gahs from "./calculators/liver/gahs.js";
import abic from "./calculators/liver/abic.js";
import fib4 from "./calculators/liver/fib4.js";
import apri from "./calculators/liver/apri.js";
import nfs from "./calculators/liver/nfs.js";
import albi from "./calculators/liver/albi.js";
import ascites from "./calculators/liver/ascites.js";
import r_factor from "./calculators/liver/r_factor.js";
import aih_simplified from "./calculators/liver/aih_simplified.js";
import leipzig from "./calculators/liver/leipzig.js";
import west_haven from "./calculators/liver/west_haven.js";
import aclf from "./calculators/liver/aclf.js";
import kings from "./calculators/liver/kings.js";
import baveno7 from "./calculators/liver/baveno7.js";
import fibroscan from "./calculators/liver/fibroscan.js";
import bisap from "./calculators/pancreas/bisap.js";
import ranson from "./calculators/pancreas/ranson.js";
import glasgow_imrie from "./calculators/pancreas/glasgow_imrie.js";
import sirs from "./calculators/pancreas/sirs.js";
import marshall from "./calculators/pancreas/marshall.js";
import atlanta from "./calculators/pancreas/atlanta.js";
import mctsi from "./calculators/pancreas/mctsi.js";
import tg18_cholangitis from "./calculators/pancreas/tg18_cholangitis.js";
import asge_cbd from "./calculators/pancreas/asge_cbd.js";
import truelove_witts from "./calculators/ibd/truelove_witts.js";
import asuc_day3 from "./calculators/ibd/asuc_day3.js";
import mayo_uc from "./calculators/ibd/mayo_uc.js";
import uceis from "./calculators/ibd/uceis.js";
import hbi from "./calculators/ibd/hbi.js";
import cdai from "./calculators/ibd/cdai.js";
import ses_cd from "./calculators/ibd/ses_cd.js";
import rutgeerts from "./calculators/ibd/rutgeerts.js";
import montreal from "./calculators/ibd/montreal.js";
import bbps from "../content/cards/bbps.js";
import la_grade from "../content/cards/la_grade.js";
import prague from "../content/cards/prague.js";
import paris from "../content/cards/paris.js";
import nice from "../content/cards/nice.js";
import zargar from "../content/cards/zargar.js";
import bristol from "../content/cards/bristol.js";
import lyon2 from "../content/cards/lyon2.js";
import em_ugib from "../content/emergencies/em_ugib.js";
import em_variceal from "../content/emergencies/em_variceal.js";
import em_lgib from "../content/emergencies/em_lgib.js";
import em_antithrombotic from "../content/emergencies/em_antithrombotic.js";
import em_asuc from "../content/emergencies/em_asuc.js";
import em_toxic_megacolon from "../content/emergencies/em_toxic_megacolon.js";
import em_alf from "../content/emergencies/em_alf.js";
import em_aah from "../content/emergencies/em_aah.js";
import em_sbp from "../content/emergencies/em_sbp.js";
import em_hrs from "../content/emergencies/em_hrs.js";
import em_he from "../content/emergencies/em_he.js";
import em_pancreatitis from "../content/emergencies/em_pancreatitis.js";
import em_cholangitis from "../content/emergencies/em_cholangitis.js";
import em_foreign_body from "../content/emergencies/em_foreign_body.js";
import em_caustic from "../content/emergencies/em_caustic.js";
import em_acpo from "../content/emergencies/em_acpo.js";
import em_volvulus from "../content/emergencies/em_volvulus.js";
import em_perforation from "../content/emergencies/em_perforation.js";

export const CATEGORIES = [
  { id: "bleeding", name: "GI bleeding" },
  { id: "liver", name: "Liver" },
  { id: "pancreas", name: "Pancreas and biliary" },
  { id: "ibd", name: "IBD" },
  { id: "endoscopy", name: "Endoscopy classifications" },
  { id: "emergencies", name: "Emergencies", emergency: true }
];

// Phase 1: B2 (bleeding) and B3 (liver). Phase 2: B4 (pancreatobiliary) and B5 (IBD).
export const CALCULATORS = [
  gbs, aims65, rockall, oakland, forrest,
  child_pugh, meld_na, meld3, maddrey, lille, gahs, abic, fib4, apri, nfs, albi,
  ascites, r_factor, aih_simplified, leipzig, west_haven, aclf, kings, baveno7, fibroscan,
  bisap, ranson, glasgow_imrie, sirs, marshall, atlanta, mctsi, tg18_cholangitis, asge_cbd,
  truelove_witts, asuc_day3, mayo_uc, uceis, hbi, cdai, ses_cd, rutgeerts, montreal
];

// Phase 3: B6 reference cards (in SPEC order) and B7 emergency pages (in the B7.19 index order).
export const CARDS = [bbps, la_grade, prague, paris, nice, zargar, bristol, lyon2];
// Variceal bleeding (B7.2) is part of the upper GI bleeding page (B7.1); em_variceal is a redirect entry
// that keeps its name in the index and in search and opens that page at the variceal pathway.
export const EMERGENCIES = [
  em_ugib, em_lgib, em_antithrombotic, em_asuc, em_toxic_megacolon, em_alf, em_aah, em_sbp, em_hrs, em_he, em_pancreatitis, em_cholangitis, em_foreign_body, em_caustic, em_acpo, em_volvulus, em_perforation
];

// Emergency page names and order from SPEC.md B7.19, used for the home index and for
// links from calculators before the pages exist.
export const EMERGENCY_INDEX = [
  ["em_ugib", "Upper GI bleeding"], ["em_variceal", "Variceal bleeding"], ["em_lgib", "Lower GI bleeding"],
  ["em_antithrombotic", "Anticoagulants in GI bleeding"], ["em_asuc", "Acute severe UC"], ["em_toxic_megacolon", "Toxic megacolon"],
  ["em_alf", "Acute liver failure"], ["em_aah", "Alcohol-associated hepatitis"], ["em_sbp", "SBP"], ["em_hrs", "HRS-AKI"],
  ["em_he", "Hepatic encephalopathy"], ["em_pancreatitis", "Acute pancreatitis"], ["em_cholangitis", "Cholangitis"],
  ["em_foreign_body", "Foreign body"], ["em_caustic", "Caustic ingestion"], ["em_acpo", "Ogilvie syndrome"],
  ["em_volvulus", "Volvulus"], ["em_perforation", "Perforation"]
].map(([id, name]) => ({ id, name }));

// Index and search entries without a page of their own: { id, name, short, aliases, redirect: { page, entry } }.
export const REDIRECTS = [em_variceal];

// Route for any calculator, card or emergency page.
export function hrefFor(id) {
  const r = REDIRECTS.find(x => x.id === id);
  if (r) return `#/emergency/${r.redirect.page}/${r.redirect.entry}`;
  if (id.startsWith("em_")) return `#/emergency/${id}`;
  if (CARDS.some(c => c.id === id)) return `#/card/${id}`;
  return `#/calc/${id}`;
}

export function findItem(id) {
  return CALCULATORS.find(c => c.id === id) || CARDS.find(c => c.id === id) || EMERGENCIES.find(c => c.id === id) || REDIRECTS.find(c => c.id === id) || null;
}

export function itemsInCategory(cat) {
  if (cat === "emergencies") return EMERGENCIES;
  return [...CALCULATORS, ...CARDS].filter(c => c.category === cat);
}

function norm(s) { return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim(); }

export function search(query) {
  const q = norm(query);
  if (!q) return [];
  const words = q.split(" ");
  const all = [...CALCULATORS, ...CARDS, ...EMERGENCIES, ...REDIRECTS];
  const scored = [];
  for (const item of all) {
    const hay = [item.name, item.short || "", item.id.replace(/_/g, " "), ...(item.aliases || []), ...(item.tags || [])].map(norm);
    const joined = hay.join(" | ");
    if (!words.every(w => joined.includes(w))) continue;
    let s = 0;
    if (hay.some(h => h === q)) s += 100;
    if (hay.some(h => h.startsWith(q))) s += 50;
    if (norm(item.name).includes(q)) s += 10;
    scored.push({ item, s });
  }
  return scored.sort((a, b) => b.s - a.s || a.item.name.localeCompare(b.item.name)).map(x => x.item);
}
