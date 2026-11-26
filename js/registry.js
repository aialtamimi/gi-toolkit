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

// B6 cards and B7 emergency pages are added in Phase 3.
export const CARDS = [];
export const EMERGENCIES = [];

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

export function findItem(id) {
  return CALCULATORS.find(c => c.id === id) || CARDS.find(c => c.id === id) || EMERGENCIES.find(c => c.id === id) || null;
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
  const all = [...CALCULATORS, ...CARDS, ...EMERGENCIES];
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
