import express from 'express';
import { verifyToken } from '../middlewares/verify.middleware.js';

import { getAttempt, createAttempt, updateAnswers, submitQuiz } from '../controllers/attempt.controller.js';

// api/quizzes/:quizId/attempt -> continue
const router = express.Router({
    mergeParams : true
});

router.use(verifyToken);

// when quiz page relaods or in transition
router.get('/', getAttempt);

// when we are ready to attemp the quiz
router.post('/', createAttempt);

// next/submit btns
router.put('/', updateAnswers);

// submit btns
router.post('/submit', submitQuiz);

export default router;