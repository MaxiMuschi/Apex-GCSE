import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects.js'
import SiteHeader from '../components/SiteHeader.jsx'
import '../marketing.css'

/* ----------------------------------------------------------------
   Honest, editable stat placeholders. The user fills these in — no
   numbers are invented here. `placeholder: true` renders the value as
   an obvious "{X}" token so it is easy to find and replace.
   EDIT ME → src/pages/Landing.jsx (STATS)
---------------------------------------------------------------- */
const STATS = [
  { value: '{X}', label: 'Lessons live now', placeholder: true },
  { value: 'AQA', label: 'Fully spec-aligned' },
  { value: 'KES 500', unit: '/mo', label: 'Affordable from' },
  { value: 'Self-paced', label: 'Learn on your schedule' },
]

/* ----------------------------------------------------------------
   "The Apex Advantage" — three pillars. Iconography is inline SVG
   (no emoji), light text on a deep-navy band.
---------------------------------------------------------------- */
const ADVANTAGES = [
  {
    title: 'Structured, spec-aligned lessons',
    text: 'Every lesson maps directly to the AQA Mathematics 8300 specification — sequenced topic by topic, with worked examples and instant feedback so you always know where the marks are.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
        <path d="M14 4v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    title: 'Learn at your own pace',
    text: 'No fixed timetable and no pressure. Open the platform whenever it suits you, repeat any lesson as many times as you need, and pick up exactly where you left off — on a phone, tablet or laptop.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    title: 'Affordable M-Pesa pricing',
    text: 'Pay the way Kenya pays. Unlock the full course with a simple, secure M-Pesa payment — no cards, no contracts, and the first three weeks of every course are free.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M10 6h4M11 18h2" />
      </svg>
    ),
  },
]

const FAQS = [
  {
    q: 'Is it self-paced, or are there fixed class times?',
    a: 'Apex Academy is fully self-paced. There are no live class times to attend — you decide when and how often you study. Lessons stay open around the clock, so you can revise at lunch, in the evening, or all weekend, and the platform remembers exactly where you stopped.',
  },
  {
    q: 'Do I need to be online, and does it work on a phone?',
    a: 'Yes, lessons run online in your web browser, and the whole platform is built mobile-first — so it works beautifully on the phone most students already carry, as well as on a tablet or laptop. All you need is an internet connection.',
  },
  {
    q: 'How much does it cost and how do I pay with M-Pesa?',
    a: 'The first three weeks of every course are free. After that it is KES 500 per month or KES 1,500 per term. Payment is made securely through M-Pesa — you confirm the prompt on your phone and your full access unlocks straight away. No card and no subscription traps.',
  },
  {
    q: 'What does AQA GCSE Maths (8300) cover?',
    a: 'The AQA Mathematics 8300 specification spans six areas: Number; Algebra; Ratio, Proportion and Rates of Change; Geometry and Measures; Probability; and Statistics. Our course works through each of these in order, building from the foundations to exam-style questions with full worked solutions.',
  },
]

const CHECK = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
const ARROW = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

