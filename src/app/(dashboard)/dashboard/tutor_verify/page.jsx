"use client";

import React, { useState, useMemo } from "react";
import { Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/CommonTable";
import UserInfoModal from "./components/ActionModal";
import axiosInstance from "@/api/axiosInstance";

const TutorManage = () => {
  const [filter, setFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);

  // 1. Fetch Users and Filter Tutors
  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/accounts/users/");
      const allUsers = res.data.results || [];
      // Only keep users with type "tutor"
      return allUsers.filter((user) => user.user_type === "tutor");
    },
  });

  // 2. Filter by status (Pending, Approved/Verified, Rejected)
  const filteredTutors = useMemo(() => {
    if (filter === "All") return tutors;
    return tutors.filter((tutor) => {
      const status = tutor.profile?.verification_status?.toLowerCase();
      return status === filter.toLowerCase();
    });
  }, [tutors, filter]);

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-pendingBG text-pendingText";
      case "approved":
      case "verified":
        return "bg-approvedBG text-approvedText";
      case "rejected":
        return "bg-rejectBG text-rejectText";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    {
      header: "User Name",
      render: (tutor) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <img
              src={
                tutor.profile_picture ||
                `https://ui-avatars.com/api/?name=${tutor.username}&background=random`
              }
              alt={tutor.username}
            />
          </div>
          <span className="font-medium text-dark whitespace-nowrap">
            {tutor.full_name || tutor.username}
          </span>
        </div>
      ),
    },
    {
      header: "Email",
      render: (tutor) => (
        <a
          href={`mailto:${tutor.email}`}
          className="text-secondary hover:underline"
        >
          {tutor.email}
        </a>
      ),
    },
    {
      header: "Status",
      render: (tutor) => (
        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
            tutor.profile?.verification_status
          )}`}
        >
          {tutor.profile?.verification_status || "N/A"}
        </span>
      ),
    },
    {
      header: "Action",
      align: "center",
      render: (tutor) => (
        <button
          onClick={() => setSelectedUser(tutor)}
          className="text-secondary hover:scale-110 transition-transform inline-block"
        >
          <Eye size={20} />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
        <h1 className="text-xl font-bold text-dark">Tutor Management</h1>
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

      <div className="bg-white rounded-[15px] shadow-sm overflow-hidden border border-gray-100">
        <DataTable
          columns={columns}
          data={filteredTutors}
          emptyMessage={isLoading ? "Loading tutors..." : "No tutors found."}
        />
      </div>

      {selectedUser && (
        <UserInfoModal
          setShowModal={() => setSelectedUser(null)}
          userData={selectedUser}
        />
      )}
    </div>
  );
};

export default TutorManage;
