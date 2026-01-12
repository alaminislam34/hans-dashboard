"use client";

import React from "react";
import { X, Download } from "lucide-react";
import Image from "next/image";

const TutorBanModal = ({ user, close }) => {
  if (!user) return null;

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

        <div className="p-4 lg:p-8">
          {/* Profile Image */}
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

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center text-dark mb-6">
            User information
          </h2>

          {/* Basic Details List */}
          <div className="space-y-2 mb-6">
            <DetailRow label="Tutor name" value={user.user_name} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Location" value={user.location} />
            <DetailRow label="Teaching time" value={user.teaching_time} />
          </div>

          {/* Certification Section */}
          <div className="mb-6 text-left">
            <p className="text-dark font-semibold mb-3">
              Certification (NIE cert, ABRSM)
            </p>
            <div className="relative w-full max-w-60 h-28 rounded-2xl border border-gray-100 overflow-hidden group cursor-pointer shadow-sm">
              <Image
                src="/images/certificate.jpg"
                fill
                alt="Certificate"
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white p-2 rounded-full shadow-lg text-dark">
                  <Download size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6 text-left">
            <p className="text-dark font-semibold mb-1">
              Personal education level
            </p>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {user.education_level || "No education details provided."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                console.log("Banning Tutor:", user.user_name);
                close();
              }}
              className="w-full py-2.5 rounded-xl bg-linear-to-b from-primary to-[#1E3A8A] text-white shadow-lg active:scale-[0.98] transition-all"
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

/**
 * Reusable row component for details
 */
const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-start">
    <span className="text-dark">{label}</span>
    <span className="text-gray text-right pl-4">{value}</span>
  </div>
);

export default TutorBanModal;
