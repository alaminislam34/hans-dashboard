"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Eye } from "lucide-react";
import DataTable from "../components/CommonTable";
import SupportDetailModal from "./components/SupportModal";

const SupportManage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // ✅ Stable data (prevents unnecessary re-renders)
  const allData = useMemo(
    () => [
      {
        id: 1,
        name: "Abir Hossain",
        email: "abid32@gmail.com",
        role: "Tutor",
        status: "Pending",
        img: "https://i.pravatar.cc/150?u=1",
      },
      {
        id: 2,
        name: "Maksud Bhuiya",
        email: "user123@example.com",
        role: "Parent",
        status: "Completed",
        img: "https://i.pravatar.cc/150?u=2",
      },
    ],
    []
  );

  // ✅ Stable modal handler
  const handleModal = useCallback((item) => {
    setSelectedData(item);
    setShowModal(true);
  }, []);

  // ✅ Filter data based on tab
  const filteredData = useMemo(() => {
    if (activeTab === "All") return allData;
    return allData.filter((item) => item.status === activeTab);
  }, [activeTab, allData]);

  // ✅ Table columns
  const columns = [
    {
      header: "User Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.img || "/images/user.jpg"}
            alt={item.name || "user"}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <span className="font-medium text-gray-700">{item.name}</span>
        </div>
      ),
    },
    {
      header: "Email",
      render: (item) => (
        <a
          href={`mailto:${item.email}`}
          className="text-emerald-600 hover:underline"
        >
          {item.email}
        </a>
      ),
    },
    {
      header: "Role",
      render: (item) => (
        <span
          className={
            item.role === "Tutor"
              ? "text-purple-600 font-medium"
              : "text-orange-500 font-medium"
          }
        >
          {item.role}
        </span>
      ),
    },
    {
      header: "Status",
      align: "center",
      render: (item) => (
        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold ${
            item.status === "Completed"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      align: "center",
      render: (item) => (
        <button
          onClick={() => handleModal(item)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Eye size={18} />
        </button>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Select options</h2>

        <div className="flex gap-6 border-b border-gray-100 pb-2">
          {["All", "Pending", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-medium relative ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <DataTable
          columns={columns}
          data={filteredData}
          emptyMessage={`No ${activeTab.toLowerCase()} requests found.`}
        />
      </div>

      {/* Modal */}
      {showModal && selectedData && (
        <SupportDetailModal
          data={selectedData}
          close={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default SupportManage;
