# Changelog

All notable changes to GI Toolkit. Clinical content comes only from SPEC.md.

## 0.6.1 (2026-11-27)

Clinical owner follow-up on the bedside algorithm pages (SPEC.md B7.0, B7.9, B7.12, B8.9 and B9 updated in the same change):
- SBP, suspected secondary peritonitis step: "Start broad-spectrum antibiotics with anaerobic cover (for example ceftriaxone plus metronidazole, or piperacillin-tazobactam per local resistance) (EASL 2018)."
- SBP suggestion: "Runyon criteria or polymicrobial culture" is suggested only with PMN ≥250/mm³ and 2 or more Runyon criteria, and then it is the only suggestion; PMN ≥250/mm³ with fewer than 2 criteria suggests "PMN 250/mm³ or more"; PMN <250/mm³ suggests nothing.
- Upper GI bleeding, pre-emptive TIPS decision: Child-Pugh 14–15 suggests "No" and shows "Pre-emptive TIPS not recommended (Child-Pugh >13)". Child-Pugh 10–13 still suggests "Yes".
- Acute pancreatitis: the modified Marshall calculator (B4.5) is also in step P2, under the line "Red flag: organ failure, modified Marshall score 2 or more (B4.5): HDU or ICU." It stays in the red flags box too; each copy has its own inputs. The request named B4.4, which is SIRS in SPEC.md; B4.5 (modified Marshall) was used.
- SBP sources: EASL Clinical Practice Guidelines for decompensated cirrhosis, J Hepatol 2018 (PMID 29653741), and Biggins SW et al., AASLD guidance, Hepatology 2021 (PMID 33942342), with exact PubMed links.
- Engine: embedded calculators take an input id prefix, so one calculator can appear twice on a page without duplicate ids.

## 0.6.0 (2026-11-26)

Five emergency pages are now interactive bedside algorithms (SPEC.md B7.0): upper GI bleeding, acute severe ulcerative colitis, spontaneous bacterial peritonitis, acute pancreatitis and acute cholangitis. Every line, dose and source of the earlier pages is kept, reorganized into the new layout; a test checks each earlier line is still on its page.

- Layout: red flags box (red border) at the top; weight field (kg); Recognize; step cards with timeline chips (for example 0–1 h, Day 3); decision steps with answer buttons that show and highlight the chosen path; "Show full algorithm" shows every step and marks steps off the chosen path or not yet decided; "Clear answers". Then Avoid, tables, Doses, related calculators and sources.
- Built-in calculators inside the steps, rendered by the existing engine and collapsed, with the current result and band on the collapsed bar: GBS, AIMS65, Child-Pugh, Forrest; Truelove and Witts, day-3 Oxford and Lindgren; ascitic fluid analysis; modified Marshall (in the red flags box), revised Atlanta, BISAP, SIRS, modified CTSI; TG18.
- Weight-based doses calculate automatically from the weight field, in the steps, in a list under the weight field and under the matching Doses row: terlipressin by weight band, infliximab 5 and 10 mg/kg, ciclosporin 2 mg/kg/day, albumin 1.5 g/kg and 1 g/kg in grams and mL of 20% albumin, lactated Ringer's 1.5 mL/kg/h and 10 mL/kg bolus, and the urine output target. The weight and the answers are kept in memory for that page only and never stored (Build Rule 4).
- "Why" lines in small italic under key steps, naming the trial or guideline (Villanueva NEJM 2013, Garcia-Pagan NEJM 2010, Lau NEJM 2020, HALT-IT Lancet 2020, CYSIF Lancet 2012, CONSTRUCT Lancet Gastroenterol Hepatol 2016, ASGE 2021, Sort NEJM 1999, WATERFALL NEJM 2022, APEC Lancet 2020, PONCHO Lancet 2015, POINTER NEJM 2021). The new trials are added to each page's sources and to SPEC.md B9.
- Upper GI bleeding: non-variceal and variceal bleeding are one page, with a "Key differences" table. "Variceal bleeding" stays in the emergency index and in search and opens this page at the variceal pathway (`#/emergency/em_ugib/variceal`); the old `#/emergency/em_variceal` link, favorites and recent items redirect there.
- SPEC.md: new B7.0 (algorithm template and weight-based dose table); B7.1, B7.2, B7.5, B7.9, B7.12 and B7.13 rewritten in the B7.0 format; B1.1, B1.6 and B7.19 updated; new test vectors B8.7 (weight-based doses) and B8.8 (every decision path).
- Tests: every algorithm block is compared with SPEC.md; every B8.7 dose and B8.8 path is a unit test; the weight is checked never to reach storage.
- Engine: a calculator can be embedded in a page (one column, no sticky result bar, result reported to the page).
- New files `js/algorithm.js` and `js/doses.js` (precached).
- Clinical owner decisions on the review (SPEC.md B7.0, B7.1, B7.5, B7.9, B8.7, B8.8, new B8.9 and B9 updated in the same change):
  - Upper GI bleeding: high-risk stigmata = Forrest Ia, Ib, IIa, IIb; low-risk = IIc, III, shown on the two buttons. Terlipressin has one doses row by weight (the old "2 mg, adjust by weight" row is removed). Shock index reads "heart rate/systolic BP".
  - Weight outside 20–350 kg shows "Enter weight between 20 and 350 kg". Cholangitis keeps no weight field.
  - Acute severe UC: either Oxford or Lindgren positive means rescue therapy. Day 5–7 is now a decision on the rescue path only ("Responding to rescue therapy?": Yes, continue rescue therapy and plan maintenance; No, colectomy). The corticosteroid path adds "Deterioration at any time: urgent surgical review and reassess for rescue therapy." Oral prednisolone 40 mg once daily, then taper by 5 mg per week, added to the step and the doses table.
  - SBP: new answer "PMN <250/mm³, culture negative or pending": SBP unlikely, no SBP treatment, look for another cause of deterioration, act on the culture result. "Systolic BP" is written in full on all five pages; SBP only means spontaneous bacterial peritonitis.
  - Albumin shown in grams and in mL of 20% (1 g = 5 mL) and 25% (1 g = 4 mL) albumin. The urine output line is labelled "Target, not a dose".
  - Sources added to why lines: Chavez-Tapia, Cochrane 2010 and Baveno VII (antibiotics in variceal bleeding); Grainge, Lancet 2010 (venous thromboembolism in IBD flares); Randall, Br J Surg 2010 (delayed colectomy).
  - Built-in calculators never choose an answer; their result outlines the matching answer as "Suggested" (Child-Pugh 10–13, Forrest class, day-3 Oxford or Lindgren, PMN ≥250/mm³ or 2 Runyon criteria, TG18 grade). Rules in SPEC.md B7.0, vectors in B8.9.
  - Exact PubMed links (with PMID in the citation) replace search links for Villanueva, Garcia-Pagan, Lau, HALT-IT, CYSIF, CONSTRUCT, Sort, WATERFALL, APEC, PONCHO, POINTER, Chavez-Tapia, Grainge and Randall, wherever they are cited (including the GBS calculator).

