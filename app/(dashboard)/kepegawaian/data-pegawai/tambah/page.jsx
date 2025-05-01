'use client'
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TambahPegawaiForm from "../../_component/TambahPegawaiForm";
import { tambah_guru } from "@/app/api/ApiKepegawaian";
import { useLoading } from "@/context/LoadingContext";

export default function tambah () {
  const router = useRouter()
  const {setIsLoading} = useLoading()
  const confirmTambah = async (createdData) => {
    try {
      //console.log("createdData",createdData)
      setIsLoading(true)
      const response = await tambah_guru(createdData)
      console.log(response)
      sessionStorage.setItem("create_pegawai",response.data.message)
      router.push('/kepegawaian/data-pegawai')
    } catch (error) {
      toast.error("gagal membuat data ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-dark_net-pri">
        <ToastContainer/>
        <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold mt-5 mb-[34px] ms-2">Tambah Data Pegawai</h1>
        <TambahPegawaiForm onConfirm={confirmTambah}/>
      </div>
    </>
  )
}