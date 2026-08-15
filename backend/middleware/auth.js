import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

export function signToken(username) {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header.' })
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    req.username = payload.username
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }
}
