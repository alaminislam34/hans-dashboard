"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";

const UserInfoModal = ({ setShowModal }) => {
  const [isRejecting, setIsRejecting] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        {!isRejecting ? (
          /* --- User Information Modal (Image 1) --- */
          <div className="p-6 md:p-10">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden relative border">
                <Image
                  src="/images/user.jpg"
                  fill
                  alt="Tutor Profile"
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-dark mb-8">
              User information
            </h2>

            {/* Details List */}
            <div className="space-y-4 mb-8">
              <DetailRow label="Tutor name" value="Anderson Jonse" />
              <DetailRow label="Email" value="alex2589@gmail.com" />
              <DetailRow label="Location" value="31/2 Los Angles, USA" />
              <DetailRow
                label="Teaching time"
                value="05/12/2000 - Currently teaching"
              />
            </div>

            {/* Certification */}
            <div className="mb-6">
              <p className="text-dark font-medium mb-3">
                Certification (NIE cert, ABRSM)
              </p>
              <div className="relative w-full max-w-64 rounded-lg border border-gray/20 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1606326666490-4e7353b341c2"
                  alt="Certificate"
                  className="w-full h-24 object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 p-2 rounded-full shadow-sm text-dark">
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
                Complete graduation from dot university in science
              </p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <button
                onClick={() => setIsRejecting(true)}
                className="py-3 rounded-xl border border-primary_red text-primary_red font-bold hover:bg-red-50"
              >
                Reject
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="py-3 rounded-xl bg-primary text-white font-bold shadow-md"
              >
                Approve
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-blue-50"
            >
              Close
            </button>
          </div>
        ) : (
          /* --- Rejection Reason Modal (Image 2) --- */
          <div className="p-8 md:p-12 animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-center text-dark mb-10">
              Rejection
            </h2>

            <div className="mb-8">
              <label className="block text-xl font-bold text-dark mb-4">
                Reason for rejecting
              </label>
              <textarea
                placeholder="Write here.."
                className="w-full h-40 p-4 bg-[#F4F7FE] rounded-2xl border-none outline-none resize-none text-gray"
              />
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-4 rounded-xl bg-linear-to-b from-primary to-[#1E3A8A] text-white text-xl font-bold shadow-lg"
            >
              Done
            </button>
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
