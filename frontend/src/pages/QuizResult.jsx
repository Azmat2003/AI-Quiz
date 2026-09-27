import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ResultStat from "../components/quiz/ResultStat.jsx";

function QuizResult() {
  const { quizId } = useParams();

  // =====================================================
  // STATES
  // =====================================================

  // Complete quiz data
  const [quiz, setQuiz] = useState(null);

  // Completed attempt data
  const [attempt, setAttempt] = useState(null);

  // Initial loading
  const [loading, setLoading] = useState(true);

  // API error
  const [error, setError] = useState(null);


  // =====================================================
  // 1. FETCH QUIZ
  // GET /api/quizzes/:quizId
  // =====================================================

  const fetchQuiz = async () => {
    const api =
      `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes/${quizId}`;

    const options = {
      method: "GET",
      credentials: "include",
    };

    const response = await fetch(api, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch quiz"
      );
    }

    setQuiz(data.quiz);

    return data.quiz;
  };


  // =====================================================
  // 2. FETCH ATTEMPT
  // GET /api/quizzes/:quizId/attempt
  // =====================================================

  const fetchAttempt = async () => {
    const api =
      `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes/${quizId}/attempt`;

    const options = {
      method: "GET",
      credentials: "include",
    };

    const response = await fetch(api, options);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch attempt"
      );
    }

    setAttempt(data.attempt);

    return data.attempt;
  };


  // =====================================================
  // 3. LOAD RESULT DATA
  // =====================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        await Promise.all([
          fetchQuiz(),
          fetchAttempt(),
        ]);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    loadData();

  }, [quizId]);


  // =====================================================
  // LOADING UI
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">
          Loading your result...
        </p>
      </div>
    );
  }


  // =====================================================
  // ERROR UI
  // =====================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-red-400">
          {error}
        </p>
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

  const totalQuestions = quiz.questions.length;

  const correctAnswers = attempt.score;

  const unanswered = attempt.answers.filter(
    (answer) => answer.selectedOption === null
  ).length;

  const incorrectAnswers =
    totalQuestions - correctAnswers - unanswered;


  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">

      <div className="mx-auto max-w-4xl">


        {/* ================================================= */}
        {/* RESULT HEADER */}
        {/* ================================================= */}

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-3xl">
            ✦
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            Quiz Completed
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {quiz.title}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Here's how you performed.
          </p>

        </div>


        {/* ================================================= */}
        {/* SCORE CARD */}
        {/* ================================================= */}

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">

          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">


            {/* Percentage */}

            <div className="text-center sm:text-left">

              <p className="text-sm text-slate-400">
                Your Score
              </p>

              <div className="mt-2 flex items-end justify-center gap-2 sm:justify-start">

                <span className="text-6xl font-bold tracking-tight text-white">
                  {Math.round(attempt.percentage)}
                </span>

                <span className="mb-2 text-xl text-violet-400">
                  %
                </span>

              </div>

              <p className="mt-2 text-sm text-slate-400">
                {correctAnswers} out of {totalQuestions} correct
              </p>

            </div>


            {/* Stats */}

            <div className="grid w-full grid-cols-3 gap-3 sm:w-auto">

              <ResultStat
                value={correctAnswers}
                label="Correct"
              />

              <ResultStat
                value={incorrectAnswers}
                label="Incorrect"
              />

              <ResultStat
                value={unanswered}
                label="Unanswered"
              />

            </div>

          </div>


          {/* Difficulty */}

          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-300">
              {quiz.difficulty}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-300">
              {totalQuestions} Questions
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-300">
              {quiz.questionTimer}s / Question
            </span>

          </div>

        </div>


        {/* ================================================= */}
        {/* QUESTION REVIEW */}
        {/* ================================================= */}

        <div className="mt-12">

          <div className="mb-6">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Review
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Question Breakdown
            </h2>

          </div>


          <div className="space-y-5">

            {quiz.questions.map((question, index) => {

              // Find user's answer for this question
              const userAnswer = attempt.answers.find(
                (answer) =>
                  answer.questionIndex === index
              );

              const selectedOption =
                userAnswer?.selectedOption ?? null;

              const correctOption =
                question.correctOption;

              const isCorrect =
                selectedOption === correctOption;

              const isUnanswered =
                selectedOption === null;


              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 p-5 sm:p-6"
                >

                  {/* Question */}

                  <div className="flex gap-4">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-semibold text-violet-400">
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <h3 className="font-medium leading-7 text-white">
                        {question.question}
                      </h3>


                      {/* Answers */}

                      <div className="mt-5 space-y-3">


                        {/* Your Answer */}

                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">

                          <p className="text-xs uppercase tracking-wider text-slate-500">
                            Your Answer
                          </p>

                          <p
                            className={`mt-1 text-sm font-medium ${
                              isCorrect
                                ? "text-emerald-400"
                                : isUnanswered
                                ? "text-slate-400"
                                : "text-red-400"
                            }`}
                          >
                            {isUnanswered
                              ? "Not Answered"
                              : question.options[selectedOption]}
                          </p>

                        </div>


                        {/* Correct Answer */}

                        {!isCorrect && (

                          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">

                            <p className="text-xs uppercase tracking-wider text-slate-500">
                              Correct Answer
                            </p>

                            <p className="mt-1 text-sm font-medium text-emerald-400">
                              {question.options[correctOption]}
                            </p>

                          </div>

                        )}

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>


        {/* ================================================= */}
        {/* ACTION BUTTONS */}
        {/* ================================================= */}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">

          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-center text-sm font-semibold text-slate-300 transition hover:bg-white/[0.07]"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/create-quiz"
            className="rounded-xl bg-violet-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            Create Another Quiz →
          </Link>

        </div>

      </div>

    </main>
  );
}


export default QuizResult;