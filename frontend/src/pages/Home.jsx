import React, { useContext } from "react";
import { Link } from "react-router";
import AuthContext from "../context/AuthContext.js";

function Home() {
    const features = [
        {
            icon: "✦",
            title: "AI Quiz Generator",
            description:
                "Turn any topic into an interactive quiz in seconds. Choose your topic, difficulty and preferences — AI handles the rest.",
        },
        {
            icon: "◈",
            title: "Dashboard Analytics",
            description:
                "Track your quiz history, scores and learning progress through a clean and insightful analytics dashboard.",
        },
        {
            icon: "⚡",
            title: "AI-Powered Learning",
            description:
                "Practice smarter with personalized AI-generated questions designed to make learning engaging and effective.",
        },
    ];

    const { user } = useContext(AuthContext);

    return (
        <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
            {/* ================= HERO ================= */}
            <section className="relative flex min-h-[88vh] items-center justify-center px-6">
                {/* Background Effects */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute left-[10%] top-[15%] h-72 w-72 animate-pulse rounded-full bg-violet-600/20 blur-[120px]" />

                    <div className="absolute bottom-[10%] right-[10%] h-80 w-80 animate-pulse rounded-full bg-indigo-600/20 blur-[130px]" />

                    <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[150px]" />

                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                            backgroundSize: "50px 50px",
                        }}
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 mx-auto max-w-5xl text-center">
                    {/* Badge */}
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300 backdrop-blur-md">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                        AI Powered Quiz Platform
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                        Learn Smarter.
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                            Quiz with AI.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                        Generate intelligent quizzes on any topic, test your
                        knowledge and track your performance — all powered by
                        AI.
                    </p>

                    {/* Buttons */}
                    {user && (
                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                to="/create-quiz"
                                className="group rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-500 hover:shadow-violet-500/40"
                            >
                                Generate a Quiz
                                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>

                            <Link
                                to="/dashboard"
                                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-semibold text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:bg-white/10 hover:text-white"
                            >
                                View Dashboard
                            </Link>
                        </div>
                    )}

                    {/* Mini stats */}
                    <div className="mx-auto mt-16 grid max-w-xl grid-cols-3 divide-x divide-white/10">
                        <div>
                            <p className="text-2xl font-bold text-white">AI</p>
                            <p className="mt-1 text-xs text-slate-500">
                                Generated
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-white">∞</p>
                            <p className="mt-1 text-xs text-slate-500">
                                Topics
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-white">
                                24/7
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Learning
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section className="relative px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    {/* Heading */}
                    <div className="mb-14 text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                            Everything you need
                        </p>

                        <h2 className="text-3xl font-bold sm:text-4xl">
                            A smarter way to
                            <span className="text-violet-400"> learn</span>
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-slate-400">
                            Create quizzes, test yourself and understand your
                            progress from one simple platform.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-violet-500/10"
                            >
                                {/* Glow */}
                                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/30" />

                                {/* Number */}
                                <span className="absolute right-5 top-5 text-xs font-semibold text-slate-700">
                                    0{index + 1}
                                </span>

                                {/* Icon */}
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-xl text-violet-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-500/20">
                                    {feature.icon}
                                </div>

                                <h3 className="mb-3 text-xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="text-sm leading-7 text-slate-400">
                                    {feature.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-violet-400 opacity-70 transition-all duration-300 group-hover:gap-3 group-hover:opacity-100">
                                    Explore
                                    <span>→</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="border-y border-white/5 bg-white/[0.015] px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-14 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
                            Simple & Fast
                        </p>

                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            From topic to quiz in seconds
                        </h2>
                    </div>

                    <div className="grid gap-10 md:grid-cols-3">
                        {[
                            [
                                "01",
                                "Choose a Topic",
                                "Enter what you want to practice and select your quiz preferences.",
                            ],
                            [
                                "02",
                                "AI Generates Quiz",
                                "Our AI creates relevant questions based on your selected topic.",
                            ],
                            [
                                "03",
                                "Learn & Analyze",
                                "Complete your quiz and track your performance from the dashboard.",
                            ],
                        ].map(([number, title, description]) => (
                            <div key={number} className="text-center">
                                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 font-bold text-violet-400">
                                    {number}
                                </div>

                                <h3 className="text-lg font-semibold">
                                    {title}
                                </h3>

                                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="px-6 py-24">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-transparent px-8 py-16 text-center">
                    <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 bg-violet-500/20 blur-[100px]" />

                    <div className="relative">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Ready to test your knowledge?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-slate-400">
                            Pick a topic and let AI build your next learning
                            challenge.
                        </p>

                        <Link
                            to="/create-quiz"
                            className="mt-8 inline-flex items-center rounded-xl bg-violet-600 px-7 py-3.5 font-semibold shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-500 hover:shadow-violet-500/40"
                        >
                            Create Your Quiz
                            <span className="ml-2">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="border-t border-white/5 px-6 py-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} QuizAI. Learn smarter with
                        AI.
                    </p>

                    <p>Built for smarter learning.</p>
                </div>
            </footer>
        </main>
    );
}

export default Home;
