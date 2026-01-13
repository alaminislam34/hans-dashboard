"use client";

import React from "react";
import Image from "next/image";

const SupportDetailModal = ({ data, close }) => {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative p-8">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={data.img || "/images/user.jpg"}
              alt={data.name || "User"}
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
          User information
        </h2>

        <div className="space-y-4 mb-10">
          <Info label="User name" value={data.name} />
          <Info label="Email" value={data.email} />

          <div className="space-y-2 pt-2">
            <p className="text-[15px] text-gray-600">Issue:</p>
            <p className="text-[15px] text-gray-400 leading-relaxed font-medium">
              {data.issue || "No issue description provided."}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {data.status === "Pending" && (
            <button
              className="w-full py-4 rounded-xl bg-[#1E40AF] text-white font-semibold shadow-md active:scale-[0.98] transition-all"
              onClick={() => console.log("Mark as complete", data.id)}
            >
              Mark as complete
            </button>
          )}

          <button
            onClick={close}
            className="w-full py-4 rounded-xl border border-[#1E40AF] text-[#1E40AF] font-semibold hover:bg-blue-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex justify-between items-center text-[15px]">
    <span className="text-gray-600">{label}</span>
    <span className="text-gray-400 font-medium">{value || "-"}</span>
  </div>
);

export default SupportDetailModal;
