import { Link, useParams, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { subjectBySlug } from '../data/subjects.js'
import { MATHS, isFreeLesson, FREE_WEEKS } from '../data/mathsCurriculum.js'
import { lessonStats, subjectStats } from '../lib/progress.js'
import ProgressRing from '../components/ProgressRing.jsx'

export default function SubjectView() {
  const { slug } = useParams()
  const { user, progress } = useAuth()
  const subject = subjectBySlug(slug)

  if (!subject || subject.status !== 'live') {
    return <Navigate to="/subjects" replace />
  }

  const isPremium = user?.plan === 'premium'
  const stats = subjectStats(progress)

  return (
    <div className="wrap section subject-view">
      <nav className="crumbs"><Link to="/subjects">Subjects</Link> <span>/</span> {subject.name}</nav>

      <header className="subject-hero rise">
        <div>
          <span className="eyebrow">{subject.spec} · Foundation & Higher</span>
          <h1 className="display-xl">{subject.name}</h1>
          <p className="muted page-lead">
            Work through the specification unit by unit. Weeks 1–{FREE_WEEKS} are free;
            later weeks unlock with premium. Master every question in a lesson to mark it complete.
          </p>
        </div>
        {user && (
          <div className="subject-progress">
            <ProgressRing value={stats.pct} size={92} stroke={9} color={subject.accent} />
            <span className="muted small">{stats.lessonsComplete}/{stats.lessonsTotal} lessons mastered</span>
          </div>
        )}
      </header>

      <div className="units">
        {MATHS.units.map((unit, ui) => (
          <section key={unit.id} className="unit">
            <div className="unit-head">
              <span className="unit-index">{String(ui + 1).padStart(2, '0')}</span>
              <div>
                <h2>{unit.title}</h2>
                <p className="muted small">{unit.blurb}</p>
              </div>
            </div>
            <div className="lesson-list">
              {unit.lessons.map((lesson) => {
                const free = isFreeLesson(lesson)
                const locked = !free && !isPremium
                const s = lessonStats(lesson, progress)
                const inner = (
                  <>
                    <div className="ll-left">
                      <span className={`ll-status ${s.complete ? 'done' : s.started ? 'partial' : ''} ${locked ? 'locked' : ''}`}>
                        {s.complete ? (
                          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M2 7.5 5.5 11 12 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        ) : locked ? (
                          <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true"><rect x="2.5" y="6" width="9" height="6.5" rx="1.3" fill="currentColor" /><path d="M4.3 6V4.4a2.7 2.7 0 0 1 5.4 0V6" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
                        ) : null}
                      </span>
                      <div>
                        <strong>{lesson.title}</strong>
                        <span className="muted small">Week {lesson.week} · {lesson.minutes} min · {lesson.questions.length} questions</span>
                      </div>
                    </div>
                    <div className="ll-right">
                      <span className={`chip ${free ? 'chip-free' : 'chip-premium'}`}>{free ? 'Free' : 'Premium'}</span>
                      {user && s.total > 0 && (
                        <span className="ll-pct">{s.correct}/{s.total}</span>
                      )}
                      <span className="ll-go">{locked ? 'Unlock' : 'Open'} →</span>
                    </div>
                  </>
                )
                if (!user) {
                  return <Link key={lesson.id} to="/login" state={{ from: `/subjects/${slug}/${lesson.id}` }} className="lesson-row">{inner}</Link>
                }
                if (locked) {
                  return <Link key={lesson.id} to="/pricing" className="lesson-row locked">{inner}</Link>
                }
                return <Link key={lesson.id} to={`/subjects/${slug}/${lesson.id}`} className="lesson-row">{inner}</Link>
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
