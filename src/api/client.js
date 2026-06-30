// ============================================================
// API client — talks to the existing Apex Academy Render backend
// (Express + Postgres + JWT). Configure the base URL with VITE_API_URL.
//
// When VITE_API_URL is unset, or the backend is unreachable, the client
// transparently falls back to a localStorage-backed demo mode so the
// deploy preview is fully explorable without the production backend.
// ============================================================

const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const TOKEN_KEY = 'apex_gcse_token'

export const hasBackend = Boolean(BASE)

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const t = getToken()
    if (t) headers.Authorization = `Bearer ${t}`
  }
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.message || data.error || `Request failed (${res.status})`)
  }
  return data
}

// ----- Live backend calls (used when VITE_API_URL is set) -----
const live = {
  register: (payload) => request('/api/auth/register', { method: 'POST', body: payload, auth: false }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: payload, auth: false }),
  me: () => request('/api/auth/me'),
  getProgress: () => request('/api/gcse/progress'),
  saveProgress: (payload) => request('/api/gcse/progress', { method: 'POST', body: payload }),
  parentChildren: () => request('/api/gcse/parent/children'),
  startMpesa: (payload) => request('/api/payments/mpesa/stk-push', { method: 'POST', body: payload }),
}

// ----- Demo fallback (localStorage) -----
import * as demo from './demoBackend.js'

// Wrap each call: prefer the live backend, but if it is not configured or the
// network call fails, fall back to the demo backend so the UI keeps working.
function withFallback(liveFn, demoFn) {
  return async (...args) => {
    if (!hasBackend) return demoFn(...args)
    try {
      return await liveFn(...args)
    } catch (err) {
      // Network / CORS / cold-start failures → demo mode, not a hard crash.
      if (err instanceof TypeError) return demoFn(...args)
      throw err
    }
  }
}

export const api = {
  register: withFallback(live.register, demo.register),
  login: withFallback(live.login, demo.login),
  me: withFallback(live.me, demo.me),
  getProgress: withFallback(live.getProgress, demo.getProgress),
  saveProgress: withFallback(live.saveProgress, demo.saveProgress),
  parentChildren: withFallback(live.parentChildren, demo.parentChildren),
  startMpesa: withFallback(live.startMpesa, demo.startMpesa),
}

// Pre-seed trial logins, but ONLY in demo mode — a configured live backend
// owns its own accounts and must never be seeded from the browser.
export function seedTrialAccounts() {
  if (!hasBackend) demo.seedTrialAccounts()
}

// Trial credentials, surfaced in the UI (demo mode only) so testers can sign in.
export const TRIAL_ACCOUNTS = demo.TRIAL_ACCOUNTS
