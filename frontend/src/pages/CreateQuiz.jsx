import React, { useState } from "react";

import QuizForm from "../components/quiz/QuizForm";
import QuizGenerating from "../components/quiz/QuizGenerating";
import QuizReady from "../components/quiz/QuizReady";

function CreateQuiz() {

  // ================= STATES =================

  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "MEDIUM",
    questionTimer: 40,
  });


  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        name === "questionTimer"
          ? Number(value)
          : value,
    }));

  };


  // ================= GENERATE QUIZ =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError(null);

      const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/quizzes/generate`;
      const options = {
                // 1. Specify the HTTP method
                method: "POST",

                // 2. Define content types and authentication
                headers: {
                    "Content-Type": "application/json",
                },

                // 3. for cookies
                credentials: "include",

                // 4. Serialize your JavaScript object into a JSON string
                body: JSON.stringify(formData),
            };

      const response = await fetch(api, options);
      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.message || "Failed to generate quiz"
        );
      }


      // Generated quiz received from backend
      setQuiz(data.quiz);

    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setLoading(false);
    }

  };

  


  // ================= UI =================

  return (

    <main
      className="relative min-h-[calc(100vh-73px)]
      overflow-hidden bg-slate-950 px-5 py-12 text-white"
    >

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        <div
          className="absolute left-1/2 top-10
          h-[450px] w-[450px]
          -translate-x-1/2 rounded-full
          bg-violet-600/10 blur-[130px]"
        />

        <div
          className="absolute -bottom-20 -left-20
          h-80 w-80 rounded-full
          bg-purple-600/5 blur-[120px]"
        />

      </div>


      {/* ================= CONTENT ================= */}

      <div className="relative mx-auto max-w-3xl">


        {/* ================= HEADING ================= */}

        <div
          className="mb-10 text-center
          animate-[fadeIn_0.6s_ease-out]"
        >

          <div
            className="mx-auto mb-5 flex h-14 w-14
            items-center justify-center rounded-2xl
            border border-violet-500/20
            bg-violet-500/10 text-2xl
            shadow-lg shadow-violet-500/10"
          >
            ✦
          </div>


          <p
            className="mb-2 text-xs font-semibold
            uppercase tracking-[0.25em]
            text-violet-400"
          >
            AI Quiz Generator
          </p>


          <h1
            className="text-3xl font-bold
            tracking-tight sm:text-5xl"
          >
            Create your next

            <span
              className="bg-gradient-to-r
              from-violet-400 to-purple-300
              bg-clip-text text-transparent"
            >
              {" "}challenge
            </span>

          </h1>


          <p
            className="mx-auto mt-4 max-w-xl
            text-sm leading-6 text-slate-400
            sm:text-base"
          >
            Pick a topic, choose your difficulty,
            set your pace, and let AI build a quiz
            just for you.
          </p>

        </div>


        {/* ================= ERROR ================= */}

        {error && (

          <div
            className="mb-5 rounded-xl
            border border-red-500/20
            bg-red-500/10 px-4 py-3
            text-center text-sm text-red-300"
          >
            {error}
          </div>

        )}


        {/* ================= STATE 1 ================= */}

        {!loading && !quiz && (

          <QuizForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

        )}


        {/* ================= STATE 2 ================= */}

        {loading && (

          <QuizGenerating />

        )}


        {/* ================= STATE 3 ================= */}

        {!loading && quiz && (

          <QuizReady
            quiz={quiz}
          />

        )}

      </div>

    </main>

  );
}

export default CreateQuiz;