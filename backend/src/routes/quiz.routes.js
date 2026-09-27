import express from "express";

import {verifyToken} from "../middlewares/verify.middleware.js";

import {quizGenerationLimiter} from "../middlewares/quizLimiter.middleware.js";

import {validateQuizRequest} from "../middlewares/validateQuiz.middleware.js";

import {generateQuiz,getMyQuizzes,getQuiz,getQuizResult} from "../controllers/quiz.controller.js";


// api/quizzes
const router = express.Router();


// Every quiz route requires authentication
router.use(verifyToken);


// Generate AI Quiz
router.post("/generate",quizGenerationLimiter,validateQuizRequest,generateQuiz);


// Get all quizzes of logged-in user
router.get("/", getMyQuizzes);


// Get one quiz
router.get("/:quizId", getQuiz);


// Get completed quiz result
router.get("/:quizId/result", getQuizResult);


// Delete quiz
// router.delete("/:quizId", deleteQuiz);


export default router;