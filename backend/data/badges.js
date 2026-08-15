export const badgeDefs = [
  { id: 'first-blood', name: 'First Blood', desc: 'Solved your first case file.', icon: '🩸', rule: 'solvedChallenges >= 1' },
  { id: 'quiz-rookie', name: 'Quiz Rookie', desc: 'Completed your first knowledge drill.', icon: '📗', rule: 'completedQuizzes >= 1' },
  { id: 'case-closer', name: 'Case Closer', desc: 'Solved 3 case files.', icon: '🗂️', rule: 'solvedChallenges >= 3' },
  { id: 'full-clear', name: 'Full Clear', desc: 'Solved every case file on record.', icon: '🏆', rule: 'solvedChallenges == totalChallenges' },
  { id: 'perfect-drill', name: 'Perfect Score', desc: 'Aced a knowledge drill with no wrong answers.', icon: '🎯', rule: 'perfectQuizzes >= 1' },
  { id: 'level-5', name: 'Field Agent', desc: 'Reached Level 5.', icon: '🥈', rule: 'level >= 5' },
  { id: 'level-10', name: 'Senior Analyst', desc: 'Reached Level 10.', icon: '🥇', rule: 'level >= 10' },
  { id: 'streak-3', name: 'On a Streak', desc: 'Completed activities on 3 different visits.', icon: '🔥', rule: 'streak >= 3' },
]
