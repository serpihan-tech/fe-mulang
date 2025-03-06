"use client";

import SmallButton from "@/app/component/SmallButton";
import { DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";
import AdminDataSiswa from "./pages/Admin";
import TeacherDataSiswa from "./pages/Teacher";
import { useEffect, useState } from "react";

export default function DataSiswa() {
  const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // State loading
  
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      const userRole = sessionStorage.getItem("role");
  
      if (!token || !userRole) {
        alert("Session anda terputus, harap login ulang");
        router.replace("/login"); // Gunakan replace agar tidak bisa kembali ke dashboard dengan tombol back
      } else {
        setRole(userRole);
        
      }
  
      setLoading(false); // Matikan loading setelah validasi selesai
    }, []);
  return (
    <>
      {role === "admin" && <AdminDataSiswa />}
    </>
  );
}
