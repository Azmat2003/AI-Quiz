import React from "react";

function QuizGenerating() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10
      bg-slate-900/60 px-6 py-16 shadow-2xl
      shadow-violet-950/20 backdrop-blur-xl
      animate-[fadeIn_0.5s_ease-out] sm:px-10"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2
        h-64 w-64 -translate-x-1/2 -translate-y-1/2
        rounded-full bg-violet-600/10 blur-[90px]"
      />

      {/* Content */}
      <div className="relative flex flex-col items-center text-center">

        {/* Animated AI Icon */}
        <div className="relative mb-8">

          {/* Outer pulse */}
          <div
            className="absolute inset-0 rounded-full
            bg-violet-500/20 blur-xl
            animate-pulse"
          />

          {/* Rotating ring */}
          <div
            className="absolute -inset-3 rounded-full
            border border-violet-500/20
            border-t-violet-400
            animate-spin"
          />

          {/* Icon */}
          <div
            className="relative flex h-20 w-20 items-center
            justify-center rounded-2xl
            border border-violet-500/30
            bg-violet-500/10
            shadow-lg shadow-violet-500/10"
          >
            <span className="text-3xl animate-pulse">
              ✦
            </span>
          </div>

        </div>

        {/* Small Label */}
        <p
          className="mb-3 text-xs font-semibold uppercase
          tracking-[0.25em] text-violet-400"
        >
          AI is working
        </p>

        {/* Main Heading */}
        <h2
          className="text-2xl font-bold tracking-tight
          text-white sm:text-3xl"
        >
          Building your quiz
          <span className="inline-flex w-8 justify-start">
            <span className="animate-pulse">...</span>
          </span>
        </h2>

        {/* Description */}
        <p
          className="mt-4 max-w-md text-sm
          leading-6 text-slate-400"
        >
          We're crafting questions based on your topic,
          difficulty, and preferred pace.
        </p>

        {/* Loading Progress */}
        <div className="mt-10 w-full max-w-md">

          <div
            className="h-1.5 overflow-hidden rounded-full
            bg-slate-800"
          >
            <div
              className="h-full w-1/2 rounded-full
              bg-gradient-to-r from-violet-600
              via-purple-400 to-violet-600
              animate-[loading_1.5s_ease-in-out_infinite]"
            />
          </div>

        </div>

        {/* Status */}
        <div
          className="mt-6 flex items-center gap-2
          text-xs text-slate-500"
        >
          <span
            className="h-1.5 w-1.5 rounded-full
            bg-violet-400 animate-pulse"
          />

          Generating thoughtful questions for you
        </div>

        {/* Bottom Cards */}
        <div
          className="mt-10 grid w-full max-w-md
          grid-cols-3 gap-3"
        >
          <LoadingStep
            icon="✦"
            text="Analyzing"
            delay="0ms"
          />

          <LoadingStep
            icon="◇"
            text="Generating"
            delay="200ms"
          />

          <LoadingStep
            icon="✓"
            text="Preparing"
            delay="400ms"
          />
        </div>

      </div>
    </div>
  );
}


function LoadingStep({ icon, text, delay }) {
  return (
    <div
      style={{
        animationDelay: delay,
      }}
      className="rounded-xl border border-white/[0.07]
      bg-white/[0.02] px-3 py-4
      animate-pulse"
    >
      <div className="text-lg text-violet-400">
        {icon}
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {text}
      </p>
    </div>
  );
}

export default QuizGenerating;