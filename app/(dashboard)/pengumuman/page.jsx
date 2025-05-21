"use client";

import SmallButton from "@/app/component/SmallButton";
import { useLoading } from "@/context/LoadingContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminPengumuman from "./pages/Admin";
import TeacherPengumuman from "./pages/Teacher";
import { ToastContainer } from "react-toastify";

export default function Pengumuman() {
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
  const router = useRouter();
  return (
    <>  
    <ToastContainer />
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold">List Pengumuman</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon="/svg/announcement.svg"
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Buat Pengumuman"}
                hover={"hover:bg-blue-700"}
                onClick={() => router.push(`/pengumuman/tambah`)}
              />
            </div>
          </div>

          {role === "admin" && <AdminPengumuman />}
          {role === "teacher" && <TeacherPengumuman />}
        </div>
      </div>  
    </>
  );
}