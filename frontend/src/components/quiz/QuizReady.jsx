import React, { useState } from "react";
import { useNavigate } from "react-router";
import FormError from "../FormError.jsx";

function QuizReady({ quiz }) {
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // ================= START QUIZ =================
  const startQuiz = async (e)=>{
    e.preventDefault();

    try{
        setError("");
        const quizId = quiz._id; 
        const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes/${quizId}/attempt`;
        const options = {
                // 1. Specify the HTTP method
                method: "POST",

                // 2. for cookies
                credentials: "include",
            };

        const res = await fetch(api, options);
        const data = await res.json();

        if(!res.ok){
            throw new Error(data.message || "Failed to start Quiz");
        }
        
        // navigation. => /// v.v.v.imp
        navigate(`/quiz/${quizId}/attempt`);
    }
    catch(err){
      setError(err.message);
    }
  }


  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-emerald-500/20
      bg-slate-900/60 px-6 py-12 shadow-2xl
      shadow-violet-950/20 backdrop-blur-xl
      animate-[fadeIn_0.5s_ease-out] sm:px-10"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-20
        h-72 w-72 -translate-x-1/2 rounded-full
        bg-violet-600/10 blur-[100px]"
      />

      <div className="relative flex flex-col items-center text-center">

        {/* Success Icon */}
        <div className="relative mb-7">
          {/* Pulse */}
          <div
            className="absolute inset-0 rounded-full
            bg-emerald-500/20 blur-xl animate-pulse"
          />

          {/* Outer Ring */}
          <div
            className="absolute -inset-3 rounded-full
            border border-emerald-500/20"
          />

          {/* Check */}
          <div
            className="relative flex h-20 w-20 items-center
            justify-center rounded-full
            border border-emerald-500/30
            bg-emerald-500/10
            shadow-lg shadow-emerald-500/10
            animate-[fadeIn_0.4s_ease-out]"
          >
            <span className="text-3xl text-emerald-400">
              ✓
            </span>
          </div>
        </div>

        {/* Label */}
        <p
          className="mb-3 text-xs font-semibold uppercase
          tracking-[0.25em] text-emerald-400"
        >
          Quiz Generated
        </p>

        {/* Heading */}
        <h2
          className="text-2xl font-bold tracking-tight
          text-white sm:text-3xl"
        >
          Your quiz is ready!
        </h2>

        {/* Description */}
        <p
          className="mt-3 max-w-md text-sm
          leading-6 text-slate-400"
        >
          Everything is set. Take a moment, get ready,
          and start when you&apos;re comfortable.
        </p>

        {/* Quiz Title */}
        <div
          className="mt-8 w-full max-w-lg rounded-2xl
          border border-white/[0.08]
          bg-slate-950/40 p-6"
        >
          <p
            className="text-xs font-medium uppercase
            tracking-wider text-slate-500"
          >
            Your Challenge
          </p>

          <h3
            className="mt-2 text-xl font-semibold
            text-white"
          >
            {quiz.title}
          </h3>

          {/* Quiz Info */}
          <div
            className="mt-6 flex flex-wrap
            justify-center gap-2"
          >
            {/* Difficulty */}
            <span
              className="rounded-lg border border-violet-500/20
              bg-violet-500/10 px-3 py-2
              text-xs font-medium text-violet-300"
            >
              {quiz.difficulty}
            </span>

            {/* Questions */}
            <span
              className="rounded-lg border border-white/10
              bg-white/[0.03] px-3 py-2
              text-xs text-slate-300"
            >
              {quiz.questions?.length || 10} Questions
            </span>

            {/* Timer */}
            <span
              className="rounded-lg border border-white/10
              bg-white/[0.03] px-3 py-2
              text-xs text-slate-300"
            >
              {quiz.questionTimer}s / question
            </span>
          </div>
        </div>

        {/* Reminder */}
        <div
          className="mt-5 flex w-full max-w-lg
          items-start gap-3 rounded-xl
          border border-amber-500/10
          bg-amber-500/[0.04] px-4 py-3
          text-left"
        >
          <span className="mt-0.5 text-sm">
            ⏱
          </span>

          <p className="text-xs leading-5 text-slate-400">
            Your timer will begin once you start the quiz.
            Make sure you&apos;re ready before continuing.
          </p>
        </div>

        {
            error && <FormError error={error}></FormError>
        }

        {/* Start Button */}
        <button
          type="button"
          onClick={startQuiz}
          className="group relative mt-8 w-full max-w-lg
          overflow-hidden rounded-2xl
          bg-violet-600 px-6 py-4
          text-sm font-semibold text-white
          shadow-xl shadow-violet-500/20
          transition-all duration-300
          hover:-translate-y-0.5
          hover:bg-violet-500
          hover:shadow-violet-500/30"
        >
          {/* Shine */}
          <span
            className="absolute inset-0 -translate-x-full
            bg-gradient-to-r from-transparent
            via-white/10 to-transparent
            transition-transform duration-700
            group-hover:translate-x-full"
          />

          <span
            className="relative flex items-center
            justify-center gap-2"
          >
            Start Quiz

            <span
              className="transition-transform duration-300
              group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </button>

        <p className="mt-4 text-xs text-slate-600">
          Good luck — you&apos;ve got this.
        </p>

      </div>
    </div>
  );
}

export default QuizReady;