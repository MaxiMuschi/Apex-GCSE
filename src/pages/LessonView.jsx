import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { lessonById, allLessons, isFreeLesson } from '../data/mathsCurriculum.js'
import { lessonStats } from '../lib/progress.js'
import QuestionPlayer from '../components/QuestionPlayer.jsx'

export default function LessonView() {
  const { lessonId } = useParams()
  const { user, progress, recordAnswer } = useAuth()
  const lesson = lessonById(lessonId)
  const [showTeach, setShowTeach] = useState(true)

  if (!lesson) return <Navigate to="/subjects/maths" replace />

  const locked = !isFreeLesson(lesson) && user.plan !== 'premium'
  const stats = lessonStats(lesson, progress)
  const answered = progress?.[lesson.id]?.answered || {}

  // Next lesson for the "up next" footer.
  const idx = allLessons.findIndex((l) => l.id === lesson.id)
  const next = allLessons[idx + 1]
  const nextOpen = next && (isFreeLesson(next) || user.plan === 'premium')

  if (locked) {
    return (
      <div className="wrap section lesson-gate">
        <div className="gate-card rise">
          <span className="eyebrow">Premium lesson</span>
          <h1 className="display-xl">“{lesson.title}” is part of the full course.</h1>
          <p className="muted">
            This lesson is in week {lesson.week}. Free study covers weeks 1–3 — unlock every
            week with a one-off M-Pesa payment and keep your streak going.
          </p>
          <div className="gate-actions">
            <Link to="/pricing" className="btn btn-primary">Unlock premium</Link>
            <Link to="/subjects/maths" className="btn btn-ghost">Back to Maths</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wrap section lesson-view">
      <nav className="crumbs">
        <Link to="/subjects/maths">Mathematics</Link> <span>/</span> {lesson.unitTitle}
      </nav>

      <header className="lesson-header rise">
        <div>
          <span className="eyebrow">Week {lesson.week} · {lesson.minutes} min</span>
          <h1 className="display-xl">{lesson.title}</h1>
          <p className="muted page-lead">{lesson.summary}</p>
        </div>
        <div className="lesson-meter">
          <div className="meter-track"><div className="meter-fill" style={{ width: `${stats.pct}%` }} /></div>
          <span className="muted small">{stats.correct}/{stats.total} correct</span>
        </div>
      </header>

      {/* Teaching */}
      <section className="teach card">
        <button className="teach-toggle" onClick={() => setShowTeach((v) => !v)}>
          <span className="eyebrow">Learn the idea</span>
          <span>{showTeach ? '−' : '+'}</span>
        </button>
        {showTeach && (
          <div className="teach-body">
            {lesson.topics.map((t, i) => (
              <div key={i} className="topic">
                <h3>{t.heading}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Questions */}
      <section className="questions">
        <h2 className="dash-h2">Practice</h2>
        <div className="q-stack">
          {lesson.questions.map((q, i) => (
            <QuestionPlayer
              key={q.id}
              question={q}
              index={i}
              total={lesson.questions.length}
              savedCorrect={answered[q.id]?.correct}
              onAnswered={(correct) => recordAnswer({ lessonId: lesson.id, questionId: q.id, correct })}
            />
          ))}
        </div>
      </section>

      {/* Footer nav */}
      <div className="lesson-footer">
        {stats.complete && <p className="lesson-done">Lesson mastered — every question correct.</p>}
        {next ? (
          nextOpen ? (
            <Link to={`/subjects/maths/${next.id}`} className="btn btn-ink">Next: {next.title} →</Link>
          ) : (
            <Link to="/pricing" className="btn btn-primary">Unlock the next lesson →</Link>
          )
        ) : (
          <Link to="/dashboard" className="btn btn-ink">Back to dashboard</Link>
        )}
      </div>
    </div>
  )
}
