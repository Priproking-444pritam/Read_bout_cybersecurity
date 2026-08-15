import { challenges, THREAT_LEVELS } from '../data/challenges.js'
import { badgeDefs } from '../data/badges.js'
import { quizzes } from '../data/quizzes.js'
import { findUser, levelFromXp } from '../models/userStore.js'

// Strip the `flag` field before sending a challenge to the client — the
// answer should never be visible in the network tab.
function publicChallenge(c) {
  const { flag, ...rest } = c
  return { ...rest, xp: THREAT_LEVELS[c.threat].xp }
}

export function listChallenges(req, res) {
  res.json({ challenges: challenges.map(publicChallenge) })
}

export function getChallenge(req, res) {
  const challenge = challenges.find((c) => c.id === req.params.id)
  if (!challenge) return res.status(404).json({ error: 'Case file not found.' })
  res.json({ challenge: publicChallenge(challenge) })
}

function checkNewBadges(user) {
  const ctx = { totalChallenges: challenges.length, totalQuizzes: quizzes.length }
  const state = { ...user, level: levelFromXp(user.xp) }
  const earned = badgeDefs.filter(
    (b) => !user.badges.includes(b.id) && evalBadge(b.id, state, ctx)
  )
  earned.forEach((b) => user.badges.push(b.id))
  return earned
}

// Small hand-rolled rule evaluator so badge logic doesn't need a full
// expression parser for eight simple conditions.
function evalBadge(id, s, ctx) {
  switch (id) {
    case 'first-blood': return s.solvedChallenges.length >= 1
    case 'quiz-rookie': return s.completedQuizzes.length >= 1
    case 'case-closer': return s.solvedChallenges.length >= 3
    case 'full-clear': return s.solvedChallenges.length >= ctx.totalChallenges
    case 'perfect-drill': return s.perfectQuizzes.length >= 1
    case 'level-5': return s.level >= 5
    case 'level-10': return s.level >= 10
    case 'streak-3': return s.streak >= 3
    default: return false
  }
}

export function submitFlag(req, res) {
  const challenge = challenges.find((c) => c.id === req.params.id)
  if (!challenge) return res.status(404).json({ error: 'Case file not found.' })

  const { flag } = req.body
  if (typeof flag !== 'string') return res.status(400).json({ error: 'flag is required.' })

  const clean = (v) => v.trim().toLowerCase()
  const correct = clean(flag) === clean(challenge.flag)
  if (!correct) return res.json({ correct: false })

  const user = findUser(req.username)
  if (!user) return res.status(404).json({ error: 'Agent not found.' })

  let xpAwarded = 0
  if (!user.solvedChallenges.includes(challenge.id)) {
    xpAwarded = THREAT_LEVELS[challenge.threat].xp
    user.xp += xpAwarded
    user.solvedChallenges.push(challenge.id)
  }
  const newBadges = checkNewBadges(user)

  res.json({
    correct: true,
    xpAwarded,
    totalXp: user.xp,
    level: levelFromXp(user.xp),
    newBadges,
    explainer: challenge.explainer,
  })
}
