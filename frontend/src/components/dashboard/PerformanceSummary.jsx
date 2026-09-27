import React from "react";

function PerformanceSummary({ performance, user }) {
  if (!performance) {
    return null;
  }

  const {
    averageScore = 0,
    completedQuizzes = 0,
    generatedQuizzes = 0,
  } = performance;

  const getMessage = () => {
    if (averageScore >= 80) {
      return "Excellent consistency. Keep pushing!";
    }

    if (averageScore >= 60) {
      return "Good progress. You're moving in the right direction.";
    }

    if (averageScore >= 40) {
      return "You're improving. Keep practicing.";
    }

    return "Keep going. Every quiz helps you improve.";
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex flex-col items-center text-center">

        {/* Profile Photo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl" />

          <img
            src={user?.profilePic}
            alt={user?.name || "User"}
            className="
              relative
              h-20
              w-20
              rounded-full
              border-2
              border-indigo-400/40
              object-cover
              shadow-lg
            "
          />
        </div>

        {/* User */}
        <h2 className="mt-4 text-xl font-semibold text-white">
          {user?.name || "User"}
        </h2>

        {/* Average Score */}
        <div className="mt-4">
          <p className="text-4xl font-bold text-indigo-400">
            {averageScore}%
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Average Score
          </p>
        </div>

        {/* Positive Message */}
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
          {getMessage()}
        </p>

        {/* Stats */}
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/5 bg-slate-950/30 p-3">
            <p className="text-lg font-semibold text-white">
              {completedQuizzes}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Completed
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-slate-950/30 p-3">
            <p className="text-lg font-semibold text-white">
              {generatedQuizzes}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Generated
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PerformanceSummary;