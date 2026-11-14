# Certificates Interactive Slider Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the certificates section in `SkillsCard.tsx` from a 3-column grid into a single-certificate focused interactive slider with Framer Motion slide animations, neo-brutalist navigation buttons, indicator pills, drag/swipe support, and click-to-zoom modal lightbox.

**Architecture:** Use React state (`currentIndex`, `direction`) in `SkillsCard.tsx` with Framer Motion `AnimatePresence mode="wait"` and `motion.div` drag gestures to transition smoothly across the 6 verified credentials.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Vitest, React Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-14-certificates-slider-design.md`

## Global Constraints
- Never push to remote (`origin` / `heroku`) before user verification.
- Maintain the neo-brutalist design language (`border-2 border-black`, `#ED1C24` accents, `#F5F5F5`, `#DCDCDC`).
- Keep the Skills categories grid (`Languages & Tools`, `Frameworks & Libraries`, `Soft Skills`) unchanged at the top.
- Retain click-to-zoom Lightbox modal functionality on certificate click.
- 100% green test status across all test suites.

## Review Focus
1. Rapid clicks on Next/Prev buttons wrap cyclically (`01 ↔ 06`) without state breaks.
2. Clicking active certificate opens `ImageLightbox` modal with full title and issuer subtitle.
3. Fallback view displays when certificate image fails (`onError`).
4. Indicator buttons have minimum 28px touch target hit-box and `aria-current="true"` state.
5. Touch/drag gesture triggers slide change on 50px displacement or velocity > 300.

---

### Task 1: Update Test Suite for Certificates Slider (RED Phase)

**Files:**
- Modify: `src/components/cards/__tests__/TopicCardRenderer.test.tsx:32-45`

- [ ] **Step 1: Add slider assertions to skills/certificates test**

Assert:
- Initial render displays `"01 / 06"` and `"AI Engineering Specialization"`.
- Prev (`aria-label="Previous certificate"`) and Next (`aria-label="Next certificate"`) buttons exist.
- Clicking Next navigates to `"02 / 06"` and `"Machine Learning Specialization"`.
- Clicking indicator button for certificate 6 navigates to `"06 / 06"` and `"SQL for Data Science"`.
- Clicking Prev from certificate 1 wraps to certificate 6.
- Clicking the active certificate image opens the Lightbox modal.

- [ ] **Step 2: Run test to verify RED phase failure**

Run: `npx vitest run src/components/cards/__tests__/TopicCardRenderer.test.tsx`
Expected: FAIL (slider controls not yet in `SkillsCard`).

- [ ] **Step 3: Commit failing test**

```bash
git add src/components/cards/__tests__/TopicCardRenderer.test.tsx
git commit -m "test: add unit tests for SkillsCard certificates slider navigation"
```

---

### Task 2: Implement Certificates Slider in `SkillsCard.tsx` (GREEN Phase)

**Files:**
- Modify: `src/components/cards/SkillsCard.tsx`

- [ ] **Step 1: Add slider state, navigation handlers, and slide animation variants**

Import `motion`, `AnimatePresence`, `ChevronLeft`, `ChevronRight`.
Add `currentIndex`, `direction` state.
Add `handleNext`, `handlePrev`, `handleSelect` handlers with cyclic wrap-around.

- [ ] **Step 2: Render single focused certificate with drag gesture & controls**

Render the navigation controls bar with indicator pills, counter `01 / 06`, and Prev/Next buttons.
Wrap the active certificate in `AnimatePresence mode="wait" initial={false}` with `motion.div` drag support.
Preserve `CertificateVisualHeader` with `onZoom` and error fallback.

- [ ] **Step 3: Run Vitest test suite to verify GREEN phase**

Run: `npx vitest run src/components/cards/__tests__/TopicCardRenderer.test.tsx`
Expected: PASS.

- [ ] **Step 4: Commit implementation**

```bash
git add src/components/cards/SkillsCard.tsx
git commit -m "feat: convert SkillsCard certificates into interactive slider with lightbox support"
```

---

### Task 3: Full Suite Verification & Local Check

- [ ] **Step 1: Run full test suite across entire project**

Run: `npx vitest run`
Expected: PASS (all 20+ tests green).

- [ ] **Step 2: Verify dev server on port 4000**
