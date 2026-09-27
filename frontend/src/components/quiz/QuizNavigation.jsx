function QuizNavigation({
  isLastQuestion,
  selectedOption,
  onNext,
  onSubmit,
}) {
  return (
    <div className="mt-6 flex justify-end">

      <button
        type="button"
        disabled={selectedOption === null}
        onClick={isLastQuestion ? onSubmit : onNext}
        className="
          rounded-xl bg-violet-600
          px-6 py-3 text-sm font-semibold
          text-white transition
          hover:bg-violet-500
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        {isLastQuestion ? "Submit Quiz" : "Next →"}
      </button>

    </div>
  );
}

export default QuizNavigation;