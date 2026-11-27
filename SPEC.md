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

- 45 calculators and selectable cards (B2 to B5), 3 motility calculators (B10), 22 classification reference cards (B6; five are calculators), and 18 emergency pages (B7), all in the emergency index; every emergency page is an interactive bedside algorithm (B7.0).
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

Exact equivalents: a converted value is rounded to 12 significant digits before any comparison, so an entry that is the exact equivalent of a cutoff counts as the cutoff (205.2 µmol/L bilirubin = 12 mg/dL, not 11.999999999999998). Values derived from lab entries and compared with a cutoff (SAAG) are rounded the same way. Every cutoff of every calculator with a unit toggle is tested at its exact equivalent in the other unit (B8.1); cutoffs with no exact equivalent (a repeating decimal, for example urea 6.5 mmol/L in BUN) and identity conversions (platelets, WBC) are listed in the test.

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
| Home | Search bar matching names, aliases and tags; category tiles in this order (GI bleeding, Liver, Pancreas and biliary, IBD, Motility, Endoscopy classifications, Emergencies); each calculator and card appears in exactly one category; in a category, calculators come first (in SPEC order), then cards (in SPEC order); Favorites (star); Recent (last 10) |
| Calculator | Inputs; sticky result card that updates live; band label plus color (green low, amber intermediate, red high; text label always shown, never color alone); interpretation; action; points breakdown; references; "Copy result" (one line, e.g. "GBS 7, not low risk", no identifiers) |
| Classification card | Title, table, one-line clinical use, reference |
| Emergency page: bedside algorithm (B7.0) | Red flags box; weight field (kg, never stored); Recognize; step cards with timeline chips, decision buttons, built-in calculators, weight-based doses and why lines; Show full algorithm toggle; Avoid; tables; Doses; buttons to related calculators; reference list |
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

Twenty-one liver tools. Formulas use natural log (ln) unless written log10. Apply every bound before calculating.

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

ACLF grade 1–3 links to the acute-on-chronic liver failure page (B7.20); "No ACLF" has no link. Prognosis in ACLF: CLIF-C ACLF score (B3.21).

### B3.18 King's College criteria (id: kings)

Checklist for listing in acute liver failure; link to the ALF emergency page.

| Type | Criteria met if |
| --- | --- |
| Acetaminophen | Arterial pH <7.30 after adequate fluid resuscitation; OR all three within 24 hours: INR >6.5 (PT >100 s), creatinine >3.4 mg/dL (>300 µmol/L), and HE grade 3–4 |
| Acetaminophen, modified (optional toggle) | Also met if arterial lactate >3.5 mmol/L at 4 hours or >3.0 mmol/L at 12 hours after fluid resuscitation |
| Non-acetaminophen | INR >6.5 (PT >100 s) regardless of HE grade; OR any 3 of: age <10 or >40 years; cause non-A non-B hepatitis, halothane, or idiosyncratic drug reaction; jaundice to encephalopathy >7 days; INR >3.5 (PT >50 s); bilirubin >17.6 mg/dL (>300 µmol/L) |

Result text if met: "Meets King's College criteria: poor prognosis without transplant. Contact a liver transplant center now."

### B3.19 Baveno VIII non-invasive portal hypertension (id: baveno8)

