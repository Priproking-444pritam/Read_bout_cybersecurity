import React from 'react'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext.jsx'
import { challenges, THREAT_LEVELS } from '../data/challenges.js'

export default function Challenges() {
  const { state } = useGame()

  return (
    <div className="page">
      <div className="page-head">
        <div className="eyebrow">ACTIVE INVESTIGATIONS</div>
        <h1>Case files.</h1>
        <p className="muted">
          Each case is a self-contained puzzle. Read the briefing, inspect the evidence,
          and submit the flag once you've cracked it. {state.solvedChallenges.length}/{challenges.length} closed.
        </p>
      </div>

      <div className="case-grid">
        {challenges.map((c) => {
          const solved = state.solvedChallenges.includes(c.id)
          const threat = THREAT_LEVELS[c.threat]
          return (
            <Link to={`/challenges/${c.id}`} key={c.id} className={`case-card ${solved ? 'is-solved' : ''}`}>
              <div className="case-card__top">
                <span className="case-card__id">{c.id.toUpperCase()}</span>
                <span className="case-card__threat" style={{ '--threat-color': threat.color }}>
                  {threat.label}
                </span>
              </div>
              <h3>{c.title}</h3>
              <p className="muted">{c.category}</p>
              <div className="case-card__bottom">
                <span>{threat.xp} XP</span>
                {solved && <span className="case-card__stamp">SOLVED</span>}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
