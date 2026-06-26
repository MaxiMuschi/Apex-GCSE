import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects.js'
import SiteHeader from '../components/SiteHeader.jsx'
import FounderWelcome from '../components/FounderWelcome.jsx'
import '../marketing.css'

/* ----------------------------------------------------------------
   KS3 vs GCSE curriculum, for the tabbed switcher.
---------------------------------------------------------------- */
const CURRICULUM = {
  ks3: {
    label: 'KS3',
    years: 'Years 7–9',
    headline: 'Lay an unshakeable foundation.',
    blurb:
      'The building blocks that make GCSE feel easy — taught with the same clarity and instant feedback, one confident step at a time.',
    strands: [
      { name: 'Number & Algebra', detail: 'Fluency with fractions, negatives, ratio and the first taste of equations.' },
      { name: 'Reading & Writing', detail: 'Comprehension, vocabulary and structured writing that travels into GCSE English.' },
      { name: 'Working Scientifically', detail: 'Cells, forces, particles and the habit of testing ideas with evidence.' },
      { name: 'Shape & Space', detail: 'Angles, area, transformations and the geometric instinct exams reward.' },
    ],
  },
  gcse: {
    label: 'GCSE',
    years: 'Years 10–11',
    headline: 'Convert effort into the grade.',
    blurb:
      'AQA-aligned courses built around exam command words, mark schemes and worked solutions that show exactly where the marks live.',
    strands: [
      { name: 'AQA Mathematics 8300', detail: 'Number, algebra, geometry, ratio, probability and statistics — fully live today.' },
      { name: 'Sciences (8461–8463)', detail: 'Biology, Chemistry and Physics scaffolded to the AQA specifications.' },
      { name: 'English Lang & Lit', detail: 'Reading, creative and transactional writing, set texts and poetry.' },
      { name: 'Computer Science 8525', detail: 'Algorithms, programming, data representation and networks.' },
    ],
  },
}

const FAQS = [
  {
    q: 'How much does Apex Academy cost?',
    a: 'A single learner is KES 500 per month, or KES 1,500 per term — saving you a month across each term. The first weeks of every course are free, so you can see the platform working before you pay a shilling.',
  },
  {
    q: 'Is the curriculum aligned to AQA?',
    a: 'Yes. Our GCSE courses follow the AQA specifications, and every lesson is written around the command words and mark schemes examiners actually use.',
  },
  {
    q: 'Can parents follow their child’s progress?',
    a: 'Absolutely. A parent dashboard shows mastery per subject and per unit, so you always know where your child is strong and where to focus next.',
  },
  {
    q: 'How do I pay?',
    a: 'Payments run on M-Pesa — no card and no subscription traps. You unlock the full course with a single, secure mobile-money payment.',
  },
  {
    q: 'Does it work on a phone?',
    a: 'Every part of Apex Academy is built mobile-first, so lessons, practice and progress work beautifully on the phone most students already carry.',
  },
]

