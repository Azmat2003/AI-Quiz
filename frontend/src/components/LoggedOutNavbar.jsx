import React from "react";
import { Link } from "react-router";

function LoggedOutNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white transition hover:scale-105"
        >
          Quiz<span className="text-violet-500">AI</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            to="/"
            className="hidden text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-white sm:block"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-violet-500/30"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LoggedOutNavbar;