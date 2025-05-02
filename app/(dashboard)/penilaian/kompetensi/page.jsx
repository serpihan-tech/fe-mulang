"use client";

import { data_nilai_siswa } from "@/app/api/admin/ApiPenilaian";
import { useBreadcrumb } from "@/context/BreadCrumbContext";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Kompetensi() {
  const { setShowBreadcrumb } = useBreadcrumb();
  
  useEffect(() => {
    setShowBreadcrumb(true);
    return () => setShowBreadcrumb(false);
  }, [setShowBreadcrumb]);

  const fetchDataNilai = async () => {
    try {
      const data = await data_nilai_siswa();
      console.log("data nilai mentah: ",data)
      
    } catch (error) {
        toast.error(error.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchDataNilai()
  }, [])
  

  return (
    <>
      <ToastContainer />
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <h1 className="w-full text-black text-xl font-semibold">Kompetensi</h1> 
          </div>
        </div>
      </div>  
    </>
  );
}