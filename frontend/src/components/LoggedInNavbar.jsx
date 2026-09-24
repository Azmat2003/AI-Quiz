import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../context/AuthContext.js";
import ProfileDropdown from "./ProfileDropdown.jsx";

function LoggedInNavbar() {
    const { user, logout } = useContext(AuthContext);
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
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hidden text-sm font-medium transition-colors duration-300 sm:block ${
                                isActive
                                    ? "text-violet-400"
                                    : "text-slate-300 hover:text-white"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `text-sm font-medium transition-colors duration-300 ${
                                isActive
                                    ? "text-violet-400"
                                    : "text-slate-300 hover:text-white"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/create-quiz"
                        className="rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-violet-500/30"
                    >
                        Create Quiz
                    </NavLink>

                    {/* Profile */}
                    <ProfileDropdown user={user} logout={logout} />
                </div>
            </div>
        </nav>
    );
}

export default LoggedInNavbar;
