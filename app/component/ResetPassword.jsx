"use client"
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { reset_password, send_otp } from "../api/ApiAuth";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const router = useRouter();
  const email = typeof window !== "undefined" ? sessionStorage.getItem("user_email"):null;
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputsRef = useRef(new Array(4).fill(null));

  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);

  const [credentials, setCredentials] = useState({ email, otp: "" });

  useEffect( () => {
    inputsRef.current = inputsRef.current.slice(0, 4);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  useEffect(() => {
    setCredentials((prev) => ({ ...prev, otp: otp.join("") }));
  }, [otp]);

  const handleInput = (event, index) => {
    const value = event.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const otpCode = otp.join("");
    sessionStorage.setItem("otp_code",otpCode);
    
    const newCredentials = { email, otp: otpCode };
    setCredentials(newCredentials);

    try{
      const response = await send_otp({ email, otp: otpCode });
      if(response){
        console.log(response)
        if (response.resetToken) {
          sessionStorage.setItem("reset_token", response.resetToken);
          sessionStorage.setItem("otp_verified", response.message);
        }

        router.push('/reset-password/new-password')
      }
      
    } finally {
      setLoading(false)
    };

  };
  const requestData = { email }; 
  const handleResendOtp = async () => {
    if (!resendDisabled) {
      try {
        await reset_password(requestData);
        toast.success('OTP berhasil di kirim ulang')
        setResendDisabled(true);
        setTimer(60); // Set countdown ulang ke 60 detik
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border md:px-10 lg:px-16 py-8 md:py-12 lg:py-20 rounded-2xl shadow-[8px_4px_64px_rgba(0,0,0,0.25)] flex h-full w-full md:w-[600px] lg:w-[1000px] mx-10 z-10">
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
            {Array.from({ length: 4 }).map((_, index) => (
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
            <button
              type="button"
              onClick={handleResendOtp}
              className={`md:text-xs lg:text-sm font-semibold transition ${
                resendDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-pri-main dark:text-pri-border hover:text-pri-hover dark:hover:text-pri-border/50"
              }`}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Kirim ulang dalam ${timer}s` : "Kirim ulang OTP"}
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
