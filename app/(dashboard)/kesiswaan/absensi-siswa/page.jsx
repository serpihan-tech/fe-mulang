"use client";
import { useEffect, useState } from "react";
import { useRouter,usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import DataSiswaAdmin from "./pages/Admin";
import AbsensiSiswaAdmin from "./pages/Admin";
import AbsensiSiswaTeacher from "./pages/Teacher";
import { useLoading } from "@/context/LoadingContext";

export default function AbsensiSiswa() {
  const router = useRouter();
  const pathname = usePathname()
  const [role, setRole] = useState(null);
  const { setIsLoading } = useLoading();

  console.log("router:",pathname)

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");

    if (!token || !userRole) {
      alert("Session anda terputus, harap login ulang");
      router.replace("/login");
    } else {
      setRole(userRole);

      // Redirect if the user is not an admin
      if (userRole !== "admin" && userRole !== "teacher") { 
        alert("Anda tidak memiliki akses ke halaman ini");
        router.replace("/dashboard");
      }
    }

    setIsLoading(false);
  }, [router]);

  return (
    <div className="text-black dark:text-white">
      <ToastContainer />
      {role === "admin" && <AbsensiSiswaAdmin />}
      {role === "teacher" && <AbsensiSiswaTeacher />}
    </div>
  );
}
