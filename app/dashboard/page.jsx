"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentDashboard from "./_component/pages/Student";
import TeacherDashboard from "./_component/pages/Teacher";
import AdminDashboard from "./_component/pages/Admin";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // State loading

  useEffect(() => {
    const token = "admin";
    const userRole = "admin";

    if (!token || !userRole) {
      alert("Session anda terputus, harap login ulang");
      router.replace("/login"); // Gunakan replace agar tidak bisa kembali ke dashboard dengan tombol back
    } else {
      setRole(userRole);
    }

    setLoading(false); // Matikan loading setelah validasi selesai
  }, []);

  if (loading) return <p>Loading...</p>; // Hindari rendering sebelum validasi selesai

  return (
    <div>
      {role === "student" && <StudentDashboard />}
      {role === "teacher" && <TeacherDashboard />}
      {role === "admin" && <AdminDashboard />}
    </div>
  );
}
