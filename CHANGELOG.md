# Changelog

All notable changes to GI Toolkit. Clinical content comes only from SPEC.md.

## 0.10.0 (2026-11-27)

Fourteen new classification cards (SPEC.md B6.9 to B6.22), three of them calculators. Each has search aliases, an exact PubMed link (PMID at the end of the citation) and tests. No diagrams yet.
- Calculators: EREFS (B6.9; proximal and distal scored separately, each 0–9, total 0–18, minor features and "score before biopsies" notes); Spigelman, modified (B6.17; points, stage 0–IV, ACG 2015 surveillance interval, ampulla note); OLGA and OLGIM (B6.18; antrum and corpus matrix, stage III–IV "High risk" with MAPS III surveillance every 3 years, stage 0–II "Lower risk", individualize).
- Table cards: Sydney deep mural injury after EMR (B6.10, links to the perforation page), JNET (B6.11, links to NICE and Kudo), Kudo pit pattern (B6.12), Haggitt and Kikuchi levels with the JSCCR 2019 curative criteria (B6.13), Sarin (B6.14, links to the variceal pathway of the upper GI bleeding page), Hill grade (B6.15, links to Lyon 2.0), Siewert (B6.16), Marsh-Oberhuber (B6.19), Goligher with ASCRS 2024 management (B6.20), Bismuth-Corlette (B6.21), Strasberg (B6.22).
- Paris (B6.4): mixed types and the four laterally spreading tumor subtypes; note "LST-NG pseudodepressed and LST-G nodular mixed carry the highest risk of submucosal invasion: en bloc resection."
- BBPS (B6.1): note on screen "Total 0–9. Adequate preparation: 2 or more in every segment (total 6 or more). Inadequate: repeat colonoscopy within 1 year."
- Iatrogenic perforation (B7.18): P3 colon item "After colonic EMR: deep mural injury by the Sydney classification (B6.10)." and a Related link to the Sydney card. Upper GI bleeding (B7.1) D4: the OV/GOV/IGV line cites Sarin (B6.14) with a link.
- Tests: B8.6 vectors for EREFS, Spigelman and every OLGA/OLGIM matrix cell; every new card's table, clinical use, notes, links and PubMed PMIDs against SPEC.md; every search alias.

## 0.9.0 (2026-11-27)

