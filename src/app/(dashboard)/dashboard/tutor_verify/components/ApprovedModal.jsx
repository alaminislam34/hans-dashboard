"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import toast from "react-hot-toast";

const ApprovedModal = ({ setApprovedModal, notes }) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const queryClient = useQueryClient();

  const {
    id: user_id,
    full_name,
    username,
    email,
    profile_picture,
    profile,
  } = userData || {};

  const tutor_profile_id = profile?.id;
  const status = profile?.verification_status;

  // ================= MUTATION LOGIC =================
  const mutation = useMutation({
    mutationFn: async ({ action, reason }) => {
      if (action === "ACTIVATE") {
        return await axiosInstance.post(
          `/api/tutors/profiles/user/${user_id}/approve/`,
          {
            verification_status: notes,
          },
        );
      } else {
        return await axiosInstance.post(
          "/api/accounts/admin/dashboard/reject_tutor/",
          {
            tutor_profile_id: tutor_profile_id,
            notes: reason,
          },
        );
      }
    },
    onSuccess: (_, variables) => {
      const isApprove = variables.action === "ACTIVATE";
      toast.success(
        isApprove ? "Tutor activated successfully!" : "Tutor rejected.",
      );

      queryClient.invalidateQueries({ queryKey: ["tutors"] });
      setShowModal(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-dark z-10"
        >
          <X size={24} />
        </button>

        {!isRejecting ? (
          <div className="p-6 md:p-10">
            <div className="flex justify-center mb-6">
              <Image
                src={profile_picture}
                unoptimized
                height={120}
                width={120}
                alt="Tutor Profile"
                className="w-32 h-32 rounded-xl object-cover border"
              />
            </div>

            <h2 className="text-2xl font-bold text-center text-dark mb-6">
              User Information
            </h2>

            <div className="space-y-2 mb-6 text-black">
              <DetailRow label="Tutor Name" value={full_name || username} />
              <DetailRow label="Email" value={email} />
              <DetailRow
                label="Education"
                value={profile?.education_level || "N/A"}
              />
              <DetailRow
                label="Institution"
                value={profile?.institution || "N/A"}
              />
              <DetailRow
                label="Experience"
                value={`${profile?.years_of_experience || 0} Years`}
              />
              <DetailRow label="Current Status" value={status} />
            </div>

            {/* Actions */}
            {status === "pending" ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsRejecting(true)}
                  className="py-3 rounded-xl border border-red-500 text-red-500 font-bold hover:bg-red-50"
                  disabled={mutation.isLoading}
                >
                  Reject
                </button>
                <button
                  onClick={() => mutation.mutate({ action: "ACTIVATE" })}
                  className="py-3 rounded-xl bg-primary text-white font-bold"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Loading..." : "Activate"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 rounded-xl bg-primary text-white font-bold"
              >
                Close
              </button>
            )}
          </div>
        ) : (
          /* Rejection Screen */
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Reject Tutor
            </h2>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Provide reason for rejection..."
              className="w-full h-40 p-4 bg-[#F4F7FE] rounded-2xl outline-none text-black"
            />
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() =>
                  mutation.mutate({ action: "REJECT", reason: rejectReason })
                }
                disabled={!rejectReason || mutation.isLoading}
                className="py-4 rounded-xl bg-red-600 text-white font-bold disabled:bg-gray-400"
              >
                {mutation.isLoading ? "Processing..." : "Confirm Reject"}
              </button>
              <button
                onClick={() => setIsRejecting(false)}
                className="text-gray-500 text-center"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-1 border-b border-gray-50">
    <span className="text-dark font-medium">{label}</span>
    <span className="text-gray-600 text-right">{value}</span>
  </div>
);

export default ApprovedModal;
