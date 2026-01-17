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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { STATICS_API } from "@/api/ApiEndPoint";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const StaticAnalysis = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosInstance.get(STATICS_API);
      return res.data;
    },
  });

  const data = {
    labels: ["Total Users", "Parents", "Tutors", "Verified", "New (Week)"],
    datasets: [
      {
        fill: true,
        label: "Users",
        // Extracting values from your JSON structure
        data: stats
          ? [
              stats.users.total,
              stats.users.parents,
              stats.users.tutors,
              stats.users.verified,
              stats.users.new_this_week,
            ]
          : [0, 0, 0, 0, 0],
        borderColor: "#2563EB",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.2)");
          gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#2563EB",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
      },
    ],
  };

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
          label: (context) => `${context.parsed.y} Users`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#888888", font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        border: { display: false },
        grid: { color: "#F3F4F6" },
        ticks: {
          color: "#888888",
          callback: (value) => value,
        },
      },
    },
  };

  return (
    <div className="w-full mt-6">
      <div className="bg-white rounded-3xl shadow-sm border border-blue-50 p-8">
        <div className="flex items-center justify-between gap-8 mb-10">
          <div>
            <p className="text-gray text-sm mb-2">Static analysis</p>
            <h3 className="text-2xl font-bold text-dark">Users</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            {/* Kept your original design buttons without logic changes */}
            <div className="flex items-center flex-row gap-4 ">
              <p className="md:text-lg font-medium">Monthly</p>
            </div>
          </div>
        </div>

        <div className="relative h-100 w-full">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 animate-pulse rounded-xl">
              <p className="text-gray-400">Loading chart...</p>
            </div>
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StaticAnalysis;
