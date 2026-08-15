import { Router } from 'express'
import { listBadges, getLeaderboard } from '../controllers/miscController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/badges', requireAuth, listBadges)
router.get('/leaderboard', getLeaderboard)

export default router
