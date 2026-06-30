// ============================================================
// Curriculum registry — the single source of truth for every LIVE course.
// Each subject curriculum (Maths, Biology, …) is a plain data module; this
// file stitches them together and exposes the helpers the UI relies on so a
// lesson, its progress and its free/premium gating work the same way across
// every subject.
//
// To make another subject live: build its `<subject>Curriculum.js` data file
// in the same shape, import it here, add it to CURRICULA, and flip its
// `status` to 'live' in ./subjects.js.
// ============================================================
import { MATHS } from './mathsCurriculum.js'
import { BIOLOGY } from './biologyCurriculum.js'

// Lessons in weeks 1–FREE_WEEKS are free for every subject; later weeks unlock
// with premium. Keeping it here means one place governs the freemium line.
export const FREE_WEEKS = 3

// slug → curriculum data. Order is the order subjects are listed.
export const CURRICULA = {
  [MATHS.slug]: MATHS,
  [BIOLOGY.slug]: BIOLOGY,
}

export const curriculumBySlug = (slug) => CURRICULA[slug]

// Flatten one subject's units into a lesson list, tagging each lesson with the
// unit + subject it belongs to (used for breadcrumbs and "next lesson" links).
export function lessonsForSlug(slug) {
  const c = CURRICULA[slug]
  if (!c) return []
  return c.units.flatMap((u) =>
    u.lessons.map((l) => ({ ...l, unitId: u.id, unitTitle: u.title, subjectSlug: slug }))
  )
}

// Every lesson across every live subject. Lesson ids are globally unique
// (e.g. m-l1, bio-l1), so progress keyed by lesson id never collides.
export const allLessons = Object.keys(CURRICULA).flatMap(lessonsForSlug)

export const lessonById = (id) => allLessons.find((l) => l.id === id)

export const isFreeLesson = (lesson) => lesson.week <= FREE_WEEKS

// Per-subject counts for marketing/summary copy.
export function subjectTotals(slug) {
  const lessons = lessonsForSlug(slug)
  return {
    lessons: lessons.length,
    questions: lessons.reduce((n, l) => n + l.questions.length, 0),
  }
}

// Combined counts across every live subject.
export const totalLessons = allLessons.length
export const totalQuestions = allLessons.reduce((n, l) => n + l.questions.length, 0)
