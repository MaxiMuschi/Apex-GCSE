import { Link } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects.js'
import { totalLessons, totalQuestions, FREE_WEEKS } from '../data/mathsCurriculum.js'

export default function Landing() {
  return (
    <div className="landing">
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy stagger">
            <span className="eyebrow">Apex Academy · GCSE · AQA specifications</span>
            <h1 className="display-xxl">
              Climb to the<br />
              <span className="hero-emph">top grade,</span> one<br />
              topic at a time.
            </h1>
            <p className="hero-lead">
              Self-study built for Kenyan students sitting AQA GCSEs. Short lessons,
              instant feedback and progress that follows you everywhere — the same
              platform that powers Apex Academy KS3, now for Years 10 and 11.
            </p>
            <div className="hero-cta">
              <Link to="/signup" className="btn btn-primary">Start free for {FREE_WEEKS} weeks</Link>
              <Link to="/subjects/maths" className="btn btn-ghost">Explore Maths →</Link>
            </div>
            <div className="hero-stats">
              <div><strong>{totalLessons}</strong><span>Maths lessons</span></div>
              <div><strong>{totalQuestions}</strong><span>practice questions</span></div>
              <div><strong>8</strong><span>AQA subjects</span></div>
            </div>
          </div>

          <div className="hero-card rise">
            <div className="hc-bar">
              <span className="hc-dot" /><span className="hc-dot" /><span className="hc-dot" />
              <span className="hc-title">Mathematics · 8300</span>
            </div>
            <div className="hc-body">
              <div className="hc-q">Solve 5x − 4 = 2x + 11</div>
              <div className="hc-steps">
                <span>5x − 2x = 11 + 4</span>
                <span>3x = 15</span>
                <span className="hc-ans">x = 5 ✓</span>
              </div>
              <div className="hc-progress">
                <div className="hc-track"><div className="hc-fill" style={{ width: '72%' }} /></div>
                <span>Algebra · 72% mastered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="section how">
        <div className="wrap">
          <span className="eyebrow">How Apex works</span>
          <h2 className="display-xl">A clear path from <span className="serif-italic">stuck</span> to <span className="serif-italic">sure</span>.</h2>
          <div className="how-grid stagger">
            <div className="how-step">
              <span className="how-num">01</span>
              <h3>Learn the idea</h3>
              <p>Every lesson opens with a tight, exam-focused explanation — no walls of text, just what the AQA spec rewards.</p>
            </div>
            <div className="how-step">
              <span className="how-num">02</span>
              <h3>Practise with feedback</h3>
              <p>Answer questions and find out instantly. Get it wrong and the worked solution appears, so you fix the gap on the spot.</p>
            </div>
            <div className="how-step">
              <span className="how-num">03</span>
              <h3>Watch progress grow</h3>
              <p>Mastery is saved to your account and visible to a parent, so revision never loses momentum between sessions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Subjects ---------- */}
      <section className="section subjects-band">
        <div className="wrap">
          <div className="band-head">
            <div>
              <span className="eyebrow">Eight subjects</span>
              <h2 className="display-xl">Maths is live. The rest are on their way.</h2>
            </div>
            <Link to="/subjects" className="btn btn-ink">See all subjects</Link>
          </div>
          <div className="subject-strip">
            {SUBJECTS.map((s) => (
              <Link
                key={s.slug}
                to={s.status === 'live' ? `/subjects/${s.slug}` : '/subjects'}
                className={`strip-card ${s.status}`}
              >
                <span className="strip-glyph" style={{ background: s.accent }}>{s.glyph}</span>
                <div className="strip-meta">
                  <strong>{s.name}</strong>
                  <span className="muted small">{s.spec}</span>
                </div>
                <span className={`chip ${s.status === 'live' ? 'chip-free' : 'chip-soon'}`}>
                  {s.status === 'live' ? 'Available' : 'Coming soon'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pricing teaser ---------- */}
      <section className="section pricing-teaser">
        <div className="wrap pt-grid">
          <div>
            <span className="eyebrow">Fair, freemium pricing</span>
            <h2 className="display-xl">Weeks 1–{FREE_WEEKS} are free. Forever.</h2>
            <p className="muted">
              Start every subject without paying a shilling. When you reach week {FREE_WEEKS + 1},
              unlock the full course with a single M-Pesa payment — no card, no subscription traps.
            </p>
            <Link to="/pricing" className="btn btn-primary">See pricing</Link>
          </div>
          <div className="pt-card">
            <div className="pt-row"><span>Weeks 1–{FREE_WEEKS}</span><strong className="free">Free</strong></div>
            <div className="pt-row"><span>Full course (weeks {FREE_WEEKS + 1}+)</span><strong>Premium</strong></div>
            <div className="pt-row"><span>Parent progress dashboard</span><strong className="free">Included</strong></div>
            <div className="pt-row"><span>Pay with</span><strong>M-Pesa</strong></div>
          </div>
        </div>
      </section>
    </div>
  )
}
