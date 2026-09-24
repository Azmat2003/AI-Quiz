import React, { useState } from "react";
import { Link } from "react-router";
import FormError from "../components/FormError.jsx";
import FormSuccess from "../components/FormSuccess.jsx";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        // set error and success to ""
        setError("");
        setSuccess("");

        // API call
        try{
            const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`;
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
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            };

            console.log(api);

            const res = await fetch(api, options);
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.message);
            }

            if(data){
                setSuccess(data.message);
            }
        }
        catch(err){
            setError(err.message);
        }
    }

    return (
        <main className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-white">
            {/* ================= BACKGROUND ================= */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Animated Glows */}
                <div className="absolute -left-32 top-20 h-80 w-80 animate-pulse rounded-full bg-violet-600/20 blur-[120px]" />

                <div className="absolute -right-32 bottom-10 h-96 w-96 animate-pulse rounded-full bg-indigo-600/20 blur-[130px]" />

                <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[130px]" />

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

            {/* ================= SIGNUP CONTAINER ================= */}
            <div className="relative z-10 w-full max-w-md">
                {/* Top Badge */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300 backdrop-blur-xl">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                        Start Learning with AI
                    </div>
                </div>

                {/* ================= CARD ================= */}
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/20 sm:p-10">
                    {/* Card Glow */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

                    {/* ================= HEADER ================= */}
                    <div className="relative mb-8 text-center">
                        <Link
                            to="/"
                            className="mb-5 inline-block text-2xl font-bold tracking-tight transition-transform duration-300 hover:scale-105"
                        >
                            Quiz<span className="text-violet-500">AI</span>
                        </Link>

                        <h1 className="text-3xl font-bold tracking-tight">
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Join QuizAI and start your AI-powered learning
                            journey.
                        </p>
                    </div>

                    {/* ================= FORM ================= */}
                    <form
                        onSubmit={handleSubmit}
                        className="relative space-y-5"
                    >
                        {/* ================= NAME ================= */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Name
                            </label>

                            <div className="group/input relative">
                                {/* User Icon */}
                                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                    <svg
                                        className="h-5 w-5 text-slate-500 transition-colors duration-300 group-focus-within/input:text-violet-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.8}
                                            d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m7-10a4 4 0 100-8 4 4 0 000 8z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-500/60 focus:bg-slate-900 focus:ring-4 focus:ring-violet-500/10"
                                />
                            </div>
                        </div>

                        {/* ================= EMAIL ================= */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Email
                            </label>

                            <div className="group/input relative">
                                {/* Email Icon */}
                                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                    <svg
                                        className="h-5 w-5 text-slate-500 transition-colors duration-300 group-focus-within/input:text-violet-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.8}
                                            d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-500/60 focus:bg-slate-900 focus:ring-4 focus:ring-violet-500/10"
                                />
                            </div>
                        </div>

                        {/* ================= PASSWORD ================= */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Password
                            </label>

                            <div className="group/input relative">
                                {/* Lock Icon */}
                                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                                    <svg
                                        className="h-5 w-5 text-slate-500 transition-colors duration-300 group-focus-within/input:text-violet-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.8}
                                            d="M12 11c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6 0V8a6 6 0 10-12 0v3m-1 0h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-500/60 focus:bg-slate-900 focus:ring-4 focus:ring-violet-500/10"
                                />
                            </div>
                        </div>

                        {
                            error && <FormError error = {error}></FormError>
                        } 


                        {
                            success && 
                            <FormSuccess success={success}></FormSuccess>
                        }

                        {/* ================= SIGNUP BUTTON ================= */}
                        <button
                            type="submit"
                            className="group/btn mt-2 w-full rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-500/30 active:translate-y-0"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Create Account
                                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                                    →
                                </span>
                            </span>
                        </button>
                    </form>

                    {/* ================= LOGIN LINK ================= */}
                    <div className="relative mt-8">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/10" />

                            <span className="text-xs text-slate-600">
                                Already a member?
                            </span>

                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <p className="text-center text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-violet-400 transition-colors duration-300 hover:text-violet-300"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Text */}
                <p className="mt-6 text-center text-xs text-slate-600">
                    Create. Practice. Analyze. Improve.
                </p>
            </div>
        </main>
    );
}

export default Signup;
