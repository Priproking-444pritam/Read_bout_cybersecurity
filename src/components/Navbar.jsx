import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext.jsx'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/challenges', label: 'Case Files' },
  { to: '/quizzes', label: 'Drills' },
  { to: '/badges', label: 'Badges' },
  { to: '/leaderboard', label: 'Leaderboard' },
]

export default function Navbar() {
  const { state, level } = useGame()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!state.username) return null

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <button className="navbar__brand" onClick={() => navigate('/dashboard')}>
          <span className="navbar__brand-mark">▓▓</span> CYBERLEARN
        </button>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `navbar__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__status">
          <span className="navbar__level">LVL {level}</span>
          <span className="navbar__xp">{state.xp} XP</span>
        </div>

        <button className="navbar__burger" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
