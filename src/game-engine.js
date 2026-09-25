(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.LexiconEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VOCABULARY = Object.freeze([
    {
      course: 'English 3',
      term: 'Arguable Thesis',
      definition: 'A claim that requires a defense.',
      units: [2, 3]
    },
    {
      course: 'English 3',
      term: 'Bias',
      definition: 'Prejudice in favor of or against one thing, person, or group, usually in a way considered unfair.',
      units: [2]
    },
    {
      course: 'English 3',
      term: 'Citations',
      definition: 'References that identify the sources used in a piece of writing.',
      units: [1, 2]
    },
    {
      course: 'English 3',
      term: 'Claim',
      definition: 'A statement that persuades, argues, convinces, proves, or provocatively suggests something to a reader.',
      units: [2]
    },
    {
      course: 'English 3',
      term: 'Commentary',
      definition: 'An explanation of how selected evidence supports a thesis.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 3',
      term: 'Credibility',
      definition: 'The quality of being trusted and believed in.',
      units: [2]
    },
    {
      course: 'English 3',
      term: 'Economic Context',
      definition: 'How elements of the global, national, or local economy affect a text.',
      units: [2, 3]
    },
    {
      course: 'English 3',
      term: 'Explicit Meaning',
      definition: 'Meaning that is fully revealed or expressed without vagueness, implication, or ambiguity.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 3',
      term: 'Historical Context',
      definition: 'How a time period, place, and past events create, influence, or form the backdrop to a text.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 3',
      term: 'Implicit Meaning',
      definition: 'Meaning that is suggested or hidden rather than openly expressed.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 3',
      term: 'Plagiarism',
      definition: "The practice of taking someone else's work or ideas and passing them off as one's own.",
      units: [1, 2]
    },
    {
      course: 'English 3',
      term: 'Social Context',
      definition: 'How the politics, culture, and societal norms of a setting affect a text.',
      units: [2]
    },
    {
      course: 'English 3',
      term: 'Summary',
      definition: 'A short overview of the main points of a text.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 3',
      term: 'Paraphrase',
      definition: 'To express the meaning of written or spoken words using different words, especially for greater clarity.',
      units: [2]
    },
    {
      course: 'English 3',
      term: 'Satire',
      definition: 'The use of humor or sarcasm to criticize something or someone.',
      units: [4]
    },
    {
      course: 'English 3',
      term: 'Synthesis',
      definition: 'The combination of multiple ideas or sources into a coherent whole or new understanding.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 4',
      term: 'Complex Inference',
      definition: 'A conclusion reached from evidence and reasoning that goes beyond an obvious or surface-level understanding.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 4',
      term: 'Criticism',
      definition: 'The analysis and judgment of the merits and faults of a literary or artistic work.',
      units: [2, 3]
    },
    {
      course: 'English 4',
      term: 'Evaluative Response',
      definition: 'An informed and well-reasoned judgment about a subject based on criteria and evidence.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 4',
      term: 'Faulty Reasoning',
      definition: 'Reasoning in which a claim is not logically supported by relevant evidence or data.',
      units: [1, 2, 3]
    },
    {
      course: 'English 4',
      term: 'Formal and Informal Inquiry',
      definition: 'Formal inquiry follows a structured process toward a defined goal; informal inquiry has no set procedure.',
      units: [1, 2, 3]
    },
    {
      course: 'English 4',
      term: 'Multimodal Texts',
      definition: 'Texts combining two or more modes, such as written, spoken, visual, audio, gestural, or spatial meaning.',
      units: [2]
    },
    {
      course: 'English 4',
      term: 'Nuance',
      definition: 'A subtle difference or distinction in expression, meaning, or response.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 4',
      term: 'Pertinent Examples',
      definition: 'Examples that have clear, decisive relevance to the matter at hand.',
      units: [1, 2, 3, 4]
    },
    {
      course: 'English 4',
      term: 'Plagiarism',
      definition: "The practice of taking someone else's work or ideas and passing them off as one's own.",
      units: [1, 2, 3]
    },
    {
      course: 'English 4',
      term: 'Satire',
      definition: 'The use of humor or sarcasm to criticize something or someone.',
      units: [3]
    },
    {
      course: 'English 4',
      term: 'Sentence Fluency',
      definition: 'The way words and phrases sound together within a sentence and how groups of sentences flow when read.',
      units: [1]
    },
    {
      course: 'English 4',
      term: 'Synthesis',
      definition: 'The incorporation of different viewpoints and texts into one central, original argument.',
      units: [2]
    },
    {
      course: 'English 4',
      term: 'Style Guide',
      definition: 'A set of standard style requirements that improves communication by ensuring consistency across documents.',
      units: [1, 2, 3, 4]
    }
  ]);

  function filterVocabulary(entries, course, unit) {
    const normalizedUnit = String(unit || 'all').toLowerCase();
    return entries.filter((entry) => {
      const courseMatches = !course || course === 'all' || entry.course === course;
      const unitMatches = normalizedUnit === 'all' || entry.units.includes(Number(normalizedUnit));
      return courseMatches && unitMatches;
    });
  }

  function shuffled(items, rng) {
    const copy = items.slice();
    const random = typeof rng === 'function' ? rng : Math.random;
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function buildRoundDeck(pool, length, rng) {
    if (!Array.isArray(pool) || pool.length < 4) {
      throw new Error('At least four vocabulary entries are required to build a round deck.');
    }
    const requestedLength = Math.max(1, Number(length) || 1);
    const deck = [];
    while (deck.length < requestedLength) {
      let batch = shuffled(pool, rng);
      if (deck.length && batch.length > 1 && deck[deck.length - 1].term === batch[0].term) {
        batch = batch.slice(1).concat(batch[0]);
      }
      deck.push(...batch);
    }
    return deck.slice(0, requestedLength);
  }

  function createQuestion(pool, roundNumber, rng, suppliedTarget) {
    if (!Array.isArray(pool) || pool.length < 4) {
      throw new Error('At least four vocabulary entries are required to create a question.');
    }
    const random = typeof rng === 'function' ? rng : Math.random;
    const target = suppliedTarget || pool[Math.floor(random() * pool.length)];
    if (!target || !pool.includes(target)) {
      throw new Error('The target vocabulary entry must belong to the active pool.');
    }

    const overload = Number(roundNumber) % 5 === 0;
    const distractors = shuffled(pool.filter((entry) => entry !== target), random).slice(0, 3);
    const candidates = [target, ...distractors];
    const options = shuffled(candidates.map((entry) => ({
      value: overload ? entry.definition : entry.term,
      correct: entry === target,
      term: entry.term
    })), random);

    return {
      overload,
      target,
      prompt: overload ? target.term : target.definition,
      promptKind: overload ? 'term' : 'definition',
      options
    };
  }

  function scoreAnswer(state, correct, remainingMs, overload) {
    const current = {
      score: Number(state.score) || 0,
      streak: Number(state.streak) || 0,
      shield: Math.max(0, Number(state.shield) || 0)
    };
    if (!correct) {
      return {
        score: current.score,
        streak: 0,
        shield: Math.max(0, current.shield - 1),
        lastGain: 0
      };
    }

    const nextStreak = current.streak + 1;
    const timeBonus = Math.max(0, Math.floor((Number(remainingMs) || 0) / 1000)) * 10;
    const baseGain = 100 + timeBonus + nextStreak * 25;
    const lastGain = baseGain * (overload ? 2 : 1);
    return {
      score: current.score + lastGain,
      streak: nextStreak,
      shield: current.shield,
      lastGain
    };
  }

  return Object.freeze({
    VOCABULARY,
    filterVocabulary,
    buildRoundDeck,
    createQuestion,
    scoreAnswer
  });
});
