function QuizHeader({ title, difficulty }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
        {difficulty}
      </p>

      <h1 className="mt-2 text-2xl font-bold text-white">
        {title}
      </h1>
    </div>
  );
}

export default QuizHeader;