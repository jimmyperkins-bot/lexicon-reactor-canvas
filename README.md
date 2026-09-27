# Lexicon Reactor

![Lexicon Reactor icon](assets/icons/lexicon-reactor-icon.png)

Lexicon Reactor is a vocabulary mission game for English 3, English 4, and SAT Prep. The published game runs as pure HTML and CSS inside a Canvas LMS iframe—there is no runtime JavaScript, framework, CDN, or external font dependency.

Students choose a course and a ten-signal mission (four missions each for English 3 and English 4, ten for SAT Prep). They stabilize the reactor by answering all ten signals before three incorrect answers breach the shields.

## Included

- `dist/lexicon-reactor.html` — ready-to-preview portable build
- `src/game-engine.js` — 29 curriculum terms and deterministic question generation
- `src/sat-vocabulary.js` — 80 curated SAT words, the ten SAT missions, and the mixed-question generator
- `data/sat-word-bank.tsv` — the full 1,625-word SAT bank (65 lessons × 25 words) for future missions
- `data/sat-words-in-context.json` — 54 Digital SAT Words in Context practice items
- `scripts/build-reactor.mjs` — build-time generator for the pure-HTML game
- `assets/` — chamber background, reactor artwork, and Canvas homepage icons
- `test/` — vocabulary-engine and published-output contract tests
- `docs/CANVAS_INSTALL.md` — complete Canvas installation instructions
- `docs/CUSTOMIZATION.md` — vocabulary, mission, style, and asset customization
- `docs/ARCHITECTURE.md` — explanation of the no-JavaScript runtime design
- `docs/SAT_PREP.md` — SAT Prep sources, mission map, and how to add more SAT missions

## Game design

- English 3: 16 curriculum terms
- English 4: 13 curriculum terms
- Four missions per English course; ten SAT Prep missions
- SAT Prep: 80 most-tested SAT words (Missions 01–08) plus 20 Digital SAT Words in Context passages (Missions 09–10)
- SAT question types rotate: definition → word, fill in the blank, synonym, antonym, and word → definition
- Ten signals per mission
- Three shields per attempt
- A clear win state and a clear reactor-breach loss state
- Responsive layout, visible focus styles, reduced-motion support, and labeled controls

The four missions rotate across the complete vocabulary pool for each grade. The build is deterministic, so rebuilding the same source produces the same mission decks.

## Quick start

Node.js 20 or newer is only required to rebuild or test the project.

```bash
npm run build
npm test
```

Open `dist/lexicon-reactor.html` to preview the portable build. For Canvas, follow [the Canvas installation guide](docs/CANVAS_INSTALL.md); Canvas-hosted download URLs must be supplied for the two artwork files.

## Build a Canvas version

```bash
npm run build:canvas -- \
  --chamber-url "https://canvas.example/courses/123/files/456/download" \
  --reactor-url "https://canvas.example/courses/123/files/789/download"
```

This creates `dist/lexicon-reactor.canvas.html`, which remains pure HTML and CSS at runtime.

## Repository status

This repository is intended to remain private. No open-source license has been selected.

