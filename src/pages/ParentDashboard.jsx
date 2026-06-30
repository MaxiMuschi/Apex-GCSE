import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../api/client.js'
import { CURRICULA } from '../data/curriculum.js'
import { subjectStats, lessonStats } from '../lib/progress.js'
import ProgressRing from '../components/ProgressRing.jsx'

export default function ParentDashboard() {
  const { user } = useAuth()
  const [children, setChildren] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    api.parentChildren()
      .then((res) => { if (active) setChildren(res.children || []) })
      .catch((err) => { if (active) setError(err.message || 'Could not load progress.') })
    return () => { active = false }
  }, [])

  return (
    <div className="wrap section parent">
      <div className="page-head rise">
        <span className="eyebrow">Parent dashboard</span>
        <h1 className="display-xl">Following {children?.length === 1 ? 'one learner' : 'your learners'}.</h1>
        <p className="muted page-lead">
          See exactly where each student is across every AQA course — which lessons are
          mastered, where they’re stuck, and what to nudge next.
        </p>
      </div>

      {error && <p className="err">{error}</p>}

      {children === null && (
        <div className="child-card">
          <div className="skeleton" style={{ height: 28, width: 200, marginBottom: 14 }} />
          <div className="skeleton" style={{ height: 80 }} />
        </div>
      )}

      {children && children.length === 0 && (
        <div className="empty-state card">
          <h3>No learners linked yet</h3>
          <p className="muted">
            When a student signs up and starts studying, their progress will appear here.
            Share Apex GCSE with your child to get started.
          </p>
          <Link to="/signup" className="btn btn-primary">Invite a student</Link>
        </div>
      )}

      <div className="child-list">
        {children?.map((child) => {
          const stats = subjectStats(child.progress)
          // Surface the units (across every live subject) where the child has
          // the most room to grow.
          const weakest = Object.values(CURRICULA)
            .flatMap((c) =>
              c.units.map((u) => {
                const ls = u.lessons.map((l) => lessonStats(l, child.progress))
                const total = ls.reduce((n, s) => n + s.total, 0)
                const correct = ls.reduce((n, s) => n + s.correct, 0)
                return {
                  key: `${c.slug}-${u.id}`,
                  title: u.title,
                  subject: c.name,
                  pct: total ? Math.round((correct / total) * 100) : 0,
                }
              })
            )
            .sort((a, b) => a.pct - b.pct)

          return (
            <div key={child.id} className="child-card rise">
              <div className="child-top">
                <div className="child-id">
                  <span className="child-avatar">{child.name?.[0]?.toUpperCase() || 'S'}</span>
                  <div>
                    <strong>{child.name}</strong>
                    <span className="muted small">{child.yearGroup} · {child.plan === 'premium' ? 'Premium' : 'Free'} plan</span>
                  </div>
                </div>
                <div className="child-ring">
                  <ProgressRing value={stats.pct} size={72} stroke={7} />
                  <span className="muted small">overall</span>
                </div>
              </div>

              <div className="child-stats">
                <div><strong>{stats.lessonsComplete}</strong><span className="muted small">/ {stats.lessonsTotal} lessons mastered</span></div>
                <div><strong>{stats.correct}</strong><span className="muted small">/ {stats.total} questions correct</span></div>
              </div>

              <div className="child-units">
                <span className="eyebrow">By unit</span>
                {weakest.map((u) => (
                  <div key={u.key} className="cu-row">
                    <span>{u.subject} · {u.title}</span>
                    <div className="cu-track"><div className="cu-fill" style={{ width: `${u.pct}%` }} /></div>
                    <span className="cu-pct">{u.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
