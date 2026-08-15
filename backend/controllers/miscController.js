import { badgeDefs } from '../data/badges.js'
import { findUser, allUsers, levelFromXp } from '../models/userStore.js'
import { bots } from '../data/leaderboard.js'

export function listBadges(req, res) {
  const user = findUser(req.username)
  const earned = user ? user.badges : []
  res.json({
    badges: badgeDefs.map((b) => ({
      id: b.id,
      name: b.name,
      desc: b.desc,
      icon: b.icon,
      earned: earned.includes(b.id),
    })),
  })
}

export function getLeaderboard(req, res) {
  const real = allUsers().map((u) => ({
    name: u.username,
    xp: u.xp,
    level: levelFromXp(u.xp),
  }))
  const rows = [...bots, ...real].sort((a, b) => b.xp - a.xp)
  res.json({ leaderboard: rows })
}
