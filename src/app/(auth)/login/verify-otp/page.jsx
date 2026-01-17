"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useGlobalState } from "@/app/providers/StateProvider";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const { verifyOtp, tempEmail, resendOtp } = useGlobalState();

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp(otpCode);

      if (!res.success) {
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-138 bg-white rounded-2xl shadow-sm border border-blue-100 p-8 md:p-12">
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

          <h1 className="text-3xl font-bold text-dark mb-2">Verify OTP</h1>
          <p className="text-gray text-sm text-center">
            We've sent 6 digit OTP to{" "}
            <span className="font-semibold text-primary">
              {tempEmail || "your email"}
            </span>
            .
          </p>
        </div>

        <div className="mb-10">
          <label className="block text-[16px] font-semibold text-dark mb-4">
            Enter 6-Digit Code
          </label>
          <div className="flex justify-between gap-2 md:gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                disabled={loading}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-full h-14 md:h-16 text-center text-xl font-bold rounded-xl border-none outline-none transition-all
                  ${
                    digit
                      ? "bg-white ring-2 ring-blue-100 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                      : "bg-[#F3F4F6]"
                  }
                  focus:ring-2 focus:ring-primary focus:bg-white disabled:opacity-50`}
              />
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={resendOtp}
              type="button"
              className="text-primary text-sm font-bold hover:underline"
            >
              Send again
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleVerifyCode}
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Submit"}
          </button>

          <Link
            href={"/login"}
            className="w-full py-4 flex items-center justify-center bg-white border-2 border-primary text-primary font-bold text-lg rounded-xl hover:bg-blue-50 transition-all duration-200"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
