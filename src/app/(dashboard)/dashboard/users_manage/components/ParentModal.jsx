"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

const ParentBanModal = ({ user, close }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Close Icon */}
        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-400 hover:text-dark transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-4 lg:p-8">
          {/* User Image */}
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden relative border-4 border-gray-50 shadow-sm">
              <Image
                src={`/images/user.jpg`}
                fill
                alt="Profile"
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center text-dark mb-6">
            User information
          </h2>

          {/* Info Rows */}
          <div className="space-y-2 mb-6">
            <InfoRow label="Parent name" value={user.user_name} />
            <InfoRow label="Student name" value={user.student_name || "N/A"} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow
              label="Location"
              value={user.location || "Not specified"}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                console.log("Banning User:", user.user_name);
                close();
              }}
              className="w-full py-2.5 rounded-xl bg-linear-to-b from-primary to-[#1E3A8A] text-white shadow-lg active:scale-[0.98] transition-transform"
            >
              Ban User
            </button>

            <button
              onClick={close}
              className="w-full py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-blue-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-base">
    <span className="text-dark">{label}</span>
    <span className="text-gray text-right">{value}</span>
  </div>
);

export default ParentBanModal;
