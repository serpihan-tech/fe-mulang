"use client";
import { useEffect, useState } from "react";
import { useRouter,usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import NotificationTeacher from "./pages/Teacher";
import NotificationStudent from "./pages/Student";

export default function Dashboard() {
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
      router.replace("/login"); // Gunakan replace agar tidak bisa kembali ke dashboard dengan tombol back
    } else {
      setRole(userRole);
      const message = sessionStorage.getItem("come_first"); 
    }

    if (userRole !== "teacher" && userRole !== "student") {
      alert("Anda tidak memiliki akses ke halaman ini");
      router.replace("/dashboard");
    }
    

    setLoading(false); // Matikan loading setelah validasi selesai
  }, []);

  if (loading) return <p>Loading...</p>; // Hindari rendering sebelum validasi selesai

  return (
    <div className="text-black dark:text-white">
      <ToastContainer />
      {role === "student" && <NotificationStudent />}
      {role === "teacher" && <NotificationTeacher />}
    </div>
  );
}
