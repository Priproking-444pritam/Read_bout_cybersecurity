import React, { useEffect } from 'react'
import { useGame } from '../context/GameContext.jsx'

export default function Toast() {
  const { toast } = useGame()
  const [visible, setVisible] = React.useState(false)

  useEffect(() => {
    if (!toast) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 3200)
    return () => clearTimeout(t)
  }, [toast])

  if (!toast || !visible) return null
  return (
    <div className="toast" key={toast.id}>
      <span className="toast__dot" />
      {toast.message}
    </div>
  )
}
