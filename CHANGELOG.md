# Changelog

All notable changes to GI Toolkit. Clinical content comes only from SPEC.md.

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