Source: [Baveno VIII Faculty. Baveno VIII - Advancing consensus in portal hypertension. J Hepatol 2026;85:993-1018 (PMID 42624290)](https://pubmed.ncbi.nlm.nih.gov/42624290/). The old id baveno7 (the previous Baveno calculator) opens this calculator, so saved links, favorites and recent items keep working.

Inputs: liver stiffness LSM (VCTE, kPa); etiology (viral, alcohol, MASLD, other); platelets (×10⁹/L, optional); spleen stiffness SSM (100 Hz VCTE, kPa, optional); BMI 30 or more (tick box, shown for MASLD); clinical or imaging signs of portal hypertension (varices, collaterals, splenomegaly, ascites) (tick box); eligible for carvedilol or a non-selective beta-blocker (yes or no, optional).

| Part | Rule | Shown |
| --- | --- | --- |
| cACLD | LSM <10 kPa | "cACLD ruled out; negligible 3-year risk of decompensation." |
| cACLD | LSM <10 kPa and the signs-of-portal-hypertension box ticked | "LSM <10 kPa with clinical or imaging signs of portal hypertension: suspect vascular liver disease (portosinusoidal vascular disorder, PSVD)." |
| cACLD | LSM 10–15 kPa | "Suggestive of cACLD." |
| cACLD | LSM >15 kPa | "Highly suggestive of cACLD." |
| cACLD | LSM ≥10 kPa | "Repeat fasting LSM to confirm." |
| CSPH ruled in | LSM ≥25 kPa with viral, alcohol, or MASLD without BMI ≥30; or SSM >55 kPa (any etiology); and the rule-out is not met | "CSPH ruled in." |
| CSPH ruled out | LSM ≤15 kPa and platelets ≥150, and SSM not >55 kPa | "CSPH ruled out; repeat LSM in 12 months." |
| Discordant results | LSM ≤15 kPa and platelets ≥150, and SSM >55 kPa | "Discordant results: rule-out (LSM 15 or less and platelets 150 or more) and SSM >55 kPa both met. Consider HVPG or specialist review." No CSPH conclusion and no treatment line |
| CSPH indeterminate | None of the above | "CSPH indeterminate: repeat non-invasive tests in 12 months or add SSM." |
| Other etiology | Other, LSM ≥25 kPa | "LSM 25 kPa or more suggests CSPH, but this rule is validated only in viral, alcohol and non-obese MASLD; confirm with SSM or HVPG." |
| Obese MASLD | MASLD with BMI ≥30 | "Obese MASLD: the LSM rule for CSPH does not apply; use ANTICIPATE-NASH or NICER (probability 75% or more), not built in." |
| Treatment | CSPH ruled in | "Start a non-selective beta-blocker, preferably carvedilol." |
| Screening endoscopy | Always | "Screening endoscopy only if not eligible for carvedilol or a non-selective beta-blocker; patients on these drugs do not need screening endoscopy." |
| Screening endoscopy | LSM <20 kPa and platelets ≥150 (Baveno VI criteria), or SSM <40 kPa | "If not eligible: screening endoscopy can be avoided (LSM <20 kPa and platelets ≥150, Baveno VI criteria; or SSM <40 kPa)." |
| Screening endoscopy | Eligible = no, and the line above does not apply | "Not eligible: screening endoscopy. No varices: repeat upper endoscopy in 2 years (active etiology) or 3 years (etiology removed or suppressed)." |
| Rule of five | Always | "Rule of five: LSM 10, 15, 20, 25 kPa = progressively higher risk of decompensation and liver-related death." plus the highest of 10, 15, 20, 25 kPa reached ("This LSM: ≥15 kPa"), or "This LSM: below 10 kPa" |

Band: CSPH ruled in (high), CSPH ruled out (low), CSPH indeterminate (intermediate) or Discordant results (intermediate). Display: "LSM X kPa: [cACLD text]" and the band.

Notes always shown: "Repeat non-invasive tests every 12 months in cACLD; the most recent value guides decisions." and "Stages of cirrhosis (Baveno VIII): compensated without or with CSPH; decompensated (overt ascites, variceal bleeding, overt HE grade 2 or more); further decompensation; recompensation (etiology cured, controlled or suppressed; no ascites off diuretics; no overt HE off prophylaxis; no variceal rebleeding; for 6 months or more; Child-Pugh A5/A6)."

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
| Other/mixed | No F stage; show Baveno VIII only (below) | | | Baveno VIII 2026 |

Alcohol-related note: "Higher AST or bilirubin raises stiffness; repeat after abstinence."

**Baveno VIII.** The portal hypertension line follows the Baveno VIII rules (B3.19) for the inputs FibroScan has. For Other/mixed this is the result: <10 kPa cACLD ruled out; 10–15 suggestive; >15 highly suggestive. CSPH ruled in at 25 kPa or more only for hepatitis B, hepatitis C, alcohol-related, and MASLD without BMI ≥30: "CSPH ruled in (Baveno VIII)". MASLD has a "BMI 30 or more" tick box: obese MASLD never shows "CSPH ruled in" from LSM; at 25 kPa or more it shows "LSM rule for CSPH not applicable in obese MASLD (Baveno VIII)". Other/mixed never shows CSPH ruled in from LSM; at 25 kPa or more it shows "LSM 25 kPa or more suggests CSPH, but this rule is validated only in viral, alcohol and non-obese MASLD; confirm with SSM or HVPG." CSPH ruled out needs platelets and spleen stiffness needs its own input: the result links to the Baveno VIII calculator (B3.19). For all diseases, show one small Baveno VIII line under the result.

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

### B3.21 CLIF-C OF and CLIF-C ACLF score (id: clif\_c\_aclf)

For patients with ACLF (B3.17); built into the acute-on-chronic liver failure page (B7.20). Source: [Jalan R et al. J Hepatol 2014 (PMID 24950482)](https://pubmed.ncbi.nlm.nih.gov/24950482/); note from [Engelmann C et al. Crit Care 2018 (PMID 30305132)](https://pubmed.ncbi.nlm.nih.gov/30305132/).

CLIF-C OF: each organ scores 1 to 3; total 6–18. Bilirubin and creatinine cutoffs are given in mg/dL only, so µmol/L entries are converted (B1.5).

| Organ | 1 point | 2 points | 3 points |
| --- | --- | --- | --- |
| Liver, bilirubin (mg/dL) | <6 | 6 to <12 | ≥12 |
| Kidney, creatinine (mg/dL) | <2 | 2 to <3.5 | ≥3.5 or renal replacement therapy |
| Brain, HE (West Haven) | None | Grade 1–2 | Grade 3–4, or intubated for HE |
| Coagulation, INR | <2 | 2 to <2.5 | ≥2.5 |
| Circulation | MAP ≥70 mmHg | MAP <70 mmHg | Vasopressors |
| Respiration | PaO2/FiO2 >300, or SpO2/FiO2 >357 | PaO2/FiO2 201–300 (>200 to 300), or SpO2/FiO2 215–357 (>214 to 357) | PaO2/FiO2 ≤200, or SpO2/FiO2 ≤214, or mechanical ventilation not for HE |

Inputs: renal replacement therapy scores kidney 3 without a creatinine; vasopressors score circulation 3 without a MAP; mechanical ventilation not for HE scores respiration 3 without a ratio. Respiration uses PaO2/FiO2 when entered, otherwise SpO2/FiO2. Until each organ can be scored, show "Enter the missing items" with the list.

```latex
\text{CLIF-C ACLF} = 10 \times \left[0.33 \times \text{CLIF-C OF} + 0.04 \times \text{age (years)} + 0.63 \times \ln(\text{WBC}, 10^9/\text{L}) - 2\right]
```

Shown to 1 decimal place (round half up). The >70 cutoff uses the unrounded value (70.4 shows 70.4 and is above 70).

Organ failures are counted from the same inputs by the EASL-CLIF failure definitions (B3.17): liver bilirubin ≥12 mg/dL; kidney creatinine ≥2 mg/dL or renal replacement therapy; brain HE grade 3–4 (or intubated for HE); coagulation INR ≥2.5; circulation vasopressors; respiration PaO2/FiO2 ≤200, SpO2/FiO2 ≤214, or mechanical ventilation not for HE. The result shows the count and the failed organs.

| Result | Band | Action text |
| --- | --- | --- |
| Score ≤70 and fewer than 4 organ failures | CLIF-C ACLF 70 or less | (none) |
| Score ≤70 and 4 or more organ failures | CLIF-C ACLF 70 or less | After 3–7 days of full organ support, with 4 or more organ failures or a score above 70 and no transplant option: discuss withdrawal of organ support and palliative care with the family (B7.20). |
| Score >70 | CLIF-C ACLF above 70 | Same action text |

No mortality bands. With a score above 70, show the note: "A score of 70 or more after 48 h of ICU support was associated with 100% 28-day mortality in one ICU cohort (Engelmann, Crit Care 2018)."

Every result links to the acute-on-chronic liver failure page (B7.20).

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

Ten tools: four for ulcerative colitis, three for Crohn's disease activity, one post-operative score, the Montreal classification and the Jalan criteria for toxic megacolon.

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

### B5.10 Jalan criteria for toxic megacolon (id: jalan)

Checklist, built into the toxic megacolon page (B7.6). Source: [Jalan KN et al. Gastroenterology 1969 (PMID 5305933)](https://pubmed.ncbi.nlm.nih.gov/5305933/).

| Part | Items (tick boxes) | Needed |
| --- | --- | --- |
| A | Colonic dilatation >6 cm on X-ray | Required |
| B | Fever >38.6 °C; heart rate >120/min; neutrophil count >10.5 ×10⁹/L; anemia | At least 3 of 4 |
| C | Dehydration; altered consciousness; electrolyte disturbance; hypotension | At least 1 of 4 |

Result: "Criteria met" when A, at least 3 of B and at least 1 of C are ticked (band high; action text: "Toxic megacolon: urgent surgical review and the toxic megacolon algorithm."); otherwise "Criteria not met" (band neutral). Breakdown: A yes or no, B count of 4, C count of 4.

## Part B6: Endoscopy and luminal classifications

Twenty-two reference cards (five of them calculators: BBPS, Prague, EREFS, Spigelman, OLGA and OLGIM). Each table card: title, table, the user can tap a row to highlight it and copy "Classification: grade", one-line clinical use, notes, links to related items, and the source. Every card added from B6.9 cites its source with an exact PubMed link. Cards are listed under "Endoscopy classifications" unless their section has a "Category:" line: Bristol and Lyon 2.0 are under Motility (B10), Sarin under GI bleeding (after Forrest), Bismuth-Corlette and Strasberg under Pancreas and biliary. Search, links, favorites and recent items open every card wherever it is listed.

### B6.1 Boston Bowel Preparation Scale (id: bbps; calculator)

Score each segment (right, transverse, left) after cleaning. Source: Lai, Gastrointest Endosc 2009.

| Score | Description |
| --- | --- |
| 0 | Unprepared segment; mucosa not seen because of solid stool that cannot be cleared |
| 1 | Portion of mucosa seen; other areas not well seen because of staining, residual stool and/or opaque liquid |
| 2 | Minor residual staining, small fragments of stool and/or opaque liquid, but mucosa well seen |
| 3 | Entire mucosa well seen; no residual staining, stool or opaque liquid |

Total 0–9. Adequate preparation: total ≥6 with every segment ≥2. If inadequate: "Repeat colonoscopy within 1 year (US Multi-Society Task Force)." Note shown on the screen: "Total 0–9. Adequate preparation: 2 or more in every segment (total 6 or more). Inadequate: repeat colonoscopy within 1 year."

### B6.2 Los Angeles classification of erosive esophagitis (id: la\_grade)

| Grade | Definition |
| --- | --- |
| A | One or more mucosal breaks ≤5 mm, not extending between the tops of two mucosal folds |
| B | One or more mucosal breaks >5 mm, not continuous between the tops of two mucosal folds |
| C | Mucosal breaks continuous between the tops of two or more folds, involving <75% of the circumference |
| D | Mucosal breaks involving ≥75% of the circumference |

Clinical use: grades B, C and D are conclusive evidence of GERD (Lyon 2.0); grade A is not conclusive.

### B6.3 Prague C and M criteria with Barrett's surveillance (id: prague; calculator)

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
| Mixed types | Combinations, for example 0-IIa+IIc |
| LST-G homogeneous | Laterally spreading tumor, granular, homogeneous |
| LST-G nodular mixed | Laterally spreading tumor, granular, nodular mixed |
| LST-NG flat elevated | Laterally spreading tumor, non-granular, flat elevated |
| LST-NG pseudodepressed | Laterally spreading tumor, non-granular, pseudodepressed |

Source: Paris workshop, Gastrointest Endosc 2003. Note: "Depressed (0-IIc) components carry a higher risk of submucosal invasion." Note: "LST-NG pseudodepressed and LST-G nodular mixed carry the highest risk of submucosal invasion: en bloc resection."

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

Category: Motility.

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

Category: Motility.

Source: [Gyawali, Gut 2024 (Lyon 2.0)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10846564/).

| Evidence level | Endoscopy | Reflux monitoring off proton pump inhibitor (PPI) |
| --- | --- | --- |
| Conclusive for GERD | LA grade B, C or D esophagitis; biopsy-proven Barrett's esophagus; peptic stricture | Acid exposure time (AET) >6% (24-hour study, or on ≥2 days of a wireless study) |
| Borderline or inconclusive | LA grade A | AET 4–6%; reflux episodes 40–80 per day |
| Against GERD | Normal endoscopy (supportive only) | AET <4% on every day of the study, with <40 reflux episodes per day |

Adjunctive evidence: reflux episodes >80 per day supports GERD; mean nocturnal baseline impedance (MNBI) <1500 Ω supports GERD and >2500 Ω argues against it. Note: "Prolonged wireless pH monitoring off PPI is preferred for unproven GERD."

### B6.9 EREFS, endoscopic reference score for eosinophilic esophagitis (id: erefs; calculator)

Source: [Hirano I et al. Gut 2013 (PMID 22619364)](https://pubmed.ncbi.nlm.nih.gov/22619364/). Score the proximal and the distal esophagus separately; each region 0–9, total 0–18.

| Feature | Grades |
| --- | --- |
| Edema | 0 absent; 1 present |
| Rings | 0 none; 1 mild (subtle ridges); 2 moderate (distinct rings, standard scope passes); 3 severe (scope does not pass) |
| Exudates | 0 none; 1 mild (10% or less of the surface); 2 severe (>10% of the surface) |
| Furrows | 0 none; 1 mild; 2 severe |
| Stricture | 0 absent; 1 present |

Result: proximal score, distal score and total (no bands). Note: "Minor features, not scored: crepe-paper mucosa, narrow-caliber esophagus." Note: "Score before biopsies; use the score to follow response to treatment." Note: "No validated cut-off; higher scores mean more active disease. Use to compare over time; histology (15 or more eosinophils per high-power field) is still required."

### B6.10 Sydney classification of deep mural injury after EMR (id: sydney\_dmi)

Source: [Burgess NG et al. Gut 2017 (PMID 27464708)](https://pubmed.ncbi.nlm.nih.gov/27464708/).

| Type | Finding | Management |
| --- | --- | --- |
| 0 | Normal blue-mat submucosa | No closure needed |
| I | Muscularis propria visible, not injured | No closure needed |
| II | Focal loss of the submucosal plane; muscle injury cannot be excluded | Clip closure (muscle injury cannot be excluded) |
| III | Muscle injured (target sign on the specimen or mirror target in the defect) | Close promptly with through-the-scope or over-the-scope clips |
| IV | Hole within a white cautery ring, no contamination | Close promptly with through-the-scope or over-the-scope clips; antibiotics, admission and surgical review |
| V | Hole with contamination | Close promptly with through-the-scope or over-the-scope clips; antibiotics, admission and surgical review |

Clinical use: "Types III–V need prompt clip closure; types IV–V also need antibiotics, admission and surgical review." Links: Iatrogenic endoscopic perforation (em\_perforation).

### B6.11 JNET classification (narrow-band imaging with magnification) (id: jnet)

Source: [Sano Y et al. Dig Endosc 2016 (PMID 26927367)](https://pubmed.ncbi.nlm.nih.gov/26927367/).

| Type | Vessel pattern | Surface pattern | Likely histology | Action |
| --- | --- | --- | --- | --- |
| 1 | Invisible | Regular dark or white spots, like normal mucosa | Hyperplastic polyp or sessile serrated lesion | Diminutive (5 mm or less) rectosigmoid hyperplastic polyps can be left in place only with a high-confidence optical diagnosis; resect sessile serrated lesions. |
| 2A | Regular caliber and distribution (meshed or spiral) | Regular tubular, branched or papillary | Low-grade intramucosal neoplasia | Endoscopic resection |
| 2B | Variable caliber, irregular distribution | Irregular or obscure | High-grade intramucosal neoplasia or shallow submucosal invasive cancer | En bloc resection; add magnifying chromoendoscopy (pit pattern) |
| 3 | Loose vessel areas, interruption of thick vessels | Amorphous areas | Deep submucosal invasive cancer | Surgery |

Clinical use: "Type 2B needs en bloc resection and pit pattern assessment; type 3 suggests deep submucosal invasion: surgery." Links: NICE (nice), Kudo pit pattern (kudo).

### B6.12 Kudo pit pattern classification (id: kudo)

Source: [Kudo S et al. Gastrointest Endosc 1996 (PMID 8836710)](https://pubmed.ncbi.nlm.nih.gov/8836710/).

| Type | Pit pattern | Likely histology and action |
| --- | --- | --- |
| I | Round | Normal |
| II | Stellar or papillary | Hyperplastic |
| IIIS | Small tubular or round | Depressed adenoma or early cancer |
| IIIL | Large tubular or roundish | Adenoma |
| IV | Branch-like or gyrus-like | Adenoma, often villous |
| VI | Irregular | High-grade dysplasia or superficial submucosal cancer: en bloc resection; high-grade VI may indicate deep invasion, so consider surgery |
| VN | Non-structural | Deep submucosal invasion: surgery |

Clinical use: "Type VI needs en bloc resection (high-grade VI may indicate deep invasion, so consider surgery); type VN suggests deep submucosal invasion: surgery."

### B6.13 Malignant colorectal polyp: Haggitt and Kikuchi levels (id: haggitt\_kikuchi)

Sources: [Haggitt RC et al. Gastroenterology 1985 (PMID 4007423)](https://pubmed.ncbi.nlm.nih.gov/4007423/); [Kikuchi R et al. Dis Colon Rectum 1995 (PMID 7497841)](https://pubmed.ncbi.nlm.nih.gov/7497841/); [Hashiguchi Y et al. JSCCR guidelines 2019. Int J Clin Oncol 2020 (PMID 31203527)](https://pubmed.ncbi.nlm.nih.gov/31203527/).

| Level | Polyp type | Depth of invasion |
| --- | --- | --- |
| Haggitt 0 | Pedunculated | Intramucosal |
| Haggitt 1 | Pedunculated | Head |
| Haggitt 2 | Pedunculated | Neck |
| Haggitt 3 | Pedunculated | Stalk |
| Haggitt 4 | Pedunculated or sessile | Submucosa below the stalk; all invasive sessile cancers are level 4 |
| Kikuchi sm1 | Sessile | Upper third of the submucosa |
| Kikuchi sm2 | Sessile | Middle third of the submucosa |
| Kikuchi sm3 | Sessile | Lower third of the submucosa |

Clinical use: "Lymph node risk rises with Haggitt level 4 and Kikuchi sm2–sm3." Note: "Endoscopic resection is curative when: submucosal invasion <1000 µm, well or moderately differentiated (or papillary), no lymphovascular invasion, tumor budding grade 1, negative vertical margin (JSCCR 2019); otherwise discuss surgery."

### B6.14 Sarin classification of gastric varices (id: sarin)

Category: GI bleeding.

Source: [Sarin SK et al. Hepatology 1992 (PMID 1446890)](https://pubmed.ncbi.nlm.nih.gov/1446890/).

| Type | Location |
| --- | --- |
| GOV1 | Esophageal varices extending along the lesser curve |
| GOV2 | Esophageal varices extending toward the fundus |
| IGV1 | Isolated gastric varices in the fundus |
| IGV2 | Isolated gastric varices elsewhere (body, antrum, pylorus, duodenum) |

Clinical use: "Treatment depends on the type: see the bleeding source decision in variceal bleeding (B7.1)." Links: Bleeding source decision (em\_ugib, entry point source).

### B6.15 Hill grade of the gastroesophageal flap valve (id: hill)

Source: [Hill LD et al. Gastrointest Endosc 1996 (PMID 8934159)](https://pubmed.ncbi.nlm.nih.gov/8934159/). Retroflexed view.

| Grade | Appearance |
| --- | --- |
| I | Prominent ridge closely approximated to the scope |
| II | Ridge present; opens with respiration and closes promptly |
| III | Ridge barely present, often not closing around the scope |
| IV | No ridge; junction wide open; hiatal hernia always present |

Clinical use: "Grades III–IV are associated with GERD." Links: Lyon Consensus 2.0 (lyon2).

### B6.16 Siewert classification of adenocarcinoma of the gastroesophageal junction (id: siewert)

Source: [Siewert JR, Stein HJ. Br J Surg 1998 (PMID 9823902)](https://pubmed.ncbi.nlm.nih.gov/9823902/).

| Type | Tumor center | Staging and treatment |
| --- | --- | --- |
| I | 1–5 cm above the gastroesophageal junction | Esophageal cancer |
| II | 1 cm above to 2 cm below the gastroesophageal junction | Staged as esophageal cancer (AJCC 8th edition: epicenter within 2 cm of the gastroesophageal junction). Surgical approach decided by the multidisciplinary team. |
| III | 2–5 cm below the gastroesophageal junction | Staged as gastric cancer |

Clinical use: "Type I is treated as esophageal cancer; type II is staged as esophageal cancer, with the surgical approach decided by the multidisciplinary team; type III is staged as gastric cancer."

### B6.17 Spigelman classification of duodenal polyposis, modified (id: spigelman; calculator)

Sources: [Spigelman AD et al. Lancet 1989 (PMID 2571019)](https://pubmed.ncbi.nlm.nih.gov/2571019/); [Syngal S et al. ACG guideline 2015 (PMID 25645574)](https://pubmed.ncbi.nlm.nih.gov/25645574/).

| Item | 1 point | 2 points | 3 points |
| --- | --- | --- | --- |
| Number of polyps | 1–4 | 5–20 | >20 |
| Polyp size | 1–4 mm | 5–10 mm | >10 mm |
| Histology | Tubular | Tubulovillous | Villous |
| Dysplasia | Low-grade |  | High-grade |

No polyps = stage 0. Points: stage I 1–4, II 5–6, III 7–8, IV 9–12.

| Stage | Surveillance (ACG 2015) |
| --- | --- |
| 0 | Every 4 years |
| I | Every 2–3 years |
| II | Every 1–3 years |
| III | Every 6–12 months |
| IV | Expert surveillance every 3–6 months and surgical evaluation |

Note: "Assess the ampulla with a side-viewing scope."

### B6.18 OLGA and OLGIM gastritis staging (id: olga; calculator)

Sources: [Rugge M et al. Gut 2007 (PMID 17142647)](https://pubmed.ncbi.nlm.nih.gov/17142647/); [Capelle LG et al. Gastrointest Endosc 2010 (PMID 20381801)](https://pubmed.ncbi.nlm.nih.gov/20381801/); [Dinis-Ribeiro M et al. MAPS III. Endoscopy 2025 (PMID 40112834)](https://pubmed.ncbi.nlm.nih.gov/40112834/).

Choose atrophy (OLGA) or intestinal metaplasia (OLGIM); score the antrum (including the incisura) and the corpus each none, mild, moderate or severe.

| Antrum \ Corpus | None | Mild | Moderate | Severe |
| --- | --- | --- | --- | --- |
| None | 0 | I | II | II |
| Mild | I | I | II | III |
| Moderate | II | II | III | IV |
| Severe | III | III | IV | IV |

Stage III–IV: band "High risk (stage III–IV)"; action "H. pylori eradication and high-quality endoscopy every 3 years (MAPS III)." Stage 0–II: band "Lower risk (stage 0–II)"; action "Eradicate H. pylori; no routine surveillance unless other risk factors (first-degree family history, incomplete intestinal metaplasia, persistent H. pylori): individualize."

### B6.19 Marsh-Oberhuber classification of celiac disease (id: marsh)

Source: [Oberhuber G et al. Eur J Gastroenterol Hepatol 1999 (PMID 10524652)](https://pubmed.ncbi.nlm.nih.gov/10524652/).

| Type | Histology |
| --- | --- |
| 0 | Normal |
| 1 | Increased intraepithelial lymphocytes (>25 per 100 enterocytes; Oberhuber originally used >40), normal villi |
| 2 | Increased intraepithelial lymphocytes plus crypt hyperplasia |
| 3a | Partial villous atrophy |
| 3b | Subtotal villous atrophy |
| 3c | Total villous atrophy |

Clinical use: "Marsh 3 is typical of celiac disease; Marsh 1–2 is non-specific. Interpret with tTG-IgA on a gluten-containing diet."

### B6.20 Goligher classification of internal hemorrhoids (id: goligher)

Source: [Hawkins AT et al. ASCRS clinical practice guidelines. Dis Colon Rectum 2024 (PMID 38294832)](https://pubmed.ncbi.nlm.nih.gov/38294832/).

| Grade | Finding | Management (ASCRS 2024) |
| --- | --- | --- |
| I | Bleeding, no prolapse | Fiber, fluids, office procedures such as rubber band ligation |
| II | Prolapse that reduces spontaneously | Fiber, fluids, office procedures such as rubber band ligation |
| III | Prolapse that needs manual reduction | Rubber band ligation or surgery |
| IV | Irreducible prolapse | Hemorrhoidectomy |

Clinical use: "Grade IV, or failed office treatment: hemorrhoidectomy."

### B6.21 Bismuth-Corlette classification of hilar biliary strictures (id: bismuth\_corlette)

Category: Pancreas and biliary.

Sources: [Bismuth H, Corlette MB. Surg Gynecol Obstet 1975 (PMID 1079096)](https://pubmed.ncbi.nlm.nih.gov/1079096/); [Bismuth H et al. Ann Surg 1992, types IIIa and IIIb (PMID 1309988)](https://pubmed.ncbi.nlm.nih.gov/1309988/).

| Type | Level |
| --- | --- |
| I | Below the confluence |
| II | At the confluence |
| IIIa | Extends to the right hepatic duct |
| IIIb | Extends to the left hepatic duct |
| IV | Both sides, or multifocal |

Clinical use: "Guides drainage and surgery: plan with MRCP before ERCP; types III–IV at an expert centre."

### B6.22 Strasberg classification of bile duct injury (id: strasberg)

Category: Pancreas and biliary.

Source: [Strasberg SM et al. J Am Coll Surg 1995 (PMID 8000648)](https://pubmed.ncbi.nlm.nih.gov/8000648/).

| Type | Injury |
| --- | --- |
| A | Cystic duct or liver-bed duct leak |
| B | Occluded aberrant right hepatic duct |
| C | Transected aberrant right hepatic duct (leak) |
| D | Lateral injury to a major duct |
| E1 | Transection >2 cm from the confluence |
| E2 | Transection <2 cm from the confluence |
| E3 | At the confluence, confluence preserved |
| E4 | Confluence destroyed |
| E5 | Aberrant right duct plus common hepatic duct |

Clinical use: "A and small D: usually ERCP (stent with or without sphincterotomy); B, C, larger D and E: hepatobiliary surgical centre."

## Part B7: GI emergency pages

Eighteen emergency pages, all listed in the emergency index (B7.19). Variceal bleeding (B7.2) is part of the upper GI bleeding page (B7.1) and has no page or index entry of its own. Every page is an interactive bedside algorithm (B7.0). Drug doses are adult doses.

### B7.0 Bedside algorithm pages

Every emergency page is an interactive bedside algorithm. The first five (B7.1, B7.5, B7.9, B7.12, B7.13) were converted in version 0.6.0, twelve more in version 0.7.0, and B7.20 (acute-on-chronic liver failure) was added in version 0.8.0. Each keeps every line, dose and source of its earlier page, reorganized into this layout, top to bottom (a part with no content on a page is left out):

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

Format of the algorithm on every B7 page: each step is "**id · timeline chip · title**", followed by "(shown when D = answer)" if it belongs to a decision path (several answers are separated by semicolons). Indented lines are the step text, except "Calculators:" (built-in calculators), "Weight-based:" (calculated doses, by name from the table below), "Why:" (a why line; a step can have more than one, shown in order) and "Answer X: text" (decision answer button X with its short description). Steps with answers are decision steps. A line "Search words that open the X pathway: ..." lists search words that open the page at entry point X. A line "Entry point X: answers; opens at D" opens the page with those answers chosen and scrolls to step D; without "opens at", it scrolls to the first decision answered. A line Show: "..." is a highlighted note shown after the algorithm. A built-in calculator can also be a B6 table card: tapping a row reports the selected row.

Weight-based doses. W = weight in kg as entered. Calculated values are shown to 1 decimal place (round half up), without a trailing ".0"; mL of albumin is calculated from the unrounded grams (20% albumin: 1 g = 5 mL; 25% albumin: 1 g = 4 mL). The urine output line is a target, not a dose, and is labelled so. Pages without a weight-based dose (B7.3, B7.6, B7.8, B7.13 to B7.18) have no weight field. Test vectors: B8.7.

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
| prothrombin complex concentrate INR 2 to <4 | B7.4, 4-factor prothrombin complex concentrate (warfarin, life-threatening bleeding) | 25 × W units, maximum 2500 units | 4-factor prothrombin complex concentrate, INR 2 to <4, 25 units/kg (max 2500 units): [25 × W] units IV; when 25 × W >2500: 2500 units IV (maximum) |
| prothrombin complex concentrate INR 4–6 | B7.4, 4-factor prothrombin complex concentrate (warfarin, life-threatening bleeding) | 35 × W units, maximum 3500 units | 4-factor prothrombin complex concentrate, INR 4–6, 35 units/kg (max 3500 units): [35 × W] units IV; when 35 × W >3500: 3500 units IV (maximum) |
| prothrombin complex concentrate INR >6 | B7.4, 4-factor prothrombin complex concentrate (warfarin, life-threatening bleeding) | 50 × W units, maximum 5000 units | 4-factor prothrombin complex concentrate, INR >6, 50 units/kg (max 5000 units): [50 × W] units IV; when 50 × W >5000: 5000 units IV (maximum) |
| N-acetylcysteine 150 mg/kg | B7.7, N-acetylcysteine, 21-hour IV regimen | 150 × dosing weight mg; dosing weight = W, capped at 100 kg | N-acetylcysteine 150 mg/kg over 1 hour: [150 × dosing weight] mg; when W >100: "(dosing weight capped at 100 kg)" added |
| N-acetylcysteine 50 mg/kg | B7.7, N-acetylcysteine, 21-hour IV regimen | 50 × dosing weight mg; dosing weight = W, capped at 100 kg | N-acetylcysteine 50 mg/kg over 4 hours: [50 × dosing weight] mg; when W >100: "(dosing weight capped at 100 kg)" added |
| N-acetylcysteine 100 mg/kg | B7.7, N-acetylcysteine, 21-hour IV regimen | 100 × dosing weight mg; dosing weight = W, capped at 100 kg | N-acetylcysteine 100 mg/kg over 16 hours: [100 × dosing weight] mg; when W >100: "(dosing weight capped at 100 kg)" added |
| albumin challenge 1 g/kg | B7.10, Albumin 20–25%, fluid challenge if volume status is unclear | 1 × W g; 20%: mL = g × 5; 25%: mL = g × 4 | Albumin challenge, 1 g/kg: [W] g = [5 × W] mL of 20% albumin or [4 × W] mL of 25% albumin |
| albumin challenge 1.5 g/kg | B7.10, Albumin 20–25%, fluid challenge if volume status is unclear | 1.5 × W g; 20%: mL = g × 5; 25%: mL = g × 4 | Albumin challenge, 1.5 g/kg: [1.5 × W] g = [7.5 × W] mL of 20% albumin or [6 × W] mL of 25% albumin |
| protein target | B7.11, none (step E8) | 1.2 × W to 1.5 × W g/day | Target, not a dose. Protein 1.2–1.5 g/kg/day: [1.2 × W]–[1.5 × W] g/day |
| continuous renal replacement therapy | B7.20, Continuous renal replacement therapy | 25 × W to 30 × W mL/h | Continuous renal replacement therapy, effluent dose 25–30 mL/kg/h: [25 × W]–[30 × W] mL/h |
| energy target | B7.20, Energy (target, not a dose) | 30 × W to 35 × W kcal/day | Target, not a dose. Energy 30–35 kcal/kg/day: [30 × W]–[35 × W] kcal/day |
| protein target ACLF | B7.20, Protein (target, not a dose) | 1.2 × W to 1.5 × W g/day | Target, not a dose. Protein 1.2–1.5 g/kg/day: [1.2 × W]–[1.5 × W] g/day |
| IV glucose target | B7.20, IV glucose (target, not a dose) | 2 × W to 3 × W g/day | Target, not a dose. IV glucose 2–3 g/kg/day if fasting >12 hours: [2 × W]–[3 × W] g/day |

Suggested answers. When a built-in calculator on the page has a result, the matching answer button gets a "Suggested" outline and label, and any note in the table is shown under the answers. The clinician must still tap it; no other answer is suggested. Test vectors: B8.9.

| Page | Decision | Calculator | Suggested answer |
| --- | --- | --- | --- |
| B7.1 | D2 Pre-emptive TIPS criteria met? | Child-Pugh | Yes when the score is 10–13; No when the score is 14–15, with the note "Pre-emptive TIPS criteria not met (Child-Pugh >13). Salvage TIPS can still be considered if bleeding is refractory."; none otherwise (the other criteria are not in the calculator) |
| B7.1 | D3 High-risk or low-risk stigmata? | Forrest | High-risk stigmata for Ia, Ib, IIa, IIb; Low-risk stigmata for IIc, III |
| B7.5 | D1 Day-3 criteria positive? | Day-3 Oxford | Yes when Oxford or Lindgren is positive; No when both are negative |
| B7.9 | D1 Ascitic fluid result? | Ascitic fluid analysis | Runyon criteria or polymicrobial culture when PMN ≥250/mm³ and 2 or more Runyon criteria are met (then only this answer); PMN 250/mm³ or more when PMN ≥250/mm³ with fewer than 2 Runyon criteria met; none otherwise, including PMN <250/mm³ (culture is not in the calculator) |
| B7.13 | D1 TG18 severity grade? | TG18 cholangitis | The grade shown (Grade I, II or III) when the diagnosis is suspected or definite; none when criteria are not met |
| B7.3 | D2 Oakland 8 or less? | Oakland | Yes when the score is ≤8; No when >8 |
| B7.7 | D2 King's College criteria met? | King's College criteria | Yes when the criteria are met; none otherwise (its inputs are optional, so "not met" can mean incomplete data) |
| B7.8 | D2 Lille 0.45 or more? | Lille | Yes when Lille ≥0.45; No when <0.45 |
| B7.11 | D1 Grade 3–4? | West Haven | Yes for grade 3 or 4; No for minimal, grade 1 or grade 2 |
| B7.20 | D2 After 3–7 days of full organ support: 4 or more organ failures or CLIF-C ACLF >70, and no transplant option? | CLIF-C ACLF | Yes when the unrounded score is above 70 or there are 4 or more organ failures (EASL-CLIF definitions from the CLIF-C OF inputs); none otherwise. The clinician still judges the days of support and the transplant option |
| B7.15 | D2 Zargar grade? | Zargar | 0–2a for grade 0, 1 or 2a; 2b–3a for grade 2b or 3a; 3b for grade 3b; Grade 4 (perforation) for grade 4 |

### B7.1 Upper GI bleeding: non-variceal and variceal (id: em\_ugib)

Bedside algorithm (B7.0). Weight field: yes.

Entry point variceal: D1 = Yes (opened by the search words below and by old links to the variceal page, B7.2).

Entry point source: D1 = Yes; opens at D4 (opened by the link on the Sarin card, B6.14).

Search words that open the variceal pathway: variceal bleeding, varices, esophageal varices, terlipressin, TIPS, band ligation.

- **Red flags:** shock (systolic BP <90 mmHg or shock index >1), ongoing hematemesis, altered consciousness, Hb drop >2 g/dL: ICU or HDU, protect the airway.
- **Recognize:** hematemesis, coffee-ground vomit, melena; shock index (heart rate/systolic BP) >1 = high risk. Variceal bleeding: upper GI bleeding in known or suspected cirrhosis or portal hypertension.

Algorithm:

- **U1 · 0–1 h · First hour, all patients**
  - Two large-bore cannulas; crystalloid resuscitation; bloods: CBC, INR, urea, creatinine, liver tests, crossmatch.
  - GBS (B2.1) and AIMS65 (B2.2). GBS 0–1 with no other concern: outpatient management can be considered.
  - Non-variceal: transfuse at Hb <7 g/dL, target 7–9 g/dL (8 g/dL threshold in cardiovascular disease).
  - Suspected variceal: target 7–8 g/dL, individualized (Baveno VIII).
  - Hold antithrombotics per B7.4.
  - IV erythromycin 250 mg 30–90 minutes before endoscopy if no contraindication (QT prolongation).
  - Start high-dose IV proton pump inhibitor now: pantoprazole or esomeprazole 80 mg IV bolus, then 8 mg/h infusion until endoscopy. Do not delay endoscopy for it.
  - Calculators: GBS, AIMS65.
  - Why: Restrictive transfusion lowered mortality (Villanueva, NEJM 2013).
  - Why: Reduces high-risk stigmata and need for endoscopic therapy, but not mortality, rebleeding or surgery (Sreedharan, Cochrane 2010; ESGE 2021).
- **D1 · 0–1 h · Known or suspected cirrhosis or portal hypertension?**
  - Clues: stigmata of chronic liver disease, ascites, known varices, low platelets, splenomegaly.
  - If uncertain, start the variceal pathway until endoscopy shows otherwise.
  - Answer Yes: variceal pathway.
  - Answer No: non-variceal pathway.
- **V1 · Before endoscopy · Variceal: before endoscopy** (shown when D1 = Yes)
  - Intensive or intermediate care.
  - Intubate before endoscopy if altered consciousness or active hematemesis.
  - Transfusion target Hb 7–8 g/dL, individualized for cardiovascular disease, age, hemodynamics and ongoing bleeding.
  - Vasoactive drug as soon as possible, for 2–5 days or until TIPS; monitor sodium on terlipressin.
  - Antibiotic prophylaxis at presentation with a third-generation cephalosporin (ceftriaxone 1 g IV every 24 hours, up to 7 days); duration individualized (Child-Pugh A: shorter course or none).
  - Lactulose to prevent or treat overt hepatic encephalopathy; continue during admission.
  - Early oral nutrition.
  - No routine fresh frozen plasma, platelets or fibrinogen (platelets or fibrinogen only if bleeding is not controlled); no recombinant factor VIIa or tranexamic acid.
  - Hold anticoagulants until bleeding is controlled.
  - Cautious nasogastric tube.
  - Erythromycin before endoscopy.
  - Weight-based: terlipressin.
  - Why: Antibiotic prophylaxis reduces infection, rebleeding and death (Chavez-Tapia, Cochrane Database Syst Rev 2010; Baveno VIII). Over-transfusion raises portal pressure.
- **V2 · Within 12 h · Variceal: endoscopy and imaging** (shown when D1 = Yes)
  - Endoscopy within 12 hours (as soon as possible if unstable).
  - Contrast CT or MRI of the abdomen in every variceal bleed (portal vein thrombosis, HCC, collaterals).
- **D4 · At endoscopy · Bleeding source?** (shown when D1 = Yes)
  - OV: esophageal varices; GOV: gastroesophageal varices; IGV: isolated gastric varices (Sarin, B6.14).
  - Answer OV or GOV1: band ligation.
  - Answer GOV2 or IGV1: cyanoacrylate, then TIPS.
- **V8 · At endoscopy · Esophageal varices or GOV1** (shown when D4 = OV or GOV1)
  - Esophageal varices: band ligation.
  - Clips, over-the-scope clips, hemostatic powder or fibrin are not first-line.
- **V9 · At endoscopy, then within 24–72 h · Gastric varices GOV2 or IGV1** (shown when D4 = GOV2 or IGV1)
  - Gastric varices GOV2 or IGV1: cyanoacrylate injection.
  - Acute: cyanoacrylate injection, or EUS-guided coil plus cyanoacrylate in experienced centres.
  - Definitive: TIPS with or without variceal embolization as soon as possible (<24–72 hours) if Child-Pugh score <14 (Child-Pugh A, B, or C up to 13).
  - If TIPS is contraindicated: transvenous obliteration, endoscopic (including EUS) or surgical options after multidisciplinary discussion.
- **V3 · After endoscopy · Variceal: after endoscopy** (shown when D1 = Yes)
  - Continue vasoactive drug for 2–5 days.
  - Continue ceftriaxone, up to 7 days in total.
  - Stop the proton pump inhibitor unless there is another indication.
- **D2 · After endoscopy · Pre-emptive TIPS criteria met?** (shown when D4 = OV or GOV1)
  - Child-Pugh C 10–13, or Child-Pugh B >7 with active bleeding at endoscopy, or HVPG 20 mmHg or more.
  - Also consider: age <75, creatinine <3 mg/dL, no heart failure.
  - ACLF, overt HE, high bilirubin, high MELD and severe alcohol-associated hepatitis are not absolute contraindications.
  - Calculators: Child-Pugh.
  - Answer Yes: pre-emptive TIPS.
  - Answer No: continue vasoactive drug.
- **V4 · Within 72 h · Pre-emptive TIPS** (shown when D2 = Yes)
  - Pre-emptive TIPS with a covered stent within 72 hours, ideally <24 hours.
  - Window missed: TIPS within 2 weeks (Child-Pugh C 10–13) or within 1 week (Child-Pugh B >7 with active bleeding) may still help.
  - Why: Pre-emptive TIPS improved survival in high-risk patients (Garcia-Pagan, NEJM 2010).
- **V5 · Days 2–5 · Continue vasoactive drug** (shown when D2 = No)
  - Continue the vasoactive drug for 2–5 days; a shorter course (even 24 hours) can be considered after successful hemostasis if carvedilol or a non-selective beta-blocker is then started.
- **V6 · If failure · Persistent bleeding or early rebleeding** (shown when D1 = Yes)
  - Treatment failure: uncontrolled bleeding or rebleeding within 5 days.
  - Refractory bleeding (persistent bleeding or early rebleeding): covered self-expanding metal stent preferred over balloon tamponade as a bridge to TIPS or transplant.
  - Consider salvage TIPS in every patient with refractory bleeding, regardless of age, Child-Pugh or MELD, case by case.
- **V7 · Before discharge · Variceal: before discharge** (shown when D1 = Yes)
  - Carvedilol (preferred over propranolol or nadolol) when the vasoactive drug stops, plus band ligation every 2–4 weeks until eradication.
  - Iron if Hb <10 g/dL.
  - Evaluate for liver transplant.
  - Proton pump inhibitors are not routinely used for post-banding ulcers.
  - After eradication: endoscopy at 3–6 months, then every 6–12 months (AASLD 2017).
- **N1 · Before endoscopy · Non-variceal: before endoscopy** (shown when D1 = No)
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
  - High-risk stigmata (endoscopic therapy done, or Forrest IIb): continue the infusion for 72 hours after endoscopy (or 40 mg IV twice daily), then oral twice daily to day 14, then once daily.
- **N4 · After endoscopy · Low-risk stigmata** (shown when D3 = Low-risk stigmata)
  - Low-risk stigmata: stop the infusion; oral proton pump inhibitor once daily; early feeding; consider discharge.
- **N5 · After endoscopy · Non-variceal: second-look endoscopy** (shown when D1 = No)
  - No routine second-look endoscopy; repeat only if rebleeding (ESGE 2021, ACG 2021).
- **N6 · If rebleeding · Non-variceal: rebleeding** (shown when D1 = No)
  - Repeat endoscopy (over-the-scope clip for recurrent ulcer bleeding); if it fails, transcatheter arterial embolization, then surgery.
- **N7 · Discharge · Non-variceal: discharge** (shown when D1 = No)
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
| Proton pump inhibitor | Start before endoscopy; stop after unless another indication | Start before endoscopy; 72 h infusion if high-risk stigmata |
| Endoscopic therapy | Band ligation or cyanoacrylate | Forrest-based therapy |
| Follow-up | Beta-blocker, ligation, TIPS | H. pylori, aspirin restart |

| Drug | Dose |
| --- | --- |
| Erythromycin | 250 mg IV over 5–30 minutes, given 30–90 minutes before endoscopy |
| Pantoprazole or esomeprazole, high dose | 80 mg IV bolus, then 8 mg/h infusion for 72 hours; or 40 mg IV twice daily as intermittent high dose |
| Terlipressin | IV every 4 hours for 48 hours (<50 kg: 1 mg; 50–70 kg: 1.5 mg; >70 kg: 2 mg), then 1 mg every 4 hours |
| Octreotide | 50 µg IV bolus, then 50 µg/h infusion for 2–5 days; bolus can be repeated in the first hour |
| Somatostatin | 250 µg IV bolus, then 250–500 µg/h infusion |
| Ceftriaxone | 1 g IV every 24 hours, maximum 7 days; duration individualized (Child-Pugh A: shorter course or none) |

Related: GBS, AIMS65, Rockall, Forrest, Child-Pugh, MELD 3.0, West Haven.

### B7.2 Acute variceal bleeding (id: em\_variceal)

Merged into B7.1; no page and no emergency index entry of its own. The search words variceal bleeding, varices, esophageal varices, terlipressin, TIPS and band ligation (B7.1) open the upper GI bleeding page at the variceal pathway, with D1 answered Yes. Old links, favorites and recent items that point to em\_variceal redirect there. Every line, dose and source of the earlier variceal page is kept on B7.1.

### B7.3 Acute lower GI bleeding (id: em\_lgib)

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** shock index >1 or systolic BP <90 mmHg, ongoing large-volume hematochezia, Hb drop >2 g/dL: ICU or HDU.
- **Recognize:** hematochezia or bright red blood per rectum. With hemodynamic instability, think of an upper GI source and do an upper endoscopy first.

Algorithm:

- **L1 · 0–1 h · Resuscitate and risk-stratify**
  - Resuscitate.
  - Oakland score (B2.4).
  - Transfuse at Hb <7 g/dL (8 g/dL in cardiovascular disease) (ACG 2023).
  - Antithrombotics per B7.4.
  - Hemodynamic instability: think of an upper GI source and do an upper endoscopy first.
  - Calculators: Oakland.
- **D1 · 0–1 h · Hemodynamically unstable or ongoing brisk bleeding?**
  - Answer Yes: CT angiography first.
  - Answer No: decide by the Oakland score.
- **L2 · Within hours · CT angiography first** (shown when D1 = Yes)
  - Hemodynamically significant ongoing bleeding: CT angiography first, then catheter angiography and embolization if a blush is seen (ACG 2023).
  - Blush: catheter angiography and embolization.
  - Negative CT angiography: colonoscopy after bowel preparation.
- **D2 · After resuscitation · Oakland 8 or less?** (shown when D1 = No)
  - Answer Yes: consider early discharge, outpatient colonoscopy.
  - Answer No: admit, inpatient colonoscopy.
- **L3 · Discharge · Oakland 8 or less** (shown when D2 = Yes)
  - Oakland ≤8: consider early discharge with outpatient colonoscopy.
- **L4 · Admission · Oakland more than 8** (shown when D2 = No)
  - Admit: inpatient colonoscopy after adequate bowel preparation; urgent colonoscopy within 24 hours has not improved outcomes.
  - Why: Urgent colonoscopy within 24 h did not improve outcomes (ACG 2023).
- **L5 · At colonoscopy · Endoscopic therapy**
  - Diverticular bleeding with high-risk stigmata (active bleeding, visible vessel, adherent clot): clips or band ligation.
  - Post-polypectomy bleeding: clips.
- **L6 · Discharge · Before discharge**
  - Avoid non-aspirin non-steroidal anti-inflammatory drugs (NSAIDs).
  - Continue aspirin for secondary prevention.
  - Restart anticoagulants per B7.4.
- **Avoid:** routine early colonoscopy without preparation; stopping aspirin used for secondary cardiovascular prevention.

Related: Oakland.

### B7.4 Anticoagulants and antiplatelets in GI bleeding (id: em\_antithrombotic)

Source: [ACG-CAG 2022](https://gastroenterology.acponline.org/archives/2022/03/25/1.htm) and ACG 2023 lower GI bleeding guideline.

Bedside algorithm (B7.0). Weight field: yes.

- **Red flags:** hemodynamic instability despite resuscitation, ongoing transfusion need, or bleeding into a critical site (intracranial, airway): treat as life-threatening; ICU; reversal with hematology input.

Algorithm:

- **D1 · 0 h · Life-threatening bleeding?**
  - Answer No: no routine reversal.
  - Answer Yes: reversal with hematology input.
- **T1 · 0 h · No routine reversal** (shown when D1 = No)
  - No routine reversal: follow the drug table below.
- **T2 · 0 h · Reversal with hematology input** (shown when D1 = Yes)
  - Life-threatening bleeding: reversal with hematology input.
  - Warfarin: 4-factor prothrombin complex concentrate (PCC) by INR (INR 2 to <4: 25 units/kg, max 2500 units; INR 4–6: 35 units/kg, max 3500 units; INR >6: 50 units/kg, max 5000 units) plus vitamin K 10 mg slow IV (product label).
  - INR below 2: no label dose; discuss with hematology.
  - Dabigatran: idarucizumab 5 g IV.
  - Apixaban or rivaroxaban: andexanet alfa where available, or 4-factor PCC; dose per product label or local protocol, with hematology.
  - Weight-based: prothrombin complex concentrate INR 2 to <4, prothrombin complex concentrate INR 4–6, prothrombin complex concentrate INR >6.
- **T3 · After hemostasis · When to restart**
  - Aspirin for secondary prevention: do not stop; if stopped, restart as soon as hemostasis is secured, preferably within 3–5 days (ESGE 2021).
  - Dual antiplatelet therapy: continue aspirin; if the P2Y12 inhibitor is held, restart as soon as possible (ideally within 5 days) with cardiology.
  - Warfarin or direct oral anticoagulant (DOAC): resume once bleeding is controlled, preferably within or soon after 7 days, based on thrombotic risk (ESGE 2021).

Show: "Restart anticoagulation once hemostasis is secure, individualized with cardiology or hematology."

**Acute GI bleeding, drug by drug**

| Drug | Acute GI bleeding |
| --- | --- |
| Warfarin | Suggest against fresh frozen plasma (FFP) and against vitamin K routinely; if reversal is needed, use 4-factor prothrombin complex concentrate (PCC) rather than FFP |
| Direct oral anticoagulant (DOAC; dabigatran, rivaroxaban, apixaban, edoxaban) | Suggest against routine PCC, idarucizumab and andexanet alfa; most bleeding settles with time because of short half-life |
| Life-threatening bleeding on vitamin K antagonist (VKA) or DOAC | Reversal agents may be considered (ACG 2023) with hematology input |
| Antiplatelet drugs | Suggest against platelet transfusion |
| Aspirin for secondary cardiovascular prevention | Avoid stopping, or resume as soon as hemostasis is secured; continuing aspirin lowered mortality (Sung, Ann Intern Med 2010) |
| Dual antiplatelet therapy after recent coronary stent | Do not stop both drugs; decide with cardiology |

| Drug | Dose |
| --- | --- |
| 4-factor prothrombin complex concentrate (warfarin, life-threatening bleeding) | By INR: INR 2 to <4: 25 units/kg, max 2500 units; INR 4–6: 35 units/kg, max 3500 units; INR >6: 50 units/kg, max 5000 units (product label). INR below 2: no label dose; discuss with hematology |
| Vitamin K (warfarin, life-threatening bleeding) | 10 mg slow IV, with 4-factor prothrombin complex concentrate |
| Idarucizumab (dabigatran, life-threatening bleeding) | 5 g IV |
| Andexanet alfa or 4-factor prothrombin complex concentrate (apixaban or rivaroxaban, life-threatening bleeding) | Dose per product label or local protocol, with hematology |

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

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** perforation, peritonitis, massive bleeding, shock: emergency surgery.
- **Recognize (Jalan criteria):** colonic dilatation >6 cm on X-ray PLUS at least 3 of: fever >38.6 °C, heart rate >120/min, neutrophil count >10.5 ×10⁹/L, anemia; PLUS at least 1 of: dehydration, altered consciousness, electrolyte disturbance, hypotension.

Algorithm:

- **M1 · 0 h · Confirm and start supportive care**
  - Jalan criteria (B5.10): colonic dilatation >6 cm plus 3 or more of 4 plus 1 or more of 4.
  - Urgent surgical review; NPO, nasogastric decompression; IV fluids and electrolytes; broad-spectrum antibiotics; IV corticosteroids if IBD (and treat C. difficile if present); serial abdominal X-rays.
  - Calculators: Jalan criteria.
- **M2 · 0 h · Treat the cause**
  - IBD: IV hydrocortisone 100 mg every 6 hours or methylprednisolone 60 mg IV every 24 hours (B7.5).
  - C. difficile: vancomycin 500 mg orally or by nasogastric tube 4 times daily plus metronidazole 500 mg IV every 8 hours; add rectal vancomycin if ileus (IDSA/SHEA 2017).
  - Correct potassium and magnesium.
- **D1 · 24–72 h · Improving?**
  - Answer Yes: continue, serial X-rays.
  - Answer No: colectomy.
- **M3 · 24–72 h · Improving** (shown when D1 = Yes)
  - Continue treatment and serial abdominal X-rays.
- **M4 · 24–72 h · Colectomy** (shown when D1 = No)
  - No improvement within 24–72 hours, perforation, or worsening: colectomy.
  - Subtotal colectomy with end ileostomy.
  - Why: Delayed colectomy increases complications (Randall, Br J Surg 2010).
- **Avoid:** colonoscopy, opioids, anticholinergics, antidiarrheals.

| Drug | Dose |
| --- | --- |
| Hydrocortisone (IBD) | 100 mg IV every 6 hours |
| Methylprednisolone (IBD, alternative) | 60 mg IV every 24 hours |
| Vancomycin (C. difficile) | 500 mg orally or by nasogastric tube 4 times daily (never IV for C. difficile); add rectal vancomycin if ileus |
| Metronidazole (C. difficile) | 500 mg IV every 8 hours |

Related: Jalan criteria.

### B7.7 Acute liver failure (id: em\_alf)

Bedside algorithm (B7.0). Weight field: yes.

- **Red flags:** HE grade 2 or more: ICU; grade 3–4: intubate; hypoglycemia; shock; signs of raised intracranial pressure (hypertension with bradycardia, pupil changes).
- **Recognize:** INR ≥1.5 and any degree of hepatic encephalopathy, without pre-existing cirrhosis, illness <26 weeks (AASLD).

Algorithm:

- **F1 · 0–1 h · Call the transplant center and investigate**
  - Contact the liver transplant center at once; ICU if HE grade ≥2; glucose every 1–2 hours.
  - N-acetylcysteine for acetaminophen cases (and consider for non-acetaminophen ALF with early HE grade 1–2; Lee, Gastroenterology 2009).
  - Check acetaminophen level, viral serology (hepatitis A, B with delta, E, HSV), autoimmune markers, ceruloplasmin, pregnancy test, toxicology.
  - Add arterial ammonia, lactate and phosphate.
  - Arterial ammonia >150–200 µmol/L raises the risk of intracranial hypertension (EASL 2017).
- **D1 · 0–1 h · Acetaminophen (paracetamol) cause?**
  - Answer Yes: N-acetylcysteine 21-hour regimen.
  - Answer No: cause-specific treatment.
- **F2 · 0–21 h and beyond · N-acetylcysteine** (shown when D1 = Yes)
  - N-acetylcysteine 21-hour regimen; continue until INR improves.
  - Dosing weight capped at 100 kg (US label); follow local protocol.
  - Weight-based: N-acetylcysteine 150 mg/kg, N-acetylcysteine 50 mg/kg, N-acetylcysteine 100 mg/kg.
- **F3 · 0–6 h · Cause-specific treatment** (shown when D1 = No)
  - Consider N-acetylcysteine if HE grade 1–2 (Lee, Gastroenterology 2009).
  - Cause-specific treatment (AASLD 2011):
  - HSV: IV acyclovir.
  - Hepatitis B: entecavir or tenofovir.
  - Amanita mushroom: N-acetylcysteine plus silibinin or penicillin G.
  - Acute fatty liver of pregnancy or HELLP: urgent delivery.
  - Wilson disease: urgent transplant listing, plasma exchange as bridge. Clue to Wilson disease: ALP to bilirubin ratio <4 and AST to ALT ratio >2.2.
  - Budd-Chiari: anticoagulation, consider TIPS.
  - Autoimmune: discuss corticosteroids with the transplant center.
  - Dosing weight capped at 100 kg (US label); follow local protocol.
  - Weight-based: N-acetylcysteine 150 mg/kg, N-acetylcysteine 50 mg/kg, N-acetylcysteine 100 mg/kg.
- **D2 · Within hours · King's College criteria met?**
  - King's College criteria (B3.18).
  - Not met may mean incomplete data; reassess at least daily.
  - Calculators: King's College criteria.
  - Answer Yes: urgent transplant listing.
  - Answer No: reassess at least daily.
- **F4 · Now · Urgent transplant listing** (shown when D2 = Yes)
  - Urgent transplant listing.
- **F5 · Daily · Reassess** (shown when D2 = No)
  - Reassess King's College criteria at least daily.
- **F6 · ICU · ICU care**
  - Intubate for HE grade 3–4.
  - Intracranial pressure measures: head of bed 30°, sodium target 145–155 mmol/L with hypertonic saline.
  - Glucose every 1–2 hours.
  - Low threshold for antibiotics.
  - Continuous renal replacement therapy for AKI, acidosis or high ammonia (EASL 2017).
  - No routine fresh frozen plasma (FFP).
- **Avoid:** sedatives, lactulose (bowel distension), routine fresh frozen plasma (FFP) to correct INR (masks prognosis), nephrotoxins.

| Drug | Dose |
| --- | --- |
| N-acetylcysteine, 21-hour IV regimen | 150 mg/kg over 1 hour, then 50 mg/kg over 4 hours, then 100 mg/kg over 16 hours; continue the last rate beyond 21 hours in ALF until INR improves (or use the local two-bag regimen) |

Related: King's College criteria, MELD.

### B7.8 Severe alcohol-associated hepatitis (id: em\_aah)

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** sepsis, GI bleeding, AKI, HE grade 3–4, organ failure (ACLF grade, B3.17): ICU.
  - Calculators: ACLF grade.
- **Recognize:** jaundice (bilirubin >3 mg/dL) within 8 weeks of heavy alcohol use, AST >50 IU/L, AST to ALT >1.5, both <400 IU/L; severe if MELD >20 or Maddrey DF ≥32.

Algorithm:

- **H1 · Day 0 · Assess severity and screen**
  - Screen for infection (blood, urine, ascitic cultures, chest X-ray), GI bleeding and AKI; alcohol withdrawal management; nutrition (oral or enteral); thiamine.
  - Transjugular liver biopsy only if the diagnosis is uncertain.
  - Calculators: MELD, Maddrey, GAHS, ABIC.
- **D1 · Day 0 · Severe (MELD >20 or Maddrey 32 or more) and no contraindication (uncontrolled infection, active GI bleeding)?**
  - MELD >51: steroids unlikely to help.
  - Use MELD or MELD-Na (B3.2), not MELD 3.0. Thresholds (>20; 21–51) come from studies using MELD.
  - Answer Yes: prednisolone 40 mg once daily.
  - Answer No: supportive care, then reassess.
  - Why: Steroids improved 30-day survival only at MELD 21–51, most at 25–39 (Arab, J Hepatol 2021).
  - Why: In STOPAH, prednisolone gave a trend to lower 28-day mortality; pentoxifylline gave no benefit (Thursz, NEJM 2015).
- **H2 · Day 0 · Start prednisolone** (shown when D1 = Yes)
  - Prednisolone 40 mg once daily for 28 days if no contraindication.
- **H3 · Day 0 · Supportive care** (shown when D1 = No)
  - Supportive care, nutrition, abstinence; treat infection or bleeding first, then reassess.
- **D2 · Day 7 · Lille 0.45 or more?** (shown when D1 = Yes)
  - Lille on day 7 (B3.5): ≥0.45 stop steroids.
  - Calculators: Lille.
  - Answer Yes: stop prednisolone (non-responder).
  - Answer No: complete 28 days.
- **H4 · Day 7 · Non-responder** (shown when D2 = Yes)
  - Stop prednisolone (non-responder); consider early transplant evaluation at an expert center.
- **H5 · Day 7 to 28 · Responder** (shown when D2 = No)
  - Complete 28 days of prednisolone.
- **H6 · Long term · Then**
  - Alcohol use disorder treatment; early liver transplant evaluation in selected non-responders at expert centers.
- **Avoid:** pentoxifylline (no survival benefit in STOPAH, NEJM 2015); starting steroids with uncontrolled infection.

| Drug | Dose |
| --- | --- |
| Prednisolone | 40 mg orally once daily for 28 days; stop at day 7 if Lille ≥0.45 |

Related: Maddrey, MELD, GAHS, ABIC, Lille, ACLF grade.

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
  - Stop secondary prophylaxis on recompensation (Baveno VIII).
  - Data are insufficient for rifaximin as secondary prophylaxis (Baveno VIII).
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

Bedside algorithm (B7.0). Weight field: yes.

- **Red flags:** hyperkalemia, severe acidosis, fluid overload or SpO2 <90%, anuria: ICU, consider renal replacement therapy.
- **Recognize (2024 criteria):** cirrhosis with ascites; AKI by KDIGO (creatinine rise ≥0.3 mg/dL within 48 hours, or ≥50% from baseline within 7 days, and/or urine output ≤0.5 mL/kg/h for ≥6 hours); no improvement in creatinine and/or urine output within 24 hours of adequate volume resuscitation; no strong evidence of another primary cause. A 48-hour albumin trial is no longer required.

Algorithm:

- **R1 · 0 h · Stop, look and challenge**
  - Stop diuretics, non-steroidal anti-inflammatory drugs (NSAIDs) and other nephrotoxins; review non-selective beta-blockers; look for and treat infection; if volume status is unclear, fluid challenge with 250–500 mL crystalloid or 1–1.5 g/kg of 20–25% albumin; reassess at 24 hours.
  - Diagnostic paracentesis to exclude spontaneous bacterial peritonitis; urinalysis; renal ultrasound.
  - Weight-based: albumin challenge 1 g/kg, albumin challenge 1.5 g/kg.
- **D1 · 24 h · No improvement after volume, and no other likely cause?**
  - Answer Yes: HRS-AKI, start vasoconstrictor plus albumin.
  - Answer No: treat the other cause.
- **R2 · 24 h · Start vasoconstrictor plus albumin** (shown when D1 = Yes)
  - HRS-AKI: terlipressin plus albumin (first line); norepinephrine plus albumin in ICU if terlipressin is contraindicated or unavailable.
  - Terlipressin preferably by continuous infusion, starting 2–3 mg/24 hours (Baveno VIII); escalation and stop rules as below.
  - Why: Terlipressin improved HRS reversal but caused more respiratory failure (CONFIRM, NEJM 2021).
- **R3 · 24 h · Treat the other cause** (shown when D1 = No)
  - Another cause is likely: treat the other cause.
- **R4 · Daily · Daily review** (shown when D1 = Yes)
  - Check creatinine, volume status and SpO2 daily; escalate per the Doses table.
  - Stop vasoconstrictor when: creatinine returns to within 0.3 mg/dL of baseline; severe adverse event; no improvement after 48 hours at maximum tolerated dose; renal replacement therapy needed; or 14 days reached.
- **R5 · Then · Transplant referral** (shown when D1 = Yes)
  - Refer for liver transplant assessment.
- **Avoid:** terlipressin with hypoxia, ischemic heart or vascular disease, or fluid overload; continuing albumin when there is pulmonary edema; terlipressin if SpO2 <90%.

| Drug | Dose |
| --- | --- |
| Terlipressin | Preferred: continuous infusion, starting 2–3 mg/24 hours (Baveno VIII). Alternative: IV bolus 1–2 mg every 6 hours. If creatinine has not fallen by 25%, increase by at least 2 mg/day every 24 hours up to 12 mg/day |
| Albumin 20–25% | 20–40 g/day, adjusted daily to volume status |
| Norepinephrine | 0.5 mg/h IV, increase by 0.5 mg/h every 4 hours up to 3 mg/h to raise MAP (ICU, central line) |
| Albumin 20–25%, fluid challenge if volume status is unclear | 1–1.5 g/kg |

Related: MELD 3.0, ACLF grade.

### B7.11 Overt hepatic encephalopathy (id: em\_he)

Bedside algorithm (B7.0). Weight field: yes.

- **Red flags:** grade 3–4, seizures, focal signs, hypoglycemia: ICU.
- **Recognize:** West Haven grade 2–4 (B3.16) in cirrhosis; exclude other causes (glucose, sepsis, drugs, intracranial bleed; CT head if focal signs, first episode, or fall).

Algorithm:

- **E1 · 0 h · Confirm and grade**
  - Grade with West Haven.
  - A normal ammonia makes HE unlikely; a high ammonia alone does not confirm it (AASLD-EASL 2014).
  - Calculators: West Haven.
- **D1 · 0 h · Grade 3–4?**
  - Answer Yes: ICU, protect airway.
  - Answer No: ward, oral lactulose.
- **E2 · 0 h · ICU** (shown when D1 = Yes)
  - ICU; protect the airway in grade 3–4; lactulose by nasogastric tube or enema.
- **E3 · 0 h · Ward** (shown when D1 = No)
  - Ward; oral lactulose.
- **E4 · 0–24 h · Find and treat precipitants**
  - Find and treat precipitants (infection, GI bleeding, constipation, dehydration, hypokalemia or hyponatremia, sedatives, AKI, TIPS).
- **E5 · 0–24 h · Treat with lactulose or polyethylene glycol 3350**
  - Lactulose, or polyethylene glycol 3350 (see Doses).
  - Why: Polyethylene glycol 3350 resolved HE faster than lactulose (HELP, JAMA Intern Med 2014).
- **D2 · 24–48 h · Improving?**
  - Answer Yes: continue.
  - Answer No: look for another cause.
- **E6 · 24–48 h · Improving** (shown when D2 = Yes)
  - Continue treatment.
- **E7 · 24–48 h · Not improving** (shown when D2 = No)
  - Look for another cause, check lactulose response (2–3 soft stools/day), consider adding rifaximin.
- **E8 · Before discharge · Prevent recurrence**
  - Rifaximin added to lactulose after a recurrence (Bass, NEJM 2010); review benzodiazepines and opioids; nutrition with normal protein intake (1.2–1.5 g/kg/day).
  - Lactulose as secondary prophylaxis.
  - Consider transplant referral.
  - Recurrent or persistent HE despite optimal therapy: consider embolization of large spontaneous portosystemic shunts (especially with preserved liver function) and transplant evaluation; L-ornithine L-aspartate can be considered (Baveno VIII).
  - Weight-based: protein target.
  - Why: Rifaximin reduced recurrence and HE hospitalization (Bass, NEJM 2010).
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

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** cannot swallow saliva, drooling, airway compromise, perforation signs (fever, crepitus, chest pain, peritonitis), battery in the esophagus: emergent endoscopy (within 2 h, at most 6 h). Airway compromise: secure the airway first (ICU or anesthesia). Perforation signs: CT and surgical review.

Algorithm:

- **B1 · 0 h · History and imaging**
  - History: object, time, symptoms.
  - Plain X-ray (neck, chest, abdomen) for radiopaque objects; CT if perforation is suspected; protect the airway (overtube or intubation if high aspiration risk).
- **D1 · 0 h · Object and location?**
  - Answer Complete esophageal obstruction (cannot swallow saliva): Emergent: preferably within 2 hours, at the latest within 6 hours.
  - Answer Sharp-pointed object or battery in the esophagus: Emergent: preferably within 2 hours, at the latest within 6 hours.
  - Answer Other esophageal foreign body without complete obstruction: Urgent: within 24 hours.
  - Answer Stomach (sharp-pointed objects, magnets, batteries, large or long objects): Urgent: within 24 hours.
  - Answer Stomach (medium-sized blunt objects): Non-urgent: within 72 hours.
  - Answer Small blunt objects (not batteries or magnets) beyond the esophagus: Observation; outpatient if feasible.
  - Answer Drug packets (body packing): No endoscopic removal; observe; surgery if obstruction or leak.
- **B2 · Within 2–6 h · Complete esophageal obstruction** (shown when D1 = Complete esophageal obstruction (cannot swallow saliva))
  - Emergent endoscopy: preferably within 2 hours, at the latest within 6 hours.
- **B3 · Within 2–6 h · Sharp-pointed object or battery in the esophagus** (shown when D1 = Sharp-pointed object or battery in the esophagus)
  - Emergent endoscopy: preferably within 2 hours, at the latest within 6 hours.
  - Why: Batteries in the esophagus cause severe injury within hours (ESGE 2016).
- **B4 · Within 24 h · Other esophageal foreign body** (shown when D1 = Other esophageal foreign body without complete obstruction)
  - Urgent endoscopy: within 24 hours.
- **B5 · Within 24 h · Stomach: sharp, magnets, batteries, large or long** (shown when D1 = Stomach (sharp-pointed objects, magnets, batteries, large or long objects))
  - Urgent endoscopy: within 24 hours.
- **B6 · Within 72 h · Stomach: medium-sized blunt objects** (shown when D1 = Stomach (medium-sized blunt objects))
  - Non-urgent endoscopy: within 72 hours.
- **B7 · Observe · Small blunt objects beyond the esophagus** (shown when D1 = Small blunt objects (not batteries or magnets) beyond the esophagus)
  - Observation; outpatient if feasible.
- **B8 · Observe · Drug packets (body packing)** (shown when D1 = Drug packets (body packing))
  - No endoscopic removal; observe; surgery if obstruction or leak.
- **B9 · At endoscopy · Technique**
  - Food bolus can be gently pushed into the stomach or retrieved.
  - Overtube or protector hood for sharp objects.
- **B10 · After removal · After removal**
  - Take esophageal biopsies to look for eosinophilic esophagitis.
  - Look for stricture or malignancy.
- **Avoid:** barium swallow (aspiration risk, impairs endoscopy); blind pushing of sharp objects; delays with batteries.

**Timing of endoscopy (ESGE 2016)**

| Situation | Timing of endoscopy |
| --- | --- |
| Complete esophageal obstruction (cannot swallow saliva) | Emergent: preferably within 2 hours, at the latest within 6 hours |
| Sharp-pointed object or battery in the esophagus | Emergent: preferably within 2 hours, at the latest within 6 hours |
| Other esophageal foreign body without complete obstruction | Urgent: within 24 hours |
| Stomach: sharp-pointed objects, magnets, batteries, large or long objects | Urgent: within 24 hours |
| Stomach: medium-sized blunt objects | Non-urgent: within 72 hours |
| Small blunt objects (not batteries or magnets) beyond the esophagus | Observation; outpatient if feasible |
| Drug packets (body packing) | No endoscopic removal; observe; surgery if obstruction or leak |

### B7.15 Caustic ingestion (id: em\_caustic)

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** stridor or airway edema, signs of perforation, shock, severe acidosis: ICU and surgery.
- **Recognize:** acid or alkali ingestion; drooling, dysphagia, odynophagia, stridor, chest or abdominal pain. Symptoms do not predict injury severity.

Algorithm:

- **K1 · 0 h · Airway, assessment and imaging**
  - Airway assessment (early intubation if stridor or airway edema); IV access; NPO; identify the agent; CT chest and abdomen with IV contrast if perforation or transmural necrosis is suspected; surgical team involvement for severe cases.
  - Psychiatric review if intentional.
- **D1 · 0–12 h · Perforation or transmural necrosis (clinical or CT)?**
  - Answer Yes: emergency surgery.
  - Answer No: endoscopy within 12–48 hours.
- **K2 · Now · Emergency surgery** (shown when D1 = Yes)
  - Perforation or transmural necrosis: emergency surgery.
- **K3 · 12–48 h · Endoscopy** (shown when D1 = No)
  - Endoscopy within 12–48 hours to grade injury (Zargar, B6.6), unless perforation is evident.
- **D2 · 12–48 h · Zargar grade?** (shown when D1 = No)
  - Calculators: Zargar.
  - Answer 0–2a: early oral intake, discharge.
  - Answer 2b–3a: admit, enteral nutrition.
  - Answer 3b: ICU, surgical evaluation.
  - Answer Grade 4 (perforation): emergency surgery.
- **K4 · Day 1 · Grade 0–2a** (shown when D2 = 0–2a)
  - Grade 0–2a: oral intake early and discharge.
- **K5 · Admission · Grade 2b–3a** (shown when D2 = 2b–3a)
  - Grade 2b–3: admit, nutritional support, monitor for perforation; stricture surveillance from about 3 weeks.
  - Enteral nutrition (tube placed under endoscopic guidance).
- **K6 · Now · Grade 3b** (shown when D2 = 3b)
  - ICU, surgical evaluation.
  - Monitor for perforation, enteral nutrition, stricture surveillance from about 3 weeks if no surgery.
- **K7 · Now · Grade 4 (perforation)** (shown when D2 = Grade 4 (perforation))
  - Grade 4 (perforation): emergency surgery.
- **K8 · Weeks to years · Then**
  - Dilation for strictures.
  - Long-term esophageal cancer risk: surveillance endoscopy from 15–20 years after ingestion (ASGE).
- **Avoid:** induced vomiting, neutralizing agents, blind nasogastric tube, routine corticosteroids; endoscopy between day 5 and day 15 (weakest wall, higher perforation risk).

Related: Zargar.

### B7.16 Acute colonic pseudo-obstruction, Ogilvie syndrome (id: em\_acpo)

Source: [Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007](https://doi.org/10.1016/j.gie.2019.09.007).

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** cecum >12 cm, peritonitis, perforation, signs of ischemia: surgical review.
- **Recognize:** marked colonic dilatation without mechanical obstruction (confirm with CT), usually in hospitalized or post-operative patients. Cecal diameter >12 cm or prolonged distension raises perforation risk.

Algorithm:

- **O1 · 0–24 h · Treat the cause and decompress**
  - Treat the cause (electrolytes, especially potassium and magnesium; stop opioids and anticholinergics; treat infection); NPO; nasogastric and rectal tube; mobilize; serial X-rays every 12–24 hours.
- **D1 · 24–48 h · Improving?**
  - Answer Yes: continue conservative care.
  - Answer No, or cecum >12 cm: consider neostigmine.
- **O2 · 24–48 h · Improving** (shown when D1 = Yes)
  - Continue conservative care.
- **D2 · 24–48 h · Contraindication to neostigmine?** (shown when D1 = No, or cecum >12 cm)
  - Mechanical obstruction, bradycardia, active bronchospasm or recent myocardial infarction.
  - Answer No: neostigmine.
  - Answer Yes, or neostigmine fails: colonoscopic decompression.
- **O3 · 24–48 h · Neostigmine** (shown when D2 = No)
  - If no response in 24–48 hours: neostigmine with cardiac monitoring and atropine at the bedside.
  - Neostigmine 2 mg IV over 3–5 minutes; may repeat once.
  - Why: Neostigmine gave prompt decompression in most patients (Ponec, NEJM 1999).
- **O4 · 24–48 h · Colonoscopic decompression** (shown when D2 = Yes, or neostigmine fails)
  - Neostigmine failure or contraindication: colonoscopic decompression with tube placement.
- **O5 · After decompression · After decompression**
  - Daily polyethylene glycol reduces recurrence (Sgouros, Gut 2006).
  - Perforation or peritonitis: surgery.
- **Avoid:** neostigmine with mechanical obstruction, bradycardia, active bronchospasm or recent myocardial infarction.

| Drug | Dose |
| --- | --- |
| Neostigmine | 2 mg IV over 3–5 minutes; may be repeated once if no response |

### B7.17 Colonic volvulus (id: em\_volvulus)

Source: [Naveed M et al. ASGE guideline on the role of endoscopy in the management of acute colonic pseudo-obstruction and colonic volvulus. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007](https://doi.org/10.1016/j.gie.2019.09.007).

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** peritonitis, perforation, shock, signs of ischemia: emergency surgery.
- **Recognize:** abdominal distension and pain; CT shows whirl sign or coffee-bean sign.

Algorithm:

- **Y1 · 0 h · Confirm and prepare**
  - CT; resuscitate; nasogastric tube; involve surgeons.
- **D1 · 0 h · Sigmoid or cecal?**
  - Answer Sigmoid: check for ischemia, perforation or peritonitis.
  - Answer Cecal: surgery.
- **Y2 · Now · Cecal volvulus** (shown when D1 = Cecal)
  - Cecal volvulus: surgery; endoscopic detorsion is not recommended.
- **D2 · 0 h · Ischemia, perforation or peritonitis?** (shown when D1 = Sigmoid)
  - Answer Yes: emergency surgery.
  - Answer No: endoscopic detorsion.
- **Y3 · Now · Sigmoid volvulus with ischemia, perforation or peritonitis** (shown when D2 = Yes)
  - Sigmoid volvulus with ischemia, perforation or peritonitis: emergency surgery.
- **Y4 · Within hours · Endoscopic detorsion** (shown when D2 = No)
  - Sigmoid volvulus without ischemia or perforation: endoscopic detorsion and decompression, leave a decompression tube; then elective sigmoidectomy during the same admission (high recurrence).
  - Necrotic mucosa at endoscopy: stop, surgery.
  - Why: Recurrence after detorsion alone is high (ASGE 2020).
- **Avoid:** endoscopic detorsion when there is mucosal necrosis.

### B7.18 Iatrogenic endoscopic perforation (id: em\_perforation)

Source: [Paspatis GA et al. Diagnosis and management of iatrogenic endoscopic perforations: ESGE Position Statement - Update 2020. Endoscopy 2020;52:792-810. doi:10.1055/a-1222-3191](https://doi.org/10.1055/a-1222-3191).

Bedside algorithm (B7.0). Weight field: no.

- **Red flags:** tension pneumoperitoneum (ventilation or circulation compromised), sepsis, peritonitis.
- **Recognize:** visible defect, fat or extraluminal structures during the procedure; or post-procedure pain, subcutaneous emphysema, fever, tachycardia.

Algorithm:

- **D1 · 0 h · Recognized during the procedure?**
  - Answer Yes: close at once if the field is clean.
  - Answer No: delayed recognition.
- **P1 · During the procedure · Recognized during the procedure** (shown when D1 = Yes)
  - If recognized during the procedure and the field is clean, close endoscopically at once (through-the-scope clips for small defects; over-the-scope clip or other devices for larger ones); switch to CO2 insufflation; decompress tension pneumoperitoneum with a needle if ventilation or circulation is compromised; IV broad-spectrum antibiotics; NPO; urgent surgical consultation.
  - Then CT.
- **P2 · Delayed · Delayed recognition** (shown when D1 = No)
  - CT, antibiotics, NPO, urgent surgical review; endoscopic closure only in selected early cases.
- **P3 · Closure · By site (ESGE 2020)**
  - Esophagus: clips or over-the-scope clip; covered stent or endoscopic vacuum therapy for larger defects.
  - ERCP: duodenal wall (scope) perforation: endoscopic closure or surgery; periampullary: biliary and/or pancreatic stent; guidewire or retroperitoneal air only: conservative.
  - Colon: clips or over-the-scope clip.
  - After colonic EMR: deep mural injury by the Sydney classification (B6.10).
- **P4 · Then · Leak and surgery**
  - CT to assess the leak; surgery if endoscopic closure fails, the defect is large, or peritonitis or sepsis develops.
- **Avoid:** delaying surgical review; air insufflation.

Related: Sydney deep mural injury.

### B7.19 Index of emergency pages

The home screen lists all 18 pages under "Emergencies" with a red label, in this order: Upper GI bleeding, Lower GI bleeding, Anticoagulants in GI bleeding, Acute severe UC, Toxic megacolon, Acute liver failure, Acute-on-chronic liver failure (ACLF), Alcohol-associated hepatitis, SBP, HRS-AKI, Hepatic encephalopathy, Acute pancreatitis, Cholangitis, Foreign body, Caustic ingestion, Ogilvie syndrome, Volvulus, Perforation.

Variceal bleeding has no page or index entry of its own: its search words open the upper GI bleeding page (B7.1) at the variceal pathway (B7.2). The index lists 18 entries; Acute-on-chronic liver failure (ACLF), B7.20, follows Acute liver failure. Searching "ACLF" or "acute-on-chronic liver failure" finds the ACLF page.

### B7.20 Acute-on-chronic liver failure (id: em\_aclf)

Bedside algorithm (B7.0). Weight field: yes.

- **Red flags:** need for organ support (vasopressors, ventilation, renal replacement), massive bleeding, HE grade 3–4, septic shock: ICU within 6 hours.
- **Recognize:** acute decompensation of cirrhosis (ascites, HE, GI bleeding, infection, jaundice) with organ failure by EASL-CLIF criteria; the ACLF grade (B3.17) gives 28-day mortality.

Algorithm:

- **A1 · 0–6 h · Grade and find the precipitant**
  - ACLF grade (B3.17).
  - Screen every patient for precipitants: infection (blood, urine and ascitic cultures, diagnostic paracentesis, chest X-ray), alcohol-associated hepatitis, GI bleeding, drug-induced liver injury, hepatitis B flare (HBsAg, HBV DNA), hepatitis A and E, autoimmune hepatitis.
  - Infection suspected: broad-spectrum antibiotics per local epidemiology as soon as possible.
  - Septic shock or worsening ACLF: cover all likely pathogens; de-escalate at 24–72 hours by microbiology; consider antifungals in nosocomial septic shock with fungal risk factors.
  - Calculators: ACLF grade.
- **D1 · 0–6 h · ICU criteria? (organ support, massive bleeding, HE grade 3–4, septic shock)**
  - Decide case by case with severe comorbidity or frailty.
  - Answer Yes: ICU within 6 hours.
  - Answer No: HDU or ward with close monitoring.
- **A2 · Within 6 h · ICU** (shown when D1 = Yes)
  - ICU within 6 hours.
- **A3 · Daily · HDU or ward** (shown when D1 = No)
  - HDU or ward with close monitoring; reassess daily.
- **A4 · 0–24 h · Treat the precipitant**
  - Infection or spontaneous bacterial peritonitis: see B7.9.
  - Variceal bleeding: see B7.1; consider pre-emptive or rescue TIPS if no contraindication; HE alone is not an absolute contraindication.
  - Alcohol-associated hepatitis: see B7.8; no corticosteroids with ACLF grade 3 or uncontrolled infection; if given, monitor closely for infection.
  - Hepatitis B flare: entecavir or tenofovir at once, without waiting for HBV DNA; refer for transplant if severe (MELD >30, ACLF grade 2–3).
  - Autoimmune hepatitis: corticosteroids; transplant assessment if bilirubin or MELD-Na has not improved after 7 days.
- **A5 · 0–72 h · Organ support, by failing organ**
  - Circulation: albumin or balanced crystalloids for initial fluids (albumin if large volumes plus vasopressors); norepinephrine first line; target MAP 65 mmHg or more; terlipressin or vasopressin as second line; hydrocortisone 200 mg/day (50 mg IV every 6 hours) if norepinephrine >0.25 µg/kg/min, maximum 10 days. No dopamine.
  - Kidney: manage as HRS-AKI (B7.10). Terlipressin: higher risk of respiratory failure in ACLF grade 3 or volume overload (CONFIRM, NEJM 2021). Renal replacement therapy if potassium >6.5 mmol/L, pH <7.2, refractory fluid overload or anuria; continuous, effluent dose 25–30 mL/kg/h.
  - Brain: manage HE (B7.11); grade 3–4: intubate to protect the airway.
  - Respiration: high-flow nasal oxygen over non-invasive ventilation for hypoxemic failure; lung-protective ventilation (6 mL/kg predicted body weight); SpO2 target 92–100%.
  - Coagulation: no prophylactic correction of INR or platelets; if bleeding, guide products by viscoelastic tests; venous thromboembolism prophylaxis (low-molecular-weight heparin or mechanical, by coagulopathy).
  - Nutrition: oral first, then enteral (nasojejunal preferred), parenteral only if enteral fails; energy 30–35 kcal/kg/day; protein 1.2–1.5 g/kg/day, no protein restriction; IV glucose 2–3 g/kg/day if fasting >12 hours; watch for refeeding syndrome.
  - Weight-based: continuous renal replacement therapy, energy target, protein target ACLF, IV glucose target.
- **A6 · Early · Transplant referral**
  - Refer early to a transplant center, especially ACLF grade 2–3.
  - Why: Transplant in ACLF grade 3 gave good survival in selected patients (Artru, J Hepatol 2017).
- **D2 · Day 3–7 · After 3–7 days of full organ support: 4 or more organ failures or CLIF-C ACLF >70, and no transplant option?**
  - CLIF-C ACLF score (B3.21); it also counts organ failures by the EASL-CLIF definitions from the same inputs.
  - Calculators: CLIF-C ACLF.
  - Answer Yes: discuss withdrawal of organ support and palliative care.
  - Answer No: continue full support and transplant evaluation.
  - Why: Judge prognosis after 3–7 days of full organ support, not at admission (EASL 2023; Gustot, Hepatology 2015).
- **A7 · Day 3–7 · Withdrawal of organ support** (shown when D2 = Yes)
  - Discuss withdrawal of organ support and palliative care with the family.
- **A8 · Day 3–7 · Continue full support** (shown when D2 = No)
  - Continue full support and transplant evaluation; repeat the score.
- **Avoid:** routine granulocyte colony-stimulating factor (GRAFT, J Hepatol 2021); routine plasma exchange or extracorporeal liver support outside trials; dopamine; protein restriction; prophylactic fresh frozen plasma or platelets.

| Drug | Dose |
| --- | --- |
| Hydrocortisone (septic shock, norepinephrine >0.25 µg/kg/min) | 50 mg IV every 6 hours (200 mg/day), maximum 10 days |
| Continuous renal replacement therapy | Effluent dose 25–30 mL/kg/h |
| Energy (target, not a dose) | 30–35 kcal/kg/day |
| Protein (target, not a dose) | 1.2–1.5 g/kg/day, no protein restriction |
| IV glucose (target, not a dose) | 2–3 g/kg/day if fasting >12 hours |

Related: ACLF grade, CLIF-C ACLF, MELD, West Haven.

## Part B8: Test vectors

Every result below was computed with an independent reference implementation of the formulas in this spec. Claude Code must turn each row into a unit test; a calculator is not done until its rows pass. Decimal results: match to 2 decimal places unless the result is rounded by rule.

### B8.1 Unit conversions

| Input | Expected |
| --- | --- |
| Bilirubin 34.2 µmol/L | 2.00 mg/dL |
| Creatinine 106 µmol/L | 1.20 mg/dL |
| BUN 25 mg/dL | Urea 8.93 mmol/L |
| Bilirubin 205.2 µmol/L | 12 mg/dL exactly (ACLF grade: liver failure, bilirubin ≥12 mg/dL) |
| Bilirubin 102.6 µmol/L | 6 mg/dL exactly (CLIF-C OF liver 2 points) |
| Creatinine 132.6 µmol/L | 1.5 mg/dL exactly (ACLF grade: kidney dysfunction, creatinine 1.5–1.9 mg/dL) |
| Creatinine 309.4 µmol/L | 3.5 mg/dL exactly (CLIF-C OF kidney 3 points) |
| Serum albumin 33 g/L, ascitic albumin 22 g/L (or 3.3 and 2.2 g/dL) | SAAG 1.1 g/dL exactly: portal hypertension |

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
| Baveno VIII | LSM 12 kPa, platelets 160, any etiology | Suggestive of cACLD; CSPH ruled out |
| Baveno VIII | LSM 27 kPa, platelets 90, viral | CSPH ruled in |
| Baveno VIII | LSM 27 kPa, MASLD, BMI 30 or more | CSPH indeterminate (obese MASLD line shown) |
| Baveno VIII | LSM 18 kPa, SSM 60 kPa, any etiology | CSPH ruled in |
| Baveno VIII | LSM 18 kPa, platelets 160, SSM 35 kPa, any etiology | CSPH indeterminate; screening endoscopy can be avoided if not eligible for a non-selective beta-blocker |
| Baveno VIII | LSM 27 kPa, MASLD without BMI ≥30 | CSPH ruled in |
| Baveno VIII | LSM 27 kPa, other etiology, no platelets or SSM | CSPH indeterminate, with the other-etiology line |
| Baveno VIII | LSM 9.9 kPa, platelets 200 | cACLD ruled out; CSPH ruled out; PSVD line only with the signs-of-portal-hypertension box ticked |
| Baveno VIII | LSM 15 kPa, platelets 150 | CSPH ruled out; LSM 15.1 kPa, platelets 150: indeterminate |
| Baveno VIII | LSM 12 kPa, platelets 160, SSM 56 kPa | Discordant results (no CSPH conclusion, no treatment line); SSM 55 kPa: ruled out |
| Baveno VIII | LSM 19.9 kPa, platelets 150, not eligible | Screening endoscopy can be avoided; LSM 20 kPa, platelets 150, not eligible: screening endoscopy |
| Baveno VIII | LSM 22 kPa, SSM 39.9 kPa | Screening endoscopy can be avoided; SSM 40 kPa: not |
| Old id baveno7 | Link #/calc/baveno7 | Opens the Baveno VIII calculator |

FibroScan (B3.20) test vectors:

| Inputs | Expected |
| --- | --- |
| MASLD, 10.5 kPa, CAP 310 | F3, S3 |
| MASLD, 6.5 kPa, CAP 240 | F0–F1, S0 |
| Hepatitis C, 13.0 kPa | F4 |
| Hepatitis B, 10.0 kPa | F3 |
| Alcohol-related, 16 kPa | F3 |
| Other, 12 kPa | cACLD suggestive |
| Other, 27 kPa | cACLD highly suggestive; LSM 25 kPa or more suggests CSPH, but this rule is validated only in viral, alcohol and non-obese MASLD; confirm with SSM or HVPG |
| Other, 9.9 kPa | cACLD ruled out |
| Hepatitis B, 25 kPa | F4; Baveno VIII: cACLD highly suggestive; CSPH ruled in (Baveno VIII) |
| MASLD, 25 kPa | F4; CSPH ruled in (Baveno VIII) |
| MASLD with BMI 30 or more, 30 kPa | F4; LSM rule for CSPH not applicable in obese MASLD (Baveno VIII); never CSPH ruled in |
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
| CLIF-C ACLF | Bilirubin 7 mg/dL, creatinine 2.5 mg/dL, HE grade 1–2, INR 2.2, MAP 65 mmHg, PaO2/FiO2 250, age 50, WBC 10 ×10⁹/L | CLIF-C OF 12; CLIF-C ACLF 54.1; 70 or less; 1 organ failure (kidney) |
| CLIF-C ACLF | Bilirubin 13 mg/dL, creatinine 4 mg/dL, HE grade 3–4, INR 2.6, vasopressors, PaO2/FiO2 400, age 60, WBC 20 ×10⁹/L | CLIF-C OF 16; CLIF-C ACLF 75.7; above 70; 5 organ failures |
| CLIF-C ACLF | Bilirubin 1 mg/dL, creatinine 1 mg/dL, no HE, INR 1.2, MAP 80 mmHg, SpO2/FiO2 400, age 50, WBC 10 ×10⁹/L | CLIF-C OF 6; CLIF-C ACLF 34.3; 0 organ failures |
| CLIF-C ACLF | Bilirubin 205.2 µmol/L, creatinine 176.8 µmol/L, no HE, INR 2.0, MAP 70 mmHg, SpO2/FiO2 357, age 50, WBC 10 ×10⁹/L | Liver 3, kidney 2, brain 1, coagulation 2, circulation 1, respiration 2: CLIF-C OF 11; 2 organ failures (liver, kidney) |
| CLIF-C ACLF | Bilirubin 102.6 µmol/L, renal replacement therapy, intubated for HE, INR 2.5, MAP 69 mmHg, SpO2/FiO2 214, age 50, WBC 10 ×10⁹/L | Liver 2, kidney 3, brain 3, coagulation 3, circulation 2, respiration 3: CLIF-C OF 16; 4 organ failures (kidney, brain, coagulation, respiration) |
| CLIF-C ACLF | Bilirubin 1 mg/dL, creatinine 1 mg/dL, no HE, INR 1.2, MAP 80 mmHg, PaO2/FiO2 300, SpO2/FiO2 400, mechanical ventilation not for HE, age 50, WBC 10 ×10⁹/L | Respiration 3 (ventilation): CLIF-C OF 8; 1 organ failure (respiration) |

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
| Jalan | Dilatation; fever, heart rate, anemia; dehydration | Criteria met (B 3 of 4, C 1 of 4) |
| Jalan | Dilatation; fever, heart rate; dehydration, hypotension | Criteria not met (B 2 of 4) |
| Jalan | Fever, heart rate, neutrophils, anemia; altered consciousness | Criteria not met (no dilatation) |
| Jalan | Dilatation; all 4 of B; none of C | Criteria not met (C 0 of 4) |

### B8.6 Endoscopy

| Calculator | Inputs | Expected |
| --- | --- | --- |
| BBPS | Right 2, transverse 3, left 2 | 7, adequate |
| BBPS | Right 3, transverse 3, left 1 | 7, inadequate (a segment <2) |
| Prague | C 2 cm, M 5 cm | "C2M5"; surveillance every 3 years (ACG and ESGE) |
| EREFS | Proximal: edema 1, rings 1, exudates 0, furrows 1, stricture 0; distal: edema 1, rings 2, exudates 1, furrows 2, stricture 0 | Proximal 3, distal 6, total 9 |
| EREFS | Every feature at its maximum in both regions | Proximal 9, distal 9, total 18 |
| EREFS | Every feature 0 in both regions | Proximal 0, distal 0, total 0 |
| Spigelman | No polyps | Stage 0; surveillance every 4 years |
| Spigelman | 1–4 polyps, 1–4 mm, tubular, low-grade dysplasia | 4 points, stage I; every 2–3 years |
| Spigelman | 5–20 polyps, 5–10 mm, tubular, low-grade dysplasia | 6 points, stage II; every 1–3 years |
| Spigelman | 5–20 polyps, 5–10 mm, tubulovillous, low-grade dysplasia | 7 points, stage III; every 6–12 months |
| Spigelman | 5–20 polyps, 1–4 mm, tubular, high-grade dysplasia | 7 points, stage III; every 6–12 months |
| Spigelman | >20 polyps, >10 mm, villous, high-grade dysplasia | 12 points, stage IV; expert surveillance every 3–6 months and surgical evaluation |
| Spigelman | >20 polyps, 5–10 mm, tubulovillous, low-grade dysplasia | 8 points, stage III |
| Spigelman | >20 polyps, >10 mm, tubulovillous, low-grade dysplasia | 9 points, stage IV |
| OLGA | Antrum moderate, corpus mild | Stage II, lower risk |
| OLGA | Antrum mild, corpus severe | Stage III, high risk |
| OLGIM | Antrum severe, corpus moderate | Stage IV, high risk |
| OLGA | Antrum none, corpus none | Stage 0, lower risk |
| OLGA and OLGIM | Every cell of the matrix | The stage in the B6.18 matrix |

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
| prothrombin complex concentrate INR 2 to <4 | 70 | 4-factor prothrombin complex concentrate, INR 2 to <4, 25 units/kg (max 2500 units): 1750 units IV |
| prothrombin complex concentrate INR 2 to <4 | 100 | 4-factor prothrombin complex concentrate, INR 2 to <4, 25 units/kg (max 2500 units): 2500 units IV |
| prothrombin complex concentrate INR 2 to <4 | 120 | 4-factor prothrombin complex concentrate, INR 2 to <4, 25 units/kg (max 2500 units): 2500 units IV (maximum) |
| prothrombin complex concentrate INR 4–6 | 70 | 4-factor prothrombin complex concentrate, INR 4–6, 35 units/kg (max 3500 units): 2450 units IV |
| prothrombin complex concentrate INR 4–6 | 100.5 | 4-factor prothrombin complex concentrate, INR 4–6, 35 units/kg (max 3500 units): 3500 units IV (maximum) |
| prothrombin complex concentrate INR >6 | 70 | 4-factor prothrombin complex concentrate, INR >6, 50 units/kg (max 5000 units): 3500 units IV |
| prothrombin complex concentrate INR >6 | 130 | 4-factor prothrombin complex concentrate, INR >6, 50 units/kg (max 5000 units): 5000 units IV (maximum) |
| N-acetylcysteine 150 mg/kg | 72.5 | N-acetylcysteine 150 mg/kg over 1 hour: 10875 mg |
| N-acetylcysteine 50 mg/kg | 72.5 | N-acetylcysteine 50 mg/kg over 4 hours: 3625 mg |
| N-acetylcysteine 100 mg/kg | 72.5 | N-acetylcysteine 100 mg/kg over 16 hours: 7250 mg |
| N-acetylcysteine 150 mg/kg | 100 | N-acetylcysteine 150 mg/kg over 1 hour: 15000 mg |
| N-acetylcysteine 150 mg/kg | 120 | N-acetylcysteine 150 mg/kg over 1 hour: 15000 mg (dosing weight capped at 100 kg) |
| N-acetylcysteine 150 mg/kg | 150 | N-acetylcysteine 150 mg/kg over 1 hour: 15000 mg (dosing weight capped at 100 kg) |
| N-acetylcysteine 50 mg/kg | 150 | N-acetylcysteine 50 mg/kg over 4 hours: 5000 mg (dosing weight capped at 100 kg) |
| N-acetylcysteine 100 mg/kg | 150 | N-acetylcysteine 100 mg/kg over 16 hours: 10000 mg (dosing weight capped at 100 kg) |
| albumin challenge 1 g/kg | 72.5 | Albumin challenge, 1 g/kg: 72.5 g = 362.5 mL of 20% albumin or 290 mL of 25% albumin |
| albumin challenge 1.5 g/kg | 72.5 | Albumin challenge, 1.5 g/kg: 108.8 g = 543.8 mL of 20% albumin or 435 mL of 25% albumin |
| protein target | 72.5 | Target, not a dose. Protein 1.2–1.5 g/kg/day: 87–108.8 g/day |
| protein target | 60 | Target, not a dose. Protein 1.2–1.5 g/kg/day: 72–90 g/day |
| continuous renal replacement therapy | 72.5 | Continuous renal replacement therapy, effluent dose 25–30 mL/kg/h: 1812.5–2175 mL/h |
| continuous renal replacement therapy | 60 | Continuous renal replacement therapy, effluent dose 25–30 mL/kg/h: 1500–1800 mL/h |
| energy target | 72.5 | Target, not a dose. Energy 30–35 kcal/kg/day: 2175–2537.5 kcal/day |
| protein target ACLF | 72.5 | Target, not a dose. Protein 1.2–1.5 g/kg/day: 87–108.8 g/day |
| IV glucose target | 72.5 | Target, not a dose. IV glucose 2–3 g/kg/day if fasting >12 hours: 145–217.5 g/day |
| IV glucose target | 60 | Target, not a dose. IV glucose 2–3 g/kg/day if fasting >12 hours: 120–180 g/day |

### B8.8 Bedside algorithm paths (B7.0)

Steps shown in the normal view for each set of answers (several answers separated by semicolons). In "Show full algorithm" every step is shown; the last rows give the marks.

| Page | Answers | Steps shown |
| --- | --- | --- |
| em\_ugib | none | U1, D1 |
| em\_ugib | D1 = Yes | U1, D1, V1, V2, D4, V3, V6, V7 |
| em\_ugib | D1 = Yes; D4 = OV or GOV1 | U1, D1, V1, V2, D4, V8, V3, D2, V6, V7 |
| em\_ugib | D1 = Yes; D4 = OV or GOV1; D2 = Yes | U1, D1, V1, V2, D4, V8, V3, D2, V4, V6, V7 |
| em\_ugib | D1 = Yes; D4 = OV or GOV1; D2 = No | U1, D1, V1, V2, D4, V8, V3, D2, V5, V6, V7 |
| em\_ugib | D1 = Yes; D4 = GOV2 or IGV1 | U1, D1, V1, V2, D4, V9, V3, V6, V7 |
| em\_ugib | D1 = Yes; D4 = GOV2 or IGV1; D2 = Yes | U1, D1, V1, V2, D4, V9, V3, V6, V7 |
| em\_ugib | D1 = Yes; D2 = Yes | U1, D1, V1, V2, D4, V3, V6, V7 |
| em\_ugib | D1 = No | U1, D1, N1, N2, D3, N5, N6, N7 |
| em\_ugib | D1 = No; D3 = High-risk stigmata | U1, D1, N1, N2, D3, N3, N5, N6, N7 |
| em\_ugib | D1 = No; D3 = Low-risk stigmata | U1, D1, N1, N2, D3, N4, N5, N6, N7 |
| em\_ugib | D1 = No; D2 = Yes | U1, D1, N1, N2, D3, N5, N6, N7 |
| em\_ugib | entry point variceal | U1, D1, V1, V2, D4, V3, V6, V7 |
| em\_ugib | entry point source | U1, D1, V1, V2, D4, V3, V6, V7 |
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
| em\_lgib | none | L1, D1, L5, L6 |
| em\_lgib | D1 = Yes | L1, D1, L2, L5, L6 |
| em\_lgib | D1 = No | L1, D1, D2, L5, L6 |
| em\_lgib | D1 = No; D2 = Yes | L1, D1, D2, L3, L5, L6 |
| em\_lgib | D1 = No; D2 = No | L1, D1, D2, L4, L5, L6 |
| em\_lgib | D1 = Yes; D2 = Yes | L1, D1, L2, L5, L6 |
| em\_antithrombotic | none | D1, T3 |
| em\_antithrombotic | D1 = No | D1, T1, T3 |
| em\_antithrombotic | D1 = Yes | D1, T2, T3 |
| em\_toxic\_megacolon | none | M1, M2, D1 |
| em\_toxic\_megacolon | D1 = Yes | M1, M2, D1, M3 |
| em\_toxic\_megacolon | D1 = No | M1, M2, D1, M4 |
| em\_alf | none | F1, D1, D2, F6 |
| em\_alf | D1 = Yes | F1, D1, F2, D2, F6 |
| em\_alf | D1 = No | F1, D1, F3, D2, F6 |
| em\_alf | D2 = Yes | F1, D1, D2, F4, F6 |
| em\_alf | D2 = No | F1, D1, D2, F5, F6 |
| em\_alf | D1 = Yes; D2 = Yes | F1, D1, F2, D2, F4, F6 |
| em\_aah | none | H1, D1, H6 |
| em\_aah | D1 = Yes | H1, D1, H2, D2, H6 |
| em\_aah | D1 = No | H1, D1, H3, H6 |
| em\_aah | D1 = Yes; D2 = Yes | H1, D1, H2, D2, H4, H6 |
| em\_aah | D1 = Yes; D2 = No | H1, D1, H2, D2, H5, H6 |
| em\_aah | D1 = No; D2 = Yes | H1, D1, H3, H6 |
| em\_hrs | none | R1, D1 |
| em\_hrs | D1 = Yes | R1, D1, R2, R4, R5 |
| em\_hrs | D1 = No | R1, D1, R3 |
| em\_he | none | E1, D1, E4, E5, D2, E8 |
| em\_he | D1 = Yes | E1, D1, E2, E4, E5, D2, E8 |
| em\_he | D1 = No | E1, D1, E3, E4, E5, D2, E8 |
| em\_he | D2 = Yes | E1, D1, E4, E5, D2, E6, E8 |
| em\_he | D2 = No | E1, D1, E4, E5, D2, E7, E8 |
| em\_foreign\_body | none | B1, D1, B9, B10 |
| em\_foreign\_body | D1 = Complete esophageal obstruction (cannot swallow saliva) | B1, D1, B2, B9, B10 |
| em\_foreign\_body | D1 = Sharp-pointed object or battery in the esophagus | B1, D1, B3, B9, B10 |
| em\_foreign\_body | D1 = Other esophageal foreign body without complete obstruction | B1, D1, B4, B9, B10 |
| em\_foreign\_body | D1 = Stomach (sharp-pointed objects, magnets, batteries, large or long objects) | B1, D1, B5, B9, B10 |
| em\_foreign\_body | D1 = Stomach (medium-sized blunt objects) | B1, D1, B6, B9, B10 |
| em\_foreign\_body | D1 = Small blunt objects (not batteries or magnets) beyond the esophagus | B1, D1, B7, B9, B10 |
| em\_foreign\_body | D1 = Drug packets (body packing) | B1, D1, B8, B9, B10 |
| em\_caustic | none | K1, D1, K8 |
| em\_caustic | D1 = Yes | K1, D1, K2, K8 |
| em\_caustic | D1 = No | K1, D1, K3, D2, K8 |
| em\_caustic | D1 = No; D2 = 0–2a | K1, D1, K3, D2, K4, K8 |
| em\_caustic | D1 = No; D2 = 2b–3a | K1, D1, K3, D2, K5, K8 |
| em\_caustic | D1 = No; D2 = 3b | K1, D1, K3, D2, K6, K8 |
| em\_caustic | D1 = No; D2 = Grade 4 (perforation) | K1, D1, K3, D2, K7, K8 |
| em\_caustic | D1 = Yes; D2 = 3b | K1, D1, K2, K8 |
| em\_acpo | none | O1, D1, O5 |
| em\_acpo | D1 = Yes | O1, D1, O2, O5 |
| em\_acpo | D1 = No, or cecum >12 cm | O1, D1, D2, O5 |
| em\_acpo | D1 = No, or cecum >12 cm; D2 = No | O1, D1, D2, O3, O5 |
| em\_acpo | D1 = No, or cecum >12 cm; D2 = Yes, or neostigmine fails | O1, D1, D2, O4, O5 |
| em\_volvulus | none | Y1, D1 |
| em\_volvulus | D1 = Cecal | Y1, D1, Y2 |
| em\_volvulus | D1 = Sigmoid | Y1, D1, D2 |
| em\_volvulus | D1 = Sigmoid; D2 = Yes | Y1, D1, D2, Y3 |
| em\_volvulus | D1 = Sigmoid; D2 = No | Y1, D1, D2, Y4 |
| em\_volvulus | D1 = Cecal; D2 = No | Y1, D1, Y2 |
| em\_perforation | none | D1, P3, P4 |
| em\_perforation | D1 = Yes | D1, P1, P3, P4 |
| em\_perforation | D1 = No | D1, P2, P3, P4 |
| em\_aclf | none | A1, D1, A4, A5, A6, D2 |
| em\_aclf | D1 = Yes | A1, D1, A2, A4, A5, A6, D2 |
| em\_aclf | D1 = No | A1, D1, A3, A4, A5, A6, D2 |
| em\_aclf | D2 = Yes | A1, D1, A4, A5, A6, D2, A7 |
| em\_aclf | D2 = No | A1, D1, A4, A5, A6, D2, A8 |
| em\_aclf | D1 = Yes; D2 = No | A1, D1, A2, A4, A5, A6, D2, A8 |

"Show full algorithm" marks: on path (answer chosen), off path (another answer chosen, or its decision is off path), or not yet decided.

| Page | Answers | On path | Off path | Not yet decided |
| --- | --- | --- | --- | --- |
| em\_ugib | D1 = Yes | V1, V2, D4, V3, V6, V7 | N1, N2, D3, N3, N4, N5, N6, N7 | V8, V9, D2, V4, V5 |
| em\_ugib | none | none | none | V1, V2, D4, V8, V9, V3, D2, V4, V5, V6, V7, N1, N2, D3, N3, N4, N5, N6, N7 |
| em\_ugib | D1 = Yes; D4 = GOV2 or IGV1 | V1, V2, D4, V9, V3, V6, V7 | V8, D2, V4, V5, N1, N2, D3, N3, N4, N5, N6, N7 | none |
| em\_sbp | D1 = Runyon criteria or polymicrobial culture | S4 | S2, S3, S5, S6, S7 | none |
| em\_asuc | D1 = No | A3 | A2, D2, A4, A5 | none |
| em\_volvulus | D1 = Sigmoid | D2 | Y2 | Y3, Y4 |
| em\_caustic | D1 = No; D2 = 3b | K3, D2, K6 | K2, K4, K5, K7 | none |

### B8.9 Suggested answers (B7.0)

Calculator inputs are in the calculator's own units. "none" = no answer suggested.

| Page | Decision | Calculator | Inputs | Suggested | Note shown |
| --- | --- | --- | --- | --- | --- |
| em\_ugib | D2 | Child-Pugh | bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.0, ascites moderate to severe, encephalopathy none | Yes | none |
| em\_ugib | D2 | Child-Pugh | bilirubin 1.5 mg/dL, albumin 3.6 g/dL, INR 1.2, ascites none, encephalopathy none | none | none |
| em\_ugib | D2 | Child-Pugh | bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.5, ascites moderate to severe, encephalopathy grade 1–2 | No | Pre-emptive TIPS criteria not met (Child-Pugh >13). Salvage TIPS can still be considered if bleeding is refractory. |
| em\_ugib | D2 | Child-Pugh | bilirubin 3.5 mg/dL, albumin 2.5 g/dL, INR 2.5, ascites moderate to severe, encephalopathy grade 3–4 | No | Pre-emptive TIPS criteria not met (Child-Pugh >13). Salvage TIPS can still be considered if bleeding is refractory. |
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
| em\_lgib | D2 | Oakland | age 35, female, heart rate 75/min, systolic BP 125 mmHg, hemoglobin 140 g/L | Yes | none |
| em\_lgib | D2 | Oakland | age 35, female, heart rate 75/min, systolic BP 125 mmHg, hemoglobin 140 g/L, blood on rectal exam | No | none |
| em\_alf | D2 | King's College criteria | acetaminophen, arterial pH 7.2 | Yes | none |
| em\_alf | D2 | King's College criteria | acetaminophen, arterial pH 7.35 | none | none |
| em\_aah | D2 | Lille | age 50, albumin 25 g/L, bilirubin day 0 300 µmol/L, day 7 280 µmol/L, creatinine 1.0 mg/dL, PT 20 s | Yes | none |
| em\_aah | D2 | Lille | age 50, albumin 30 g/L, bilirubin day 0 300 µmol/L, day 7 150 µmol/L, creatinine 1.0 mg/dL, PT 15 s | No | none |
| em\_he | D1 | West Haven | grade 3 | Yes | none |
| em\_he | D1 | West Haven | grade 4 | Yes | none |
| em\_he | D1 | West Haven | grade 2 | No | none |
| em\_he | D1 | West Haven | minimal | No | none |
| em\_aclf | D2 | CLIF-C ACLF | bilirubin 13 mg/dL, creatinine 4 mg/dL, HE grade 3–4, INR 2.6, vasopressors, PaO2/FiO2 400, age 60, WBC 20 ×10⁹/L | Yes | none |
| em\_aclf | D2 | CLIF-C ACLF | bilirubin 7 mg/dL, creatinine 2.5 mg/dL, HE grade 1–2, INR 2.2, MAP 65 mmHg, PaO2/FiO2 250, age 50, WBC 10 ×10⁹/L | none | none |
| em\_aclf | D2 | CLIF-C ACLF | bilirubin 13 mg/dL, creatinine 2.5 mg/dL, HE grade 3–4, INR 2.6, MAP 75 mmHg, PaO2/FiO2 400, age 40, WBC 5 ×10⁹/L | Yes | none |
| em\_aclf | D2 | CLIF-C ACLF | bilirubin 13 mg/dL, creatinine 2.5 mg/dL, HE grade 3–4, INR 2.2, MAP 75 mmHg, PaO2/FiO2 400, age 40, WBC 5 ×10⁹/L | none | none |
| em\_caustic | D2 | Zargar | grade 0 | 0–2a | none |
| em\_caustic | D2 | Zargar | grade 2a | 0–2a | none |
| em\_caustic | D2 | Zargar | grade 2b | 2b–3a | none |
| em\_caustic | D2 | Zargar | grade 3a | 2b–3a | none |
| em\_caustic | D2 | Zargar | grade 3b | 3b | none |
| em\_caustic | D2 | Zargar | grade 4 | Grade 4 (perforation) | none |

### B8.10 Motility

Chicago inputs below use the default upper limits (supine 15, upright 12 mmHg) unless stated; percentages not listed are 0; symptoms and supportive test are not ticked unless stated.

| Calculator | Inputs | Expected |
| --- | --- | --- |
| Chicago | IRP 30 supine, 25 upright; failed 100%; pressurization 40% | Achalasia type II |
| Chicago | IRP 30 supine, 25 upright; failed 100%; pressurization 20% | Achalasia type II |
| Chicago | IRP 30 supine, 25 upright; failed 100%; pressurization 19% | Achalasia type I |
| Chicago | IRP 28 supine, 20 upright; normal 0%; failed 30%, weak 20%, fragmented 10%, premature 40% | Achalasia type III |
| Chicago | IRP 28 supine, 20 upright; normal 10%; failed 50%, premature 40% | Distal esophageal spasm pattern, inconclusive (normal swallows present, so not achalasia type III; EGJOO criteria not met) |
| Chicago | IRP 28 supine, 20 upright; normal 70%; premature 30%; elevated intrabolus pressure 30% | EGJ outflow obstruction, inconclusive (normal peristalsis present, so not achalasia type III) |
| Chicago | IRP 22 supine, 18 upright; elevated intrabolus pressure 25%; symptoms; supportive test abnormal | EGJ outflow obstruction, clinically relevant |
| Chicago | IRP 22 supine, 18 upright; elevated intrabolus pressure 25%; symptoms | EGJ outflow obstruction, inconclusive; action "Inconclusive: obtain timed barium esophagram or FLIP, exclude mechanical obstruction and opioid effect." |
| Chicago | IRP 22 supine, 10 upright; elevated intrabolus pressure 25% | Normal esophageal motility, with the note that EGJ outflow obstruction criteria are not met |
| Chicago | IRP 22 supine, 18 upright; elevated intrabolus pressure 19% | Normal esophageal motility, with the note that EGJ outflow obstruction criteria are not met |
| Chicago | IRP 15 supine, 12 upright (at the upper limits); failed 100% | Absent contractility |
| Chicago | Upper limits 25 supine, 20 upright; IRP 22 supine, 18 upright; failed 100% | Absent contractility |
| Chicago | IRP 10 supine, 8 upright; premature 20%; symptoms | Distal esophageal spasm, clinically relevant |
| Chicago | IRP 10 supine, 8 upright; premature 30% | Distal esophageal spasm pattern, inconclusive |
| Chicago | IRP 10 supine, 8 upright; hypercontractile 25%; symptoms | Hypercontractile esophagus, clinically relevant |
| Chicago | IRP 10 supine, 8 upright; hypercontractile 25% | Hypercontractile esophagus pattern, inconclusive |
| Chicago | IRP 10 supine, 8 upright; failed 50% | Ineffective esophageal motility |
| Chicago | IRP 10 supine, 8 upright; failed 20%, weak 40%, fragmented 20% (ineffective 80%) | Ineffective esophageal motility |
| Chicago | IRP 10 supine, 8 upright; failed 20%, weak 50% (ineffective 70%) | Ineffective esophageal motility, inconclusive |
| Chicago | IRP 10 supine, 8 upright; weak 50% (ineffective 50%) | Ineffective esophageal motility, inconclusive |
| Chicago | IRP 10 supine, 8 upright; weak 40% (ineffective 40%) | Normal esophageal motility |
| Chicago | IRP 10 supine, 8 upright; normal 60%, failed 30%, weak 20% (total 110%) | Ineffective esophageal motility, inconclusive, with the soft warning on the percentages |
| Eckardt | Dysphagia 1, regurgitation 1, pain 0, weight loss 0; before treatment | 2, stage I |
| Eckardt | 0, 1, 0, 0; before treatment | 1, stage 0 |
| Eckardt | 2, 2, 0, 0; before treatment | 4, stage II |
| Eckardt | 3, 2, 1, 0; before treatment | 6, stage II |
| Eckardt | 3, 3, 1, 0; before treatment | 7, stage III |
| Eckardt | 3, 3, 3, 3; before treatment | 12, stage III |
| Eckardt | 2, 1, 0, 0; after treatment | 3, stage I; Treatment success (score 3 or less) |
| Eckardt | 2, 1, 1, 0; after treatment | 4, stage II; Treatment failure (score >3) |
| London | Everything normal (RAIR present, normal pressures, normal expulsion, no dyssynergia or poor propulsion, normal sensation) | No disorder of anorectal function |
| London | RAIR absent, everything else normal | Rectoanal areflexia (major); band Major disorder |
| London | Low resting and low squeeze | Combined anal hypotension and hypocontractility (major) |
| London | Low resting, normal squeeze | Anal hypotension with normal contractility (major); band Major disorder |
| London | Normal resting, low squeeze | Anal normotension with hypocontractility (major) |
| London | High resting, normal squeeze | Anal hypertension (minor) |
| London | High resting, low squeeze | Anal hypertension (minor) with low squeeze pressure: not a named London pattern; report both findings. |
| London | Abnormal expulsion, dyssynergia, poor propulsion | Abnormal expulsion with dyssynergia and poor propulsion (minor) |
| London | Abnormal expulsion, dyssynergia only | Abnormal expulsion with dyssynergia (minor) |
| London | Abnormal expulsion, poor propulsion only | Abnormal expulsion with poor propulsion (minor) |
| London | Abnormal expulsion, normal pattern | Abnormal expulsion with a normal pushing pattern (inconclusive); band Inconclusive |
| London | Normal expulsion, dyssynergia | Normal expulsion with dyssynergia (inconclusive) |
| London | Normal expulsion, poor propulsion | Normal expulsion with poor propulsion (inconclusive) |
| London | Normal expulsion, dyssynergia and poor propulsion | Normal expulsion with poor propulsion and dyssynergia (inconclusive) |
| London | First constant sensation and desire to defecate above upper limit | Rectal hyposensitivity (major) |
| London | Maximum tolerated volume above upper limit only | Borderline rectal hyposensitivity (inconclusive); band Inconclusive |
| London | Maximum tolerated volume below lower limit | Rectal hypersensitivity (major) |
| London | RAIR absent; high resting; abnormal expulsion with dyssynergia | Rectoanal areflexia (major), anal hypertension (minor), abnormal expulsion with dyssynergia (minor); band Major disorder |

## Part B9: References

Primary guidelines and papers behind Part B. Claude Code shows the relevant one on each screen; links below are the pages used to check this spec.

| Topic | Source |
| --- | --- |
| Upper GI bleeding | [Laine L et al. ACG Clinical Guideline: Upper GI and Ulcer Bleeding. Am J Gastroenterol 2021 (PMID 33929377)](https://pubmed.ncbi.nlm.nih.gov/33929377/); [Gralnek IM et al. ESGE NVUGIH guideline update. Endoscopy 2021 (PMID 33567467)](https://pubmed.ncbi.nlm.nih.gov/33567467/); [Sreedharan A et al. Proton pump inhibitor treatment initiated prior to endoscopic diagnosis in upper gastrointestinal bleeding. Cochrane Database Syst Rev 2010 (PMID 20614440)](https://pubmed.ncbi.nlm.nih.gov/20614440/) |
| GBS points | [Blatchford O et al. Lancet 2000 (table)](https://pmc.ncbi.nlm.nih.gov/articles/PMC5299211/table/tab2d) |
| Rockall | [Rockall TA et al. Gut 1996 (table)](https://pmc.ncbi.nlm.nih.gov/articles/PMC4753192/table/T1) |
| AIMS65 | Saltzman JR et al. Gastrointest Endosc 2011 |
| Lower GI bleeding and Oakland threshold | [Sengupta N et al. ACG guideline 2023](https://gastroenterology.acponline.org/archives/2023/03/24/2.htm); Oakland K et al. Lancet Gastroenterol Hepatol 2017 |
| Antithrombotics in GI bleeding | [Abraham NS et al. ACG-CAG guideline 2022](https://gastroenterology.acponline.org/archives/2022/03/25/1.htm) |
| Variceal bleeding | [Baveno VIII Faculty. Baveno VIII - Advancing consensus in portal hypertension. J Hepatol 2026;85:993-1018 (PMID 42624290)](https://pubmed.ncbi.nlm.nih.gov/42624290/); [Gralnek IM et al. ESGE variceal guideline 2022](https://pubmed.ncbi.nlm.nih.gov/36174643); [Garcia-Tsao G et al. Portal hypertensive bleeding in cirrhosis: risk stratification, diagnosis, and management: 2016 practice guidance by the AASLD. Hepatology 2017 (PMID 27786365)](https://pubmed.ncbi.nlm.nih.gov/27786365/) |
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
| Colonic pseudo-obstruction and volvulus | [Naveed M et al. ASGE guideline. Gastrointest Endosc 2020;91(2):228-235. doi:10.1016/j.gie.2019.09.007 (PMID 31791596)](https://pubmed.ncbi.nlm.nih.gov/31791596/) |
| Iatrogenic endoscopic perforation | [Paspatis GA et al. ESGE Position Statement, Update 2020. Endoscopy 2020;52:792-810. doi:10.1055/a-1222-3191 (PMID 32781470)](https://pubmed.ncbi.nlm.nih.gov/32781470/) |
| Acute liver failure definition (AASLD) | Lee WM, Stravitz RT, Larson AM. Introduction to the revised AASLD Position Paper on acute liver failure 2011. Hepatology 2012;55(3):965-7. doi:10.1002/hep.25551 (PMID 22213561) |
| Cholangitis drainage timing (ESGE 2019) | Manes G et al. Endoscopic management of common bile duct stones: ESGE guideline. Endoscopy 2019;51(5):472-491. doi:10.1055/a-0862-0346 (PMID 30943551) |
| Toxic megacolon (Jalan criteria) | Jalan KN et al. An experience of ulcerative colitis. I. Toxic dilation in 55 cases. Gastroenterology 1969;57(1):68-82 (PMID 5305933) |
| Hepatic encephalopathy (HELP trial) | Rahimi RS et al. Lactulose vs polyethylene glycol 3350-electrolyte solution for treatment of overt hepatic encephalopathy: the HELP randomized clinical trial. JAMA Intern Med 2014;174(11):1727-33. doi:10.1001/jamainternmed.2014.4746 (PMID 25243839) |
| Los Angeles classification | Lundell LR et al. Endoscopic assessment of oesophagitis: clinical and functional correlates and further validation of the Los Angeles classification. Gut 1999;45(2):172-80. doi:10.1136/gut.45.2.172 (PMID 10403727) |
| Prague C and M criteria | Sharma P et al. The development and validation of an endoscopic grading system for Barrett's esophagus: the Prague C & M criteria. Gastroenterology 2006;131(5):1392-9. doi:10.1053/j.gastro.2006.08.032 (PMID 17101315) |
| Bedside algorithm trials and sources (B7.0) | Villanueva C et al. Transfusion strategies for acute upper gastrointestinal bleeding. NEJM 2013 (PMID 23281973); Garcia-Pagan JC et al. Early use of TIPS in patients with cirrhosis and variceal bleeding. NEJM 2010 (PMID 20573925); Lau JYW et al. Timing of endoscopy for acute upper gastrointestinal bleeding. NEJM 2020 (PMID 32242355); HALT-IT Trial Collaborators. Lancet 2020 (PMID 32563378); Chavez-Tapia NC et al. Antibiotic prophylaxis for cirrhotic patients with upper gastrointestinal bleeding. Cochrane Database Syst Rev 2010 (PMID 20824832); Laharie D et al. Ciclosporin versus infliximab in patients with severe ulcerative colitis refractory to intravenous steroids (CYSIF). Lancet 2012 (PMID 23063316); Williams JG et al. Infliximab versus ciclosporin for steroid-resistant acute severe ulcerative colitis (CONSTRUCT). Lancet Gastroenterol Hepatol 2016 (PMID 27595142); Grainge MJ et al. Venous thromboembolism during active disease and remission in inflammatory bowel disease: a cohort study. Lancet 2010 (PMID 20149425); Randall J et al. Delayed surgery for acute severe colitis is associated with increased risk of postoperative complications. Br J Surg 2010 (PMID 20101648); Sort P et al. NEJM 1999 (PMID 10432325); de-Madaria E et al. Aggressive or moderate fluid resuscitation in acute pancreatitis (WATERFALL). NEJM 2022;387:989-1000 (PMID 36103415); Schepers NJ et al. Urgent ERCP with sphincterotomy versus conservative treatment in predicted severe acute gallstone pancreatitis (APEC). Lancet 2020 (PMID 32682482); da Costa DW et al. Same-admission versus interval cholecystectomy for mild gallstone pancreatitis (PONCHO). Lancet 2015 (PMID 26460661); Boxhoorn L et al. Immediate versus postponed intervention for infected necrotizing pancreatitis (POINTER). NEJM 2021 (PMID 34614330). Each links to https://pubmed.ncbi.nlm.nih.gov/PMID/ |
| Spontaneous bacterial peritonitis (B7.9) | [EASL Clinical Practice Guidelines for the management of patients with decompensated cirrhosis. J Hepatol 2018 (PMID 29653741)](https://pubmed.ncbi.nlm.nih.gov/29653741/); [Biggins SW et al. AASLD practice guidance on diagnosis, evaluation and management of ascites, spontaneous bacterial peritonitis and hepatorenal syndrome. Hepatology 2021 (PMID 33942342)](https://pubmed.ncbi.nlm.nih.gov/33942342/) |
| Emergency page sources (B7.3 to B7.18) | [Sengupta N et al. ACG guideline 2023 (PMID 36735555)](https://pubmed.ncbi.nlm.nih.gov/36735555/); [Abraham NS et al. ACG-CAG guideline 2022 (PMID 35297395)](https://pubmed.ncbi.nlm.nih.gov/35297395/); [Gralnek IM et al. ESGE 2021 (PMID 33567467)](https://pubmed.ncbi.nlm.nih.gov/33567467/); [Sung JJ et al. Ann Intern Med 2010 (PMID 19949136)](https://pubmed.ncbi.nlm.nih.gov/19949136/); [McDonald LC et al. IDSA/SHEA C. difficile guideline. Clin Infect Dis 2018 (PMID 29462280)](https://pubmed.ncbi.nlm.nih.gov/29462280/); [Randall J et al. Br J Surg 2010 (PMID 20101648)](https://pubmed.ncbi.nlm.nih.gov/20101648/); [Lee WM et al. Gastroenterology 2009 (PMID 19524577)](https://pubmed.ncbi.nlm.nih.gov/19524577/); [EASL acute liver failure guideline. J Hepatol 2017 (PMID 28417882)](https://pubmed.ncbi.nlm.nih.gov/28417882/); [Thursz MR et al. STOPAH. NEJM 2015 (PMID 25901427)](https://pubmed.ncbi.nlm.nih.gov/25901427/); [Louvet A et al. Lille model. Hepatology 2007 (PMID 17518367)](https://pubmed.ncbi.nlm.nih.gov/17518367/); [Arab JP et al. J Hepatol 2021 (PMID 34166722)](https://pubmed.ncbi.nlm.nih.gov/34166722/); [Nadim MK et al. ICA-ADQI. J Hepatol 2024 (PMID 38527522)](https://pubmed.ncbi.nlm.nih.gov/38527522/); [Wong F et al. CONFIRM. NEJM 2021 (PMID 33657294)](https://pubmed.ncbi.nlm.nih.gov/33657294/); [Vilstrup H et al. AASLD-EASL. Hepatology 2014 (PMID 25042402)](https://pubmed.ncbi.nlm.nih.gov/25042402/); [Bass NM et al. NEJM 2010 (PMID 20335583)](https://pubmed.ncbi.nlm.nih.gov/20335583/); [Birk M et al. ESGE. Endoscopy 2016 (PMID 26862844)](https://pubmed.ncbi.nlm.nih.gov/26862844/); [Zargar SA et al. Gastrointest Endosc 1991 (PMID 2032601)](https://pubmed.ncbi.nlm.nih.gov/2032601/); [Ponec RJ et al. NEJM 1999 (PMID 10403850)](https://pubmed.ncbi.nlm.nih.gov/10403850/); [Sgouros SN et al. Gut 2006 (PMID 16306137)](https://pubmed.ncbi.nlm.nih.gov/16306137/); [Hirota WK et al. ASGE guideline: the role of endoscopy in the surveillance of premalignant conditions of the upper GI tract. Gastrointest Endosc 2006 (PMID 16564854)](https://pubmed.ncbi.nlm.nih.gov/16564854/) |
| Acute-on-chronic liver failure (B3.17, B3.21, B7.20) | [EASL Clinical Practice Guidelines on acute-on-chronic liver failure. J Hepatol 2023 (PMID 37364789)](https://pubmed.ncbi.nlm.nih.gov/37364789/); [Bajaj JS et al. ACG Clinical Guideline: acute-on-chronic liver failure. Am J Gastroenterol 2022 (PMID 35006099)](https://pubmed.ncbi.nlm.nih.gov/35006099/); [Moreau R et al. CANONIC. Gastroenterology 2013 (PMID 23474284)](https://pubmed.ncbi.nlm.nih.gov/23474284/); [Jalan R et al. CLIF-C ACLF score. J Hepatol 2014 (PMID 24950482)](https://pubmed.ncbi.nlm.nih.gov/24950482/); [Gustot T et al. Clinical course of ACLF. Hepatology 2015 (PMID 25877702)](https://pubmed.ncbi.nlm.nih.gov/25877702/); [Artru F et al. Transplant in ACLF grade 3. J Hepatol 2017 (PMID 28645736)](https://pubmed.ncbi.nlm.nih.gov/28645736/); [Engelmann C et al. GRAFT. J Hepatol 2021 (PMID 34364917)](https://pubmed.ncbi.nlm.nih.gov/34364917/); [Wong F et al. CONFIRM. NEJM 2021 (PMID 33657294)](https://pubmed.ncbi.nlm.nih.gov/33657294/); [Engelmann C et al. CLIF-C ACLF futility threshold. Crit Care 2018 (PMID 30305132)](https://pubmed.ncbi.nlm.nih.gov/30305132/) |
| Classification cards (B6.9 to B6.22) | Hirano 2013 (PMID 22619364); Burgess 2017 (PMID 27464708); Sano 2016 (PMID 26927367); Kudo 1996 (PMID 8836710); Haggitt 1985 (PMID 4007423); Kikuchi 1995 (PMID 7497841); Hashiguchi, JSCCR 2019, Int J Clin Oncol 2020 (PMID 31203527); Sarin 1992 (PMID 1446890); Hill 1996 (PMID 8934159); Siewert 1998 (PMID 9823902); Spigelman 1989 (PMID 2571019); Syngal, ACG 2015 (PMID 25645574); Rugge 2007 (PMID 17142647); Capelle 2010 (PMID 20381801); Dinis-Ribeiro, MAPS III 2025 (PMID 40112834); Oberhuber 1999 (PMID 10524652); Hawkins, ASCRS 2024 (PMID 38294832); Bismuth 1975 (PMID 1079096); Bismuth 1992 (PMID 1309988); Strasberg 1995 (PMID 8000648). Each links to https://pubmed.ncbi.nlm.nih.gov/PMID/ |
| Motility (B10) | [Yadlapati R et al. Chicago Classification v4.0. Neurogastroenterol Motil 2021 (PMID 33373111)](https://pubmed.ncbi.nlm.nih.gov/33373111/); [Eckardt VF et al. Gastroenterology 1992 (PMID 1451966)](https://pubmed.ncbi.nlm.nih.gov/1451966/); [Carrington EV et al. London classification. Neurogastroenterol Motil 2020 (PMID 31407463)](https://pubmed.ncbi.nlm.nih.gov/31407463/) |
| Hosting | [GitHub Pages availability](https://GitHub.com/apps/github-pages) |
| Claude Code on the web | [Claude Code docs: cloud sessions](https://code.claude.com/docs/en/web-quickstart.md) |

## Part B10: Motility

Category "Motility" (id: motility): the three calculators below, then the Lyon Consensus 2.0 (B6.8) and Bristol stool form (B6.7) cards.

### B10.1 Chicago Classification v4.0 (id: chicago)

Source: [Yadlapati R et al. Neurogastroenterol Motil 2021 (PMID 33373111)](https://pubmed.ncbi.nlm.nih.gov/33373111/). Inputs from the high-resolution manometry report.

| Input | Unit or options |
| --- | --- |
| Median IRP, supine | mmHg |
| Median IRP, upright | mmHg |
| IRP upper limit of normal, supine | mmHg; default 15 (Medtronic), editable for other systems |
| IRP upper limit of normal, upright | mmHg; default 12 (Medtronic), editable for other systems |
| Normal (intact) swallows | % of swallows |
| Failed swallows (DCI <100 mmHg·s·cm) | % of swallows |
| Weak swallows (DCI 100–450 mmHg·s·cm) | % of swallows |
| Fragmented swallows (break >5 cm, DCI >450 mmHg·s·cm) | % of swallows |
| Premature swallows (DL <4.5 s, DCI >450 mmHg·s·cm) | % of swallows |
| Hypercontractile swallows (DCI >8000 mmHg·s·cm) | % of swallows |
| Panesophageal pressurization | % of swallows |
| Supine swallows with elevated intrabolus pressure | % of supine swallows |
| Obstructive symptoms (dysphagia and/or non-cardiac chest pain) | tick box |
| Supportive test abnormal (timed barium esophagram or FLIP) | tick box |

Definitions: IRP "above the upper limit" means greater than the upper limit of normal. Ineffective swallows = failed + weak + fragmented. No normal peristalsis = normal (intact) swallows 0%; it is never inferred from the other percentages. Soft warning (the result is still shown): if normal + failed + weak + fragmented is more than 100%, show the note "Check the swallow percentages: normal, failed, weak and fragmented add up to more than 100%."

Rules, applied in this order; the first that applies gives the result.

| # | Condition | Band | Action or note |
| --- | --- | --- | --- |
| 1 | Supine IRP above the upper limit; failed 100%; panesophageal pressurization 20% or more | Achalasia type II |  |
| 2 | Supine IRP above the upper limit; failed 100%; panesophageal pressurization <20% | Achalasia type I |  |
| 3 | Supine IRP above the upper limit; normal (intact) swallows 0%; premature 20% or more | Achalasia type III |  |
| 4 | Supine and upright IRP above the upper limit; elevated intrabolus pressure in 20% or more of supine swallows; obstructive symptoms and an abnormal supportive test | EGJ outflow obstruction, clinically relevant |  |
| 5 | As rule 4, without obstructive symptoms or without an abnormal supportive test | EGJ outflow obstruction, inconclusive | "Inconclusive: obtain timed barium esophagram or FLIP, exclude mechanical obstruction and opioid effect." |
| 6 | Failed 100% (IRP not above the upper limit) | Absent contractility | "If IRP is near the upper limit or there is pressurization, consider achalasia type I; confirm with timed barium esophagram or FLIP." |
| 7 | Premature 20% or more, with obstructive symptoms | Distal esophageal spasm, clinically relevant |  |
| 8 | Premature 20% or more, without obstructive symptoms | Distal esophageal spasm pattern, inconclusive | "Clinically relevant only with obstructive symptoms." |
| 9 | Hypercontractile 20% or more, with obstructive symptoms | Hypercontractile esophagus, clinically relevant |  |
| 10 | Hypercontractile 20% or more, without obstructive symptoms | Hypercontractile esophagus pattern, inconclusive | "Clinically relevant only with obstructive symptoms." |
| 11 | Ineffective >70%, or failed 50% or more (failed exactly 50% is ineffective esophageal motility) | Ineffective esophageal motility |  |
| 12 | Ineffective 50–70% (inclusive), failed <50% | Ineffective esophageal motility, inconclusive | "Inconclusive: use supportive testing (contractile reserve on multiple rapid swallows, barium)." |
| 13 | None of the above | Normal esophageal motility |  |

When the supine IRP is above the upper limit but rules 1 to 5 do not apply, rules 6 to 13 are applied and the result shows the note "Supine IRP elevated but EGJOO criteria not met; if symptomatic, consider supportive testing (timed barium esophagram or FLIP)."

Always shown: Note: "Requires the Chicago Classification v4.0 protocol (supine and upright swallows, provocative tests)." Note: "Exclude mechanical obstruction." Note: "Study off opioids when possible."

Breakdown: supine and upright IRP against their upper limits, failed, ineffective, premature, hypercontractile, normal (intact) swallows, panesophageal pressurization, elevated intrabolus pressure, obstructive symptoms, supportive test.

### B10.2 Eckardt score (id: eckardt)

Source: [Eckardt VF et al. Gastroenterology 1992 (PMID 1451966)](https://pubmed.ncbi.nlm.nih.gov/1451966/).

| Item | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| Dysphagia | None | Occasional | Daily | Every meal |
| Regurgitation | None | Occasional | Daily | Every meal |
| Retrosternal pain | None | Occasional | Daily | Every meal |
| Weight loss | None | <5 kg | 5–10 kg | >10 kg |

Total 0–12. Stage 0: 0–1; stage I: 2–3; stage II: 4–6; stage III: >6. A second input, "Timing", is before treatment or after treatment. Before treatment the band is the stage. After treatment: total >3, band "Treatment failure (score >3)"; total 3 or less, band "Treatment success (score 3 or less)"; the stage is shown as well.

### B10.3 London classification of anorectal function (id: london)

Source: [Carrington EV et al. Neurogastroenterol Motil 2020 (PMID 31407463)](https://pubmed.ncbi.nlm.nih.gov/31407463/). Checklist; every input is judged against the laboratory's own normal values.

| Input | Options |
| --- | --- |
| Rectoanal inhibitory reflex (RAIR) | Present; absent |
| Resting pressure | Low; normal; high |
| Squeeze pressure | Low; normal |
| Balloon expulsion | Normal; abnormal |
| During push: dyssynergia | Yes; no |
| During push: poor propulsion | Yes; no |
| First constant sensation | Normal; above upper limit; below lower limit |
| Desire to defecate | Normal; above upper limit; below lower limit |
| Maximum tolerated volume | Normal; above upper limit; below lower limit |

| Part | Finding | Label |
| --- | --- | --- |
| 1 | RAIR absent: rectoanal areflexia | Major |
| 2 | Low resting and low squeeze pressure: combined anal hypotension and hypocontractility | Major |
| 2 | Low resting pressure, normal squeeze: anal hypotension with normal contractility | Major |
| 2 | Normal resting pressure, low squeeze: anal normotension with hypocontractility | Major |
| 2 | High resting pressure: anal hypertension | Minor |
| 2 | High resting pressure and low squeeze: shown as "Anal hypertension (minor) with low squeeze pressure: not a named London pattern; report both findings." | Minor |
| 3 | Abnormal expulsion with dyssynergia and poor propulsion: abnormal expulsion with dyssynergia and poor propulsion | Minor |
| 3 | Abnormal expulsion with dyssynergia: abnormal expulsion with dyssynergia | Minor |
| 3 | Abnormal expulsion with poor propulsion: abnormal expulsion with poor propulsion | Minor |
| 3 | Abnormal expulsion with a normal pattern: abnormal expulsion with a normal pushing pattern | Inconclusive |
| 3 | Normal expulsion with dyssynergia: normal expulsion with dyssynergia | Inconclusive |
| 3 | Normal expulsion with poor propulsion: normal expulsion with poor propulsion | Inconclusive |
| 3 | Normal expulsion with dyssynergia and poor propulsion: normal expulsion with poor propulsion and dyssynergia | Inconclusive |
| 4 | 2 or more thresholds above the upper limit: rectal hyposensitivity | Major |
| 4 | 1 threshold above the upper limit: borderline rectal hyposensitivity | Inconclusive (to be verified; the app shows "inconclusive" only) |
| 4 | 1 or more thresholds below the lower limit: rectal hypersensitivity | Major |

Each finding is shown with its label in brackets, for example "Rectoanal areflexia (major)"; a part with no finding shows "Normal". Hyposensitivity and hypersensitivity findings are both shown if both apply. Band: "Major disorder" if any finding is major, otherwise "Minor disorder" if any is minor, otherwise "Inconclusive" if any is inconclusive, otherwise "No disorder of anorectal function".
