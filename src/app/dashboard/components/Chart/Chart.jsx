"use client";

import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Required for area charts/gradient fill
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Mock Data structure to simulate weekly user growth
const MOCK_CHART_DATA = [
  { day: 'Mon', users: 700 },
  { day: 'Tue', users: 2100 },
  { day: 'Wed', users: 1200 },
  { day: 'Thu', users: 3100 },
  { day: 'Fri', users: 2600 },
  { day: 'Sat', users: 3050 },
  { day: 'Sun', users: 1300 },
];

export default function UserGrowthChart({ totalUsers }) {
  // Function to create the gradient background (similar to the image)
  const createGradient = (ctx) => {
    const chart = ctx.chart;
    const { ctx: chartContext, chartArea } = chart;
    if (!chartArea) {
      // This can happen on initial render
      return null;
    }
    const gradient = chartContext.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    // Define the colors for the gradient (adjust hex codes to match your theme perfectly)
    gradient.addColorStop(0, 'rgba(100, 100, 255, 0.2)'); // Light purple/blue at the bottom
    gradient.addColorStop(0.5, 'rgba(50, 200, 200, 0.4)'); // Teal/Cyan in the middle
    gradient.addColorStop(1, 'rgba(120, 255, 120, 0.7)'); // Light green at the top
    return gradient;
  };

  // Memoize the chart data structure
  const data = useMemo(() => {
    return {
      labels: MOCK_CHART_DATA.map(item => item.day),
      datasets: [
        {
          label: 'Users',
          data: MOCK_CHART_DATA.map(item => item.users),
          fill: true, // Enable filling for the area chart
          backgroundColor: (context) => createGradient(context), // Apply the gradient
          borderColor: 'rgba(100, 100, 255, 1)', // Single color for the line (or remove for gradient line)
          borderWidth: 2,
          tension: 0.4, // Smooths the line (curve)
          pointRadius: 5,
          pointBackgroundColor: 'white',
          pointBorderColor: 'rgba(100, 100, 255, 1)',
          pointHoverRadius: 6,
        },
      ],
    };
  }, []);

  // Define Chart Options (to match the image's appearance)
  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false, // Allows you to control height
      plugins: {
        legend: {
          display: false, // Hide legend label
        },
        title: {
          display: false,
        },
        tooltip: {
          // Customizing tooltip to look like the image (white box with bold text)
          backgroundColor: 'white',
          titleColor: '#1D1B20',
          bodyColor: '#1D1B20',
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 12 },
          padding: 10,
          caretSize: 0, // Hides the arrow pointer
          cornerRadius: 8,
          borderColor: '#ddd',
          borderWidth: 1,
          displayColors: false, // Hide color box inside tooltip
          callbacks: {
            title: (tooltipItems) => {
              // Calculate a mock growth value for the title (e.g., difference from previous day)
              const currentIndex = tooltipItems[0].dataIndex;
              const currentValue = tooltipItems[0].raw;
              const previousValue = currentIndex > 0 ? MOCK_CHART_DATA[currentIndex - 1].users : 0;
              const change = currentValue - previousValue;
              
              if (change > 0) {
                  return `+${(change / 1000).toFixed(1)}k`;
              }
              return `${(change / 1000).toFixed(1)}k`;
            },
            label: (tooltipItem) => {
                // Return a mock date/time similar to the image's secondary text
                return `${MOCK_CHART_DATA[tooltipItem.dataIndex].day}, ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}: ${tooltipItem.raw}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false, // Hide vertical grid lines
          },
          ticks: {
            color: '#777', // Day labels color
          }
        },
        y: {
          beginAtZero: true,
          // Custom labels to show 'k' (1k, 2k, 3k, 4k)
          ticks: {
            callback: function(value) {
              if (value >= 1000) {
                return (value / 1000) + 'k';
              }
              return value;
            },
            stepSize: 1000, // Steps of 1000 users
            color: '#777', // User count labels color
          },
          grid: {
            color: '#E0E0E0', // Light gray horizontal grid lines
            borderDash: [5, 5], // Dotted line style
            drawBorder: false,
          },
        },
      },
      interaction: {
        mode: 'index',
        intersect: false,
      },
    };
  }, []);

  return (
    <div className="p-4 bg-white border border-[#B9DAFE] rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#1D1B20]">Users</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked 
              readOnly 
              className="form-checkbox text-blue-600 rounded" 
            />
            <span className="ml-1 text-[#1D1B20] font-medium">Weekly</span>
          </label>
          <label className="flex items-center cursor-pointer opacity-50">
            <input 
              type="checkbox" 
              readOnly 
              className="form-checkbox text-blue-600 rounded" 
            />
            <span className="ml-1 text-[#1D1B20]">Monthly</span>
          </label>
        </div>
      </div>
      
      {/* Chart container */}
      <div style={{ height: '300px' }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}