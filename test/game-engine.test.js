const test = require('node:test');
const assert = require('node:assert/strict');

const engine = require('../src/game-engine.js');

test('contains the 29 curriculum vocabulary entries from English 3 and English 4', () => {
  assert.equal(engine.VOCABULARY.length, 29);
  assert.equal(engine.VOCABULARY.filter((entry) => entry.course === 'English 3').length, 16);
  assert.equal(engine.VOCABULARY.filter((entry) => entry.course === 'English 4').length, 13);
});

test('filters terms by course and unit', () => {
  const result = engine.filterVocabulary(engine.VOCABULARY, 'English 3', '2');

  assert.ok(result.length >= 4);
  assert.ok(result.every((entry) => entry.course === 'English 3'));
  assert.ok(result.every((entry) => entry.units.includes(2)));
});

test('unit all keeps every term in the selected course', () => {
  const result = engine.filterVocabulary(engine.VOCABULARY, 'English 4', 'all');

  assert.equal(result.length, 13);
});

test('builds a round deck without repeats before the pool is exhausted', () => {
  const pool = engine.filterVocabulary(engine.VOCABULARY, 'English 4', '1');
  const deck = engine.buildRoundDeck(pool, Math.min(8, pool.length), () => 0.42);

  assert.equal(deck.length, Math.min(8, pool.length));
  assert.equal(new Set(deck.map((entry) => entry.term)).size, deck.length);
});

test('creates four unique term options containing the correct answer', () => {
  const pool = engine.filterVocabulary(engine.VOCABULARY, 'English 4', '1');
  const target = pool.find((entry) => entry.term === 'Nuance');
  const question = engine.createQuestion(pool, 1, () => 0.25, target);

  assert.equal(question.overload, false);
  assert.equal(question.prompt, target.definition);
  assert.equal(question.options.length, 4);
  assert.equal(new Set(question.options.map((option) => option.value)).size, 4);
  assert.equal(question.options.filter((option) => option.correct).length, 1);
  assert.equal(question.options.find((option) => option.correct).value, 'Nuance');
});

test('every fifth round reverses the prompt for overload mode', () => {
  const pool = engine.filterVocabulary(engine.VOCABULARY, 'English 3', '2');
  const target = pool[0];
  const question = engine.createQuestion(pool, 5, () => 0.6, target);

  assert.equal(question.overload, true);
  assert.equal(question.prompt, target.term);
  assert.equal(question.options.find((option) => option.correct).value, target.definition);
});

test('scores correct answers from time, streak, and overload without mutating state', () => {
  const initial = { score: 200, streak: 2, shield: 3 };
  const normal = engine.scoreAnswer(initial, true, 9000, false);
  const overload = engine.scoreAnswer(initial, true, 9000, true);

  assert.deepEqual(initial, { score: 200, streak: 2, shield: 3 });
  assert.equal(normal.streak, 3);
  assert.equal(normal.shield, 3);
  assert.ok(normal.score > initial.score);
  assert.equal(overload.score - initial.score, (normal.score - initial.score) * 2);
});

test('wrong answers reset the streak and remove one shield', () => {
  const result = engine.scoreAnswer({ score: 500, streak: 4, shield: 2 }, false, 1000, false);

  assert.deepEqual(result, { score: 500, streak: 0, shield: 1, lastGain: 0 });
});
