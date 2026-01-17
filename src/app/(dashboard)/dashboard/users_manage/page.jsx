"use client";

import React, { useState } from "react";
import { Eye, ChevronDown, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "../components/CommonTable";
import ParentBanModal from "./components/ParentModal";
import TutorBanModal from "./components/TutorModal";
import ReasonModal from "./components/ReasonModal";
import axiosInstance from "@/api/axiosInstance";
import { USERS_API } from "@/api/ApiEndPoint";

const UsersManage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("parent");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  // Modal visibility states
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [showParentModal, setShowParentModal] = useState(false);
  const [showReasonModal, setShowReasonModal] = useState(false);

  // --- API Fetching ---
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get(USERS_API);
      return response.data.results || [];
    },
  });

  // --- API Mutation (Suspend User) ---
  const banMutation = useMutation({
    mutationFn: async ({ userId, reason }) => {
      const response = await axiosInstance.post(
        "/api/accounts/admin/dashboard/suspend_user/",
        {
          user_id: userId,
          reason: reason,
        },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Close all modals on success
      setShowReasonModal(false);
      setShowTutorModal(false);
      setShowParentModal(false);
      toast.success("User account has been suspended.");
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Failed to suspend user.";
      toast.error(errorMsg);
    },
  });

  // --- Logic ---
  const handleConfirmSuspension = (reason) => {
    if (selectedUser) {
      banMutation.mutate({ userId: selectedUser.id, reason });
    }
  };

  const filteredData = users?.filter((user) => {
    // ১. ট্যাব ফিল্টার (Parent/Tutor)
    const type = user.user_type || "other";
    const matchesTab = type === activeTab;

    // ২. স্ট্যাটাস ফিল্টার (আপনার API এর 'status' ফিল্ড অনুযায়ী)
    // ডেটাতে 'status' ফিল্ড আছে (active/suspend)
    if (statusFilter === "all") return matchesTab;

    if (statusFilter === "active") {
      return matchesTab && user.status === "active";
    }

    if (statusFilter === "banned") {
      return matchesTab && user.status === "suspend";
    }

    return matchesTab;
  });

  const handleOpenProfileModal = (user) => {
    setSelectedUser(user);
    if (user.user_type === "tutor") {
      setShowTutorModal(true);
    } else {
      setShowParentModal(true);
    }
  };

  const commonColumns = [
    {
      header: "User Name",
      render: (row) => row.full_name || row.username || "N/A",
    },
    { header: "Email", key: "email" },
    ...(activeTab === "parent"
      ? [
          {
            header: "Child Education",
            render: (row) => row.profile?.child_education_level || "N/A",
          },
        ]
      : [
          {
            header: "Institution",
            render: (row) => row.profile?.institution || "N/A",
          },
        ]),
    {
      header: "Status",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
            row.status === "suspend"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {row.status || "Active"}
        </span>
      ),
    },
    {
      header: "Action",
      align: "center",
      render: (row) => (
        <button
          onClick={() => handleOpenProfileModal(row)}
          className="text-primary hover:scale-110 transition-all p-2 hover:bg-gray-100 rounded-full"
        >
          <Eye size={20} />
        </button>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  if (isError)
    return (
      <div className="text-center p-20 text-red-500">
        Error loading users. Please check API connection.
      </div>
    );

  return (
    <div className="p-4 md:p-0">
      {/* Toast Notification Container */}
      <Toaster position="top-right" />

      {/* Header with Tabs and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-8">
          <h1 className="text-lg font-semibold">Manage Users:</h1>
          <div className="flex gap-6">
            {["parent", "tutor"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-medium group flex items-center gap-2 capitalize"
              >
                <span
                  className={`w-3.5 h-3.5 ring-2 rounded-full transition-all ${
                    activeTab === tab
                      ? "bg-primary ring-primary"
                      : "ring-gray-300"
                  }`}
                />
                {tab}s
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-w-40">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none pl-5 pr-10 py-2.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="banned">Suspended Only</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          columns={commonColumns}
          data={filteredData}
          emptyMessage={`No ${activeTab}s found matching the criteria.`}
        />
      </div>

      {/* 1. Tutor Detail Modal */}
      {showTutorModal && selectedUser && (
        <TutorBanModal
          user={selectedUser}
          onBan={() => setShowReasonModal(true)} // Triggers step 2
          close={() => setShowTutorModal(false)}
        />
      )}

      {/* 1. Parent Detail Modal */}
      {showParentModal && selectedUser && (
        <ParentBanModal
          user={selectedUser}
          onBan={() => setShowReasonModal(true)} // Triggers step 2
          close={() => setShowParentModal(false)}
        />
      )}

      {/* 2. Suspension Reason Modal (Triggered from step 1) */}
      <ReasonModal
        isOpen={showReasonModal}
        userName={selectedUser?.full_name || selectedUser?.username}
        isPending={banMutation.isPending}
        onClose={() => setShowReasonModal(false)}
        onConfirm={handleConfirmSuspension}
      />
    </div>
  );
};

export default UsersManage;
