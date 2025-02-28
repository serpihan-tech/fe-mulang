"use client"
import { useState,FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeSlash } from "iconsax-react"


export default function Reset() {
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    
  async function handleSubmit(event) {
    event.preventDefault();
    setError(false);

    if (password !== confirmPassword) {
      setError(true);
      return;
    }

    setLoading(true);
    
    const email = sessionStorage.getItem("user_email");
    const reset_token = sessionStorage.getItem("reset_token");
    
    try {
      const response = await fetch("https://optionally-topical-dassie.ngrok-free.app/forgot-password/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:email ,resetToken:reset_token ,password:password }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengubah kata sandi");
      }

      alert("Kata sandi berhasil diperbarui!");
      router.push('/login');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-white dark:bg-netral-0/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-20 rounded-2xl shadow-[8px_4px_64px_rgba(0,0,0,0.25)] flex h-full w-full md:w-[600px] lg:w-[1000px] mx-10 z-10">
        <div className="flex-1 text-center hidden lg:flex items-center">
          <img src="/svg/login.svg" alt="Login" className="object-contain h-80 w-full" />
        </div>

        <div className="w-full lg:w-1/2 md:px-6 flex flex-col justify-center items-center">
            <h2 className="md:text-4xl text-2xl text-center font-semibold text-pri-main dark:text-pri-border mb-1 md:mb-2">Reset Password</h2>
            <p  className="md:text-xl text-lg text-netral-100 dark:text-netral-0 mb-[40px] font-light">Masukkan Password baru</p>
            <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-netral-100 dark:text-netral-0">
                Kata Sandi
              </label>

              {/* Wrapper untuk input dan ikon */}
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200
                    bg-white text-gray-900 placeholder-gray-400 pr-12
                    dark:bg-gray-800 dark:text-white dark:placeholder-netral-30 
                    ${error ? 
                      "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400" 
                      : 
                      "border-gray-300 focus:ring-blue-500 dark:border-netral-30 dark:focus:ring-pri-border"
                    }`}
                  placeholder="********"
                  required
                />

                {/* Tombol Eye */}
                <button 
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 dark:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlash size="20" color="#7F7F7F" variant="Outline" />
                  ) : (
                    <Eye size="20" color="#7F7F7F" variant="Outline"/>
                  )}
                </button>
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-netral-100 dark:text-netral-0">
                Konfirmasi Kata Sandi
              </label>

              {/* Wrapper untuk input dan ikon */}
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200
                    bg-white text-gray-900 placeholder-gray-400 pr-12
                    dark:bg-gray-800 dark:text-white dark:placeholder-netral-30 
                    ${error ? 
                      "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400" 
                      : 
                      "border-gray-300 focus:ring-blue-500 dark:border-netral-30 dark:focus:ring-pri-border"
                    }`}
                  placeholder="********"
                  required
                />

                {/* Tombol Eye */}
                <button 
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center justify-center 
                            text-gray-500 dark:text-white transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlash size="20" color="#7F7F7F" variant="Outline" />
                  ) : (
                    <Eye size="20" color="#7F7F7F" variant="Outline" />
                  )}
                </button>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-1">Konfirmasi kata sandi tidak sesuai!</p>}
            </div>

            <div className="flex justify-center">
                <button
                type="submit"
                className="w-full bg-pri-main dark:bg-pri-border text-white dark:text-netral-100 py-2 rounded-md hover:bg-pri-hover dark:hover:bg-pri-border/50 transition"
                disabled={loading}
                >
                {loading ? "Menyimpan..." : "Lanjut"}
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}