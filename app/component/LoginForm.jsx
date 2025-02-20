"use client"

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'



export default function LoginForm() {
  const router = useRouter()
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
 
    const response = await fetch('https://optionally-topical-dassie.ngrok-free.app/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.push('/dashboard')
    } else {
      // Handle errors
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-white px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-20 rounded-2xl shadow-[8px_4px_64px_rgba(0,0,0,0.25)] flex h-full w-full md:w-[600px] lg:w-[1000px] z-10">
        <div className="flex-1 text-center hidden lg:flex items-center">
          <img src="/svg/login.svg" alt="Login" className="object-contain h-80 w-full" />
        </div>

        <div className="w-full lg:w-1/2 md:px-6 flex flex-col justify-center items-center">
          <h2 className="text-4xl text-center font-semibold text-blue-600 mb-2">Selamat Datang!</h2>
          <p  className="text-xl text-gray-600 mb-[40px] font-light">Masuk ke akun anda</p>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin.serpihan@gmail.com"
                required
              />
            </div>
            <div className="w-full mb-[40px]">
              <label className="block text-sm font-medium text-gray-700">Kata Sandi</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"


                placeholder="********"

                required
              />
              <div className="flex justify-end mt-2">
                <a
                  className="font-medium text-blue-600 text-sm"
                  href="/reset-password"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  forgot password?
                </a>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}