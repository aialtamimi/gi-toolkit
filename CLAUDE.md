# CLAUDE.md

Instructions for every Claude Code session working on GI Toolkit. SPEC.md is the specification; read it before making changes.

## Build Rules (SPEC.md section B1.2, copied word for word)

1. Clinical content comes only from SPEC.md. Never invent, round, simplify or "improve" a formula, point value, cutoff, dose, timing or interpretation. If something is ambiguous or looks wrong, do not guess: implement nothing for that item and list it in the pull request.
2. Every calculator screen shows: inputs with units, the result, the interpretation band, the suggested action exactly as written in the spec, a points breakdown, the reference with a link, and the footer "Decision support only. Verify with clinical judgment and local protocols."
3. Every calculator has unit tests built from section B8. All tests must pass before opening a pull request.
4. No patient data is stored or sent anywhere. No analytics, no trackers, no external fonts or scripts, no network calls at runtime. Only favorites, recent items, unit choices, theme and language are stored in localStorage.
5. Plain HTML, CSS and JavaScript ES modules. No framework, no npm dependencies, no build step. Tests run with Node's built-in test runner (`node --test`).
6. Use relative paths everywhere (the site lives under `/gi-toolkit/`). Add an empty `.nojekyll` file at the root.
7. Write drug names in full, never abbreviated (for example terlipressin, not TP).
8. Mobile first: works from 320 px wide, touch targets at least 44 px, readable in sunlight, usable one-handed.
9. Show the app version and "Last clinical review" date in the footer and About page. Record every change in CHANGELOG.md.
10. Keep SPEC.md as the single source of truth. When clinical content changes, update SPEC.md and its test in the same pull request.

## Project notes

- Run tests: `node --test` from the repository root (Node 22 or later).
- Calculator definitions live in `js/calculators/<category>/<id>.js` and are rendered by `js/engine.js`. Every `compute()` receives lab values already converted to the unit the original formula uses (see `js/units.js`).
- When adding or removing any app file, update the precache list in `sw.js` and bump `APP_VERSION` in `js/version.js` and `CACHE_VERSION` in `sw.js`. `tests/sw.test.js` checks that every app file is precached.
