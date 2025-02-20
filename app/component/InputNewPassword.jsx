"use client"
import { useState,FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"


export default function Reset() {
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
    
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
      <div className="bg-white px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-20 rounded-2xl shadow-[8px_4px_64px_rgba(0,0,0,0.25)] flex h-full w-full md:w-[600px] lg:w-[1000px] z-10">
        <div className="flex-1 text-center hidden lg:flex items-center">
          <img src="/svg/login.svg" alt="Login" className="object-contain h-80 w-full" />
        </div>

        <div className="w-full lg:w-1/2 md:px-6 flex flex-col justify-center items-center">
            <h2 className="text-4xl text-center font-semibold text-blue-600 mb-2">Reset Password</h2>
            <p  className="text-xl text-gray-600 mb-[40px] font-light">Masukkan Password baru</p>
            <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
                <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="********"
                required
                />
            </div>
            <div className="w-full mb-4">
                <label className="block text-sm font-medium text-gray-700">Konfirmasi Kata Sandi</label>
                <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="********"
                required
                />
                {error && <p className="text-red-500 text-sm mt-1">Konfirmasi kata sandi tidak sesuai!</p>}
            </div>
            <div className="flex justify-center">
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
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