/* ----------------------------------------------------------------
   Expandable subjects grid — reveals the full eight on click and
   lets each card open to show its detail.
---------------------------------------------------------------- */
function SubjectsGrid() {
  const [showAll, setShowAll] = useState(false)
  const [open, setOpen] = useState(null)
  const visible = showAll ? SUBJECTS : SUBJECTS.slice(0, 4)

  return (
    <section className="mkt-section mkt-subjects" id="subjects">
      <div className="mkt-wrap">
        <div className="mkt-section-head">
          <span className="mkt-eyebrow">Eight subjects · one platform</span>
          <h2 className="mkt-h2">Pick a subject. Start climbing.</h2>
          <p className="mkt-section-lead">
            Mathematics is fully live today. The rest are scaffolded and arriving fast —
            tap any card to see what’s inside.
          </p>
        </div>

        <div className={`mkt-subject-grid ${showAll ? 'is-expanded' : ''}`}>
          {visible.map((s, i) => {
            const isOpen = open === s.slug
            return (
              <button
                key={s.slug}
                type="button"
                className={`mkt-subject-card tilt ${isOpen ? 'is-open' : ''} ${s.status}`}
                style={{ '--reveal-delay': `${(i % 4) * 60}ms` }}
                onClick={() => setOpen(isOpen ? null : s.slug)}
                aria-expanded={isOpen}
              >
                <span className="mkt-subject-top">
                  <span className="mkt-subject-glyph" style={{ background: s.accent }}>
                    {s.glyph}
                  </span>
                  <span className={`mkt-chip ${s.status === 'live' ? 'is-live' : 'is-soon'}`}>
                    {s.status === 'live' ? 'Available' : 'Coming soon'}
                  </span>
                </span>
                <span className="mkt-subject-name">{s.name}</span>
                <span className="mkt-subject-spec">{s.spec}</span>
                <span className="mkt-subject-detail" aria-hidden={!isOpen}>
                  <span className="mkt-subject-detail-inner">{s.tagline}</span>
                </span>
                <span className="mkt-subject-cue">{isOpen ? 'Close −' : 'Details +'}</span>
              </button>
            )
          })}
        </div>

        <div className="mkt-subjects-actions">
          <button
            type="button"
            className="mkt-btn mkt-btn-ghost"
            onClick={() => { setShowAll((v) => !v); setOpen(null) }}
            aria-expanded={showAll}
          >
            {showAll ? 'Show fewer subjects' : `Reveal all ${SUBJECTS.length} subjects`}
          </button>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   KS3 / GCSE curriculum switcher.
---------------------------------------------------------------- */
function CurriculumTabs() {
  const [tab, setTab] = useState('ks3')
  const data = CURRICULUM[tab]

  return (
    <section className="mkt-section mkt-curriculum" id="curriculum">
      <div className="mkt-wrap">
        <div className="mkt-section-head center">
          <span className="mkt-eyebrow mkt-eyebrow-gold">One continuous journey</span>
          <h2 className="mkt-h2 on-dark">From KS3 foundations to GCSE grades.</h2>
        </div>

        <div className="mkt-tabs" role="tablist" aria-label="Curriculum stage">
          {Object.entries(CURRICULUM).map(([key, c]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={`mkt-tab ${tab === key ? 'is-active' : ''}`}
              onClick={() => setTab(key)}
            >
              <strong>{c.label}</strong>
              <span>{c.years}</span>
            </button>
          ))}
          <span className={`mkt-tab-glider ${tab === 'gcse' ? 'right' : ''}`} aria-hidden="true" />
        </div>

        <div className="mkt-tab-panel" role="tabpanel" key={tab}>
          <div className="mkt-tab-intro">
            <h3 className="mkt-h3 on-dark">{data.headline}</h3>
            <p>{data.blurb}</p>
          </div>
          <div className="mkt-strands">
            {data.strands.map((s) => (
              <article key={s.name} className="mkt-strand tilt">
                <h4>{s.name}</h4>
                <p>{s.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   FAQ accordion.
---------------------------------------------------------------- */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="mkt-section mkt-faq" id="faq">
      <div className="mkt-wrap mkt-faq-wrap">
        <div className="mkt-faq-head">
          <span className="mkt-eyebrow">Good to know</span>
          <h2 className="mkt-h2">Questions, answered.</h2>
          <p className="mkt-section-lead">
            Everything you need to know before your first lesson. Still curious?
            Reach the team any time.
          </p>
        </div>

        <div className="mkt-accordion">
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
                  <p>{f.a}</p>
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

  // Gentle scroll parallax on the background orbs (CSS transforms only).
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
    <div className="mkt" id="top">
      {/* ---------- Sticky header ---------- */}
      <SiteHeader logoSrc="/apex-logo.svg" ctaHref="/signup" />

      {/* ---------- Hero ---------- */}
      <section className="mkt-hero">
        <div className="mkt-orbs" ref={orbsRef} aria-hidden="true">
          <span className="mkt-orb orb-gold" />
          <span className="mkt-orb orb-cyan" />
          <span className="mkt-orb orb-navy" />
          <span className="mkt-grid-lines" />
        </div>

        <div className="mkt-wrap mkt-hero-inner">
          <div className="mkt-hero-copy">
            <span className="mkt-hero-badge">
              <img src="/apex-logo.svg" alt="Apex Academy" width="34" height="34" />
              Apex Academy
            </span>
            <h1 className="mkt-hero-title">
              The summit is
              <span className="mkt-hero-accent"> closer </span>
              than you think.
            </h1>
            <p className="mkt-hero-lead">
              Premium KS3 &amp; GCSE self-study for ambitious Kenyan students.
              Crisp lessons, instant feedback and progress that climbs with you —
              built around the AQA specifications.
            </p>
            <div className="mkt-hero-cta">
              <Link to="/signup" className="mkt-btn mkt-btn-primary">Start learning</Link>
              <a href="#subjects" className="mkt-btn mkt-btn-ghost">Explore subjects</a>
            </div>
            <dl className="mkt-hero-stats">
              <div><dt>8</dt><dd>AQA subjects</dd></div>
              <div><dt>KS3 → GCSE</dt><dd>one path</dd></div>
              <div><dt>M-Pesa</dt><dd>simple pricing</dd></div>
            </dl>
          </div>

          <div className="mkt-hero-stack" aria-hidden="true">
            <div className="mkt-float-card card-a tilt">
              <span className="mkt-fc-label">Mathematics · 8300</span>
              <span className="mkt-fc-q">Solve 5x − 4 = 2x + 11</span>
              <span className="mkt-fc-ans">x = 5 ✓</span>
              <span className="mkt-fc-track"><span style={{ width: '72%' }} /></span>
              <span className="mkt-fc-meta">Algebra · 72% mastered</span>
            </div>
            <div className="mkt-float-card card-b tilt">
              <span className="mkt-fc-streak">🔥 12-day streak</span>
              <span className="mkt-fc-meta">Lessons mastered this week</span>
              <strong className="mkt-fc-big">9</strong>
            </div>
            <div className="mkt-float-card card-c tilt">
              <span className="mkt-fc-grade">Predicted</span>
              <strong className="mkt-fc-gradeval">Grade 8</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Founder ---------- */}
      <FounderWelcome name="Maxwell Muhanji" title="Founder & Director, Apex Academy" />

      {/* ---------- Subjects ---------- */}
      <SubjectsGrid />

      {/* ---------- Curriculum tabs ---------- */}
      <CurriculumTabs />

      {/* ---------- Pricing ---------- */}
      <section className="mkt-section mkt-pricing" id="pricing">
        <div className="mkt-wrap">
          <div className="mkt-section-head center">
            <span className="mkt-eyebrow">Fair, transparent pricing</span>
            <h2 className="mkt-h2">One price. Every subject. No surprises.</h2>
            <p className="mkt-section-lead">
              Start free, then choose the rhythm that suits your family. Pay with
              M-Pesa — cancel any time.
            </p>
          </div>

          <div className="mkt-plans">
            <article className="mkt-plan tilt">
              <span className="mkt-plan-name">Monthly</span>
              <div className="mkt-plan-price"><span>KES</span><strong>500</strong><small>/month</small></div>
              <p className="mkt-plan-note">Stay flexible — perfect for a focused revision push.</p>
              <ul className="mkt-plan-list">
                <li>Full access to every live subject</li>
                <li>Instant feedback &amp; worked solutions</li>
                <li>Parent progress dashboard</li>
                <li>Cancel any time</li>
              </ul>
              <Link to="/signup" className="mkt-btn mkt-btn-ghost mkt-btn-block">Choose monthly</Link>
            </article>

            <article className="mkt-plan is-featured tilt">
              <span className="mkt-plan-flag">Best value</span>
              <span className="mkt-plan-name">Per term</span>
              <div className="mkt-plan-price"><span>KES</span><strong>1,500</strong><small>/term</small></div>
              <p className="mkt-plan-note">Three months of momentum — one month free vs monthly.</p>
              <ul className="mkt-plan-list">
                <li>Everything in Monthly</li>
                <li>Uninterrupted access all term</li>
                <li>Priority access to new subjects</li>
                <li>Best value for exam season</li>
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
        <div className="mkt-wrap mkt-final-inner">
          <img src="/apex-logo.svg" alt="" width="56" height="56" aria-hidden="true" />
          <h2 className="mkt-h2 on-dark">Your best grade starts with one lesson.</h2>
          <p>Join Apex Academy and turn ambition into results — today.</p>
          <Link to="/signup" className="mkt-btn mkt-btn-primary">Start learning</Link>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="mkt-footer">
        <div className="mkt-wrap">
          <div className="mkt-footer-grid">
            <div className="mkt-footer-brand">
              <span className="mkt-footer-mark">
                <img src="/apex-logo.svg" alt="" width="40" height="40" aria-hidden="true" />
                <span>Apex Academy</span>
              </span>
              <p className="mkt-footer-blurb">
                Premium KS3 &amp; GCSE self-study for ambitious Kenyan students —
                AQA-aligned lessons, instant feedback and progress that climbs with you.
              </p>
            </div>
            <div className="mkt-footer-col">
              <h5>Learn</h5>
              <a href="#subjects">Subjects</a>
              <a href="#curriculum">Curriculum</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="mkt-footer-col">
              <h5>Account</h5>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Create account</Link>
              <Link to="/parent">Parents</Link>
            </div>
            <div className="mkt-footer-col">
              <h5>Apex</h5>
              <a href="https://apexacademy.co.ke" target="_blank" rel="noreferrer">KS3 platform</a>
              <span>Nairobi, Kenya</span>
              <span>Pay with M-Pesa</span>
            </div>
          </div>
          <div className="mkt-footer-base">
            <span>© {new Date().getFullYear()} Apex Academy</span>
            <span>AQA is the awarding body; Apex Academy is an independent study platform.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
