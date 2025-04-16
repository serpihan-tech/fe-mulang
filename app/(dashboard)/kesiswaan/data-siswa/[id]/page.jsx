"use client"
import { detail_data_siswa, edit_siswa } from "@/app/api/ApiKesiswaan";
import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import TambahSiswaForm from "../../_component/TambahSiswaForm";
import { useRouter } from "next/navigation";

export default function EditSiswaPage({ params }) {
  const {id} = use(params)
  const router = useRouter()
  const [dataSiswa, setDataSiswa] = useState(null)
  const [IsLoading, setIsLoading] = useState(false)

  
  const fetchDataSiswa = async (siswaId) => {
    try{
      const data = await detail_data_siswa(siswaId)
      console.log("data sebelum:",data)
      setDataSiswa(data.student)
    } finally{}
  }

  const confirmEdit = async (editedData) => {
    try {
      //console.log("editedData",editedData)
      setIsLoading(true)
      const emailValidator = dataSiswa.user.email
      const usernameValidator = dataSiswa.user.username
      
      if (emailValidator === editedData.user.email) {
        editedData.user.email = '';
      }
      if (usernameValidator === editedData.user.username) {
        editedData.user.username = '';
      }

      const response = await edit_siswa(id,editedData)
      //console.log(response)
      sessionStorage.setItem("create_siswa",response.message)
      router.push('/kesiswaan/data-siswa')
    } catch (error) {
      toast.error("Gagal mengedit data siswa")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDataSiswa(id)
  }, [id])

  console.log(dataSiswa)
  

  return (
    <>
      <ToastContainer />
      <TambahSiswaForm
        data={dataSiswa}
        onConfirm={confirmEdit}
          />
    </>
  )
}