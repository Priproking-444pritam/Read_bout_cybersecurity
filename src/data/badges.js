// Each badge has a `test(state)` predicate run against the player's game state.
export const badgeDefs = [
  {
    id: 'first-blood',
    name: 'First Blood',
    desc: 'Solved your first case file.',
    icon: '🩸',
    test: (s) => s.solvedChallenges.length >= 1,
  },
  {
    id: 'quiz-rookie',
    name: 'Quiz Rookie',
    desc: 'Completed your first knowledge drill.',
    icon: '📗',
    test: (s) => s.completedQuizzes.length >= 1,
  },
  {
    id: 'case-closer',
    name: 'Case Closer',
    desc: 'Solved 3 case files.',
    icon: '🗂️',
    test: (s) => s.solvedChallenges.length >= 3,
  },
  {
    id: 'full-clear',
    name: 'Full Clear',
    desc: 'Solved every case file on record.',
    icon: '🏆',
    test: (s, ctx) => s.solvedChallenges.length >= ctx.totalChallenges,
  },
  {
    id: 'perfect-drill',
    name: 'Perfect Score',
    desc: 'Aced a knowledge drill with no wrong answers.',
    icon: '🎯',
    test: (s) => s.perfectQuizzes.length >= 1,
  },
  {
    id: 'level-5',
    name: 'Field Agent',
    desc: 'Reached Level 5.',
    icon: '🥈',
    test: (s) => s.level >= 5,
  },
  {
    id: 'level-10',
    name: 'Senior Analyst',
    desc: 'Reached Level 10.',
    icon: '🥇',
    test: (s) => s.level >= 10,
  },
  {
    id: 'streak-3',
    name: 'On a Streak',
    desc: 'Completed activities on 3 different visits.',
    icon: '🔥',
    test: (s) => s.streak >= 3,
  },
]
