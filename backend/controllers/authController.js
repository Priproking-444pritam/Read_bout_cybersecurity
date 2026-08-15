import { findUser, createUser, touchStreak, toPublic } from '../models/userStore.js'
import { signToken } from '../middleware/auth.js'

// This demo signs an agent in with just a callsign (no password), matching
// the frontend's zero-friction signup. Swap in bcrypt password checks
// against userStore's hash()/compareHash() to make this a real auth flow.

export async function signup(req, res) {
  const { username } = req.body
  if (!username || !username.trim()) {
    return res.status(400).json({ error: 'username is required.' })
  }
  const clean = username.trim().slice(0, 24)
  let user = findUser(clean)
  if (!user) {
    user = await createUser(clean)
  }
  touchStreak(user)
  const token = signToken(user.username)
  res.status(201).json({ token, user: toPublic(user) })
}

export async function login(req, res) {
  const { username } = req.body
  if (!username) return res.status(400).json({ error: 'username is required.' })
  const user = findUser(username)
  if (!user) return res.status(404).json({ error: 'Agent not found. Sign up first.' })
  touchStreak(user)
  const token = signToken(user.username)
  res.json({ token, user: toPublic(user) })
}

export async function me(req, res) {
  const user = findUser(req.username)
  if (!user) return res.status(404).json({ error: 'Agent not found.' })
  res.json({ user: toPublic(user) })
}
