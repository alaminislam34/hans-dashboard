"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DataTable from "../components/CommonTable";
import api from "@/lib/Api";
import UserInfoModal from "./components/ActionModal";
import { Eye } from "lucide-react";

const ClassManage = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("All");
  const [selectedClass, setSelectedClass] = useState(null);

  // ================= FETCH CLASSES =================
  const { data: allClasses = [], isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await api.get("/api/classes/summary/");
      // Ensure we return a plain array of plain objects
      return res.data.results || [];
    },
  });

  // ================= FILTER =================
  const filteredClasses = React.useMemo(() => {
    if (filter === "All") return allClasses;
    return allClasses.filter(
      (item) => item.verify_status?.toLowerCase() === filter.toLowerCase()
    );
  }, [allClasses, filter]);

  // ================= MODAL =================
  const handleViewDetails = (row) => {
    // Spread into a new object to ensure it's a plain POJO
    setSelectedClass({ ...row });
  };

  const handleCloseModal = () => {
    setSelectedClass(null);
    queryClient.invalidateQueries(["classes"]);
  };

  // ================= STATUS STYLE =================
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-pendingBG text-pendingText";
      case "approved":
        return "bg-approvedBG text-approvedText";
      case "rejected":
        return "bg-rejectBG text-rejectText";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      header: "Serial",
      render: (row) => (
        <span className="font-medium text-gray">#{row.class_id}</span>
      ),
    },
    {
      header: "Class Name",
      render: (row) => <span className="font-medium">{row.class_listing}</span>,
    },
    {
      header: "Tutor Name",
      render: (row) => <span>{row.tutor_name}</span>,
    },
    {
      header: "Status",
      align: "center",
      render: (row) => (
        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
            row.verify_status
          )}`}
        >
          {row.verify_status?.charAt(0).toUpperCase() +
            row.verify_status?.slice(1)}
        </span>
      ),
    },
    {
      header: "Action",
      align: "center",
      render: (row) => (
        <button
          onClick={() => handleViewDetails(row)}
          className="text-secondary hover:scale-110 transition-transform"
        >
          <Eye size={20} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
        <h1 className="text-xl font-bold">Classes</h1>

        <div className="flex gap-6 text-sm font-medium text-gray-500">
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

      <div className="bg-white rounded-[15px] shadow-sm overflow-hidden border border-gray-100">
        <DataTable
          columns={columns}
          data={filteredClasses}
          emptyMessage={isLoading ? "Loading..." : "No classes found."}
        />
      </div>

      {selectedClass && (
        <UserInfoModal
          setShowModal={handleCloseModal}
          userData={selectedClass}
        />
      )}
    </div>
  );
};

export default ClassManage;
