# Changelog

All notable changes to GI Toolkit. Clinical content comes only from SPEC.md.

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
