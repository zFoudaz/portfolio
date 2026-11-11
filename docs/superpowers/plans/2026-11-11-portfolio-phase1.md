# Portfolio Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive, responsive Next.js portfolio web application from the Google Stitch prototype (`code.html`) where clicking any of the 5 topic buttons (`Me`, `Projects`, `Skills`, `Fun`, `Contact`) appends the user query and smoothly animates the structured response card into the conversation history, ready for Heroku deployment.

**Architecture:** A Next.js (App Router, TypeScript, Tailwind CSS, Framer Motion) application. Portfolio content and keyword routing rules are decoupled into `src/data/portfolioData.ts`. A central `ChatContainer` manages the message history state, typing indicator simulation, and auto-scrolling, rendering modular topic cards (`MeCard`, `ProjectsCard`, `SkillsCard`, `FunCard`, `ContactCard`). Heroku deployment is configured via `Procfile` and dynamic `$PORT` binding in `package.json`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Vitest + React Testing Library (for unit/component tests).

**Spec:** `docs/superpowers/specs/2026-11-11-portfolio-phase1-design.md`

## Global Constraints

- Neo-brutalist color palette: `#ED1C24` primary red, `#000000` true black, `#333333` dark gray, `#FFFFFF` pure white, `#DCDCDC` surface, `#F5F5F5` surface-light, `#FAFAFA` page background.
- Typography: `Inter` for sans-serif body/headings and `JetBrains Mono` for monospace badges/metadata.
- Replace Stitch debug strings (`Using image-0dbefd.png`, `Using image-e576f1.png`) with `4 Featured Systems` and `6 Verified Credentials`.
- Serve `assets/Ziyad Fouda Resume.pdf` at `/Ziyad_Fouda_Resume.pdf` in `public/`.
- Heroku-ready: `package.json` must include `"start": "next start -p ${PORT:-3000}"` (or cross-platform equivalent via Next CLI / `Procfile` `web: npm start`).

## Review Focus

1. **Rapid / duplicate topic clicks while typing indicator is active:** Clicking multiple topic pills rapidly or clicking the same topic twice must queue/append cleanly in order without corrupting message IDs or leaving stuck typing indicators.
2. **Empty or whitespace-only custom input submission:** Submitting empty strings or spaces in the bottom prompt bar must be a no-op and not append blank user bubbles.
3. **Unmatched freeform text queries:** Entering a question that doesn't match a keyword (e.g., `"hello there"`) must append the user's actual text query and return a helpful assistant fallback message guiding them to the 5 topics (while noting live AI chat is coming soon), rather than silently doing nothing.
4. **Mobile viewport overflow & sticky footer overlap:** The chat stream must have sufficient bottom padding (`pb-44`) so the fixed bottom dock never obscures the bottom of the newest card on small screens.
5. **External image URL fallback:** Google Stitch's temporary `lh3.googleusercontent.com` image URLs can expire or fail to load; project and certificate cards should render a clean styled SVG/gradient engineering illustration or gracefully handle image load errors so cards never look broken.

---

### Task 1: Scaffold Next.js Project, Heroku Config & Portfolio Data Module

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `Procfile`, `.gitignore`, `vitest.config.ts`
- Create: `public/Ziyad_Fouda_Resume.pdf` (copied from `assets/Ziyad Fouda Resume.pdf`)
- Create: `src/types/portfolio.ts`
- Create: `src/data/portfolioData.ts`
- Test: `src/data/__tests__/portfolioData.test.ts`

**Interfaces:**
- Produces in `src/types/portfolio.ts`:
  - `export type TopicId = 'me' | 'projects' | 'skills' | 'fun' | 'contact';`
  - `export interface ChatMessageItem { id: string; role: 'user' | 'assistant'; text?: string; topicId?: TopicId; timestamp: string; }`
  - `export interface TopicOption { id: TopicId; label: string; queryText: string; icon: string; badgeClass: string; }`
- Produces in `src/data/portfolioData.ts`:
  - `export const TOPIC_OPTIONS: TopicOption[]`
  - `export const PORTFOLIO_DATA` (structured CV data for Me, Projects, Skills, Certificates, Fun Facts, Contact)
  - `export function matchTopicFromInput(input: string): TopicId | null`

- [ ] **Step 1: Initialize Next.js project files, copy resume PDF, and create `Procfile`**

Create `package.json` with Next.js, React, Tailwind CSS, Framer Motion, Lucide React, and Vitest + Testing Library. Configure `"start": "next start"` and `Procfile` with `web: npx next start -p $PORT`. Copy `assets/Ziyad Fouda Resume.pdf` to `public/Ziyad_Fouda_Resume.pdf`.

