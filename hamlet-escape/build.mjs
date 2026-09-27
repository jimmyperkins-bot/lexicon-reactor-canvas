// Builds dist/elsinore-escape.html (student game) and dist/elsinore-escape-checker.html (teacher verifier).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { CHAMBERS } from './src/content.js';
const here = p => fileURLToPath(new URL(p, import.meta.url));
const SEED_A = 0x5eed1601, SEED_B = 0x0f1e7a55; // shared by game and checker
mkdirSync(here('./dist'), { recursive: true });
const game = readFileSync(here('./src/game.html'), 'utf8')
  .replace('/*CONTENT*/[]', JSON.stringify(CHAMBERS))
  .replace('/*SEED_A*/0', String(SEED_A)).replace('/*SEED_B*/0', String(SEED_B));
writeFileSync(here('./dist/elsinore-escape.html'), game);
const checker = readFileSync(here('./src/checker.html'), 'utf8')
  .replace('/*SEED_A*/0', String(SEED_A)).replace('/*SEED_B*/0', String(SEED_B));
writeFileSync(here('./dist/elsinore-escape-checker.html'), checker);
console.log('Built game (' + game.length + ' chars) and checker (' + checker.length + ' chars).');
