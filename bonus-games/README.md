# Bonus games

These are the four bonus arcade games linked from the English 4 – Perkins Canvas home page, restyled to match Lexicon Reactor: neon cyan, pink, and gold panels over the reactor-chamber background.

| File | Canvas page | Notes |
| --- | --- | --- |
| `wordle-production.html` | `/pages/wordle` | Mini Wordle. The daily answers are the 138 five-letter words from the SAT bank (`data/sat-word-bank.tsv`). An SAT definition card appears when a puzzle ends. |
| `pacman-production.html` | `/pages/pac-man` | Pac-Man Arcade |
| `connect4-production.html` | `/pages/connect-4-2` | Connect 4 Arcade (two players) |
| `tetris-production.html` | `/pages/tetris` | Tetris Arcade |

Unlike Lexicon Reactor, these games use JavaScript. Canvas serves uploaded HTML files from their own domain, so the scripts run inside the page's iframe.

## Background image

Each file loads its background from Canvas:

```text
https://canvas.mckinneyisd.net/courses/179589/files/15361980/download
```

To install a game in another course, upload `assets/reactor-chamber.png` to that course and replace this link with the course's own download URL. Mr. Henry's Wordle (course 179725) uses `/courses/179725/files/15362436/download`.

## Updating on Canvas

Upload the file to the course's Files with the same name and choose **Replace**. Then make sure the game's page still loads the new file.
