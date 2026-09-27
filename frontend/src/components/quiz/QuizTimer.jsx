function QuizTimer({ timeLeft }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2">

      <p className="text-xs text-slate-500">
        Time Left
      </p>

      <p className="text-lg font-semibold text-white">
        {timeLeft}s
      </p>

    </div>
  );
}

export default QuizTimer;