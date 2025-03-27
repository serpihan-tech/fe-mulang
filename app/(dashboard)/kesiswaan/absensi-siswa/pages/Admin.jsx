"use client";

import { data_absen_siswa, hapus_absen_siswa } from "@/app/api/ApiKesiswaan";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import TableComponent from "@/app/component/Table";
import PaginationComponent from "@/app/component/Pagination";
import StatusIcon from "@/app/component/StatusIcon";
import DeletePopUp from "@/app/component/DeletePopUp";

export default function AbsensiSiswaAdmin() {
  const [absenData, setAbsenData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterredDate, setFilterredDate] = useState(null);
  const [selectedAbsenId, setSelectedAbsenId] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  // const [isEditOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isTambahOpen, setTambahOpen] = useState(false);


  const fetchDataAbsen = async (page=1, date, limitVal = limit) => {
    try {
        const data = await data_absen_siswa(page, date="2024-13-04", limitVal);
        console.log(data)
        const dataArray = data.absences.absences.data
        console.log(dataArray)
        if (Array.isArray(dataArray)) { 
            const formattedData = dataArray.map((item) => ({
                id_absen: item?.id||"Tidak ada",
                tanggal: format(new Date(item?.date), "dd-MM-yyyy") || "Tidak ada",
                nis: item?.classStudent?.student.studentDetail.nis || "Tidak ada",
                nama_siswa: item?.classStudent?.student.name || "Tidak ada",
                status: <StatusIcon status={item?.status}/> || "Tidak ada",
                keterangan: item?.reason || "-",

            }));

            setAbsenData(formattedData);
        }

        setMeta(data.absences.absences.meta); 
        setCurrentPage(page);
    } catch (error) {
        toast.error(error.message);//"Server pekok"
    } finally {
        setLoading(false);
    }
  };

  const columns = [
    "tanggal",
    "nis",
    "nama_siswa",
    "status",
    "keterangan"    
  ];

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    fetchDataAbsen(currentPage, limit)
  };

  useEffect(() => {
    fetchDataAbsen();
  }, []);

  const handleDelete = (absenId) => {
    setSelectedAbsenId(absenId);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedSemesterId) return;
    setIsLoading(true);

    try {
      const response = await hapus_absen_siswa(selectedAbsenId);
      if(response){
        setDeleteOpen(false);
        fetchDataKelas();
        toast.success(response.message)
      }
       
      
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
      <div className="z-0 transition">        
        {/* Body */}
        <div>
          <div className="w-full ps-2">
            <div className="flex items-center">
              <h1 className="w-full text-black text-xl font-semibold">Data Absensi Siswa</h1> 
              
            </div>
            <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
              <div className={absenData ? "max-w-screen-xl p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                  {absenData ? 
                    <TableComponent 
                        columns={columns} 
                        data={absenData} 
                        // onEdit={handleEdit}
                        onDelete ={handleDelete}
                        title="Tabel Data Semester"
                        dataKey='id_absen'
                    /> : "Data tidak ditemukan" }
              </div>

              {meta && <PaginationComponent meta={meta} onPageChange={fetchDataAbsen} onLimitChange={handleLimitChange}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}