import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { VOCABULARY, createQuestion } = require('../src/game-engine.js');
const { SAT_MISSIONS, buildSatDecks } = require('../src/sat-vocabulary.js');
const { items: WORDS_IN_CONTEXT } = require('../data/sat-words-in-context.json');

const { values } = parseArgs({
  options: {
    output: { type: 'string' },
    'chamber-url': { type: 'string' },
    'reactor-url': { type: 'string' }
  }
});

const OUTPUT = values.output || fileURLToPath(new URL('../dist/lexicon-reactor.html', import.meta.url));
const CHAMBER_URL = values['chamber-url'] || '../assets/reactor-chamber.png';
const REACTOR_URL = values['reactor-url'] || '../assets/reactor-device.png';
const MISSIONS = [
  { key: 'a', label: 'A', name: 'Ignition' },
  { key: 'b', label: 'B', name: 'Pulse' },
  { key: 'c', label: 'C', name: 'Flux' },
  { key: 'd', label: 'D', name: 'Nova' }
];
const COURSES = [
  { grade: '3', name: 'English 3', note: 'American Literature', missions: MISSIONS },
  { grade: '4', name: 'English 4', note: 'British Literature', missions: MISSIONS },
  { grade: 'sat', name: 'SAT Prep', note: '10 missions', missions: SAT_MISSIONS }
];

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

function shuffle(items, random) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildDecks(grade) {
  const course = `English ${grade}`;
  const pool = VOCABULARY.filter((entry) => entry.course === course);
  const random = seededRandom(7900 + Number(grade));
  const ring = shuffle(pool, random);
  const offsets = grade === '3' ? [0, 10, 4, 14] : [0, 10, 7, 4];

  return MISSIONS.map((mission, missionIndex) => {
    const entries = Array.from({ length: 10 }, (_, index) => ring[(offsets[missionIndex] + index) % ring.length]);
    const questionRandom = seededRandom(38000 + Number(grade) * 100 + missionIndex);
    const questions = entries.map((entry, index) => {
      const question = createQuestion(pool, index + 1, questionRandom, entry);
      return {
        overload: question.overload,
        answerTerm: question.target.term,
        detail: `${course} · ${question.target.units.map((unit) => `Unit ${unit}`).join(' · ')}`,
        instruction: question.overload ? 'Match the term to its exact definition' : 'Identify the vocabulary term',
        prompt: question.prompt,
        promptClass: question.overload ? 'prompt term-prompt' : 'prompt',
        feedback: `${question.target.term} is correct.`,
        options: question.options
      };
    });
    return { grade, course, mission, id: `e${grade}-${mission.key}`, questions };
  });
}

function buildSatPath() {
  return buildSatDecks(WORDS_IN_CONTEXT).map(({ mission, questions }) => ({
    grade: 'sat',
    course: 'SAT Prep',
    mission,
    id: `sat-${mission.label}`,
    questions: questions.map((question) => ({
      ...question,
      feedback: question.kind === 'context'
        ? `“${question.answerTerm}” means ${question.options.find((option) => option.correct).value}.`
        : `${question.answerTerm} is correct.`
    }))
  }));
}

const decks = [...buildDecks('3'), ...buildDecks('4'), ...buildSatPath()];
const ALL_MISSIONS = [...MISSIONS, ...SAT_MISSIONS];

function stateInputs(deck) {
  const steps = Array.from({ length: 9 }, (_, index) =>
    `    <input class="state-control deck-step" id="${deck.id}-step-${index + 2}" type="checkbox">`
  ).join('\n');
  const strikes = [1, 2, 3].map((strike) =>
    `    <input id="${deck.id}-strike-${strike}" class="state-control deck-strike deck-strike-${strike}" type="checkbox" aria-label="Reactor hit ${strike}">`
  ).join('\n');
  return `    <input class="state-control deck-start" id="start-${deck.id}" type="checkbox">\n${strikes}\n${steps}\n    <input class="state-control deck-complete" id="${deck.id}-complete" type="checkbox">`;
}

