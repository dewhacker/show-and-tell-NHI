# NHI Deck — Observatory Theme

A single-file React presentation. Drop into a fresh Vite project.

## Setup

```bash
npm create vite@latest nhi-deck -- --template react
cd nhi-deck
# Replace src/App.jsx with the provided App.jsx
npm install
npm run dev
```

Then open the dev server URL and press **F11** for fullscreen.

## Controls

- **→ / Space** — next slide
- **←** — previous slide
- **Esc** — toggle index overview (click any card to jump)
- **Home / End** — first / last slide

## Editing slides

All 18 slides are plain data at the top of `App.jsx` in the `slides` array. Each slide has:

- `kind` — layout type: `cover-quiet`, `title`, `content`, `content-heavy`, `stat`, `pivot`, `clip`
- `eyebrow` — small uppercase label above title (usually the act/section name)
- `title` — the big line
- `body` — supporting paragraph
- `footnote` — source citation or tiny detail at bottom
- `image` — optional background image URL (used by `cover-quiet`)

To reorder, just move items in the array. To add a slide, copy one and edit.

## Video clips

Slides 8 and 14 are `kind: "clip"` placeholders. To wire up real video, replace the placeholder div in the `clip` renderer with:

```jsx
<video src="/clips/your-file.mp4" controls style={{ width: "100%" }} />
```

Put video files in `public/clips/` in your Vite project.

## Theme

All colors and type are in the `theme` object at the top. Fonts load from Google Fonts automatically. To change the accent color, edit `theme.accent`.

## Notes on content

Slide 7's 300M figure is from Bryson et al. 2021 (NASA / Kepler). Slide 11's Hastings numbers are from his public record. Slide 15 deliberately says "alleged" Wilson-Davis memo — keep that word. Slide 17 cites Schmidt & Frank 2018 (Silurian Hypothesis) by name for academic cover.
