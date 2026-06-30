# Apex Academy — GCSE Self-Study Platform

A Vite + React single-page app for AQA GCSE self-study. Students work through a
specification unit by unit, answer auto-marked questions, and track mastery;
parents follow progress from a dedicated dashboard. Weeks 1–3 of every subject
are free, and a one-off M-Pesa payment unlocks the full course.

## Live subjects

| Subject | Spec | Status |
| --- | --- | --- |
| Mathematics | AQA 8300 | ✅ Live — 6 units, 13 lessons |
| Biology | AQA 8461 | ✅ Live — 4 units, 8 lessons |
| Chemistry, Physics, English Language, English Literature, Computer Science, Geography | various | 🚧 Coming soon |

> "Coming soon" subjects appear on the marketing pages but are not clickable and
> cannot be opened — only subjects with a curriculum in
> `src/data/curriculum.js` and `status: 'live'` in `src/data/subjects.js` are
> reachable.

## Running locally

```bash
npm install
npm run dev      # http://localhost:8889
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Demo mode vs. production

The frontend talks to the Apex Render backend (Express + Postgres + JWT) via
`VITE_API_URL`. See `.env.example`.

- **`VITE_API_URL` unset → demo mode.** Auth, progress and the M-Pesa upgrade
  are simulated in the browser's `localStorage`. The app pre-seeds the trial
  logins below so every area is reachable with no backend. Nothing is shared
  between browsers, and no real payment is taken.
- **`VITE_API_URL` set → production.** Real accounts, real saved progress, and
  real Safaricom Daraja STK-push payments. The trial logins do **not** exist on
  the live backend.

## Trial logins (demo mode only)

Use these to route into every area before real passwords are set. They are
seeded automatically in demo mode, and the login screen lets you tap one to
fill the form.

| Area | Email | Password |
| --- | --- | --- |
| Student — free (weeks 1–3) | `student@apex.demo` | `apexstudent` |
| Student — premium (all weeks) | `premium@apex.demo` | `apexpremium` |
| Parent — progress dashboard | `parent@apex.demo` | `apexparent` |

> ⚠️ These are **temporary trial accounts for the demo build only**. They give
> access purely so studies are reachable pre-launch. Before going live with a
> real backend, create real accounts there and **remove or rotate these
> credentials** — see the launch checklist. They are defined in
> `src/api/demoBackend.js` (`TRIAL_ACCOUNTS`).

## Launch checklist

### Configuration
- [ ] Point `VITE_API_URL` at the production Render backend.
- [ ] Confirm the backend implements the routes in `src/api/client.js`
      (`/api/auth/*`, `/api/gcse/progress`, `/api/gcse/parent/children`,
      `/api/payments/mpesa/stk-push`).
- [ ] Verify CORS on the backend allows the deployed frontend origin.

### Accounts & access
- [ ] Create real student / parent accounts on the backend.
- [ ] Remove or rotate the demo trial accounts (`TRIAL_ACCOUNTS` in
      `src/api/demoBackend.js`) so they cannot be relied on in production.
- [ ] Confirm the `/parent` route is restricted to the `parent` role
      (enforced in the UI; the backend must scope `parent/children` to the
      parent's own learners).

### Payments
- [ ] Connect the live Safaricom Daraja credentials on the backend.
- [ ] Run one real end-to-end M-Pesa STK push and confirm the plan upgrades to
      `premium`.

### Content
- [ ] Proof-read every live lesson's teaching and answer keys.
- [ ] Decide which "coming soon" subjects launch with content (add a
      `<subject>Curriculum.js`, register it in `curriculum.js`, flip `status`
      to `live` in `subjects.js`).

### Build & deploy
- [ ] `npm run build` passes with no errors.
- [ ] Netlify build command/publish dir match `netlify.toml`
      (`npm run build` → `dist`).
- [ ] SPA redirect (`/* → /index.html`) is live so deep links resolve.

## Project structure

```
src/
  api/         client.js (live + demo fallback), demoBackend.js (trial accounts)
  components/  Nav, Footer, QuestionPlayer, ProtectedRoute, …
  context/     AuthContext.jsx
  data/        subjects.js, curriculum.js (registry), mathsCurriculum.js, biologyCurriculum.js
  lib/         progress.js
  pages/       Landing, Subjects, SubjectView, LessonView, Dashboard, ParentDashboard, Pricing, …
```

### Adding a new subject
1. Create `src/data/<subject>Curriculum.js` using the same `unit → lesson →
   (topics + questions)` shape as `biologyCurriculum.js`.
2. Import it and add it to `CURRICULA` in `src/data/curriculum.js`.
3. Set that subject's `status` to `'live'` in `src/data/subjects.js`.

Lesson ids must be globally unique (e.g. `bio-l1`) so per-question progress
never collides across subjects.