## 0.5.0 (2026-11-26)

Clinical owner changes:
- Removed the footer "Check local protocol, renal function and allergies before prescribing." from all emergency pages.
- Removed the footer "Decision support only. Verify with clinical judgment and local protocols." from every screen.
- Removed "Last clinical review" and the reviewer from the footer and About page. The footer shows the version and "Designed by Dr. Abdulaziz Altamimi".
- Removed the Disclaimer section from About and the first-launch disclaimer screen.
- About: the Reference policy section is replaced by one line: "All formulas, cutoffs and recommendations are based on published guidelines and original papers. Each calculator lists its sources."
- Removed the Arabic language option (English only). The translation module, language setting and right-to-left styles are gone; dark mode, icons and the accessibility fixes from 0.4.0 stay.
- Bug fix: the word "null" appeared on pages with an empty section (emergency pages without related calculators: Anticoagulants, Toxic megacolon, Foreign body, Ogilvie syndrome, Volvulus, Perforation; and cards without links: Paris, NICE, Bristol). Cards and emergency pages now skip empty parts when building the page.
- SPEC.md and CLAUDE.md Build Rules updated (Rules 2, 4 and 9 changed; new Rule 11 lists the removed items) so they are not added back. Tests guard against each removed item returning.

## 0.4.0 (2026-11-26) - Phase 4

- Arabic interface (Settings, Language): the interface switches to Arabic and right-to-left. Clinical content stays in English: calculator, card and emergency pages are marked English and left-to-right, so names, inputs, results, interpretations, drug names, doses, scores, formulas and tables keep their original wording and order. Interface labels inside those pages appear as Arabic right-to-left islands. The two mandatory footers stay in English with an Arabic translation underneath. Category names are translated; clinical abbreviations (IBD) and units stay in English.
- Dark mode (Settings, Theme): light, dark, or same as device (new default). All colours are theme variables; a test checks WCAG AA contrast (4.5:1) for every text and background pair in both themes.
- App icons redrawn: white "GI" on dark teal (#0b5563), centred, at 180, 192 and 512 px, plus a maskable 512 px icon with the letters inside the safe zone.
- Accessibility: axe-core audit of all 78 screens in English and Arabic, light and dark (312 runs), plus filled-in result states, with no violations; no touch target under 44 px. Fixes: card table rows now select through a real button (ARIA-valid), header buttons keep contrast in dark mode, the favorite button's accessible name matches its visible text, and result-card section headings follow the page heading order.
- Re-check: all 76 B8 test vectors pass (listed in the pull request).
- No clinical content in SPEC.md changed.

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
