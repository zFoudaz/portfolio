# Portfolio Phase 1 — Interactive Next.js Chat App Design

## Intent & Why
Convert the static Google Stitch HTML prototype (`code.html`) into a production-ready, interactive Next.js web application ready for Heroku deployment and Phase 2 AI chatbot integration.

## Goals
- Exact visual fidelity to the neo-brutalist aesthetic (`#ED1C24` red accents, bold black borders, `Inter` & `JetBrains Mono` typography, responsive bento grids).
- Dynamic conversation stream: starts with only the welcome intro message on load.
- Clicking any of the 5 topic pills (`Me`, `Projects`, `Skills`, `Fun`, `Contact`) or header `Contact` button appends the user query bubble, shows a brief animated typing indicator (~350ms), and smoothly renders the rich topic card into the chat history with Framer Motion spring transitions.
- Heroku-ready configuration (`Procfile`, dynamic `$PORT` binding in `package.json` start script, Node engines specification).

## Non-Goals (Phase 1)
- Live LLM API integration (comes in Phase 2; for now, freeform text input will match topic keywords to render the relevant topic card or reply with a friendly fallback prompt).

## Approaches Considered
1. **Next.js + Tailwind CSS + Framer Motion (Selected):** Unified full-stack React framework with spring animations, modular card components, built-in API route support for Phase 2, and single-buildpack Heroku deployment.
2. **React (Vite) + Python FastAPI:** Separate frontend/backend; ruled out in favor of Next.js simplicity.
3. **Vanilla JS + FastAPI:** Ruled out due to weaker UI state and animation ergonomics.

## Decisions & Builder Calls
- **Duplicate topic clicks:** Appends at the bottom of the conversation history and smoothly scrolls to the newest message, while showing a subtle visited check/indicator on the pill buttons.
- **Resume PDF:** Serve `assets/Ziyad Fouda Resume.pdf` from `public/Ziyad_Fouda_Resume.pdf` and provide a quick download link in the header and `Me` card.
- **Clean labels:** Replace Stitch debug strings (`Using image-0dbefd.png`, `Using image-e576f1.png`) with clean labels (`4 Featured Systems`, `6 Verified Credentials`).
