"use client"
import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { detail_data_guru, edit_guru } from "@/app/api/ApiKepegawaian";
import TambahPegawaiForm from "../../_component/TambahPegawaiForm";

export default function EditGuruPage({ params }) {
  const {id} = use(params)
  const router = useRouter()
  const [IsLoading, setIsLoading] = useState(false)
  const [dataGuru, setDataGuru] = useState(null)

  
  const fetchDataGuru = async (guruId) => {
    try{
      const data = await detail_data_guru(guruId)
      console.log("data sebelum:",data)
      setDataGuru(data.teacher)
      
    } finally{}
  }

  const confirmEdit = async (editedData) => {
    try {
      //console.log("editedData",editedData)
      setIsLoading(true)
      const emailValidator = dataGuru.user.email
      const usernameValidator = dataGuru.user.username
      
      if (emailValidator === editedData.user.email) {
        editedData.user.email = '';
      }
      if (usernameValidator === editedData.user.username) {
        editedData.user.username = '';
      }

      const response = await edit_guru(id,editedData)
      console.log(response)
      if(response){
        sessionStorage.setItem("create_pegawai",response.message)
        router.push('/kepegawaian/data-pegawai')
      }
      
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDataGuru(id)
  }, [id])

 // console.log(dataGuru)
  

  return (
    <>
      <ToastContainer />
      <TambahPegawaiForm
        data={dataGuru}
        onConfirm={confirmEdit}
          />
    </>
  )
}