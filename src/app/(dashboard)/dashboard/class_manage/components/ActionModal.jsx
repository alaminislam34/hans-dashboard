"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import api from "@/lib/Api";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UserInfoModal = ({ setShowModal, userData }) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const queryClient = useQueryClient();

  // Destructure safely
  const {
    class_id,
    class_listing = "N/A",
    tutor_name = "N/A",
    verify_status = "N/A",
    createdAt,
  } = userData || {};

  // ================= MUTATION =================
  const mutation = useMutation({
    mutationFn: async ({ status, reason }) => {
      const endpoint =
        status === "APPROVED"
          ? "/api/accounts/admin/dashboard/approve_class/"
          : "/api/accounts/admin/dashboard/reject_class/";

      const payload =
        status === "REJECTED" ? { class_id, reason } : { class_id };

      const res = await api.post(endpoint, payload);
      return res.data;
    },
    // The second argument 'variables' contains { status, reason }
    onSuccess: (data, variables) => {
      // Check the status sent to the mutation to decide the message
      if (variables.status === "APPROVED") {
        toast.success("Class has been approved successfully!");
      } else {
        toast.error("Class has been rejected.", {
          icon: "🚫",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }

      queryClient.invalidateQueries({ queryKey: ["classes"] });
      setShowModal(null);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to update class status. Please try again.");
    },
  });
  const handleStatusUpdate = (status) => {
    mutation.mutate({ status, reason: rejectReason });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl relative p-6 text-black">
        <button
          onClick={() => setShowModal(null)}
          className="absolute right-4 top-4 text-gray-400 hover:text-dark"
        >
          <X size={24} />
        </button>

        {!isRejecting ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">
              Class Information
            </h2>

            <div className="space-y-2 mb-8">
              <DetailRow label="Class Title" value={class_listing} />
              <DetailRow label="Tutor Name" value={tutor_name} />
              <DetailRow label="Status" value={verify_status?.toUpperCase()} />
              <DetailRow
                label="Created At"
                value={createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
              />
            </div>

            {["approved", "rejected"].includes(verify_status?.toLowerCase()) ? (
              <button
                onClick={() => setShowModal(null)}
                className="w-full py-3 rounded-xl bg-gray-200 text-gray-800 font-bold"
              >
                Close
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsRejecting(true)}
                  className="py-3 rounded-xl border border-red-500 text-red-500 font-bold hover:bg-red-50"
                  disabled={mutation.isLoading}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusUpdate("APPROVED")}
                  className="py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 disabled:bg-gray-400"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Processing..." : "Approve"}
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              Rejection Reason
            </h2>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Write rejection reason..."
              className="w-full h-32 p-4 bg-[#F4F7FE] rounded-xl resize-none outline-none text-black"
            />
            <div className="mt-4 flex flex-col gap-3">
              <button
                onClick={() => handleStatusUpdate("REJECTED")}
                disabled={!rejectReason || mutation.isLoading}
                className="py-3 rounded-xl bg-red-600 text-white font-bold disabled:bg-gray-400"
              >
                {mutation.isLoading ? "Processing..." : "Confirm Reject"}
              </button>
              <button
                onClick={() => setIsRejecting(false)}
                className="text-gray-500 hover:text-dark"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-sm py-1 border-b border-gray-50">
    <span className="font-medium">{label}</span>
    <span className="text-gray-600 text-right max-w-[60%]">
      {value || "N/A"}
    </span>
  </div>
);

export default UserInfoModal;
