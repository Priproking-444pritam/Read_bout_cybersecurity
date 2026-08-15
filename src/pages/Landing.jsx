import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext.jsx'
import { challenges } from '../data/challenges.js'
import { quizzes } from '../data/quizzes.js'

const BOOT_LINES = [
  '> initializing secure environment...',
  '> loading 6 active case files...',
  '> loading 4 knowledge drills...',
  '> clearance check: GUEST',
  '> awaiting agent callsign_',
]

function TerminalBoot() {
  const [shown, setShown] = useState([])
  const [charIndex, setCharIndex] = useState(0)
  const lineIndex = shown.length

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) return
    const full = BOOT_LINES[lineIndex]
    if (charIndex < full.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 18)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setShown((s) => [...s, full])
      setCharIndex(0)
    }, 260)
    return () => clearTimeout(t)
  }, [charIndex, lineIndex])

  const current = lineIndex < BOOT_LINES.length ? BOOT_LINES[lineIndex].slice(0, charIndex) : null

  return (
    <div className="terminal" aria-hidden="true">
      <div className="terminal__bar">
        <span className="terminal__dot" style={{ background: '#E5484D' }} />
        <span className="terminal__dot" style={{ background: '#F5A623' }} />
        <span className="terminal__dot" style={{ background: '#4FD1C5' }} />
        <span className="terminal__title">agent_shell — bash</span>
      </div>
      <div className="terminal__body">
        {shown.map((l, i) => (
          <div key={i} className="terminal__line">{l}</div>
        ))}
        {current !== null && (
          <div className="terminal__line">
            {current}
            <span className="terminal__cursor">▌</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Landing() {
  const { state, signUp } = useGame()
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const formRef = useRef(null)

  useEffect(() => {
    if (state.username) navigate('/dashboard')
  }, [state.username, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    signUp(trimmed)
    navigate('/dashboard')
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="landing">
      <section className="hero">
        <div className="hero__copy">
          <div className="eyebrow">CLASSIFIED · TRAINING SIMULATION</div>
          <h1 className="hero__title">
            Think like<br />a defender.
          </h1>
          <p className="hero__sub">
            CyberLearn is a case-file training ground for cybersecurity fundamentals.
            Crack real-shaped puzzles, pass knowledge drills, and build a record of
            every skill you unlock — no prior experience required.
          </p>
          <form className="hero__form" ref={formRef} onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="choose an agent callsign"
              value={name}
              maxLength={24}
              onChange={(e) => setName(e.target.value)}
              aria-label="Agent callsign"
            />
            <button className="btn btn--primary" type="submit">
              Begin training →
            </button>
          </form>
          <div className="hero__meta">
            {challenges.length} case files · {quizzes.length} knowledge drills · 100% free
          </div>
        </div>
        <div className="hero__visual">
          <TerminalBoot />
        </div>
      </section>

      <section className="strip">
        <div className="strip__item">
          <span className="strip__num">{challenges.length}</span>
          <span className="strip__label">Case files to crack</span>
        </div>
        <div className="strip__item">
          <span className="strip__num">{quizzes.length}</span>
          <span className="strip__label">Knowledge drills</span>
        </div>
        <div className="strip__item">
          <span className="strip__num">8</span>
          <span className="strip__label">Badges to earn</span>
        </div>
        <div className="strip__item">
          <span className="strip__num">0</span>
          <span className="strip__label">Signup friction</span>
        </div>
      </section>

      <section className="features">
        <div className="section-head">
          <div className="eyebrow">HOW TRAINING WORKS</div>
          <h2>Three ways to build the reflex.</h2>
        </div>
        <div className="features__grid">
          <article className="feature-card">
            <div className="feature-card__stamp" style={{ '--stamp-color': '#4FD1C5' }}>CASE FILE</div>
            <h3>Capture-the-flag cases</h3>
            <p>
              Read a short briefing pulled from a real-shaped incident, inspect the evidence,
              and submit the exact flag that proves you found the vulnerability.
            </p>
          </article>
          <article className="feature-card">
            <div className="feature-card__stamp" style={{ '--stamp-color': '#F5A623' }}>DRILL</div>
            <h3>Knowledge drills</h3>
            <p>
              Five-question rounds on networking, cryptography, social engineering, and
              web security. Wrong answers explain themselves — you leave knowing more than you arrived with.
            </p>
          </article>
          <article className="feature-card">
            <div className="feature-card__stamp" style={{ '--stamp-color': '#FF4D6D' }}>RECORD</div>
            <h3>A record that grows</h3>
            <p>
              XP, levels, streaks, and badges are tracked locally in your browser as you
              go, so your progress is always visible on your dashboard.
            </p>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <h2>Your first case file is 90 seconds away.</h2>
        <button className="btn btn--primary btn--lg" onClick={scrollToForm}>
          Pick a callsign and start →
        </button>
      </section>

      <footer className="footer">
        <span>CYBERLEARN — a training simulation. No real systems were harmed.</span>
      </footer>
    </div>
  )
}