function deckStateCss(deck) {
  const lines = [
    `#grade-${deck.grade}:checked ~ #mission-${deck.mission.key}:checked ~ #start-${deck.id}:checked ~ .game-shell #deck-${deck.id} { display: block; }`,
    `#start-${deck.id}:checked ~ .game-shell #${deck.id}-q1 { display: block; }`
  ];
  for (let round = 2; round <= 10; round += 1) {
    lines.push(`#${deck.id}-step-${round}:checked ~ .game-shell #${deck.id}-q${round - 1} { display: none !important; }`);
    lines.push(`#${deck.id}-step-${round}:checked ~ .game-shell #${deck.id}-q${round} { display: block; }`);
  }
  lines.push(`#${deck.id}-complete:checked ~ .game-shell #${deck.id}-q10 { display: none !important; }`);
  return lines.join('\n    ');
}

function answerMarkup(deck, question, questionIndex) {
  const letters = ['A', 'B', 'C', 'D'];
  return question.options.map((option, optionIndex) => {
    if (option.correct) {
      return `              <label class="answer correct-answer"><input class="answer-choice correct" id="${deck.id}-q${questionIndex + 1}-correct" type="checkbox"><span class="key">${letters[optionIndex]}</span><span>${escapeHtml(option.value)}</span></label>`;
    }
    return [1, 2, 3].map((strike) =>
      `              <label class="answer wrong-hit hit-${strike}" for="${deck.id}-strike-${strike}" role="button" tabindex="0"><span class="key">${letters[optionIndex]}</span><span>${escapeHtml(option.value)}</span></label>`
    ).join('\n');
  }).join('\n');
}

function questionMarkup(deck, question, questionIndex) {
  const round = questionIndex + 1;
  const nextId = round === 10 ? `${deck.id}-complete` : `${deck.id}-step-${round + 1}`;
  return `          <fieldset class="question-card" data-deck="${deck.id}" data-grade="${deck.grade}" data-term="${escapeHtml(question.answerTerm)}" id="${deck.id}-q${round}">
            <legend class="state-control">Round ${round}</legend>
            <div class="card-top"><span class="signal">Signal ${String(round).padStart(2, '0')}</span><span class="round">Round ${round} / 10</span></div>
            <div class="progress-track" aria-hidden="true"><span style="width:${round * 10}%"></span></div>
            <p class="unit-line">${escapeHtml(question.detail)}</p>
            <p class="instruction">${escapeHtml(question.instruction)}</p>
            <p class="${question.promptClass}">${escapeHtml(question.prompt)}</p>
            <div class="answer-list">
${answerMarkup(deck, question, questionIndex)}
            </div>
            <p class="damage-readout damage-one"><strong>Reactor hit!</strong> Two shields remain. Re-read the signal and try again.</p>
            <p class="damage-readout damage-two"><strong>Critical damage!</strong> One shield remains. The next miss ends the mission.</p>
            <div class="feedback correct-feedback"><span><strong>Signal locked.</strong> ${escapeHtml(question.feedback)}</span><label class="next-control" for="${nextId}" tabindex="0">${round === 10 ? 'Stabilize Core' : 'Next Signal'} <span aria-hidden="true">→</span></label></div>
          </fieldset>`;
}

function deckMarkup(deck) {
  return `        <section class="mission-deck" data-grade="${deck.grade}" data-mission="${deck.mission.label}" id="deck-${deck.id}">
          <div class="deck-heading"><span>${deck.course}</span><strong>Mission ${deck.mission.label}: ${deck.mission.name}</strong></div>
${deck.questions.map((question, index) => questionMarkup(deck, question, index)).join('\n')}
        </section>`;
}

const cssStateRules = decks.map(deckStateCss).join('\n    ');

// Selector highlighting, per-course mission rows, and the "pick a mission" hint.
const selectedLabelRules = [
  ...COURSES.map((course) => `#grade-${course.grade}:checked ~ .game-shell label[for="grade-${course.grade}"]`),
  ...ALL_MISSIONS.map((mission) => `#mission-${mission.key}:checked ~ .game-shell label[for="mission-${mission.key}"]`)
];
const missionRowRules = COURSES.map((course) => `#grade-${course.grade}:checked ~ .game-shell .missions-${course.grade}`).join(',\n    ');
const hideHintRules = decks.map((deck) => `#grade-${deck.grade}:checked ~ #mission-${deck.mission.key}:checked ~ .game-shell .pick-hint`).join(',\n    ');

