import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { TRIAL_ACCOUNTS } from '../api/client.js'
import Logo from '../components/Logo.jsx'

// Short, friendly label for each trial account.
const TRIAL_LABELS = {
  'student@apex.demo': 'Student · free (weeks 1–3)',
  'premium@apex.demo': 'Student · premium (all weeks)',
  'parent@apex.demo': 'Parent · progress dashboard',
}

export default function Login() {
  const { login, hasBackend } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const dest = location.state?.from || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  // One click drops a trial login into the form, ready to submit.
  const useTrial = (acc) => () => { setForm({ email: acc.email, password: acc.password }); setError('') }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login(form)
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.message || 'Could not log you in.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth-aside">
        <Link to="/"><Logo size={32} light /></Link>
        <h2 className="display-xl auth-aside-title">Welcome back. Pick up where you left off.</h2>
        <ul className="auth-points">
          <li>Your mastery and streak are exactly as you left them</li>
          <li>Jump straight into the next unmastered topic</li>
          <li>Premium unlocks every week of the course</li>
        </ul>
      </div>

      <div className="auth-main">
        <div className="auth-card">
          <span className="eyebrow">Log in</span>
          <h1 className="auth-title">Welcome back to Apex GCSE</h1>
          {!hasBackend && (
            <div className="auth-note">
              <p style={{ margin: 0 }}>
                Preview mode — sign in with a trial account (tap to fill), or use an
                email and password you created in this browser.
              </p>
              <ul className="trial-list">
                {TRIAL_ACCOUNTS.map((acc) => (
                  <li key={acc.email}>
                    <button type="button" className="trial-chip" onClick={useTrial(acc)}>
                      <strong>{TRIAL_LABELS[acc.email] || acc.role}</strong>
                      <span>{acc.email} · {acc.password}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={set('email')} required placeholder="you@email.com" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={form.password} onChange={set('password')} required placeholder="Your password" />
            </div>
            {error && <p className="err" role="alert">{error}</p>}
            <button className="btn btn-primary btn-block" disabled={busy}>
              {busy ? 'Logging in…' : 'Log in'}
            </button>
          </form>
          <p className="auth-alt">New to Apex GCSE? <Link to="/signup">Create an account</Link></p>
        </div>
      </div>
    </div>
  )
}
