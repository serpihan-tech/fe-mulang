"use client";

import SmallButton from "@/app/component/SmallButton";
import { DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";
import AdminDataSiswa from "./pages/Admin";
import TeacherDataSiswa from "./pages/Teacher";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DataSiswa() {
  const router = useRouter()
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const createSiswa = sessionStorage.getItem("create_siswa");
    
    if(createSiswa){
      toast.success(createSiswa)
      sessionStorage.removeItem('create_siswa')
    }

    if (!token || !userRole) {
      toast.error("Session anda terputus, harap login ulang");
      router.replace("/login");
    } else {
      setRole(userRole);
      
      if (userRole !== "admin") {
        toast.error("Anda tidak memiliki akses ke halaman ini");
        router.replace("/dashboard");
      }
    }

    setLoading(false);
  }, [router]);
  return (
    <>
      {role === "admin" && <AdminDataSiswa />}
    </>
  );
}
