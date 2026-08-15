import React from 'react'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext.jsx'
import { quizzes } from '../data/quizzes.js'

export default function Quizzes() {
  const { state } = useGame()

  return (
    <div className="page">
      <div className="page-head">
        <div className="eyebrow">KNOWLEDGE DRILLS</div>
        <h1>Drills.</h1>
        <p className="muted">
          Five questions each, straight to the point. Get instant feedback and an explanation
          for every answer. {state.completedQuizzes.length}/{quizzes.length} completed.
        </p>
      </div>

      <div className="quiz-grid">
        {quizzes.map((q) => {
          const done = state.completedQuizzes.includes(q.id)
          const perfect = state.perfectQuizzes.includes(q.id)
          return (
            <Link to={`/quizzes/${q.id}`} key={q.id} className={`quiz-card ${done ? 'is-done' : ''}`}>
              <div className="quiz-card__top">
                <span className="quiz-card__category">{q.category}</span>
                {perfect && <span className="quiz-card__perfect">★ PERFECT</span>}
              </div>
              <h3>{q.title}</h3>
              <p className="muted">{q.questions.length} questions · {q.xpPerCorrect} XP each</p>
              {done && !perfect && <span className="case-card__stamp">COMPLETED</span>}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