Update from Baveno VII to Baveno VIII (Baveno VIII Faculty. J Hepatol 2026;85:993-1018. PMID 42624290). "Baveno VII" is replaced by "Baveno VIII" in every name, text and reference in the app and SPEC.md; "Baveno VI criteria" is kept where cited as such. Earlier CHANGELOG entries are left as written.
- Baveno VIII non-invasive portal hypertension calculator (B3.19), new id `baveno8`. The old id `baveno7` opens it, so links, favorites and recent items keep working. Inputs: LSM, etiology (viral, alcohol, MASLD, other), platelets, spleen stiffness (SSM), BMI 30 or more (MASLD), eligibility for carvedilol or a non-selective beta-blocker. Shows cACLD (with the PSVD line below 10 kPa and "repeat fasting LSM" from 10 kPa), CSPH ruled in (LSM ≥25 in viral, alcohol or non-obese MASLD; SSM >55 kPa), ruled out (LSM ≤15 and platelets ≥150) or indeterminate, the obese MASLD line, treatment (carvedilol preferred), screening endoscopy (Baveno VI criteria or SSM <40 kPa), the rule of five, the 12-month repeat note and the stages of cirrhosis.
- FibroScan (B3.20): the portal hypertension line follows Baveno VIII; new "BMI 30 or more" tick box for MASLD; obese MASLD and Other/mixed never show CSPH ruled in from LSM; "cACLD ruled out" below 10 kPa; link to the Baveno VIII calculator.
- Upper GI bleeding (B7.1): erythromycin 30–90 minutes before endoscopy. Variceal pathway rewritten to Baveno VIII: care setting, intubation, transfusion target Hb 7–8 g/dL, antibiotic duration, lactulose, nutrition, no routine fresh frozen plasma, platelets, fibrinogen, recombinant factor VIIa or tranexamic acid, anticoagulants held; endoscopy within 12 h and CT or MRI in every bleed; new decision "Bleeding source?" (OV or GOV1: band ligation and the pre-emptive TIPS decision; GOV2 or IGV1: cyanoacrylate then TIPS); pre-emptive TIPS criteria (HVPG 20 mmHg or more), covered stent and the missed-window line; shorter vasoactive course; covered metal stent over balloon tamponade; salvage TIPS considered for every patient with refractory bleeding (replaces "not recommended if Child-Pugh >13"); before discharge carvedilol preferred, band ligation every 2–4 weeks, iron, transplant evaluation. Child-Pugh suggestion rules unchanged.
- HRS-AKI (B7.10): terlipressin preferably by continuous infusion, starting 2–3 mg/24 h; escalation and stop rules kept.
- SBP (B7.9): stop secondary prophylaxis on recompensation; data insufficient for rifaximin as secondary prophylaxis.
- Hepatic encephalopathy (B7.11): recurrent or persistent HE despite optimal therapy: shunt embolization, transplant evaluation, L-ornithine L-aspartate.
- Tests for every rule, path and test vector (B8.3, B8.8), the old-id redirect, and a check that "Baveno VII" appears nowhere in the app or SPEC.md.
- Clinical owner decisions on the review (SPEC.md B3.19, B3.20, B7.0, B7.1, B7.10, B8.3 and B8.9 updated in the same change):
  - Other etiology with LSM 25 kPa or more (calculator and FibroScan Other/mixed): "LSM 25 kPa or more suggests CSPH, but this rule is validated only in viral, alcohol and non-obese MASLD; confirm with SSM or HVPG."
  - Rule-out and SSM >55 kPa both met: "Discordant results: … Consider HVPG or specialist review." No CSPH conclusion and no treatment line.
  - New tick box "Clinical or imaging signs of portal hypertension (varices, collaterals, splenomegaly, ascites)"; the PSVD line shows only with LSM <10 kPa and the box ticked. Spelled "portosinusoidal vascular disorder (PSVD)".
  - Upper GI bleeding step 1 shows both transfusion targets (non-variceal 7–9 g/dL; suspected variceal 7–8 g/dL, Baveno VIII). Lactulose once, before endoscopy: "to prevent or treat overt hepatic encephalopathy; continue during admission". GOV2 or IGV1 TIPS: "Child-Pugh score <14 (Child-Pugh A, B, or C up to 13)". Child-Pugh 14–15 note: "Pre-emptive TIPS criteria not met (Child-Pugh >13). Salvage TIPS can still be considered if bleeding is refractory."
  - HRS-AKI terlipressin dose row: continuous infusion labelled "Preferred", IV bolus "Alternative".

## 0.8.1 (2026-11-27)

Fix: lab values entered in SI units could fall just below a cutoff because of floating-point conversion (SPEC.md B1.5 and B8.1 updated in the same change).
- Converted values are now rounded to 12 significant digits before any comparison (`js/units.js`, helper `tidy` in `js/num.js`), so an exact equivalent counts as the cutoff: 205.2 µmol/L bilirubin = 12 mg/dL, 132.6 µmol/L creatinine = 1.5 mg/dL.
- Cases that were wrong before the fix: ACLF grade at bilirubin 205.2 µmol/L (liver failure missed) and creatinine 132.6 µmol/L (kidney dysfunction missed); CLIF-C OF at 102.6 and 205.2 µmol/L bilirubin and 309.4 µmol/L creatinine (protected in 0.8.0 by a local workaround, now removed).
- SAAG: the difference of the two albumins is rounded the same way, so 3.3 − 2.2 g/dL (or 33 − 22 g/L) gives 1.1 and counts as portal hypertension. This was wrong in either unit.
- New `tests/unit_cutoffs.test.js`: every cutoff of every calculator with a unit toggle, at its exact equivalent in the other unit, gives the same result as the entry in the formula's unit; cutoffs written in both units are checked as written; a coverage test lists every converted input as tested, an identity conversion (platelets, WBC) or a cutoff with no exact equivalent (a repeating decimal). Removing the fix makes these tests fail.
- Each one-unit cutoff is also tested just across (for example 205.2 µmol/L is liver failure and 205.1 is not).

## 0.8.0 (2026-11-27)

