# NHI Deck — Observatory Theme

A single-file React presentation. Drop into a fresh Vite project.

## Context for Claude Code

This is a personal presentation app for a ~20 minute talk on NHI (non-human intelligence) contact, built as a Vite + React project instead of Keynote because the author prefers code over slide editors. The current state is a single-file implementation: all 18 slides live as plain data in a `slides` array at the top of `src/App.jsx`, rendered by a small set of layout components (`cover-quiet`, `title`, `content`, `content-heavy`, `stat`, `pivot`, `clip`) defined in the same file. The Observatory theme (deep navy background, warm off-white text, amber accent, Cormorant Garamond + Work Sans from Google Fonts) is held in a `theme` object also at the top of the file. Navigation is keyboard-driven with arrow keys, space, Escape for an index overview grid, and Home/End for jumping to the ends. There is no router, no state library, no build config beyond Vite defaults — the goal is that any change is one file edit away. When extending this app, preserve that single-file editability for slide content as much as possible; the author wants to be able to tweak a line of copy without hunting through a component tree. Tone-wise, the presentation is aimed at skeptics, so framing language matters (e.g. "testified that witnesses told him" rather than "revealed") — preserve that carefulness when editing slide text.

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

---

# Feature Request: Multi-Flavor Slide Decks

## Goal

I want to be able to author and run multiple "flavors" of this same presentation — different versions tuned to different audiences, lengths, or emphases — and switch between them at runtime via a settings menu. The current 18-slide deck (in `App.jsx`) should become **Flavor A**, the canonical version, and remain runnable exactly as it is today. I want to add Flavor B, Flavor C, etc., each as its own slide data file, and pick which one to run from inside the app.

## Why

Same talk, different rooms. A 20-minute version for a friendly crowd is not the same as a 10-minute version for a hostile one, or a 30-minute deep dive for people who already buy the premise. Right now I'd have to fork the file. I want to keep one app and swap the content.

## What "flavor" means

A flavor is a named, self-contained slide deck: a title, a description, an estimated runtime, and an ordered list of slide objects in the same shape the current `slides` array uses. Flavors share the theme, the layout components, the keyboard navigation, the index overlay — everything except the actual slide content. The point is that the existing rendering pipeline (`Slide`, `Chrome`, `Index`, the seven `kind` layouts) runs any flavor unchanged.

## Proposed structure

```
src/
  App.jsx                  // shell, navigation, settings menu — no slide content
  theme.js                 // extracted theme object
  components/              // Slide, Chrome, Index, Eyebrow, Title, Body, Footnote
  flavors/
    index.js               // exports an array of all flavors
    canonical.js           // Flavor A — current 18-slide deck
    short.js               // Flavor B — ~10 min, skeptic-hostile audience
    deepdive.js            // Flavor C — ~30 min, friendly audience
```

Each flavor file exports a single object:

```js
export default {
  id: "canonical",
  title: "Why ours is the generation",
  description: "The full 20-minute arc. Cosmic scale → hidden history → why now.",
  runtime: 20,
  slides: [ /* same shape as today */ ],
};
```

`flavors/index.js` just imports them and exports an array. Adding a new flavor is one new file plus one import line — no other code changes.

## Settings menu

A new keyboard shortcut (suggest **S**) opens a settings overlay similar to the Esc index, but listing flavors instead of slides. Each flavor card shows title, description, runtime, and slide count. Clicking one switches the active deck and resets to slide 0. The current flavor is highlighted. The selection should persist across reloads (localStorage is fine — this is a local dev tool, no SSR concerns).

The settings overlay should also have a small footer showing the current flavor name and runtime, so I can confirm what's loaded at a glance.

## Constraints to preserve

1. **Flavor A must be byte-equivalent in behavior to the current deck.** When I open the app fresh and don't touch settings, I get exactly what I have today.
2. **Slide data stays plain.** I want to open `flavors/canonical.js` and edit a line of copy without touching JSX. No builders, no DSLs, no markdown parsing — just the same array-of-objects shape.
3. **Single-file editability per flavor.** Each flavor lives in one file. I should never have to edit two files to change one flavor's content.
4. **The seven existing slide kinds must work unchanged across all flavors.** No flavor should need a custom layout. If I ever need a new layout, it gets added to the shared components and becomes available to all flavors.
5. **No new dependencies** unless absolutely necessary. Vite + React only.

## Implementation plan for Claude Code

1. Extract `theme` into `src/theme.js`.
2. Extract the layout components (`Chrome`, `Eyebrow`, `Title`, `Body`, `Footnote`, `Slide`, `Index`) into `src/components/`. The `Slide` component should take a `slide` prop exactly as it does now — no API changes.
3. Move the current `slides` array out of `App.jsx` into `src/flavors/canonical.js`, wrapped in the flavor object shape above. Verify the app still runs identically.
4. Create `src/flavors/index.js` that imports and exports `[canonical]` for now.
5. In `App.jsx`, replace the hardcoded `slides` reference with state: `const [flavorId, setFlavorId] = useState(...)`, defaulting to whatever's in localStorage or `"canonical"`. Derive the active slide list from the chosen flavor.
6. Build a `Settings` overlay component mirroring the visual style of `Index`. Trigger on **S**. Lists all flavors from `flavors/index.js`. Clicking one calls `setFlavorId`, writes to localStorage, and resets the slide index to 0.
7. Add a small flavor indicator to the bottom chrome (next to the slide counter) showing the current flavor's title.
8. Stub out `flavors/short.js` and `flavors/deepdive.js` as empty templates — same shape, with a single placeholder slide and a TODO comment — so I can fill them in later without scaffolding work.
9. Update this README's controls section to document the **S** shortcut and the flavors directory.

Don't write the content for short.js or deepdive.js — I'll do that myself once the plumbing works. The deliverable is: the canonical flavor runs unchanged, **S** opens a settings menu, and dropping a new file into `flavors/` plus one import line adds a new selectable flavor.
