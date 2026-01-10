"use client";

import React, { useState } from "react";
import { Eye } from "lucide-react"; // Install lucide-react or use an SVG

const tutorsData = [
  { id: 1, name: "Abir Hossain", email: "abid32@gmail.com", status: "Pending" },
  {
    id: 2,
    name: "Maksud Bhuiya",
    email: "user123@example.com",
    status: "Approved",
  },
  {
    id: 3,
    name: "Arjun Patel",
    email: "hello@creativeoutlook.com",
    status: "Rejected",
  },
  {
    id: 4,
    name: "Sita Sharma",
    email: "info@innovativeideas.com",
    status: "Pending",
  },
  {
    id: 5,
    name: "Kiran Mehta",
    email: "support@techsolutions.com",
    status: "Approved",
  },
  {
    id: 6,
    name: "Ravi Kumar",
    email: "contact@brightfuture.com",
    status: "Rejected",
  },
  {
    id: 7,
    name: "Anita Desai",
    email: "admin@yourdomain.com",
    status: "Pending",
  },
  {
    id: 8,
    name: "Deepak Verma",
    email: "reachus@smartsolutions.com",
    status: "Approved",
  },
];

const TutorManage = () => {
  const [filter, setFilter] = useState("All");

  const filteredTutors = tutorsData.filter((tutor) =>
    filter === "All" ? true : tutor.status === filter
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-pendingBG text-pendingText";
      case "Approved":
        return "bg-approvedBG text-approvedText";
      case "Rejected":
        return "bg-rejectBG text-rejectText";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-[#F3F4F6] min-h-screen">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b px-6 py-4 gap-4">
          <h1 className="text-xl font-bold text-dark">Select options</h1>
          <div className="flex gap-6 text-sm font-medium text-gray">
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`pb-1 transition-all ${
                  filter === tab
                    ? "text-primary border-b-2 border-primary"
                    : "hover:text-dark"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-dark font-semibold text-sm border-b">
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTutors.map((tutor) => (
                <tr
                  key={tutor.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                        {/* Replace with <Image /> if using local assets */}
                        <img
                          src={`https://ui-avatars.com/api/?name=${tutor.name}&background=random`}
                          alt={tutor.name}
                        />
                      </div>
                      <span className="font-medium text-dark whitespace-nowrap">
                        {tutor.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`mailto:${tutor.email}`}
                      className="text-secondary hover:underline underline-offset-4"
                    >
                      {tutor.email}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
                        tutor.status
                      )}`}
                    >
                      {tutor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-secondary hover:scale-110 transition-transform inline-block">
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTutors.length === 0 && (
            <div className="p-10 text-center text-gray">
              No tutors found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorManage;
