"use client";

import React from "react";
import { X, Star } from "lucide-react";
import Image from "next/image";

const ReviewDetailModal = ({ review, close }) => {
  if (!review) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-4xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-400 hover:text-dark z-10 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-4 lg:p-6 text-center">
          {/* Profile Image (Tutor) */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden relative border-4 border-gray-50 shadow-sm">
              <Image
                src={`/images/user.jpg`}
                fill
                alt="Tutor Profile"
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-dark mb-6">
            Review information
          </h2>

          {/* Details Table-like Rows */}
          <div className="space-y-2 mb-6 text-left">
            <DetailRow label="Parent name" value={review.parent_name} />
            <DetailRow label="Tutor name" value={review.tutor_name} />

            {/* Rating Row */}
            <div className="flex justify-between items-center py-2 border-b border-gray-50">
              <span className="text-dark">Rating</span>
              <div className="flex items-center gap-1">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                <span className="text-dark font-semibold md:text-lg">
                  {review.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Review Message Section */}
          <div className="text-left mb-6">
            <p className="text-dark font-semibold mb-2 md:text-lg">
              Review Message
            </p>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed italic">
              {review.review || "No review message provided."}
            </p>
          </div>

          {/* Action Buttons */}

          {review.status === "Rejected" || review.status === "Pending" ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-2 items-center">
                <button
                  onClick={() => {
                    console.log("Approving Review ID:", review.id);
                    close();
                  }}
                  className="w-full py-2.5 rounded-xl bg-linear-to-b from-red-300/10 to-red-500/10 text-red-600 border border-red-500 shadow-lg active:scale-[0.98] transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    console.log("Approving Review ID:", review.id);
                    close();
                  }}
                  className="w-full py-2.5 rounded-xl bg-linear-to-b from-primary to-[#1E3A8A] text-white shadow-lg active:scale-[0.98] transition-all"
                >
                  Approve Review
                </button>
              </div>

              <button
                onClick={close}
                className="w-full py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-blue-50 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <button
              onClick={close}
              className="w-full py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-blue-50 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Reusable row component for consistent spacing and font
 */
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-start">
    <span className="text-dark">{label}</span>
    <span className="text-gray text-right pl-4">{value}</span>
  </div>
);

export default ReviewDetailModal;
