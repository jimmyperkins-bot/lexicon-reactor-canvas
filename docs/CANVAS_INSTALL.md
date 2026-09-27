# Canvas installation

Lexicon Reactor uses three uploaded files in each Canvas course:

1. `reactor-chamber.png`
2. `reactor-device.png`
3. the generated `lexicon-reactor.canvas.html`

The icons in `assets/icons/` are optional and are only used for homepage links.

## 1. Upload the artwork

Open the target Canvas course, choose **Files**, and upload:

- `assets/reactor-chamber.png`
- `assets/reactor-device.png`

Publish both files. Copy the Canvas download URL for each file. A download URL normally resembles:

```text
https://canvas.example/courses/COURSE_ID/files/FILE_ID/download
```

Do not use a file URL from a different course unless students in the target course are guaranteed access to it.

## 2. Build the course-specific HTML

From the repository folder, run:

```bash
npm run build:canvas -- \
  --chamber-url "PASTE_CHAMBER_DOWNLOAD_URL" \
  --reactor-url "PASTE_REACTOR_DOWNLOAD_URL"
```

The result is `dist/lexicon-reactor.canvas.html`.

The generator runs locally, but the generated file contains no runtime JavaScript. Confirm this with:

```bash
npm test
```

## 3. Upload the game

Upload `dist/lexicon-reactor.canvas.html` to the same Canvas course and publish it. Copy its Canvas download URL.

## 4. Create the Canvas page

Create or edit a Canvas page, switch to the HTML editor, and use this wrapper. Replace `GAME_DOWNLOAD_URL` with the uploaded HTML file's download URL.

```html
<div style="width:100%;max-width:1180px;margin:0 auto;padding:24px;box-sizing:border-box;border:1px solid #b47724;border-radius:20px;background:linear-gradient(145deg,#061521,#0b2233 58%,#21140d);">
  <h2 style="margin:0 0 6px;color:#f2d39a;font:36px Georgia,serif;">Lexicon Reactor</h2>
  <p style="margin:0 0 18px;color:#e4c792;font:16px Arial,sans-serif;">Charge the core with the right word using English 3, English 4, and SAT Prep vocabulary.</p>
  <div style="padding:10px;border:1px solid rgba(218,164,82,.7);border-radius:16px;background:rgba(2,10,18,.72);">
    <iframe title="Lexicon Reactor Game" src="GAME_DOWNLOAD_URL" loading="lazy" style="display:block;width:100%;height:1180px;border:0;border-radius:11px;background:#08111d;"></iframe>
  </div>
</div>
```

The 1180-pixel height keeps the grade, mission, start, and reset controls visible at common Canvas content widths. Increase it if the surrounding Canvas theme narrows the content area further.

## 5. Add a homepage icon

Upload the preferred icon from `assets/icons/`, publish it, and place it inside a link to the new page:

```html
<a href="/courses/COURSE_ID/pages/lexicon-reactor">
  <img src="ICON_DOWNLOAD_URL" alt="Play Lexicon Reactor" style="display:block;width:150px;height:150px;object-fit:contain;">
</a>
```

## Updating an existing installation

Upload the rebuilt HTML using the same filename and choose **Replace** when Canvas asks. Canvas may create a new internal file ID and update page references automatically. Always reopen the published page and verify the iframe source, start controls, win state, and loss state after replacement.

## Troubleshooting

- **Artwork is missing:** the HTML was built with URLs from another course, or the image files are unpublished.
- **Buttons are cut off:** increase the iframe height in the Canvas page wrapper.
- **Start or reset does nothing:** confirm that the uploaded file is the generated pure-HTML build and not an older JavaScript prototype.
- **Students cannot open the game:** publish the page and all three files, then test with Canvas Student View.

