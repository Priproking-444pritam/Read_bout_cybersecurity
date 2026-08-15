import React from 'react'
import { useGame } from '../context/GameContext.jsx'

export default function BadgeUnlock() {
  const { newBadges, dismissBadge } = useGame()
  const current = newBadges[0]
  if (!current) return null

  return (
    <div className="badge-modal__backdrop" role="dialog" aria-modal="true">
      <div className="badge-modal">
        <div className="badge-modal__stamp">UNLOCKED</div>
        <div className="badge-modal__icon">{current.icon}</div>
        <h3 className="badge-modal__name">{current.name}</h3>
        <p className="badge-modal__desc">{current.desc}</p>
        <button className="btn btn--primary" onClick={() => dismissBadge(current.id)}>
          Continue
        </button>
      </div>
    </div>
  )
}
