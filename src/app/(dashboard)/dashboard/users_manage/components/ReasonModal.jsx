"use client";
import React, { useState } from "react";
import { X, AlertTriangle, Loader2 } from "lucide-react";

const ReasonModal = ({ isOpen, onClose, onConfirm, isPending, userName }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 text-amber-600">
          <AlertTriangle size={24} />
          <h3 className="text-xl font-bold">Suspend Account</h3>
        </div>

        {/* Body */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          Are you sure you want to suspend <strong>{userName}</strong>? This action will restrict their access to the platform. Please provide a reason below.
        </p>

        <textarea
          autoFocus
          className="w-full h-32 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none text-sm transition-all bg-gray-50 focus:bg-white"
          placeholder="e.g., Violation of community guidelines, Multiple spam reports..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={isPending || !reason.trim()}
            onClick={() => onConfirm(reason)}
            className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Confirm Suspension"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal;