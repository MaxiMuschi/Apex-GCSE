import { Link } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects.js'
import { totalLessons, totalQuestions } from '../data/mathsCurriculum.js'

export default function Subjects() {
  const live = SUBJECTS.filter((s) => s.status === 'live')
  const soon = SUBJECTS.filter((s) => s.status === 'soon')

  return (
    <div className="wrap section">
      <div className="page-head rise">
        <span className="eyebrow">The Apex GCSE curriculum</span>
        <h1 className="display-xl">Eight AQA subjects, built the same careful way.</h1>
        <p className="muted page-lead">
          We go deep before we go wide. Mathematics is fully built — {totalLessons} lessons and
          {' '}{totalQuestions} questions across the whole specification. The other seven subjects
          are being written to the same standard and open through the year.
        </p>
      </div>

      <h2 className="dash-h2">Available now</h2>
      <div className="subject-grid stagger">
        {live.map((s) => (
          <Link key={s.slug} to={`/subjects/${s.slug}`} className="sg-card live tall">
            <div className="sg-top">
              <span className="sg-glyph" style={{ background: s.accent }}>{s.glyph}</span>
              <span className="chip chip-free">Available</span>
            </div>
            <h3>{s.name}</h3>
            <span className="muted small">{s.spec} · Foundation & Higher</span>
            <p className="sg-tag">{s.tagline}</p>
            <span className="sg-link">Open course →</span>
          </Link>
        ))}
      </div>

      <h2 className="dash-h2" style={{ marginTop: '3rem' }}>Coming soon</h2>
      <div className="subject-grid stagger">
        {soon.map((s) => (
          <div key={s.slug} className="sg-card soon">
            <div className="sg-top">
              <span className="sg-glyph" style={{ background: s.accent }}>{s.glyph}</span>
              <span className="chip chip-soon">Soon</span>
            </div>
            <h3>{s.name}</h3>
            <span className="muted small">{s.spec}</span>
            <p className="sg-tag">{s.tagline}</p>
            <span className="muted small sg-soon">In development</span>
          </div>
        ))}
      </div>
    </div>
  )
}