- New emergency page B7.20 Acute-on-chronic liver failure (`em_aclf`), bedside algorithm design (B7.0), listed as "ACLF" after Acute liver failure in the emergency index (18 entries). Search "ACLF" or "acute-on-chronic liver failure" finds it.
  - Red flags (ICU within 6 hours), Recognize, step 1 with the built-in ACLF grade and precipitant screen, ICU decision, precipitant treatment (links to B7.1, B7.8, B7.9), organ support by failing organ (links to B7.10, B7.11), early transplant referral, and the day 3–7 prognosis decision with the built-in CLIF-C ACLF score.
  - Suggested "Yes" on the day 3–7 decision when the CLIF-C ACLF score shown is above 70 (clinical owner decision).
  - Weight field: continuous renal replacement therapy 25–30 mL/kg/h, and energy, protein and IV glucose targets (labelled "Target, not a dose"). Hydrocortisone 50 mg IV every 6 hours (200 mg/day) as a fixed dose.
  - Sources with exact PubMed links: EASL ACLF 2023, ACG ACLF 2022, CANONIC 2013, CLIF-C ACLF 2014, Gustot 2015, Artru 2017, GRAFT 2021, CONFIRM 2021.
- New calculator B3.21 CLIF-C OF and CLIF-C ACLF score (`clif_c_aclf`, Liver; 45 calculators). Six organs scored 1–3, CLIF-C ACLF = 10 × (0.33 × OF + 0.04 × age + 0.63 × ln WBC − 2), shown as a whole number; band above 70 or 70 or less. Bilirubin and creatinine in SI are converted to mg/dL; converted values are compared after trimming floating-point noise so exact SI equivalents of a cutoff score correctly.
- ACLF grade (B3.17): every result links to the new page; CANONIC citation now links to PubMed (PMID 23474284).
- SPEC.md: B1.1, B3 intro, B3.17, new B3.21, B7 intro, B7.0 (dose and suggestion tables), B7.19, new B7.20, B8.3, B8.7, B8.8, B8.9 and B9. B7.19 now correctly says 18 pages.
- Clinical owner decisions on the review (SPEC.md B3.17, B3.21, B7.0, B7.19, B7.20, B8.3, B8.7, B8.9 and B9 updated in the same change):
  - CLIF-C ACLF counts organ failures from its inputs by the EASL-CLIF definitions and shows the count and organs. The day 3–7 decision suggests "Yes" when the score is above 70 or there are 4 or more organ failures; the transplant option stays with the clinician.
  - The score is shown to 1 decimal place and the >70 cutoff uses the unrounded value (70.4 is above 70). No mortality bands; above 70 the result shows the Engelmann, Crit Care 2018 note (PMID 30305132), also added to the sources.
  - "6 mL/kg predicted body weight" (text only) and "effluent dose 25–30 mL/kg/h" on the page, the doses table and the calculated line.
  - Emergency index name: "Acute-on-chronic liver failure (ACLF)", after Acute liver failure.
  - The ACLF grade calculator links to the page for ACLF grade 1–3 only.

## 0.7.0 (2026-11-27)

The remaining twelve emergency pages are now bedside algorithms (SPEC.md B7.0): lower GI bleeding, anticoagulants and antiplatelets, toxic megacolon, acute liver failure, severe alcohol-associated hepatitis, HRS-AKI, overt hepatic encephalopathy, foreign body, caustic ingestion, Ogilvie syndrome, colonic volvulus and iatrogenic perforation. Every emergency page now uses the same design.
- Every line, dose and source of the classic pages is kept. `tests/fixtures/b7_classic_0.6.2.md` holds the classic text, and `tests/carryover.test.js` checks that every clause, table row, source line, note and related calculator is still on its page.
- Red flags, step cards with timeline chips, decisions and "why" lines as specified by the clinical owner; new built-in calculators in the steps: Oakland, ACLF grade (red flags), MELD, Maddrey, GAHS, ABIC, Lille, King's College criteria, West Haven, Zargar (the B6 table card, tap a row) and the new Jalan checklist.
- New calculator B5.10 Jalan criteria for toxic megacolon (checklist, IBD category; 44 calculators).
- "Suggested" answers where a built-in calculator alone settles the answer: Oakland ≤8; King's College criteria met (Yes only); Lille ≥0.45; West Haven grade 3–4; Zargar grade group (none for grade 4).
- Weight-based doses (weight field only on these pages): 4-factor prothrombin complex concentrate for each INR band with its cap, N-acetylcysteine 150, 50 and 100 mg/kg (with the note on local dosing-weight caps), albumin challenge 1 and 1.5 g/kg in grams and mL of 20% and 25% albumin, and the protein target (labelled "Target, not a dose").
- Exact PubMed links, with the PMID at the end of the citation, for the 19 sources listed by the clinical owner, wherever they are cited (including the Oakland, Lille and West Haven calculators and the Zargar card).
- Fix found while testing: on a page with weight-based doses but no red flags box (anticoagulants), the weight field now shows before the first block.
- Clinical owner decisions on the review (SPEC.md B7.0, B7.4, B7.6, B7.7, B7.8, B7.14, B7.15, B8.7 to B8.9 and B9 updated in the same change):
  - Anticoagulants: red flags box added (hemodynamic instability despite resuscitation, ongoing transfusion need, or bleeding into a critical site: treat as life-threatening; ICU; reversal with hematology input). "INR below 2: no label dose; discuss with hematology." Andexanet alfa or 4-factor prothrombin complex concentrate for apixaban or rivaroxaban: "dose per product label or local protocol, with hematology" (step and doses row; no dose calculated). Vitamin K and idarucizumab rows confirmed.
  - N-acetylcysteine: dosing weight capped at 100 kg ("Dosing weight capped at 100 kg (US label); follow local protocol."); 150 kg gives 15000, 5000 and 10000 mg.
  - King's College: "Yes" is the only suggestion; "Not met may mean incomplete data; reassess at least daily."
  - Caustic: grade 3b adds monitoring for perforation, enteral nutrition and stricture surveillance from about 3 weeks if no surgery; new answer "Grade 4 (perforation): emergency surgery", suggested by Zargar grade 4. Surveillance source: Hirota WK et al., ASGE 2006 (PMID 16564854).
  - Naveed (ASGE 2020) and Paspatis (ESGE 2020) now link to PubMed (PMID 31791596, 32781470); the DOI stays in the citation.
  - Toxic megacolon: methylprednisolone 60 mg IV every 24 hours; vancomycin orally or by nasogastric tube (never IV for C. difficile); metronidazole IV.
  - Alcohol-associated hepatitis: MELD or MELD-Na (not MELD 3.0); "Thresholds (>20; 21–51) come from studies using MELD."
  - Foreign body red flags: emergent endoscopy (within 2 h, at most 6 h); airway compromise: secure the airway first (ICU or anesthesia); perforation signs: CT and surgical review.
