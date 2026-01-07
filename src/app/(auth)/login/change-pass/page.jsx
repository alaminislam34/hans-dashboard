"use client";

import React, { useState } from "react";
import { Lock, EyeOff, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreateNewPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Simulate password update logic
    toast.success("Password updated successfully!");
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-138 bg-white rounded-2xl shadow-sm border border-blue-100 p-8 md:p-12">
        {/* Header/Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative mb-8">
            <div className="bg-primary p-4 rounded-2xl rotate-45 flex items-center justify-center w-16 h-16">
              <div className="-rotate-45">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                </svg>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 bg-secondary border-2 border-white rounded-full p-0.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-dark mb-2">
            Create new password
          </h1>
          <p className="text-gray text-sm text-center">
            Provide us your full information for create a new account.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-6" onSubmit={handleUpdatePassword}>
          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-[16px] font-semibold text-dark">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray">
                <Lock size={20} strokeWidth={1.5} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="*******"
                className="w-full pl-12 pr-12 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark placeholder-gray"
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

          {/* Confirm Password Input */}
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
                placeholder="*******"
                className="w-full pl-12 pr-12 py-4 bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-primary outline-none text-dark placeholder-gray"
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

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:opacity-90 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-md shadow-blue-100"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewPassword;
