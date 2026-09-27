const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');

const sat = require('../src/sat-vocabulary.js');
const { items: contextItems } = require('../data/sat-words-in-context.json');

const decks = sat.buildSatDecks(contextItems);
const byTerm = new Map(sat.SAT_WORDS.map((entry) => [entry.term, entry]));

test('SAT Prep has ten missions of ten signals each', () => {
  assert.equal(sat.SAT_MISSIONS.length, 10);
  assert.equal(decks.length, 10);
  for (const deck of decks) assert.equal(deck.questions.length, 10, `mission ${deck.mission.label}`);
});

test('core missions use all 80 curated words exactly once', () => {
  assert.equal(sat.SAT_WORDS.length, 80);
  const used = sat.SAT_MISSIONS.flatMap((mission) => mission.terms || []);
  assert.equal(used.length, 80);
  assert.equal(new Set(used).size, 80);
  for (const term of used) assert.ok(byTerm.has(term), `unknown term ${term}`);
});

test('Words in Context missions use 20 distinct target words from the study guides', () => {
  const ids = sat.SAT_MISSIONS.flatMap((mission) => mission.items || []);
  assert.equal(ids.length, 20);
  const targets = ids.map((id) => contextItems.find((item) => item.id === id).target);
  assert.equal(new Set(targets).size, 20);
});

test('every curated word has complete, usable data', () => {
  for (const entry of sat.SAT_WORDS) {
    assert.ok(['n', 'v', 'adj'].includes(entry.pos), `${entry.term} pos`);
    assert.ok(entry.families.length >= 1, `${entry.term} families`);
    assert.ok(entry.definition.length > 5, `${entry.term} definition`);
    assert.equal((entry.sentence.match(/___/g) || []).length, 1, `${entry.term} needs exactly one blank`);
    assert.ok(!entry.sentence.toLowerCase().includes(entry.term.toLowerCase()), `${entry.term} sentence gives away the answer`);
    assert.doesNotMatch(entry.sentence, /\b(a|an) ___/i, `${entry.term} sentence has an article that hints at the answer`);
  }
});

test('every question has four unique options and exactly one correct answer', () => {
  for (const deck of decks) {
    for (const question of deck.questions) {
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options.map((option) => option.value)).size, 4, `${deck.mission.label} ${question.answerTerm}`);
      assert.equal(question.options.filter((option) => option.correct).length, 1);
    }
  }
});

test('core distractors share part of speech and never share a meaning family with the answer', () => {
  for (const deck of decks.filter((item) => item.mission.type === 'core')) {
    for (const question of deck.questions) {
      const target = byTerm.get(question.answerTerm);
      const wrong = question.options.filter((option) => !option.correct).map((option) =>
        question.kind === 'reverse' ? sat.SAT_WORDS.find((entry) => entry.definition === option.value) : byTerm.get(option.value)
      );
      for (const distractor of wrong) {
        assert.ok(distractor, `unresolved distractor in ${question.answerTerm}`);
        assert.equal(distractor.pos, target.pos, `${question.answerTerm} vs ${distractor.term}`);
        assert.equal(sat.sharesFamily(distractor, target), false, `${question.answerTerm} vs ${distractor.term}`);
      }
    }
  }
});

test('core missions mix at least four question types', () => {
  for (const deck of decks.filter((item) => item.mission.type === 'core')) {
    const kinds = new Set(deck.questions.map((question) => question.kind));
    assert.ok(kinds.size >= 4, `mission ${deck.mission.label} only has ${[...kinds].join(', ')}`);
  }
});

test('the full source word bank contains 65 lessons of 25 words', () => {
  const rows = readFileSync(path.join(__dirname, '../data/sat-word-bank.tsv'), 'utf8').trim().split('\n').slice(1);
  assert.equal(rows.length, 1625);
  const words = rows.map((row) => row.split('\t')[2].toLowerCase());
  assert.equal(new Set(words).size, 1625);
  for (const entry of sat.SAT_WORDS) assert.ok(words.includes(entry.term), `${entry.term} missing from bank`);
  assert.equal(contextItems.length, 54);
});

test('SAT decks are deterministic', () => {
  const again = sat.buildSatDecks(contextItems);
  assert.deepEqual(again, decks);
});
