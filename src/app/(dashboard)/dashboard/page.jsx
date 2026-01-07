"use client";

import StaticAnalysis from "./components/StaticAnalysis";
import Stats from "./components/Stats";

const DashboardPage = () => {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <Stats />
      <StaticAnalysis />
    </div>
  );
};

export default DashboardPage;
