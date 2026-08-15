# CyberLearn

A gamified cybersecurity learning platform built as a portfolio project — an
original design inspired by the concept of "learn security by doing," not a
copy of any existing site.

## What's inside

- **Landing page** with an animated terminal-boot hero and a one-field signup (just an "agent callsign" — no backend, no real accounts).
- **Dashboard** showing level, XP, streak, next case file / drill to tackle, and recent badges.
- **Case files** — 6 capture-the-flag style challenges (encoding, phishing, cryptography, SQL injection, XSS, brute-force log analysis). Each has a briefing, a piece of "evidence," an optional hint, and a flag to submit. Solving one unlocks an explainer on the real-world concept.
- **Drills** — 4 five-question multiple-choice quizzes (networking, social engineering, cryptography, web app security) with instant feedback and the correct answer shown after each question.
- **Badges** — 8 unlockable badges tied to real milestones (first solve, perfect quiz score, reaching level 5/10, streaks, etc).
- **Leaderboard** — your XP ranked against a set of fictional agents.

All progress (XP, level, solved challenges, completed drills, badges, streak)
is saved to `localStorage` in your browser, so it persists between visits on
the same device. There is no backend or database — everything runs client-side.

## Backend

There's a companion Express API in `backend/` — auth (JWT, sign in with just
a callsign), and endpoints for case files, drills, badges, and the
leaderboard that mirror the frontend's data and XP/badge logic. It runs
in-memory (no database setup needed) and is fully documented in
`backend/README.md`. The frontend above doesn't call it — it's there as a
standalone reference/backend piece for the project, not wired in by default.

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Running it locally

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd cyberlearn
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview
```

## Project structure

```
cyberlearn/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Routes
    ├── index.css             # Full design system (tokens, layout, components)
    ├── context/
    │   └── GameContext.jsx   # XP, levels, badges, localStorage persistence
    ├── data/
    │   ├── challenges.js     # The 6 CTF-style case files
    │   ├── quizzes.js        # The 4 knowledge drills
    │   ├── badges.js         # Badge definitions + unlock conditions
    │   └── leaderboard.js    # Fictional agents for the leaderboard
    ├── components/
    │   ├── Navbar.jsx
    │   ├── ProgressBar.jsx
    │   ├── Toast.jsx         # "+XP" toast on solves/completions
    │   └── BadgeUnlock.jsx   # Celebration modal on new badge
    └── pages/
        ├── Landing.jsx
        ├── Dashboard.jsx
        ├── Challenges.jsx / ChallengeDetail.jsx
        ├── Quizzes.jsx / QuizDetail.jsx
        ├── Badges.jsx
        └── Leaderboard.jsx
```

## Extending it

Everything content-related lives in `src/data/` — add a new object to
`challenges.js` or `quizzes.js` and it automatically appears in its list page,
counts toward badge progress, and works with the existing solve/quiz flow. No
other code changes needed for new content.

Ideas for going further: swap `localStorage` for a real backend + auth,
add a timer/scoring multiplier to case files, add a "daily challenge," or
add difficulty-based unlock gating.
