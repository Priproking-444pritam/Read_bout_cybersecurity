import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext.jsx'
import { quizzes } from '../data/quizzes.js'

export default function QuizDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { completeQuiz, showToast } = useGame()
  const quiz = quizzes.find((q) => q.id === id)

  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!quiz) {
    return (
      <div className="page">
        <p>That drill doesn't exist. <Link to="/quizzes">Back to drills</Link></p>
      </div>
    )
  }

  const question = quiz.questions[qIndex]
  const isLast = qIndex === quiz.questions.length - 1

  const handleSelect = (optIndex) => {
    if (revealed) return
    setSelected(optIndex)
    setRevealed(true)
    if (optIndex === question.answer) setCorrectCount((c) => c + 1)
  }

  const handleNext = () => {
    if (isLast) {
      const finalCorrect = correctCount
      completeQuiz(quiz.id, finalCorrect, quiz.questions.length)
      showToast(`+${finalCorrect * quiz.xpPerCorrect} XP — drill complete`)
      setFinished(true)
    } else {
      setQIndex((i) => i + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  const restart = () => {
    setQIndex(0)
    setSelected(null)
    setRevealed(false)
    setCorrectCount(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((correctCount / quiz.questions.length) * 100)
    return (
      <div className="page quiz-detail">
        <div className="card result-card">
          <div className="eyebrow">DRILL COMPLETE</div>
          <h1>{correctCount} / {quiz.questions.length} correct</h1>
          <p className="muted">{pct}% score · +{correctCount * quiz.xpPerCorrect} XP earned</p>
          <div className="solved-actions">
            <button className="btn btn--ghost" onClick={restart}>Retake drill</button>
            <button className="btn btn--primary" onClick={() => navigate('/quizzes')}>
              Back to drills →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page quiz-detail">
      <Link to="/quizzes" className="link-arrow link-arrow--back">← All drills</Link>
      <div className="page-head">
        <div className="eyebrow">{quiz.category}</div>
        <h1>{quiz.title}</h1>
      </div>

      <div className="quiz-progress-row">
        Question {qIndex + 1} of {quiz.questions.length}
      </div>

      <div className="card question-card">
        <h3>{question.q}</h3>
        <div className="options">
          {question.options.map((opt, i) => {
            let cls = 'option'
            if (revealed) {
              if (i === question.answer) cls += ' is-correct'
              else if (i === selected) cls += ' is-wrong'
            } else if (i === selected) {
              cls += ' is-selected'
            }
            return (
              <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                {opt}
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className="question-feedback">
            <p>{selected === question.answer ? '✅ Correct.' : '❌ Not quite.'} {' '}
              The right answer is: <strong>{question.options[question.answer]}</strong>
            </p>
            <button className="btn btn--primary" onClick={handleNext}>
              {isLast ? 'See results →' : 'Next question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
