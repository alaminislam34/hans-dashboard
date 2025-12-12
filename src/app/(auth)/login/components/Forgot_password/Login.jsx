"use client";

import { Shadow } from "@/app/components/common_class/Tailwind_common_className";
import { EyeOff, Eye, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const mockLoginApi = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "alamin@gmail.com" && password === "alamin12") {
        resolve({ success: true, token: "mock-auth-token" });
      } else if (email === "error@example.com") {
        reject({ success: false, message: "Invalid email or server error." });
      } else {
        reject({ success: false, message: "Invalid credentials." });
      }
    }, 1000);
  });
};

export default function Login({ setIsForgotPass, onLoginSuccess }) {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await mockLoginApi(formData.email, formData.password);

      if (response.success) {
        console.log("Login successful! Token:", response.token);
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
        onLoginSuccess && onLoginSuccess(response.token);
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please try again.");
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
          Log in
        </h3>
        <p className="text-subTypo text-xs sm:text-sm">
          For access your account you have to provide correct information.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* email */}
        <div className="space-y-2">
          <label className="font-semibold inline-block text-typo">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email.."
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

        {/* password */}
        <div className="space-y-3">
          <label className="font-semibold inline-block text-typo">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password.."
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
          <div className="flex items-center justify-between">
            <label className="text-subTypo flex items-center flex-row gap-1.5 text-xs md:text-sm">
              <input type="checkbox" className="accent-primary" />
              <p>Remember me</p>
            </label>
            <button
              onClick={() => setIsForgotPass(true)}
              type="button"
              className="text-primary underline text-xs md:text-sm font-bold cursor-pointer disabled:opacity-50"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Error Message */}
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
          {isLoading ? "Logging In..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
