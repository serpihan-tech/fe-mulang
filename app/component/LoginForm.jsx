"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login } from "../api/ApiAuth";
import { Eye, EyeSlash } from "iconsax-react";
import { useLoading } from "@/context/LoadingContext";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setLoading(true);
    setError("");

    try {
      const responses = await login(credentials);

      if (responses.status === 200) {
        const response = responses.data
        const { activeSemester, profile } = response.data;
        const { token } = response.token;

        sessionStorage.setItem("semesterId", activeSemester.id);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("role", response.role);
        sessionStorage.setItem("full_name", profile.name);
        sessionStorage.setItem("come_first", response.message);
        sessionStorage.setItem("profile_data", JSON.stringify(response));

        await router.push("/dashboard");
      }
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
      setLoading(false);
    } 
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-white dark:bg-netral-100/10 dark:backdrop-blur-md dark:md:border-2 dark:md:border-pri-border px-2 md:px-10 lg:px-16 py-8 md:py-12 lg:py-20 rounded-2xl md:shadow-md flex h-full w-full md:w-[600px] lg:w-[1000px] mx-10 z-9">

        {/* Gambar Login */}
        <div className="flex-1 text-center hidden lg:flex items-center">
          <Image
            src="/svg/login.svg"
            alt="Login"
            width={300}
            height={300}
            className="object-contain h-80 w-full"
          />
        </div>

        {/* Form Login */}
        <div className="w-full lg:w-1/2 md:px-6 flex flex-col justify-center items-center">
          <h2 className="md:text-4xl text-2xl text-center font-semibold text-pri-main dark:text-pri-border mb-1 md:mb-2">
            Selamat Datang!
          </h2>
          <p className="md:text-xl text-lg text-netral-100 dark:text-netral-0 mb-10 font-semibold">
            Masuk ke akun Anda
          </p>

          <form className="w-full" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-netral-100 dark:text-netral-0">
                Email
              </label>
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

            {/* Password */}
            <div className="w-full mb-8">
              <label className="block text-sm font-medium text-netral-100 dark:text-netral-0">
                Kata Sandi
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition duration-200
                    bg-white text-gray-900 placeholder-gray-400 pr-12
                    dark:bg-gray-800 dark:text-white dark:placeholder-netral-30 
                    ${
                      error
                        ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-500 dark:border-netral-30 dark:focus:ring-pri-border"
                    }`}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center justify-center text-gray-500 dark:text-gray-300"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeSlash size="20" color="#7F7F7F" variant="Outline" />
                  ) : (
                    <Eye size="20" color="#7F7F7F" variant="Outline" />
                  )}
                </button>
              </div>

              <div className="flex justify-end mt-2">
                <a
                  className="font-medium text-pri-main dark:text-pri-border text-sm hover:text-pri-hover dark:hover:text-pri-border/50 transition"
                  href="/reset-password"
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
                disabled={isLoading}
                className={`w-full py-2 rounded-md transition
                  ${isLoading
                    ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-white"
                    : "bg-pri-main dark:bg-pri-border hover:bg-pri-hover dark:hover:bg-pri-border/50 text-white dark:text-netral-100"
                  }`}
              >
                {isLoading ? "Loading..." : "Masuk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
