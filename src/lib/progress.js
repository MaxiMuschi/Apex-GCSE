// Progress helpers shared across the dashboard, subject and lesson views.
import { allLessons } from '../data/curriculum.js'

// A lesson counts as "complete" when every question has been answered correctly.
export function lessonStats(lesson, progress) {
  const record = progress?.[lesson.id]
  const answered = record?.answered || {}
  const total = lesson.questions.length
  const correct = lesson.questions.filter((q) => answered[q.id]?.correct).length
  const attempted = lesson.questions.filter((q) => answered[q.id]).length
  return {
    total,
    correct,
    attempted,
    complete: total > 0 && correct === total,
    started: attempted > 0,
    pct: total ? Math.round((correct / total) * 100) : 0,
  }
}

// Aggregate stats over a set of lessons. Defaults to every live lesson, or
// pass a subject's lesson list (lessonsForSlug) for per-subject mastery.
export function subjectStats(progress, lessons = allLessons) {
  let correct = 0
  let total = 0
  let lessonsComplete = 0
  for (const lesson of lessons) {
    const s = lessonStats(lesson, progress)
    correct += s.correct
    total += s.total
    if (s.complete) lessonsComplete += 1
  }
  return {
    correct,
    total,
    lessonsComplete,
    lessonsTotal: lessons.length,
    pct: total ? Math.round((correct / total) * 100) : 0,
  }
}
