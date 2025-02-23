"use client"
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function ResetPassword() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputsRef = useRef(new Array(6).fill(null));

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, 6);
  }, []);

  const handleInput = (event, index) => {
    const value = event.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const email = sessionStorage.getItem("user_email");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const otpCode = otp.join("");
    

    try {
      const response = await fetch(
        "https://optionally-topical-dassie.ngrok-free.app/forgot-password/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email,otp: otpCode }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Verifikasi OTP gagal!");
      }

      if (data.resetToken) {
        sessionStorage.setItem("reset_token", data.resetToken);
      }
      alert("OTP berhasil diverifikasi!");
      router.push('/reset-password/new-password');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border  md:px-10 lg:px-16 py-8 md:py-12 lg:py-20 rounded-2xl shadow-[8px_4px_64px_rgba(0,0,0,0.25)] flex h-full w-full md:w-[600px] lg:w-[1000px] mx-10 z-10">
        <div className="flex-1 text-center hidden lg:flex">
          <img src="/svg/otp.svg" alt="otp" className="object-contain h-80 w-full" />
        </div>

        <div className="w-full lg:w-1/2 px-6 flex flex-col justify-center items-center">
          <h2 className="lg:text-4xl text-2xl font-semibold text-pri-main dark:text-pri-border mb-1 lg:mb-2">Verifikasi OTP</h2>
          <p className="text-lg lg:text-base text-center mb-[32px] font-normal text-netral-100 dark:text-netral-0">
            OTP telah dikirim ke {email}
          </p>
          <form onSubmit={handleSubmit} className="justify-center w-full">
            <div className="flex justify-center space-x-1 md:space-x-2 lg:space-x-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 md:w-16 md:h-16 
                            text-3xl font-semibold text-center bg-white dark:bg-gray-800 
                            text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 
                            rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                            transition-all duration-200"
                  placeholder="•"
                  value={otp[index]}
                  onInput={(event) => handleInput(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  required
                />
              ))}
            </div>

            <div className="w-full flex flex-col items-center mt-[26px]">
              <p className="md:text-xs lg:text-sm font-normal text-netral-100 dark:text-netral-0">Tidak menerima OTP?</p>
              <button className="md:text-xs lg:text-sm text-pri-main dark:text-pri-border font-semibold hover:text-pri-hover dark:hover:text-pri-border/50 transition">
                Kirim ulang OTP
              </button>
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <div className="flex justify-center mt-[32px]">
              <button
                type="submit"
                className="w-full lg:w-11/12 bg-pri-main dark:bg-pri-border text-white dark:text-netral-100 py-2 rounded-md hover:bg-pri-border dark:hover:bg-pri-border/50 transition"
                disabled={loading}
              >
                {loading ? "Memverifikasi..." : "Verifikasi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
