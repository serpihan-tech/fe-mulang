"use client"
import { useRef } from "react";

export default function ResetPassword() {

  const inputsRef = useRef([]);

  const handleInput = (event, index) => {
    const target = event.target;
    target.value = target.value.replace(/[^0-9]/g, ""); // Hanya angka

    if (target.value.length === 1) {
      const nextInput = inputsRef.current[index + 1];
      if (nextInput) nextInput.focus(); // Pindah ke input berikutnya
    }
  };

  const handleKeyDown = (event, index) => {
    const target = event.target;

    if (event.key === "Backspace" && target.value === "") {
      const prevInput = inputsRef.current[index - 1];
      if (prevInput) prevInput.focus(); // Kembali ke input sebelumnya saat backspace
    }
  }; 

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-20 rounded-2xl shadow-[8px_4px_64px_rgba(0,0,0,0.25)] flex h-full w-full md:w-[600px] lg:w-[1000px] z-10">
        <div className="flex-1 text-center hidden lg:flex">
          <img src="/svg/otp.svg" alt="otp" className="object-contain h-80 w-full" />
        </div>

        <div className="w-full lg:w-1/2 px-6 flex flex-col justify-center items-center">
          <h2 className="text-4xl md:text-3xl font-semibold text-blue-600 mb-2">Verifikasi OTP</h2>
          <p className="md:text-sm lg:text-base text-center mb-[32px] font-normal text-slate-600">OTP telah dikirim ke admin*****@gmail.com</p>
          <div className="justify-center w-full">
            <div className="flex justify-center space-x-1 md:space-x-2 lg:space-x-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-3xl text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  required
                  onInput={(event) => handleInput(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                />
              ))}
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <p className="text-base font-normal text-slate-600">01.00</p>
            </div>
            <div className="w-full flex flex-col items-center mt-[26px]">
              <p className="md:text-xs lg:text-sm font-normal text-slate-600">Tidak menerima OTP?</p>
              <button className="md:text-xs lg:text-sm text-blue-600 font-semibold hover:text-blue-700">
                Kirim ulang OTP
              </button>
            </div>

            <div className="flex justify-center mt-[32px]">
              <button
                type="submit"
                className="w-full lg:w-11/12 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Verifikasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}