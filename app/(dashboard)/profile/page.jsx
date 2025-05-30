"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeacherProfile from "./pages/Teacher";
import StudentProfile from "./pages/Student";
import { useLoading } from "@/context/LoadingContext";
import AdminProfile from "./pages/Admin";
import { ToastContainer } from "react-toastify";

export default function DataSiswa() {
  const router = useRouter()
  const [role, setRole] = useState(null);
  const {setIsLoading} = useLoading();
  
    useEffect(() => {
            const token = sessionStorage.getItem("token");
            const userRole = sessionStorage.getItem("role");
            
        
            if (!token || !userRole) {
              alert("Session anda terputus, harap login ulang");
              router.replace("/login");
            } else {
              setRole(userRole);
              
        
              // Redirect if the user is not an admin
              if (!userRole) {
                alert("Anda tidak memiliki akses ke halaman ini");
                router.replace("/dashboard");
              }
            }
        
            setIsLoading(false);
          }, [router]);
  return (
    <>
      <ToastContainer />
      <div className="mx-2">
      
        {role === "admin" && <AdminProfile />}
        {role === "teacher" && <TeacherProfile />}
        {role === "student" && <StudentProfile />}
      </div>
    </>
  );
}
