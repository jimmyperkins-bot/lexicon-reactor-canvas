# Architecture

## Runtime model

The distributed game is intentionally a pure HTML and CSS document. It contains no `<script>` element.

State is represented with native form controls:

- radio buttons select English 3 or English 4;
- radio buttons select missions A through D;
- checkboxes track mission start, question progression, correct answers, and shield strikes;
- labels provide the clickable controls;
- CSS selectors, including `:checked` and `:has()`, reveal the correct question, feedback, shield state, win state, or loss state;
- native `type="reset"` buttons return the form to its initial state.

This design works in Canvas iframes that do not permit application JavaScript.

## Build-time code

Node.js is used only during development. `scripts/build-reactor.mjs` reads curriculum data and question-generation helpers from `src/game-engine.js`, creates eight mission decks, and writes one generated HTML file.

The generated build contains:

- two grade paths;
- four missions per grade;
- ten questions per mission;
- three shield states;
- eighty generated question cards;
- responsive and reduced-motion CSS;
- explicit stable-reactor and reactor-breach endings.

## Determinism

Mission rotation and distractor selection use seeded pseudo-random generators. The same source creates the same published game, which keeps testing and Canvas replacement predictable.

## Testing

`test/game-engine.test.js` validates the 29 curriculum entries and question generation.

`test/pure-html.test.mjs` performs two real builds:

1. a portable build using bundled relative assets;
2. a Canvas build using supplied Canvas-style asset URLs.

It then checks the no-JavaScript contract, grade controls, mission count, question count, asset routing, and both endings.

