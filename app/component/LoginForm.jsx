"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import { login } from "../api/ApiAuth";
import { Eye, EyeSlash } from "iconsax-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try{
      const response = await login(credentials);
      if(response){
        console.log(response)
        sessionStorage.setItem("token",response.token.token);
        sessionStorage.setItem("role",response.role);
        sessionStorage.setItem("full_name",response.data.profile.name);
        sessionStorage.setItem("come_first", response.message);
        router.push("/dashboard");
      }
      
    } finally {
      setLoading(false)
    };

  }, [credentials,router]);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-white dark:bg-netral-100/10 dark:backdrop-blur-md dark:border-2 dark:border-pri-border px-6 md:px-10 lg:px-16 py-8 md:py-12 lg:py-20 rounded-2xl shadow-md flex h-full w-full md:w-[600px] lg:w-[1000px] mx-10 z-10">
        
        {/* Gambar Login */}
        <div className="flex-1 text-center hidden lg:flex items-center">
          <Image src="/svg/login.svg" alt="Login" width={300} height={300} className="object-contain h-80 w-full" />
        </div>

        {/* Form Login */}
        <div className="w-full lg:w-1/2 md:px-6 flex flex-col justify-center items-center">
          <h2 className="md:text-4xl text-2xl text-center font-semibold text-pri-main dark:text-pri-border mb-2 ">Selamat Datang!</h2>
          <p className="md:text-xl text-lg text-netral-100 dark:text-netral-0 mb-10 font-semibold">Masuk ke akun Anda</p>

          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-netral-100 dark:text-netral-0">Email</label>
              <input
                value={credentials.email}
                onChange={handleChange}
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pri-main/20 
                          bg-white text-gray-900 border-gray-300 placeholder-gray-400 
                          dark:bg-gray-800 dark:text-white dark:border-netral-30 dark:placeholder-netral-30
                          dark:focus:ring-pri-border dark:focus:border-pri-border transition duration-200"
                placeholder="admin.serpihan@gmail.com"
                required
                aria-label="Email Anda"
              />
            </div>

            <div className="w-full mb-8">
              <label className="block text-sm font-medium text-netral-100 dark:text-netral-0">Kata Sandi</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
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
              
              <div className="flex justify-end mt-2">
                <a
                  className="font-medium text-pri-main dark:text-pri-border text-sm hover:text-pri-hover dark:hover:text-pri-border/50 transition"
                  href="/reset-password"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Lupa kata sandi?
                </a>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-err-main text-sm mb-4">{error}</p>}
            
            {/* Tombol Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-pri-main dark:bg-pri-border text-white dark:text-netral-100 py-2 rounded-md hover:bg-pri-hover dark:hover:bg-pri-border/50 transition"
                disabled={loading}
              >
                {loading ? "Memverifikasi..." : "Masuk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
