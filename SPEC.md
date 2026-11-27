# GI Toolkit App: Build Plan and Clinical Spec

Nov 26, 2026 · Dr. Abdulaziz Altamimi

You can have your own GI calculator and emergency app on your iPhone home screen in one weekend, free, using GitHub and Claude Code. This doc has two parts:

| Part | Who it is for | What to do with it |
| --- | --- | --- |
| A (A1 to A3) | You | Follow it step by step to create the app |
| B (B1 to B9) | Claude Code | Export this whole doc as Markdown, name the file `SPEC.md`, and upload it to your GitHub repository. Claude Code builds the app from it |

Every formula, cutoff and management step in Part B was written from guidelines and original papers, but **you must verify each one before clinical use**. Part B8 gives test cases so each calculator can be checked against MDCalc or a hand calculation.

## Part A1: What you need before starting

You need two accounts (GitHub and a paid Claude plan) and an iPhone; a computer is optional. Claude Code on the web runs in Anthropic's cloud, so nothing needs installing. [Cloud sessions are available on Pro, Max, Ultra, and Team plans](https://code.claude.com/docs/en/web-quickstart.md), and they can be started from a browser or the Claude iPhone app.

| Item | Why you need it | Cost |
| --- | --- | --- |
| GitHub account | Stores your app's code and hosts the app for free (GitHub Pages) | Free |
| Claude Pro (or higher) plan | Gives you Claude Code on the web, which writes and updates the app | Your existing subscription; sessions count toward your plan's usage limits |
| iPhone with Safari | To open the app and add it to your home screen | None |
| Computer (optional) | Easier for reviewing changes on a large screen; not required | None |
| Your own domain (optional) | A short name such as gitoolkit.com instead of the GitHub link | About $10–15 per year |

