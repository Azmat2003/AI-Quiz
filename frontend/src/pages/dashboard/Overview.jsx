import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext";

import StatCard from "../../components/dashboard/StatCard";
import PerformanceCard from "../../components/dashboard/PerformanceCard";

function Overview() {
  const { user } = useContext(AuthContext);

  const [overview, setOverview] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  // Fetch Overview Data
  async function fetchOverview() {
    try {
      setLoading(true);

      setError(null);

      const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/overview`;

      const options = {
        method: "GET",
        credentials: "include",
      };

      const response = await fetch(api, options);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch overview");
      }

      setOverview(data);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    fetchOverview();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="text-sm text-slate-400">
        Loading overview...
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
        {error}
      </div>
    );
  }

  const stats = overview?.stats;

  const highestQuiz = overview?.performance?.highest;

  const lowestQuiz = overview?.performance?.lowest;

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Here's an overview of your quiz activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          title="Quizzes Generated"
          value={`${stats?.generated || 0} / ${stats?.limit || 10}`}
        />

        <StatCard
          title="Completed Quizzes"
          value={stats?.completed || 0}
        />

        <StatCard
          title="Average Score"
          value={`${stats?.averageScore || 0}%`}
        />

      </div>

      {/* Performance */}
      <div>

        <h2 className="text-lg font-semibold text-white">
          Performance Highlights
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your highest and lowest scoring completed quizzes.
        </p>

        {highestQuiz && lowestQuiz ? (
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

            <PerformanceCard
              title="Highest Score"
              quiz={highestQuiz}
            />

            <PerformanceCard
              title="Lowest Score"
              quiz={lowestQuiz}
            />

          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">

            <p className="text-sm text-slate-400">
              Complete a quiz to see your performance highlights.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default Overview;