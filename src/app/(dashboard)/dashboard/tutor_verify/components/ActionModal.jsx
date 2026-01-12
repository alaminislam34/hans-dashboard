"use client";

import React, { useState } from "react";
import { Download, X } from "lucide-react";
import Image from "next/image";

const UserInfoModal = ({ setShowModal, userData }) => {
  const [isRejecting, setIsRejecting] = useState(false);

  const { name, email, status, location, education, teaching_time, image_url } =
    userData || {};

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
          /* --- User Information Modal --- */
          <div className="p-6 md:p-10">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="">
                <Image
                  src={image_url || `/images/user.png`}
                  height={400}
                  width={400}
                  alt="Tutor Profile"
                  className="w-32 h-32 rounded-xl object-cover border"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-dark mb-6">
              User information
            </h2>

            {/* Details List - Data mapping from userData */}
            <div className="space-y-2 mb-6">
              <DetailRow label="Tutor name" value={name || "N/A"} />
              <DetailRow label="Email" value={email || "N/A"} />
              <DetailRow
                label="Location"
                value={location || "Location not provided"}
              />
              <DetailRow
                label="Teaching time"
                value={teaching_time || "Not specified"}
              />
              <DetailRow label="Current Status" value={status || "N/A"} />
            </div>

            {/* Certification */}
            <div className="mb-6">
              <p className="text-dark font-medium mb-3">
                Certification (NIE cert, ABRSM)
              </p>
              <div className="relative w-full max-w-64 min-h-20 rounded-lg border border-gray/20 overflow-hidden group cursor-pointer">
                <Image
                  src={"/images/certificate.jpg"}
                  height={500}
                  width={300}
                  alt="Certificate Image"
                  className="h-24 w-full object-cover bg-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-2 rounded-full shadow-sm text-dark hover:scale-110 transition-transform">
                    <Download size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <p className="text-dark font-medium mb-1">
                Personal education level
              </p>
              <p className="text-gray text-sm">
                {education || "Education details not available."}
              </p>
              {status === "Rejected" ? (
                <>
                  <p className="text-dark font-medium mb-1 mt-3">
                    Cause for reject
                  </p>
                  <p className="text-gray text-sm">The file is incorrect.</p>
                </>
              ) : (
                ""
              )}
            </div>

            {["Approved", "Rejected"].includes(status) ? (
              <button
                onClick={() => {
                  console.log("Approved:", name);
                  setShowModal(false);
                }}
                className="py-3 rounded-xl bg-linear-to-br from-primary/70 to-primary text-white font-bold shadow-md transition-colors w-full"
              >
                Close
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4 mb-3">
                <button
                  onClick={() => setIsRejecting(true)}
                  className="py-3 rounded-xl border border-[#FF4D4D] text-[#FF4D4D] font-bold hover:bg-red-50 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    console.log("Approved:", name);
                    setShowModal(false);
                  }}
                  className="py-3 rounded-xl bg-linear-to-br from-primary/70 to-primary text-white font-bold shadow-md transition-colors"
                >
                  Approve
                </button>
              </div>
            )}
          </div>
        ) : (
          /* --- Rejection Reason Modal --- */
          <div className="p-4 md:p-6 lg:p-8 animate-in fade-in zoom-in duration-300">
            <h2 className="text-3xl font-bold text-center text-dark mb-6">
              Rejection
            </h2>

            <div className="mb-6">
              <label className="block lg:text-lg font-semibold text-dark mb-4">
                Reason for rejecting
              </label>
              <textarea
                placeholder="Write reason here.."
                className="w-full h-40 p-4 bg-[#F4F7FE] rounded-2xl border-none outline-none resize-none text-dark focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  console.log("Rejected:", name);
                  setShowModal(false);
                }}
                className="w-full py-4 rounded-xl bg-linear-to-b from-[#32afe2] to-[#1E3A8A] text-white text-xl font-bold shadow-lg active:scale-[0.98] transition-transform"
              >
                Done
              </button>
              <button
                onClick={() => setIsRejecting(false)}
                className="text-gray-500 font-medium hover:text-dark"
              >
                Back to Info
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-start text-sm md:text-base">
    <span className="text-dark font-medium">{label}</span>
    <span className="text-gray text-right pl-4">{value}</span>
  </div>
);

export default UserInfoModal;