**One decision to make now: public or private code.** [GitHub Pages is available in public repositories with GitHub Free, and in private repositories only with paid plans such as GitHub Pro](https://GitHub.com/apps/github-pages). A public repository means anyone can see the code, but not who uses it. That is fine for a calculator with no patient data. If you want the code private, either upgrade to GitHub Pro or host on Cloudflare Pages, which is free and works with private repositories.

## Part A2: Step-by-step plan

The build takes 10 steps and four Claude Code sessions (one per phase). Splitting into phases keeps each session within your plan's usage limits and lets you check each part before the next.

1. **Create your GitHub account.** Go to github.com and tap Sign up. Choose a short username, because it appears in your app's link (for example `aaltamimi-gi` gives `aaltamimi-gi.github.io`). Turn on two-factor authentication in Settings, then Password and authentication.
2. **Create the repository (the app's folder).** Tap + then New repository. Name it `gi-toolkit`, choose Public (see A1), tick Add a README file, then Create repository.
3. **Upload this spec.** Export this doc as Markdown (I also sent it to you in the chat as `SPEC.md`). In the repository, tap Add file, then Upload files, choose `SPEC.md`, then Commit changes.
4. **Connect Claude Code to GitHub.** Open claude.ai/code in a browser, or the Code tab in the Claude app. Follow the prompt to connect GitHub and install the Claude GitHub App, and give it access to `gi-toolkit`. Select `gi-toolkit` as the repository for the session.
5. **Phase 1 session: app shell, GI bleeding and liver.** Paste prompt 1 below. Claude Code works in the cloud, then pushes a branch and opens a pull request (a proposed change for you to approve).
6. **Approve the change.** In GitHub, open Pull requests, read Claude's summary, then tap Merge pull request and Confirm merge.
7. **Turn on free hosting (once only).** In the repository, open Settings, then Pages. Under Build and deployment, set Source to Deploy from a branch, Branch to `main` and folder to `/ (root)`, then Save. After 1–2 minutes your link appears at the top: `https://USERNAME.github.io/gi-toolkit/`.
8. **Put it on your iPhone.** Open the link in Safari, tap Share, then Add to Home Screen, name it GI Toolkit, then Add. It now opens full screen like an app and works offline.
9. **Phases 2 to 4.** Start a new Claude Code session for each with prompts 2, 3 and 4, then merge each pull request as in step 6. The app on your phone updates itself the next time you open it with internet.
10. **Verify before clinical use.** Follow Part A3 before you rely on any calculator.

### Prompts to paste into Claude Code

**Prompt 1 (Phase 1):**

> Read SPEC.md completely. It is the specification for a GI calculator and emergency reference web app that will be hosted on GitHub Pages and installed on iPhones from Safari. First create CLAUDE.md that contains the Build Rules from section B1.2 word for word, so every future session follows them. Then build Phase 1 as defined in B1.9: the app shell, offline PWA setup, unit handling, and every calculator in sections B2 and B3. Implement every formula, point value, cutoff and interpretation exactly as written in SPEC.md. Do not change, round or add clinical content. Write unit tests from the test vectors in section B8 and run them; all must pass. Then open a pull request with a summary of what you built and a list of any spec line you found ambiguous.

**Prompt 2 (Phase 2):**

> Read CLAUDE.md and SPEC.md. Build Phase 2 as defined in B1.9: every calculator in sections B4 and B5, using the same engine and rules. Add the B8 test vectors for these calculators and run all tests. Open a pull request with a summary and any ambiguities.

**Prompt 3 (Phase 3):**

> Read CLAUDE.md and SPEC.md. Build Phase 3 as defined in B1.9: the classification reference cards in section B6 and the emergency pages in section B7, with links from each emergency page to its related calculators. Keep all doses, thresholds and timings exactly as written. Run all tests and open a pull request.

**Prompt 4 (Phase 4):**

> Read CLAUDE.md and SPEC.md. Build Phase 4 as defined in B1.9: dark mode, app icons, and an accessibility check (English only; no language option). Then re-check every calculator against its B8 test vectors and list the results in the pull request.

**Prompt for any later fix (edit the brackets):**

> Read CLAUDE.md. In the \[calculator name\], change \[what is wrong\] to \[what it should be\], based on \[guideline or paper\]. Update SPEC.md and the test for it, run all tests, add a CHANGELOG.md entry, and open a pull request.

## Part A3: Testing, safety, updates and sharing

The app is only as safe as its formulas, so check every calculator before you use it clinically. After that, keeping it updated takes minutes.

| Area | What to do |
| --- | --- |
| Check each calculator | Enter the B8 test case and confirm the result matches. Then enter 2–3 of your own cases and compare with MDCalc or a hand calculation |
| Second reviewer | Ask one colleague to check each category independently before you share widely |
| Keep a record | Note each clinical review (date and reviewer) in CHANGELOG.md; the app itself does not display a review date or reviewer |
| Patient privacy | The app stores nothing except favorites and unit choice on the phone, and sends no data anywhere. Never add patient name or MRN fields |
| Updating | When a guideline changes, use the "later fix" prompt in A2, then merge. The app updates on every phone the next time it opens online |
| Sharing | Send the link by WhatsApp. On iPhone: Safari, Share, Add to Home Screen. On Android: Chrome menu, Install app or Add to Home screen |
| Regulation | Personal and departmental use as a reference is straightforward. If you ever sell it or market it to patients, check the SFDA digital health guidance (MDS-G027) on whether it counts as medical device software |

Costs summary: GitHub free, hosting free, Claude plan you already pay for. Optional extras are a domain (about $10–15 per year) or private code (GitHub Pro).

## Part B1: Technical spec for Claude Code

Build a static, offline-capable web app (PWA) named **GI Toolkit**, in plain HTML, CSS and JavaScript, hosted on GitHub Pages from the repository root. Users are gastroenterology fellows and consultants using an iPhone at the bedside.

### B1.1 Scope

- 43 calculators and selectable cards (B2 to B5), 8 classification reference cards (B6), and 17 emergency pages (B7) listed as 18 emergency index entries; five emergency pages are interactive bedside algorithms (B7.0).
- Everything works offline after the first load.
- English interface only; no language option.

### B1.2 Build Rules (copy word for word into CLAUDE.md)

1. Clinical content comes only from SPEC.md. Never invent, round, simplify or "improve" a formula, point value, cutoff, dose, timing or interpretation. If something is ambiguous or looks wrong, do not guess: implement nothing for that item and list it in the pull request.
2. Every calculator screen shows: inputs with units, the result, the interpretation band, the suggested action exactly as written in the spec, a points breakdown, and the reference with a link.
3. Every calculator has unit tests built from section B8. All tests must pass before opening a pull request.
4. No patient data is stored or sent anywhere. No analytics, no trackers, no external fonts or scripts, no network calls at runtime. Only favorites, recent items, unit choices and theme are stored in localStorage.
5. Plain HTML, CSS and JavaScript ES modules. No framework, no npm dependencies, no build step. Tests run with Node's built-in test runner (`node --test`).
6. Use relative paths everywhere (the site lives under `/gi-toolkit/`). Add an empty `.nojekyll` file at the root.
7. Write drug names in full, never abbreviated (for example terlipressin, not TP).
8. Mobile first: works from 320 px wide, touch targets at least 44 px, readable in sunlight, usable one-handed.
9. Show the app version and "Designed by Dr. Abdulaziz Altamimi" in the footer and About page. Do not show a clinical review date or reviewer. Record every change in CHANGELOG.md.
10. Keep SPEC.md as the single source of truth. When clinical content changes, update SPEC.md and its test in the same pull request.
11. English only, with no language option. Do not add: a first-launch disclaimer, a Disclaimer section, the footer "Decision support only. Verify with clinical judgment and local protocols." on any screen, the footer "Check local protocol, renal function and allergies before prescribing." on emergency pages, or a "Last clinical review" date or reviewer anywhere (the clinical owner removed these).

### B1.3 File structure

```
/index.html               single page, hash-based router (#/calc/gbs)
/manifest.webmanifest
/sw.js                    service worker, versioned cache
/.nojekyll
/css/app.css
/js/app.js                router, home, search, favorites, settings
/js/engine.js             renders any calculator from its definition
/js/units.js              unit conversion helpers
/js/calculators/<category>/<id>.js   one file per calculator
/js/registry.js           list of all calculators, cards and emergencies
/content/cards/<id>.js    classification reference cards (B6)
/content/emergencies/<id>.js         emergency pages (B7)
/icons/                   apple-touch-icon 180x180, 192, 512, maskable 512
/tests/<id>.test.js
/SPEC.md  /CLAUDE.md  /README.md  /CHANGELOG.md
```

### B1.4 Calculator definition (data model)

Each calculator is one object, so new scores are added without touching the UI code:

```
export default {
  id: "gbs",
  name: "Glasgow-Blatchford Score",
  aliases: ["GBS", "Blatchford", "upper GI bleed"],
  category: "bleeding",
  inputs: [
    { id: "urea", label: "Urea", type: "number", unit: "mmol/L",
      altUnits: [{ unit: "BUN mg/dL", toBase: v => v * 0.357 }], min: 0, max: 100 },
    { id: "melena", label: "Melena", type: "checkbox", points: 1 },
    { id: "sex", label: "Sex", type: "radio", options: [{label:"Male", value:"M"}, {label:"Female", value:"F"}] }
  ],
  compute(values) { return { score, breakdown: [{ item, points }] }; },
  interpret(result) { return { band: "low|intermediate|high", text, action }; },
  references: [{ citation: "...", url: "https://..." }],
  notes: "..."
};
```

### B1.5 Units

Saudi laboratories report SI units, so SI is the default; every lab field has a toggle to conventional units. Convert at input and compute in the unit the original formula uses. Remember each field's unit choice.

Cutoffs written in both units: where a criterion or band gives a cutoff in both units (for example "albumin <3.0 g/dL (<30 g/L)" or "bilirubin ≥2 mg/dL (≥34 µmol/L)"), compare the value in the unit the user entered with the cutoff written for that unit, without converting. This applies to every calculator (B2 to B5). Where only one unit is given, and for formulas, convert the entry to that unit.

| Analyte | SI unit | Conventional unit | Conversion |
| --- | --- | --- | --- |
| Bilirubin | µmol/L | mg/dL | mg/dL = µmol/L ÷ 17.1 |
| Creatinine | µmol/L | mg/dL | mg/dL = µmol/L ÷ 88.4 |
| Urea / BUN | urea mmol/L | BUN mg/dL | urea mmol/L = BUN mg/dL × 0.357 |
| Albumin | g/L | g/dL | g/dL = g/L ÷ 10 |
| Hemoglobin | g/L | g/dL | g/dL = g/L ÷ 10 |
| Glucose | mmol/L | mg/dL | mg/dL = mmol/L × 18 |
| Calcium | mmol/L | mg/dL | mg/dL = mmol/L × 4.0 |
| Platelets, WBC | ×10⁹/L | ×10³/µL | same number |

### B1.6 Screens

| Screen | Content |
| --- | --- |
| Home | Search bar matching names, aliases and tags; category tiles (GI bleeding, Liver, Pancreas and biliary, IBD, Endoscopy classifications, Emergencies); Favorites (star); Recent (last 10) |
| Calculator | Inputs; sticky result card that updates live; band label plus color (green low, amber intermediate, red high; text label always shown, never color alone); interpretation; action; points breakdown; references; "Copy result" (one line, e.g. "GBS 7, not low risk", no identifiers) |
| Classification card | Title, table, one-line clinical use, reference |
| Emergency page | Sections: Recognize, Do now, Within hours, Then, Avoid, Doses table; buttons to related calculators; reference list |
| Bedside algorithm page (B7.0) | Red flags box; weight field (kg, never stored); Recognize; step cards with timeline chips, decision buttons, built-in calculators, weight-based doses and why lines; Show full algorithm toggle; Avoid; tables; Doses; buttons to related calculators; reference list |
| About | Version; "Designed by Dr. Abdulaziz Altamimi"; the line "All formulas, cutoffs and recommendations are based on published guidelines and original papers. Each calculator lists its sources."; privacy |
| Settings | Default units (SI or conventional), theme |

### B1.7 PWA and iPhone details

- `manifest.webmanifest`: name "GI Toolkit", short\_name "GI Toolkit", `display: standalone`, `start_url: "./"`, `scope: "./"`, theme and background colors, icons 192 and 512 plus maskable.
- In `index.html`: `apple-touch-icon` (180x180), `apple-mobile-web-app-capable`, `apple-mobile-web-app-title`, `viewport-fit=cover`, and safe-area padding for the iPhone notch.
- Service worker caches every app file on install (cache-first). The cache name includes the version; when a new version is found, show "Update available, tap to refresh".

### B1.8 Design

Clean clinical look, system font, high contrast, no decoration. Drug classes are written in full with the abbreviation in brackets at first use on each page, for example "proton pump inhibitor (PPI)"; later uses on the same page may use the abbreviation. One column on phones; two columns from 768 px. Numeric inputs use `inputmode="decimal"`. Results never round silently: show the rounding rule used.

### B1.9 Phases

| Phase | Content | Done when |
| --- | --- | --- |
| 1 | App shell, PWA, units, all of B2 (bleeding) and B3 (liver) | Installs on iPhone, works offline, B8 tests pass |
| 2 | B4 (pancreatobiliary) and B5 (IBD) | B8 tests pass |
| 3 | B6 reference cards and B7 emergency pages with links to calculators | All pages reachable from search |
| 4 | Dark mode, icons, accessibility, full re-check (English only) | Every B8 test listed as passing in the pull request |

## Part B2: GI bleeding scores

Five tools: three risk scores for upper GI bleeding, one for lower GI bleeding, and the Forrest classification. Boundaries: "a–b" means a ≤ value < next band's lower limit, unless written otherwise.

### B2.1 Glasgow-Blatchford Score (id: gbs)

Use: pre-endoscopy, upper GI bleeding, need for intervention. Range 0–23. Source: [Blatchford, Lancet 2000; points table](https://pmc.ncbi.nlm.nih.gov/articles/PMC5299211/table/tab2d).

| Item | Value | Points |
| --- | --- | --- |
| Urea (mmol/L) | <6.5 / 6.5 to <8.0 / 8.0 to <10.0 / 10.0 to 25.0 / >25.0 | 0 / 2 / 3 / 4 / 6 |
| Hemoglobin, men (g/dL) | ≥13.0 / 12.0 to <13.0 / 10.0 to <12.0 / <10.0 | 0 / 1 / 3 / 6 |
| Hemoglobin, women (g/dL) | ≥12.0 / 10.0 to <12.0 / <10.0 | 0 / 1 / 6 |
| Systolic BP (mmHg) | ≥110 / 100–109 / 90–99 / <90 | 0 / 1 / 2 / 3 |
| Pulse ≥100/min | yes | 1 |
| Presentation with melena | yes | 1 |
| Presentation with syncope | yes | 2 |
| Hepatic disease (history or clinical/lab evidence) | yes | 2 |
| Cardiac failure (history or clinical/echo evidence) | yes | 2 |

Inputs: urea in mmol/L or BUN in mg/dL (convert with B1.5); hemoglobin in g/L or g/dL.

| Score | Band | Action text |
| --- | --- | --- |
| 0–1 | Low | Very low risk. ACG 2021 and ESGE 2021: outpatient management without inpatient endoscopy can be considered. |
| ≥2 | Not low | Admit. Resuscitate, then upper endoscopy within 24 hours. Higher scores mean higher need for transfusion or intervention. |

Note shown under result: "In high-risk patients (GBS ≥12), urgent endoscopy within 6 hours did not lower 30-day mortality compared with 6–24 hours (Lau, NEJM 2020)."

### B2.2 AIMS65 (id: aims65)

Use: in-hospital mortality in upper GI bleeding. One point each, range 0–5. Source: Saltzman, Gastrointest Endosc 2011.

| Item | Criterion |
| --- | --- |
| A, Albumin | <3.0 g/dL (<30 g/L) |
| I, INR | >1.5 |
| M, Mental status | Altered (GCS <14, disorientation, lethargy, stupor or coma) |
| S, Systolic BP | ≤90 mmHg |
| 65, Age | ≥65 years (MDCalc convention) |

| Score | In-hospital mortality |
| --- | --- |
| 0 | 0.3% |
| 1 | 1.2% |
| 2 | 5.3% |
| 3 | 10.3% |
| 4 | 16.5% |
| 5 | 24.5% |

Band: 0–1 low; ≥2 high ("Score ≥2 identifies higher mortality risk; consider monitored bed").

### B2.3 Rockall Score (id: rockall)

Use: rebleeding and mortality. Two modes on one screen: pre-endoscopy (first three items, 0–7) and complete (all five, 0–11). Source: Rockall, Gut 1996; [table](https://pmc.ncbi.nlm.nih.gov/articles/PMC4753192/table/T1).

| Item | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| Age | <60 | 60–79 | ≥80 |  |
| Shock | None: SBP ≥100 and pulse <100 | Tachycardia: SBP ≥100 and pulse ≥100 | Hypotension: SBP <100 |  |
| Comorbidity | None major |  | Cardiac failure, ischemic heart disease, any major comorbidity | Renal failure, liver failure, disseminated malignancy |
| Diagnosis | Mallory-Weiss tear, or no lesion and no stigmata | All other diagnoses | Upper GI malignancy |  |
| Stigmata of recent hemorrhage | None or dark spot only |  | Blood in upper GI tract, adherent clot, visible or spurting vessel |  |

Shock is derived automatically from SBP and pulse inputs. Interpretation: pre-endoscopy score 0 = low risk; pre-endoscopy score ≥1 = not low risk. Complete score 0–2 = low risk of rebleeding and death; complete score 3–7 = intermediate risk; complete score ≥8 = high risk.

### B2.4 Oakland Score (id: oakland)

Use: safe discharge in acute lower GI bleeding. Range 0–35. Source: Oakland, Lancet Gastroenterol Hepatol 2017; threshold endorsed by [ACG 2023](https://gastroenterology.acponline.org/archives/2023/03/24/2.htm) and BSG 2019.

| Item | Value | Points |
| --- | --- | --- |
| Age (years) | <40 / 40–69 / ≥70 | 0 / 1 / 2 |
| Sex | Female / Male | 0 / 1 |
| Previous admission for lower GI bleeding | No / Yes | 0 / 1 |
| Digital rectal exam | No blood / Blood | 0 / 1 |
| Heart rate (/min) | <70 / 70–89 / 90–109 / ≥110 | 0 / 1 / 2 / 3 |
| Systolic BP (mmHg) | <90 / 90–119 / 120–129 / 130–159 / ≥160 | 5 / 4 / 3 / 2 / 0 |
| Hemoglobin (g/L) | <70 / 70–89 / 90–109 / 110–129 / 130–159 / ≥160 | 22 / 17 / 13 / 8 / 4 / 0 |

| Score | Band | Action text |
| --- | --- | --- |
| ≤8 | Low | About 95% probability of safe discharge. Consider early discharge with outpatient colonoscopy if no other reason to admit (ACG 2023, BSG 2019). |
| >8 | Not low | Admit for inpatient management. |

### B2.5 Forrest classification (id: forrest; reference card with selection)

Use: peptic ulcer stigmata at endoscopy. User taps a class; app shows rebleeding risk and action. Rebleeding risk without endoscopic therapy: Laine and Peterson, NEJM 1994. Actions: ACG 2021 upper GI bleeding guideline.

| Class | Finding | Rebleeding risk without endoscopic therapy | Action |
| --- | --- | --- | --- |
| Ia | Active spurting | 55% (active bleeding, Ia and Ib combined) | Endoscopic therapy, then high-dose proton pump inhibitor (PPI) |
| Ib | Active oozing | 55% (combined with Ia) | Endoscopic therapy, then high-dose proton pump inhibitor (PPI) |
| IIa | Non-bleeding visible vessel | 43% | Endoscopic therapy, then high-dose proton pump inhibitor (PPI) |
| IIb | Adherent clot | 22% | Consider clot removal and treat the underlying stigma; high-dose proton pump inhibitor (PPI) |
| IIc | Flat pigmented spot | 10% | No endoscopic therapy; standard proton pump inhibitor (PPI) |
| III | Clean base | 5% | No endoscopic therapy; standard proton pump inhibitor (PPI); early feeding and discharge if otherwise stable |

High-dose PPI after endoscopic hemostasis: continuous or intermittent high dose for 3 days, then twice daily to complete 2 weeks, then once daily (ACG 2021).

## Part B3: Liver scores

Twenty liver tools. Formulas use natural log (ln) unless written log10. Apply every bound before calculating.

### B3.1 Child-Pugh (id: child\_pugh)

Range 5–15. Toggle "Cholestatic disease (PBC or PSC)" switches the bilirubin row to the cholestatic cutoffs.

| Item | 1 point | 2 points | 3 points |
| --- | --- | --- | --- |
| Bilirubin | <2 mg/dL (<34 µmol/L) | 2–3 mg/dL (34–50 µmol/L) | >3 mg/dL (>50 µmol/L) |
| Bilirubin, cholestatic toggle | <4 mg/dL (<68 µmol/L) | 4–10 mg/dL (68–170 µmol/L) | >10 mg/dL (>170 µmol/L) |
| Albumin | >3.5 g/dL (>35 g/L) | 2.8–3.5 g/dL (28–35 g/L) | <2.8 g/dL (<28 g/L) |
| INR | <1.7 | 1.7–2.3 | >2.3 |
| Ascites | None | Mild, or controlled with diuretics | Moderate to severe, or refractory |
| Hepatic encephalopathy | None | Grade 1–2, or controlled with medication | Grade 3–4, or refractory |

| Score | Class | Commonly cited survival (1 year / 2 years) |
| --- | --- | --- |
| 5–6 | A | 100% / 85% |
| 7–9 | B | 80% / 60% |
| 10–15 | C | 45% / 35% |

### B3.2 MELD and MELD-Na (id: meld\_na)

Show both the original MELD and MELD-Na (OPTN policy 2016–2023). Source: OPTN; Kamath, Hepatology 2001.

Bounds: bilirubin, INR and creatinine below 1.0 are set to 1.0. Creatinine above 4.0 is set to 4.0. If dialysis at least twice in the past 7 days, or CVVHD for 24 hours in the past 7 days, creatinine = 4.0. Sodium is bounded to 125–137 mmol/L.

```latex
\text{MELD(i)} = 10 \times \left[0.957\ln(\text{Cr}) + 0.378\ln(\text{Bili}) + 1.120\ln(\text{INR}) + 0.643\right]
```

Compute the bracket term first, round it to one decimal place (round half up), then multiply by 10 to get MELD(i) (OPTN policy; MDCalc may differ by 1 point because of this rounding). If MELD(i) > 11:

```latex
\text{MELD-Na} = \text{MELD(i)} + 1.32(137-\text{Na}) - 0.033 \times \text{MELD(i)} \times (137-\text{Na})
```

If MELD(i) ≤ 11, MELD-Na = MELD(i). Round the final value to the nearest whole number; cap at 40. Bilirubin and creatinine in mg/dL.

| MELD | 90-day mortality (Wiesner, Gastroenterology 2003) |
| --- | --- |
| ≤9 | 1.9% |
| 10–19 | 6.0% |
| 20–29 | 19.6% |
| 30–39 | 52.6% |
| ≥40 | 71.3% |

### B3.3 MELD 3.0 (id: meld3)

Current OPTN allocation score (since July 2023) for age 12 and older. Source: [Kim, Gastroenterology 2021; OPTN](https://optn.transplant.hrsa.gov/media/uq4bmlan/liver_meld_peld_1a_1b_presentation_winter-2022-pc.pdf).

Bounds: bilirubin, INR and creatinine below 1.0 are set to 1.0. Creatinine above 3.0 is set to 3.0, and dialysis (as in B3.2) sets creatinine to 3.0. Sodium bounded 125–137 mmol/L. Albumin bounded 1.5–3.5 g/dL.

```latex
\begin{aligned}
\text{MELD 3.0} =\ & 1.33\,(\text{if female}) + 4.56\ln(\text{Bili}) + 0.82(137-\text{Na}) - 0.24(137-\text{Na})\ln(\text{Bili}) \\
& + 9.09\ln(\text{INR}) + 11.14\ln(\text{Cr}) + 1.85(3.5-\text{Alb}) - 1.83(3.5-\text{Alb})\ln(\text{Cr}) + 6
\end{aligned}
```

Round to the nearest whole number; cap at 40. Show estimated 90-day survival:

```latex
S_{90} = 100 \times 0.946^{\exp(0.17698 \times \text{MELD 3.0} - 3.56)}
```

Note under result: "If IV albumin was given recently, interpret albumin with caution."

### B3.4 Maddrey discriminant function (id: maddrey)

```latex
\text{DF} = 4.6 \times (\text{PT}_{\text{patient}} - \text{PT}_{\text{control}}) + \text{Bilirubin (mg/dL)}
```

PT in seconds. DF ≥32 = severe alcohol-associated hepatitis: "Consider prednisolone 40 mg once daily for 28 days if no contraindication (active infection, uncontrolled GI bleeding, renal failure, pancreatitis). Reassess with Lille on day 7." DF <32 = not severe.

### B3.5 Lille model (id: lille)

Day-7 response to corticosteroids in alcohol-associated hepatitis. Source: Louvet, Hepatology 2007.

```latex
\begin{aligned}
R =\ & 3.19 - 0.101(\text{age}) + 0.147(\text{albumin}_{d0}) + 0.0165(\text{bili}_{d0} - \text{bili}_{d7}) \\
& - 0.206(\text{renal insufficiency}) - 0.0065(\text{bili}_{d0}) - 0.0096(\text{PT}_{d0})
\end{aligned}
```

```latex
\text{Lille} = \frac{e^{-R}}{1 + e^{-R}}
```

Units: age in years, albumin g/L, bilirubin µmol/L, PT seconds. Renal insufficiency = 1 if creatinine >1.3 mg/dL (>115 µmol/L), else 0.

| Lille | Meaning | Action text |
| --- | --- | --- |
| <0.45 | Responder; 6-month survival about 85% | Continue prednisolone to complete 28 days |
| ≥0.45 | Non-responder; 6-month survival about 25% | Stop corticosteroids; consider early liver transplant evaluation at an expert center |

### B3.6 Glasgow Alcoholic Hepatitis Score (id: gahs)

Range 5–12. Source: Forrest, Gut 2005.

| Item | 1 | 2 | 3 |
| --- | --- | --- | --- |
| Age (years) | <50 | ≥50 |  |
| WBC (×10⁹/L) | <15 | ≥15 |  |
| Urea (mmol/L) | <5 | ≥5 |  |
| PT ratio or INR | <1.5 | 1.5–2.0 | >2.0 |
| Bilirubin (µmol/L) | <125 | 125–250 | >250 |

≥9 = poor prognosis (28-day survival about 46% untreated); in patients with DF ≥32, a GAHS ≥9 identifies those most likely to benefit from corticosteroids. <9 = better prognosis (28-day survival about 87%).

### B3.7 ABIC score (id: abic)

```latex
\text{ABIC} = 0.1(\text{age}) + 0.08(\text{bili, mg/dL}) + 0.3(\text{Cr, mg/dL}) + 0.8(\text{INR})
```

| ABIC | Risk (90-day survival, Dominguez, AJG 2008) |
| --- | --- |
| <6.71 | Low (about 100%) |
| 6.71 to <9.0 | Intermediate (about 70%) |
| ≥9.0 | High (about 25%) |

### B3.8 FIB-4 (id: fib4)

```latex
\text{FIB-4} = \frac{\text{age} \times \text{AST}}{\text{platelets }(10^9/\text{L}) \times \sqrt{\text{ALT}}}
```

Two modes (radio button):

| Mode | Low risk | Indeterminate | High risk |
| --- | --- | --- | --- |
| MASLD (AASLD 2023) | <1.3 (use <2.0 if age ≥65) | 1.3–2.67 | >2.67 |
| Viral hepatitis (original HIV/HCV derivation) | <1.45 | 1.45–3.25 | >3.25 |

MASLD actions: low = "Repeat in 1–3 years"; indeterminate = "Elastography (VCTE) or ELF test"; high = "Refer to hepatology; elastography". Show warning if age <35: "FIB-4 is less accurate under 35 years."

### B3.9 APRI (id: apri)

```latex
\text{APRI} = \frac{\text{AST} / \text{AST ULN}}{\text{platelets }(10^9/\text{L})} \times 100
```

WHO cutoffs: significant fibrosis (F2 or more): <0.5 unlikely, >1.5 likely. Cirrhosis: <1.0 unlikely, >2.0 likely. Values in between are indeterminate.

### B3.10 NAFLD Fibrosis Score (id: nfs)

```latex
\begin{aligned}
\text{NFS} =\ & -1.675 + 0.037(\text{age}) + 0.094(\text{BMI}) + 1.13(\text{IFG or diabetes}) \\
& + 0.99(\text{AST}/\text{ALT}) - 0.013(\text{platelets}) - 0.66(\text{albumin, g/dL})
\end{aligned}
```

IFG or diabetes: yes = 1, no = 0. ≤−1.455 low probability of advanced fibrosis (if age ≥65, use 0.12 as the low cutoff); ≥0.676 high probability; between = indeterminate. Source: Angulo, Hepatology 2007.

### B3.11 ALBI grade (id: albi)

```latex
\text{ALBI} = 0.66 \times \log_{10}(\text{bilirubin, µmol/L}) - 0.085 \times (\text{albumin, g/L})
```

Grade 1: ≤−2.60. Grade 2: >−2.60 to ≤−1.39. Grade 3: >−1.39. Use: liver function in HCC. Source: Johnson, J Clin Oncol 2015.

### B3.12 Ascitic fluid analysis: SAAG and PMN (id: ascites)

- SAAG = serum albumin − ascitic albumin (same day, g/dL). ≥1.1 g/dL = portal hypertension. <1.1 g/dL = not portal hypertension (peritoneal carcinomatosis, tuberculosis, pancreatic ascites, nephrotic syndrome).
- With SAAG ≥1.1: ascitic total protein <2.5 g/dL suggests cirrhosis; ≥2.5 g/dL suggests cardiac ascites or Budd-Chiari syndrome.
- PMN count = ascitic WBC × neutrophil fraction. In a bloody tap (RBC >10,000/mm³), subtract 1 PMN per 250 RBC. PMN ≥250/mm³ = spontaneous bacterial peritonitis; link to the SBP emergency page.
- Secondary peritonitis flag (Runyon criteria, 2 or more of): ascitic total protein >1 g/dL, glucose <50 mg/dL, LDH above the serum upper limit of normal. Show: "Consider secondary peritonitis: urgent CT abdomen and surgical review."

### B3.13 R factor and Hy's law (id: r\_factor)

```latex
R = \frac{\text{ALT} / \text{ALT ULN}}{\text{ALP} / \text{ALP ULN}}
```

R ≥5 hepatocellular; R >2 to <5 mixed; R ≤2 cholestatic. Hy's law flag when ALT or AST >3 × ULN and total bilirubin >2 × ULN with ALP <2 × ULN: "Hy's law pattern: high risk of severe drug-induced liver injury."

### B3.14 Simplified autoimmune hepatitis score (id: aih\_simplified)

Source: Hennes, Hepatology 2008; [table](https://pmc.ncbi.nlm.nih.gov/articles/PMC7366136/table/T1).

| Item | Criterion | Points |
| --- | --- | --- |
| Autoantibodies (maximum 2 points in total) | ANA or SMA ≥1:40 | 1 |
|  | ANA or SMA ≥1:80, or LKM ≥1:40, or SLA positive | 2 |
| IgG | >ULN | 1 |
|  | >1.10 × ULN | 2 |
| Liver histology | Compatible with AIH | 1 |
|  | Typical of AIH | 2 |
| Absence of viral hepatitis | Yes | 2 |

≥7 definite AIH; 6 probable AIH; ≤5 not diagnostic.

### B3.15 Leipzig score for Wilson disease (id: leipzig)

Source: Ferenci, Liver Int 2003; EASL 2012; [table](https://pmc.ncbi.nlm.nih.gov/articles/PMC8584493/table/jcm-10-05097-t001).

| Item | Finding | Points |
| --- | --- | --- |
| Kayser-Fleischer rings | Present / absent | 2 / 0 |
| Neuropsychiatric symptoms or typical brain MRI | Severe / mild / absent | 2 / 1 / 0 |
| Serum ceruloplasmin | >0.2 g/L / 0.1–0.2 g/L / <0.1 g/L | 0 / 1 / 2 |
| Coombs-negative hemolytic anemia | Present / absent | 1 / 0 |
| Liver copper (no cholestasis) | >4 µmol/g (>250 µg/g) / 0.8–4 µmol/g / <0.8 µmol/g | 2 / 1 / −1 |
| Rhodanine-positive granules (only if no quantitative liver copper) | Present | 1 |
| 24-hour urinary copper (no acute hepatitis) | Normal / 1–2 × ULN / >2 × ULN / normal but >5 × ULN after D-penicillamine | 0 / 1 / 2 / 2 |
| ATP7B mutations | Both chromosomes / one / none | 4 / 1 / 0 |

≥4 diagnosis established; 3 possible, more tests needed; ≤2 very unlikely. Each item can be marked "not done" (0 points).

### B3.16 West Haven grading of hepatic encephalopathy (id: west\_haven; selectable card)

| Grade | Features | Category |
| --- | --- | --- |
| Minimal | Abnormal psychometric or neurophysiological tests only | Covert |
| 1 | Trivial lack of awareness, euphoria or anxiety, shortened attention span, impaired addition or subtraction, altered sleep rhythm | Covert |
| 2 | Lethargy or apathy, disorientation for time, obvious personality change, inappropriate behavior, dyspraxia, asterixis | Overt |
| 3 | Somnolence to semi-stupor, responsive to stimuli, confused, gross disorientation, bizarre behavior | Overt |
| 4 | Coma | Overt |

Source: AASLD/EASL hepatic encephalopathy guideline 2014. Link to the HE emergency page.

### B3.17 ACLF grade, EASL-CLIF (id: aclf)

For acutely decompensated cirrhosis. Source: Moreau, Gastroenterology 2013 (CANONIC).

| Organ | Failure definition | Dysfunction (used for grade 1) |
| --- | --- | --- |
| Liver | Bilirubin ≥12 mg/dL |  |
| Kidney | Creatinine ≥2.0 mg/dL or renal replacement therapy | Creatinine 1.5–1.9 mg/dL |
| Brain | HE grade 3–4 | HE grade 1–2 |
| Coagulation | INR ≥2.5 |  |
| Circulation | Vasopressors (terlipressin and/or catecholamines) |  |
| Respiration | PaO2/FiO2 ≤200, or SpO2/FiO2 ≤214, or mechanical ventilation not for HE |  |

| Grade | Definition | 28-day mortality |
| --- | --- | --- |
| No ACLF | No organ failure; or one non-kidney organ failure with creatinine <1.5 and no HE; or brain failure alone with creatinine <1.5 | 4.7% |
| 1 | Kidney failure alone; or one liver, coagulation, circulation or respiration failure with creatinine 1.5–1.9 and/or HE grade 1–2; or brain failure with creatinine 1.5–1.9 | 22.1% |
| 2 | Two organ failures | 32.0% |
| 3 | Three or more organ failures | 76.7% |

### B3.18 King's College criteria (id: kings)

Checklist for listing in acute liver failure; link to the ALF emergency page.

| Type | Criteria met if |
| --- | --- |
| Acetaminophen | Arterial pH <7.30 after adequate fluid resuscitation; OR all three within 24 hours: INR >6.5 (PT >100 s), creatinine >3.4 mg/dL (>300 µmol/L), and HE grade 3–4 |
| Acetaminophen, modified (optional toggle) | Also met if arterial lactate >3.5 mmol/L at 4 hours or >3.0 mmol/L at 12 hours after fluid resuscitation |
| Non-acetaminophen | INR >6.5 (PT >100 s) regardless of HE grade; OR any 3 of: age <10 or >40 years; cause non-A non-B hepatitis, halothane, or idiosyncratic drug reaction; jaundice to encephalopathy >7 days; INR >3.5 (PT >50 s); bilirubin >17.6 mg/dL (>300 µmol/L) |

Result text if met: "Meets King's College criteria: poor prognosis without transplant. Contact a liver transplant center now."

### B3.19 Baveno VII non-invasive portal hypertension (id: baveno7)

Inputs: liver stiffness by VCTE (kPa), platelets (×10⁹/L). Source: de Franchis, J Hepatol 2022 (Baveno VII).

| Rule | Interpretation |
| --- | --- |
| LSM <10 kPa | Compensated advanced chronic liver disease (cACLD) ruled out (no other signs) |
| LSM 10–15 kPa | Suggestive of cACLD |
| LSM >15 kPa | Highly suggestive of cACLD |
| LSM ≤15 kPa and platelets ≥150 | Clinically significant portal hypertension (CSPH) ruled out |
| LSM ≥25 kPa | CSPH ruled in (viral, alcohol and non-obese MASLD) |
| LSM <20 kPa and platelets >150 | Screening endoscopy for varices can be avoided (Baveno VI/VII) |

### B3.20 FibroScan (VCTE) interpretation (id: fibroscan)

One simple screen: fibrosis stage from liver stiffness (LSM, kPa) by liver disease, and steatosis grade from CAP (dB/m). Aliases for search: "FibroScan", "elastography", "VCTE", "LSM", "CAP".

**Layout.** Three main sections at the top:

1. Disease: MASLD, Alcohol-related, Hepatitis B, Hepatitis C, Other/mixed.
2. Liver stiffness (kPa).
3. CAP (dB/m, optional).

The result appears as soon as disease and kPa are entered; it does not wait for any other field. It is shown in large clear text, for example "Fibrosis: F3" and "Steatosis: S2".

**Fibrosis stage by disease (kPa).** A value at or above a cutoff gets that stage; below the F2 cutoff = F0–F1.

| Liver disease | F2 | F3 | F4 | Source |
| --- | --- | --- | --- | --- |
| MASLD | 8.2 | 9.7 | 13.6 | Eddowes, Gastroenterology 2019 |
| Hepatitis C | 7.1 | 9.5 | 12.5 | Castera, Gastroenterology 2005 |
| Hepatitis B | 7.9 | 8.8 | 11.7 | Chon, PLoS One 2012 meta-analysis |
| Alcohol-related | 9.0 | 12.9 | 18.6 | [JHEP Reports 2020;2(3):100101, doi:10.1016/j.jhepr.2020.100101 (review table)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7267467/) |
| Other/mixed | No F stage; show Baveno VII only (below) | | | Baveno VII 2022 |

Alcohol-related note: "Higher AST or bilirubin raises stiffness; repeat after abstinence."

**Baveno VII.** For Other/mixed this is the result: <10 kPa cACLD unlikely; 10–15 suggestive; >15 highly suggestive; 25 or more: "CSPH ruled in (Baveno VII)". For all diseases, show one small Baveno VII line under the result.

**Steatosis grade from CAP (all diseases).** Source: Karlas, J Hepatol 2017.

| CAP (dB/m) | Steatosis grade |
| --- | --- |
| <248 | S0 |
| 248 to <268 | S1 |
| 268 to <280 | S2 |
| ≥280 | S3 |

Note under CAP: "CAP is influenced by BMI and diabetes and grades steatosis only roughly; it does not measure inflammation or fibrosis."

**Exam quality (optional).** Below the result, in a collapsed section called "Exam quality (optional)": IQR/median (%), number of valid measurements, ALT as multiple of ULN, and confounder checkboxes (ALT >5 × ULN or acute hepatitis; extrahepatic cholestasis; heart failure or hepatic congestion; fasting <3 hours; heavy alcohol intake in the past weeks). If filled, they only add a warning under the result. They never block or hide the result.

| Check | Rule | Warning |
| --- | --- | --- |
| Valid measurements | Fewer than 10 | "Unreliable: fewer than 10 valid measurements. Repeat the exam." |
| Variability | IQR/median >30% AND LSM ≥7.1 kPa | "Unreliable: IQR/median above 30%. Repeat the exam." |
| Confounders | Any ticked | "LSM may overestimate fibrosis" |
| ALT | ALT >5 × ULN | "Do not interpret LSM for fibrosis during a hepatitis flare. Repeat when ALT settles." |

Footer note: "Use the XL probe when the M probe fails or the skin-to-liver capsule distance is ≥25 mm. Cutoffs differ between diseases: always choose the correct disease."

## Part B4: Pancreatobiliary scores

Nine tools. ACG 2024 notes that [scoring systems and imaging alone are not accurate in predicting which patients will develop moderately severe or severe pancreatitis](https://guidelinecentral.com/guideline/12896), so every pancreatitis score shows: "Scores support but do not replace close monitoring in the first 24–48 hours."

Units in B4: cutoffs written in both units are compared in the unit entered (B1.5), for example "BUN >25 mg/dL (urea >8.9 mmol/L)" or "total bilirubin ≥2 mg/dL (≥34 µmol/L)".

### B4.1 BISAP (id: bisap)

One point each, range 0–5, within 24 hours of admission. Source: Wu, Gut 2008.

| Item | Criterion |
| --- | --- |
| B, BUN | >25 mg/dL (urea >8.9 mmol/L) |
| I, Impaired mental status | GCS <15 |
| S, SIRS | 2 or more SIRS criteria (B4.4) |
| A, Age | >60 years |
| P, Pleural effusion | On imaging |

0–2 = lower risk; ≥3 = higher risk of organ failure and in-hospital mortality.

### B4.2 Ranson criteria (id: ranson)

Two versions by toggle (non-gallstone and gallstone). One point per criterion; needs the 48-hour values to complete. Source: Ranson 1974 and 1982.

| Timing | Non-gallstone | Gallstone |
| --- | --- | --- |
| Admission: age | >55 years | >70 years |
| Admission: WBC | >16 ×10⁹/L | >18 ×10⁹/L |
| Admission: glucose | >200 mg/dL (>11.1 mmol/L) | >220 mg/dL (>12.2 mmol/L) |
| Admission: LDH | >350 IU/L | >400 IU/L |
| Admission: AST | >250 IU/L | >250 IU/L |
| 48 h: hematocrit fall | >10 percentage points | >10 percentage points |
| 48 h: BUN rise | >5 mg/dL (urea >1.8 mmol/L) | >2 mg/dL (urea >0.7 mmol/L) |
| 48 h: calcium | <8 mg/dL (<2.0 mmol/L) | <8 mg/dL (<2.0 mmol/L) |
| 48 h: PaO2 | <60 mmHg | not used |
| 48 h: base deficit | >4 mmol/L | >5 mmol/L |
| 48 h: fluid sequestration | >6 L | >4 L |

≥3 = severe pancreatitis. Commonly cited mortality: 0–2 under 5%; 3–4 about 15%; 5–6 about 40%; ≥7 near 100%.

### B4.3 Glasgow-Imrie score (id: glasgow\_imrie)

One point each, within 48 hours, mnemonic PANCREAS. Source: Blamey, Gut 1984.

| Item | Criterion |
| --- | --- |
| P, PaO2 | <8 kPa (<60 mmHg) |
| A, Age | >55 years |
| N, Neutrophils (WBC) | >15 ×10⁹/L |
| C, Calcium | <2.0 mmol/L |
| R, Renal (urea) | >16 mmol/L |
| E, Enzymes | LDH >600 IU/L or AST >200 IU/L |
| A, Albumin | <32 g/L |
| S, Sugar (glucose) | >10 mmol/L |

≥3 = severe pancreatitis; consider HDU or ICU.

### B4.4 SIRS criteria (id: sirs)

Two or more = SIRS. Persistent SIRS beyond 48 hours predicts organ failure and death in acute pancreatitis.

| Item | Criterion |
| --- | --- |
| Temperature | >38 °C or <36 °C |
| Heart rate | >90/min |
| Respiration | Rate >20/min or PaCO2 <32 mmHg |
| WBC | >12 or <4 ×10⁹/L, or >10% bands |

### B4.5 Modified Marshall score (id: marshall)

Score each organ 0–4. Any organ ≥2 = organ failure. Source: Banks, Gut 2013 (revised Atlanta); [table](https://pmc.ncbi.nlm.nih.gov/articles/PMC4753186/table/T3).

| Organ | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| Respiratory, PaO2/FiO2 | >400 | 301–400 | 201–300 | 101–200 | ≤100 |
| Renal, creatinine µmol/L (mg/dL) | ≤134 (<1.4) | 134–169 (1.4–1.8) | 170–310 (1.9–3.6) | 311–439 (3.6–4.9) | >439 (>4.9) |
| Cardiovascular, SBP off inotropes | >90 | <90, fluid responsive | <90, not fluid responsive | <90, pH <7.3 | <90, pH <7.2 |

Non-integer values between bands are scored as contiguous ranges from each band's upper limit (for example PaO2/FiO2 100.5 = 3; creatinine 1.85 mg/dL = 2). Creatinine is scored with the bands written for the unit entered (µmol/L or mg/dL). Cardiovascular is a pick list of the five labels above, so the clinician chooses the band.

FiO2 estimate for non-ventilated patients (show as helper): room air 0.21; 2 L/min 0.25; 4 L/min 0.30; 6–8 L/min 0.40; 9–10 L/min 0.50. Note: "No formal correction exists for pre-existing chronic kidney disease."

### B4.6 Revised Atlanta classification (id: atlanta)

Source: Banks, Gut 2013.

Diagnosis of acute pancreatitis needs 2 of 3: (1) typical abdominal pain; (2) lipase or amylase >3 × upper limit of normal; (3) characteristic imaging findings.

| Severity | Definition |
| --- | --- |
| Mild | No organ failure; no local or systemic complications |
| Moderately severe | Transient organ failure (resolves within 48 hours) and/or local or systemic complications without persistent organ failure |
| Severe | Persistent organ failure (>48 hours), single or multiple |

| Local collection | Under 4 weeks | After 4 weeks |
| --- | --- | --- |
| Interstitial edematous pancreatitis | Acute peripancreatic fluid collection (APFC) | Pseudocyst |
| Necrotizing pancreatitis | Acute necrotic collection (ANC) | Walled-off necrosis (WON) |

UI: user selects organ failure status (none, transient, persistent) and complications; app returns severity and collection name.

### B4.7 Modified CT severity index (id: mctsi)

Source: Mortele, AJR 2004. Range 0–10.

| Item | Finding | Points |
| --- | --- | --- |
| Pancreatic inflammation | Normal pancreas | 0 |
|  | Intrinsic pancreatic abnormalities with or without peripancreatic fat inflammation | 2 |
|  | Pancreatic or peripancreatic fluid collection, or peripancreatic fat necrosis | 4 |
| Pancreatic necrosis | None / ≤30% / >30% | 0 / 2 / 4 |
| Extrapancreatic complications | Any of pleural effusion, ascites, vascular, parenchymal or GI tract involvement | 2 |

0–2 mild; 4–6 moderate; 8–10 severe. Note: "CT is best done 72–96 hours after onset; early CT underestimates necrosis."

### B4.8 Tokyo Guidelines 2018 for acute cholangitis (id: tg18\_cholangitis)

Two parts on one screen: diagnosis, then severity. Source: [TG18, J Hepatobiliary Pancreat Sci 2018](https://pubmed.ncbi.nlm.nih.gov/29032610/).

| Diagnostic group | Criteria |
| --- | --- |
| A. Systemic inflammation | A-1 fever >38 °C and/or shaking chills; A-2 WBC <4 or >10 ×10⁹/L, or CRP ≥1 mg/dL (≥10 mg/L) |
| B. Cholestasis | B-1 total bilirubin ≥2 mg/dL (≥34 µmol/L); B-2 ALP, GGT, AST or ALT >1.5 × ULN |
| C. Imaging | C-1 biliary dilatation; C-2 evidence of the cause (stricture, stone, stent) |

Suspected = one item in A plus one item in B or C. Definite = one item in each of A, B and C.

| Severity | Definition |
| --- | --- |
| Grade III (severe) | Dysfunction of at least one organ: hypotension needing dopamine ≥5 µg/kg/min or any norepinephrine; disturbed consciousness; PaO2/FiO2 <300; oliguria or creatinine >2.0 mg/dL; PT-INR >1.5; platelets <100 ×10⁹/L |
| Grade II (moderate) | Any two of: WBC >12 or <4 ×10⁹/L; fever ≥39 °C; age ≥75; total bilirubin ≥5 mg/dL; albumin <0.7 × lower limit of normal |
| Grade I (mild) | Neither grade II nor grade III |

Action text: Grade I = "Antibiotics and supportive care; biliary drainage if no response within 24 hours." Grade II = "Early biliary drainage (ERCP) with antibiotics." Grade III = "Organ support and urgent biliary drainage once stabilized." Link to the cholangitis emergency page.

### B4.9 ASGE 2019 choledocholithiasis risk (id: asge\_cbd)

Source: Buxbaum, Gastrointest Endosc 2019; [criteria table](https://pmc.ncbi.nlm.nih.gov/articles/PMC8594622/table/T17).

| Risk | Criteria (any one) | Action |
| --- | --- | --- |
| High | Common bile duct stone on ultrasound or cross-sectional imaging; OR clinical ascending cholangitis; OR total bilirubin >4 mg/dL AND dilated common bile duct | Proceed to ERCP |
| Intermediate | Abnormal liver tests; OR age >55 years; OR dilated common bile duct on imaging | EUS, MRCP, laparoscopic intraoperative cholangiography or intraoperative ultrasound |
| Low | No predictors | Cholecystectomy with or without intraoperative cholangiography |

Dilated common bile duct: >6 mm with gallbladder in situ.

## Part B5: IBD scores

Nine tools: four for ulcerative colitis, three for Crohn's disease activity, one post-operative score and the Montreal classification.

### B5.1 Truelove and Witts (id: truelove\_witts)

Source: Truelove and Witts, BMJ 1955; ECCO UC guideline.

| Severity | Criteria |
| --- | --- |
| Severe (acute severe UC) | ≥6 bloody stools per day AND at least one of: heart rate >90/min, temperature >37.8 °C, hemoglobin <10.5 g/dL, ESR >30 mm/h (CRP >30 mg/L accepted as an alternative) |
| Moderate | Between mild and severe |
| Mild | <4 stools per day, little or no blood, no systemic toxicity, normal ESR |

Severe result text: "Acute severe ulcerative colitis: admit. Open the ASUC emergency page."

UI: mild needs a confirming tick box "No systemic toxicity and normal ESR", and none of the entered severe-list features may be present. Anything not severe and not mild is moderate.

### B5.2 Day-3 response in acute severe UC: Oxford and Lindgren (id: asuc\_day3)

Inputs on day 3 of IV corticosteroids: stool frequency (per 24 h), CRP (mg/L). Source: [Travis, Gut 1996](https://pubmed.ncbi.nlm.nih.gov/8984031/); Lindgren, Eur J Gastroenterol Hepatol 1998.

| Rule | Positive if | Meaning |
| --- | --- | --- |
| Oxford (Travis) | Stool frequency >8, OR stool frequency 3–8 with CRP >45 mg/L | About 85% need colectomy on that admission |
| Lindgren (Swedish index) | Stool frequency + 0.14 × CRP >8 | About 72% need colectomy |

Positive action text: "Corticosteroid non-response: start rescue therapy (infliximab or ciclosporin) and involve the colorectal surgeon now."

### B5.3 Mayo score and partial Mayo (id: mayo\_uc)

Two modes: full (4 items, 0–12) and partial (no endoscopy, 0–9). Source: Schroeder, NEJM 1987; Lewis, Inflamm Bowel Dis 2008.

| Item | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| Stool frequency | Normal for patient | 1–2 more than normal | 3–4 more than normal | ≥5 more than normal |
| Rectal bleeding | None | Streaks of blood with stool less than half the time | Obvious blood with stool most of the time | Blood alone passed |
| Endoscopy (full mode only) | Normal or inactive | Mild: erythema, decreased vascular pattern, mild friability | Moderate: marked erythema, absent vascular pattern, friability, erosions | Severe: spontaneous bleeding, ulceration |
| Physician global assessment | Normal | Mild | Moderate | Severe |

| Mode | Remission | Mild | Moderate | Severe |
| --- | --- | --- | --- | --- |
| Full Mayo | ≤2 with no subscore >1 | 3–5, or 0–2 with a subscore >1 | 6–10 | 11–12 |
| Partial Mayo | 0–1 | 2–4 | 5–6 | 7–9 |

Also show the Mayo endoscopic subscore alone, labeled "Mayo endoscopic score (MES)". Note: "In trials, the modified Mayo score excludes the physician global assessment and scores friability as 2."

### B5.4 UCEIS (id: uceis)

Score the most severe area. Range 0–8. Source: Travis, Gut 2012; [descriptors](https://pmc.ncbi.nlm.nih.gov/articles/PMC3292713/table/tbl6).

| Descriptor | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| Vascular pattern | Normal (or blurring or patchy loss of capillary margins) | Patchy obliteration | Complete obliteration |  |
| Bleeding | None | Mucosal: spots or streaks of coagulated blood that wash away | Luminal mild: some free liquid blood in the lumen | Luminal moderate or severe: frank blood in the lumen or oozing after washing |
| Erosions and ulcers | None | Erosions: tiny (≤5 mm) flat defects, white or yellow | Superficial ulcer: larger (>5 mm) discrete fibrin-covered ulcers, still superficial | Deep ulcer: deeper excavated defects with a slightly raised edge |

Note: "In acute severe UC, UCEIS ≥7 at admission predicts need for rescue therapy."

### B5.5 Harvey-Bradshaw Index (id: hbi)

Source: Harvey and Bradshaw, Lancet 1980. Use the previous day's values.

| Item | Scoring |
| --- | --- |
| General well-being | 0 very well, 1 slightly below par, 2 poor, 3 very poor, 4 terrible |
| Abdominal pain | 0 none, 1 mild, 2 moderate, 3 severe |
| Liquid stools per day | Number |
| Abdominal mass | 0 none, 1 dubious, 2 definite, 3 definite and tender |
| Complications (1 point each) | Arthralgia, uveitis, erythema nodosum, aphthous ulcers, pyoderma gangrenosum, anal fissure, new fistula, abscess |

<5 remission; 5–7 mild; 8–16 moderate; >16 severe.

### B5.6 Crohn's Disease Activity Index (id: cdai)

Source: Best, Gastroenterology 1976; [weights](https://pmc.ncbi.nlm.nih.gov/articles/PMC10321231/table/T2).

| Variable | Input | Multiplier |
| --- | --- | --- |
| Liquid or very soft stools | Sum over 7 days | ×2 |
| Abdominal pain (0 none to 3 severe) | Sum of 7 daily ratings | ×5 |
| General well-being (0 well to 4 terrible) | Sum of 7 daily ratings | ×7 |
| Complications | Count of categories present: arthritis or arthralgia; iritis or uveitis; erythema nodosum, pyoderma gangrenosum or aphthous stomatitis; anal fissure, fistula or abscess; other fistula; fever >37.8 °C in the past week | ×20 |
| Antidiarrheal (diphenoxylate, loperamide or opiates) | 0 no, 1 yes | ×30 |
| Abdominal mass | 0 none, 2 questionable, 5 definite | ×10 |
| Hematocrit | Men: 47 − Hct (%); women: 42 − Hct (%); may be negative | ×6 |
| Body weight | 100 × (1 − weight / standard weight); if below −10, use −10 | ×1 |

<150 remission; 150–219 mild; 220–450 moderate; >450 severe. The weight term can make the total a non-integer, so the bands are applied as <150, 150 to <220, 220 to 450, and >450. Clinical response: fall of ≥100 points (≥70 in some trials). UI: offer a 7-day diary entry or direct entry of the 7-day sums.

### B5.7 SES-CD (id: ses\_cd)

Score 4 variables in each of 5 segments (ileum, right colon, transverse colon, left colon and sigmoid, rectum). Source: Daperno, Gastrointest Endosc 2004.

| Variable | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| Size of ulcers | None | Aphthous (0.1–0.5 cm) | Large (0.5–2 cm) | Very large (>2 cm) |
| Ulcerated surface | None | <10% | 10–30% | >30% |
| Affected surface | Unaffected | <50% | 50–75% | >75% |
| Narrowing | None | Single, can be passed | Multiple, can be passed | Cannot be passed |

Total 0–56. 0–2 remission; 3–6 mild; 7–15 moderate; ≥16 severe. Mark segments "not reached" (excluded from total, shown in result).

### B5.8 Rutgeerts score (id: rutgeerts; selectable card)

Neo-terminal ileum 6–12 months after ileocolonic resection. Source: Rutgeerts, Gastroenterology 1990.

| Score | Finding |
| --- | --- |
| i0 | No lesions |
| i1 | ≤5 aphthous lesions |
| i2 | >5 aphthous lesions with normal mucosa between, or skip areas of larger lesions, or lesions confined to the ileocolonic anastomosis (<1 cm). Modified: i2a = lesions confined to the anastomosis; i2b = more than 5 aphthous ulcers or larger lesions in the neo-terminal ileum |
| i3 | Diffuse aphthous ileitis with diffusely inflamed mucosa |
| i4 | Diffuse inflammation with larger ulcers, nodules and/or narrowing |

The user selects i0, i1, i2a, i2b, i3 or i4 (i2 is selected as its modified subcategory).

Result text: i0, i1 and i2a "No endoscopic recurrence"; for i2a also show the note "i2a carries lower risk; individualize". i2b, i3 and i4 "Endoscopic recurrence: consider escalating therapy."

### B5.9 Montreal classification (id: montreal; selectable card)

Source: Silverberg, Can J Gastroenterol 2005.

| Crohn's disease | Options |
| --- | --- |
| Age at diagnosis (A) | A1 ≤16 years; A2 17–40; A3 >40 |
| Location (L) | L1 terminal ileum; L2 colon; L3 ileocolon; L4 isolated upper GI (added as modifier to L1–L3) |
| Behavior (B) | B1 non-stricturing, non-penetrating; B2 stricturing; B3 penetrating; p = perianal disease modifier |

| Ulcerative colitis | Options |
| --- | --- |
| Extent (E) | E1 proctitis (distal to the rectosigmoid junction); E2 left-sided (distal to the splenic flexure); E3 extensive (proximal to the splenic flexure) |
| Severity (S) | S0 remission; S1 mild (≤4 stools/day, no systemic illness, normal inflammatory markers); S2 moderate (>4 stools/day, minimal systemic toxicity); S3 severe (≥6 bloody stools/day, pulse ≥90, temperature ≥37.5 °C, hemoglobin <10.5 g/dL, ESR ≥30) |

Output: a code such as "A2 L3 B1p" or "E2 S2".

## Part B6: Endoscopy and luminal classifications

Eight reference cards. Each card: title, table, the user can tap a row to highlight it and copy "Classification: grade", one-line clinical use, and the source.

### B6.1 Boston Bowel Preparation Scale (id: bbps; calculator)

Score each segment (right, transverse, left) after cleaning. Source: Lai, Gastrointest Endosc 2009.

| Score | Description |
| --- | --- |
| 0 | Unprepared segment; mucosa not seen because of solid stool that cannot be cleared |
| 1 | Portion of mucosa seen; other areas not well seen because of staining, residual stool and/or opaque liquid |
| 2 | Minor residual staining, small fragments of stool and/or opaque liquid, but mucosa well seen |
| 3 | Entire mucosa well seen; no residual staining, stool or opaque liquid |

Total 0–9. Adequate preparation: total ≥6 with every segment ≥2. If inadequate: "Repeat colonoscopy within 1 year (US Multi-Society Task Force)."

### B6.2 Los Angeles classification of erosive esophagitis (id: la\_grade)

| Grade | Definition |
| --- | --- |
| A | One or more mucosal breaks ≤5 mm, not extending between the tops of two mucosal folds |
| B | One or more mucosal breaks >5 mm, not continuous between the tops of two mucosal folds |
| C | Mucosal breaks continuous between the tops of two or more folds, involving <75% of the circumference |
| D | Mucosal breaks involving ≥75% of the circumference |

Clinical use: grades B, C and D are conclusive evidence of GERD (Lyon 2.0); grade A is not conclusive.

### B6.3 Prague C and M criteria with Barrett's surveillance (id: prague)

Inputs: C = circumferential extent (cm above the gastroesophageal junction); M = maximum extent (cm). Landmark: top of the gastric folds. Islands are not included. Output: "C2M5".

Barrett's esophagus requires intestinal metaplasia in columnar mucosa of the tubular esophagus. Surveillance intervals for non-dysplastic Barrett's:

| Maximum extent (M) | ACG 2022 | ESGE 2023 |
| --- | --- | --- |
| <1 cm | Not addressed | No routine biopsy or surveillance |
| 1 to <3 cm | Every 5 years | Every 5 years |
| 3 to <10 cm | Every 3 years | Every 3 years |
| ≥10 cm | Every 3 years | Refer to a Barrett's expert center |

Sources: [ACG 2022 Table 5](https://pmc.ncbi.nlm.nih.gov/articles/PMC10259184/table/T5); [ESGE 2023](https://www.thieme-connect.de/products/ejournals/html/10.1055/a-2176-2440?lang=de). Show: "Dysplasia (indefinite, low or high grade) needs confirmation by a second expert GI pathologist and is managed differently."

### B6.4 Paris classification of superficial lesions (id: paris)

| Type | Description |
| --- | --- |
| 0-Ip | Pedunculated |
| 0-Isp | Subpedunculated |
| 0-Is | Sessile (protruding ≥2.5 mm in the colon, about the height of closed biopsy forceps) |
| 0-IIa | Slightly elevated (<2.5 mm) |
| 0-IIb | Flat |
| 0-IIc | Slightly depressed |
| 0-III | Excavated (ulcer) |

Source: Paris workshop, Gastrointest Endosc 2003. Note: "Depressed (0-IIc) components carry a higher risk of submucosal invasion."

### B6.5 NICE classification for colorectal polyps (narrow-band imaging) (id: nice)

| Feature | Type 1 | Type 2 | Type 3 |
| --- | --- | --- | --- |
| Color | Same or lighter than background | Browner than background (verify color arises from vessels) | Brown to dark brown relative to background; sometimes patchy whiter areas |
| Vessels | None, or isolated lacy vessels across the lesion | Brown vessels surrounding white structures | Areas of disrupted or missing vessels |
| Surface pattern | Dark or white spots of uniform size, or homogeneous absence of pattern | Oval, tubular or branched white structures surrounded by brown vessels | Amorphous or absent surface pattern |
| Most likely pathology | Hyperplastic (or sessile serrated lesion) | Adenoma | Deep submucosal invasive cancer |

Source: Hayashi, Gastrointest Endosc 2013. Note: "Type 3 suggests deep submucosal invasion: biopsy and refer for surgery rather than endoscopic resection."

### B6.6 Zargar classification of caustic injury (id: zargar)

| Grade | Endoscopic finding |
| --- | --- |
| 0 | Normal |
| 1 | Edema and hyperemia of the mucosa |
| 2a | Friability, hemorrhages, erosions, blisters, whitish membranes, exudates and superficial ulcers |
| 2b | Grade 2a plus deep discrete or circumferential ulcers |
| 3a | Small scattered areas of necrosis |
| 3b | Extensive necrosis |
| 4 | Perforation |

Source: Zargar, Gastrointest Endosc 1991. Clinical use: grades 0–2a usually allow early oral intake and discharge; grade 2b or higher carries high stricture risk; grade 3b carries the highest risk of complications and death. Link to the caustic ingestion emergency page.

### B6.7 Bristol stool form scale (id: bristol)

| Type | Description | Suggests |
| --- | --- | --- |
| 1 | Separate hard lumps, like nuts | Slow transit |
| 2 | Sausage-shaped but lumpy | Slow transit |
| 3 | Like a sausage with cracks on the surface | Normal |
| 4 | Like a sausage or snake, smooth and soft | Normal |
| 5 | Soft blobs with clear-cut edges | Tending to fast transit |
| 6 | Fluffy pieces with ragged edges, mushy | Fast transit |
| 7 | Watery, no solid pieces | Fast transit |

Source: Lewis and Heaton, Scand J Gastroenterol 1997. Used in Rome IV IBS subtyping.

### B6.8 Lyon Consensus 2.0 for GERD (id: lyon2)

Source: [Gyawali, Gut 2024 (Lyon 2.0)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10846564/).

| Evidence level | Endoscopy | Reflux monitoring off proton pump inhibitor (PPI) |
| --- | --- | --- |
| Conclusive for GERD | LA grade B, C or D esophagitis; biopsy-proven Barrett's esophagus; peptic stricture | Acid exposure time (AET) >6% (24-hour study, or on ≥2 days of a wireless study) |
| Borderline or inconclusive | LA grade A | AET 4–6%; reflux episodes 40–80 per day |
| Against GERD | Normal endoscopy (supportive only) | AET <4% on every day of the study, with <40 reflux episodes per day |

Adjunctive evidence: reflux episodes >80 per day supports GERD; mean nocturnal baseline impedance (MNBI) <1500 Ω supports GERD and >2500 Ω argues against it. Note: "Prolonged wireless pH monitoring off PPI is preferred for unproven GERD."

## Part B7: GI emergency pages

Eighteen entries in the emergency index (B7.19), on seventeen pages: variceal bleeding (B7.2) is now part of the upper GI bleeding page (B7.1). Twelve pages use the classic template so they can be read in 30 seconds: **Recognize**, **Do now**, **Within hours**, **Then**, **Avoid**, **Doses** (table), **Related calculators** (buttons), **Sources**. Five pages (B7.1, B7.5, B7.9, B7.12 and B7.13) are interactive bedside algorithms (B7.0). Drug doses are adult doses.

### B7.0 Bedside algorithm pages

Five pages are interactive bedside algorithms: B7.1 upper GI bleeding (non-variceal and variceal), B7.5 acute severe ulcerative colitis, B7.9 spontaneous bacterial peritonitis, B7.12 acute pancreatitis and B7.13 acute cholangitis. They keep every line, dose and source of the earlier pages, reorganized into this layout, top to bottom:

| Part | What it shows |
| --- | --- |
| Red flags | Red-bordered box at the top: when to call ICU or surgery. It can hold a built-in calculator |
| Weight | Weight (kg) field, on pages with weight-based doses. Weight-based doses calculate automatically. The weight is kept in memory for that page only and is never stored (Build Rule 4). Accepted entry 20–350 kg; any other entry shows "Enter weight between 20 and 350 kg" and no dose |
| Recognize | The Recognize line |
| Algorithm | Step cards in time order, each with a timeline chip (for example 0 h, Day 3). Decision steps have answer buttons (Yes and No, or named answers); choosing one shows and highlights the steps of that path and hides the steps of the other answers. Steps without "shown when" are always shown; a step whose decision is hidden is hidden too. "Show full algorithm" shows every step and marks the steps that are off the chosen path. Answers are kept in memory for that page only. Answers are always chosen by the clinician: a built-in calculator never chooses one, but its result can mark an answer "Suggested" (outline and label; table below) |
| Built-in calculators | Inside the step, collapsed, rendered by the calculator engine (inputs with units, result, band, action, breakdown, reference); the collapsed bar shows the current result and band. A calculator can appear in two places on a page (for example in the red flags box and in a step); each copy has its own inputs |
| Weight-based lines | Inside the step: the calculated dose for the entered weight (table below) |
| Why | One short line in small italic under key steps, naming the trial or guideline |
| After the algorithm | Avoid, other tables, Doses (adult doses; weight-based rows show the calculated dose under the written dose), Related calculators, Sources |

Format of the algorithm in B7.1, B7.5, B7.9, B7.12 and B7.13: each step is "**id · timeline chip · title**", followed by "(shown when D = answer)" if it belongs to a decision path (several answers are separated by semicolons). Indented lines are the step text, except "Calculators:" (built-in calculators), "Weight-based:" (calculated doses, by name from the table below), "Why:" (the why line) and "Answer X: text" (decision answer button X with its short description). Steps with answers are decision steps.

Weight-based doses. W = weight in kg as entered. Calculated values are shown to 1 decimal place (round half up), without a trailing ".0"; mL of albumin is calculated from the unrounded grams (20% albumin: 1 g = 5 mL; 25% albumin: 1 g = 4 mL). The urine output line is a target, not a dose, and is labelled so. B7.13 has no weight-based dose, so it has no weight field. Test vectors: B8.7.

| Name | Page and doses row | Calculation | Shown as |
| --- | --- | --- | --- |
| terlipressin | B7.1, Terlipressin | Dose by weight: <50 kg 1 mg; 50–70 kg 1.5 mg; >70 kg 2 mg | Terlipressin by weight: [dose] IV every 4 hours for 48 hours, then 1 mg every 4 hours |
| infliximab 5 mg/kg | B7.5, Infliximab (rescue) | 5 × W mg | Infliximab 5 mg/kg: [5 × W] mg IV |
| infliximab 10 mg/kg | B7.5, Infliximab (rescue) | 10 × W mg | Infliximab 10 mg/kg: [10 × W] mg IV |
| ciclosporin | B7.5, Ciclosporin (rescue) | 2 × W mg/day | Ciclosporin 2 mg/kg/day: [2 × W] mg/day continuous IV infusion |
| albumin day 1 | B7.9, Albumin 20–25% | 1.5 × W g; 20%: mL = g × 5; 25%: mL = g × 4 | Albumin day 1, 1.5 g/kg: [1.5 × W] g = [7.5 × W] mL of 20% albumin or [6 × W] mL of 25% albumin |
| albumin day 3 | B7.9, Albumin 20–25% | 1 × W g; 20%: mL = g × 5; 25%: mL = g × 4 | Albumin day 3, 1 g/kg: [W] g = [5 × W] mL of 20% albumin or [4 × W] mL of 25% albumin |
| lactated Ringer's infusion | B7.12, Lactated Ringer's | 1.5 × W mL/h | Lactated Ringer's 1.5 mL/kg/h: [1.5 × W] mL/h |
| lactated Ringer's bolus | B7.12, Lactated Ringer's | 10 × W mL | Lactated Ringer's bolus if hypovolemic, 10 mL/kg: [10 × W] mL |
| urine output target | B7.12, none (step P2) | 0.5 × W mL/h | Target, not a dose. Urine output >0.5 mL/kg/h: >[0.5 × W] mL/h |

Suggested answers. When a built-in calculator on the page has a result, the matching answer button gets a "Suggested" outline and label, and any note in the table is shown under the answers. The clinician must still tap it; no other answer is suggested. Test vectors: B8.9.

| Page | Decision | Calculator | Suggested answer |
| --- | --- | --- | --- |
| B7.1 | D2 Pre-emptive TIPS criteria met? | Child-Pugh | Yes when the score is 10–13; No when the score is 14–15, with the note "Pre-emptive TIPS not recommended (Child-Pugh >13)"; none otherwise (the other criteria are not in the calculator) |
| B7.1 | D3 High-risk or low-risk stigmata? | Forrest | High-risk stigmata for Ia, Ib, IIa, IIb; Low-risk stigmata for IIc, III |
| B7.5 | D1 Day-3 criteria positive? | Day-3 Oxford | Yes when Oxford or Lindgren is positive; No when both are negative |
| B7.9 | D1 Ascitic fluid result? | Ascitic fluid analysis | Runyon criteria or polymicrobial culture when PMN ≥250/mm³ and 2 or more Runyon criteria are met (then only this answer); PMN 250/mm³ or more when PMN ≥250/mm³ with fewer than 2 Runyon criteria met; none otherwise, including PMN <250/mm³ (culture is not in the calculator) |
| B7.13 | D1 TG18 severity grade? | TG18 cholangitis | The grade shown (Grade I, II or III) when the diagnosis is suspected or definite; none when criteria are not met |

### B7.1 Upper GI bleeding: non-variceal and variceal (id: em\_ugib)

Bedside algorithm (B7.0). Weight field: yes.

Entry point variceal: D1 = Yes (opened by the index entry and search result "Variceal bleeding", B7.2).

- **Red flags:** shock (systolic BP <90 mmHg or shock index >1), ongoing hematemesis, altered consciousness, Hb drop >2 g/dL: ICU or HDU, protect the airway.
- **Recognize:** hematemesis, coffee-ground vomit, melena; shock index (heart rate/systolic BP) >1 = high risk. Variceal bleeding: upper GI bleeding in known or suspected cirrhosis or portal hypertension.

Algorithm:

- **U1 · 0–1 h · First hour, all patients**
  - Two large-bore cannulas; crystalloid resuscitation; bloods: CBC, INR, urea, creatinine, liver tests, crossmatch.
  - GBS (B2.1) and AIMS65 (B2.2). GBS 0–1 with no other concern: outpatient management can be considered.
  - Transfuse at Hb <7 g/dL (target 7–9); use 8 g/dL threshold in cardiovascular disease.
  - Hold antithrombotics per B7.4.
  - IV erythromycin 250 mg 30–120 minutes before endoscopy if no contraindication (QT prolongation).
  - Calculators: GBS, AIMS65.
  - Why: Restrictive transfusion lowered mortality (Villanueva, NEJM 2013).
- **D1 · 0–1 h · Known or suspected cirrhosis or portal hypertension?**
  - Clues: stigmata of chronic liver disease, ascites, known varices, low platelets, splenomegaly.
  - If uncertain, start the variceal pathway until endoscopy shows otherwise.
  - Answer Yes: variceal pathway.
  - Answer No: non-variceal pathway.
- **V1 · Before endoscopy · Variceal: before endoscopy** (shown when D1 = Yes)
  - Vasoactive drug as soon as variceal bleeding is suspected, before endoscopy, continued 2–5 days.
  - Antibiotic prophylaxis: ceftriaxone 1 g IV every 24 hours for up to 7 days.
  - Restrictive transfusion: Hb threshold 7 g/dL, target 7–9 g/dL ([ESGE 2022](https://pubmed.ncbi.nlm.nih.gov/36174643)).
  - Protect the airway if massive hematemesis or HE grade 3–4.
  - Do not give fresh frozen plasma or platelets to correct INR alone.
  - Erythromycin before endoscopy.
  - Weight-based: terlipressin.
  - Why: Antibiotic prophylaxis reduces infection, rebleeding and death (Chavez-Tapia, Cochrane Database Syst Rev 2010; Baveno VII). Over-transfusion raises portal pressure.
- **V2 · Within 12 h · Variceal: endoscopy** (shown when D1 = Yes)
  - Endoscopy within 12 hours.
  - Esophageal varices: band ligation.
  - Gastric varices GOV2 or IGV1: cyanoacrylate injection.
- **D2 · After endoscopy · Pre-emptive TIPS criteria met?** (shown when D1 = Yes)
  - Child-Pugh C 10–13, or Child-Pugh B >7 with active bleeding at endoscopy, or HVPG >20 mmHg.
  - Calculators: Child-Pugh.
  - Answer Yes: pre-emptive TIPS.
  - Answer No: continue vasoactive drug.
- **V3 · Within 72 h · Pre-emptive TIPS** (shown when D2 = Yes)
  - Pre-emptive TIPS within 72 hours (ideally 24).
  - Why: Pre-emptive TIPS improved survival in high-risk patients (Garcia-Pagan, NEJM 2010).
- **V4 · Days 2–5 · Continue vasoactive drug** (shown when D2 = No)
  - Continue the vasoactive drug for 2–5 days.
- **V5 · If failure · Persistent bleeding or early rebleeding** (shown when D1 = Yes)
  - Refractory bleeding (persistent bleeding or early rebleeding): balloon tamponade or esophageal stent as bridge to rescue TIPS.
  - Salvage TIPS is not recommended if Child-Pugh >13.
- **V6 · Before discharge · Variceal: before discharge** (shown when D1 = Yes)
  - Start non-selective beta-blocker (carvedilol or propranolol) when vasoactive drug stops.
  - Repeat band ligation every 1–4 weeks until eradication.
  - Lactulose to prevent hepatic encephalopathy.
  - Stop the proton pump inhibitor after endoscopy unless there is another indication.
- **N1 · Before endoscopy · Non-variceal: before endoscopy** (shown when D1 = No)
  - High-dose IV proton pump inhibitor may be started.
  - Upper endoscopy within 24 hours of presentation after resuscitation (ACG 2021, ESGE 2021).
  - Why: Endoscopy within 6 h did not lower mortality, even with GBS 12 or more (Lau, NEJM 2020).
- **N2 · Within 24 h · Non-variceal: endoscopic therapy by Forrest class** (shown when D1 = No)
  - Forrest Ia, Ib, IIa (B2.5): thermal contact therapy, clips, or sclerosant injection; epinephrine injection only in combination.
  - Forrest IIb: consider clot removal and treat the underlying stigma.
  - Forrest IIc and III: no endoscopic therapy.
  - Hemostatic powder as temporary therapy for active bleeding.
  - Calculators: Forrest.
- **D3 · After endoscopy · High-risk or low-risk stigmata?** (shown when D1 = No)
  - Forrest (B2.5): high-risk stigmata are Ia, Ib, IIa and IIb; low-risk stigmata are IIc and III.
  - Answer High-risk stigmata: Forrest Ia, Ib, IIa, IIb; high-dose IV proton pump inhibitor.
  - Answer Low-risk stigmata: Forrest IIc, III; oral proton pump inhibitor.
- **N3 · 72 h, then to day 14 · High-risk stigmata** (shown when D3 = High-risk stigmata)
  - Pantoprazole or esomeprazole 80 mg IV bolus, then 8 mg/h for 72 hours (or 40 mg IV twice daily), then twice daily orally to day 14, then once daily.
- **N4 · After endoscopy · Low-risk stigmata** (shown when D3 = Low-risk stigmata)
  - Oral proton pump inhibitor once daily, early feeding, consider discharge.
- **N5 · If rebleeding · Non-variceal: rebleeding** (shown when D1 = No)
  - Repeat endoscopy (over-the-scope clip for recurrent ulcer bleeding); if it fails, transcatheter arterial embolization, then surgery.
- **N6 · Discharge · Non-variceal: discharge** (shown when D1 = No)
  - Test for H. pylori and treat; repeat the test later if negative during the bleed.
  - Avoid non-steroidal anti-inflammatory drugs (NSAIDs).
  - Restart aspirin for secondary prevention as soon as hemostasis is secured (B7.4).
- **Avoid:** all patients: tranexamic acid. Non-variceal: urgent endoscopy within 6 hours does not improve mortality (Lau, NEJM 2020). Variceal: fresh frozen plasma or platelets to "correct" INR alone; over-transfusion (raises portal pressure); proton pump inhibitor continued long term without indication.
  - Why: Tranexamic acid gave no benefit and more venous thrombosis (HALT-IT, Lancet 2020).

**Key differences**

| Feature | Variceal | Non-variceal |
| --- | --- | --- |
| Endoscopy timing | Within 12 hours | Within 24 hours |
| First drugs | Vasoactive drug + ceftriaxone | Proton pump inhibitor |
| Endoscopic therapy | Band ligation or cyanoacrylate | Forrest-based therapy |
| Follow-up | Beta-blocker, ligation, TIPS | H. pylori, aspirin restart |

| Drug | Dose |
| --- | --- |
| Erythromycin | 250 mg IV over 5–30 minutes, given 30–120 minutes before endoscopy |
| Pantoprazole or esomeprazole, high dose | 80 mg IV bolus, then 8 mg/h infusion for 72 hours; or 40 mg IV twice daily as intermittent high dose |
| Terlipressin | IV every 4 hours for 48 hours (<50 kg: 1 mg; 50–70 kg: 1.5 mg; >70 kg: 2 mg), then 1 mg every 4 hours |
| Octreotide | 50 µg IV bolus, then 50 µg/h infusion for 2–5 days; bolus can be repeated in the first hour |
| Somatostatin | 250 µg IV bolus, then 250–500 µg/h infusion |
| Ceftriaxone | 1 g IV every 24 hours, maximum 7 days |

Related: GBS, AIMS65, Rockall, Forrest, Child-Pugh, MELD 3.0, West Haven.

### B7.2 Acute variceal bleeding (id: em\_variceal)

Merged into B7.1. The index entry and the search result "Variceal bleeding" open the upper GI bleeding page (B7.1) at the variceal pathway, with D1 answered Yes. Every line, dose and source of the earlier variceal page is kept on B7.1.

### B7.3 Acute lower GI bleeding (id: em\_lgib)

- **Recognize:** hematochezia or bright red blood per rectum. With hemodynamic instability, think of an upper GI source and do an upper endoscopy first.
- **Do now:** resuscitate; Oakland score (B2.4). Transfuse at Hb <7 g/dL (8 g/dL in cardiovascular disease) (ACG 2023).
- **Within hours:** hemodynamically significant ongoing bleeding: CT angiography first, then catheter angiography and embolization if a blush is seen (ACG 2023).
- **Then:** inpatient colonoscopy after adequate bowel preparation; urgent colonoscopy within 24 hours has not improved outcomes. Oakland ≤8: consider early discharge with outpatient colonoscopy.
- **Avoid:** routine early colonoscopy without preparation; stopping aspirin used for secondary cardiovascular prevention.

Related: Oakland.

### B7.4 Anticoagulants and antiplatelets in GI bleeding (id: em\_antithrombotic)

Source: [ACG-CAG 2022](https://gastroenterology.acponline.org/archives/2022/03/25/1.htm) and ACG 2023 lower GI bleeding guideline.

| Drug | Acute GI bleeding |
| --- | --- |
| Warfarin | Suggest against fresh frozen plasma (FFP) and against vitamin K routinely; if reversal is needed, use 4-factor prothrombin complex concentrate (PCC) rather than FFP |
| Direct oral anticoagulant (DOAC; dabigatran, rivaroxaban, apixaban, edoxaban) | Suggest against routine PCC, idarucizumab and andexanet alfa; most bleeding settles with time because of short half-life |
| Life-threatening bleeding on vitamin K antagonist (VKA) or DOAC | Reversal agents may be considered (ACG 2023) with hematology input |
| Antiplatelet drugs | Suggest against platelet transfusion |
| Aspirin for secondary cardiovascular prevention | Avoid stopping, or resume as soon as hemostasis is secured; continuing aspirin lowered mortality (Sung, Ann Intern Med 2010) |
| Dual antiplatelet therapy after recent coronary stent | Do not stop both drugs; decide with cardiology |

Show: "Restart anticoagulation once hemostasis is secure, individualized with cardiology or hematology."

### B7.5 Acute severe ulcerative colitis (id: em\_asuc)

Bedside algorithm (B7.0). Weight field: yes.

- **Red flags:** colonic dilatation >6 cm (B7.6), perforation, massive bleeding, peritonism: urgent surgical review.
- **Recognize:** Truelove and Witts severe (B5.1): ≥6 bloody stools/day plus systemic toxicity.

Algorithm:

- **A1 · Day 0 · Admit, investigate, start IV corticosteroids**
  - Admit.
  - Bloods: CBC, CRP, albumin, potassium, magnesium; correct potassium and magnesium.
  - Stool culture and C. difficile toxin.
  - Flexible sigmoidoscopy with biopsies for CMV.
  - Plain abdominal X-ray.
  - Venous thromboembolism prophylaxis with low-molecular-weight heparin.
  - IV corticosteroids: methylprednisolone 60 mg every 24 hours or hydrocortisone 100 mg every 6 hours.
  - Screen now for TB (IGRA, chest X-ray), hepatitis B, hepatitis C and HIV in case rescue therapy is needed.
  - Inform the colorectal surgeon; involve the surgeon early.
  - Calculators: Truelove and Witts.
  - Why: Venous thromboembolism risk is markedly higher during IBD flares (Grainge, Lancet 2010).
- **D1 · Day 3 · Day-3 criteria positive (Oxford or Lindgren)?**
  - Oxford criteria (B5.2) on day 3 of IV corticosteroids.
  - Calculators: Day-3 Oxford.
  - Answer Yes: rescue therapy.
  - Answer No: continue IV corticosteroids.
- **A2 · Day 3 · Rescue therapy** (shown when D1 = Yes)
  - Rescue therapy with infliximab or ciclosporin.
  - Infliximab 5 mg/kg IV (consider 10 mg/kg or accelerated dosing with low albumin or high CRP).
  - Or ciclosporin 2 mg/kg/day continuous IV infusion (avoid with low magnesium, low cholesterol or renal impairment).
  - Weight-based: infliximab 5 mg/kg, infliximab 10 mg/kg, ciclosporin.
  - Why: Infliximab and ciclosporin have similar efficacy as rescue (CYSIF, Lancet 2012; CONSTRUCT, Lancet Gastroenterol Hepatol 2016).
- **A3 · Day 3 onward · Continue IV corticosteroids** (shown when D1 = No)
  - Continue IV corticosteroids; switch to oral prednisolone 40 mg once daily once improving, then taper by 5 mg per week.
  - Deterioration at any time: urgent surgical review and reassess for rescue therapy.
- **D2 · Day 5–7 · Responding to rescue therapy?** (shown when D1 = Yes)
  - Answer Yes: continue rescue therapy and plan maintenance.
  - Answer No: colectomy.
- **A4 · Day 5–7 · Continue rescue therapy** (shown when D2 = Yes)
  - Continue rescue therapy and plan maintenance.
- **A5 · Day 5–7 · Colectomy** (shown when D2 = No)
  - No response to rescue within 5–7 days, or deterioration, toxic megacolon, perforation or massive bleeding: colectomy.
  - Why: Delayed colectomy increases complications and mortality (Randall, Br J Surg 2010).
- **Avoid:** non-steroidal anti-inflammatory drugs (NSAIDs), opioids, anticholinergics and antidiarrheals; delaying surgery in non-responders.

| Drug | Dose |
| --- | --- |
| Methylprednisolone | 60 mg IV every 24 hours |
| Hydrocortisone (alternative) | 100 mg IV every 6 hours |
| Infliximab (rescue) | 5 mg/kg IV; accelerated or higher dosing (e.g., 10 mg/kg) may be considered in severe inflammation or low albumin |
| Ciclosporin (rescue) | 2 mg/kg/day continuous IV infusion; monitor levels, blood pressure, renal function, magnesium |
| Prednisolone (oral, once improving on IV corticosteroids) | 40 mg orally once daily, then taper by 5 mg per week |

Related: Truelove and Witts, Day-3 Oxford, UCEIS, Mayo.

### B7.6 Toxic megacolon (id: em\_toxic\_megacolon)

- **Recognize (Jalan criteria):** colonic dilatation >6 cm on X-ray PLUS at least 3 of: fever >38.6 °C, heart rate >120/min, neutrophil count >10.5 ×10⁹/L, anemia; PLUS at least 1 of: dehydration, altered consciousness, electrolyte disturbance, hypotension.
- **Do now:** urgent surgical review; NPO, nasogastric decompression; IV fluids and electrolytes; broad-spectrum antibiotics; IV corticosteroids if IBD (and treat C. difficile if present); serial abdominal X-rays.
- **Then:** no improvement within 24–72 hours, perforation, or worsening: colectomy.
- **Avoid:** colonoscopy, opioids, anticholinergics, antidiarrheals.

### B7.7 Acute liver failure (id: em\_alf)

- **Recognize:** INR ≥1.5 and any degree of hepatic encephalopathy, without pre-existing cirrhosis, illness <26 weeks (AASLD).
- **Do now:** contact the liver transplant center at once; ICU if HE grade ≥2; N-acetylcysteine for acetaminophen cases (and consider for non-acetaminophen ALF with early HE grade 1–2; Lee, Gastroenterology 2009); glucose every 1–2 hours; check acetaminophen level, viral serology (hepatitis A, B with delta, E, HSV), autoimmune markers, ceruloplasmin, pregnancy test, toxicology.
- **Within hours:** King's College criteria (B3.18). Intubate for HE grade 3–4. Intracranial pressure measures: head of bed 30°, sodium target 145–155 mmol/L with hypertonic saline.
- **Clue to Wilson disease:** ALP to bilirubin ratio <4 and AST to ALT ratio >2.2.
- **Avoid:** sedatives, lactulose (bowel distension), routine fresh frozen plasma (FFP) to correct INR (masks prognosis), nephrotoxins.

| Drug | Dose |
| --- | --- |
| N-acetylcysteine, 21-hour IV regimen | 150 mg/kg over 1 hour, then 50 mg/kg over 4 hours, then 100 mg/kg over 16 hours; continue the last rate beyond 21 hours in ALF until INR improves (or use the local two-bag regimen) |

Related: King's College criteria, MELD.

### B7.8 Severe alcohol-associated hepatitis (id: em\_aah)

- **Recognize:** jaundice (bilirubin >3 mg/dL) within 8 weeks of heavy alcohol use, AST >50 IU/L, AST to ALT >1.5, both <400 IU/L; severe if MELD >20 or Maddrey DF ≥32.
- **Do now:** screen for infection (blood, urine, ascitic cultures, chest X-ray), GI bleeding and AKI; alcohol withdrawal management; nutrition (oral or enteral); thiamine.
- **Treatment:** prednisolone 40 mg once daily for 28 days if no contraindication. Lille on day 7 (B3.5): ≥0.45 stop steroids.
- **Then:** alcohol use disorder treatment; early liver transplant evaluation in selected non-responders at expert centers.
- **Avoid:** pentoxifylline (no survival benefit in STOPAH, NEJM 2015); starting steroids with uncontrolled infection.

Related: Maddrey, MELD, GAHS, ABIC, Lille.

### B7.9 Spontaneous bacterial peritonitis (id: em\_sbp)

Bedside algorithm (B7.0). Weight field: yes.

- **Red flags:** shock, AKI, hepatic encephalopathy: ICU or HDU.
- **Recognize:** ascitic PMN ≥250/mm³ (B3.12). Do a diagnostic paracentesis in every patient with cirrhosis and ascites admitted to hospital, and with any GI bleeding, infection signs, HE or AKI.

Algorithm:

- **S1 · 0 h · Diagnostic paracentesis before antibiotics**
  - Diagnostic paracentesis before antibiotics in every patient with cirrhosis and ascites who is admitted, has GI bleeding, or deteriorates (fever, abdominal pain, encephalopathy, AKI). Do not delay.
  - Blood and ascitic cultures: inoculate blood culture bottles at the bedside.
- **D1 · 0–6 h · Ascitic fluid result?**
  - Ascitic fluid analysis (B3.12): PMN count, culture and Runyon criteria.
  - Calculators: Ascitic fluid analysis.
  - Answer PMN 250/mm³ or more: treat as SBP.
  - Answer PMN <250/mm³, positive culture, symptomatic: treat.
  - Answer PMN <250/mm³, positive culture, asymptomatic: repeat paracentesis.
  - Answer PMN <250/mm³, culture negative or pending: SBP unlikely.
  - Answer Runyon criteria or polymicrobial culture: suspect secondary peritonitis.
- **S2 · 0–6 h · Repeat paracentesis** (shown when D1 = PMN <250/mm³, positive culture, asymptomatic)
  - PMN <250/mm³ with positive culture and no symptoms: repeat paracentesis.
- **S3 · 0–6 h · SBP unlikely** (shown when D1 = PMN <250/mm³, culture negative or pending)
  - SBP unlikely: no SBP treatment.
  - Look for another cause of deterioration.
  - Act on the culture result when it returns.
- **S4 · Now · Suspected secondary peritonitis** (shown when D1 = Runyon criteria or polymicrobial culture)
  - Runyon criteria or polymicrobial culture: suspect secondary peritonitis, urgent CT and surgical review.
  - Start broad-spectrum antibiotics with anaerobic cover (for example ceftriaxone plus metronidazole, or piperacillin-tazobactam per local resistance) (EASL 2018).
- **S5 · Within 6 h · Treat: antibiotics and albumin** (shown when D1 = PMN 250/mm³ or more; D1 = PMN <250/mm³, positive culture, symptomatic)
  - Empirical antibiotics: community-acquired, cefotaxime 2 g IV every 8 hours (or ceftriaxone) for 5–7 days; nosocomial, recent antibiotics or sepsis, piperacillin-tazobactam or a carbapenem per local resistance.
  - IV albumin 1.5 g/kg within 6 hours of diagnosis (day 1) and 1 g/kg on day 3.
  - Stop diuretics and nephrotoxins; review non-selective beta-blockers if systolic BP <90 mmHg, sodium <130 mmol/L or AKI.
  - Weight-based: albumin day 1, albumin day 3.
  - Why: Albumin reduced renal failure and in-hospital death (Sort, NEJM 1999).
- **S6 · 48 h · Check response** (shown when D1 = PMN 250/mm³ or more; D1 = PMN <250/mm³, positive culture, symptomatic)
  - Repeat paracentesis if no clinical improvement; PMN fall <25% = treatment failure, broaden antibiotics and look for secondary peritonitis.
- **S7 · Before discharge · Prevent recurrence** (shown when D1 = PMN 250/mm³ or more; D1 = PMN <250/mm³, positive culture, symptomatic)
  - Long-term secondary prophylaxis after the first episode: norfloxacin 400 mg daily, ciprofloxacin 500 mg daily, or trimethoprim-sulfamethoxazole.
  - Refer for liver transplant assessment.
- **Avoid:** large-volume paracentesis during active SBP without albumin; non-steroidal anti-inflammatory drugs (NSAIDs); consider holding non-selective beta-blockers if systolic BP <90 mmHg, sodium <130 mmol/L or AKI.

| Drug | Dose |
| --- | --- |
| Cefotaxime (community-acquired) | 2 g IV every 8 hours for 5–7 days |
| Ceftriaxone (alternative) | 1–2 g IV every 24 hours |
| Nosocomial or recent antibiotics | Broader cover per local resistance (for example piperacillin-tazobactam or a carbapenem) |
| Albumin 20–25% | 1.5 g/kg on day 1 and 1 g/kg on day 3 (Sort, NEJM 1999) |
| Secondary prophylaxis | Norfloxacin 400 mg daily, or ciprofloxacin 500 mg daily, or trimethoprim-sulfamethoxazole |

Related: Ascitic fluid analysis, MELD.

### B7.10 Hepatorenal syndrome, HRS-AKI (id: em\_hrs)

Source: [ICA-ADQI consensus, J Hepatol 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11193657).

- **Recognize (2024 criteria):** cirrhosis with ascites; AKI by KDIGO (creatinine rise ≥0.3 mg/dL within 48 hours, or ≥50% from baseline within 7 days, and/or urine output ≤0.5 mL/kg/h for ≥6 hours); no improvement in creatinine and/or urine output within 24 hours of adequate volume resuscitation; no strong evidence of another primary cause. A 48-hour albumin trial is no longer required.
- **Do now:** stop diuretics, non-steroidal anti-inflammatory drugs (NSAIDs) and other nephrotoxins; review non-selective beta-blockers; look for and treat infection; if volume status is unclear, fluid challenge with 250–500 mL crystalloid or 1–1.5 g/kg of 20–25% albumin; reassess at 24 hours.
- **Treatment:** terlipressin plus albumin (first line); norepinephrine plus albumin in ICU if terlipressin is contraindicated or unavailable.
- **Stop vasoconstrictor when:** creatinine returns to within 0.3 mg/dL of baseline; severe adverse event; no improvement after 48 hours at maximum tolerated dose; renal replacement therapy needed; or 14 days reached.
- **Avoid:** terlipressin with hypoxia, ischemic heart or vascular disease, or fluid overload; continuing albumin when there is pulmonary edema.

| Drug | Dose |
| --- | --- |
| Terlipressin | Continuous infusion 2 mg/day, or IV bolus 1–2 mg every 6 hours; if creatinine has not fallen by 25%, increase by at least 2 mg/day every 24 hours up to 12 mg/day |
| Albumin 20–25% | 20–40 g/day, adjusted daily to volume status |
| Norepinephrine | 0.5 mg/h IV, increase by 0.5 mg/h every 4 hours up to 3 mg/h to raise MAP (ICU, central line) |

Related: MELD 3.0, ACLF grade.

### B7.11 Overt hepatic encephalopathy (id: em\_he)

- **Recognize:** West Haven grade 2–4 (B3.16) in cirrhosis; exclude other causes (glucose, sepsis, drugs, intracranial bleed; CT head if focal signs, first episode, or fall).
- **Do now:** find and treat precipitants (infection, GI bleeding, constipation, dehydration, hypokalemia or hyponatremia, sedatives, AKI, TIPS); protect the airway in grade 3–4; lactulose.
- **Then:** rifaximin added to lactulose after a recurrence (Bass, NEJM 2010); review benzodiazepines and opioids; nutrition with normal protein intake (1.2–1.5 g/kg/day).
- **Avoid:** protein restriction; sedatives; under-dosed lactulose.

| Drug | Dose |
| --- | --- |
| Lactulose | 25 mL orally every 1–2 hours until at least 2 soft bowel movements, then titrate to 2–3 soft bowel movements per day; enema if unable to take orally |
| Polyethylene glycol 3350 (alternative) | 4 L over 4 hours (HELP trial, JAMA Intern Med 2014) |
| Rifaximin | 550 mg orally twice daily |

Related: West Haven, MELD, Child-Pugh.

### B7.12 Acute pancreatitis (id: em\_pancreatitis)

Source: ACG 2024 (Tenner, Am J Gastroenterol 2024).

Bedside algorithm (B7.0). Weight field: yes.

- **Red flags:** persistent SIRS >48 hours, organ failure (modified Marshall score 2 or more), cholangitis: HDU or ICU; cholangitis needs ERCP within 24 hours.
  - Calculators: Marshall.
- **Recognize:** 2 of 3: typical pain, lipase or amylase >3 × ULN, imaging (B4.6). Ultrasound for gallstones in every patient; check triglycerides and calcium.

Algorithm:

- **P1 · 0–6 h · Diagnose, grade and start fluids**
  - Revised Atlanta diagnosis (B4.6): 2 of 3.
  - Ultrasound for gallstones.
  - Bloods: triglycerides, calcium, liver tests, BUN, hematocrit.
  - BISAP and SIRS.
  - Analgesia.
  - Moderately aggressive fluids with lactated Ringer's: 1.5 mL/kg/h, plus a 10 mL/kg bolus if hypovolemic.
  - Calculators: Revised Atlanta, BISAP, SIRS.
  - Weight-based: lactated Ringer's infusion, lactated Ringer's bolus.
  - Why: Aggressive fluids caused more fluid overload without benefit (WATERFALL, NEJM 2022).
- **P2 · 6–48 h · Reassess often and feed early**
  - Reassess often: heart rate, urine output >0.5 mL/kg/h, BUN, hematocrit; monitor closely for the first 24–48 hours; reduce fluids if fluid overload.
  - Red flag: organ failure, modified Marshall score 2 or more (B4.5): HDU or ICU.
  - No prophylactic antibiotics.
  - Early oral feeding within 24–48 hours as tolerated (low-fat solid diet in mild pancreatitis); enteral rather than parenteral feeding in severe pancreatitis.
  - Calculators: Marshall.
  - Weight-based: urine output target.
- **D1 · Within 24 h · Cholangitis?**
  - Urgent ERCP (within 24 hours) only if concomitant cholangitis.
  - Answer Yes: ERCP within 24 hours.
  - Answer No: no early ERCP.
- **P3 · Within 24 h · ERCP for cholangitis** (shown when D1 = Yes)
  - Cholangitis: ERCP within 24 hours (B7.13).
- **P4 · No early ERCP · Gallstone pancreatitis without cholangitis** (shown when D1 = No)
  - Gallstone pancreatitis without cholangitis: no early ERCP.
  - Why: Urgent ERCP without cholangitis gave no benefit (APEC, Lancet 2020).
- **P5 · Same admission · Treat the cause**
  - Mild gallstone pancreatitis: cholecystectomy during the same admission.
  - Alcohol: brief intervention and referral.
  - Why: Fewer recurrent gallstone complications (PONCHO, Lancet 2015).
- **P6 · After 72 h · If deteriorating**
  - Contrast CT (modified CTSI).
  - Suspected infected necrosis (fever, gas on CT): antibiotics; step-up approach, endoscopic first, delaying drainage until walled-off (about 4 weeks) where possible.
  - Calculators: modified CTSI.
  - Why: Postponed drainage was not worse and needed fewer interventions (POINTER, NEJM 2021).
- **Avoid:** aggressive fluids (more fluid overload without benefit; WATERFALL, NEJM 2022); prophylactic antibiotics; early ERCP in biliary pancreatitis without cholangitis; CT in the first 72 hours unless the diagnosis is unclear.

| Item | Dose |
| --- | --- |
| Lactated Ringer's | 1.5 mL/kg/h; add a 10 mL/kg bolus if hypovolemic; reassess frequently and reduce in cardiac or renal disease |
| Rectal indomethacin (post-ERCP pancreatitis prevention, high-risk ERCP) | 100 mg per rectum around the time of ERCP |

Related: BISAP, Ranson, Glasgow-Imrie, SIRS, Marshall, Revised Atlanta, modified CTSI.

### B7.13 Acute cholangitis (id: em\_cholangitis)

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** septic shock, altered consciousness, organ dysfunction (TG18 grade III): ICU.
- **Recognize:** TG18 criteria (B4.8).

Algorithm:

- **C1 · 0–1 h · Diagnose, grade, culture and treat**
  - TG18 diagnosis and severity (B4.8).
  - Blood cultures, then IV antibiotics (within 1 hour in septic shock) covering gram-negative organisms and anaerobes per local resistance; see Antibiotic examples below.
  - Fluids.
  - Check INR and platelets; correct coagulopathy if needed for sphincterotomy.
  - Calculators: TG18 cholangitis.
- **D1 · 0–1 h · TG18 severity grade?**
  - Biliary drainage by ERCP rather than percutaneous drainage, within 48 hours ([ASGE 2021](https://guidelinecentral.com/guideline/1285200)).
  - Answer Grade III: organ support, then urgent drainage.
  - Answer Grade II: ERCP within 48 hours.
  - Answer Grade I: antibiotics, ERCP within 48 hours.
  - Why: ERCP within 48 h is associated with better outcomes (ASGE 2021).
- **C2 · Within 12 h · Grade III (severe)** (shown when D1 = Grade III)
  - Organ support, then urgent biliary drainage as soon as possible after resuscitation (ideally within 12 hours) in septic shock or TG18 grade III (ESGE 2019).
- **C3 · Within 48 h · Grade II (moderate)** (shown when D1 = Grade II)
  - ERCP within 48 hours.
- **C4 · Within 48 h · Grade I (mild)** (shown when D1 = Grade I)
  - Antibiotics; ERCP within 48 hours, sooner if no response within 24 hours.
- **D2 · At ERCP · Stable at ERCP?**
  - Answer Stable: sphincterotomy and stone extraction.
  - Answer Unstable or coagulopathic: stent only.
- **C5 · At ERCP · Stable** (shown when D2 = Stable)
  - If stable, combine drainage with sphincterotomy and stone removal.
- **C6 · At ERCP · Unstable or coagulopathic** (shown when D2 = Unstable or coagulopathic)
  - If unstable or coagulopathic, stent decompression alone; definitive treatment later.
- **C7 · If ERCP fails · Other drainage**
  - ERCP fails or is not possible: percutaneous or EUS-guided drainage.
- **C8 · After source control · Antibiotic duration**
  - Antibiotics 4–7 days after source control (TG18); at least 2 weeks if Enterococcus or Streptococcus bacteremia (TG18).
- **C9 · Same admission · Cholecystectomy**
  - Cholecystectomy for gallstone disease, during the same admission when possible.
- **Avoid:** delaying drainage in grade II–III; full stone clearance in an unstable patient.

**Antibiotic examples (follow local resistance)**

| Situation | Antibiotics |
| --- | --- |
| Grade I–II, community-acquired | Ceftriaxone plus metronidazole, or piperacillin-tazobactam |
| Grade III or healthcare-associated | Piperacillin-tazobactam or meropenem; add vancomycin if indicated |

Related: TG18 cholangitis, ASGE choledocholithiasis risk.

### B7.14 Food bolus and foreign body ingestion (id: em\_foreign\_body)

Source: [ESGE 2016](https://www.doi.org/10.1055/S-0042-100456).

| Situation | Timing of endoscopy |
| --- | --- |
| Complete esophageal obstruction (cannot swallow saliva) | Emergent: preferably within 2 hours, at the latest within 6 hours |
| Sharp-pointed object or battery in the esophagus | Emergent: preferably within 2 hours, at the latest within 6 hours |
| Other esophageal foreign body without complete obstruction | Urgent: within 24 hours |
| Stomach: sharp-pointed objects, magnets, batteries, large or long objects | Urgent: within 24 hours |
| Stomach: medium-sized blunt objects | Non-urgent: within 72 hours |
| Small blunt objects (not batteries or magnets) beyond the esophagus | Observation; outpatient if feasible |
| Drug packets (body packing) | No endoscopic removal; observe; surgery if obstruction or leak |

- **Do now:** plain X-ray (neck, chest, abdomen) for radiopaque objects; CT if perforation is suspected; protect the airway (overtube or intubation if high aspiration risk).
- **Technique:** food bolus can be gently pushed into the stomach or retrieved; take esophageal biopsies to look for eosinophilic esophagitis.
- **Avoid:** barium swallow (aspiration risk, impairs endoscopy); blind pushing of sharp objects; delays with batteries.

### B7.15 Caustic ingestion (id: em\_caustic)

- **Recognize:** acid or alkali ingestion; drooling, dysphagia, odynophagia, stridor, chest or abdominal pain. Symptoms do not predict injury severity.
- **Do now:** airway assessment (early intubation if stridor or airway edema); IV access; NPO; identify the agent; CT chest and abdomen with IV contrast if perforation or transmural necrosis is suspected; surgical team involvement for severe cases.
- **Within hours:** endoscopy within 12–48 hours to grade injury (Zargar, B6.6), unless perforation is evident.
- **Then:** grade 0–2a: oral intake early and discharge. Grade 2b–3: admit, nutritional support, monitor for perforation; stricture surveillance from about 3 weeks.
- **Avoid:** induced vomiting, neutralizing agents, blind nasogastric tube, routine corticosteroids; endoscopy between day 5 and day 15 (weakest wall, higher perforation risk).

Related: Zargar.

### B7.16 Acute colonic pseudo-obstruction, Ogilvie syndrome (id: em\_acpo)

Source: [Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007](https://doi.org/10.1016/j.gie.2019.09.007).

- **Recognize:** marked colonic dilatation without mechanical obstruction (confirm with CT), usually in hospitalized or post-operative patients. Cecal diameter >12 cm or prolonged distension raises perforation risk.
- **Do now:** treat the cause (electrolytes, especially potassium and magnesium; stop opioids and anticholinergics; treat infection); NPO; nasogastric and rectal tube; mobilize; serial X-rays every 12–24 hours.
- **If no response in 24–48 hours:** neostigmine with cardiac monitoring and atropine at the bedside.
- **Then:** neostigmine failure or contraindication: colonoscopic decompression with tube placement. Perforation or peritonitis: surgery.
- **Avoid:** neostigmine with mechanical obstruction, bradycardia, active bronchospasm or recent myocardial infarction.

| Drug | Dose |
| --- | --- |
| Neostigmine | 2 mg IV over 3–5 minutes; may be repeated once if no response |

### B7.17 Colonic volvulus (id: em\_volvulus)

Source: [Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007](https://doi.org/10.1016/j.gie.2019.09.007).

- **Recognize:** abdominal distension and pain; CT shows whirl sign or coffee-bean sign.
- **Sigmoid volvulus without ischemia or perforation:** endoscopic detorsion and decompression, leave a decompression tube; then elective sigmoidectomy during the same admission (high recurrence).
- **Sigmoid volvulus with ischemia, perforation or peritonitis:** emergency surgery.
- **Cecal volvulus:** surgery; endoscopic detorsion is not recommended.
- **Avoid:** endoscopic detorsion when there is mucosal necrosis.

### B7.18 Iatrogenic endoscopic perforation (id: em\_perforation)

Source: [Paspatis GA et al. Diagnosis and management of iatrogenic endoscopic perforations: ESGE Position Statement - Update 2020. Endoscopy 2020;52:792-810. doi:10.1055/a-1222-3191](https://doi.org/10.1055/a-1222-3191).

- **Recognize:** visible defect, fat or extraluminal structures during the procedure; or post-procedure pain, subcutaneous emphysema, fever, tachycardia.
- **Do now:** if recognized during the procedure and the field is clean, close endoscopically at once (through-the-scope clips for small defects; over-the-scope clip or other devices for larger ones); switch to CO2 insufflation; decompress tension pneumoperitoneum with a needle if ventilation or circulation is compromised; IV broad-spectrum antibiotics; NPO; urgent surgical consultation.
- **Then:** CT to assess the leak; surgery if endoscopic closure fails, the defect is large, or peritonitis or sepsis develops.
- **Avoid:** delaying surgical review; air insufflation.

### B7.19 Index of emergency pages

The home screen lists all 18 pages under "Emergencies" with a red label, in this order: Upper GI bleeding, Variceal bleeding, Lower GI bleeding, Anticoagulants in GI bleeding, Acute severe UC, Toxic megacolon, Acute liver failure, Alcohol-associated hepatitis, SBP, HRS-AKI, Hepatic encephalopathy, Acute pancreatitis, Cholangitis, Foreign body, Caustic ingestion, Ogilvie syndrome, Volvulus, Perforation.

Variceal bleeding has no page of its own: its index entry and search result open the upper GI bleeding page (B7.1) at the variceal pathway (B7.2). The index lists 18 entries.

## Part B8: Test vectors

Every result below was computed with an independent reference implementation of the formulas in this spec. Claude Code must turn each row into a unit test; a calculator is not done until its rows pass. Decimal results: match to 2 decimal places unless the result is rounded by rule.

### B8.1 Unit conversions

| Input | Expected |
| --- | --- |
| Bilirubin 34.2 µmol/L | 2.00 mg/dL |
| Creatinine 106 µmol/L | 1.20 mg/dL |
| BUN 25 mg/dL | Urea 8.93 mmol/L |

### B8.2 GI bleeding

| Calculator | Inputs | Expected |
| --- | --- | --- |
| GBS | Urea 9.0 mmol/L, Hb 11.0 g/dL, male, SBP 105, pulse 110, melena yes, others no | 9, not low |
| GBS | Urea 5.0, Hb 13.5 g/dL, male, SBP 120, pulse 80, all others no | 0, low |
| GBS | Urea 30, Hb 8.5 g/dL, female, SBP 85, pulse 120, melena, syncope, hepatic disease, cardiac failure all yes | 23 (maximum) |
| AIMS65 | Albumin 2.8 g/dL, INR 1.6, mental status normal, SBP 100, age 70 | 3, mortality 10.3% |
| Rockall | Age 72, pulse 105, SBP 110, ischemic heart disease; peptic ulcer; visible vessel | Pre-endoscopy 4, not low; complete 7, intermediate |
| Oakland | Age 35, female, no previous admission, DRE no blood, HR 65, SBP 135, Hb 135 g/L | 6, low |
| Oakland | Age 75, male, previous admission yes, DRE blood, HR 105, SBP 100, Hb 85 g/L | 28, not low |

### B8.3 Liver

| Calculator | Inputs | Expected |
| --- | --- | --- |
| Child-Pugh | Bilirubin 2.5 mg/dL, albumin 3.0 g/dL, INR 1.5, mild ascites, no HE | 8, class B |
| MELD / MELD-Na | Bilirubin 2.0 mg/dL, INR 1.5, creatinine 1.2 mg/dL, Na 130 | MELD(i) 15; MELD-Na 21 (unrounded 20.78) |
| MELD / MELD-Na | Bilirubin 0.8, INR 1.0, creatinine 0.7, Na 140 | MELD(i) 6; MELD-Na 6 (all values bounded) |
| MELD / MELD-Na | Bilirubin 5.0, INR 2.0, creatinine 2.0, Na 128, dialysis twice in past week | MELD(i) 34; MELD-Na 36 (unrounded 35.78) |
| MELD 3.0 | Female, bilirubin 2.0, INR 1.5, creatinine 1.2, Na 130, albumin 3.0 g/dL | 22 (unrounded 21.54); 90-day survival 92.5% |
| MELD 3.0 | Same values, male | 20 (unrounded 20.21); 90-day survival 94.7% |
| MELD 3.0 | Male, bilirubin 0.8, INR 1.0, creatinine 0.7, Na 140, albumin 4.0 | 6; 90-day survival 99.5% |
| Maddrey | PT 20 s, control 12 s, bilirubin 10 mg/dL | 46.8, severe |
| Lille | Age 50, albumin 30 g/L, bilirubin day 0 250 µmol/L, day 7 150, creatinine 1.0 mg/dL, PT 18 s | 0.083, responder |
| Lille | Age 55, albumin 25, bilirubin day 0 300, day 7 310, creatinine 1.6 mg/dL, PT 22 s | 0.772, non-responder |
| GAHS | Age 52, WBC 16, urea 6 mmol/L, INR 1.8, bilirubin 300 µmol/L | 11, poor prognosis |
| ABIC | Age 50, bilirubin 10 mg/dL, creatinine 1.0 mg/dL, INR 1.8 | 7.54, intermediate |
| FIB-4 (MASLD) | Age 55, AST 60, ALT 50, platelets 150 | 3.11, high |
| FIB-4 (MASLD) | Age 70, AST 30, ALT 25, platelets 200 | 2.10, indeterminate (age ≥65 low cutoff 2.0) |
| APRI | AST 90, AST ULN 40, platelets 100 | 2.25; significant fibrosis likely; cirrhosis likely |
| NFS | Age 55, BMI 32, diabetes yes, AST 40, ALT 50, platelets 180, albumin 4.0 g/dL | 0.31, indeterminate |
| ALBI | Bilirubin 34 µmol/L, albumin 35 g/L | −1.96, grade 2 |
| Ascitic fluid | Serum albumin 3.0, ascitic albumin 1.0, ascitic protein 1.0 g/dL | SAAG 2.0, portal hypertension, suggests cirrhosis |
| Ascitic PMN | WBC 500/mm³, neutrophils 60% | PMN 300, SBP |
| Ascitic PMN, bloody tap | WBC 1000, neutrophils 30%, RBC 25,000 | Corrected PMN 200, not SBP |
| R factor | ALT 400 (ULN 40), ALP 150 (ULN 120) | 8.0, hepatocellular |
| AIH simplified | ANA 1:80, IgG 1.2 × ULN, typical histology, no viral hepatitis | 8, definite |
| Leipzig | KF rings present, ceruloplasmin 0.08 g/L, all others not done | 4, diagnosis established |
| ACLF | Bilirubin 14 mg/dL, creatinine 1.7 mg/dL, no other failures | Grade 1 |
| ACLF | Creatinine 2.2 mg/dL, INR 2.6 | Grade 2 |
| King's (non-acetaminophen) | INR 4.0, age 45, bilirubin 20 mg/dL | Criteria met (3 of 5) |
| Baveno VII | LSM 27 kPa, platelets 120 | CSPH ruled in |
| Baveno VII | LSM 12 kPa, platelets 180 | cACLD suggestive; CSPH ruled out; screening endoscopy can be avoided |

FibroScan (B3.20) test vectors:

| Inputs | Expected |
| --- | --- |
| MASLD, 10.5 kPa, CAP 310 | F3, S3 |
| MASLD, 6.5 kPa, CAP 240 | F0–F1, S0 |
| Hepatitis C, 13.0 kPa | F4 |
| Hepatitis B, 10.0 kPa | F3 |
| Alcohol-related, 16 kPa | F3 |
| Other, 12 kPa | cACLD suggestive |
| Other, 27 kPa | cACLD highly suggestive; CSPH ruled in (Baveno VII) |
| CAP 250 | S1 |
| CAP 270 | S2 |
| MASLD, 9.0 kPa, IQR/median 35% | F2 shown, plus unreliable-exam warning |

Unit rule (B1.5) test vectors for B2 and B3:

| Calculator | Inputs | Expected |
| --- | --- | --- |
| AIMS65 | Albumin 29.9 g/L (entered in g/L) | Albumin point scored |
| Child-Pugh | Bilirubin 34 µmol/L (entered in µmol/L) | Bilirubin 2 points |
| Lille | Creatinine 115 µmol/L (entered in µmol/L) | Renal insufficiency 0 |
| King's (acetaminophen) | Creatinine 3.4 mg/dL (entered in mg/dL) | Creatinine criterion not met |

### B8.4 Pancreatobiliary

| Calculator | Inputs | Expected |
| --- | --- | --- |
| BISAP | BUN 30 mg/dL, GCS 15, SIRS present, age 65, no effusion | 3, higher risk |
| Ranson (non-gallstone, admission only) | Age 60, WBC 18, glucose 180 mg/dL, LDH 400, AST 100 | 3 at admission (show "48-hour items pending") |
| Modified Marshall | PaO2/FiO2 250, creatinine 1.2 mg/dL, SBP 120 | Respiratory 2, renal 0, cardiovascular 0: organ failure present |
| Modified CTSI | Fluid collection, necrosis ≤30%, pleural effusion | 8, severe |
| TG18 cholangitis | Temperature 39.2 °C, WBC 14, bilirubin 3 mg/dL, dilated duct with stone, age 80, albumin normal, no organ dysfunction | Definite; grade II |
| TG18 cholangitis | Temperature 38.5 °C, WBC 8, bilirubin 34 µmol/L (entered in µmol/L), age 50, no imaging findings | B-1 met; suspected; grade I |
| Modified Marshall | PaO2/FiO2 101, creatinine 124 µmol/L, SBP >90 | Respiratory 3, renal 0, cardiovascular 0 |
| Modified Marshall | PaO2/FiO2 100, creatinine 1.4 mg/dL (entered in mg/dL), SBP >90 | Respiratory 4, renal 1, cardiovascular 0 |
| ASGE choledocholithiasis | CBD 8 mm, bilirubin 3 mg/dL, no stone seen, no cholangitis | Intermediate |

### B8.5 IBD

| Calculator | Inputs | Expected |
| --- | --- | --- |
| Truelove and Witts | 8 bloody stools/day, HR 100 | Severe |
| Oxford / Lindgren | Day-3 stools 5, CRP 50 mg/L | Oxford positive |
| Oxford / Lindgren | Day-3 stools 6, CRP 30 mg/L | Oxford negative; Lindgren 10.2, positive |
| Mayo (full) | Subscores 2, 2, 2, 2 | 8, moderate |
| Mayo (full) | Subscores 2, 0, 0, 0 | 2, mild (remission criteria not met) |
| Partial Mayo | Subscores 2, 2, 2 | 6, moderate |
| UCEIS | 2, 2, 2 | 6 |
| HBI | Well-being 2, pain 2, 5 liquid stools, no mass, 1 complication | 10, moderate |
| CDAI | 7-day stools 28, pain sum 14, well-being sum 14, 1 complication, no antidiarrheal, no mass, male Hct 40%, weight 63 kg, standard weight 70 kg | 296, moderate |
| SES-CD | Ileum 2/2/2/1, right colon 1/1/1/0, others 0 | 10, moderate |
| Rutgeerts | i2a | No endoscopic recurrence; note "i2a carries lower risk; individualize" |
| Rutgeerts | i2b | Endoscopic recurrence: consider escalating therapy |

### B8.6 Endoscopy

| Calculator | Inputs | Expected |
| --- | --- | --- |
| BBPS | Right 2, transverse 3, left 2 | 7, adequate |
| BBPS | Right 3, transverse 3, left 1 | 7, inadequate (a segment <2) |
| Prague | C 2 cm, M 5 cm | "C2M5"; surveillance every 3 years (ACG and ESGE) |

### B8.7 Weight-based doses (B7.0)

Weight entries outside 20–350 kg, or blank, show no calculated dose; entries outside 20–350 kg show "Enter weight between 20 and 350 kg".

| Name | Weight (kg) | Shown |
| --- | --- | --- |
| terlipressin | 49.9 | Terlipressin by weight: 1 mg IV every 4 hours for 48 hours, then 1 mg every 4 hours |
| terlipressin | 50 | Terlipressin by weight: 1.5 mg IV every 4 hours for 48 hours, then 1 mg every 4 hours |
| terlipressin | 70 | Terlipressin by weight: 1.5 mg IV every 4 hours for 48 hours, then 1 mg every 4 hours |
| terlipressin | 70.1 | Terlipressin by weight: 2 mg IV every 4 hours for 48 hours, then 1 mg every 4 hours |
| infliximab 5 mg/kg | 72.5 | Infliximab 5 mg/kg: 362.5 mg IV |
| infliximab 5 mg/kg | 80 | Infliximab 5 mg/kg: 400 mg IV |
| infliximab 10 mg/kg | 72.5 | Infliximab 10 mg/kg: 725 mg IV |
| ciclosporin | 72.5 | Ciclosporin 2 mg/kg/day: 145 mg/day continuous IV infusion |
| albumin day 1 | 72.5 | Albumin day 1, 1.5 g/kg: 108.8 g = 543.8 mL of 20% albumin or 435 mL of 25% albumin |
| albumin day 1 | 60 | Albumin day 1, 1.5 g/kg: 90 g = 450 mL of 20% albumin or 360 mL of 25% albumin |
| albumin day 3 | 72.5 | Albumin day 3, 1 g/kg: 72.5 g = 362.5 mL of 20% albumin or 290 mL of 25% albumin |
| lactated Ringer's infusion | 72.5 | Lactated Ringer's 1.5 mL/kg/h: 108.8 mL/h |
| lactated Ringer's bolus | 72.5 | Lactated Ringer's bolus if hypovolemic, 10 mL/kg: 725 mL |
| urine output target | 72.5 | Target, not a dose. Urine output >0.5 mL/kg/h: >36.3 mL/h |
| infliximab 5 mg/kg | 19.9 | not calculated |
| infliximab 5 mg/kg | 350.1 | not calculated |
| albumin day 1 | 20 | Albumin day 1, 1.5 g/kg: 30 g = 150 mL of 20% albumin or 120 mL of 25% albumin |
| albumin day 3 | 350 | Albumin day 3, 1 g/kg: 350 g = 1750 mL of 20% albumin or 1400 mL of 25% albumin |
| albumin day 1 | 73.3 | Albumin day 1, 1.5 g/kg: 110 g = 549.8 mL of 20% albumin or 439.8 mL of 25% albumin |

### B8.8 Bedside algorithm paths (B7.0)

Steps shown in the normal view for each set of answers (several answers separated by semicolons). In "Show full algorithm" every step is shown; the last rows give the marks.

| Page | Answers | Steps shown |
| --- | --- | --- |
| em\_ugib | none | U1, D1 |
| em\_ugib | D1 = Yes | U1, D1, V1, V2, D2, V5, V6 |
| em\_ugib | D1 = Yes; D2 = Yes | U1, D1, V1, V2, D2, V3, V5, V6 |
| em\_ugib | D1 = Yes; D2 = No | U1, D1, V1, V2, D2, V4, V5, V6 |
| em\_ugib | D1 = No | U1, D1, N1, N2, D3, N5, N6 |
| em\_ugib | D1 = No; D3 = High-risk stigmata | U1, D1, N1, N2, D3, N3, N5, N6 |
| em\_ugib | D1 = No; D3 = Low-risk stigmata | U1, D1, N1, N2, D3, N4, N5, N6 |
| em\_ugib | D1 = No; D2 = Yes | U1, D1, N1, N2, D3, N5, N6 |
| em\_ugib | entry point variceal | U1, D1, V1, V2, D2, V5, V6 |
| em\_asuc | none | A1, D1 |
| em\_asuc | D1 = Yes | A1, D1, A2, D2 |
| em\_asuc | D1 = Yes; D2 = Yes | A1, D1, A2, D2, A4 |
| em\_asuc | D1 = Yes; D2 = No | A1, D1, A2, D2, A5 |
| em\_asuc | D1 = No | A1, D1, A3 |
| em\_asuc | D1 = No; D2 = No | A1, D1, A3 |
| em\_sbp | none | S1, D1 |
| em\_sbp | D1 = PMN 250/mm³ or more | S1, D1, S5, S6, S7 |
| em\_sbp | D1 = PMN <250/mm³, positive culture, symptomatic | S1, D1, S5, S6, S7 |
| em\_sbp | D1 = PMN <250/mm³, positive culture, asymptomatic | S1, D1, S2 |
| em\_sbp | D1 = PMN <250/mm³, culture negative or pending | S1, D1, S3 |
| em\_sbp | D1 = Runyon criteria or polymicrobial culture | S1, D1, S4 |
| em\_pancreatitis | none | P1, P2, D1, P5, P6 |
| em\_pancreatitis | D1 = Yes | P1, P2, D1, P3, P5, P6 |
| em\_pancreatitis | D1 = No | P1, P2, D1, P4, P5, P6 |
| em\_cholangitis | none | C1, D1, D2, C7, C8, C9 |
| em\_cholangitis | D1 = Grade III | C1, D1, C2, D2, C7, C8, C9 |
| em\_cholangitis | D1 = Grade II | C1, D1, C3, D2, C7, C8, C9 |
| em\_cholangitis | D1 = Grade I | C1, D1, C4, D2, C7, C8, C9 |
| em\_cholangitis | D1 = Grade III; D2 = Unstable or coagulopathic | C1, D1, C2, D2, C6, C7, C8, C9 |
| em\_cholangitis | D2 = Stable | C1, D1, D2, C5, C7, C8, C9 |

"Show full algorithm" marks: on path (answer chosen), off path (another answer chosen, or its decision is off path), or not yet decided.

| Page | Answers | On path | Off path | Not yet decided |
| --- | --- | --- | --- | --- |
| em\_ugib | D1 = Yes | V1, V2, D2, V5, V6 | N1, N2, D3, N3, N4, N5, N6 | V3, V4 |
| em\_ugib | none | none | none | V1, V2, D2, V3, V4, V5, V6, N1, N2, D3, N3, N4, N5, N6 |
| em\_sbp | D1 = Runyon criteria or polymicrobial culture | S4 | S2, S3, S5, S6, S7 | none |
| em\_asuc | D1 = No | A3 | A2, D2, A4, A5 | none |

### B8.9 Suggested answers (B7.0)

Calculator inputs are in the calculator's own units. "none" = no answer suggested.

| Page | Decision | Calculator | Inputs | Suggested | Note shown |
| --- | --- | --- | --- | --- | --- |
| em\_ugib | D2 | Child-Pugh | bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.0, ascites moderate to severe, encephalopathy none | Yes | none |
| em\_ugib | D2 | Child-Pugh | bilirubin 1.5 mg/dL, albumin 3.6 g/dL, INR 1.2, ascites none, encephalopathy none | none | none |
| em\_ugib | D2 | Child-Pugh | bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.5, ascites moderate to severe, encephalopathy grade 1–2 | No | Pre-emptive TIPS not recommended (Child-Pugh >13) |
| em\_ugib | D2 | Child-Pugh | bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.5, ascites moderate to severe, encephalopathy grade 3–4 | No | Pre-emptive TIPS not recommended (Child-Pugh >13) |
| em\_ugib | D2 | Child-Pugh | bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.5, ascites moderate to severe, encephalopathy none | Yes | none |
| em\_ugib | D3 | Forrest | IIb | High-risk stigmata | none |
| em\_ugib | D3 | Forrest | IIc | Low-risk stigmata | none |
| em\_asuc | D1 | Day-3 Oxford | stools 9, CRP 10 mg/L | Yes | none |
| em\_asuc | D1 | Day-3 Oxford | stools 4, CRP 20 mg/L | No | none |
| em\_sbp | D1 | Ascitic fluid analysis | WBC 500/mm³, neutrophils 60% | PMN 250/mm³ or more | none |
| em\_sbp | D1 | Ascitic fluid analysis | WBC 300/mm³, neutrophils 50% | none | none |
| em\_sbp | D1 | Ascitic fluid analysis | WBC 1000/mm³, neutrophils 90%, total protein 1.5 g/dL, glucose 40 mg/dL | Runyon criteria or polymicrobial culture | none |
| em\_sbp | D1 | Ascitic fluid analysis | WBC 1000/mm³, neutrophils 90%, total protein 1.5 g/dL, glucose 60 mg/dL | PMN 250/mm³ or more | none |
| em\_sbp | D1 | Ascitic fluid analysis | WBC 300/mm³, neutrophils 50%, total protein 1.5 g/dL, glucose 40 mg/dL | none | none |
| em\_cholangitis | D1 | TG18 cholangitis | temperature 38.5 °C, WBC 15 ×10⁹/L, bilirubin 3 mg/dL, biliary dilatation, age 50 | Grade I | none |
| em\_cholangitis | D1 | TG18 cholangitis | temperature 38.5 °C, WBC 15 ×10⁹/L, bilirubin 3 mg/dL, biliary dilatation, age 80 | Grade II | none |
| em\_cholangitis | D1 | TG18 cholangitis | temperature 38.5 °C, WBC 8 ×10⁹/L, bilirubin 0.8 mg/dL, age 80, hypotension needing vasopressors | none | none |

## Part B9: References

Primary guidelines and papers behind Part B. Claude Code shows the relevant one on each screen; links below are the pages used to check this spec.

| Topic | Source |
| --- | --- |
| Upper GI bleeding | Laine L et al. ACG Clinical Guideline: Upper GI and Ulcer Bleeding. Am J Gastroenterol 2021; Gralnek IM et al. ESGE NVUGIH guideline update. Endoscopy 2021 |
| GBS points | [Blatchford O et al. Lancet 2000 (table)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5299211/table/tab2d) |
| Rockall | [Rockall TA et al. Gut 1996 (table)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4753192/table/T1) |
| AIMS65 | Saltzman JR et al. Gastrointest Endosc 2011 |
| Lower GI bleeding and Oakland threshold | [Sengupta N et al. ACG guideline 2023](https://gastroenterology.acponline.org/archives/2023/03/24/2.htm); Oakland K et al. Lancet Gastroenterol Hepatol 2017 |
| Antithrombotics in GI bleeding | [Abraham NS et al. ACG-CAG guideline 2022](https://gastroenterology.acponline.org/archives/2022/03/25/1.htm) |
| Variceal bleeding | de Franchis R et al. Baveno VII, J Hepatol 2022; [Gralnek IM et al. ESGE variceal guideline 2022](https://pubmed.ncbi.nlm.nih.gov/36174643) |
| MELD 3.0 | [Kim WR et al. Gastroenterology 2021; OPTN](https://optn.transplant.hrsa.gov/media/uq4bmlan/liver_meld_peld_1a_1b_presentation_winter-2022-pc.pdf) |
| HRS-AKI | [Nadim MK et al. ICA-ADQI consensus. J Hepatol 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11193657) |
| ACLF | Moreau R et al. CANONIC. Gastroenterology 2013 |
| Alcohol-associated hepatitis | Louvet A et al. Hepatology 2007 (Lille); Dominguez M et al. Am J Gastroenterol 2008 (ABIC); Forrest EH et al. Gut 2005 (GAHS); Thursz MR et al. NEJM 2015 (STOPAH) |
| Fibrosis scores | Angulo P et al. Hepatology 2007 (NFS); AASLD MASLD guidance 2023; Eddowes PJ et al. Gastroenterology 2019 (FibroScan in MASLD); Castera L et al. Gastroenterology 2005 (FibroScan in hepatitis C); Chon YE et al. PLoS One 2012 (FibroScan in hepatitis B); [JHEP Reports 2020;2(3):100101, doi:10.1016/j.jhepr.2020.100101](https://pmc.ncbi.nlm.nih.gov/articles/PMC7267467/) (FibroScan in alcohol-related liver disease); Karlas T et al. J Hepatol 2017 (CAP) |
| AIH | [Hennes EM et al. Hepatology 2008](https://pmc.ncbi.nlm.nih.gov/articles/PMC7366136/table/T1) |
| Wilson disease | [Ferenci P et al. Liver Int 2003; EASL 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC8584493/table/jcm-10-05097-t001) |
| Acute pancreatitis | [Tenner S et al. ACG guideline 2024](https://guidelinecentral.com/guideline/12896); Banks PA et al. Revised Atlanta, Gut 2013; de-Madaria E et al. WATERFALL, NEJM 2022 |
| Modified Marshall | [Revised Atlanta table](https://pmc.ncbi.nlm.nih.gov/articles/PMC4753186/table/T3) |
| Cholangitis | [TG18 diagnostic and severity criteria](https://pubmed.ncbi.nlm.nih.gov/29032610/); [ASGE cholangitis guideline 2021](https://guidelinecentral.com/guideline/1285200) |
| Choledocholithiasis | [Buxbaum JL et al. ASGE 2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC8594622/table/T17) |
| Acute severe UC | [Travis SP et al. Gut 1996](https://pubmed.ncbi.nlm.nih.gov/8984031/); ECCO UC guidelines 2022 |
| UCEIS | [Travis SP et al. Gut 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC3292713/table/tbl6) |
| CDAI | [Best WR et al. Gastroenterology 1976](https://pmc.ncbi.nlm.nih.gov/articles/PMC10321231/table/T2) |
| Barrett's surveillance | [Shaheen NJ et al. ACG 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC10259184/table/T5); [Weusten B et al. ESGE 2023](https://www.thieme-connect.de/products/ejournals/html/10.1055/a-2176-2440?lang=de) |
| GERD | [Gyawali CP et al. Lyon Consensus 2.0. Gut 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10846564/) |
| Foreign bodies | [Birk M et al. ESGE 2016](https://www.doi.org/10.1055/S-0042-100456) |
| Colonic pseudo-obstruction and volvulus | [Naveed M et al. ASGE guideline. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007](https://doi.org/10.1016/j.gie.2019.09.007) (PMID 31791596) |
| Iatrogenic endoscopic perforation | [Paspatis GA et al. ESGE Position Statement, Update 2020. Endoscopy 2020;52:792-810. doi:10.1055/a-1222-3191](https://doi.org/10.1055/a-1222-3191) (PMID 32781470) |
| Acute liver failure definition (AASLD) | Lee WM, Stravitz RT, Larson AM. Introduction to the revised AASLD Position Paper on acute liver failure 2011. Hepatology 2012;55(3):965-7. doi:10.1002/hep.25551 (PMID 22213561) |
| Cholangitis drainage timing (ESGE 2019) | Manes G et al. Endoscopic management of common bile duct stones: ESGE guideline. Endoscopy 2019;51(5):472-491. doi:10.1055/a-0862-0346 (PMID 30943551) |
| Toxic megacolon (Jalan criteria) | Jalan KN et al. An experience of ulcerative colitis. I. Toxic dilation in 55 cases. Gastroenterology 1969;57(1):68-82 (PMID 5305933) |
| Hepatic encephalopathy (HELP trial) | Rahimi RS et al. Lactulose vs polyethylene glycol 3350-electrolyte solution for treatment of overt hepatic encephalopathy: the HELP randomized clinical trial. JAMA Intern Med 2014;174(11):1727-33. doi:10.1001/jamainternmed.2014.4746 (PMID 25243839) |
| Los Angeles classification | Lundell LR et al. Endoscopic assessment of oesophagitis: clinical and functional correlates and further validation of the Los Angeles classification. Gut 1999;45(2):172-80. doi:10.1136/gut.45.2.172 (PMID 10403727) |
| Prague C and M criteria | Sharma P et al. The development and validation of an endoscopic grading system for Barrett's esophagus: the Prague C & M criteria. Gastroenterology 2006;131(5):1392-9. doi:10.1053/j.gastro.2006.08.032 (PMID 17101315) |
| Bedside algorithm trials and sources (B7.0) | Villanueva C et al. Transfusion strategies for acute upper gastrointestinal bleeding. NEJM 2013 (PMID 23281973); Garcia-Pagan JC et al. Early use of TIPS in patients with cirrhosis and variceal bleeding. NEJM 2010 (PMID 20573925); Lau JYW et al. Timing of endoscopy for acute upper gastrointestinal bleeding. NEJM 2020 (PMID 32242355); HALT-IT Trial Collaborators. Lancet 2020 (PMID 32563378); Chavez-Tapia NC et al. Antibiotic prophylaxis for cirrhotic patients with upper gastrointestinal bleeding. Cochrane Database Syst Rev 2010 (PMID 20824832); Laharie D et al. Ciclosporin versus infliximab in patients with severe ulcerative colitis refractory to intravenous steroids (CYSIF). Lancet 2012 (PMID 23063316); Williams JG et al. Infliximab versus ciclosporin for steroid-resistant acute severe ulcerative colitis (CONSTRUCT). Lancet Gastroenterol Hepatol 2016 (PMID 27595142); Grainge MJ et al. Venous thromboembolism during active disease and remission in inflammatory bowel disease: a cohort study. Lancet 2010 (PMID 20149425); Randall J et al. Delayed surgery for acute severe colitis is associated with increased risk of postoperative complications. Br J Surg 2010 (PMID 20101648); Sort P et al. NEJM 1999 (PMID 10432325); de-Madaria E et al. Aggressive or moderate fluid resuscitation in acute pancreatitis (WATERFALL). NEJM 2022;387:989-1000 (PMID 36103415); Schepers NJ et al. Urgent ERCP with sphincterotomy versus conservative treatment in predicted severe acute gallstone pancreatitis (APEC). Lancet 2020 (PMID 32682482); da Costa DW et al. Same-admission versus interval cholecystectomy for mild gallstone pancreatitis (PONCHO). Lancet 2015 (PMID 26460661); Boxhoorn L et al. Immediate versus postponed intervention for infected necrotizing pancreatitis (POINTER). NEJM 2021 (PMID 34614330). Each links to https://pubmed.ncbi.nlm.nih.gov/PMID/ |
| Spontaneous bacterial peritonitis (B7.9) | [EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis. J Hepatol 2018 (PMID 29653741)](https://pubmed.ncbi.nlm.nih.gov/29653741/); [Biggins SW et al. AASLD practice guidance on diagnosis, evaluation and management of ascites, spontaneous bacterial peritonitis and hepatorenal syndrome. Hepatology 2021 (PMID 33942342)](https://pubmed.ncbi.nlm.nih.gov/33942342/) |
| Hosting | [GitHub Pages availability](https://GitHub.com/apps/github-pages) |
| Claude Code on the web | [Claude Code docs: cloud sessions](https://code.claude.com/docs/en/web-quickstart.md) |
