# Skills Card Certificates Slider Design

## Intent & Why
Apply the same interactive slider logic to the certificates section in `SkillsCard.tsx`. Instead of stacking 6 certificates in a 3-column grid (which consumes heavy vertical space on mobile and tablet), render a single focused certificate at a time with Prev/Next arrow navigation, a live counter badge (`01 / 06`), indicator pills, swipe/drag gesture support, and click-to-zoom lightbox integration.

## Goals
- Retain the top Skills categories bento grid intact (`Languages & Tools`, `Frameworks & Libraries`, `Soft Skills`).
- Convert the 6 certificates into an interactive slider:
  - Prev (`←`) and Next (`→`) circular neo-brutalist buttons with cyclic wrap-around (`01 ↔ 06`).
  - Counter badge: `01 / 06` with `aria-live="polite"`.
  - Clickable indicator pills with WCAG 2.5.8 touch target (minimum 28px hit-box) and `aria-current="true"` state.
- Directional slide animations powered by `framer-motion` (`AnimatePresence mode="wait" initial={false}`).
- Horizontal touch & drag swipe support with velocity detection (`drag="x"`).
- Click-to-zoom lightbox functionality preserved on the active certificate (`ImageLightbox`).
- Retain image loading error fallback.
- Strictly local implementation and verification; no remote pushes to GitHub/Heroku.

## Non-Goals
- Changing the top Skills categories grid or data in `portfolioData.ts`.
- Modifying other topic cards (`ProjectsCard`, `MeCard`, `FunCard`, `ContactCard`).

## Approaches Considered
1. **Framer Motion AnimatePresence Slider (Selected):**
   - Matches the exact architecture and styling of `ProjectsCard.tsx`.
   - Reuses `ImageLightbox` cleanly with full zoom fidelity.
   - Consistent user experience across the portfolio.
2. **Multi-Card Horizontal Carousel:**
   - Showing 2 or 3 cards at once. Ruled out to maintain the requested "same logic" as ProjectsCard (one focused card at a time with clean, distraction-free reading).
