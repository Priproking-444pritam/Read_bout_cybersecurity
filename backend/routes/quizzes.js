import { Router } from 'express'
import { listQuizzes, getQuiz, submitQuiz } from '../controllers/quizController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', listQuizzes)
router.get('/:id', getQuiz)
router.post('/:id/submit', requireAuth, submitQuiz)

export default router