- SPEC.md: B1.1, B1.6, B5 intro, new B5.10, B7 intro, B7.0, B7.3, B7.4, B7.6 to B7.8, B7.10, B7.11, B7.14 to B7.18, B8.5, B8.7, B8.8, B8.9 and B9. Engine: a B6 table card can be built into a step and report the tapped row.

## 0.6.2 (2026-11-27)

Upper GI bleeding page, clinical owner changes (SPEC.md B7.0, B7.1, B7.2, B7.19, B8.8 and B9 updated in the same change):
- Step 1 "First hour, all patients" now starts the high-dose IV proton pump inhibitor (pantoprazole or esomeprazole 80 mg IV bolus, then 8 mg/h until endoscopy; do not delay endoscopy for it), with a second why line (Sreedharan, Cochrane 2010; ESGE 2021). "High-dose IV proton pump inhibitor may be started" is removed from the non-variceal step. Steps can now carry more than one why line.
- Variceal pathway: new step "Variceal: after endoscopy" before the pre-emptive TIPS decision (continue vasoactive drug 2–5 days; continue ceftriaxone, up to 7 days in total; stop the proton pump inhibitor unless another indication; lactulose). Lactulose and stopping the proton pump inhibitor moved there from "Before discharge", which adds "After eradication: endoscopy at 3–6 months, then every 6–12 months (AASLD 2017)."
- Non-variceal pathway: high-risk stigmata continue the infusion for 72 hours after endoscopy (or 40 mg IV twice daily), then oral twice daily to day 14, then once daily; low-risk stigmata stop the infusion, oral once daily, early feeding, consider discharge; new step "No routine second-look endoscopy; repeat only if rebleeding (ESGE 2021, ACG 2021)". Rebleeding and discharge steps unchanged.
- Key differences table: new "Proton pump inhibitor" row.
- "Variceal bleeding" removed from the emergency list (17 entries). Its search words (variceal bleeding, varices, esophageal varices, terlipressin, TIPS, band ligation) belong to the upper GI bleeding page and open it at the variceal pathway; terlipressin also lists the HRS-AKI page. Old links, favorites and recent items pointing to em\_variceal redirect to the variceal pathway. `content/emergencies/em_variceal.js` removed (service worker updated).
- Step ids renumbered on this page (V3 to V7, N5 to N7); B8.8 vectors updated.
- Exact PubMed links: ESGE 2021 (PMID 33567467) and ACG 2021 (PMID 33929377), also in the GBS and Forrest calculators; new sources Sreedharan, Cochrane 2010 (PMID 20614440) and Garcia-Tsao, AASLD 2017 (PMID 27786365).

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
