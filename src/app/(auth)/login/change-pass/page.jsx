"use client";

import React, { useState } from "react";
import { Lock, EyeOff, Eye, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/providers/StateProvider";

const CreateNewPassword = () => {
  const { resetPassword, tempEmail } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!tempEmail) {
      toast.error("Session expired. Please start again.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(password, confirmPassword);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-137.5 bg-white rounded-2xl shadow-sm border border-blue-100 p-8 md:p-12">
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-8">
            <div className="bg-primary p-4 rounded-2xl rotate-45 flex items-center justify-center w-16 h-16">
              <div className="-rotate-45">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-dark mb-2">
            Create new password
          </h1>
          <p className="text-gray text-sm text-center">
            Set a strong password for your account{" "}
            <span className="font-semibold">{tempEmail}</span>.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleUpdatePassword}>
          <div className="space-y-2">
            <label className="block text-[16px] font-semibold text-dark">
              New Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray">
                <Lock size={20} strokeWidth={1.5} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="*******"
                className="w-full pl-12 pr-12 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-primary"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[16px] font-semibold text-dark">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray">
                <Lock size={20} strokeWidth={1.5} />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                placeholder="*******"
                className="w-full pl-12 pr-12 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-primary"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary hover:opacity-90 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-md flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
