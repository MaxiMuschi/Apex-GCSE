import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { SUBJECTS } from '../data/subjects.js'
import { MATHS, allLessons, isFreeLesson } from '../data/mathsCurriculum.js'
import { subjectStats, lessonStats } from '../lib/progress.js'
import ProgressRing from '../components/ProgressRing.jsx'

export default function Dashboard() {
  const { user, progress } = useAuth()
  const stats = subjectStats(progress)

  // Next recommended lesson: first not-yet-complete lesson the user can access.
  const next = allLessons.find((l) => !lessonStats(l, progress).complete && (isFreeLesson(l) || user.plan === 'premium'))

  const firstName = user.name?.split(' ')[0] || 'there'

  return (
    <div className="wrap section dash">
      <div className="dash-head rise">
        <div>
          <span className="eyebrow">Your dashboard</span>
          <h1 className="display-xl">Habari, {firstName}.</h1>
          <p className="muted">
            {stats.lessonsComplete === 0
              ? 'Let’s get the first lesson under your belt.'
              : `You’ve mastered ${stats.lessonsComplete} of ${stats.lessonsTotal} Maths lessons. Keep climbing.`}
          </p>
        </div>
        <span className={`chip ${user.plan === 'premium' ? 'chip-premium' : 'chip-free'}`}>
          {user.plan === 'premium' ? 'Premium' : 'Free plan'}
        </span>
      </div>

      {/* Snapshot */}
      <div className="dash-snapshot stagger">
        <div className="snap-card">
          <ProgressRing value={stats.pct} size={84} stroke={8} />
          <div>
            <strong>{stats.pct}%</strong>
            <span className="muted small">Maths mastery</span>
          </div>
        </div>
        <div className="snap-card">
          <div className="snap-figure">{stats.lessonsComplete}<small>/{stats.lessonsTotal}</small></div>
          <span className="muted small">Lessons complete</span>
        </div>
        <div className="snap-card">
          <div className="snap-figure">{stats.correct}<small>/{stats.total}</small></div>
          <span className="muted small">Questions correct</span>
        </div>
        {next ? (
          <Link to={`/subjects/maths/${next.id}`} className="snap-card snap-next">
            <span className="eyebrow">Continue</span>
            <strong>{next.title}</strong>
            <span className="muted small">{next.unitTitle} · {next.minutes} min</span>
            <span className="snap-go">Resume →</span>
          </Link>
        ) : (
          <div className="snap-card snap-next done">
            <span className="eyebrow">Nice work</span>
            <strong>All open lessons mastered</strong>
            <span className="muted small">Unlock more with premium</span>
          </div>
        )}
      </div>

      {/* Subjects */}
      <div className="dash-section">
        <h2 className="dash-h2">Your subjects</h2>
        <div className="subject-grid">
          {SUBJECTS.map((s) => {
            const live = s.status === 'live'
            const card = (
              <>
                <div className="sg-top">
                  <span className="sg-glyph" style={{ background: s.accent }}>{s.glyph}</span>
                  {live
                    ? <ProgressRing value={stats.pct} size={46} stroke={5} color={s.accent} />
                    : <span className="chip chip-soon">Soon</span>}
                </div>
                <h3>{s.name}</h3>
                <span className="muted small">{s.spec}</span>
                <p className="sg-tag">{s.tagline}</p>
                {live
                  ? <span className="sg-link">Open course →</span>
                  : <span className="muted small sg-soon">In development</span>}
              </>
            )
            return live ? (
              <Link key={s.slug} to={`/subjects/${s.slug}`} className="sg-card live">{card}</Link>
            ) : (
              <div key={s.slug} className="sg-card soon">{card}</div>
            )
          })}
        </div>
      </div>

      <p className="dash-foot muted small">
        Studying {MATHS.tiers} tier content aligned to the {MATHS.spec} specification.
      </p>
    </div>
  )
}
