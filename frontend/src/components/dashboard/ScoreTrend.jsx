import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const quiz = payload[0].payload;

  return (
    <div
      className="
        rounded-xl
        border border-white/10
        bg-slate-950/80
        px-4 py-3
        shadow-xl
        backdrop-blur-md
      "
    >
      <p className="font-semibold text-white">
        {quiz.title}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {quiz.topic} • {quiz.difficulty}
      </p>

      <p className="mt-2 text-sm font-medium text-indigo-300">
        {quiz.score} / {quiz.totalQuestions} ({quiz.percentage}%)
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {new Date(quiz.submittedAt).toLocaleDateString()}
      </p>
    </div>
  );
}

function ScoreTrend({ scoreTrend = [] }) {
  if (!scoreTrend.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold text-white">
          Quiz Score Trend
        </h2>

        <p className="mt-6 text-sm text-slate-500">
          Complete quizzes to see your performance trend.
        </p>
      </div>
    );
  }

  const graphData = scoreTrend.map((quiz, index) => ({
    ...quiz,
    quizNumber: `Quiz ${index + 1}`,
  }));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Quiz Score Trend
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your submitted quiz scores over time.
        </p>
      </div>

      {/* Graph */}
      <div className="mt-6 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={graphData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.06)"
            />

            <XAxis
              dataKey="quizNumber"
              stroke="#64748b"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              stroke="#64748b"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />

            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#818cf8"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#0f172a",
                stroke: "#818cf8",
                strokeWidth: 3,
              }}
              activeDot={{
                r: 8,
                fill: "#818cf8",
                stroke: "#c4b5fd",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default ScoreTrend;