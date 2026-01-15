"use client";
import React from "react";
import Image from "next/image";
import { X, MapPin, Mail, User, ShieldAlert } from "lucide-react";

const ParentBanModal = ({ user, close, onBan }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative">
        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-400 hover:text-dark z-10 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-6 lg:p-8">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden relative border-4 border-gray-50 shadow-sm bg-gray-100">
              <Image
                unoptimized
                src={user.profile_picture || `/images/user.jpg`}
                fill
                alt="Profile"
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-center text-dark mb-6">
            Parent Information
          </h2>

          <div className="space-y-3 mb-8 bg-gray-50 p-4 rounded-2xl">
            <InfoRow
              label="Full Name"
              value={user.full_name || user.username}
            />
            <InfoRow label="Email" value={user.email} />
            <InfoRow
              label="Education Level"
              value={user.profile?.child_education_level || "N/A"}
            />
            <InfoRow
              label="Class Type"
              value={user.profile?.class_type || "N/A"}
            />
            <InfoRow
              label="Preferred Subjects"
              value={user.profile?.preferred_subjects || "N/A"}
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onBan}
              className="w-full py-3 rounded-xl bg-red-600 text-white shadow-lg hover:bg-red-700 active:scale-[0.98] transition-all font-semibold flex items-center justify-center gap-2"
            >
              <ShieldAlert size={18} />
              {user.is_suspended ? "Update Suspension" : "Suspend User"}
            </button>
            <button
              onClick={close}
              className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
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
  <div className="flex justify-between items-center text-sm md:text-base border-b border-gray-200/50 pb-2 last:border-0 last:pb-0">
    <span className="text-gray-500">{label}</span>
    <span className="text-dark font-semibold text-right">{value}</span>
  </div>
);

export default ParentBanModal;
