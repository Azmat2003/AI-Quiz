import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../context/AuthContext.js";

import TopicWordCloud from "../../components/dashboard/TopicWordCloud.jsx";
import PerformanceSummary from "../../components/dashboard/PerformanceSummary.jsx";
import ScoreTrend from "../../components/dashboard/ScoreTrend.jsx";


function Analytics() {
  const { user } = useContext(AuthContext);

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchAnalytics() {
    try {
      setLoading(true);
      setError(null);

      const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/dashboard/analytics`;

      const options = {
        method: "GET",
        credentials: "include",
      };

      const response = await fetch(api, options);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch analytics");
      }

      setAnalytics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-slate-400">
        Loading analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Analytics
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Understand your quiz activity and performance.
        </p>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopicWordCloud
          tags={analytics?.tags || []}
        />

        <PerformanceSummary
          user={user}
          performance={analytics?.performance}
        />
      </div>

      {/* Score Trend */}
      <ScoreTrend
        scoreTrend={analytics?.scoreTrend || []}
      />

    </div>
  );
}

export default Analytics;