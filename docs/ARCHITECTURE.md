# Architecture

## Runtime model

The distributed game is intentionally a pure HTML and CSS document. It contains no `<script>` element.

State is represented with native form controls:

- radio buttons select English 3, English 4, or SAT Prep;
- radio buttons select missions A through D (English) or 01 through 10 (SAT Prep); each course shows only its own mission row;
- checkboxes track mission start, question progression, correct answers, and shield strikes;
- labels provide the clickable controls;
- CSS selectors, including `:checked` and `:has()`, reveal the correct question, feedback, shield state, win state, or loss state;
- native `type="reset"` buttons return the form to its initial state.

This design works in Canvas iframes that do not permit application JavaScript.

## Build-time code

Node.js is used only during development. `scripts/build-reactor.mjs` reads English curriculum data from `src/game-engine.js` and SAT data from `src/sat-vocabulary.js` and `data/sat-words-in-context.json`, creates eighteen mission decks, and writes one generated HTML file.

The generated build contains:

- three course paths (English 3, English 4, SAT Prep);
- four missions per English course and ten SAT Prep missions;
- ten questions per mission;
- three shield states;
- 180 generated question cards;
- responsive and reduced-motion CSS;
- explicit stable-reactor and reactor-breach endings.

## Determinism

Mission rotation and distractor selection use seeded pseudo-random generators. The same source creates the same published game, which keeps testing and Canvas replacement predictable.

## Testing

`test/game-engine.test.js` validates the 29 curriculum entries and question generation.

`test/sat-vocabulary.test.js` validates the SAT word data, the ten SAT missions, that every question has exactly one correct answer, and that distractors share the answer's part of speech but never its meaning family.

`test/pure-html.test.mjs` performs two real builds:

1. a portable build using bundled relative assets;
2. a Canvas build using supplied Canvas-style asset URLs.

It then checks the no-JavaScript contract, grade controls, mission count, question count, asset routing, and both endings.

