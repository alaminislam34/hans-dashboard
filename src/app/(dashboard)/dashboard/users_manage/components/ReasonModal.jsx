"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";

const ReasonModal = ({ isOpen, onClose, onConfirm, isPending }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-1.5 bg-gray-100 rounded-full text-gray-500 hover:text-dark transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2">
            Are you sure?
          </h2>
          <p className="text-gray-400 font-medium">
            You want to ban this user.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button className="flex-1 py-3 px-6 rounded-xl bg-linear-to-b from-primary to-[#1E3A8A] text-white font-bold shadow-lg shadow-blue-200 transition-all">
            Yes
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl border border-gray-200 text-gray-400 font-bold hover:bg-gray-50 transition-all"
          >
            No
          </button>
        </div>

        {/* Input Section */}
        <div className="space-y-3 mb-8">
          <label className="text-dark font-bold text-lg block">
            What is the reason for ban?
          </label>
          <textarea
            autoFocus
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Write here.."
            className="w-full h-32 p-4 bg-[#F8FAFF] rounded-2xl border-none focus:ring-2 focus:ring-primary/10 outline-none resize-none text-gray-600 placeholder:text-gray-300 transition-all"
          />
        </div>

        {/* Action Button */}
        <button
          disabled={isPending || !reason.trim()}
          onClick={() => onConfirm(reason)}
          className="w-full py-4 rounded-2xl bg-linear-to-b from-primary to-[#1E3A8A] text-white font-bold text-xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">Processing...</span>
              <Loader2 size={20} className="animate-spin" />
            </div>
          ) : (
            "Done"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReasonModal;
