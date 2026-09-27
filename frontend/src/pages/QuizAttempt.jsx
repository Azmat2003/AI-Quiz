import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import QuizHeader from "../components/quiz/QuizHeader.jsx";
import QuizProgress from "../components/quiz/QuizProgress.jsx";
import QuizTimer from "../components/quiz/QuizTimer.jsx";
import QuestionCard from "../components/quiz/QuestionCard.jsx";
import QuizNavigation from "../components/quiz/QuizNavigation.jsx";

function QuizAttempt() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    // =====================================================
    // STATES
    // =====================================================

    // Complete quiz data
    const [quiz, setQuiz] = useState(null);

    // Current user's attempt
    const [attempt, setAttempt] = useState(null);

    // Selected option for current question
    // 0 -> A
    // 1 -> B
    // 2 -> C
    // 3 -> D
    // null -> No option selected
    const [selectedOption, setSelectedOption] = useState(null);

    // Remaining time for current question
    // null -> Timer not initialized
    const [timeLeft, setTimeLeft] = useState(null);

    // Initial page loading
    const [loading, setLoading] = useState(true);

    // API error
    const [error, setError] = useState(null);

    // Used by UI to disable buttons
    const [saving, setSaving] = useState(false);

    // =====================================================
    // REFS
    // =====================================================

    // Prevents multiple API requests at the same time.
    // Example:
    // User clicks Next exactly when timer becomes 0.
    const requestInProgressRef = useRef(false);

    // =====================================================
    // 1. FETCH QUIZ
    // GET /api/quizzes/:quizId
    // =====================================================

    const fetchQuiz = async () => {
        const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes/${quizId}`;

        const options = {
            method: "GET",
            credentials: "include",
        };

        const response = await fetch(api, options);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch quiz");
        }

        setQuiz(data.quiz);

        return data.quiz;
    };

    // =====================================================
    // 2. FETCH ATTEMPT
    // GET /api/quizzes/:quizId/attempt
    // =====================================================

    const fetchAttempt = async () => {
        const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes/${quizId}/attempt`;

        const options = {
            method: "GET",
            credentials: "include",
        };

        const response = await fetch(api, options);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch attempt");
        }

        setAttempt(data.attempt);

        return data.attempt;
    };

    // =====================================================
    // 3. LOAD QUIZ + ATTEMPT
    // Runs when page opens / reloads
    // =====================================================

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [, attemptData] = await Promise.all([
                    fetchQuiz(),
                    fetchAttempt(),
                ]);

                // -----------------------------------------------
                // Attempt already completed
                // -----------------------------------------------
                if (attemptData.status === "COMPLETED") {
                    navigate(`/quiz/${quizId}/result`);
                    return;
                }

                // -----------------------------------------------
                // Attempt expired
                // -----------------------------------------------

                if (attemptData.status === "EXPIRED") {
                    navigate(`/quiz/${quizId}/result`);
                    return;
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [quizId]);

    // =====================================================
    // 4. INITIALIZE / RESET TIMER
    //
    // Runs whenever question changes
    // =====================================================

    useEffect(() => {
        if (!quiz || !attempt) return;

        setTimeLeft(quiz.questionTimer);
    }, [quiz, attempt?.currentQuestionIndex]);

    // =====================================================
    // 5. TIMER COUNTDOWN
    // =====================================================

    useEffect(() => {
        if (!quiz || !attempt) return;

        // Timer not initialized
        if (timeLeft === null) return;

        // Stop at zero
        if (timeLeft <= 0) return;

        // Don't continue timer while API request is running
        if (requestInProgressRef.current) return;

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [timeLeft, quiz, attempt]);

    // =====================================================
    // 6. SAVE ANSWER
    //
    // Common function used by:
    // - Next
    // - Submit
    // - Timeout
    //
    // selectedOption can also be null
    // =====================================================

    const saveAnswer = async (questionIndex, option) => {
        const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes/${quizId}/attempt`;

        const options = {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
                questionIndex,
                selectedOption: option,
            }),
        };

        const response = await fetch(api, options);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to save answer");
        }

        return data.attempt;
    };

    // =====================================================
    // 7. SUBMIT ATTEMPT
    // POST /api/quizzes/:quizId/attempt/submit
    // =====================================================

    const submitAttempt = async () => {
        const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes/${quizId}/attempt/submit`;

        const options = {
            method: "POST",
            credentials: "include",
        };

        const response = await fetch(api, options);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to submit quiz");
        }

        return data;
    };

    // =====================================================
    // 8. HANDLE TIME UP
    //
    // Timer reaches 0:
    //
    // Normal question:
    // save null -> next question
    //
    // Last question:
    // save null -> submit quiz
    // =====================================================

    const handleTimeUp = async () => {
        // Prevent duplicate request
        if (requestInProgressRef.current) {
            return;
        }

        try {
            requestInProgressRef.current = true;

            setSaving(true);
            setError(null);

            const currentQuestionIndex = attempt.currentQuestionIndex;

            const totalQuestions = quiz.questions.length;

            const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

            // -----------------------------------------------
            // Save null because user did not answer in time
            // -----------------------------------------------

            const updatedAttempt = await saveAnswer(currentQuestionIndex, selectedOption);

            // -----------------------------------------------
            // LAST QUESTION
            // -----------------------------------------------

            if (isLastQuestion) {
                await submitAttempt();

                navigate(`/quiz/${quizId}/result`);

                return;
            }

            // -----------------------------------------------
            // NORMAL QUESTION
            // -----------------------------------------------

            setAttempt(updatedAttempt);

            setSelectedOption(null);
        } catch (err) {
            setError(err.message);
        } finally {
            requestInProgressRef.current = false;

            setSaving(false);
        }
    };

    // =====================================================
    // 9. WATCH TIMER
    //
    // Calls handleTimeUp exactly when timer becomes 0
    // =====================================================

    useEffect(() => {
        if (!quiz || !attempt) return;

        if (timeLeft === null) return;

        if (timeLeft === 0) {
            handleTimeUp();
        }
    }, [timeLeft]);

    // =====================================================
    // 10. SELECT OPTION
    // No API call
    // =====================================================

    const handleSelectOption = (optionIndex) => {
        // Don't allow selection while saving
        if (requestInProgressRef.current) {
            return;
        }

        setSelectedOption(optionIndex);
    };

    // =====================================================
    // 11. NEXT QUESTION
    //
    // Save answer
    // Update attempt
    // Next question automatically renders
    // =====================================================

    const handleNext = async () => {
        // User hasn't selected anything
        if (selectedOption === null) {
            return;
        }

        // Request already running
        if (requestInProgressRef.current) {
            return;
        }

        try {
            requestInProgressRef.current = true;

            setSaving(true);
            setError(null);

            const updatedAttempt = await saveAnswer(
                attempt.currentQuestionIndex,
                selectedOption,
            );

            // Updated currentQuestionIndex comes from backend
            setAttempt(updatedAttempt);

            // Clear old selection
            setSelectedOption(null);
        } catch (err) {
            setError(err.message);
        } finally {
            requestInProgressRef.current = false;
            setSaving(false);
        }
    };

    // =====================================================
    // 12. SUBMIT QUIZ
    //
    // Used when user answers the LAST question manually
    // =====================================================

    const handleSubmit = async () => {
        // User must select an answer
        if (selectedOption === null) {
            return;
        }

        // Prevent duplicate request
        if (requestInProgressRef.current) {
            return;
        }

        try {
            requestInProgressRef.current = true;

            setSaving(true);
            setError(null);

            // -----------------------------------------------
            // STEP 1
            // Save last question answer
            // -----------------------------------------------

            await saveAnswer(attempt.currentQuestionIndex, selectedOption);

            // -----------------------------------------------
            // STEP 2
            // Submit entire quiz
            // -----------------------------------------------

            await submitAttempt();

            // -----------------------------------------------
            // STEP 3
            // Result page
            // -----------------------------------------------

            navigate(`/quiz/${quizId}/result`);
        } catch (err) {
            setError(err.message);
        } finally {
            requestInProgressRef.current = false;

            setSaving(false);
        }
    };

    // =====================================================
    // LOADING UI
    // =====================================================

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <p className="text-slate-400">Loading quiz...</p>
            </div>
        );
    }

    // =====================================================
    // INITIAL LOAD ERROR
    // =====================================================

    if (error && (!quiz || !attempt)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    // =====================================================
    // SAFETY
    // =====================================================

    if (!quiz || !attempt) {
        return null;
    }

    // =====================================================
    // DERIVED VALUES
    // =====================================================

    const currentQuestionIndex = attempt.currentQuestionIndex;

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const totalQuestions = quiz.questions.length;

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    // =====================================================
    // UI
    // =====================================================

    return (
        <main className="min-h-screen bg-slate-950 px-5 py-10 text-white">
            <div className="mx-auto max-w-3xl">
                {/* ============================================= */}
                {/* HEADER + TIMER */}
                {/* ============================================= */}

                <div className="mb-8 flex items-center justify-between">
                    <QuizHeader
                        title={quiz.title}
                        difficulty={quiz.difficulty}
                    />

                    <QuizTimer timeLeft={timeLeft} />
                </div>

                {/* ============================================= */}
                {/* QUESTION PROGRESS */}
                {/* ============================================= */}

                <QuizProgress
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={totalQuestions}
                />

                {/* ============================================= */}
                {/* QUESTION + OPTIONS */}
                {/* ============================================= */}

                <QuestionCard
                    question={currentQuestion}
                    selectedOption={selectedOption}
                    onSelectOption={handleSelectOption}
                />

                {/* ============================================= */}
                {/* NEXT / SUBMIT */}
                {/* ============================================= */}

                <QuizNavigation
                    isLastQuestion={isLastQuestion}
                    selectedOption={selectedOption}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                    saving={saving}
                />

                {/* ============================================= */}
                {/* API ERROR */}
                {/* ============================================= */}

                {error && (
                    <p className="mt-4 text-center text-sm text-red-400">
                        {error}
                    </p>
                )}
            </div>
        </main>
    );
}

export default QuizAttempt;
