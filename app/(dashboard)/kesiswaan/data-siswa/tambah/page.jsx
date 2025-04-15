'use client'
import { tambah_siswa } from "@/app/api/ApiKesiswaan";
import TambahSiswaForm from "../../_component/TambahSiswaForm";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function tambah () {
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState(false)
  
  const confirmTambah = async (createdData) => {
    try {
      //console.log("createdData",createdData)
      setIsLoading(true)
      const response = await tambah_siswa(createdData)
      console.log(response)
      sessionStorage.setItem("create_siswa",response.data.message)
      router.push('/kesiswaan/data-siswa')
    } catch (error) {
      toast.error("gagal membuat data siswa")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-black px-5 pb-7">
        <ToastContainer/>
        <h1 className="w-full text-black text-xl font-semibold mt-5 mb-[34px] ms-2">Tambah Data Siswa</h1>
        <TambahSiswaForm onConfirm={confirmTambah}/>
      </div>
    </>
  )
}