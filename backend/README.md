# CyberLearn — Backend

A small Express API for the CyberLearn frontend. It's a companion piece for
the portfolio project — the frontend runs fine on its own with `localStorage`,
but this shows the same data model (agents, case files, drills, badges,
leaderboard) as a real server with auth, in case you want to wire the two
together or just want a backend folder to point to.

Data is kept in memory (see `models/userStore.js` and `data/`), so it resets
every time the server restarts. Swap `userStore.js` for a real database layer
(Postgres + Prisma, MongoDB + Mongoose, etc.) and every route keeps working
unchanged, since routes only ever call the functions that file exports.

## Running it

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Server starts on `http://localhost:4000` by default.

## API overview

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | — | Liveness check |
| POST | `/api/auth/signup` | — | `{ username }` → creates an agent, returns a JWT |
| POST | `/api/auth/login` | — | `{ username }` → returns a JWT for an existing agent |
| GET | `/api/auth/me` | ✅ | Current agent's profile |
| GET | `/api/challenges` | — | List all case files (flags stripped) |
| GET | `/api/challenges/:id` | — | One case file (flag stripped) |
| POST | `/api/challenges/:id/submit` | ✅ | `{ flag }` → checks the flag, awards XP + badges |
| GET | `/api/quizzes` | — | List all drills (correct answers stripped) |
| GET | `/api/quizzes/:id` | — | One drill (correct answers stripped) |
| POST | `/api/quizzes/:id/submit` | ✅ | `{ answers: number[] }` → scores it, awards XP + badges |
| GET | `/api/badges` | ✅ | All badge definitions with `earned: true/false` for the current agent |
| GET | `/api/leaderboard` | — | Fictional agents + any real signed-up agents, sorted by XP |

Auth is a bearer JWT: send `Authorization: Bearer <token>` on protected
routes, using the token returned by `/signup` or `/login`. There's no
password field yet — signing in with a callsign is enough, matching the
frontend's zero-friction demo signup. Add a password to `userStore.js`
(the `hash`/`compareHash` helpers using bcrypt are already there) to turn
this into real authentication.

## Folder structure

```
backend/
├── server.js              # App entry point, mounts routes
├── routes/                # Express routers (thin — just wire path → controller)
├── controllers/           # Request handlers / business logic
├── middleware/
│   ├── auth.js             # JWT sign + requireAuth guard
│   └── errorHandler.js     # 404 + central error handler
├── models/
│   └── userStore.js        # In-memory "database" for agents
└── data/                   # Static content: challenges, quizzes, badges, leaderboard bots
```

## Not implemented (by design, for a portfolio-scale demo)

- No persistent database — data resets on restart.
- No password auth — see note above.
- No rate limiting / input sanitization beyond basic type checks.
- No tests.

These are exactly the kind of "next steps" worth mentioning if this comes up
in an interview — the structure is set up so each one is a contained change.
