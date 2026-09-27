import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const buildScript = fileURLToPath(new URL('../scripts/build-reactor.mjs', import.meta.url));
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'lexicon-reactor-'));

function build(outputPath, extraArguments = []) {
  const result = spawnSync(
    process.execPath,
    [buildScript, '--output', outputPath, ...extraArguments],
    { cwd: repoRoot, encoding: 'utf8' }
  );
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return readFileSync(outputPath, 'utf8');
}

try {
  const portableOutput = join(temporaryDirectory, 'portable.html');
  const portableHtml = build(portableOutput);

  assert.doesNotMatch(portableHtml, /<script\b/i, 'published game must not contain runtime JavaScript');
  assert.match(portableHtml, /url\("\.\.\/assets\/reactor-chamber\.png"\)/i, 'portable build must use the bundled chamber asset');
  assert.match(portableHtml, /src="\.\.\/assets\/reactor-device\.png"/i, 'portable build must use the bundled reactor asset');
  assert.match(portableHtml, /id="grade-3"[^>]*type="radio"/i, 'English 3 selector is required');
  assert.match(portableHtml, /id="grade-4"[^>]*type="radio"/i, 'English 4 selector is required');
  assert.match(portableHtml, /id="grade-sat"[^>]*type="radio"/i, 'SAT Prep selector is required');
  for (let mission = 1; mission <= 10; mission += 1) {
    const label = String(mission).padStart(2, '0');
    assert.match(portableHtml, new RegExp(`id="start-sat-${label}"`), `SAT mission ${label} start control is required`);
  }
  assert.doesNotMatch(portableHtml, /\son[a-z]+\s*=/i, 'published game must not contain inline event handlers');
  assert.doesNotMatch(portableHtml, /javascript:/i, 'published game must not contain javascript: URLs');
  assert.match(portableHtml, /Reactor Stable/i, 'win state is required');
  assert.match(portableHtml, /Reactor Breach/i, 'loss state is required');

  const canvasOutput = join(temporaryDirectory, 'canvas.html');
  const chamberUrl = 'https://canvas.example/courses/123/files/456/download';
  const reactorUrl = 'https://canvas.example/courses/123/files/789/download';
  const canvasHtml = build(canvasOutput, ['--chamber-url', chamberUrl, '--reactor-url', reactorUrl]);

  assert.ok(canvasHtml.includes(chamberUrl), 'Canvas build must use the supplied chamber URL');
  assert.ok(canvasHtml.includes(reactorUrl), 'Canvas build must use the supplied reactor URL');
  assert.equal((canvasHtml.match(/<section class="mission-deck"/g) || []).length, 18, 'eighteen mission decks are required (4 + 4 English, 10 SAT Prep)');
  assert.equal((canvasHtml.match(/<fieldset class="question-card"/g) || []).length, 180, 'each mission must contain ten questions');
  assert.equal((canvasHtml.match(/<section class="mission-deck" data-grade="sat"/g) || []).length, 10, 'SAT Prep must have ten missions');

  console.log('PASS: portable and Canvas pure-HTML builds');
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
