import React, { useState } from "react";
import { Link, useParams } from "react-router";
import FormError from "../components/FormError.jsx";
import FormSuccess from "../components/FormSuccess.jsx";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        console.log({
            newPassword,
            confirmPassword,
        });

        // Reset password API call here
        try {
            const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/reset-password/${token}`;
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
                  password : newPassword
                }),
            };

            const res = await fetch(api, options);
            const data = await res.json();

            if(!res.ok){
              throw new Error(data.message);
            }

            if(data){
              setSuccess(data.message);
            }

        } 
        catch (err) {
          setError(err.message);
        }
    };

    return (
        <main className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-white">
            {/* ================= BACKGROUND ================= */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Animated Violet Glow */}
                <div className="absolute -left-32 top-20 h-80 w-80 animate-pulse rounded-full bg-violet-600/20 blur-[120px]" />

                {/* Animated Indigo Glow */}
                <div className="absolute -right-32 bottom-10 h-96 w-96 animate-pulse rounded-full bg-indigo-600/20 blur-[130px]" />

                {/* Center Glow */}
                <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[130px]" />

                {/* Background Grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            {/* ================= CONTAINER ================= */}
            <div className="relative z-10 w-full max-w-md">
                {/* Badge */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300 backdrop-blur-xl">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
                        Secure Password Reset
                    </div>
                </div>

                {/* ================= CARD ================= */}
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-500 hover:border-violet-500/20 sm:p-10">
                    {/* Card Glow */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl transition-all duration-500 group-hover:bg-violet-500/20" />

                    {/* ================= HEADER ================= */}
                    <div className="relative mb-8 text-center">
                        {/* Lock Icon */}
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400 shadow-lg shadow-violet-500/10 transition-transform duration-300 hover:scale-105">
                            <svg
                                className="h-7 w-7"
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

                        <h1 className="text-3xl font-bold tracking-tight">
                            Reset Password
                        </h1>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                            Create a new password for your QuizAI account.
                        </p>
                    </div>

                    {/* ================= FORM ================= */}
                    <form
                        onSubmit={handleSubmit}
                        className="relative space-y-5"
                    >
                        {/* NEW PASSWORD */}
                        <div>
                            <label
                                htmlFor="newPassword"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                New Password
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
                                            d="M6 10V8a6 6 0 1112 0v2m-13 0h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="newPassword"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    required
                                    className="w-full rounded-xl border border-white/10 bg-slate-900/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-white/20 focus:border-violet-500/60 focus:bg-slate-900 focus:ring-4 focus:ring-violet-500/10"
                                />
                            </div>
                        </div>

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-slate-300"
                            >
                                Confirm Password
                            </label>

                            <div className="group/input relative">
                                {/* Check Icon */}
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
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    className={`w-full rounded-xl border bg-slate-900/70 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:bg-slate-900 focus:ring-4 ${
                                        error
                                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                            : "border-white/10 hover:border-white/20 focus:border-violet-500/60 focus:ring-violet-500/10"
                                    }`}
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="mt-2 text-xs text-red-400">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Password Hint */}
                        <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                            <p className="text-xs leading-5 text-slate-500">
                                Choose a strong password that you don't use on
                                other accounts.
                            </p>
                        </div>

                        {/* ERROR */}
                        {error && <FormError error={error}></FormError>}

                        {/* SUCCESS */}
                        {success && (
                            <FormSuccess success={success}></FormSuccess>
                        )}

                        {/* ================= SUBMIT BUTTON ================= */}
                        <button
                            type="submit"
                            className="group/btn w-full rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-xl hover:shadow-violet-500/30 active:translate-y-0"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Reset Password
                                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                                    →
                                </span>
                            </span>
                        </button>
                    </form>

                    {/* ================= BACK TO LOGIN ================= */}
                    <div className="relative mt-8">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/10" />

                            <span className="text-xs text-slate-600">
                                Back to QuizAI
                            </span>

                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-400 transition-colors duration-300 hover:text-violet-300"
                            >
                                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                                    ←
                                </span>
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-600">
                    QuizAI • Learn smarter with AI
                </p>
            </div>
        </main>
    );
}

export default ResetPassword;
