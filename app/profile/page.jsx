"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeacherProfile from "./pages/Teacher";
import StudentProfile from "./pages/Student";

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
              if (userRole !== "teacher"&& userRole !== "student") {
                alert("Anda tidak memiliki akses ke halaman ini");
                router.replace("/dashboard");
              }
            }
        
            setLoading(false);
          }, [router]);
  return (
    <>
      {role === "teacher" && <TeacherProfile />}
      {role === "student" && <StudentProfile />}
    </>
  );
}
