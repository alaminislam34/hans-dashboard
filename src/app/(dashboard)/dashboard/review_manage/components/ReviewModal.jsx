"use client";

import React from "react";
import { X, Star, Ban } from "lucide-react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "react-hot-toast"; // অপশনাল: নোটিফিকেশনের জন্য

const ReviewDetailModal = ({ review, close, refresh }) => {
  const queryClient = useQueryClient();

  // ১. ইউজার সাসপেন্ড বা ব্যান করার মিউটেশন
  const suspendMutation = useMutation({
    mutationFn: async (userId) => {
      return await axiosInstance.post(`/api/accounts/admin/dashboard/suspend_user/`, {
        user_id: userId,
      });
    },
    onSuccess: () => {
      toast.success("User suspended successfully");
      queryClient.invalidateQueries(["reviews-list"]); // ডাটা রিফ্রেশ করবে
      close();
    },
    onError: () => {
      toast.error("Failed to suspend user");
    },
  });

  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-4xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-400 hover:text-dark z-10"
        >
          <X size={24} />
        </button>

        <div className="p-4 lg:p-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 rounded-3xl overflow-hidden relative border-4 border-gray-50 shadow-sm">
              <Image
                unoptimized
                src="/images/user.jpg"
                fill
                alt="Profile"
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-dark mb-6">
            Review Information
          </h2>

          <div className="space-y-2 mb-6 text-left">
            <DetailRow label="Parent name" value={review.parent_name} />
            <DetailRow label="Tutor name" value={review.tutor_name} />
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-dark">Rating</span>
              <div className="flex items-center gap-1">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <span className="text-dark font-semibold">{review.rating}</span>
              </div>
            </div>
          </div>

          <div className="text-left mb-8">
            <p className="text-dark font-semibold mb-2">Review Message</p>
            <p className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-primary/20 pl-4">
              {review.review || "No review message provided."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={suspendMutation.isPending}
                onClick={() => suspendMutation.mutate(review.tutor_id)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all font-medium disabled:opacity-50"
              >
                <Ban size={18} />
                {suspendMutation.isPending ? "Processing..." : "Suspend User"}
              </button>

              <button
                onClick={close}
                className="py-3 rounded-xl bg-primary text-white shadow-lg hover:bg-primary/90 transition-all font-medium"
              >
                Approve Review
              </button>
            </div>

            <button
              onClick={close}
              className="w-full py-3 rounded-xl border-2 border-gray-100 text-gray-500 hover:bg-gray-50 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-50">
    <span className="text-dark">{label}</span>
    <span className="text-gray text-right pl-4 font-medium">{value}</span>
  </div>
);

export default ReviewDetailModal;
