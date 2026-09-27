import React from "react";
import { Outlet } from "react-router";

import DashboardSidebar from "../components/dashboard/DashboardSidebar.jsx";

function DashboardLayout() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-white">
      
      {/* Background Decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />

        <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      {/* Dashboard Container */}
      <div className="relative mx-auto flex max-w-7xl flex-col md:flex-row">

        {/* Sidebar */}
        <aside
          className="
            w-full
            border-b border-white/10
            bg-slate-950/70
            backdrop-blur-xl
            md:sticky
            md:top-16
            md:h-[calc(100vh-64px)]
            md:w-64
            md:border-b-0
            md:border-r
          "
        >
          <DashboardSidebar />
        </aside>

        {/* Dashboard Content */}
        <main
          className="
            min-w-0
            flex-1
            px-4
            py-6
            sm:px-6
            md:px-8
            md:py-8
            lg:px-10
          "
        >
          {/* Subtle page entrance */}
          <div className="animate-[fadeIn_0.35s_ease-out]">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;