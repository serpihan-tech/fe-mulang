"use client"
import { FormEvent,useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Reset() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true);
    
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    
    try {
      const response = await fetch('https://optionally-topical-dassie.ngrok-free.app/forgot-password/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
   
      if (response.ok) {
        router.push('/reset-password/send-otp')
        sessionStorage.setItem("user_email", email);
      } else {
        console.log('Error 500: Tidak bisa terhubung dengan server')
  
      }
    } catch (err) {
      setError(err.message);
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
          <h2 className="md:text-4xl text-2xl text-center font-semibold text-pri-main dark:text-pri-border md:mb-2 mb-1">Reset Password</h2>
          <p  className="md:text-xl text-lg text-netral-100 dark:text-netral-0 mb-[40px] font-light">Masukkan Email anda</p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-netral-100 dark:text-netral-0">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pri-main/20 
                          bg-white text-gray-900 border-gray-300 placeholder-gray-400 
                          dark:bg-gray-800 dark:text-white dark:border-netral-30 dark:placeholder-netral-30
                          dark:focus:ring-pri-border dark:focus:border-pri-border transition duration-200"
                placeholder="admin.serpihan@gmail.com"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pri-main dark:bg-pri-border text-white dark:text-netral-100 py-2 rounded-md hover:bg-pri-hover dark:hover:bg-pri-border/50 transition"
              >
                {loading ? "Memverifikasi..." : "Lanjut"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}