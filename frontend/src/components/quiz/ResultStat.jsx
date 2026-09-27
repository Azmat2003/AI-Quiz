import React from "react";

function ResultStat({ value, label }) {
  return (
    <div className="min-w-[90px] rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">

      <p className="text-2xl font-bold text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>

    </div>
  );
}

export default ResultStat;