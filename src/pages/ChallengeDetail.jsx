import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext.jsx'
import { challenges, THREAT_LEVELS } from '../data/challenges.js'

export default function ChallengeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, solveChallenge, showToast } = useGame()
  const challenge = challenges.find((c) => c.id === id)

  const [flag, setFlag] = useState('')
  const [status, setStatus] = useState(null) // 'correct' | 'wrong' | null
  const [showHint, setShowHint] = useState(false)

  if (!challenge) {
    return (
      <div className="page">
        <p>That case file doesn't exist. <Link to="/challenges">Back to case files</Link></p>
      </div>
    )
  }

  const alreadySolved = state.solvedChallenges.includes(challenge.id)
  const threat = THREAT_LEVELS[challenge.threat]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!flag.trim()) return
    const result = solveChallenge(challenge.id, flag)
    if (result.correct) {
      setStatus('correct')
      if (!alreadySolved) showToast(`+${threat.xp} XP — case closed`)
    } else {
      setStatus('wrong')
    }
  }

  const currentIndex = challenges.findIndex((c) => c.id === challenge.id)
  const next = challenges[currentIndex + 1]

  return (
    <div className="page challenge-detail">
      <Link to="/challenges" className="link-arrow link-arrow--back">← All case files</Link>

      <div className="case-header">
        <span className="case-card__id">{challenge.id.toUpperCase()}</span>
        <span className="case-card__threat" style={{ '--threat-color': threat.color }}>
          {threat.label} · {threat.xp} XP
        </span>
      </div>

      <h1>{challenge.title}</h1>
      <p className="muted">{challenge.category}</p>

      <div className="case-block">
        <h4>Briefing</h4>
        <p>{challenge.briefing}</p>
      </div>

      <div className="case-block">
        <h4>Evidence</h4>
        <pre className="evidence-block">{challenge.evidence}</pre>
      </div>

      {(alreadySolved || status === 'correct') ? (
        <div className="case-block solved-block">
          <div className="case-card__stamp case-card__stamp--lg">CASE CLOSED</div>
          <h4>What was really going on</h4>
          <p>{challenge.explainer}</p>
          <div className="solved-actions">
            <Link to="/challenges" className="btn btn--ghost">Back to case files</Link>
            {next && (
              <button className="btn btn--primary" onClick={() => navigate(`/challenges/${next.id}`)}>
                Next case →
              </button>
            )}
          </div>
        </div>
      ) : (
        <form className="flag-form" onSubmit={handleSubmit}>
          <label htmlFor="flag" className="flag-form__label">Submit flag</label>
          <div className="flag-form__row">
            <input
              id="flag"
              className="input input--mono"
              placeholder="enter the flag"
              value={flag}
              onChange={(e) => {
                setFlag(e.target.value)
                setStatus(null)
              }}
              autoComplete="off"
            />
            <button className="btn btn--primary" type="submit">Submit</button>
          </div>
          {status === 'wrong' && (
            <p className="flag-form__feedback flag-form__feedback--wrong">
              Not quite. Re-check the evidence, or reveal a hint below.
            </p>
          )}
          <button
            type="button"
            className="link-arrow"
            onClick={() => setShowHint((h) => !h)}
          >
            {showHint ? 'Hide hint' : 'Reveal hint'}
          </button>
          {showHint && <p className="hint-block">{challenge.hint}</p>}
        </form>
      )}
    </div>
  )
}
