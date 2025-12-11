"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Shadow } from "@/app/components/common_class/Tailwind_common_className";

const OTP_LENGTH = 6;

export default function VerifyCode({ setIsForgotPass, setVerifyOtp }) {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  const handleOtpChange = (element, index) => {
    const value = element.value.slice(0, 1);

    if (/[0-9]/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== "" && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length === OTP_LENGTH) {
      console.log("Submitting OTP:", finalOtp);
    } else {
      alert("Please enter the complete 6-digit OTP.");
    }
  };

  return (
    <div
      className={`max-w-160 w-full mx-auto my-8 p-8 rounded-2xl ${Shadow} space-y-6 md:space-y-8`}
    >
      <div className="flex items-center justify-center">
        <Image
          src={"/logos/logo.jpg"}
          height={100}
          width={200}
          alt="Website Logo"
          className="w-42.5 h-auto bg-cover object-cover"
        />
      </div>

      <div className="space-y-3 text-center">
        <h3
          className={`text-xl md:text-2xl lg:text-3xl text-center text-primary font-bold`}
        >
          Verify OTP
        </h3>
        <p className="text-subTypo text-xs sm:text-sm">
          We’ve sent 6 digit OTP into your email address.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* otp field */}
        <div className="space-y-2">
          <label className="font-semibold inline-block text-typo">OTP</label>
          <div className="grid grid-cols-6 justify-between gap-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text" // Changed to 'text' to better handle backspace and pasting
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(element) => (inputRefs.current[index] = element)}
                className="py-2 md:py-3 shadow-sm shadow-white focus:shadow-primary focus:outline-none lg:py-4 w-full rounded-lg bg-Gray text-subTypo text-center text-lg"
              />
            ))}
          </div>
        </div>

        <br />
        <button
          type="submit"
          className={`py-2 md:py-3 lg:py-4 w-full rounded-lg shadow-custom bg-linear-to-r from-primary/70 hover:from-primary/90 to-primary/90 hover:to-primary text-white md:text-lg font-semibold cursor-pointer active:scale-98 transition-all ease-in-out duration-300`}
        >
          Submit
        </button>

        <button
          onClick={() => {
            setVerifyOtp(false);
            setIsForgotPass(true);
          }}
          type="button"
          className={`py-2 md:py-3 lg:py-4 w-full rounded-lg shadow-custom outline-2 outline-primary/60 md:text-lg font-semibold cursor-pointer active:scale-98 transition-all ease-in-out duration-300`}
        >
          Back
        </button>
      </form>
    </div>
  );
}
