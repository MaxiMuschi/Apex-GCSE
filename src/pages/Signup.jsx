import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from '../components/Logo.jsx'

export default function Signup() {
  const { signup, hasBackend } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const dest = location.state?.from || '/dashboard'

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', yearGroup: 'Year 10' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setBusy(true)
    try {
      await signup(form)
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.message || 'Could not create your account.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth">
      <div className="auth-aside">
        <Link to="/"><Logo size={32} light /></Link>
        <h2 className="display-xl auth-aside-title">Your climb starts with a free account.</h2>
        <ul className="auth-points">
          <li>Weeks 1–3 of every subject, free</li>
          <li>Progress saved across every device</li>
          <li>A parent can follow along, lesson by lesson</li>
        </ul>
        <p className="muted-on-ink small">Already on Apex KS3? GCSE is a separate login — create a fresh account here.</p>
      </div>

      <div className="auth-main">
        <div className="auth-card">
          <span className="eyebrow">Create your account</span>
          <h1 className="auth-title">Join Apex Academy GCSE</h1>
          {!hasBackend && (
            <p className="auth-note">Preview mode: accounts are stored in this browser so you can explore the full app.</p>
          )}
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" value={form.name} onChange={set('name')} required placeholder="e.g. Amani Wanjiru" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={set('email')} required placeholder="you@email.com" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={form.password} onChange={set('password')} required placeholder="At least 6 characters" />
            </div>
            <div className="auth-row">
              <div className="field">
                <label htmlFor="role">I am a…</label>
                <select id="role" value={form.role} onChange={set('role')}>
                  <option value="student">Student</option>
                  <option value="parent">Parent / guardian</option>
                </select>
              </div>
              {form.role === 'student' && (
                <div className="field">
                  <label htmlFor="year">Year group</label>
                  <select id="year" value={form.yearGroup} onChange={set('yearGroup')}>
                    <option>Year 10</option>
                    <option>Year 11</option>
                  </select>
                </div>
              )}
            </div>
            {error && <p className="err" role="alert">{error}</p>}
            <button className="btn btn-primary btn-block" disabled={busy}>
              {busy ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <p className="auth-alt">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  )
}
