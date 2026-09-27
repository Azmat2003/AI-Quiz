import React from "react";
import { Link } from "react-router";

function PerformanceCard({ title, quiz }) {
  if (!quiz) {
    return null;
  }

  return (
    <div
      className="
        group
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-500/30
        hover:bg-white/[0.05]
      "
    >
      {/* Card Title */}
      <p className="text-sm font-medium text-slate-400">
        {title}
      </p>

      {/* Quiz Info */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-white">
          {quiz.title}
        </h2>

        <div className="mt-2 flex items-center gap-3 text-sm text-slate-400">
          <span>{quiz.topic}</span>

          <span className="h-1 w-1 rounded-full bg-slate-600" />

          <span>{quiz.difficulty}</span>
        </div>
      </div>

      {/* Score */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-indigo-400">
            {quiz.percentage}%
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {quiz.score} / {quiz.totalQuestions}
          </p>
        </div>

        <Link
          to={`/quiz/${quiz.quizId}`}
          className="
            text-sm
            font-medium
            text-indigo-400
            transition-colors
            duration-200
            hover:text-indigo-300
          "
        >
          View Quiz →
        </Link>
      </div>
    </div>
  );
}

export default PerformanceCard;