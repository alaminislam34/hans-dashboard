"use client";
import React from "react";
import { X, Award, BookOpen, Star, ShieldAlert } from "lucide-react";
import Image from "next/image";

const TutorBanModal = ({ user, close, onBan }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute right-6 top-6 text-gray-400 hover:text-dark z-10"
        >
          <X size={24} />
        </button>

        <div className="p-6 lg:p-8">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden relative border-4 border-gray-50 bg-gray-100 shadow-sm">
              <Image
                src={user.profile_picture || `/images/user.jpg`}
                fill
                unoptimized
                alt="Tutor"
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-center text-dark mb-6">
            Tutor Detailed Profile
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-2xl">
            <DetailRow label="Name" value={user.full_name || user.username} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow
              label="Exp"
              value={`${user.profile?.years_of_experience || 0} Years`}
            />
            <DetailRow
              label="Institution"
              value={user.profile?.institution || "N/A"}
            />
            <DetailRow
              label="Rating"
              value={`⭐ ${user.profile?.average_rating || 0}`}
            />
            <DetailRow
              label="Status"
              value={user.profile?.verification_status}
              isStatus
            />
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <p className="text-dark font-semibold mb-2 flex items-center gap-2">
                <Award size={18} className="text-primary" /> Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {user.profile?.certifications?.map((c, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-primary text-xs px-3 py-1 rounded-full border border-blue-100 font-medium"
                  >
                    {c}
                  </span>
                )) || "No certifications"}
              </div>
            </div>

            <div>
              <p className="text-dark font-semibold mb-2 flex items-center gap-2">
                <BookOpen size={18} className="text-primary" /> Specializations
              </p>
              <div className="flex flex-wrap gap-2">
                {user.profile?.specializations?.map((s, i) => (
                  <span
                    key={i}
                    className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-100 font-medium"
                  >
                    {s}
                  </span>
                )) || "N/A"}
              </div>
            </div>
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

const DetailRow = ({ label, value, isStatus }) => (
  <div className="flex flex-col">
    <span className="text-gray-400 text-xs uppercase font-bold tracking-tighter">
      {label}
    </span>
    <span
      className={`text-dark font-medium truncate ${
        isStatus ? "capitalize text-blue-600" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

export default TutorBanModal;
