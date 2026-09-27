import React from "react";

function StatCard({ title, value }) {
  return (
    <div
      className="
        group
        rounded-2xl
        border border-white/10
        bg-white/[0.03]
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-500/30
        hover:bg-white/[0.05]
        hover:shadow-lg
        hover:shadow-indigo-500/5
      "
    >
      {/* Title */}
      <p className="text-sm font-medium text-slate-400">
        {title}
      </p>

      {/* Value */}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
        {value}
      </h2>

      {/* Small Accent */}
      <div className="mt-4 h-1 w-8 rounded-full bg-indigo-500 transition-all duration-300 group-hover:w-12" />
    </div>
  );
}

export default StatCard;