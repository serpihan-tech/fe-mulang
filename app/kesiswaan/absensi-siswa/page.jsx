"use client";
import { useEffect, useState } from "react";
import { useRouter,usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import DataSiswaAdmin from "./pages/Admin";
import AbsensiSiswaAdmin from "./pages/Admin";
import AbsensiSiswaTeacher from "./pages/Teacher";

export default function AbsensiSiswa() {
  const router = useRouter();
  const pathname = usePathname()
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // State loading

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

    setLoading(false);
  }, [router]);

  if (loading) return <p>Loading...</p>; // Hindari rendering sebelum validasi selesai

  return (
    <div className="text-black dark:text-white">
      <ToastContainer />
      {role === "admin" && <AbsensiSiswaAdmin />}
      {role === "teacher" && <AbsensiSiswaTeacher />}
    </div>
  );
}