- [ ] **Step 2: Write the failing test in `src/data/__tests__/portfolioData.test.ts`**

```typescript
import { describe, it, expect } from 'vitest';
import { TOPIC_OPTIONS, PORTFOLIO_DATA, matchTopicFromInput } from '../portfolioData';

describe('portfolioData & keyword routing', () => {
  it('defines all 5 core topics in order', () => {
    expect(TOPIC_OPTIONS.map((t) => t.id)).toEqual(['me', 'projects', 'skills', 'fun', 'contact']);
  });

  it('matches keywords to the appropriate TopicId', () => {
    expect(matchTopicFromInput('Tell me about your projects and GenLearn')).toBe('projects');
    expect(matchTopicFromInput('What python and pytorch skills do you have?')).toBe('skills');
    expect(matchTopicFromInput('How can I contact or email you?')).toBe('contact');
    expect(matchTopicFromInput('Tell me something fun')).toBe('fun');
    expect(matchTopicFromInput('Who is Ziyad? education and experience')).toBe('me');
  });

  it('returns null for empty or unrecognized freeform input', () => {
    expect(matchTopicFromInput('   ')).toBeNull();
    expect(matchTopicFromInput('What is the weather in Cairo?')).toBeNull();
  });

  it('contains all 4 projects and 6 certificates without Stitch debug filenames', () => {
    expect(PORTFOLIO_DATA.projects).toHaveLength(4);
    expect(PORTFOLIO_DATA.certificates).toHaveLength(6);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/data/__tests__/portfolioData.test.ts`
Expected: FAIL with module not found `../portfolioData`

- [ ] **Step 4: Implement `src/types/portfolio.ts` and `src/data/portfolioData.ts`**

Populate `PORTFOLIO_DATA` with all content from `code.html` (summary, education stats, 4 internships, 4 projects, 3 skill groups, 6 certificates, 4 fun facts, 4 contact channels) and implement `matchTopicFromInput(input: string): TopicId | null`.

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/data/__tests__/portfolioData.test.ts`
Expected: PASS (4 passed)

---

### Task 2: Topic Response Cards (`MeCard`, `ProjectsCard`, `SkillsCard`, `FunCard`, `ContactCard`)

**Files:**
- Create: `src/components/cards/MeCard.tsx`
- Create: `src/components/cards/ProjectsCard.tsx`
- Create: `src/components/cards/SkillsCard.tsx`
- Create: `src/components/cards/FunCard.tsx`
- Create: `src/components/cards/ContactCard.tsx`
- Create: `src/components/cards/TopicCardRenderer.tsx`
- Test: `src/components/cards/__tests__/TopicCardRenderer.test.tsx`

**Interfaces:**
- Consumes: `TopicId` from `src/types/portfolio.ts`, `PORTFOLIO_DATA` from `src/data/portfolioData.ts`
- Produces: `export function TopicCardRenderer({ topicId }: { topicId: TopicId }): JSX.Element`

- [ ] **Step 1: Write the failing test in `src/components/cards/__tests__/TopicCardRenderer.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TopicCardRenderer } from '../TopicCardRenderer';

