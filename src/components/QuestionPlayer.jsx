import { useState } from 'react'

// Normalises short/standard-form answers for forgiving comparison.
function norm(s) {
  return String(s).toLowerCase().replace(/\s+/g, '').replace(/×/g, 'x').replace(/−/g, '-')
}

function checkAnswer(question, value) {
  if (question.type === 'mcq') return Number(value) === question.answer
  if (question.type === 'numeric') {
    const n = parseFloat(String(value).replace(/[^0-9.\-]/g, ''))
    if (Number.isNaN(n)) return false
    const tol = question.tolerance ?? 0.0001
    return Math.abs(n - question.answer) <= tol
  }
  // short answer — accept any listed variant
  const accepted = Array.isArray(question.answer) ? question.answer : [question.answer]
  return accepted.some((a) => norm(a) === norm(value))
}

export default function QuestionPlayer({ question, index, total, savedCorrect, onAnswered }) {
  const [choice, setChoice] = useState(null)
  const [text, setText] = useState('')
  const [result, setResult] = useState(savedCorrect != null ? (savedCorrect ? 'correct' : 'incorrect') : null)
  const [showSolution, setShowSolution] = useState(false)

  const locked = result === 'correct'

  function submit() {
    const value = question.type === 'mcq' ? choice : text
    if (question.type === 'mcq' && choice == null) return
    if (question.type !== 'mcq' && !text.trim()) return
    const correct = checkAnswer(question, value)
    setResult(correct ? 'correct' : 'incorrect')
    if (!correct) setShowSolution(true)
    onAnswered?.(correct)
  }

  return (
    <div className={`q-card ${result || ''}`}>
      <div className="q-head">
        <span className="q-counter">Q{index + 1} <span className="muted">/ {total}</span></span>
        <span className="chip">{question.marks} mark{question.marks > 1 ? 's' : ''}</span>
      </div>
      <p className="q-prompt">{question.prompt}</p>

      {question.type === 'mcq' && (
        <div className="q-options">
          {question.options.map((opt, i) => {
            const state =
              result && i === question.answer ? 'right'
              : result === 'incorrect' && i === choice ? 'wrong'
              : choice === i ? 'picked' : ''
            return (
              <button
                key={i}
                className={`q-option ${state}`}
                disabled={locked}
                onClick={() => !locked && setChoice(i)}
              >
                <span className="q-bullet">{String.fromCharCode(65 + i)}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>
      )}

      {question.type !== 'mcq' && (
        <input
          className="q-input"
          placeholder={question.type === 'numeric' ? 'Type your numeric answer' : 'Type your answer'}
          value={text}
          disabled={locked}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
        />
      )}

      <div className="q-actions">
        {!locked && (
          <button className="btn btn-ink" onClick={submit}>Check answer</button>
        )}
        {result && (
          <button className="btn btn-ghost" onClick={() => setShowSolution((s) => !s)}>
            {showSolution ? 'Hide' : 'Show'} solution
          </button>
        )}
        {result === 'correct' && <span className="q-flag correct">Correct</span>}
        {result === 'incorrect' && <span className="q-flag wrong">Not quite — try again</span>}
      </div>

      {showSolution && (
        <div className="q-solution rise">
          <span className="eyebrow">Worked solution</span>
          <p>{question.solution}</p>
        </div>
      )}
    </div>
  )
}
