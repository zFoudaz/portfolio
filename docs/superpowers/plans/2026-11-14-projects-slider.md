# Projects Card Interactive Slider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `ProjectsCard.tsx` from a static 2x2 grid into a focused single-project interactive slider with Framer Motion slide animations, neo-brutalist navigation buttons, indicator pills, and drag/touch swipe support.

**Architecture:** Use React state (`currentIndex`, `direction`) in `ProjectsCard.tsx` combined with Framer Motion's `AnimatePresence` and `motion.div` drag gestures to smoothly transition between the 4 featured projects. Provide accessible previous/next buttons and clickable indicator dots.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, React Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-14-projects-slider-design.md`

## Global Constraints
- Never push to remote (`git push origin` / `git push heroku`) before user verification.
- Maintain the neo-brutalist design language (`border-2 border-black`, `#ED1C24` red accents, `#DCDCDC`, `#FAFAFA`).
- Preserve all project data attributes: image with clickable GitHub repo link, tech badge, title, live demo button for PopChoice, description, highlights, and stack tags.
- Responsive design: seamless on screens from 360px up to large displays.
- Keep tests passing with 100% green status across all test suites.

## Review Focus
1. Rapid consecutive clicks on Next/Prev buttons do not break state or index bounds (cyclic wrap: `01` -> `04` and `04` -> `01`).
2. PopChoice Live Demo external link remains accessible and correctly configured with `target="_blank"` when active.
3. Fallback error view when image fails (`onError`) still displays correctly within the active slide.
4. Drag/swipe gestures on touch/desktop trigger page transitions when exceeding 50px threshold.
5. Indicator pills accurately reflect active index and allow direct jumping to any slide.

---

### Task 1: Update Test Suite for Slider Navigation (RED Phase)

**Files:**
- Modify: `src/components/cards/__tests__/TopicCardRenderer.test.tsx:13-30`

**Interfaces:**
- Consumes: `TopicCardRenderer` (`topicId="projects"`).
- Produces: Failing unit tests asserting single project focus, Prev/Next buttons, counter badge (`01 / 04`), and indicator pills.

- [ ] **Step 1: Update `TopicCardRenderer.test.tsx` with slider assertions**

Update the projects test to:
- Assert that initial render displays `"GenLearn"` and counter `"01 / 04"`.
- Assert Next button (`aria-label="Next project"`) and Prev button (`aria-label="Previous project"`).
- Click Next button and assert `"Research Agent with LangGraph"` and `"02 / 04"` are displayed.
- Click indicator button for project 3 (`aria-label="Go to slide 3"`) and assert `"PopChoice"` and the `"Live Demo"` link are displayed.
- Click Prev button from first project and assert cyclic wrap to project 4 (`"Study Tracker App"` and `"04 / 04"`).

- [ ] **Step 2: Run test to verify RED phase failure**

Run: `npx vitest run src/components/cards/__tests__/TopicCardRenderer.test.tsx`
Expected: FAIL (buttons and counter not yet present in `ProjectsCard`).

- [ ] **Step 3: Commit failing test**

```bash
git add src/components/cards/__tests__/TopicCardRenderer.test.tsx
git commit -m "test: add unit tests for ProjectsCard interactive slider navigation"
```

---

### Task 2: Implement Interactive Slider in `ProjectsCard.tsx` (GREEN Phase)

**Files:**
- Modify: `src/components/cards/ProjectsCard.tsx`

**Interfaces:**
- Consumes: `PORTFOLIO_DATA.projects` from `@/data/portfolioData`.
- Produces: `ProjectsCard` component rendering 1 active project at a time with Framer Motion slide transitions, drag gestures, and neo-brutalist navigation bar.

- [ ] **Step 1: Implement state, navigation handlers, and slide animation variants**

In `ProjectsCard.tsx`:
- Import `motion`, `AnimatePresence` from `'framer-motion'`.
- Import `ChevronLeft`, `ChevronRight` from `'lucide-react'`.
- Add `currentIndex` state (0 to 3) and `direction` state (1 or -1).
- Define `handleNext` (cyclic: `(prev + 1) % projects.length`), `handlePrev` (cyclic: `(prev - 1 + projects.length) % projects.length`), and `handleSelect(index)`.
- Configure slide variants:
  - `enter`: `(direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 })`
  - `center`: `{ x: 0, opacity: 1 }`
  - `exit`: `(direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 })`

- [ ] **Step 2: Render single focused project with drag gesture & controls**

- Add Top/Bottom Navigation Bar featuring:
  - Indicator pills (active: `#ED1C24` or black, inactive: white with black border).
  - Counter badge: `String(currentIndex + 1).padStart(2, '0') / 04`.
  - Circular Prev/Next buttons with `active:scale-95`, hover states, and clear `aria-label`.
- Wrap the active project card in `AnimatePresence mode="wait"` with `motion.div`:
  - `drag="x"`, `dragConstraints={{ left: 0, right: 0 }}`, `dragElastic={0.2}`.
  - `onDragEnd` triggering `handleNext()` or `handlePrev()` if offset exceeds 50px.
- Retain image loading error fallback (`ProjectVisualHeader`).

- [ ] **Step 3: Run Vitest test suite to verify GREEN phase**

Run: `npx vitest run src/components/cards/__tests__/TopicCardRenderer.test.tsx`
Expected: PASS (all tests in suite passing).

- [ ] **Step 4: Commit implementation**

```bash
git add src/components/cards/ProjectsCard.tsx
git commit -m "feat: convert ProjectsCard into neo-brutalist interactive slider with drag support"
```

---

### Task 3: Comprehensive Test Suite Verification & Local Check

**Files:**
- Test: All test files in project.

**Interfaces:**
- Consumes: Full codebase.
- Produces: 100% green test results, verified locally on port 4000.

- [ ] **Step 1: Run full test suite across entire project**

Run: `npx vitest run`
Expected: All test suites PASS (20+ tests green).

- [ ] **Step 2: Verify local dev server output on `http://127.0.0.1:4000`**

Check that Next.js compilation succeeds with zero errors and user can interactively test the slider in their browser.

- [ ] **Step 3: Commit and summarize without pushing to GitHub**

Ensure git status is clean and HEAD is intact locally, ready for user review.