/* ----------------------------------------------------------------
   Lightweight reveal-on-scroll for sections (IntersectionObserver).
---------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = ref.current?.querySelectorAll('.mkt-reveal')
    if (!els?.length) return
    if (reduce) { els.forEach((el) => el.classList.add('is-in')); return }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

/* ----------------------------------------------------------------
   FAQ accordion.
---------------------------------------------------------------- */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="mkt-section mkt-faq" id="faq">
      <div className="mkt-wrap mkt-faq-wrap">
        <div className="mkt-faq-head mkt-reveal">
          <span className="mkt-eyebrow">Good to know</span>
          <h2 className="mkt-h2">Questions, answered.</h2>
          <p className="mkt-lead">
            Everything you need to know before your first lesson. Still curious?
            Reach the team any time.
          </p>
        </div>

        <div className="mkt-accordion mkt-reveal">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className={`mkt-acc-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="mkt-acc-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <span className="mkt-acc-icon" aria-hidden="true" />
                </button>
                <div className="mkt-acc-panel">
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Page.
---------------------------------------------------------------- */
export default function Landing() {
  const orbsRef = useRef(null)
  const revealRef = useReveal()

  // Gentle scroll parallax on the hero orbs (CSS transforms only).
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !orbsRef.current) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const el = orbsRef.current
        if (!el) return
        el.style.setProperty('--p1', `${y * 0.12}px`)
        el.style.setProperty('--p2', `${y * -0.08}px`)
        el.style.setProperty('--p3', `${y * 0.05}px`)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="mkt" id="top" ref={revealRef}>
      {/* ---------- Sticky glassmorphism navbar ---------- */}
      <SiteHeader logoSrc="/apex-logo.svg" ctaHref="/signup" ctaLabel="Start Learning" loginHref="/login" />

      {/* ---------- Hero ---------- */}
      <section className="mkt-hero">
        <div className="mkt-orbs" ref={orbsRef} aria-hidden="true">
          <span className="mkt-orb orb-teal" />
          <span className="mkt-orb orb-gold" />
          <span className="mkt-orb orb-blue" />
          <span className="mkt-grid-lines" />
        </div>

        <div className="mkt-wrap mkt-hero-inner">
          <div className="mkt-hero-copy">
            <span className="mkt-hero-badge">
              <span className="dot" aria-hidden="true" />
              AQA GCSE Maths · Built in Kenya
            </span>
            <h1 className="mkt-hero-title">
              Master GCSE AQA Maths,
              <span className="accent"> Built for Kenyan Students.</span>
            </h1>
            <p className="mkt-hero-lead">
              A premium, self-paced platform for AQA Mathematics (8300) — clear,
              spec-aligned lessons with worked solutions and instant feedback,
              priced for Kenyan families and paid for with M-Pesa.
            </p>
            <div className="mkt-hero-cta">
              <Link to="/subjects" className="mkt-btn mkt-btn-teal">Browse Lessons</Link>
              <Link to="/signup" className="mkt-btn mkt-btn-ghost on-dark">Start Free</Link>
            </div>
            <p className="mkt-hero-trust">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              First three weeks free — no card required.
            </p>
          </div>

          {/* IMAGE SLOT — Hero: a GCSE student studying.
              Replace /public/hero-student.jpg with your own image (portrait,
              ideally 4:5). Update the alt text to describe it. */}
          <div className="mkt-hero-media">
            <span className="mkt-shape mkt-shape-ring" aria-hidden="true" />
            <span className="mkt-shape mkt-shape-dot" aria-hidden="true" />
            <figure className="mkt-hero-frame">
              <img src="/hero-student.jpg" alt="A student studying on the Apex Academy platform" width="640" height="800" />
              <figcaption className="mkt-hero-frame-label">Image slot · replace /hero-student.jpg</figcaption>
            </figure>
            <span className="mkt-float-chip chip-spec" aria-hidden="true">
              <span className="k">Specification</span>
              <span className="v">AQA Maths 8300</span>
            </span>
            <span className="mkt-float-chip chip-free" aria-hidden="true">
              <span className="k">Get started</span>
              <span className="v">Free weeks 1–3</span>
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Stats strip (honest, editable placeholders) ---------- */}
      <section className="mkt-stats">
        <div className="mkt-wrap">
          <div className="mkt-stats-strip mkt-reveal">
            {STATS.map((s) => (
              <div className="mkt-stat" key={s.label}>
                <div className={`mkt-stat-value ${s.placeholder ? 'is-placeholder' : ''}`}>
                  {s.value}
                  {s.unit && <span className="unit">{s.unit}</span>}
                </div>
                <div className="mkt-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Subject / curriculum explorer (AQA only) ---------- */}
      <section className="mkt-section mkt-subjects" id="subjects">
        <div className="mkt-wrap">
          <div className="mkt-subjects-head mkt-reveal">
            <div className="mkt-section-head">
              <span className="mkt-eyebrow">The curriculum · AQA</span>
              <h2 className="mkt-h2">Explore the subjects we teach.</h2>
              <p className="mkt-lead">
                Mathematics (AQA 8300) is live and fully built today. More AQA
                courses are on the way — hover any card to view its syllabus.
              </p>
            </div>
            <Link to="/subjects" className="mkt-btn mkt-btn-ghost">All subjects {ARROW}</Link>
          </div>

          <div className="mkt-subject-grid mkt-reveal">
            {SUBJECTS.map((s) => {
              const live = s.status === 'live'
              const inner = (
                <>
                  <span className="mkt-subject-top">
                    <span className="mkt-subject-glyph" style={{ background: s.accent }}>{s.glyph}</span>
                    <span className={`mkt-chip ${live ? 'is-live' : 'is-soon'}`}>
                      {live ? 'Available now' : 'Coming soon'}
                    </span>
                  </span>
                  <span className="mkt-subject-name">{s.name}</span>
                  <span className="mkt-subject-board">{s.spec}</span>
                  <span className="mkt-subject-desc">{s.tagline}</span>
                  <span className="mkt-subject-syllabus">
                    {live ? <>View syllabus {ARROW}</> : 'In development'}
                  </span>
                </>
              )
              // Only live subjects link through to a real course page; coming-soon
              // subjects render as a non-clickable card so nothing dead-ends.
              return live ? (
                <Link
                  key={s.slug}
                  to={`/subjects/${s.slug}`}
                  className="mkt-subject-card is-featured"
                >
                  {inner}
                </Link>
              ) : (
                <div key={s.slug} className="mkt-subject-card is-soon" aria-disabled="true">
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- The Apex Advantage ---------- */}
      <section className="mkt-section mkt-advantage" id="advantage">
        <div className="mkt-wrap">
          <div className="mkt-section-head center mkt-reveal">
            <span className="mkt-eyebrow on-dark" style={{ justifyContent: 'center' }}>Why Apex Academy</span>
            <h2 className="mkt-h2 on-dark">The Apex advantage.</h2>
            <p className="mkt-lead on-dark">
              A focused, exam-ready way to study — designed around how Kenyan
              students actually learn, revise and pay.
            </p>
          </div>

          <div className="mkt-adv-grid mkt-reveal">
            {ADVANTAGES.map((a, i) => (
              <article className="mkt-adv-card" key={a.title}>
                <span className="mkt-adv-index">0{i + 1}</span>
                <span className="mkt-adv-icon">{a.icon}</span>
                <h3 className="mkt-adv-title">{a.title}</h3>
                <p className="mkt-adv-text">{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pricing ---------- */}
      <section className="mkt-section mkt-pricing" id="pricing">
        <div className="mkt-wrap">
          <div className="mkt-section-head center mkt-reveal">
            <span className="mkt-eyebrow" style={{ justifyContent: 'center' }}>Fair, transparent pricing</span>
            <h2 className="mkt-h2">One price. The whole course.</h2>
          </div>

          <div className="mkt-free-banner mkt-reveal">
            <span aria-hidden="true">{CHECK}</span>
            <span><strong>Weeks 1–3 are free</strong> — start learning today, pay only when you are ready.</span>
          </div>

          <div className="mkt-plans mkt-reveal">
            <article className="mkt-plan">
              <span className="mkt-plan-name">Monthly</span>
              <div className="mkt-plan-price"><span className="cur">KES</span><strong>500</strong><small>/month</small></div>
              <p className="mkt-plan-note">Stay flexible — perfect for a focused revision push.</p>
              <ul className="mkt-plan-list">
                <li>{CHECK} Full access to every live lesson</li>
                <li>{CHECK} Worked solutions &amp; instant feedback</li>
                <li>{CHECK} Learn at your own pace, any device</li>
                <li>{CHECK} Pay with M-Pesa · cancel any time</li>
              </ul>
              <Link to="/signup" className="mkt-btn mkt-btn-ghost mkt-btn-block">Choose monthly</Link>
            </article>

            <article className="mkt-plan is-featured">
              <span className="mkt-plan-flag">Best value</span>
              <span className="mkt-plan-name">Per term</span>
              <div className="mkt-plan-price"><span className="cur">KES</span><strong>1,500</strong><small>/term</small></div>
              <p className="mkt-plan-note">Three months of momentum — one month free versus monthly.</p>
              <ul className="mkt-plan-list">
                <li>{CHECK} Everything in Monthly</li>
                <li>{CHECK} Uninterrupted access all term</li>
                <li>{CHECK} Best value for exam season</li>
                <li>{CHECK} Pay once with M-Pesa</li>
              </ul>
              <Link to="/signup" className="mkt-btn mkt-btn-primary mkt-btn-block">Start learning</Link>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <Faq />

      {/* ---------- Closing CTA ---------- */}
      <section className="mkt-section mkt-final">
        <div className="mkt-wrap mkt-final-inner mkt-reveal">
          <img src="/apex-logo.svg" alt="" width="56" height="56" aria-hidden="true" />
          <h2 className="mkt-h2 on-dark">Your best grade starts with one lesson.</h2>
          <p>Join Apex Academy and turn ambition into results — starting with three weeks free.</p>
          <div className="mkt-final-cta">
            <Link to="/signup" className="mkt-btn mkt-btn-primary">Start Free</Link>
            <Link to="/subjects" className="mkt-btn mkt-btn-ghost on-dark">Browse Lessons</Link>
          </div>
        </div>
      </section>

      {/* ---------- Footer (4 columns) ---------- */}
      <footer className="mkt-footer">
        <div className="mkt-wrap">
          <div className="mkt-footer-grid">
            <div className="mkt-footer-brand">
              <span className="mkt-footer-mark">
                <img src="/apex-logo.svg" alt="" width="40" height="40" aria-hidden="true" />
                <span>Apex Academy</span>
              </span>
              <p className="mkt-footer-blurb">
                Premium, self-paced GCSE study for Kenyan students — AQA-aligned
                Mathematics with worked solutions, instant feedback and simple
                M-Pesa pricing.
              </p>
              {/* SOCIAL — TikTok handle supplied by the brief. */}
              <a className="mkt-social" href="https://www.tiktok.com/@apexacademy.ke" target="_blank" rel="noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 3c.4 2.3 1.8 3.9 4 4.2v2.6c-1.5.1-2.9-.3-4.2-1v6.1c0 3.4-2.5 5.8-5.7 5.8-3 0-5.3-2.2-5.3-5.1 0-3 2.4-5.2 5.6-5 .2 0 .4 0 .6.1v2.8c-.2-.1-.5-.1-.8-.1-1.4 0-2.5 1-2.5 2.3 0 1.4 1.1 2.4 2.4 2.4 1.5 0 2.6-1.1 2.6-2.9V3h2.9Z" />
                </svg>
                @apexacademy.ke
              </a>
            </div>

            <div className="mkt-footer-col">
              <h5>Quick links</h5>
              <Link to="/subjects">Browse lessons</Link>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
              <Link to="/signup">Start free</Link>
              <Link to="/login">Log in</Link>
            </div>

            <div className="mkt-footer-col mkt-footer-contact">
              <h5>Contact</h5>
              {/* CONTACT — replace with your real details. */}
              <a href="mailto:hello@apexacademy.co.ke">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                hello@apexacademy.co.ke
              </a>
              <span>+254 7XX XXX XXX</span>
              <span>Nairobi, Kenya</span>
              <span>Mon–Sat · 8am–6pm</span>
            </div>

            <div className="mkt-footer-col">
              <h5>Curriculum · AQA</h5>
              <Link to="/subjects/maths">Mathematics · 8300</Link>
              <span>Sciences · coming soon</span>
              <span>English · coming soon</span>
              <span>More AQA subjects soon</span>
            </div>
          </div>

          <div className="mkt-footer-base">
            <span>© {new Date().getFullYear()} Apex Academy · Nairobi, Kenya</span>
            <span>AQA is the awarding body; Apex Academy is an independent study platform.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
