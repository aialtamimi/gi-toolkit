# Changelog

All notable changes to GI Toolkit. Clinical content comes only from SPEC.md.

## 0.3.0 (2026-11-26) - Phase 3

- B6 reference cards (8), in `content/cards/`: Boston Bowel Preparation Scale (calculator), Los Angeles classification, Prague C and M with Barrett's surveillance (calculator), Paris, NICE, Zargar, Bristol stool form scale, Lyon Consensus 2.0. Tap a table row to highlight it and copy "Classification: grade".
- B7 emergency pages (18), in `content/emergencies/`, in the B7.19 order under Emergencies. Text, doses, thresholds and timings are copied verbatim from SPEC.md, and a test checks every block against SPEC.md. Each page has related-calculator buttons from its "Related:" line, its sources, and the footer "Check local protocol, renal function and allergies before prescribing." SPEC cross-references in the text (for example "GBS (B2.1)") are tappable links.
- Every calculator, card and emergency page is reachable from search.
- New routes `#/card/<id>` and `#/emergency/<id>`; `js/pages.js` renders cards and emergency pages.
- Clinical owner decisions on the Phase 3 review (SPEC.md updated in the same change):
  - Sources added: Ogilvie syndrome and volvulus cite Naveed M et al., ASGE 2020 (doi:10.1016/j.gie.2019.09.007); perforation cites Paspatis GA et al., ESGE 2020 (doi:10.1055/a-1222-3191). Every emergency page now lists a source.
  - Expanded citations now carry a PMID and DOI where one exists, and link to their PubMed record: AASLD acute liver failure (PMID 22213561, cited under its exact title "Introduction to the revised AASLD Position Paper on acute liver failure 2011"), ESGE 2019 (PMID 30943551), Jalan 1969 (PMID 5305933), HELP trial (PMID 25243839), Lundell 1999 (PMID 10403727), Sharma 2006 (PMID 17101315). Added to SPEC.md B9.
  - Drug classes are written in full with the abbreviation in brackets at first use on each page: proton pump inhibitor (PPI), direct oral anticoagulant (DOAC), vitamin K antagonist (VKA), prothrombin complex concentrate (PCC), fresh frozen plasma (FFP), non-steroidal anti-inflammatory drugs (NSAIDs). Applied to the emergency pages, the Lyon 2.0 card and the Forrest classification (each Forrest result shows the full form). Rule recorded in SPEC.md B1.8; a test checks every page.
  - SPEC headings and order kept on all emergency pages.
- Table cards show their clinical-use line below the table (B1.6 order: title, table, clinical use, reference).

## 0.2.2 (2026-11-26)

- FibroScan (B3.20): at 25 kPa or more the Baveno VII line now reads "CSPH ruled in (Baveno VII)". Alcohol-related cutoff reference completed: JHEP Reports 2020;2(3):100101, doi:10.1016/j.jhepr.2020.100101, linked to PMC7267467. Stage colours confirmed (F0–F1 green, F2 amber, F3–F4 red). SPEC.md B3.20, B8.3 and B9 updated.

## 0.2.1 (2026-11-26)

- FibroScan (B3.20) simplified, per the clinical owner:
  - Three main inputs at the top: disease (MASLD, Alcohol-related, Hepatitis B, Hepatitis C, Other/mixed), liver stiffness (kPa), CAP (dB/m, optional). The result appears as soon as disease and kPa are entered.
  - Result in large text, for example "Fibrosis: F3" and "Steatosis: S2". Fibrosis stage cutoffs by disease: MASLD 8.2/9.7/13.6 (Eddowes 2019), hepatitis C 7.1/9.5/12.5 (Castera 2005), hepatitis B 7.9/8.8/11.7 (Chon 2012), alcohol-related 9.0/12.9/18.6 (JHEP Reports 2020 review), with the abstinence note for alcohol-related disease. Other/mixed shows Baveno VII only. A Baveno VII line is shown under every result.
  - IQR/median, valid measurements, ALT and confounders moved into a collapsed "Exam quality (optional)" section below the result. They only add warnings and never block, hide or grey out the result.
  - Removed: the hepatitis B ALT-normal/ALT-raised split, the MASLD and alcohol-related risk bands, the platelet-based Baveno rules (still in the Baveno VII calculator) and the probe selector.
  - SPEC.md B3.20, B8.3 FibroScan vectors and B9 updated.
