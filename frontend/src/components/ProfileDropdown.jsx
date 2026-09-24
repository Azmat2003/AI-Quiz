import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

function ProfileDropdown({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Profile Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-full
        border border-violet-500/40 bg-violet-500/10
        text-sm font-semibold text-violet-300
        transition-all duration-300 cursor-pointer
        hover:scale-105 hover:border-violet-400 hover:bg-violet-500/20"
      >
        {user?.name?.[0]?.toUpperCase()}
      </button>

      {/* Floating Dropdown */}
      <div
        className={`
          absolute right-0 top-14 w-64 origin-top-right
          rounded-2xl border border-white/10
          bg-slate-900/95 p-2 shadow-2xl
          shadow-black/40 backdrop-blur-xl
          transition-all duration-200

          ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }
        `}
      >

        {/* User Info */}
        <div className="border-b border-white/10 px-3 py-3">
          <p className="font-semibold text-white">
            {user?.name}
          </p>

          <p className="mt-0.5 truncate text-xs text-slate-400">
            {user?.email}
          </p>
        </div>

        {/* Profile */}
        <Link
          to="/profile"
          onClick={() => setIsOpen(false)}
          className="mt-2 flex items-center gap-3 rounded-xl
          px-3 py-2.5 text-sm text-slate-300
          transition-all duration-200
          hover:bg-white/5 hover:text-white"
        >
          <span className="text-lg">👤</span>

          <span>Profile</span>
        </Link>

        {/* Edit Profile */}
        <Link
          to="/edit-profile"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 rounded-xl
          px-3 py-2.5 text-sm text-slate-300
          transition-all duration-200
          hover:bg-white/5 hover:text-white"
        >
          <span className="text-lg">✏️</span>

          <span>Edit Profile</span>
        </Link>

        <div className="my-2 border-t border-white/10" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl
          px-3 py-2.5 text-left text-sm text-red-400
          transition-all duration-200 cursor-pointer
          hover:bg-red-500/10 hover:text-red-300"
        >
          <span className="text-lg">↪</span>

          <span>Logout</span>
        </button>

      </div>
    </div>
  );
}

export default ProfileDropdown;