"use client";

import { Shadow } from "@/app/components/common_class/Tailwind_common_className";
import { EyeOff, Eye, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const mockResetPasswordApi = async (email, newPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (newPassword.length >= 8) {
        console.log(`Password reset for ${email} with new password.`);
        resolve({ success: true, message: "Password reset successful!" });
      } else {
        reject({
          success: false,
          message: "Password must be at least 8 characters long.",
        });
      }
    }, 1000);
  });
};

export default function ResetPass({ email, onResetComplete }) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      await mockResetPasswordApi(email, formData.newPassword);
      toast.success("Password reset successful! You can now log in.");
      onResetComplete();
    } catch (err) {
      console.error("Password reset failed:", err);
      setError(err.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`max-w-160 w-full mx-auto my-8 p-8 rounded-2xl ${Shadow} space-y-6 md:space-y-8`}
    >
      <div className="space-y-3 text-center">
        <h3
          className={`text-xl md:text-2xl lg:text-3xl text-center text-primary font-bold`}
        >
          Create new password
        </h3>
        <p className="text-subTypo text-xs sm:text-sm">
          Provide your new password to complete the reset process.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* New Password */}
        <div className="space-y-3">
          <label className="font-semibold inline-block text-typo">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="py-2 md:py-3 shadow-sm shadow-white focus:shadow-primary focus:outline-none lg:py-4 w-full px-12 rounded-lg bg-Gray text-subTypo"
              required
              disabled={isLoading}
            />
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-subTypo"
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
            >
              {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-3">
          <label className="font-semibold inline-block text-typo">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="py-2 md:py-3 shadow-sm shadow-white focus:shadow-primary focus:outline-none lg:py-4 w-full px-12 rounded-lg bg-Gray text-subTypo"
              required
              disabled={isLoading}
            />
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-subTypo"
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
            >
              {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>
        </div>

        {error && (
          <p className="text-sm text-center text-red-500 font-medium">
            {error}
          </p>
        )}

        <br />
        <button
          type="submit"
          className={`py-2 md:py-3 lg:py-4 w-full rounded-lg shadow-custom bg-linear-to-r from-primary/70 hover:from-primary/90 to-primary/90 hover:to-primary text-white text-lg md:text-xl font-bold cursor-pointer active:scale-98 transition-all ease-in-out duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
