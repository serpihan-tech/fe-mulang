"use client";

import { data_absen_siswa } from "@/app/api/ApiKesiswaan";
// import Breadcrumb from "@/app/component/Breadcrumb";
// import DeletePopUp from "@/app/component/DeletePopUp";
// import PaginationComponent from "@/app/component/Pagination";
// import SmallButton from "@/app/component/SmallButton";
// import TableComponent from "@/app/component/Table";
// import { Copyright, DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import DataKelasModal from "../_component/DataKelasModal";
// import TambahKelasModal from "../_component/TambahKelasModal";
import { format } from "date-fns";

export default function AbsensiSiswaAdmin() {
  // const [DetailkelasData, setDetailKelasData] = useState(null);
  // const router = useRouter();
  // const [SemesterData, setSemesterData] = useState(null);
  // const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(null);
  const [filterredDate, setFilterredDate] = useState(null);
  // const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  // const [isDeleteOpen, setDeleteOpen] = useState(false);
  // const [isEditOpen, setEditOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isTambahOpen, setTambahOpen] = useState(false);


  const fetchDataAbsen = async (page, limitVal = limit, date = format(new Date('2024-07-02T17:00:00.000Z'), "yyyy-MM-dd")) => {
    try {
        // if(date){
        //   const formattedDate = format(new Date(date), "YYYY-MM-DD")
        //   setFilterredDate(formattedDate)
        // } else {
        //   setFilterredDate(date)
        // } 
        // const formattedDate = format(new Date(date), "yyyy-MM-dd")
        const data = await data_absen_siswa(page, date='2024-12-04');
        console.log(data)
        // const dataArray = data.academicYears.data
        // console.log(dataArray)
        // if (Array.isArray(dataArray)) {
        //     // Mapping agar sesuai dengan format tabel
        //     const formattedData = dataArray.map((item) => ({
        //         id_semester: item.id || "Tidak ada",
        //         tahun_ajar: (item.name+" "+item.semester) || "Tidak ada",
        //         tanggal_mulai: format(new Date(item.dateStart), "dd-MM-yyyy") || "Tidak ada",
        //         tanggal_selesai: format(new Date(item.dateEnd), "dd-MM-yyyy") || "Tidak ada",
        //         status: (item.status==1?"Aktif":"Nonaktif")  || "Tidak ada",

        //     }));

        //     setSemesterData(formattedData);
        // }

        // setMeta(data.academicYears.meta); 
        // setCurrentPage(page);
    } catch (error) {
        toast.error(error.message);//"Server pekok"
    } finally {
        setLoading(false);
    }
  };

  const columns = [
    "id_semester",
    "tahun_ajar",
    "tanggal_mulai",
    "tanggal_selesai",
    "status",    
  ];

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    fetchDataSemester(newLimit);
  };

  useEffect(() => {
    fetchDataAbsen();
  }, []);

  // const handleDelete = (semesterId) => {
  //   setSelectedSemesterId(semesterId);
  //   setDeleteOpen(true);
  // };

  // const confirmDelete = async () => {
  //   if (!selectedSemesterId) return;
  //   setIsLoading(true);

  //   try {
  //     await hapus_kelas(selectedClassId);
  //     setIsSuccess(true);
  //     setDeleteOpen(false);
  //     fetchDataKelas(); // Reload data setelah sukses
  //     setTimeout(() => setIsSuccess(false), 2000); // Pop-up sukses hilang otomatis
  //   } catch (error) {
  //     toast.error("Gagal menghapus data");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // const handleEdit = async (kelasId) => {
  //   try{
  //     const data = await detail_data_kelas(kelasId)
  //     console.log("data sebelum:",data)
  //     setDetailKelasData(data)
  //     setEditOpen(true)
      
  //   } finally{}
  // }

  // const confirmEdit = async (editedData) => {
  //   if (!editedData.nama || !editedData.waliKelas) {
  //     toast.error("Nama Kelas dan Wali Kelas harus diisi!");
  //     return;
  //   }
  
  //   const payload = {
  //     name: editedData.nama,
  //     teacher_id: editedData.waliKelas,
  //   };
  
  //   try {
  //     setIsLoading(true);
  //     await edit_kelas(editedData.id, payload);
  //     toast.success("Data kelas berhasil diperbarui!");
  //     setEditOpen(false); // Tutup modal setelah sukses
  //     fetchDataKelas()
  //     // Tambahkan fungsi untuk refresh data kelas jika perlu
  //   } catch (error) {
  //     toast.error("Gagal mengupdate data kelas!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleTambah = async () => {
  //   try{
  //     setTambahOpen(true)
  //   } finally{}
  // }

  // const confirmTambah = async (createdData) => {
  //   if (!createdData.nama || !createdData.waliKelas) {
  //     toast.error("Nama Kelas dan Wali Kelas harus diisi!");
  //     return;
  //   }

  //   const payload = {
  //     name: createdData.nama,
  //     teacher_id: createdData.waliKelas,
  //   };

  //   try {
  //     setIsLoading(true);
  //     await tambah_kelas(payload);
  //     toast.success("Data kelas berhasil dibuat!");
  //     setTambahOpen(false); // Tutup modal setelah sukses
  //     fetchDataKelas()
  //     // Tambahkan fungsi untuk refresh data kelas jika perlu
  //   } catch (error) {
  //     toast.error("Gagal membuat data kelas!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }  

  return (
    <>
      
    </>
  );
}