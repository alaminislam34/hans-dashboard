"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { User, ChevronDown } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const StaticAnalysis = () => {
  // Chart Data Configuration
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        fill: true,
        label: "Users",
        data: [1200, 1900, 3000, 5000, 3500, 4200, 8100],
        borderColor: "#2563EB", // --color-primary
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.2)");
          gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
          return gradient;
        },
        tension: 0.4, // Creates the smooth curve
        pointRadius: 6,
        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
      },
    ],
  };

  // Chart Options Configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#2B2B2B",
        bodyColor: "#888888",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `+${context.parsed.y / 1000}k Users`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#888888", font: { size: 12 } },
      },
      y: {
        border: { display: false },
        grid: { color: "#F3F4F6" },
        ticks: {
          color: "#888888",
          callback: (value) =>
            Number(value) >= 1000 ? `${Number(value) / 1000}k` : value,
        },
      },
    },
  };

  return (
    <div className="w-full mt-6">
      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-blue-50 p-8">
        {/* Stats Row */}
        <div className="flex items-center justify-between gap-8 mb-10">
          <div>
            <p className="text-gray text-sm mb-2">Static analysis</p>
            <h3 className="text-2xl font-bold text-dark">Users</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <button className="flex items-center flex-row gap-4 ">
              <span className="w-3 h-3 shadow rounded-full ring-4 ring-gray-100"></span>
              <p className="md:text-lg font-medium">Monthly</p>
            </button>
            <button className="flex items-center flex-row gap-4 ">
              <span className="w-3 h-3 shadow rounded-full ring-4 ring-gray-100"></span>
              <p className="md:text-lg font-medium">Monthly</p>
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="relative h-100 w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default StaticAnalysis;
