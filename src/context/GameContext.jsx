import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { challenges, THREAT_LEVELS } from '../data/challenges.js'
import { quizzes } from '../data/quizzes.js'
import { badgeDefs } from '../data/badges.js'

const STORAGE_KEY = 'cyberlearn.save.v1'
const XP_PER_LEVEL = 200

const defaultState = {
  username: '',
  xp: 0,
  solvedChallenges: [], // array of challenge ids
  completedQuizzes: [], // array of quiz ids
  perfectQuizzes: [], // quiz ids completed with 100%
  badges: [], // badge ids already awarded
  streak: 0,
  lastVisit: null, // ISO date string (day only)
  createdAt: null,
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return { ...defaultState, ...parsed }
  } catch {
    return null
  }
}

function levelFromXp(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [state, setState] = useState(() => loadState() || defaultState)
  const [toast, setToast] = useState(null) // { message } transient banner
  const [newBadges, setNewBadges] = useState([])

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Streak bookkeeping — bump once per calendar day the app is opened, after signup
  useEffect(() => {
    if (!state.username) return
    const today = new Date().toISOString().slice(0, 10)
    if (state.lastVisit === today) return
    setState((s) => ({
      ...s,
      streak: s.lastVisit ? s.streak + 1 : 1,
      lastVisit: today,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.username])

  const level = levelFromXp(state.xp)
  const xpIntoLevel = state.xp % XP_PER_LEVEL
  const xpForNextLevel = XP_PER_LEVEL

  const checkBadges = useCallback((nextState) => {
    const ctx = { totalChallenges: challenges.length, totalQuizzes: quizzes.length }
    const earned = badgeDefs.filter(
      (b) => !nextState.badges.includes(b.id) && b.test({ ...nextState, level: levelFromXp(nextState.xp) }, ctx)
    )
    if (earned.length === 0) return nextState
    setNewBadges((prev) => [...prev, ...earned])
    return { ...nextState, badges: [...nextState.badges, ...earned.map((b) => b.id)] }
  }, [])

  const signUp = useCallback((username) => {
    setState((s) => ({ ...s, username, createdAt: s.createdAt || new Date().toISOString() }))
  }, [])

  const showToast = useCallback((message) => {
    setToast({ message, id: Date.now() })
  }, [])

  const solveChallenge = useCallback(
    (challengeId, submittedFlag) => {
      const challenge = challenges.find((c) => c.id === challengeId)
      if (!challenge) return { correct: false }
      const clean = (v) => v.trim().toLowerCase()
      const correct = clean(submittedFlag) === clean(challenge.flag)
      if (!correct) return { correct: false }

      setState((s) => {
        if (s.solvedChallenges.includes(challengeId)) return s
        const xpGain = THREAT_LEVELS[challenge.threat].xp
        let next = { ...s, xp: s.xp + xpGain, solvedChallenges: [...s.solvedChallenges, challengeId] }
        next = checkBadges(next)
        return next
      })
      return { correct: true }
    },
    [checkBadges]
  )

  const completeQuiz = useCallback(
    (quizId, correctCount, totalCount) => {
      const quiz = quizzes.find((q) => q.id === quizId)
      if (!quiz) return
      const xpGain = correctCount * quiz.xpPerCorrect
      setState((s) => {
        let next = {
          ...s,
          xp: s.xp + xpGain,
          completedQuizzes: s.completedQuizzes.includes(quizId)
            ? s.completedQuizzes
            : [...s.completedQuizzes, quizId],
        }
        if (correctCount === totalCount && !s.perfectQuizzes.includes(quizId)) {
          next.perfectQuizzes = [...s.perfectQuizzes, quizId]
        }
        next = checkBadges(next)
        return next
      })
    },
    [checkBadges]
  )

  const dismissBadge = useCallback((id) => {
    setNewBadges((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setState(defaultState)
  }, [])

  const value = useMemo(
    () => ({
      state,
      level,
      xpIntoLevel,
      xpForNextLevel,
      toast,
      showToast,
      newBadges,
      dismissBadge,
      signUp,
      solveChallenge,
      completeQuiz,
      resetProgress,
      totalChallenges: challenges.length,
      totalQuizzes: quizzes.length,
    }),
    [state, level, xpIntoLevel, xpForNextLevel, toast, showToast, newBadges, dismissBadge, signUp, solveChallenge, completeQuiz, resetProgress]
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