describe('TopicCardRenderer', () => {
  it('renders MeCard with education, GPA, and work experience', () => {
    render(<TopicCardRenderer topicId="me" />);
    expect(screen.getByText('Mansoura University')).toBeInTheDocument();
    expect(screen.getByText('GPA: 3.7 / 4.0')).toBeInTheDocument();
    expect(screen.getByText('AI Engineer Intern')).toBeInTheDocument();
  });

  it('renders ProjectsCard with 4 projects and clean header label', () => {
    render(<TopicCardRenderer topicId="projects" />);
    expect(screen.getByText('Engineering Projects')).toBeInTheDocument();
    expect(screen.getByText('4 Featured Systems')).toBeInTheDocument();
    expect(screen.getByText('GenLearn')).toBeInTheDocument();
    expect(screen.getByText('Research Agent with LangGraph')).toBeInTheDocument();
  });

  it('renders SkillsCard with skills and 6 credentials', () => {
    render(<TopicCardRenderer topicId="skills" />);
    expect(screen.getByText('Skills & Certifications')).toBeInTheDocument();
    expect(screen.getByText('6 Verified Credentials')).toBeInTheDocument();
    expect(screen.getByText('AI Engineering Specialization')).toBeInTheDocument();
  });

  it('renders FunCard and ContactCard accurately', () => {
    const { rerender } = render(<TopicCardRenderer topicId="fun" />);
    expect(screen.getByText('Fun Facts & Musings')).toBeInTheDocument();
    rerender(<TopicCardRenderer topicId="contact" />);
    expect(screen.getByText('ziyad.fouda7@gmail.com')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/cards/__tests__/TopicCardRenderer.test.tsx`
Expected: FAIL with module not found `../TopicCardRenderer`

- [ ] **Step 3: Implement the 5 topic card components and `TopicCardRenderer.tsx`**

Build each card matching the neo-brutalist design in `code.html` (`bg-white p-6 sm:p-8 rounded-2xl rounded-tl-sm border-2 border-black space-y-6`, bento grids, hover states, and fallback visual headers if external Stitch images fail to load). Include a Resume PDF download link in `MeCard`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/cards/__tests__/TopicCardRenderer.test.tsx`
Expected: PASS (4 passed)

---

### Task 3: Header, Sticky Topic Dock & Interactive Chat Stream

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/BottomDock.tsx`
- Create: `src/components/PortfolioChat.tsx`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Test: `src/components/__tests__/PortfolioChat.test.tsx`

**Interfaces:**
- Consumes: `TopicCardRenderer`, `TOPIC_OPTIONS`, `matchTopicFromInput`, `TopicId`, `ChatMessageItem`
- Produces:
  - `export function Header({ onContactClick }: { onContactClick: () => void }): JSX.Element`
  - `export function BottomDock({ onSelectTopic, onSubmitCustom, visitedTopics, isTyping }: BottomDockProps): JSX.Element`
  - `export function PortfolioChat(): JSX.Element`

- [ ] **Step 1: Write the failing test in `src/components/__tests__/PortfolioChat.test.tsx`**

```tsx
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PortfolioChat } from '../PortfolioChat';

describe('PortfolioChat interactive flow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders only the intro welcome message initially (no topic cards pre-rendered)', () => {
    render(<PortfolioChat />);
    expect(screen.getByText(/SYSTEM ONLINE/i)).toBeInTheDocument();
    expect(screen.queryByText('Engineering Projects')).not.toBeInTheDocument();
    expect(screen.queryByText('Mansoura University')).not.toBeInTheDocument();
  });

  it('appends user bubble and renders topic card smoothly when a topic pill is clicked', () => {
    render(<PortfolioChat />);
    const projectsBtn = screen.getByRole('button', { name: /Projects/i });
    fireEvent.click(projectsBtn);

    // User query appears immediately
    expect(screen.getByText('What are your top projects? (Projects)')).toBeInTheDocument();

    // Advance timer past typing animation
    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText('Engineering Projects')).toBeInTheDocument();
    expect(screen.getByText('GenLearn')).toBeInTheDocument();
  });

  it('appends multiple topics in conversation history order', () => {
    render(<PortfolioChat />);
    fireEvent.click(screen.getByRole('button', { name: /Me/i }));
    act(() => { vi.advanceTimersByTime(400); });

    fireEvent.click(screen.getByRole('button', { name: /Fun/i }));
    act(() => { vi.advanceTimersByTime(400); });

    expect(screen.getByText('Mansoura University')).toBeInTheDocument();
    expect(screen.getByText('Fun Facts & Musings')).toBeInTheDocument();
  });

  it('ignores whitespace-only input and handles unmatched freeform questions gracefully', () => {
    render(<PortfolioChat />);
    const input = screen.getByPlaceholderText(/Ask a question or click any topic above/i);
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(form);
    expect(screen.queryByTestId('user-query-bubble')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'What is the weather?' } });
    fireEvent.submit(form);
    act(() => { vi.advanceTimersByTime(400); });

    expect(screen.getByText('What is the weather?')).toBeInTheDocument();
    expect(screen.getByText(/AI chatbot assistant is being connected/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/__tests__/PortfolioChat.test.tsx`
Expected: FAIL with module not found `../PortfolioChat`

- [ ] **Step 3: Implement `Header.tsx`, `BottomDock.tsx`, `PortfolioChat.tsx`, and wire up `src/app/page.tsx` & `layout.tsx`**

Implement Framer Motion `AnimatePresence` + `motion.div` spring animations for incoming user bubbles, typing indicator dots, and bot topic cards. Auto-scroll to the latest message anchor smoothly when messages are appended. Include a "Clear Chat" action in the dock header once messages exist.

- [ ] **Step 4: Run test to verify it passes and run production Next.js build**

Run: `npx vitest run && npm run build`
Expected: All Vitest suites PASS and `next build` exits with code 0.
