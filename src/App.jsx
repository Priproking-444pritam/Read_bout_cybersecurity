import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useGame } from './context/GameContext.jsx'
import Navbar from './components/Navbar.jsx'
import Toast from './components/Toast.jsx'
import BadgeUnlock from './components/BadgeUnlock.jsx'

import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Challenges from './pages/Challenges.jsx'
import ChallengeDetail from './pages/ChallengeDetail.jsx'
import Quizzes from './pages/Quizzes.jsx'
import QuizDetail from './pages/QuizDetail.jsx'
import Badges from './pages/Badges.jsx'
import Leaderboard from './pages/Leaderboard.jsx'

function RequireAgent({ children }) {
  const { state } = useGame()
  if (!state.username) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <>
      <Navbar />
      <Toast />
      <BadgeUnlock />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <RequireAgent>
                <Dashboard />
              </RequireAgent>
            }
          />
          <Route
            path="/challenges"
            element={
              <RequireAgent>
                <Challenges />
              </RequireAgent>
            }
          />
          <Route
            path="/challenges/:id"
            element={
              <RequireAgent>
                <ChallengeDetail />
              </RequireAgent>
            }
          />
          <Route
            path="/quizzes"
            element={
              <RequireAgent>
                <Quizzes />
              </RequireAgent>
            }
          />
          <Route
            path="/quizzes/:id"
            element={
              <RequireAgent>
                <QuizDetail />
              </RequireAgent>
            }
          />
          <Route
            path="/badges"
            element={
              <RequireAgent>
                <Badges />
              </RequireAgent>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <RequireAgent>
                <Leaderboard />
              </RequireAgent>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}
