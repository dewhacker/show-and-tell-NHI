# NHI Deck — Observatory Theme

A multi-flavor React presentation. Vite + React, no other dependencies.

## Context for Claude Code

This is a personal presentation app for a ~20 minute talk on NHI (non-human intelligence) contact, built as a Vite + React project instead of Keynote because the author prefers code over slide editors. The app supports multiple "flavors" — different versions of the same talk tuned to different audiences, lengths, or emphases. Each flavor is a self-contained slide deck in `src/flavors/`, sharing the Observatory theme and all layout components.

Slide data is plain JavaScript — arrays of objects with `kind`, `eyebrow`, `title`, `body`, `footnote`, and optional `image` fields. The seven layout kinds (`cover-quiet`, `title`, `content`, `content-heavy`, `stat`, `pivot`, `clip`) are shared across all flavors. Adding a new flavor is one new file in `src/flavors/` plus one import line in `src/flavors/index.js`.

The Observatory theme (deep navy background, warm off-white text, amber accent, Cormorant Garamond + Work Sans from Google Fonts) lives in `src/theme.js`. Layout components live in `src/components/`.

When extending this app, preserve single-file editability per flavor — each flavor's content lives in one file, no JSX, no builders. Tone-wise, the presentation is aimed at skeptics, so framing language matters (e.g. "testified that witnesses told him" rather than "revealed") — preserve that carefulness when editing slide text.

## Setup

```bash
npm install
npm run dev
```

Then open the dev server URL and press **F11** for fullscreen.

## Controls

- **→ / Space** — next slide
- **←** — previous slide
- **Esc** — toggle index overview (click any card to jump)
- **Home / End** — first / last slide
- **S** — toggle settings (flavor picker)
- **P** — open presenter view in a new tab

## Presenter mode

Press **P** (or open `?presenter` manually) to get a Keynote-style presenter view in a second tab. Keep the presentation tab fullscreen on the projector and the presenter tab on your laptop screen.

The presenter view shows:
- Scaled previews of the current and next slides
- Speaker notes (loaded from `.md` files)
- Elapsed timer and target runtime

Both tabs stay in sync via BroadcastChannel — navigate from either one. Notes are stored as markdown files in `src/flavors/notes/` and referenced per-slide with `presenter_notes`:

```js
{
  id: 1,
  kind: "cover-quiet",
  title: "A pale blue dot.",
  presenter_notes: "./notes/deepdive-1.md",
}
```

## Project structure

```
src/
  App.jsx                  — shell, navigation, settings/index overlays
  theme.js                 — shared Observatory theme object
  components/
    Chrome.jsx             — top/bottom fixed UI bars
    Eyebrow.jsx            — small uppercase label above title
    Title.jsx              — main heading
    Body.jsx               — supporting paragraph
    Footnote.jsx           — source citation at bottom
    Slide.jsx              — layout router for all 7 slide kinds
    Index.jsx              — Esc overlay — grid of all slides
    Settings.jsx           — S overlay — flavor picker
    Presenter.jsx          — P overlay — speaker notes + previews + timer
  flavors/
    index.js               — exports array of all flavors
    canonical.js           — Flavor A — the full 20-min deck (18 slides)
    short.js               — Flavor B — ~10 min, skeptic-hostile (stub)
    deepdive.js            — Flavor C — ~30 min, friendly audience (stub)
    notes/                 — presenter notes as .md files
```

## Adding a new flavor

1. Create `src/flavors/yourflavor.js`:

```js
export default {
  id: "yourflavor",
  title: "Your flavor title",
  description: "One-line description for the settings menu.",
  runtime: 15,
  slides: [
    { id: 1, kind: "title", eyebrow: "...", title: "...", body: "...", footnote: "..." },
    // ...
  ],
};
```

2. Add one import line in `src/flavors/index.js`.

That's it. Press **S** in the app to switch to it.

## Editing slides

Each flavor file contains a `slides` array. Each slide has:

- `kind` — layout type: `cover-quiet`, `title`, `content`, `content-heavy`, `stat`, `pivot`, `clip`
- `eyebrow` — small uppercase label above title (usually the act/section name)
- `title` — the big line
- `body` — supporting paragraph
- `footnote` — source citation or tiny detail at bottom
- `image` — optional background image URL (used by `cover-quiet`)
- `presenter_notes` — optional path to a `.md` file in `src/flavors/notes/` (shown in presenter view)

To reorder, just move items in the array. To add a slide, copy one and edit.

## Video clips

Slides with `kind: "clip"` are placeholders. To wire up real video, replace the placeholder div in the `clip` renderer with:

```jsx
<video src="/clips/your-file.mp4" controls style={{ width: "100%" }} />
```

Put video files in `public/clips/` in your Vite project.

## Theme

All colors and type are in `src/theme.js`. Fonts load from Google Fonts automatically. To change the accent color, edit `theme.accent`.

## Notes on content

Slide 7's 300M figure is from Bryson et al. 2021 (NASA / Kepler). Slide 11's Hastings numbers are from his public record. Slide 15 deliberately says "alleged" Wilson-Davis memo — keep that word. Slide 17 cites Schmidt & Frank 2018 (Silurian Hypothesis) by name for academic cover.
