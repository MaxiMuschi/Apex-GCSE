// ============================================================
// Demo backend — a localStorage-backed stand-in for the Render API.
// Lets the deploy preview run end-to-end (signup, login, progress,
// parent view, M-Pesa upgrade) without the production backend.
// Every function mirrors the shape the live backend returns.
// ============================================================

const USERS_KEY = 'apex_gcse_demo_users'
const PROGRESS_KEY = 'apex_gcse_demo_progress'
const TOKEN_KEY = 'apex_gcse_token'

const read = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback } catch { return fallback }
}
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v))
const wait = (ms = 380) => new Promise((r) => setTimeout(r, ms))

// A demo token simply encodes the user id; the live backend issues a real JWT.
const makeToken = (id) => `demo.${id}`
const idFromToken = (t) => (t && t.startsWith('demo.') ? t.slice(5) : null)

// ----- Trial accounts -----
// Pre-seeded logins so every area (free study, premium study, parent view) is
// reachable before real passwords are issued. These exist ONLY in demo mode
// (VITE_API_URL unset). Swap them for real backend accounts at launch.
export const TRIAL_ACCOUNTS = [
  {
    id: 'seed-student', name: 'Trial Student', email: 'student@apex.demo',
    password: 'apexstudent', role: 'student', yearGroup: 'Year 10', plan: 'free',
  },
  {
    id: 'seed-premium', name: 'Trial Premium', email: 'premium@apex.demo',
    password: 'apexpremium', role: 'student', yearGroup: 'Year 11', plan: 'premium',
  },
  {
    id: 'seed-parent', name: 'Trial Parent', email: 'parent@apex.demo',
    password: 'apexparent', role: 'parent', yearGroup: null, plan: 'free',
  },
]

// Idempotently inject the trial accounts. Safe to call on every load: existing
// accounts (matched by email) are never overwritten, so a learner's own
// progress and any upgrades are preserved.
export function seedTrialAccounts() {
  const users = read(USERS_KEY, {})
  let changed = false
  for (const acc of TRIAL_ACCOUNTS) {
    if (!Object.values(users).some((u) => u.email === acc.email)) {
      users[acc.id] = { ...acc, enrolledAt: new Date().toISOString(), children: [] }
      changed = true
    }
  }
  if (changed) write(USERS_KEY, users)
}

function currentUser() {
  const id = idFromToken(localStorage.getItem(TOKEN_KEY))
  if (!id) throw new Error('Not authenticated')
  const users = read(USERS_KEY, {})
  const u = users[id]
  if (!u) throw new Error('Session expired')
  return u
}

function publicUser(u) {
  const { password, ...safe } = u
  return safe
}

export async function register({ name, email, password, role = 'student', yearGroup }) {
  await wait()
  const users = read(USERS_KEY, {})
  const key = email.toLowerCase()
  if (Object.values(users).some((u) => u.email === key)) {
    throw new Error('An account with that email already exists.')
  }
  const id = `u_${Date.now().toString(36)}`
  const user = {
    id,
    name,
    email: key,
    password,
    role,
    yearGroup: yearGroup || 'Year 10',
    plan: 'free',
    enrolledAt: new Date().toISOString(),
    children: [],
  }
  users[id] = user
  write(USERS_KEY, users)
  return { token: makeToken(id), user: publicUser(user) }
}

export async function login({ email, password }) {
  await wait()
  const users = read(USERS_KEY, {})
  const user = Object.values(users).find((u) => u.email === email.toLowerCase())
  if (!user || user.password !== password) {
    throw new Error('Incorrect email or password.')
  }
  return { token: makeToken(user.id), user: publicUser(user) }
}

export async function me() {
  await wait(160)
  return { user: publicUser(currentUser()) }
}

export async function getProgress() {
  await wait(160)
  const user = currentUser()
  const all = read(PROGRESS_KEY, {})
  return { progress: all[user.id] || {} }
}

// payload: { lessonId, questionId, correct }
export async function saveProgress({ lessonId, questionId, correct }) {
  await wait(120)
  const user = currentUser()
  const all = read(PROGRESS_KEY, {})
  const mine = all[user.id] || {}
  const lesson = mine[lessonId] || { answered: {}, completedAt: null }
  lesson.answered[questionId] = { correct: !!correct, at: new Date().toISOString() }
  mine[lessonId] = lesson
  all[user.id] = mine
  write(PROGRESS_KEY, all)
  return { progress: mine }
}

export async function parentChildren() {
  await wait(220)
  // Demo parent view: surface every student account with their progress so the
  // dashboard has something meaningful to render in the preview.
  const users = read(USERS_KEY, {})
  const allProgress = read(PROGRESS_KEY, {})
  const students = Object.values(users).filter((u) => u.role === 'student')
  return {
    children: students.map((s) => ({
      id: s.id,
      name: s.name,
      yearGroup: s.yearGroup,
      plan: s.plan,
      progress: allProgress[s.id] || {},
    })),
  }
}

// Simulated M-Pesa Daraja STK push. The live backend performs the real
// Safaricom Daraja call; here we just acknowledge and upgrade the plan.
export async function startMpesa({ phone }) {
  await wait(900)
  const user = currentUser()
  const users = read(USERS_KEY, {})
  users[user.id] = { ...user, plan: 'premium' }
  write(USERS_KEY, users)
  return {
    status: 'success',
    message: `STK push sent to ${phone}. Demo payment confirmed — premium unlocked.`,
    plan: 'premium',
  }
}
