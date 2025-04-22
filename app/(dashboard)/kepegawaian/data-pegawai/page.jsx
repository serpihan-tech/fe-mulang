"use client";

import { data_guru, hapus_guru } from "@/app/api/ApiKepegawaian";
import DataNotFound from "@/app/component/DataNotFound";
import DeletePopUp from "@/app/component/DeletePopUp";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
import { DocumentDownload, ProfileAdd } from "iconsax-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function DataPegawai() {
  const router = useRouter()
  const {setIsLoading} = useLoading()
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(null);
  const [selectedSearch, setSearch] = useState(' ');
  const [sortBy, setSortBy] = useState(" "); 
  const [sortOrder, setSortOrder] = useState(" ");
  const [guruData, setGuruData] = useState([]);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const succesPegawai = sessionStorage.getItem("create_pegawai")
    if (succesPegawai) {
      toast.success(succesPegawai)
      sessionStorage.removeItem('create_pegawai')
    }
  }, [])

  const fetchDataGuru = async (page = 1,limitVal = limit, search=selectedSearch, sortField=sortBy, sortDir=sortOrder) => {
    try {
          setIsLoading(true)
          const data = await data_guru(page,limitVal, search, sortField, sortDir);
          const dataArray = data.teachers.data
          console.log("daribackend: ",data)
          if (Array.isArray(dataArray)) {
              // Mapping agar sesuai dengan format tabel
              const formattedData = dataArray.map((item) => ({
                  id_guru: item.id || "",
                  nip: item.nip || "",
                  nama_pegawai: item.name || "",
                  jabatan: "Guru",
                  email: item.user.email || "",
                  no_hp: item.phone || "",
                  
              }));

              setGuruData(formattedData);
              setIsLoading(false)
          }

          setMeta(data.teachers.meta); // Simpan metadata untuk paginasi
          setCurrentPage(page);
      } catch (error) {
          toast.error("Gagal memuat data guru.");
      } finally {
        setIsLoading(false)
      }
  };

  useEffect(() => {
    fetchDataGuru()
  }, [limit,selectedSearch,sortBy,sortOrder]);

  const columns = [
    { label: "nip", sortKey: "nip" },
    { label: "nama_pegawai", sortKey: "nama" },
    { label: "jabatan", sortKey: "nama" },
    { label: "email", sortKey: "email" },
    { label: "no_hp", sortKey: "noTelp" }
  ];

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const handleSortChange = (key, direction) => {
    setSortBy(key);
    setSortOrder(direction);
  };

  const handleDelete = (guruId) => {
    setSelectedTeacherId(guruId);
    console.log(guruId)
    setDeleteOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedTeacherId) return;

    setLoading(true)
    try {
      const response = await hapus_guru(selectedTeacherId);
      if (response) {
        setIsSuccess(true);
        setDeleteOpen(false);
        fetchDataGuru();
        setTimeout(() => setIsSuccess(false), 1000); 
      }
      
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = (id) => {
    setIsLoading(true)
    router.push(`/kepegawaian/data-pegawai/${id}`);
  };
  return (
    <>
      <ToastContainer />
      {/* Pop-up Konfirmasi Delete */}
      {isDeleteOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <DeletePopUp
            onCancel={() => setDeleteOpen(false)}
            onConfirm={confirmDelete}
            isLoading={loading}
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
          <div className="w-full ps-2 mt-12 flex">
            <h1 className="w-full text-black text-xl font-semibold">Data Pegawai</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon={DocumentDownload}
                bgColor="bg-[#ffcf43]"
                colorIcon="black"
                title={"Download Excel"}
                hover={"hover:bg-yellow-400"}
                textColor="black"
              />
              <SmallButton
                type="button"
                icon={ProfileAdd}
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Tambah Data"}
                hover={"hover:bg-blue-700"}
                onClick={() => {
                  setIsLoading(true);
                  router.push('/kepegawaian/data-pegawai/tambah');
                }}
              />
            </div>
          </div>
          <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
            <div className={guruData ? "max-w-full p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                {guruData ? 
                  <TableComponent 
                      dataKey='id_guru'
                      columns={columns} 
                      data={guruData}
                      onEdit={handleEdit}
                      onDelete ={handleDelete}
                      title="Data Pegawai"
                      Aksi="EditDelete"
                      //filters={filters}
                      handleSearchChange={handleSearchChange}
                      selectedSearch={selectedSearch}
                      onSortChange={handleSortChange}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      //onFilterChange={handleFilterDropdownChange}
                  /> : <DataNotFound /> }
            </div>

            {meta && <PaginationComponent meta={meta} onPageChange={fetchDataGuru} onLimitChange={handleLimitChange}/>}
          </div>
      </div>  
    </>
  );
}