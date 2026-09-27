function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">

      <h2 className="text-xl font-semibold leading-8 text-white sm:text-2xl">
        {question.question}
      </h2>

      <div className="mt-8 space-y-3">

        {question.options.map((option, index) => {

          const selected = selectedOption === index;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectOption(index)}
              className={`
                flex w-full items-center gap-4
                rounded-2xl border p-4 text-left
                transition-all duration-200

                ${
                  selected
                    ? "border-violet-500 bg-violet-500/10"
                    : "border-white/10 bg-white/[0.02] hover:border-violet-500/40"
                }
              `}
            >

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-950 text-sm">
                {String.fromCharCode(65 + index)}
              </span>

              <span className="text-slate-300">
                {option}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default QuestionCard;