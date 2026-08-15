import React from 'react'
import { useGame } from '../context/GameContext.jsx'
import { badgeDefs } from '../data/badges.js'

export default function Badges() {
  const { state } = useGame()

  return (
    <div className="page">
      <div className="page-head">
        <div className="eyebrow">COMMENDATIONS</div>
        <h1>Badges.</h1>
        <p className="muted">{state.badges.length}/{badgeDefs.length} earned. Locked badges show what unlocks them.</p>
      </div>

      <div className="badge-grid">
        {badgeDefs.map((b) => {
          const earned = state.badges.includes(b.id)
          return (
            <div key={b.id} className={`badge-tile ${earned ? 'is-earned' : 'is-locked'}`}>
              <div className="badge-tile__icon">{earned ? b.icon : '🔒'}</div>
              <h3>{b.name}</h3>
              <p className="muted">{b.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