function missionRow(course) {
  const rowClass = course.grade === 'sat' ? 'selector-row missions missions-sat' : `selector-row missions missions-${course.grade}`;
  return `            <div class="${rowClass}" aria-label="${course.name} missions">
${course.missions.map((mission) => `              <label class="selector" for="mission-${mission.key}" tabindex="0">${mission.label}<small>${mission.name}</small></label>`).join('\n')}
            </div>`;
}
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#020817">
  <title>Lexicon Reactor — English 3, English 4 &amp; SAT Prep Vocabulary</title>
  <style>
    :root {
      color-scheme: dark;
      --ink: #f5fbff;
      --muted: #a9c1d4;
      --cyan: #25e6ff;
      --cyan-soft: #8bf3ff;
      --gold: #ffd34d;
      --pink: #ff4bd8;
      --green: #59f4ad;
      --red: #ff6282;
      --panel: rgba(3, 14, 31, 0.88);
      --line: rgba(64, 220, 255, 0.38);
      --display: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
      --body: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    html, body { min-width: 320px; min-height: 100%; margin: 0; background: #020817; }
    body {
      min-height: 100svh;
      color: var(--ink);
      font-family: var(--body);
      background-color: #020817;
      background-image: linear-gradient(rgba(1, 8, 22, 0.54), rgba(1, 8, 22, 0.82)), url("${CHAMBER_URL}");
      background-position: center;
      background-size: cover;
      background-attachment: fixed;
    }
    button, input, label { font: inherit; }
    .state-control, .answer-choice {
      position: absolute;
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      white-space: nowrap;
    }
    .game-shell {
      position: relative;
      isolation: isolate;
      width: min(1220px, calc(100% - 24px));
      min-height: min(930px, calc(100svh - 24px));
      margin: 12px auto;
      overflow: hidden;
      border: 1px solid rgba(62, 224, 255, 0.58);
      border-radius: 24px;
      background: linear-gradient(145deg, rgba(3, 15, 35, 0.78), rgba(1, 7, 20, 0.91));
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.62), inset 0 0 90px rgba(40, 220, 255, 0.05);
    }
    .game-shell::before {
      content: "";
      position: absolute;
      z-index: -1;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(circle at 25% 50%, rgba(37, 230, 255, 0.12), transparent 30%), linear-gradient(115deg, transparent 0 49%, rgba(37, 230, 255, 0.04) 50%, transparent 51%);
    }
    .topbar {
      position: relative;
      z-index: 4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      min-height: 82px;
      padding: 14px 22px;
      border-bottom: 1px solid var(--line);
      background: rgba(1, 8, 22, 0.84);
      backdrop-filter: blur(12px);
    }
    .brand h1 {
      margin: 0;
      font-family: var(--display);
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-style: italic;
      font-weight: 900;
      letter-spacing: 0.055em;
      line-height: 0.88;
      text-transform: uppercase;
      text-shadow: 0 0 24px rgba(37, 230, 255, 0.45);
    }
    .brand p { margin: 7px 0 0; color: var(--cyan); font-size: 0.72rem; font-weight: 850; letter-spacing: 0.17em; text-transform: uppercase; }
    .reset-button {
      flex: 0 0 auto;
      min-height: 43px;
      padding: 9px 15px;
      color: var(--ink);
      border: 1px solid rgba(37, 230, 255, 0.58);
      border-radius: 9px 15px 9px 15px;
      background: rgba(7, 34, 64, 0.92);
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      cursor: pointer;
    }
    .reset-button:hover, .reset-button:focus-visible { color: #02131d; background: var(--cyan); outline: 3px solid rgba(37, 230, 255, 0.22); outline-offset: 3px; }
    .mission-layout {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.5fr);
      gap: clamp(18px, 3vw, 42px);
      align-items: center;
      min-height: 790px;
      padding: clamp(22px, 4vw, 52px);
    }
    .reactor-panel { display: grid; justify-items: center; gap: 20px; min-width: 0; text-align: center; }
    .reactor-frame { position: relative; display: grid; width: clamp(230px, 30vw, 390px); aspect-ratio: 1; place-items: center; }
    .reactor-frame::before, .reactor-frame::after { content: ""; position: absolute; border-radius: 50%; pointer-events: none; }
    .reactor-frame::before { inset: 5%; border: 1px solid rgba(37, 230, 255, 0.72); border-top-color: var(--pink); box-shadow: 0 0 35px rgba(37, 230, 255, 0.25); animation: spin 19s linear infinite; }
    .reactor-frame::after { inset: 14%; border: 1px dashed rgba(255, 211, 77, 0.65); animation: spin 13s linear infinite reverse; }
    .reactor-art { position: relative; z-index: 2; display: block; width: 116%; max-width: none; height: auto; filter: drop-shadow(0 0 26px rgba(37, 230, 255, 0.45)) drop-shadow(0 18px 24px rgba(0, 0, 0, 0.48)); animation: breathe 3.2s ease-in-out infinite; }
    .reactor-copy strong { display: block; color: var(--cyan); font-family: var(--display); font-size: 1.25rem; letter-spacing: 0.15em; text-transform: uppercase; text-shadow: 0 0 16px rgba(37, 230, 255, 0.42); }
    .reactor-copy span { display: block; max-width: 34ch; margin-top: 7px; color: #bdd1df; font-size: 0.84rem; line-height: 1.5; }
    .shield-hud { width: min(335px, 100%); padding: 12px 14px; border: 1px solid rgba(37, 230, 255, 0.34); border-radius: 9px 16px 9px 16px; background: rgba(2, 14, 31, 0.78); }
    .shield-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: var(--muted); font-size: 0.67rem; font-weight: 900; letter-spacing: 0.11em; text-transform: uppercase; }
    .shield-readout { color: var(--cyan); }
    .shield-readout span { display: none; }
    .shield-readout .shield-three { display: inline; }
    .shield-cells { display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px; margin-top: 9px; }
    .shield-cell { position: relative; height: 13px; overflow: hidden; border: 1px solid rgba(37, 230, 255, 0.75); border-radius: 99px; background: linear-gradient(90deg, var(--cyan), #8bf3ff); box-shadow: 0 0 12px rgba(37, 230, 255, 0.42); transition: 180ms ease; }
    #mission-form:has(.deck-strike-1:checked) .shield-cell:nth-child(3),
    #mission-form:has(.deck-strike-2:checked) .shield-cell:nth-child(2),
    #mission-form:has(.deck-strike-3:checked) .shield-cell:nth-child(1) { border-color: rgba(255, 98, 130, 0.42); background: rgba(255, 98, 130, 0.12); box-shadow: none; }
    #mission-form:has(.deck-strike-1:checked) .shield-readout span { display: none; }
    #mission-form:has(.deck-strike-1:checked):not(:has(.deck-strike-2:checked)) .shield-readout .shield-two { display: inline; color: var(--gold); }
    #mission-form:has(.deck-strike-2:checked):not(:has(.deck-strike-3:checked)) .shield-readout .shield-one { display: inline; color: var(--red); }
    #mission-form:has(.deck-strike-3:checked) .shield-readout .shield-zero { display: inline; color: var(--red); }
    #mission-form:has(.deck-strike-2:checked) .reactor-frame::before { border-color: var(--red); border-top-color: transparent; box-shadow: 0 0 45px rgba(255, 98, 130, 0.48); }
    .question-zone { min-width: 0; }
    .mission-deck { display: none; }
    .deck-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin: 0 4px 12px; color: var(--muted); font-size: 0.72rem; font-weight: 850; letter-spacing: 0.1em; text-transform: uppercase; }
    .deck-heading strong { color: var(--gold); }
    .question-card {
      display: none;
      min-width: 0;
      margin: 0;
      padding: clamp(20px, 3vw, 34px);
      border: 1px solid rgba(37, 230, 255, 0.52);
      border-radius: 13px 30px 13px 30px;
      background: linear-gradient(145deg, rgba(7, 32, 62, 0.95), rgba(2, 13, 31, 0.97));
      box-shadow: 0 24px 55px rgba(0, 0, 0, 0.4), inset 0 0 55px rgba(37, 230, 255, 0.035);
      backdrop-filter: blur(10px);
    }
    ${cssStateRules}
    .card-top { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 17px; }
    .signal { color: var(--cyan); font-family: var(--display); font-size: 1.05rem; letter-spacing: 0.13em; text-transform: uppercase; }
    .round { color: var(--gold); font-size: 0.72rem; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
    .progress-track { height: 6px; margin-bottom: 23px; overflow: hidden; border-radius: 999px; background: rgba(255, 255, 255, 0.09); }
    .progress-track span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--cyan), var(--pink), var(--gold)); box-shadow: 0 0 18px rgba(37, 230, 255, 0.58); }
    .unit-line { margin: 0 0 9px; color: var(--muted); font-size: 0.7rem; font-weight: 850; letter-spacing: 0.08em; text-transform: uppercase; }
    .instruction { margin: 0; color: #bed7e8; font-size: 0.76rem; font-weight: 850; letter-spacing: 0.08em; text-transform: uppercase; }
    .prompt { margin: 10px 0 22px; font-size: clamp(1.16rem, 2.2vw, 1.58rem); font-weight: 740; line-height: 1.38; }
    .prompt.cue-prompt { color: var(--cyan-soft); font-family: var(--display); font-size: clamp(1.9rem, 4.4vw, 3.1rem); font-style: italic; letter-spacing: 0.04em; line-height: 1.05; text-transform: uppercase; }
    .prompt.cue-prompt::before, .prompt.cue-prompt::after { content: "“"; color: var(--muted); }
    .prompt.cue-prompt::after { content: "”"; }
    .prompt.antonym-prompt { color: var(--pink); }
    .prompt.passage-prompt { padding: 14px 16px; border-left: 3px solid var(--cyan); border-radius: 4px 12px 12px 4px; background: rgba(37, 230, 255, 0.06); font-size: clamp(1rem, 1.7vw, 1.14rem); font-weight: 600; line-height: 1.58; }
    .prompt.term-prompt { color: var(--gold); font-family: var(--display); font-size: clamp(2.1rem, 5vw, 3.7rem); font-style: italic; letter-spacing: 0.035em; line-height: 1; text-transform: uppercase; }
    .answer-list { display: grid; gap: 9px; }
    .answer {
      display: grid;
      grid-template-columns: 37px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
      min-height: 56px;
      padding: 9px 13px;
      color: #eef9ff;
      border: 1px solid rgba(123, 201, 238, 0.27);
      border-radius: 9px 16px 9px 16px;
      background: rgba(2, 15, 34, 0.78);
      font-size: 0.92rem;
      font-weight: 720;
      line-height: 1.34;
      cursor: pointer;
      transition: transform 140ms ease, border-color 140ms ease, background 140ms ease;
    }
    .answer:hover { transform: translateX(4px); border-color: var(--cyan); background: rgba(8, 48, 83, 0.9); }
    .answer:focus-visible, .answer:has(input:focus-visible) { outline: 3px solid rgba(255, 211, 77, 0.8); outline-offset: 2px; }
    .answer:has(input.correct:checked) { border-color: var(--green); background: rgba(17, 92, 65, 0.62); box-shadow: 0 0 24px rgba(89, 244, 173, 0.13); }
    .wrong-hit { display: none; }
    #mission-form:not(:has(.deck-strike-1:checked)) .wrong-hit.hit-1 { display: grid; }
    #mission-form:has(.deck-strike-1:checked):not(:has(.deck-strike-2:checked)) .wrong-hit.hit-2 { display: grid; }
    #mission-form:has(.deck-strike-2:checked):not(:has(.deck-strike-3:checked)) .wrong-hit.hit-3 { display: grid; }
    .question-card:has(.correct:checked) .answer-list { pointer-events: none; }
    .key { display: grid; width: 33px; aspect-ratio: 1; place-items: center; color: var(--cyan); border: 1px solid rgba(37, 230, 255, 0.52); border-radius: 7px; font-size: 0.74rem; font-weight: 950; }
    .feedback { display: none; margin-top: 14px; padding: 12px 14px; border-radius: 9px; font-size: 0.88rem; font-weight: 700; line-height: 1.42; }
    .correct-feedback { align-items: center; justify-content: space-between; gap: 14px; color: #d8fff0; border: 1px solid rgba(89, 244, 173, 0.5); background: rgba(14, 83, 58, 0.55); }
    .question-card:has(.correct:checked) .correct-feedback { display: flex; }
    .damage-readout { display: none; margin: 14px 0 0; padding: 12px 14px; color: #ffdbe2; border: 1px solid rgba(255, 98, 130, 0.55); border-radius: 9px; background: rgba(101, 18, 46, 0.52); font-size: 0.86rem; font-weight: 700; line-height: 1.42; }
    #mission-form:has(.deck-strike-1:checked):not(:has(.deck-strike-2:checked)) .mission-deck .damage-one { display: block; }
    #mission-form:has(.deck-strike-2:checked):not(:has(.deck-strike-3:checked)) .mission-deck .damage-two { display: block; }
    .next-control { flex: 0 0 auto; display: inline-flex; min-height: 39px; align-items: center; justify-content: center; gap: 8px; padding: 8px 12px; color: #031710; border-radius: 8px 13px 8px 13px; background: var(--green); font-size: 0.72rem; font-weight: 950; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; }
    .next-control:hover, .next-control:focus-visible { filter: brightness(1.12); outline: 3px solid rgba(89, 244, 173, 0.25); outline-offset: 3px; }
    .start-overlay, .complete-overlay, .fail-overlay {
      position: absolute;
      z-index: 10;
      inset: 82px 0 0;
      display: grid;
      place-items: center;
      padding: 22px;
      overflow-y: auto;
      background: linear-gradient(rgba(1, 8, 22, 0.35), rgba(1, 8, 22, 0.76));
      backdrop-filter: blur(7px);
    }
    #mission-form:has(.deck-start:checked) .start-overlay { display: none; }
    .complete-overlay, .fail-overlay { display: none; }
    #mission-form:has(.deck-complete:checked) .complete-overlay { display: grid; }
    #mission-form:has(.deck-strike-3:checked) .fail-overlay { display: grid; }
    .overlay-card {
      width: min(690px, 100%);
      padding: clamp(26px, 4vw, 46px);
      text-align: center;
      border: 1px solid rgba(37, 230, 255, 0.76);
      border-radius: 13px 34px 13px 34px;
      background: linear-gradient(145deg, rgba(7, 30, 58, 0.96), rgba(2, 12, 28, 0.98));
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.62), inset 0 0 65px rgba(37, 230, 255, 0.05);
    }
    .overlay-card h2 { margin: 0; font-family: var(--display); font-size: clamp(2.7rem, 8vw, 5.5rem); font-style: italic; letter-spacing: 0.035em; line-height: 0.9; text-transform: uppercase; text-shadow: 0 0 24px rgba(37, 230, 255, 0.38); }
    .overlay-card > p { max-width: 52ch; margin: 16px auto 0; color: #c8ddea; font-size: 0.98rem; line-height: 1.55; }
    .selector-block { margin-top: 22px; text-align: left; }
    .selector-title { display: block; margin-bottom: 8px; color: var(--muted); font-size: 0.68rem; font-weight: 900; letter-spacing: 0.13em; text-transform: uppercase; }
    .selector-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
    .selector-row.courses { grid-template-columns: repeat(3, 1fr); }
    .selector-row.missions { display: none; grid-template-columns: repeat(4, 1fr); }
    .selector-row.missions-sat { grid-template-columns: repeat(5, 1fr); }
    ${missionRowRules} { display: grid; }
    .pick-hint { display: flex; width: 100%; min-height: 58px; align-items: center; justify-content: center; padding: 10px; color: var(--muted); border: 1px dashed rgba(37, 230, 255, 0.4); border-radius: 10px 20px 10px 20px; font-size: 0.8rem; font-weight: 850; letter-spacing: 0.08em; text-align: center; text-transform: uppercase; }
    ${hideHintRules} { display: none; }
    .selector {
      display: grid;
      min-height: 52px;
      place-items: center;
      padding: 9px 8px;
      color: #c7dbea;
      border: 1px solid rgba(37, 230, 255, 0.3);
      border-radius: 9px 15px 9px 15px;
      background: rgba(2, 15, 34, 0.78);
      font-size: 0.76rem;
      font-weight: 900;
      letter-spacing: 0.07em;
      text-align: center;
      text-transform: uppercase;
      cursor: pointer;
    }
    .selector small { display: block; margin-top: 3px; color: var(--muted); font-size: 0.58rem; letter-spacing: 0.04em; }
    .selector:hover, .selector:focus-visible { border-color: var(--cyan); outline: none; background: rgba(8, 49, 84, 0.86); }
    ${selectedLabelRules.join(',\n    ')} {
      color: #04141c;
      border-color: var(--cyan-soft);
      background: linear-gradient(100deg, var(--cyan), var(--cyan-soft));
      box-shadow: 0 0 22px rgba(37, 230, 255, 0.25);
    }
    ${selectedLabelRules.map((rule) => `${rule} small`).join(',\n    ')} { color: #173741; }
    .start-buttons { margin-top: 14px; }
    .start-control { display: none; width: 100%; min-height: 58px; align-items: center; justify-content: center; color: #00131f; border-radius: 10px 20px 10px 20px; background: linear-gradient(90deg, var(--cyan), #91f4ff 55%, var(--gold)); font-family: var(--display); font-size: 1.25rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; box-shadow: 0 13px 32px rgba(37, 230, 255, 0.27); }
    .start-control:hover, .start-control:focus-visible { filter: brightness(1.08); outline: 3px solid rgba(255, 211, 77, 0.76); outline-offset: 4px; }
    ${decks.map((deck) => `#grade-${deck.grade}:checked ~ #mission-${deck.mission.key}:checked ~ .game-shell .start-${deck.id} { display: flex; }`).join('\n    ')}
    .mission-note { margin-top: 13px !important; color: var(--muted) !important; font-size: 0.75rem !important; }
    .perfect-score { display: inline-grid; width: 118px; aspect-ratio: 1; margin-bottom: 22px; place-items: center; color: #032019; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff8bc, var(--gold) 35%, var(--green)); box-shadow: 0 0 45px rgba(89, 244, 173, 0.45); font-family: var(--display); font-size: 2.45rem; transform: rotate(-5deg); }
    .breach-mark { display: inline-grid; width: 118px; aspect-ratio: 1; margin-bottom: 22px; place-items: center; color: #fff0f3; border: 2px solid var(--red); border-radius: 50%; background: radial-gradient(circle, rgba(255, 98, 130, 0.34), rgba(75, 8, 27, 0.92)); box-shadow: 0 0 45px rgba(255, 98, 130, 0.42); font-family: var(--display); font-size: 2.25rem; transform: rotate(5deg); }
    .fail-overlay .overlay-card { border-color: rgba(255, 98, 130, 0.82); box-shadow: 0 30px 90px rgba(0, 0, 0, 0.66), inset 0 0 75px rgba(255, 98, 130, 0.08); }
    .complete-overlay .reset-button, .fail-overlay .reset-button { margin-top: 24px; }
    #mission-form:has(.deck-strike-1:checked):not(:has(.deck-strike-2:checked)) .game-shell { animation: reactorHitOne 420ms ease-out; }
    #mission-form:has(.deck-strike-2:checked):not(:has(.deck-strike-3:checked)) .game-shell { animation: reactorHitTwo 450ms ease-out; }
    #mission-form:has(.deck-strike-3:checked) .game-shell { animation: reactorHitThree 520ms ease-out; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes breathe { 50% { transform: scale(1.025); filter: drop-shadow(0 0 38px rgba(37, 230, 255, 0.6)) drop-shadow(0 18px 24px rgba(0, 0, 0, 0.48)); } }
    @keyframes reactorHitOne { 18%, 54% { transform: translateX(-7px); filter: saturate(1.35); } 36%, 72% { transform: translateX(7px); } }
    @keyframes reactorHitTwo { 16%, 48%, 80% { transform: translateX(-9px); filter: saturate(1.65) contrast(1.08); } 32%, 64% { transform: translateX(9px); } }
    @keyframes reactorHitThree { 14%, 42%, 70% { transform: translateX(-12px); filter: saturate(2) contrast(1.14); } 28%, 56%, 84% { transform: translateX(12px); } }
    @media (max-width: 780px) {
      body { background-attachment: scroll; }
      .game-shell { width: calc(100% - 12px); margin: 6px auto; border-radius: 16px; }
      .topbar { min-height: 72px; padding: 12px 14px; }
      .brand p { display: none; }
      .mission-layout { grid-template-columns: 1fr; gap: 16px; min-height: 1040px; padding: 22px 13px 34px; }
      .reactor-panel { gap: 8px; }
      .reactor-frame { width: 185px; }
      .reactor-copy span { display: none; }
      .shield-hud { width: min(270px, 100%); padding: 9px 12px; }
      .question-card { padding: 20px 15px; }
      .start-overlay, .complete-overlay, .fail-overlay { inset: 72px 0 0; place-items: start center; padding: 24px 10px; }
      .overlay-card { padding: 28px 16px; }
      .selector-row.missions { grid-template-columns: repeat(2, 1fr); }
      .selector-row.missions-sat { grid-template-columns: repeat(2, 1fr); }
      .selector-row.courses { grid-template-columns: 1fr; }
      .prompt.passage-prompt { padding: 12px; }
      .answer { font-size: 0.84rem; }
      .correct-feedback { align-items: stretch; flex-direction: column; }
      .next-control { width: 100%; }
    }
    @media (max-width: 430px) {
      .brand h1 { font-size: 1.72rem; }
      .reset-button { min-height: 39px; padding: 7px 10px; font-size: 0.66rem; }
      .overlay-card h2 { font-size: 2.75rem; }
      .overlay-card > p { font-size: 0.87rem; }
      .selector { min-height: 47px; font-size: 0.69rem; }
    }
    @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition: none !important; } }
  </style>
</head>
<body>
  <form id="mission-form">
    <input class="state-control" id="grade-3" type="radio" name="grade" checked>
    <input class="state-control" id="grade-4" type="radio" name="grade">
    <input class="state-control" id="grade-sat" type="radio" name="grade">
${ALL_MISSIONS.map((mission, index) => `    <input class="state-control" id="mission-${mission.key}" type="radio" name="mission"${index === 0 ? ' checked' : ''}>`).join('\n')}
${decks.map(stateInputs).join('\n')}
    <main class="game-shell">
      <header class="topbar">
        <div class="brand"><h1>Lexicon Reactor</h1><p>English 3 + English 4 + SAT Prep vocabulary missions</p></div>
        <button class="reset-button" type="reset">Reset Mission</button>
      </header>
      <div class="mission-layout">
        <aside class="reactor-panel" aria-label="Reactor status">
          <div class="reactor-frame"><img class="reactor-art" src="${REACTOR_URL}" alt="Glowing Lexicon Reactor"></div>
          <div class="reactor-copy"><strong>Core Online</strong><span>Lock all ten signals before three misses breach the reactor.</span></div>
          <div class="shield-hud" aria-label="Reactor shield integrity">
            <div class="shield-top"><span>Shield Integrity</span><span class="shield-readout"><span class="shield-three">3 / 3</span><span class="shield-two">2 / 3</span><span class="shield-one">1 / 3</span><span class="shield-zero">0 / 3</span></span></div>
            <div class="shield-cells" aria-hidden="true"><span class="shield-cell"></span><span class="shield-cell"></span><span class="shield-cell"></span></div>
          </div>
        </aside>
        <div class="question-zone" aria-live="polite">
${decks.map(deckMarkup).join('\n')}
        </div>
      </div>
      <section class="start-overlay" aria-labelledby="start-title">
        <div class="overlay-card">
          <h2 id="start-title">Power the Words</h2>
          <p>Choose your course and mission. Lock all ten vocabulary signals before three misses breach the reactor. SAT Prep adds ten missions built from the most-tested SAT words and Digital SAT Words in Context practice.</p>
          <div class="selector-block">
            <span class="selector-title">1 · Select your course</span>
            <div class="selector-row courses">
${COURSES.map((course) => `              <label class="selector" for="grade-${course.grade}" tabindex="0">${course.name}<small>${course.note}</small></label>`).join('\n')}
            </div>
          </div>
          <div class="selector-block">
            <span class="selector-title">2 · Select a mission</span>
${COURSES.map(missionRow).join('\n')}
          </div>
          <div class="start-buttons">
            <p class="pick-hint">Select a mission for this course</p>
${decks.map((deck) => `            <label class="start-control start-${deck.id}" for="start-${deck.id}" tabindex="0">Start Mission ${deck.mission.label}</label>`).join('\n')}
          </div>
          <p class="mission-note">10 signals · 3 shields · complete the mission before the core overloads.</p>
        </div>
      </section>
      <section class="complete-overlay" aria-labelledby="complete-title">
        <div class="overlay-card">
          <div class="perfect-score">10/10</div>
          <h2 id="complete-title">Reactor Stable</h2>
          <p>Every signal in this mission is locked. Reset the reactor to choose another course or mission.</p>
          <button class="reset-button" type="reset">Reset Mission</button>
        </div>
      </section>
      <section class="fail-overlay" aria-labelledby="fail-title">
        <div class="overlay-card">
          <div class="breach-mark">0/3</div>
          <h2 id="fail-title">Reactor Breach</h2>
          <p>Three misses overloaded the core. Reset the reactor and launch a new attempt.</p>
          <button class="reset-button" type="reset">Retry Mission</button>
        </div>
      </section>
    </main>
  </form>
</body>
</html>
`;

writeFileSync(OUTPUT, html, 'utf8');
console.log(`Built ${OUTPUT} with ${decks.length} mission decks and no runtime JavaScript.`);
