import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from '../components/Logo.jsx'

export default function Login() {
  const { login, hasBackend } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const dest = location.state?.from || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

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
            <p className="auth-note">Preview mode: use the email and password you signed up with in this browser.</p>
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
