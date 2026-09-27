import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

function QuizView() {
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [attempt, setAttempt] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // --------------------------------------------------
  // Fetch Quiz
  // --------------------------------------------------
  async function fetchQuiz() {
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

    return data.quiz;
  }

  // --------------------------------------------------
  // Fetch Attempt
  // --------------------------------------------------
  async function fetchAttempt() {
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

    return data.attempt;
  }

  // --------------------------------------------------
  // Load Quiz + Attempt
  // --------------------------------------------------
  async function loadQuizData() {
    try {
      setLoading(true);

      setError(null);

      const quizData = await fetchQuiz();

      const attemptData = await fetchAttempt();

      setQuiz(quizData);

      setAttempt(attemptData);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    loadQuizData();
  }, [quizId]);

  // --------------------------------------------------
  // Get user's selected answer
  // --------------------------------------------------
  function getSelectedAnswer(questionIndex) {
    const answer = attempt?.answers?.find(
      (item) => item.questionIndex === questionIndex
    );

    return answer?.selectedOption ?? null;
  }

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-slate-400">
        Loading quiz...
      </div>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 p-8">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-red-300">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">

      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            {quiz.title}
          </h1>

          <p className="mt-2 text-slate-400">
            {quiz.topic} • {quiz.difficulty}
          </p>
        </div>

        {/* Attempt Summary */}
        <div
          className="
            flex flex-wrap
            items-center
            justify-between
            gap-4
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            p-5
          "
        >
          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>

            <p className="mt-1 font-semibold text-white">
              {attempt.status}
            </p>
          </div>

          {attempt.status === "COMPLETED" && (
            <>
              <div>
                <p className="text-sm text-slate-500">
                  Score
                </p>

                <p className="mt-1 font-semibold text-white">
                  {attempt.score} / {quiz.questions.length}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Percentage
                </p>

                <p className="mt-1 text-xl font-bold text-indigo-400">
                  {attempt.percentage}%
                </p>
              </div>
            </>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-6">

          {quiz.questions.map((question, questionIndex) => {
            const selectedOption =
              getSelectedAnswer(questionIndex);

            return (
              <div
                key={questionIndex}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >
                {/* Question */}
                <p className="text-sm text-indigo-400">
                  Question {questionIndex + 1}
                </p>

                <h2 className="mt-2 text-lg font-semibold">
                  {question.question}
                </h2>

                {/* Options */}
                <div className="mt-5 space-y-3">

                  {question.options.map((option, optionIndex) => {
                    const isCorrect =
                      optionIndex === question.correctOption;

                    const isSelected =
                      optionIndex === selectedOption;

                    let optionClass =
                      "border-white/10 bg-slate-950/30 text-slate-300";

                    if (isCorrect) {
                      optionClass =
                        "border-green-500/40 bg-green-500/10 text-green-300";
                    }

                    if (isSelected && !isCorrect) {
                      optionClass =
                        "border-red-500/40 bg-red-500/10 text-red-300";
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          border
                          px-4
                          py-3
                          ${optionClass}
                        `}
                      >
                        <span>
                          {option}
                        </span>

                        <div className="flex gap-2 text-xs font-medium">

                          {isSelected && (
                            <span>
                              Your Answer
                            </span>
                          )}

                          {isCorrect && (
                            <span>
                              Correct
                            </span>
                          )}

                        </div>
                      </div>
                    );
                  })}

                </div>

                {/* Unanswered */}
                {selectedOption === null && (
                  <p className="mt-4 text-sm text-slate-500">
                    You did not answer this question.
                  </p>
                )}

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}

export default QuizView;