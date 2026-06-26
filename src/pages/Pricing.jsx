import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../api/client.js'
import { FREE_WEEKS } from '../data/mathsCurriculum.js'

const FREE_FEATURES = [
  'Weeks 1–3 of every subject',
  'Full lesson teaching & worked solutions',
  'Progress saved to your account',
  'Parent dashboard access',
]
const PREMIUM_FEATURES = [
  'Everything in Free, plus…',
  'All weeks of the full AQA course',
  'Every unit: number to statistics',
  'New subjects the day they launch',
  'Priority on new practice questions',
]

export default function Pricing() {
  const { user, upgradeToPremium } = useAuth()
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('idle') // idle | sending | success | error
  const [message, setMessage] = useState('')

  const isPremium = user?.plan === 'premium'

  async function pay(e) {
    e.preventDefault()
    if (!/^(?:\+?254|0)?7\d{8}$/.test(phone.replace(/\s/g, ''))) {
      setState('error'); setMessage('Enter a valid Safaricom number, e.g. 0712 345678.'); return
    }
    setState('sending'); setMessage('')
    try {
      const res = await api.startMpesa({ phone, plan: 'premium' })
      setState('success')
      setMessage(res.message || 'Payment confirmed. Premium unlocked.')
      upgradeToPremium({ plan: 'premium' })
    } catch (err) {
      setState('error'); setMessage(err.message || 'Payment could not be completed.')
    }
  }

  return (
    <div className="wrap section pricing">
      <div className="page-head center rise">
        <span className="eyebrow">Pricing</span>
        <h1 className="display-xl">Start free. Upgrade when you’re ready.</h1>
        <p className="muted page-lead" style={{ margin: '0 auto' }}>
          The first {FREE_WEEKS} weeks of every subject are free, for good. One M-Pesa payment
          unlocks the entire course — no subscription, no card needed.
        </p>
      </div>

      <div className="plan-grid">
        {/* Free */}
        <div className="plan-card">
          <span className="chip chip-free">Free</span>
          <div className="plan-price"><strong>KES 0</strong><span className="muted">/ forever</span></div>
          <ul className="plan-list">
            {FREE_FEATURES.map((f) => <li key={f}>{f}</li>)}
          </ul>
          {user ? (
            <span className="btn btn-ghost btn-block" aria-disabled>Your current free access</span>
          ) : (
            <Link to="/signup" className="btn btn-ghost btn-block">Create free account</Link>
          )}
        </div>

        {/* Premium */}
        <div className="plan-card featured">
          <span className="chip chip-premium">Premium</span>
          <div className="plan-price"><strong>KES 750</strong><span className="muted">/ term · one-off</span></div>
          <ul className="plan-list">
            {PREMIUM_FEATURES.map((f) => <li key={f}>{f}</li>)}
          </ul>

          {isPremium ? (
            <div className="pay-done">
              <strong>You’re on Premium.</strong>
              <Link to="/subjects/maths" className="btn btn-primary btn-block">Continue learning</Link>
            </div>
          ) : !user ? (
            <Link to="/signup" className="btn btn-primary btn-block">Sign up to upgrade</Link>
          ) : state === 'success' ? (
            <div className="pay-done rise">
              <strong>Premium unlocked.</strong>
              <p className="muted small">{message}</p>
              <Link to="/subjects/maths" className="btn btn-primary btn-block">Start a premium lesson</Link>
            </div>
          ) : (
            <form className="pay-form" onSubmit={pay}>
              <div className="field">
                <label htmlFor="phone">M-Pesa phone number</label>
                <input
                  id="phone" inputMode="tel" placeholder="0712 345678"
                  value={phone} onChange={(e) => setPhone(e.target.value)}
                  disabled={state === 'sending'}
                />
              </div>
              {state === 'error' && <p className="err">{message}</p>}
              <button className="btn btn-primary btn-block" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending STK push…' : 'Pay with M-Pesa'}
              </button>
              <p className="muted small pay-note">
                You’ll receive a Safaricom prompt on your phone. Enter your M-Pesa PIN to confirm.
              </p>
            </form>
          )}
        </div>
      </div>

      <p className="center muted small" style={{ marginTop: '2rem' }}>
        Payments are processed via the Safaricom Daraja STK Push API on the Apex backend.
      </p>
    </div>
  )
}
