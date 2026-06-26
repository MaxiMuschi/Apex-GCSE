import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Sticky marketing nav bar for the Apex Academy landing page. Navy/gold brand,
// CSS-only depth, condenses on scroll. Part of the marketing page only.
const LINKS = [
  { href: '#subjects', label: 'Subjects' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export default function SiteHeader({
  logoSrc = '/apex-logo.svg',
  ctaHref = '/signup',
  ctaLabel = 'Start learning',
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
        <a href="#top" className="mkt-brand" onClick={close} aria-label="Apex Academy home">
          <img className="mkt-brand-mark" src={logoSrc} width="38" height="38" alt="" />
          <span className="mkt-brand-text">
            <span className="mkt-brand-name">Apex Academy</span>
            <span className="mkt-brand-tag">KS3 &amp; GCSE</span>
          </span>
        </a>

        <button
          type="button"
          className={`mkt-burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <nav className={`mkt-nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="mkt-nav-link" onClick={close}>
              {l.label}
            </a>
          ))}
          <Link to={ctaHref} className="mkt-btn mkt-btn-primary mkt-header-cta" onClick={close}>
            {ctaLabel}
          </Link>
        </nav>
      </div>
    </header>
  )
}
