import { Shadow } from "@/app/components/common_class/Tailwind_common_className";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const mockSendOtpApi = async (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && email.includes("@")) {
        console.log(`Sending OTP to ${email}...`);
        resolve({ success: true, message: "OTP sent successfully." });
      } else {
        reject({ success: false, message: "Invalid email address." });
      }
    }, 1000);
  });
};

export default function SendOtp({ setIsForgotPass, onOtpSent }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setIsLoading(true);
    try {
      await mockSendOtpApi(email);
      onOtpSent(email); 
    } catch (err) {
      console.error("Send OTP failed:", err);
      setError(err.message || "Failed to send OTP. Please check your email and try again.");
    } finally {
      setIsLoading(false);
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
          Forgot Password
        </h3>
        <p className="text-subTypo text-xs sm:text-sm">
          You have to provide your email for get OTP code.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* email */}
        <div className="space-y-2">
          <label className="font-semibold inline-block text-typo">Email</label>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email.."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 md:py-3 shadow-sm shadow-white focus:shadow-primary focus:outline-none lg:py-4 w-full pl-12 pr-6 rounded-lg bg-Gray text-subTypo"
              required
              disabled={isLoading}
            />
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-subTypo"
            />
          </div>
        </div>

        {error && (
            <p className="text-sm text-center text-red-500 font-medium">{error}</p>
        )}

        <br />
        <button
          type="submit"
          className={`py-2 md:py-3 lg:py-4 w-full rounded-lg shadow-custom bg-linear-to-r from-primary/70 hover:from-primary/90 to-primary/90 hover:to-primary text-white text-lg md:text-xl font-bold cursor-pointer active:scale-98 transition-all ease-in-out duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Code'}
        </button>

        <button
          onClick={() => setIsForgotPass(false)} 
          type="button"
          className={`py-2 md:py-3 lg:py-4 w-full rounded-lg shadow-custom border border-primary text-lg md:text-xl font-bold cursor-pointer active:scale-98 transition-all ease-in-out duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
          disabled={isLoading}
        >
          Back to Log in
        </button>
      </form>
    </div>
  );
}