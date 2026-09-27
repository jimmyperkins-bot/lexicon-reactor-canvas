# Elsinore Escape (Hamlet escape room)

A single-file JavaScript escape room for Canvas: 5 chambers (Acts I-V), each with 4 puzzles and a sealed door (25 puzzles, about 30-40 minutes).

- `src/content.js` is all puzzle content (quotes, answers, hints, explanations). Edit questions here.
- `src/game.html` is the game template. `src/checker.html` is the teacher certificate checker.
- `node build.mjs` writes `dist/elsinore-escape.html` (upload to Canvas and embed in the assignment) and `dist/elsinore-escape-checker.html` (teacher-only; keep the Canvas file locked).

Students finish with a certificate (name, date, time, mistakes, hints, code) that they paste into a Canvas text-entry assignment. Paste submissions into the checker to confirm the code matches. It is a deterrent, not a lock: a determined student who reads the page source could work around it.
