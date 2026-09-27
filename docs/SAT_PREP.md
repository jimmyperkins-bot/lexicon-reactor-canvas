# SAT Prep path

SAT Prep is the third course on the start screen. It has ten missions of ten signals. Like the English paths, it is generated at build time and published as pure HTML and CSS, with no runtime JavaScript.

## Sources

| Source | What was taken | Where it lives |
| --- | --- | --- |
| *SAT-PSAT Prep Materials – 2005 Archive* (Advanced Placement Strategies), folder `04 - Critical Reading and Vocabulary Question Sets / Voc Lessons`, Lessons 1–65 | 1,625 words (65 lessons × 25), each with a definition. The lessons are ranked by how often each word appeared on past SAT/PSAT tests, so Lesson 1 holds the most frequently tested words. | `data/sat-word-bank.tsv` |
| *MNHS English Language Arts Study Guides*, Tests 1–3 (NorthBound SAT Adaptive SAT Prep), Craft and Structure: Words in Context | 54 Digital SAT Words in Context practice items, each with a passage, a target word, four choices, and the answer | `data/sat-words-in-context.json` |

Definitions in the bank are lightly edited for students. In the game data (`src/sat-vocabulary.js`), every example sentence, synonym, and antonym was rewritten for the classroom. Several of the 2005 example sentences were not appropriate for students.

## Mission map

| Mission | Name | Content |
| --- | --- | --- |
| 01 | Catalyst | Lesson 1 core words |
| 02 | Isotope | Lesson 1 core words |
| 03 | Photon | Lessons 1–2 core words |
| 04 | Quasar | Lesson 2 core words |
| 05 | Plasma | Lessons 2–3 core words |
| 06 | Vector | Lessons 3–4 core words |
| 07 | Nebula | Lesson 4 core words |
| 08 | Singularity | Lesson 4 core words |
| 09 | Context Scan | Digital SAT Words in Context: common words with multiple meanings |
| 10 | Deep Scan | Digital SAT Words in Context: harder academic meanings |

Missions 01–08 use 80 of the 100 words in Lessons 1–4. The other 20 were left out because they were very easy (*ascend*, *exotic*, *symmetry*, *fuse*, *dawdle*, *trivia*, *prologue*), because a nearly identical word was already in the set (*extol*/*laud*, *venerate*/*revere*, *tranquil*/*serene*, *abstruse*/*obscure*, *pretentious*/*pompous*, *deprecate*/*disparage*, *slothful*/*lethargic*, *insipid*/*banal*, *opaque*, which is also a Words in Context item), or because their definitions were weak (*angular*, *gluttonous*, *pacifistic*, *depravity*). All of them remain in `data/sat-word-bank.tsv`.

## Question types (core missions)

Every core mission follows this ten-round pattern:

1. Definition → word
2. Fill in the blank
3. Synonym → word
4. Definition → word
5. **Overload:** word → definition
6. Fill in the blank
7. Antonym → word
8. Definition → word
9. Synonym → word
10. **Overload:** word → definition

If a word has no synonym, its synonym round becomes a definition round. If it has no antonym, its antonym round becomes a fill-in-the-blank round.

Wrong answers are drawn from all 80 core words and must:

- share the answer's part of speech (`pos`), so grammar never gives the answer away; and
- share none of the answer's meaning `families`, so no question has two defensible answers.

## Word data format

```js
{
  lesson: 1,
  term: 'laud',
  pos: 'v',                     // n, v, or adj
  families: ['praise'],         // meaning clusters used to keep distractors fair
  definition: 'To praise highly.',
  sentence: 'Critics were quick to ___ the young author’s first novel as a masterpiece.',
  synonym: 'praise',            // or null
  antonym: 'criticize'          // or null
}
```

Rules checked by `npm test`:

- A sentence has exactly one `___`, does not contain the answer, and never puts *a* or *an* right before the blank.
- The blank must fit the base form of the word.

## Adding more SAT missions

1. Pick words from `data/sat-word-bank.tsv`. Lessons 5–15 are the next most frequently tested.
2. Add entries to `SAT_WORDS` in `src/sat-vocabulary.js` using the format above. Give words with overlapping meanings a shared family.
3. Add a mission to `SAT_MISSIONS`, with `type: 'core'` and ten `terms`, or with `type: 'context'` and ten Words in Context `items` IDs from `data/sat-words-in-context.json` (34 items are still unused).
4. Run `npm run build` and `npm test`.

The start screen, CSS state rules, and tests pick up new missions automatically. With more than ten SAT missions, adjust the `.missions-sat` grid columns in `scripts/build-reactor.mjs` and the ten-mission assertions in the tests.
