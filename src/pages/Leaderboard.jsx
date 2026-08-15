import React, { useMemo } from 'react'
import { useGame } from '../context/GameContext.jsx'
import { bots } from '../data/leaderboard.js'

export default function Leaderboard() {
  const { state, level } = useGame()

  const rows = useMemo(() => {
    const all = [
      ...bots,
      { name: state.username, xp: state.xp, level, isPlayer: true },
    ]
    return all.sort((a, b) => b.xp - a.xp)
  }, [state.username, state.xp, level])

  return (
    <div className="page">
      <div className="page-head">
        <div className="eyebrow">FIELD RANKINGS</div>
        <h1>Leaderboard.</h1>
        <p className="muted">Ranked by total XP across all agents in this training simulation.</p>
      </div>

      <div className="leaderboard">
        <div className="leaderboard__row leaderboard__row--head">
          <span>Rank</span>
          <span>Agent</span>
          <span>Level</span>
          <span>XP</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.name} className={`leaderboard__row ${r.isPlayer ? 'is-player' : ''}`}>
            <span className="leaderboard__rank">
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
            </span>
            <span>{r.name}{r.isPlayer ? ' (you)' : ''}</span>
            <span>{r.level}</span>
            <span>{r.xp.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
