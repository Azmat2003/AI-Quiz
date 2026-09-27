import Attempt from "../models/attempt.model.js";
import Quiz from "../models/quiz.model.js";

export const getAttempt = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user.id;

        // 1. Find attempt
        const attempt = await Attempt.findOne({
            user: userId,
            quiz: quizId,
        });

        // 2. Attempt not found
        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found",
            });
        }

        // 3. Check expiry
        if (
            attempt.status === "IN_PROGRESS" &&
            new Date() > attempt.expiresAt
        ) {
            attempt.status = "EXPIRED";

            await attempt.save();
        }

        // 4. Return attempt
        return res.status(200).json({
            message: "Attempt fetched successfully",
            attempt,
        });

    } catch (err) {
        console.error("Get Attempt Error:", err);

        return res.status(500).json({
            message: "Failed to fetch attempt",
        });
    }
};

export const createAttempt = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user.id;

        // 1. Check quiz
        const quiz = await Quiz.findOne({
            _id: quizId,
            user: userId,
        });

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        // 2. Check existing attempt
        const existingAttempt = await Attempt.findOne({
            user: userId,
            quiz: quizId,
        });

        if (existingAttempt) {
            return res.status(409).json({
                message: "Quiz has already been attempted",
            });
        }

        // 3. Time
        const startedAt = new Date();

        const expiresAt = new Date(
            startedAt.getTime() + 24 * 60 * 60 * 1000
        );

        // 4. Create attempt
        const attempt = await Attempt.create({
            user: userId,
            quiz: quizId,
            answers: [],
            currentQuestionIndex: 0,
            status: "IN_PROGRESS",
            startedAt,
            expiresAt,
        });

        return res.status(201).json({
            message: "Quiz attempt started successfully",
            attempt,
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Failed to start quiz attempt",
        });
    }
};

export const updateAnswers = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user.id;

        const { questionIndex, selectedOption } = req.body;

        // 1. Find attempt
        const attempt = await Attempt.findOne({
            user: userId,
            quiz: quizId,
        });

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found",
            });
        }

        // 2. Attempt should be in progress
        if (attempt.status !== "IN_PROGRESS") {
            return res.status(400).json({
                message: "This quiz attempt is no longer active",
            });
        }

        // 3. Check 24-hour expiry
        if (new Date() > attempt.expiresAt) {
            attempt.status = "EXPIRED";

            await attempt.save();

            return res.status(400).json({
                message: "Quiz attempt has expired",
            });
        }

        // 4. User can only answer current question
        if (questionIndex !== attempt.currentQuestionIndex) {
            return res.status(400).json({
                message: "Invalid question",
            });
        }

        // 5. Validate selected option
        if (
            selectedOption !== null &&
            (
                !Number.isInteger(selectedOption) ||
                selectedOption < 0 ||
                selectedOption > 3
            )
        ) {
            return res.status(400).json({
                message: "Invalid selected option",
            });
        }

        // 6. Save answer
        attempt.answers.push({
            questionIndex,
            selectedOption,
        });

        // 7. Move to next question
        attempt.currentQuestionIndex += 1;

        await attempt.save();

        return res.status(200).json({
            message: "Answer saved successfully",
            attempt,
        });

    } catch (err) {
        console.error("Update Answer Error:", err);

        return res.status(500).json({
            message: "Failed to update answer",
        });
    }
};

export const submitQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;
        const userId = req.user.id;

        // 1. Find attempt
        const attempt = await Attempt.findOne({
            user: userId,
            quiz: quizId,
        });

        if (!attempt) {
            return res.status(404).json({
                message: "Attempt not found",
            });
        }

        // 2. Attempt must be IN_PROGRESS
        if (attempt.status !== "IN_PROGRESS") {
            return res.status(400).json({
                message: "Quiz attempt is no longer active",
            });
        }

        // 3. Check 24-hour expiry
        if (new Date() > attempt.expiresAt) {
            attempt.status = "EXPIRED";

            await attempt.save();

            return res.status(400).json({
                message: "Quiz attempt has expired",
            });
        }

        // 4. Find quiz
        const quiz = await Quiz.findOne({
            _id: quizId,
            user: userId,
        });

        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found",
            });
        }

        // 5. Make sure all questions have been processed
        if (attempt.currentQuestionIndex < quiz.questions.length) {
            return res.status(400).json({
                message: "Please complete all questions before submitting",
            });
        }

        // 6. Calculate score
        let score = 0;

        for (const answer of attempt.answers) {
            const question = quiz.questions[answer.questionIndex];

            if (
                answer.selectedOption !== null &&
                answer.selectedOption === question.correctOption
            ) {
                score++;
            }
        }

        // 7. Calculate percentage
        const percentage = Math.round(
            (score / quiz.questions.length) * 100
        );

        // 8. Complete attempt
        attempt.score = score;
        attempt.percentage = percentage;
        attempt.status = "COMPLETED";
        attempt.submittedAt = new Date();

        await attempt.save();

        // 9. Return result
        return res.status(200).json({
            message: "Quiz submitted successfully",
            result: {
                score,
                totalQuestions: quiz.questions.length,
                percentage,
                status: attempt.status,
            },
        });

    } catch (err) {
        console.error("Submit Quiz Error:", err);

        return res.status(500).json({
            message: "Failed to submit quiz",
        });
    }
};
