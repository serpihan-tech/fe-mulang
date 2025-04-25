"use client";

import { data_kelas, detail_data_kelas, edit_kelas, hapus_kelas, tambah_kelas } from "@/app/api/ApiKesiswaan";
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
import DataNotFound from "@/app/component/DataNotFound";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import { useBreadcrumb } from "@/context/BreadCrumbContext";

export default function DataKelas() {
  
  const [DetailkelasData, setDetailKelasData] = useState(null);
  const router = useRouter();
  const [kelasData, setKelasData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTambahOpen, setTambahOpen] = useState(false);
  const [selectedSearch, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(""); 
  const [sortOrder, setSortOrder] = useState(""); 
  const { setShowBreadcrumb } = useBreadcrumb();
  
  useEffect(() => {
    setShowBreadcrumb(true);
    return () => setShowBreadcrumb(false);
  }, [setShowBreadcrumb]);

  const fetchDataKelas = async (page = 1,limitVal = limit, search=selectedSearch, sortField=sortBy, sortDir=sortOrder) => {
    try {
        const data = await data_kelas(page, limitVal, search, sortField, sortDir);
        console.log("data",data)
        const dataArray = data?.theClass.theClass
        if (Array.isArray(dataArray)) {
            // Mapping agar sesuai dengan format tabel
            const formattedData = dataArray.map((item) => ({
                id_kelas: item.id || "Tidak ada",
                nama_kelas: item.name || "Tidak ada",
                wali_kelas: item.teacher.name || "Tidak ada",
                total_siswa: item.totalStudents || "Tidak ada",
            }));

            setKelasData(formattedData);
        }

        setMeta(data.theClass.meta); // Simpan metadata untuk paginasi
        setCurrentPage(page);
    } catch (error) {
        toast.error("Gagal memuat data kelas.");
    } finally {
        setLoading(false);
    }
  };

  const columns = [
    { label: "nama_kelas", sortKey: "kelas" },
    { label: "wali_kelas", sortKey: "waliKelas" },
    { label: "total_siswa", sortKey: "jumlahSiswa" },
  ];

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    fetchDataKelas(currentPage, newLimit); // Refresh data dengan limit baru
  };

  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const handleSortChange = (key, direction) => {
    setSortBy(key);
    setSortOrder(direction);
  };

  useEffect(() => {
      fetchDataKelas();
  }, [limit,selectedSearch,sortBy,sortOrder]);

  const handleDelete = (kelasId) => {
    setSelectedClassId(kelasId);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedClassId) return;

    setIsLoading(true);
    try {
      await hapus_kelas(selectedClassId);
      setIsSuccess(true);
      setDeleteOpen(false);
      fetchDataKelas(); // Reload data setelah sukses
      setTimeout(() => setIsSuccess(false), 1200); // Pop-up sukses hilang otomatis
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = async (kelasId) => {
    try{
      const data = await detail_data_kelas(kelasId)
      console.log("data sebelum:",data)
      setDetailKelasData(data)
      setEditOpen(true)
      
    } finally{}
  }

  const confirmEdit = async (editedData) => {
    if (!editedData.nama || !editedData.waliKelas) {
      toast.error("Nama Kelas dan Wali Kelas harus diisi!");
      return;
    }
  
    const payload = {
      name: editedData.nama,
      teacher_id: editedData.waliKelas,
    };
  
    try {
      setIsLoading(true);
      await edit_kelas(editedData.id, payload);
      toast.success("Data kelas berhasil diperbarui!");
      setEditOpen(false); // Tutup modal setelah sukses
      fetchDataKelas()
      // Tambahkan fungsi untuk refresh data kelas jika perlu
    } catch (error) {
      toast.error("Gagal mengupdate data kelas!");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmTambah = async (createdData) => {
    if (!createdData.nama || !createdData.waliKelas) {
      toast.error("Nama Kelas dan Wali Kelas harus diisi!");
      return;
    }

    const payload = {
      name: createdData.nama,
      teacher_id: createdData.waliKelas,
    };

    try {
      setIsLoading(true);
      const response = await tambah_kelas(payload);
      toast.success("Data kelas berhasil dibuat!");
      setTambahOpen(false); // Tutup modal setelah sukses
      fetchDataKelas()
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

      {/* Modal Edit */}
      {isTambahOpen && (
          <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
            <TambahKelasModal
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
        <div>
          <div className="w-full ps-2">
          <div className="flex items-center">
            <h1 className="w-full text-black text-xl font-semibold">Data Kelas</h1> 
            <div className="w-full flex items-center justify-end gap-2 lg:gap-5">
              <SmallButton
                onClick={() => setTambahOpen(true)}
                type="button"
                icon={ProfileAdd}
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Tambah Kelas"}
                hover={"hover:bg-blue-700"}
              />
            
            </div>
            </div>
            <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
                <div className={kelasData ? "max-w-screen-xl p-2 lg:p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                    {kelasData ? 
                      <TableComponent 
                          columns={columns} 
                          data={kelasData} 
                          onEdit={handleEdit}
                          onDelete ={handleDelete}
                          Aksi="EditDelete"
                          title="Tabel Data Kelas"
                          dataKey='id_kelas'
                          handleSearchChange={handleSearchChange}
                          selectedSearch={selectedSearch}
                          onSortChange={handleSortChange}
                          sortBy={sortBy}
                          sortOrder={sortOrder}
                      /> : <DataNotFound /> }
                </div>

                {meta && <PaginationComponent meta={meta} onPageChange={fetchDataKelas} onLimitChange={handleLimitChange}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}