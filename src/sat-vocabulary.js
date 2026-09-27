(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.LexiconSat = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /*
   * SAT Prep word bank used by the game.
   *
   * Source: "SAT-PSAT Prep Materials - 2005 Archive" (Advanced Placement Strategies),
   * Voc Lessons 1-4 — the words that appeared most often on past SAT/PSAT tests.
   * Definitions are lightly edited for students. Example sentences, synonyms, and
   * antonyms were rewritten for classroom use.
   *
   * pos:      part of speech (n, v, adj). Distractors always share the target's pos.
   * families: meaning clusters. Two words that share a family are never used as
   *           answer and distractor in the same question, so every question has
   *           exactly one defensible answer.
   * sentence: uses ___ for the blank. The blank always takes the base form listed.
   * synonym / antonym: single-word prompts; null means that question type falls
   *           back to another type.
   */
  const SAT_WORDS = Object.freeze([
    // Lesson 1
    { lesson: 1, term: 'altruistic', pos: 'adj', families: ['generous', 'kind'], definition: 'Unselfishly concerned for the welfare of others.', sentence: 'The ___ volunteer spent every Saturday tutoring younger students for free.', synonym: 'selfless', antonym: 'selfish' },
    { lesson: 1, term: 'ambivalent', pos: 'adj', families: ['uncertain'], definition: 'Having mixed or contradictory feelings; uncertain which course to take.', sentence: 'Maya felt ___ about the move: excited for a new school but sad to leave her friends.', synonym: 'undecided', antonym: 'certain' },
    { lesson: 1, term: 'arrogant', pos: 'adj', families: ['proud'], definition: 'Overbearingly proud; acting superior to others.', sentence: 'The ___ quarterback refused to thank his linemen, claiming he had won the game alone.', synonym: 'haughty', antonym: 'modest' },
    { lesson: 1, term: 'aversion', pos: 'n', families: ['dislike'], definition: 'A strong feeling of dislike or unwillingness.', sentence: 'Because of his strong ___ to crowds, Leo shopped only when the mall was nearly empty.', synonym: 'dislike', antonym: 'fondness' },
    { lesson: 1, term: 'discern', pos: 'v', families: ['perceive'], definition: 'To perceive or recognize something; to tell things apart.', sentence: 'In the thick fog, the pilot could barely ___ the runway lights.', synonym: 'perceive', antonym: 'overlook' },
    { lesson: 1, term: 'disdain', pos: 'n', families: ['dislike'], definition: 'Intense dislike; scorn for something seen as unworthy.', sentence: 'The critic’s review dripped with ___, dismissing the film as a waste of time.', synonym: 'scorn', antonym: 'admiration' },
    { lesson: 1, term: 'disparage', pos: 'v', families: ['criticize'], definition: 'To speak of someone or something in a belittling way.', sentence: 'Good coaches never ___ their players in public, even after a tough loss.', synonym: 'belittle', antonym: 'praise' },
    { lesson: 1, term: 'disparity', pos: 'n', families: ['difference'], definition: 'Inequality; a noticeable difference in age, rank, or amount.', sentence: 'The report highlighted the ___ between the two schools’ budgets: one had twice as much money.', synonym: 'inequality', antonym: 'equality' },
    { lesson: 1, term: 'embellish', pos: 'v', families: ['decorate'], definition: 'To decorate; to add details that make something more attractive or exaggerated.', sentence: 'When Grandpa retells the fishing story, he likes to ___ it, and the fish gets bigger every time.', synonym: 'decorate', antonym: 'simplify' },
    { lesson: 1, term: 'engender', pos: 'v', families: ['cause'], definition: 'To cause, produce, or give rise to.', sentence: 'The principal hoped the new mentoring program would ___ trust between freshmen and seniors.', synonym: 'produce', antonym: 'prevent' },
    { lesson: 1, term: 'innocuous', pos: 'adj', families: ['harmless'], definition: 'Harmless; not likely to offend or injure.', sentence: 'The question seemed ___, but it started a heated argument.', synonym: 'harmless', antonym: 'dangerous' },
    { lesson: 1, term: 'lament', pos: 'v', families: ['sad'], definition: 'To mourn or express sorrow openly.', sentence: 'Longtime customers gathered to ___ the closing of the town’s only bookstore.', synonym: 'mourn', antonym: 'celebrate' },
    { lesson: 1, term: 'laud', pos: 'v', families: ['praise'], definition: 'To praise highly.', sentence: 'Critics were quick to ___ the young author’s first novel as a masterpiece.', synonym: 'praise', antonym: 'criticize' },
    { lesson: 1, term: 'obscure', pos: 'adj', families: ['unclear'], definition: 'Difficult to see or understand; vague.', sentence: 'The poem’s meaning was so ___ that the class needed three readings to understand it.', synonym: 'vague', antonym: 'clear' },
    { lesson: 1, term: 'ostentatious', pos: 'adj', families: ['proud', 'showy'], definition: 'Showy; designed to attract attention or impress others.', sentence: 'His ___ gold sneakers were designed to make sure everyone noticed him.', synonym: 'showy', antonym: 'understated' },
    { lesson: 1, term: 'prodigal', pos: 'adj', families: ['wasteful'], definition: 'Wastefully extravagant, especially with money.', sentence: 'The ___ heir spent his entire inheritance in a single year.', synonym: 'wasteful', antonym: 'thrifty' },
    { lesson: 1, term: 'repudiate', pos: 'v', families: ['reject', 'criticize'], definition: 'To reject, disown, or deny.', sentence: 'The senator was forced to ___ the false claims her campaign had spread.', synonym: 'reject', antonym: 'accept' },
    { lesson: 1, term: 'reticence', pos: 'n', families: ['quiet'], definition: 'Restraint in speech; reluctance to speak.', sentence: 'Jamal’s usual ___ disappeared once the debate turned to his favorite topic.', synonym: 'reserve', antonym: 'openness' },
    { lesson: 1, term: 'revere', pos: 'v', families: ['praise'], definition: 'To honor; to regard with deep respect.', sentence: 'Many musicians ___ Beethoven and study his symphonies for years.', synonym: 'honor', antonym: 'scorn' },
    { lesson: 1, term: 'serene', pos: 'adj', families: ['calm'], definition: 'Calm and peaceful.', sentence: 'The lake was perfectly ___ at dawn, without a single ripple.', synonym: 'calm', antonym: 'agitated' },
    { lesson: 1, term: 'subtle', pos: 'adj', families: ['unclear'], definition: 'Delicate or understated; not obvious.', sentence: 'The artist added ___ shading that most viewers noticed only on a second look.', synonym: 'understated', antonym: 'obvious' },
    { lesson: 1, term: 'superfluous', pos: 'adj', families: ['excess'], definition: 'Beyond what is needed; unnecessary.', sentence: 'The editor cut every ___ word until the essay was lean and clear.', synonym: 'unnecessary', antonym: 'essential' },
    { lesson: 1, term: 'taciturn', pos: 'adj', families: ['quiet'], definition: 'Habitually quiet; using very few words.', sentence: 'The ___ rancher answered every question with a single word or a nod.', synonym: 'tight-lipped', antonym: 'talkative' },
    // Lesson 2
    { lesson: 2, term: 'antithesis', pos: 'n', families: ['opposite'], definition: 'The direct opposite of something.', sentence: 'Her calm, patient style was the ___ of her predecessor’s loud impatience.', synonym: 'opposite', antonym: 'equivalent' },
    { lesson: 2, term: 'austere', pos: 'adj', families: ['strict'], definition: 'Strict or stern; plain and without decoration.', sentence: 'The monks lived in ___ rooms with only a bed, a desk, and a lamp.', synonym: 'severe', antonym: 'indulgent' },
    { lesson: 2, term: 'autonomous', pos: 'adj', families: ['independent'], definition: 'Independent; self-governing.', sentence: 'The student council became fully ___, planning events without needing teacher approval.', synonym: 'independent', antonym: 'dependent' },
    { lesson: 2, term: 'banal', pos: 'adj', families: ['dull'], definition: 'Dull and unoriginal; lacking freshness.', sentence: 'The speech was so ___ that the audience could predict every line.', synonym: 'trite', antonym: 'original' },
    { lesson: 2, term: 'benign', pos: 'adj', families: ['harmless', 'kind'], definition: 'Gentle and kind; not harmful.', sentence: 'The old dog’s ___ nature made him a perfect, patient playmate for the toddlers.', synonym: 'gentle', antonym: 'harmful' },
    { lesson: 2, term: 'capricious', pos: 'adj', families: ['changeable'], definition: 'Changing suddenly and unpredictably; fickle.', sentence: 'The ___ spring weather shifted from sunshine to hail within an hour.', synonym: 'fickle', antonym: 'steady' },
    { lesson: 2, term: 'defamation', pos: 'n', families: ['criticize'], definition: 'The act of damaging someone’s reputation with false statements.', sentence: 'The actor sued the magazine for ___ after it printed false stories about him.', synonym: 'slander', antonym: 'tribute' },
    { lesson: 2, term: 'esoteric', pos: 'adj', families: ['unclear'], definition: 'Understood only by a small group with special knowledge.', sentence: 'The lecture was full of ___ terms that only specialists could follow.', synonym: 'specialized', antonym: 'familiar' },
    { lesson: 2, term: 'exacerbate', pos: 'v', families: ['worsen'], definition: 'To make a problem or feeling worse.', sentence: 'Scratching a mosquito bite will only ___ the itching.', synonym: 'worsen', antonym: 'relieve' },
    { lesson: 2, term: 'fastidious', pos: 'adj', families: ['careful'], definition: 'Extremely careful about details; very demanding.', sentence: 'The ___ baker measured every ingredient to the exact gram.', synonym: 'meticulous', antonym: 'careless' },
    { lesson: 2, term: 'furtive', pos: 'adj', families: ['secret'], definition: 'Secret and sneaky; stealthy.', sentence: 'During the test, Sam cast ___ glances at the clock, hoping the teacher would not notice.', synonym: 'sneaky', antonym: 'honest' },
    { lesson: 2, term: 'gregarious', pos: 'adj', families: ['friendly'], definition: 'Sociable and outgoing.', sentence: 'Being ___, Ana made friends with everyone in her new homeroom by Friday.', synonym: 'sociable', antonym: 'shy' },
    { lesson: 2, term: 'hypocrite', pos: 'n', families: ['deceit'], definition: 'A person who claims beliefs or virtues that they do not practice.', sentence: 'Critics called the mayor, who banned plastic bags but used them at home, the town’s biggest ___.', synonym: 'pretender', antonym: null },
    { lesson: 2, term: 'innate', pos: 'adj', families: ['inborn'], definition: 'Existing from birth; inborn.', sentence: 'Some researchers argue that the ability to learn language is ___ in humans.', synonym: 'inborn', antonym: 'acquired' },
    { lesson: 2, term: 'lethargic', pos: 'adj', families: ['inactive'], definition: 'Sluggish and lacking energy.', sentence: 'After staying up all night, the students were ___ during first period.', synonym: 'sluggish', antonym: 'energetic' },
    { lesson: 2, term: 'melancholy', pos: 'n', families: ['sad'], definition: 'A deep, lasting sadness.', sentence: 'A feeling of ___ settled over the town after the factory closed.', synonym: 'sadness', antonym: 'joy' },
    { lesson: 2, term: 'prolific', pos: 'adj', families: ['productive'], definition: 'Highly productive.', sentence: 'The ___ novelist published three books in a single year.', synonym: 'productive', antonym: 'unproductive' },
    { lesson: 2, term: 'reprove', pos: 'v', families: ['criticize'], definition: 'To scold or correct someone, often gently.', sentence: 'The librarian had to ___ the students for talking loudly during the exam.', synonym: 'scold', antonym: 'praise' },
    // Lesson 3
    { lesson: 3, term: 'affable', pos: 'adj', families: ['friendly', 'kind'], definition: 'Friendly, courteous, and easy to talk to.', sentence: 'The ___ tour guide greeted every visitor with a warm smile and a friendly joke.', synonym: 'friendly', antonym: 'hostile' },
    { lesson: 3, term: 'audacity', pos: 'n', families: ['bold'], definition: 'Bold daring, sometimes to the point of rudeness.', sentence: 'Nobody could believe the ___ of the rookie who challenged the champion on live TV.', synonym: 'boldness', antonym: 'timidity' },
    { lesson: 3, term: 'contrite', pos: 'adj', families: ['sorry'], definition: 'Deeply sorry for having done something wrong.', sentence: 'Seeing how upset his sister was, the ___ boy apologized and replaced her broken headphones.', synonym: 'remorseful', antonym: 'unrepentant' },
    { lesson: 3, term: 'credulous', pos: 'adj', families: ['gullible'], definition: 'Too ready to believe things; gullible.', sentence: 'Only ___ readers would believe a website claiming that the moon is made of cheese.', synonym: 'gullible', antonym: 'skeptical' },
    { lesson: 3, term: 'didactic', pos: 'adj', families: ['learned'], definition: 'Intended to teach, especially to teach a moral lesson.', sentence: 'Aesop’s fables are ___, since each one ends with a lesson.', synonym: 'instructive', antonym: null },
    { lesson: 3, term: 'dormant', pos: 'adj', families: ['inactive'], definition: 'Inactive, as if asleep.', sentence: 'The volcano had been ___ for centuries before it rumbled back to life.', synonym: 'inactive', antonym: 'active' },
    { lesson: 3, term: 'enigmatic', pos: 'adj', families: ['unclear'], definition: 'Mysterious and puzzling.', sentence: 'The Mona Lisa’s ___ smile has puzzled viewers for centuries.', synonym: 'mysterious', antonym: 'straightforward' },
    { lesson: 3, term: 'erudite', pos: 'adj', families: ['learned'], definition: 'Showing great knowledge; scholarly.', sentence: 'The ___ professor could discuss ancient history, astronomy, and poetry with equal ease.', synonym: 'scholarly', antonym: 'ignorant' },
    { lesson: 3, term: 'immutable', pos: 'adj', families: ['unchanging'], definition: 'Unchanging; unable to be changed.', sentence: 'Some laws of physics, such as the speed of light, appear to be ___.', synonym: 'unchangeable', antonym: 'changeable' },
    { lesson: 3, term: 'incorrigible', pos: 'adj', families: ['unruly', 'unchanging'], definition: 'Unable to be reformed or corrected.', sentence: 'Despite detention after detention, the ___ prankster kept hiding the teacher’s markers.', synonym: null, antonym: null },
    { lesson: 3, term: 'loathe', pos: 'v', families: ['dislike'], definition: 'To hate intensely; to detest.', sentence: 'I ___ waking up early, so I set three alarms.', synonym: 'detest', antonym: 'adore' },
    { lesson: 3, term: 'mitigate', pos: 'v', families: ['ease', 'weaken'], definition: 'To make something less severe or painful.', sentence: 'Planting trees along the river helped ___ the damage from spring floods.', synonym: 'lessen', antonym: 'intensify' },
    { lesson: 3, term: 'nullify', pos: 'v', families: ['reject'], definition: 'To cancel; to make legally or officially invalid.', sentence: 'A single missing signature can ___ the entire application.', synonym: 'cancel', antonym: 'validate' },
    { lesson: 3, term: 'recant', pos: 'v', families: ['reject'], definition: 'To take back a statement or belief publicly.', sentence: 'After new evidence appeared, the witness decided to ___ her earlier statement.', synonym: 'retract', antonym: 'affirm' },
    { lesson: 3, term: 'servile', pos: 'adj', families: ['submissive'], definition: 'Overly eager to obey or please others.', sentence: 'The ___ assistant agreed with everything the boss said, even obvious mistakes.', synonym: 'submissive', antonym: 'domineering' },
    { lesson: 3, term: 'trepidation', pos: 'n', families: ['fear'], definition: 'Fear or nervous uncertainty about what may happen.', sentence: 'With great ___, Mia stepped onto the stage for her first solo.', synonym: 'fear', antonym: 'confidence' },
    { lesson: 3, term: 'vilify', pos: 'v', families: ['criticize'], definition: 'To speak or write about someone in an abusive, damaging way.', sentence: 'Online trolls tried to ___ the referee after the controversial call.', synonym: 'malign', antonym: 'praise' },
    // Lesson 4
    { lesson: 4, term: 'aesthetic', pos: 'adj', families: ['beauty'], definition: 'Relating to beauty or artistic taste.', sentence: 'The architect chose the curved windows for ___ reasons, not practical ones.', synonym: 'artistic', antonym: null },
    { lesson: 4, term: 'aloof', pos: 'adj', families: ['quiet'], definition: 'Emotionally distant; not friendly or involved.', sentence: 'The new student seemed ___ at first, but she was actually just shy.', synonym: 'distant', antonym: 'friendly' },
    { lesson: 4, term: 'archaic', pos: 'adj', families: ['old'], definition: 'Very old or old-fashioned; no longer in ordinary use.', sentence: 'Words like thou and thee sound ___ to modern readers.', synonym: 'outdated', antonym: 'modern' },
    { lesson: 4, term: 'assuage', pos: 'v', families: ['ease'], definition: 'To ease or soothe pain, grief, or worry.', sentence: 'A cup of cocoa helped ___ the disappointment of the canceled game.', synonym: 'soothe', antonym: 'aggravate' },
    { lesson: 4, term: 'belie', pos: 'v', families: ['contradict', 'reject'], definition: 'To give a false impression of; to contradict.', sentence: 'His calm voice seemed to ___ how nervous he really felt.', synonym: 'contradict', antonym: 'confirm' },
    { lesson: 4, term: 'contentious', pos: 'adj', families: ['conflict', 'stubborn'], definition: 'Likely to cause argument; quarrelsome.', sentence: 'The ___ debate over the school dress code lasted three hours.', synonym: 'quarrelsome', antonym: 'agreeable' },
    { lesson: 4, term: 'daunt', pos: 'v', families: ['fear'], definition: 'To discourage or intimidate.', sentence: 'The steep, rocky trail did not ___ the determined hikers.', synonym: 'intimidate', antonym: 'encourage' },
    { lesson: 4, term: 'debilitate', pos: 'v', families: ['weaken'], definition: 'To weaken severely.', sentence: 'A long illness can ___ even the strongest athlete.', synonym: 'weaken', antonym: 'strengthen' },
    { lesson: 4, term: 'discord', pos: 'n', families: ['conflict'], definition: 'Disagreement and conflict.', sentence: 'Constant ___ among the band members eventually broke up the group.', synonym: 'conflict', antonym: 'harmony' },
    { lesson: 4, term: 'dissemination', pos: 'n', families: ['spread'], definition: 'The act of spreading something widely, especially information.', sentence: 'The internet allows the rapid ___ of information around the world.', synonym: 'spreading', antonym: 'suppression' },
    { lesson: 4, term: 'dogmatic', pos: 'adj', families: ['stubborn'], definition: 'Insisting that one’s opinions are true without considering evidence.', sentence: 'The ___ debater refused to consider any evidence that challenged his view.', synonym: 'opinionated', antonym: 'open-minded' },
    { lesson: 4, term: 'duplicity', pos: 'n', families: ['deceit'], definition: 'Deceitfulness; double-dealing.', sentence: 'The spy’s ___ was revealed when agents found letters he had sent to both sides.', synonym: 'deceit', antonym: 'honesty' },
    { lesson: 4, term: 'egocentric', pos: 'adj', families: ['proud'], definition: 'Self-centered; thinking only of oneself.', sentence: 'The ___ singer talked only about herself during the entire interview.', synonym: 'self-centered', antonym: 'selfless' },
    { lesson: 4, term: 'euphemism', pos: 'n', families: ['language'], definition: 'A mild word or phrase used in place of one considered harsh or blunt.', sentence: 'Between jobs is the polite ___ many people use for being unemployed.', synonym: null, antonym: null },
    { lesson: 4, term: 'mundane', pos: 'adj', families: ['dull'], definition: 'Ordinary and commonplace.', sentence: 'After the excitement of the trip, returning to ___ chores felt dull.', synonym: 'ordinary', antonym: 'extraordinary' },
    { lesson: 4, term: 'ominous', pos: 'adj', families: ['danger'], definition: 'Threatening; suggesting that something bad will happen.', sentence: 'The ___ clouds on the horizon warned the sailors to head for shore.', synonym: 'threatening', antonym: 'reassuring' },
    { lesson: 4, term: 'petulance', pos: 'n', families: ['irritable'], definition: 'Childish irritability or bad temper.', sentence: 'The toddler’s ___ grew worse every time he was told no.', synonym: 'irritability', antonym: 'patience' },
    { lesson: 4, term: 'pompous', pos: 'adj', families: ['proud', 'showy'], definition: 'Self-important; showing an exaggerated sense of dignity.', sentence: 'The ___ speaker used big words just to sound important.', synonym: 'self-important', antonym: 'humble' },
    { lesson: 4, term: 'precocious', pos: 'adj', families: ['early'], definition: 'Developing certain abilities unusually early.', sentence: 'The ___ seven-year-old was already reading high school textbooks.', synonym: 'advanced', antonym: null },
    { lesson: 4, term: 'verbose', pos: 'adj', families: ['wordy'], definition: 'Using more words than needed; wordy.', sentence: 'Her ___ essay was twice as long as it needed to be and repeated the same point.', synonym: 'wordy', antonym: 'concise' },
    { lesson: 4, term: 'virulent', pos: 'adj', families: ['danger'], definition: 'Extremely harmful or poisonous; bitterly hostile.', sentence: 'Scientists raced to develop a vaccine against the ___ strain of flu.', synonym: 'poisonous', antonym: 'harmless' },
    { lesson: 4, term: 'volatile', pos: 'adj', families: ['changeable'], definition: 'Likely to change suddenly and unpredictably.', sentence: 'The stock market was ___ that week, rising and falling sharply every day.', synonym: 'unstable', antonym: 'stable' }
  ]);

  const CORE_ROUNDS = Object.freeze([
    'definition', 'sentence', 'synonym', 'definition', 'reverse',
    'sentence', 'antonym', 'definition', 'synonym', 'reverse'
  ]);

  const SAT_MISSIONS = Object.freeze([
    { key: 's01', label: '01', name: 'Catalyst', type: 'core', terms: ['altruistic', 'ambivalent', 'arrogant', 'aversion', 'discern', 'disdain', 'disparage', 'disparity', 'embellish', 'engender'] },
    { key: 's02', label: '02', name: 'Isotope', type: 'core', terms: ['innocuous', 'lament', 'laud', 'obscure', 'ostentatious', 'prodigal', 'repudiate', 'reticence', 'revere', 'serene'] },
    { key: 's03', label: '03', name: 'Photon', type: 'core', terms: ['subtle', 'superfluous', 'taciturn', 'antithesis', 'austere', 'autonomous', 'banal', 'benign', 'capricious', 'defamation'] },
    { key: 's04', label: '04', name: 'Quasar', type: 'core', terms: ['esoteric', 'exacerbate', 'fastidious', 'furtive', 'gregarious', 'hypocrite', 'innate', 'lethargic', 'melancholy', 'prolific'] },
    { key: 's05', label: '05', name: 'Plasma', type: 'core', terms: ['reprove', 'affable', 'audacity', 'contrite', 'credulous', 'didactic', 'dormant', 'enigmatic', 'erudite', 'immutable'] },
    { key: 's06', label: '06', name: 'Vector', type: 'core', terms: ['incorrigible', 'loathe', 'mitigate', 'nullify', 'recant', 'servile', 'trepidation', 'vilify', 'aesthetic', 'aloof'] },
    { key: 's07', label: '07', name: 'Nebula', type: 'core', terms: ['archaic', 'assuage', 'belie', 'contentious', 'daunt', 'debilitate', 'discord', 'dissemination', 'dogmatic', 'duplicity'] },
    { key: 's08', label: '08', name: 'Singularity', type: 'core', terms: ['egocentric', 'euphemism', 'mundane', 'ominous', 'petulance', 'pompous', 'precocious', 'verbose', 'virulent', 'volatile'] },
    { key: 's09', label: '09', name: 'Context Scan', type: 'context', items: ['T1-Q69', 'T1-Q75', 'T2-Q16', 'T2-Q21', 'T2-Q22', 'T2-Q28', 'T2-Q75', 'T2-Q81', 'T2-Q82', 'T3-Q70'] },
    { key: 's10', label: '10', name: 'Deep Scan', type: 'context', items: ['T1-Q21', 'T1-Q129', 'T1-Q124', 'T1-Q130', 'T2-Q27', 'T2-Q123', 'T3-Q15', 'T3-Q16', 'T3-Q21', 'T3-Q28'] }
  ]);

  function seededRandom(seed) {
    let state = seed >>> 0;
    return () => {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(items, random) {
    const copy = items.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function sharesFamily(a, b) {
    return a.families.some((family) => b.families.includes(family));
  }

  function pickDistractors(target, pool, random) {
    const candidates = pool.filter((entry) => entry !== target && entry.pos === target.pos && !sharesFamily(entry, target));
    if (candidates.length < 3) {
      throw new Error(`Not enough distractors for "${target.term}".`);
    }
    return shuffled(candidates, random).slice(0, 3);
  }

  function resolveKind(kind, entry) {
    if (kind === 'synonym' && !entry.synonym) return 'definition';
    if (kind === 'antonym' && !entry.antonym) return 'sentence';
    return kind;
  }

  const PROMPTS = {
    definition: (entry) => ({ instruction: 'Identify the SAT word that matches this definition', prompt: entry.definition }),
    sentence: (entry) => ({ instruction: 'Choose the word that best completes the sentence', prompt: entry.sentence.replace('___', '_______') }),
    synonym: (entry) => ({ instruction: 'Which SAT word is closest in meaning to…', prompt: entry.synonym, promptClass: 'prompt cue-prompt' }),
    antonym: (entry) => ({ instruction: 'Which SAT word means the OPPOSITE of…', prompt: entry.antonym, promptClass: 'prompt cue-prompt antonym-prompt' }),
    reverse: (entry) => ({ instruction: 'Overload round · Match the word to its definition', prompt: entry.term, promptClass: 'prompt term-prompt' })
  };

  function createCoreQuestion(entry, roundIndex, pool, random) {
    const kind = resolveKind(CORE_ROUNDS[roundIndex], entry);
    if (!entry.sentence.includes('___')) throw new Error(`Sentence for "${entry.term}" needs a ___ blank.`);
    const distractors = pickDistractors(entry, pool, random);
    const reverse = kind === 'reverse';
    const options = shuffled([entry, ...distractors].map((item) => ({
      value: reverse ? item.definition : item.term,
      correct: item === entry
    })), random);
    const text = PROMPTS[kind](entry);
    return {
      kind,
      overload: reverse,
      answerTerm: entry.term,
      detail: `SAT Prep · Lesson ${entry.lesson} · Most-tested words`,
      instruction: text.instruction,
      prompt: text.prompt,
      promptClass: text.promptClass || 'prompt',
      options
    };
  }

  function createContextQuestion(item) {
    return {
      kind: 'context',
      overload: false,
      answerTerm: item.target,
      detail: 'SAT Prep · Digital SAT · Words in Context',
      instruction: `As used in the text, what does “${item.target}” most nearly mean?`,
      prompt: item.passage,
      promptClass: 'prompt passage-prompt',
      options: item.choices.map((choice, index) => ({ value: choice, correct: index === item.answer }))
    };
  }

  function buildSatDecks(contextItems) {
    const byTerm = new Map(SAT_WORDS.map((entry) => [entry.term, entry]));
    const byId = new Map((contextItems || []).map((item) => [item.id, item]));
    return SAT_MISSIONS.map((mission, missionIndex) => {
      const random = seededRandom(52000 + missionIndex * 97);
      let questions;
      if (mission.type === 'core') {
        questions = mission.terms.map((term, roundIndex) => {
          const entry = byTerm.get(term);
          if (!entry) throw new Error(`Unknown SAT term "${term}" in mission ${mission.label}.`);
          return createCoreQuestion(entry, roundIndex, SAT_WORDS, random);
        });
      } else {
        questions = mission.items.map((id) => {
          const item = byId.get(id);
          if (!item) throw new Error(`Unknown Words in Context item "${id}" in mission ${mission.label}.`);
          return createContextQuestion(item);
        });
      }
      return { mission, questions };
    });
  }

  return Object.freeze({
    SAT_WORDS,
    SAT_MISSIONS,
    CORE_ROUNDS,
    seededRandom,
    sharesFamily,
    createCoreQuestion,
    createContextQuestion,
    buildSatDecks
  });
});
