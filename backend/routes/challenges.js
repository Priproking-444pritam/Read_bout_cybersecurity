import { Router } from 'express'
import { listChallenges, getChallenge, submitFlag } from '../controllers/challengeController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', listChallenges)
router.get('/:id', getChallenge)
router.post('/:id/submit', requireAuth, submitFlag)

export default router
