# Customization

## Vocabulary

Curriculum data lives in `src/game-engine.js` inside the `VOCABULARY` array. Each entry has this shape:

```js
{
  course: 'English 3',
  units: [1, 2],
  term: 'Example term',
  definition: 'Student-facing definition.'
}
```

Keep `course` as `English 3` or `English 4` unless the build generator is also updated. `units` records every curriculum unit in which the term appears.

After changing vocabulary, run:

```bash
npm run build
npm test
```

The tests confirm that every curriculum term appears in the mission rotation for its grade.

## Missions

Mission names and labels are defined by `MISSIONS` near the top of `scripts/build-reactor.mjs`. Each grade currently has four deterministic missions with ten signals each.

The build script shuffles each grade's vocabulary with a fixed seed and uses overlapping offsets. This lets all terms rotate through the missions while keeping each mission at ten questions.

## Colors and layout

The published CSS is generated from the large HTML template string in `scripts/build-reactor.mjs`. The main design tokens are at the beginning of its `<style>` section:

- `--cyan`
- `--gold`
- `--pink`
- `--green`
- `--red`
- `--panel`
- `--line`

Rebuild and rerun the tests after any style change.

## Artwork

- `assets/reactor-chamber.png` is the full-page background.
- `assets/reactor-device.png` is the transparent reactor illustration.
- `assets/icons/` contains homepage-link artwork and is not required by the game itself.

The portable build references the bundled assets with relative URLs. Canvas builds should use Canvas-hosted download URLs supplied through the command line.

## Build options

```text
--output PATH
--chamber-url URL
--reactor-url URL
```

Example:

```bash
node scripts/build-reactor.mjs \
  --output dist/custom-reactor.html \
  --chamber-url "https://example/chamber.png" \
  --reactor-url "https://example/reactor.png"
```

