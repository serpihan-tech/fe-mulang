'use client'
import { useLoading } from "@/context/LoadingContext";
import TambahPengumumanForm from "../_component/AdminTambahPengumumanForm";
import AdminTambahPengumumanForm from "../_component/AdminTambahPengumumanForm";
import TeacherTambahPengumumanForm from "../_component/TeacherTambahPengumumanForm";
import { useEffect, useState } from "react";

export default function edit () {
  const [role,setRole] = useState(null);
  const {setIsLoading} = useLoading();
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

    setIsLoading(false); // Matikan loading setelah validasi selesai
  }, []);
  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-dark_net-pri gap-5">
        <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold mt-[38px] mb-[34px] ms-2">Tambah Pengumuman</h1>
        {role === "admin" && <AdminTambahPengumumanForm />}
        {role === "teacher" && <TeacherTambahPengumumanForm />}
        
      </div>
    </>
  )
}