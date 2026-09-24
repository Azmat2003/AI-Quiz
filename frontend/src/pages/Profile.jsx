import React, { useContext } from "react";
import AuthContext from "../context/AuthContext.js";

function Profile() {
  const { user } = useContext(AuthContext);

  // Change this according to how profilePic is stored in your backend
  const profileImage = user?.profilePic;

  const quizCount = user?.aiQuizGeneratedCount || 0;
  const maxQuizzes = 10;

  const percentage = Math.min((quizCount / maxQuizzes) * 100, 100);

  return (
    <main className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-slate-950 px-6 py-12 text-white">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">

        {/* Grid */}
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

        {/* Purple Glow */}
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-purple-500/5 blur-[100px]" />
      </div>

      {/* Page Content */}
      <div className="relative mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-10 animate-[fadeIn_0.7s_ease-out]">

          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
            Your Account
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Profile
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Your personal information and QuizAI usage.
          </p>

        </div>

        {/* Main Profile Card */}
        <div
          className="overflow-hidden rounded-3xl border border-white/10
          bg-slate-900/60 shadow-2xl shadow-violet-950/20
          backdrop-blur-xl
          transition-all duration-500
          hover:border-violet-500/20"
        >

          {/* Profile Header */}
          <div className="relative border-b border-white/10 px-6 py-8 sm:px-10">

            {/* Header glow */}
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative flex flex-col items-center gap-6 sm:flex-row">

              {/* Profile Photo */}
              <div className="group relative">

                <div
                  className="absolute -inset-1 rounded-full
                  bg-gradient-to-r from-violet-600 to-purple-400
                  opacity-50 blur
                  transition duration-500
                  group-hover:opacity-80"
                />

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="relative h-28 w-28 rounded-full
                    border-4 border-slate-900 object-cover
                    transition-transform duration-500
                    group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="relative flex h-28 w-28 items-center
                    justify-center rounded-full border-4 border-slate-900
                    bg-gradient-to-br from-violet-600 to-purple-700
                    text-4xl font-bold text-white
                    transition-transform duration-500
                    group-hover:scale-105"
                  >
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}

              </div>

              {/* User Info */}
              <div className="text-center sm:text-left">

                <h2 className="text-2xl font-bold text-white">
                  {user?.name || "User"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {user?.email || "No email available"}
                </p>

                <div
                  className="mt-4 inline-flex items-center gap-2
                  rounded-full border border-violet-500/20
                  bg-violet-500/10 px-3 py-1
                  text-xs font-medium text-violet-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />

                  QuizAI Member
                </div>

              </div>

            </div>
          </div>

          {/* Details */}
          <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-10">

            {/* Name */}
            <div
              className="group rounded-2xl border border-white/10
              bg-white/[0.025] p-5
              transition-all duration-300
              hover:-translate-y-1
              hover:border-violet-500/30
              hover:bg-violet-500/[0.04]"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Name
              </p>

              <p className="mt-2 text-lg font-semibold text-slate-100">
                {user?.name || "Not available"}
              </p>
            </div>

            {/* Email */}
            <div
              className="group rounded-2xl border border-white/10
              bg-white/[0.025] p-5
              transition-all duration-300
              hover:-translate-y-1
              hover:border-violet-500/30
              hover:bg-violet-500/[0.04]"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Email Address
              </p>

              <p className="mt-2 truncate text-lg font-semibold text-slate-100">
                {user?.email || "Not available"}
              </p>
            </div>

          </div>

          {/* Quiz Usage */}
          <div className="px-6 pb-8 sm:px-10 sm:pb-10">

            <div
              className="rounded-2xl border border-violet-500/20
              bg-gradient-to-br from-violet-500/[0.08]
              to-purple-500/[0.02] p-6"
            >

              <div className="mb-5 flex items-end justify-between">

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-violet-400">
                    AI Quiz Usage
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-white">
                    Quiz Generations
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-bold text-white">
                    {quizCount}
                  </span>

                  <span className="text-lg text-slate-500">
                    /{maxQuizzes}
                  </span>
                </div>

              </div>

              {/* Progress Bar */}
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full
                  bg-gradient-to-r from-violet-600 to-purple-400
                  transition-all duration-1000 ease-out"
                  style={{
                    width: `${percentage}%`,
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-500">

                <span>
                  {quizCount} quizzes generated
                </span>

                <span>
                  {Math.max(maxQuizzes - quizCount, 0)} remaining
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

export default Profile;