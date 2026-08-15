// A minimal in-memory user "table". Swap this module for a real
// Mongoose/Prisma model and the rest of the backend doesn't need to change —
// every route only talks to the functions exported here.
import bcrypt from 'bcryptjs'

const XP_PER_LEVEL = 200

/** @type {Map<string, object>} keyed by lowercase username */
const users = new Map()

export function levelFromXp(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1
}

export function findUser(username) {
  return users.get(username.toLowerCase())
}

export async function createUser(username) {
  const key = username.toLowerCase()
  if (users.has(key)) return null
  const user = {
    username,
    xp: 0,
    solvedChallenges: [],
    completedQuizzes: [],
    perfectQuizzes: [],
    badges: [],
    streak: 0,
    lastVisit: null,
    createdAt: new Date().toISOString(),
  }
  users.set(key, user)
  return user
}

export function touchStreak(user) {
  const today = new Date().toISOString().slice(0, 10)
  if (user.lastVisit === today) return user
  user.streak = user.lastVisit ? user.streak + 1 : 1
  user.lastVisit = today
  return user
}

export function toPublic(user) {
  return {
    username: user.username,
    xp: user.xp,
    level: levelFromXp(user.xp),
    solvedChallenges: user.solvedChallenges,
    completedQuizzes: user.completedQuizzes,
    perfectQuizzes: user.perfectQuizzes,
    badges: user.badges,
    streak: user.streak,
  }
}

export function allUsers() {
  return Array.from(users.values())
}

// bcrypt helpers kept here for parity with a real auth flow, even though
// this demo signs users in with a callsign only (no password field yet).
export async function hash(value) {
  return bcrypt.hash(value, 10)
}

export async function compareHash(value, hashed) {
  return bcrypt.compare(value, hashed)
}
