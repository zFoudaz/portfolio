# Projects Card Slider Design

## Intent & Why
Convert the static 2x2 grid in `ProjectsCard.tsx` into an interactive, focused single-card slider with Prev/Next controls, slide indicator pills, and touch/drag swipe support. This reduces vertical scrolling in the chat history, especially on mobile, and gives each featured project high-focus presentation.

## Goals
- Display one project card at a time with full details (image with clickable repo link, tech badge, title, live demo button if available, description, bullet highlights, and stack tags).
- Neo-brutalist controls:
  - Prev (`←`) and Next (`→`) action buttons with neo-brutalist borders and hover states.
  - Project counter badge (e.g. `01 / 04`).
  - Clickable indicator dots/pills to jump directly to any of the 4 projects.
- Smooth directional slide animations (`AnimatePresence` with custom direction `+1` / `-1`).
- Touch/drag swipe gesture support (`drag="x"` with threshold detection for intuitive mobile swiping).
- Full responsiveness on screens from 360px up to desktop.
- 100% local development and verification; no changes pushed to GitHub remote until user verification.

## Non-Goals
- Modifying project data in `portfolioData.ts`.
- Changing other topic cards (`MeCard`, `SkillsCard`, `FunCard`, `ContactCard`).
- Adding external carousel libraries (we will use existing `framer-motion` and `lucide-react`).

## Approaches Considered
1. **Framer Motion AnimatePresence Slider (Selected):**
   - Uses installed `framer-motion` (`AnimatePresence`, directional slide variants, drag gesture).
   - High visual fidelity, smooth spring transitions, zero extra bundle weight.
   - Clean keyboard and programmatic controls.
2. **CSS Native Scroll-Snap Container:**
   - Pure CSS `overflow-x: auto` with `scroll-snap-type`.
   - Harder to cleanly synchronize active indicator state and less cohesive with Framer Motion transitions used across the rest of the app.
3. **Third-Party Library (Swiper / Embla):**
   - Unnecessary extra package when `framer-motion` already provides drag and slide primitives.

## Design Details & Builder Calls
- **Navigation Controls Layout:**
  - Placed right under the card header or in a dedicated footer bar:
    - Left side: Slide indicators (4 dots/pills, active is `#ED1C24` or black).
    - Center/Right: Counter `01 / 04` and circular Prev/Next arrow buttons (`border-2 border-black`).
- **Drag Threshold:** Swiping > 50px horizontally advances to next/prev project with wrap-around or bounded limits (cyclic wrap: from project 4, next goes to 1).
- **Accessibility:** Buttons have accessible `aria-label` attributes (`"Previous project"`, `"Next project"`, `"Go to project 1"`).
