"use client";

import { data_absen_guru, edit_absen_guru, hapus_absen_guru, tambah_absen_guru } from "@/app/api/ApiKepegawaian";
import DataNotFound from "@/app/component/DataNotFound";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import StatusIcon from "@/app/component/StatusIcon";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
import { DocumentDownload, Printer } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import PresensiPegawaiModal from "../_component/PresensiPegawaiModal";
import DeletePopUp from "@/app/component/DeletePopUp";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import TambahSemesterModal from "../../kesiswaan/_component/TambahSemester";
import { format } from "date-fns";
import { hapus_absen_siswa } from "@/app/api/ApiKesiswaan";
import { useBreadcrumb } from "@/context/BreadCrumbContext";

export default function PresensiPegawai() {
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedSearch, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(""); 
  const [sortOrder, setSortOrder] = useState("");
  const [absenData, setAbsenData] = useState([]);
  const {setIsLoading} = useLoading() 
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedAbsenId, setSelectedAbsenId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isTambahOpen, setTambahOpen] = useState(false);
  const [detailAbsenData, setDetailAbsenData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setShowBreadcrumb } = useBreadcrumb();
  
  useEffect(() => {
    setShowBreadcrumb(true);
    return () => setShowBreadcrumb(false);
  }, [setShowBreadcrumb]);

  const fetchDataAbsen = async (page = 1,limitVal = limit, search=selectedSearch, sortField=sortBy, sortDir=sortOrder, date=selectedDate) => {
    try {
      setIsLoading(true)
      let formattedDate = "";
      if (date) {
        const d = new Date(date);
        if (!isNaN(d)) {
          formattedDate = format(d, "yyyy-MM-dd");
        }} 
      const data = await data_absen_guru(page,limitVal, search, sortField, sortDir, formattedDate);
      console.log("daribackend: ",data)
      const dataArray = data.teachers.data
      if (Array.isArray(dataArray)) {
          // Mapping agar sesuai dengan format tabel
          const formattedData = dataArray.map((item) => ({
              id_guru: item.id || "",
              nip: item.nip || "",
              nama_pegawai: item.name || "",
              jabatan: "Guru",
              status:  <StatusIcon status={item.latestAbsence?.status || "Belum Absen"}/> || "Belum Absen",
              jam_masuk: item.latestAbsence?.checkInTime || "-",
              jam_pulang: item.latestAbsence?.checkOutTime || "-",
              id_absen: item.latestAbsence?.id || "-",
              email: item.user?.email || "-",
              date: item.latestAbsence?.date || null,
          }));

          setAbsenData(formattedData);
          setIsLoading(false)
      }

      setMeta(data.teachers.meta); 
      setCurrentPage(page);
    } catch (error) {
        toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  };
  
  useEffect(() => {
    fetchDataAbsen()
  }, [limit,selectedSearch,sortBy,sortOrder,selectedDate]);

  const columns = [
    { label: "nama_pegawai", sortKey: "nama" },
    { label: "nip", sortKey: "nip" },
    { label: "status", sortKey: "status" },
    { label: "jam_masuk", sortKey: "jamMasuk" },
    { label: "jam_pulang", sortKey: "jamPulang" }
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
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDelete = (absenId) => {
    //console.log("absenId", absenId)
    if (absenId== "-") {
      toast.error("Pegawai belum melakukan absensi"); 
      return;
    }
    setSelectedAbsenId(absenId);
    setDeleteOpen(true);
      
  };
  
  const confirmDelete = async () => {
    if (!selectedAbsenId) return;
    setIsLoading(true);

    try {
      const response = await hapus_absen_guru(selectedAbsenId);
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

  const handleEdit = (absen) => {
    setDetailAbsenData(absen);
    if (absen.id_absen == "-") {
      setTambahOpen(true);
    
    } else {
      setEditOpen(true);
    }
    console.log(absen)
  };

  const confirmTambah = async (createdData) => {
    if (!createdData) {
      toast.error("Data kosong!");
      return;
    }

    const payload = {
      teacher_id: createdData.teacher_id,
      date: createdData.date,
      status: createdData.status,
      check_in_time: createdData.check_in_time,
      check_out_time: createdData.check_out_time,
    };

    try {
      setIsLoading(true);
      setLoading(true);
      await tambah_absen_guru(payload);
      setTambahOpen(false); 
      setIsSuccess(true)
      fetchDataAbsen();
      setTimeout(() => setIsSuccess(false), 1200);
      // Tambahkan fungsi untuk refresh data kelas jika perlu
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  }  

  const confirmEdit = async (createdData) => {
    if (!createdData) {
      toast.error("Data kosong!");
      return;
    }
    const absenId = createdData.id_absen;

    const payload = {
      date: createdData.date,
      status: createdData.status,
      check_in_time: createdData.check_in_time,
      check_out_time: createdData.check_out_time,
    };

    try {
      setIsLoading(true);
      setLoading(true);
      await edit_absen_guru(absenId,payload);
      setEditOpen(false); 
      setIsSuccess(true)
      fetchDataAbsen();
      setTimeout(() => setIsSuccess(false), 1200);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  } 
  const checkInTime = "12:55:46";
  const [hour, minute] = checkInTime.split(":");
  const formattedTime = `${hour}:${minute}`;
  console.log(formattedTime); // "12:55"

  return (
    <>
      <ToastContainer/>
      {/* Modal Edit */}
      {isTambahOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <PresensiPegawaiModal
            onCancel={() => setTambahOpen(false)}
            onEdit={"create"}
            onConfirm={confirmTambah}
            selectedDate={selectedDate}
            isLoading={isLoading}
            AbsenData={detailAbsenData}
          />
        </div>
      )}

      {editOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <PresensiPegawaiModal
            onCancel={() => setEditOpen(false)}
            onEdit={"create"}
            onConfirm={confirmEdit}
            selectedDate={selectedDate}
            isLoading={isLoading}
            AbsenData={detailAbsenData}
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
        <div className="w-full ps-2 mt-4 md:mt-6 lg:mt-12 flex">
          <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold">Data Presensi Pegawai</h1> 
          <div className="flex items-center justify-end gap-2 lg:gap-5">
            <SmallButton
              type="button"
              icon={DocumentDownload}
              bgColor="bg-green-600"
              colorIcon="white"
              title={"Download Excel"}
              hover={"hover:bg-green-400"}
            />
            <SmallButton
              type="button"
              icon={Printer}
              bgColor="bg-[#ffcf43]"
              colorIcon="black"
              title={"Print"}
              hover={"hover:bg-yellow-400"}
              textColor="black"
            />
          </div>
        </div>
        <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
            <div className={absenData ? "max-w-full p-2 dark:bg-dark_net-ter lg:p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                {absenData ? 
                  <TableComponent 
                      dataKey='id_absen'
                      columns={columns} 
                      data={absenData}
                      onEdit={handleEdit}
                      onDetailEdit={true}
                      onDelete ={handleDelete}
                      title="Tabel Presensi Pegawai"
                      Aksi="EditDelete"
                      //filters={filters}
                      filterDate={true}
                      dFPlaceholder="Hari ini"
                      handleDateChange={handleDateChange}
                      selectedDate={selectedDate}
                      handleSearchChange={handleSearchChange}
                      selectedSearch={selectedSearch}
                      onSortChange={handleSortChange}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      //onFilterChange={handleFilterDropdownChange}
                  /> : <DataNotFound /> }
            </div>

            {meta && <PaginationComponent meta={meta} onPageChange={fetchDataAbsen} onLimitChange={handleLimitChange}/>}
          </div>
      </div>  
    </>
  );
}