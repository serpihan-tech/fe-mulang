"use client";

import { data_kelas, data_semester, detail_data_kelas, edit_kelas, hapus_kelas, hapus_semester, tambah_kelas, tambah_semester } from "@/app/api/ApiKesiswaan";
import Breadcrumb from "@/app/component/Breadcrumb";
import DeletePopUp from "@/app/component/DeletePopUp";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import TableComponent from "@/app/component/Table";
import { Copyright, DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DataKelasModal from "../_component/DataKelasModal";
import TambahKelasModal from "../_component/TambahKelasModal";
import { format } from "date-fns";
import DataNotFound from "@/app/component/DataNotFound";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import TambahSemesterModal from "../_component/TambahSemester";

export default function TahunAjar() {
  const [DetailkelasData, setDetailKelasData] = useState(null);
  const router = useRouter();
  const [SemesterData, setSemesterData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTambahOpen, setTambahOpen] = useState(false);
  const [selectedSearch, setSearch] = useState(' ');



  const fetchDataSemester = async (limitVal = limit, page=1, search=selectedSearch) => {
    setIsLoading(true);
    try {
        const data = await data_semester(limitVal,page,search)
        const dataArray = data.data
        console.log(data)
        if (Array.isArray(dataArray)) {
            // Mapping agar sesuai dengan format tabel
            const formattedData = dataArray.map((item) => ({
                id_semester: item.id || "Tidak ada",
                tahun_ajar: (item.name+" "+item.semester) || "Tidak ada",
                tanggal_mulai: format(new Date(item.dateStart), "dd-MM-yyyy") || "Tidak ada",
                tanggal_selesai: format(new Date(item.dateEnd), "dd-MM-yyyy") || "Tidak ada",
                status: (item.status==1?"Aktif":"Nonaktif")  || "Tidak ada",

            }));

            setSemesterData(formattedData);
        }

        setMeta(data.meta); 
        setCurrentPage(page);
    } catch (error) {
        toast.error(error.message);
    } finally {
        setIsLoading(false);
    }
  };


  const columns = [
    { label: "tahun_ajar", sortKey: "tanggal" },
    { label: "tanggal_mulai", sortKey: "nis" },
    { label: "tanggal_selesai", sortKey: "namaSiswa" },
    { label: "status", sortKey: "status" },
  ];

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    fetchDataSemester(newLimit);
  };

  useEffect(() => {
    fetchDataSemester();
  }, [limit,selectedSearch]);

  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const handleDelete = (semesterId) => {
    setSelectedSemesterId(semesterId);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedSemesterId) return;
    setIsLoading(true);

    try {
      await hapus_semester(selectedSemesterId);
      setIsSuccess(true);
      setDeleteOpen(false);
      fetchDataSemester(); 
      setTimeout(() => setIsSuccess(false), 2000); // Pop-up sukses hilang otomatis
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setIsLoading(false);
    }
  };
  
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

  const confirmTambah = async (createdData) => {
    
    const payload = {
      name: createdData.tahunAjar,
      semester: createdData.semester.value,
      date_start: format(new Date(createdData.date_start), "yyyy-MM-dd"),
      date_end: format(new Date(createdData.date_end), "yyyy-MM-dd"),
      status: parseInt(createdData.status),
    };

    setIsLoading(true);
    try {
      
      const response = await tambah_semester(payload);
      if (response){
        setTambahOpen(false);
        setIsSuccess(true)
        fetchDataSemester()
        setTimeout(() => setIsSuccess(false), 1200);

      }
      
      // Tambahkan fungsi untuk refresh data kelas jika perlu
    } catch (error) {
      toast.error("Gagal membuat data kelas!");
    } finally {
      setIsLoading(false);
    }
  }  

  return (
    <>
      <div className="z-0 transition">
        <ToastContainer/>

        {/* Modal Tambah */}
        {isTambahOpen && (
            <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
              <TambahSemesterModal
                onCancel={() => setTambahOpen(false)}
                onConfirm={confirmTambah}
                isLoading={isLoading}
              />
            </div>
          )}

        {/* Modal Edit */}
        {isEditOpen && (
            <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
              <DataKelasModal
                onCancel={() => setEditOpen(false)}
                onConfirm={confirmEdit}
                isLoading={isLoading}
                kelasData={DetailkelasData}
              />
            </div>
          )}
          
        {/* Pop-up Konfirmasi Delete */}
        {isDeleteOpen && (
            <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
              <DeletePopUp
                onCancel={() => setDeleteOpen(false)}
                onConfirm={confirmDelete}
                isLoading={isLoading}
              />
            </div>
          )}

        {/* Pop-up Sukses */}
        {isSuccess && (
            <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
              <SuccessUpdatePopUp />
            </div>
          )}

        
        {/* Body */}
        <div>
          <div className="w-full ps-2">
            <div className="flex items-center">
              <h1 className="w-full text-black text-xl font-semibold">Data Semester</h1> 
              <div className="w-full flex items-center justify-end gap-5">
                <SmallButton
                  onClick={() => setTambahOpen(true)}
                  type="button"
                  icon={ProfileAdd}
                  bgColor="bg-blue-600"
                  colorIcon="white"
                  title={"Tambah Semester"}
                  hover={"hover:bg-blue-700"}
                />
              
              </div>
            </div>
            <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
              <div className={SemesterData ? "max-w-screen-xl p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                  {SemesterData ? 
                    <TableComponent 
                        columns={columns} 
                        data={SemesterData} 
                        // onEdit={handleEdit}
                        onDelete ={handleDelete}
                        Aksi="EditDelete"
                        title="Tabel Data Semester"
                        dataKey='id_semester'
                        handleSearchChange={handleSearchChange}
                        selectedSearch={selectedSearch}
                    /> : <DataNotFound /> }
              </div>

              {meta && <PaginationComponent meta={meta} onPageChange={fetchDataSemester} onLimitChange={handleLimitChange}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}