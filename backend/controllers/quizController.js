import { quizzes } from '../data/quizzes.js'
import { challenges } from '../data/challenges.js'
import { badgeDefs } from '../data/badges.js'
import { findUser, levelFromXp } from '../models/userStore.js'

// Never send `answer` indices to the client up front — only reveal them
// question-by-question via submitQuiz, same as a real trivia backend would.
function publicQuiz(q) {
  return {
    id: q.id,
    title: q.title,
    category: q.category,
    xpPerCorrect: q.xpPerCorrect,
    questions: q.questions.map((qq) => ({ q: qq.q, options: qq.options })),
  }
}

export function listQuizzes(req, res) {
  res.json({ quizzes: quizzes.map(publicQuiz) })
}

export function getQuiz(req, res) {
  const quiz = quizzes.find((q) => q.id === req.params.id)
  if (!quiz) return res.status(404).json({ error: 'Drill not found.' })
  res.json({ quiz: publicQuiz(quiz) })
}

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

function checkNewBadges(user) {
  const ctx = { totalChallenges: challenges.length, totalQuizzes: quizzes.length }
  const state = { ...user, level: levelFromXp(user.xp) }
  const earned = badgeDefs.filter((b) => !user.badges.includes(b.id) && evalBadge(b.id, state, ctx))
  earned.forEach((b) => user.badges.push(b.id))
  return earned
}

// body: { answers: number[] } — one option index per question, in order.
export function submitQuiz(req, res) {
  const quiz = quizzes.find((q) => q.id === req.params.id)
  if (!quiz) return res.status(404).json({ error: 'Drill not found.' })

  const { answers } = req.body
  if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
    return res.status(400).json({ error: `answers must be an array of ${quiz.questions.length} option indices.` })
  }

  const user = findUser(req.username)
  if (!user) return res.status(404).json({ error: 'Agent not found.' })

  let correctCount = 0
  const results = quiz.questions.map((q, i) => {
    const isCorrect = answers[i] === q.answer
    if (isCorrect) correctCount += 1
    return { correct: isCorrect, correctAnswer: q.answer }
  })

  const xpAwarded = correctCount * quiz.xpPerCorrect
  user.xp += xpAwarded
  if (!user.completedQuizzes.includes(quiz.id)) user.completedQuizzes.push(quiz.id)
  if (correctCount === quiz.questions.length && !user.perfectQuizzes.includes(quiz.id)) {
    user.perfectQuizzes.push(quiz.id)
  }

  const newBadges = checkNewBadges(user)

  res.json({
    results,
    correctCount,
    total: quiz.questions.length,
    xpAwarded,
    totalXp: user.xp,
    level: levelFromXp(user.xp),
    newBadges,
  })
}
