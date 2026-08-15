import React from 'react'

export default function ProgressBar({ value, max, label }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="progress" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      {label && <div className="progress__label">{label}</div>}
      <div className="progress__track">
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress__meta">{value} / {max}</div>
    </div>
  )
}
