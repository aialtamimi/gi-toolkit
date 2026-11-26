# GI Toolkit

A GI calculator and emergency reference web app for gastroenterology clinicians, built as an offline-capable PWA (plain HTML, CSS and JavaScript; no dependencies, no build step). Installable on iPhone from Safari (Share, then Add to Home Screen).

- Specification and single source of clinical truth: [SPEC.md](SPEC.md)
- Build rules for every change: [CLAUDE.md](CLAUDE.md)
- Change history: [CHANGELOG.md](CHANGELOG.md)

English or Arabic interface (clinical content always stays in English), light, dark or device theme, and SI or conventional units, all in Settings.

Decision support only. Verify with clinical judgment and local protocols.

## Run tests

```bash
node --test
```

Requires Node 22 or later.

## Run locally

Serve the repository root with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/.
