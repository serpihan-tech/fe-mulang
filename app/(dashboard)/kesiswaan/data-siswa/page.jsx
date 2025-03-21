"use client";

import SmallButton from "@/app/component/SmallButton";
import { DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";
import AdminDataSiswa from "./pages/Admin";
import TeacherDataSiswa from "./pages/Teacher";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DataSiswa() {
  const router = useRouter()
  const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // State loading
  
    useEffect(() => {
            const token = sessionStorage.getItem("token");
            const userRole = sessionStorage.getItem("role");
            
        
            if (!token || !userRole) {
              alert("Session anda terputus, harap login ulang");
              router.replace("/login");
            } else {
              setRole(userRole);
              
        
              // Redirect if the user is not an admin
              if (userRole !== "admin") {
                alert("Anda tidak memiliki akses ke halaman ini");
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
