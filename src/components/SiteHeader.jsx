import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Sticky glassmorphism marketing navbar for the Apex Academy GCSE landing page.
// Logo left · links centre · high-contrast "Start Learning" CTA right.
// CSS-only depth, condenses on scroll. Marketing page only — no app logic.
const LINKS = [
  { href: '#subjects', label: 'Subjects' },
  { href: '#advantage', label: 'Why Apex' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export default function SiteHeader({
  logoSrc = '/apex-logo.svg',
  ctaHref = '/signup',
  ctaLabel = 'Start Learning',
  loginHref = '/login',
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`mkt-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="mkt-wrap mkt-header-inner">
        {/* Logo — left */}
        <a href="#top" className="mkt-brand" onClick={close} aria-label="Apex Academy home">
          <img className="mkt-brand-mark" src={logoSrc} width="38" height="38" alt="" />
          <span className="mkt-brand-text">
            <span className="mkt-brand-name">Apex Academy</span>
            <span className="mkt-brand-tag">GCSE · AQA</span>
          </span>
        </a>

        {/* Links — centre (and CTA inside the drawer on mobile) */}
        <nav className={`mkt-nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="mkt-nav-link" onClick={close}>
              {l.label}
            </a>
          ))}
          <Link to={loginHref} className="mkt-header-login" onClick={close}>Log in</Link>
          <Link to={ctaHref} className="mkt-btn mkt-btn-teal mkt-header-cta" onClick={close}>
            {ctaLabel}
          </Link>
        </nav>

        {/* Actions — right (desktop) */}
        <div className="mkt-header-actions">
          <Link to={loginHref} className="mkt-header-login">Log in</Link>
          <Link to={ctaHref} className="mkt-btn mkt-btn-teal mkt-header-cta">{ctaLabel}</Link>
        </div>

        <button
          type="button"
          className={`mkt-burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
