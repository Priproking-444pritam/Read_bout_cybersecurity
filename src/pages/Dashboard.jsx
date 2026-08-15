import React from 'react'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext.jsx'
import { challenges } from '../data/challenges.js'
import { quizzes } from '../data/quizzes.js'
import { badgeDefs } from '../data/badges.js'
import ProgressBar from '../components/ProgressBar.jsx'

export default function Dashboard() {
  const { state, level, xpIntoLevel, xpForNextLevel, totalChallenges, totalQuizzes } = useGame()

  const nextChallenge = challenges.find((c) => !state.solvedChallenges.includes(c.id))
  const nextQuiz = quizzes.find((q) => !state.completedQuizzes.includes(q.id))
  const recentBadges = badgeDefs.filter((b) => state.badges.includes(b.id)).slice(-3).reverse()

  return (
    <div className="page dashboard">
      <div className="page-head">
        <div className="eyebrow">AGENT DOSSIER</div>
        <h1>Welcome back, {state.username}.</h1>
        <p className="muted">Here's where your training stands right now.</p>
      </div>

      <div className="dash-grid">
        <div className="card card--stat">
          <span className="card--stat__value">{level}</span>
          <span className="card--stat__label">Clearance level</span>
          <ProgressBar value={xpIntoLevel} max={xpForNextLevel} label="Progress to next level" />
        </div>
        <div className="card card--stat">
          <span className="card--stat__value">{state.xp}</span>
          <span className="card--stat__label">Total XP earned</span>
        </div>
        <div className="card card--stat">
          <span className="card--stat__value">{state.solvedChallenges.length}/{totalChallenges}</span>
          <span className="card--stat__label">Case files closed</span>
        </div>
        <div className="card card--stat">
          <span className="card--stat__value">{state.streak}</span>
          <span className="card--stat__label">Day streak</span>
        </div>
      </div>

      <div className="dash-columns">
        <div className="dash-col">
          <div className="section-head section-head--tight">
            <h2>Continue training</h2>
          </div>

          {nextChallenge ? (
            <Link to={`/challenges/${nextChallenge.id}`} className="card card--action">
              <div className="card--action__tag">NEXT CASE FILE</div>
              <h3>{nextChallenge.title}</h3>
              <p className="muted">{nextChallenge.category} · {nextChallenge.threat} threat</p>
            </Link>
          ) : (
            <div className="card card--action is-done">
              <div className="card--action__tag">CASE FILES</div>
              <h3>All case files closed 🎉</h3>
              <p className="muted">Revisit any of them from the Case Files page any time.</p>
            </div>
          )}

          {nextQuiz ? (
            <Link to={`/quizzes/${nextQuiz.id}`} className="card card--action">
              <div className="card--action__tag">NEXT DRILL</div>
              <h3>{nextQuiz.title}</h3>
              <p className="muted">{nextQuiz.questions.length} questions · {nextQuiz.category}</p>
            </Link>
          ) : (
            <div className="card card--action is-done">
              <div className="card--action__tag">DRILLS</div>
              <h3>All knowledge drills complete 🎉</h3>
              <p className="muted">Retake any drill from the Drills page to sharpen your score.</p>
            </div>
          )}
        </div>

        <div className="dash-col">
          <div className="section-head section-head--tight">
            <h2>Recent badges</h2>
          </div>
          {recentBadges.length === 0 ? (
            <div className="card empty-card">
              <p>No badges yet — solve a case file or pass a drill to earn your first one.</p>
            </div>
          ) : (
            <div className="badge-row">
              {recentBadges.map((b) => (
                <div className="badge-chip" key={b.id} title={b.desc}>
                  <span className="badge-chip__icon">{b.icon}</span>
                  <span>{b.name}</span>
                </div>
              ))}
            </div>
          )}
          <Link to="/badges" className="link-arrow">View all badges →</Link>

          <div className="section-head section-head--tight" style={{ marginTop: '2rem' }}>
            <h2>Overall progress</h2>
          </div>
          <div className="card">
            <ProgressBar
              value={state.solvedChallenges.length}
              max={totalChallenges}
              label="Case files closed"
            />
            <ProgressBar
              value={state.completedQuizzes.length}
              max={totalQuizzes}
              label="Drills completed"
            />
            <ProgressBar
              value={state.badges.length}
              max={badgeDefs.length}
              label="Badges earned"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