- Unit rule from Phase 2 applied to Phase 1: where a cutoff is written in both units, the value is compared in the unit entered (AIMS65 albumin; Child-Pugh bilirubin, cholestatic bilirubin and albumin; Lille creatinine; King's College creatinine and bilirubin). SPEC.md B1.5 now states the rule for all calculators; B8 unit-rule vectors added.
- Engine: inputs can be grouped into a collapsed section below the result, and a result can show more than one large line.

## 0.2.0 (2026-11-26) - Phase 2

- B4 Pancreatobiliary: BISAP, Ranson (non-gallstone and gallstone, with "48-hour items pending"), Glasgow-Imrie, SIRS, Modified Marshall (with FiO2 helper), Revised Atlanta (diagnosis, severity, collection name), modified CT severity index, Tokyo Guidelines 2018 for acute cholangitis (diagnosis and severity), ASGE 2019 choledocholithiasis risk. Every pancreatitis score shows "Scores support but do not replace close monitoring in the first 24–48 hours."
- B5 IBD: Truelove and Witts, day-3 response in acute severe UC (Oxford and Lindgren), Mayo and partial Mayo (with Mayo endoscopic score), UCEIS, Harvey-Bradshaw Index, CDAI (7-day sums or 7-day diary), SES-CD (segments can be marked not reached), Rutgeerts (selectable card), Montreal classification (selectable card).
- Engine: count inputs (stools, diary ratings, GCS) accept whole numbers only, and use the numeric keypad.
- Footer and About page: "Designed by Dr. Abdulaziz Altamimi".
- Tests: B8.4 and B8.5 vectors as `node --test` unit tests, plus boundary checks from the B4 and B5 text for tools that have no B8 vector.
- Clinical owner decisions on the Phase 2 review (SPEC.md and B8 updated in the same change):
  - B4 units: where a criterion gives a cutoff in both units, the value is compared in the unit entered with the cutoff written for that unit (BISAP BUN/urea; Ranson glucose, BUN rise and calcium; TG18 bilirubin B-1, so 34 µmol/L meets B-1; Modified Marshall creatinine).
  - Modified Marshall respiratory: PaO2/FiO2 101–200 = 3, 100 or less = 4. Cardiovascular stays a pick list.
  - Full Mayo: a total of 0–5 that does not meet remission is mild.
  - Rutgeerts: i0, i1 and i2a = no endoscopic recurrence (i2a shows "i2a carries lower risk; individualize"); i2b, i3 and i4 = endoscopic recurrence. i2 is selected as i2a or i2b.
  - Truelove and Witts mild confirmation tick box and CDAI band boundaries recorded in SPEC.md as implemented.
- Engine: compute() also receives each lab value as entered with its unit, for the B4 per-unit cutoffs.
- Last clinical review: not yet reviewed.

## 0.1.1 (2026-11-26)

- Rockall (B2.3): added interpretation bands decided by the clinical owner. Pre-endoscopy 0 = low risk, ≥1 = not low risk. Complete 0–2 = low risk of rebleeding and death, 3–7 = intermediate risk, ≥8 = high risk. SPEC.md B2.3 and the B8.2 vector updated.
- FibroScan (B8.3): corrected test vector for hepatitis C, LSM 13.0 kPa to "Baveno: cACLD suggestive", matching the B3.19 and B3.20 rule (10–15 kPa = suggestive). The rule was correct; only the vector changed. The TODO test is now a normal passing test.

## 0.1.0 (2026-11-26) - Phase 1

- App shell: single-page hash router, home with search (names, aliases), category tiles, favorites, recent (last 10), settings (default SI or conventional units), About page, first-launch disclaimer.
- Offline PWA: `manifest.webmanifest`, versioned cache-first service worker, "Update available, tap to refresh" prompt, iPhone meta tags, safe-area padding, generated icons (180, 192, 512, maskable 512).
- Unit handling (B1.5): SI default, per-field toggle remembered on the device, conversion to the unit of the original formula before calculating.
- Calculator engine (B1.4): renders any definition with inputs and units, live result, band label plus color, interpretation, suggested action, points breakdown, rounding rule, references, copy-result line and the decision-support footer.
- B2 GI bleeding: Glasgow-Blatchford, AIMS65, Rockall (pre-endoscopy and complete), Oakland, Forrest (selectable card).
- B3 Liver: Child-Pugh, MELD and MELD-Na, MELD 3.0, Maddrey, Lille, GAHS, ABIC, FIB-4, APRI, NFS, ALBI, ascitic fluid (SAAG, PMN, Runyon), R factor and Hy's law, simplified AIH, Leipzig, West Haven (selectable card), ACLF (EASL-CLIF), King's College, Baveno VII, FibroScan.
- Tests: B8.1 to B8.3 vectors as `node --test` unit tests, plus app-shell checks (precache list, manifest, iPhone tags, no network calls).
- Last clinical review: not yet reviewed.
