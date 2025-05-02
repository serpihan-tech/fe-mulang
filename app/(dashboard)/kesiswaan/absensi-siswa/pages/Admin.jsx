"use client";

import { data_absen_siswa, detail_data_absen_siswa, edit_absen_siswa, hapus_absen_siswa } from "@/app/api/ApiKesiswaan";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";
import TableComponent from "@/app/component/Table";
import PaginationComponent from "@/app/component/Pagination";
import StatusIcon from "@/app/component/StatusIcon";
import DeletePopUp from "@/app/component/DeletePopUp";
import { useLoading } from "@/context/LoadingContext";
import DataNotFound from "@/app/component/DataNotFound";
import DataKelasModal from "../../_component/DataKelasModal";
import EditAbsensiModal from "../../_component/EditAbsenModal";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";

export default function AbsensiSiswaAdmin() {
  const [absenData, setAbsenData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedAbsenId, setSelectedAbsenId] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoading: setPageLoading } = useLoading();
  const [isEditOpen, setEditOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [isTambahOpen, setTambahOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSearch, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(""); 
  const [sortOrder, setSortOrder] = useState(""); 
  const [detailDataAbsen, setDetailDataAbsen] = useState(null)

  
  //, date=selectedDate
  const fetchDataAbsen = async (page=1,date=selectedDate, limitVal = limit, search=selectedSearch, sortField=sortBy, sortDir=sortOrder) => {

    try {
      let formattedDate = "";
      if (date) {
        const d = new Date(date);
        if (!isNaN(d)) {
          formattedDate = format(d, "yyyy-MM-dd");
        }} 
        const data = await data_absen_siswa(page,formattedDate,limitVal,search,sortField,sortDir);
        console.log(data)
        const dataArray = data?.absences.absences.data
        console.log(dataArray)
        if (Array.isArray(dataArray)) { 
            const formattedData = dataArray.map((item) => ({
                id_absen: item?.id||"Tidak ada",
                tanggal: format(new Date(item?.date), "dd-MM-yyyy") || "Tidak ada",
                nis: item?.classStudent?.student.studentDetail.nis || "Tidak ada",
                nama_siswa: item?.classStudent?.student.name || "Tidak ada",
                mata_pelajaran: item.schedule?.module?.name || "Tidak ada",
                status: <StatusIcon status={item?.status}/> || "Tidak ada",
                keterangan: item?.reason || "-",

            }));

            setAbsenData(formattedData);
        }

        setMeta(data.absences.absences.meta); 
        setCurrentPage(page);
    } catch (error) {
        toast.error(error.message);
    } finally {

        setIsLoading(false);
    }
  };

  const columns = [
    { label: "tanggal", sortKey: "tanggal" },
    { label: "nis", sortKey: "nis" },
    { label: "nama_siswa", sortKey: "namaSiswa" },
    { label: "status", sortKey: "status" },
    { label: "mata_pelajaran", sortKey: "mapel" },
    { label: "keterangan", sortKey: "alasan" },
  ];

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    fetchDataAbsen();
  }, [limit,selectedDate,selectedSearch, sortBy, sortOrder]);

  const handleDelete = (absenId) => {
    setSelectedAbsenId(absenId);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedAbsenId) return;
    setIsLoading(true);

    try {
      const response = await hapus_absen_siswa(selectedAbsenId);
      if(response){
        setDeleteOpen(false);
        setIsSuccess(true)
        fetchDataAbsen();
        setTimeout(() => setIsSuccess(false), 1200);
      }
       
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const handleSortChange = (key, direction) => {
    setSortBy(key);
    setSortOrder(direction);
  };
  const handleEdit = async (absenId) => {
    try{
      const data = await detail_data_absen_siswa(absenId)
      //console.log("data sebelum:",absenId,data.absence)
      setDetailDataAbsen(data.absence)
      setEditOpen(true)
      
    } finally{}
  }

  const confirmEdit = async (editedData) => {
    
    const payload = {
      status: editedData.status,
      reason: editedData.reason,
    };
    setIsLoading(true);

    try {
      const response = await edit_absen_siswa(editedData.id, payload);
      if(response){
        setIsSuccess(true)
        setTimeout(() => setIsSuccess(false), 1200);
        setEditOpen(false); 
        fetchDataAbsen()
      }
      
      // Tambahkan fungsi untuk refresh data kelas jika perlu
    } catch (error) {
      toast.error("Gagal mengupdate data kelas!");
    } finally {
      setIsLoading(false);
    }
  };

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
      {/* Modal edit */}
      {isEditOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <EditAbsensiModal
            onCancel={() => setEditOpen(false)}
            onConfirm={confirmEdit}
            isLoading={isLoading}
            AbsenData={detailDataAbsen}
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
      <div className="z-0 transition">        
        {/* Body */}
        <div>
          <div className="w-full ps-2">
            <div className="flex items-center">
              <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold">Data Absensi Siswa</h1> 
            </div>
            <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
              <div className={absenData ? "max-w-screen-xl p-2 lg:p-5 dark:bg-dark_net-ter" : "flex items-center justify-center text-black dark:text-white p-28"}>
                  {absenData ? 
                    <TableComponent 
                        columns={columns} 
                        data={absenData} 
                        onEdit={handleEdit}
                        onDelete ={handleDelete}
                        Aksi="EditDelete"
                        filterDate={true}
                        handleDateChange={handleDateChange}
                        handleSearchChange={handleSearchChange}
                        selectedSearch={selectedSearch}
                        selectedDate={selectedDate}
                        title="Tabel Data Absensi Siswa"
                        dataKey='id_absen'
                        onSortChange={handleSortChange}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                    /> : <DataNotFound /> }
              </div>

              {meta && <PaginationComponent meta={meta} onPageChange={fetchDataAbsen} onLimitChange={handleLimitChange}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}