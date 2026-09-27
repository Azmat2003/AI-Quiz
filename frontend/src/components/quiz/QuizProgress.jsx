function QuizProgress({ currentQuestionIndex, totalQuestions }) {
  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6">

      <div className="mb-2 flex justify-between text-xs">
        <span className="text-slate-400">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </span>

        <span className="text-slate-500">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-violet-500 transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

    </div>
  );
}

export default QuizProgress;