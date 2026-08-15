import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import challengeRoutes from './routes/challenges.js'
import quizRoutes from './routes/quizzes.js'
import miscRoutes from './routes/misc.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'cyberlearn-backend', time: new Date().toISOString() })
})

app.use('/api/auth', authRoutes)
app.use('/api/challenges', challengeRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api', miscRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`CyberLearn backend listening on http://localhost:${PORT}`)
})
