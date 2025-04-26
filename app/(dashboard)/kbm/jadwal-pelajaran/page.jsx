"use client";
import { dropdown_data_ruangan, dropdown_nama_mapel, edit_jadwal_pelajaran, hapus_jadwal_pelajaran, jadwal_pelajaran, tambah_jadwal_pelajaran } from "@/app/api/admin/ApiKBM";
import DataNotFound from "@/app/component/DataNotFound";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import TableComponent from "@/app/component/Table";
import { useBreadcrumb } from "@/context/BreadCrumbContext";
import { useLoading } from "@/context/LoadingContext";
import { Book1 } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import DataJadwalModal from "./_component/DataJadwalModal";
import DeletePopUp from "@/app/component/DeletePopUp";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import { useSemester } from "@/provider/SemesterProvider";
import { data_kelas, dropdown_data_guru } from "@/app/api/ApiKesiswaan";
import { data_guru } from "@/app/api/ApiKepegawaian";

export default function JadwalPelajaran() {
  const {semesterId} = useSemester()
  const [jadwalData, setJadwalData] = useState(null);
  const [meta, setMeta] = useState(null);
  const {setIsLoading} = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedSearch, setSearch] = useState(' ');
  const [sortBy, setSortBy] = useState(" "); 
  const [sortOrder, setSortOrder] = useState(" "); 
  const [detailJadwalData, setDetailJadwalData] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [classFilter, setClassFilter] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [allSemesters, setAllSemesters] = useState([]); 
  const { setShowBreadcrumb } = useBreadcrumb();
  const [isTambahOpen, setTambahOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
 
  useEffect(() => {
    setShowBreadcrumb(true);
    return () => setShowBreadcrumb(false);
  }, [setShowBreadcrumb]);

  const convertToQuery = (obj) => {
    return Object.entries(obj)
      .flatMap(([key, values]) =>
        Array.isArray(values)
          ? values.map((value) => `&${key}=${encodeURIComponent(value)}`)
          : [`&${key}=${encodeURIComponent(values)}`]
      )
      .join('')
  };

  const fetchJadwalPelajaran = async (page = 1,limitVal = limit, search=selectedSearch, sortField=sortBy, sortDir=sortOrder, kelas=classFilter, semester=semesterId,) => {
    try {
      setIsLoading(true)
      const data = await jadwal_pelajaran(page,limitVal, search, sortField, sortDir, semester, kelas);
      const dataArray = data.schedules.data
      console.log("daribackend: ",data)
      if (Array.isArray(dataArray)) {
          // Mapping agar sesuai dengan format tabel
          const formattedData = dataArray.map((item) => ({
              id_jadwal: item.id,
              hari: item.days || "Tidak Ada",
              jam_mulai: item.startTime.slice(0, 5) || "Tidak Ada",
              jam_selesai: item.endTime.slice(0, 5) || "Tidak Ada",
              kelas: item.class?.name || "Tidak Ada",
              mata_pelajaran: item.module?.name || "Tidak Ada",
              guru_pengampu: item.module?.teacher?.name || "Tidak Ada",
              ruangan: item.room?.name || "Tidak Ada",
              id_kelas: item.class?.id || "Tidak Ada",
              id_mapel: item.module?.id || "Tidak Ada",
              id_ruangan: item.room?.id || "Tidak Ada",
          }));

          setJadwalData(formattedData);
          setIsLoading(false)
      }

      setMeta(data.schedules.meta);
      setCurrentPage(page);
    } catch (error) {
        toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  };

  const columns = [
    { label: "hari", sortKey: "hari" },
    { label: "jam_mulai", sortKey: "mulai" },
    { label: "jam_selesai", sortKey: "selesai" },
    { label: "kelas", sortKey: "kelas" },
    { label: "mata_pelajaran", sortKey: "mapel" },
    { label: "guru_pengampu", sortKey: "guru" },
    { label: "ruangan", sortKey: "ruang" },

  ];


  const handleFilterDropdownChange = (value) => {
    const query = convertToQuery(value)
    setClassFilter(query)
  };
  console.log("CLASSFILLTER",classFilter)

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

  const confirmTambah = async (createdData) => {
    try {
      setIsLoading(true);
      setLoading(true);
      const response = await tambah_jadwal_pelajaran(createdData);
      if (response) {
        toast.success("Data Jadwal berhasil dibuat!");
        setTambahOpen(false); // Tutup modal setelah sukses
        fetchJadwalPelajaran(); 
      }
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  } 

  const handleDelete = (jadwalId) => {
    setSelectedScheduleId(jadwalId);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedScheduleId) return;

    setIsLoading(true);
    setLoading(true);
    try {
      const response = await hapus_jadwal_pelajaran(selectedScheduleId);
      if(response) {
        setIsSuccess(true);
        setDeleteOpen(false);
        setLoading(false);
        fetchJadwalPelajaran(); // Reload data setelah sukses
        setTimeout(() => setIsSuccess(false), 1200); // Pop-up sukses hilang otomatis
      }
      
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (jadwal) => {
    console.log("jadwal yang diedit:", jadwal)
    setDetailJadwalData(jadwal);
    setSelectedScheduleId(jadwal.id_jadwal);
    setEditOpen(true);
  }

  const confirmEdit = async (createdData) => {
    if (!selectedScheduleId) return;

    try {
      setIsLoading(true);
      setLoading(true);
      const response = await edit_jadwal_pelajaran(selectedScheduleId,createdData);
      if (response) {
        toast.success("Data Jadwal berhasil diedit!");
        setEditOpen(false); // Tutup modal setelah sukses
        fetchJadwalPelajaran(); 
      }
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  } 

  const filters = [
    {
      key: "kelas",
      label: "Kelas",
      type: "multiselect",
      textSize: "text-sm",
      wideInput: "min-w-28",
      wideDropdown: "min-w-36",
      fetchOptions: () => data_kelas(1, 99, '', '', '').then(res =>
        res.theClass.theClass.map(kelas => ({
          label: kelas.name,
          value: kelas.name
        }))
      ),
    },
    {
      key: "hari",
      label: "Hari",
      type: "multiselect",
      wideInput: "min-w-28",
      options: [{ value: "Senin", label: "Senin" },
        { value: "Selasa", label: "Selasa" },
        { value: "Rabu", label: "Rabu" },
        { value: "Kamis", label: "Kamis" },
        { value: "Jumat", label: "Jumat" },
        { value: "Sabtu", label: "Sabtu" },
        { value: "Minggu", label: "Minggu" },],
    },
    {
      key: "mapel",
      label: "Mata Pelajaran",
      type: "multiselect",
      fetchOptions: () => dropdown_nama_mapel(semesterId).then(res =>
        res.modules.map(mapel => ({
          label: mapel.name,
          value: mapel.name
        }))
      ),
    },
    {
      key: "guru",
      label: "Guru",
      type: "multiselect",
      wideInput: "min-w-28",
      wideDropdown: "min-w-44",
      fetchOptions: () => dropdown_data_guru().then(res =>
        res.map(guru => ({
          label: guru.name,
          value: guru.name
        }))
      ),
    },
    {
      key: "ruang",
      label: "Ruangan",
      type: "multiselect",
      wideInput: "min-w-28",
      wideDropdown: "min-w-44",
      fetchOptions: () => dropdown_data_ruangan().then(res =>
        res.rooms.map(ruang => ({
          label: ruang.name,
          value: ruang.name
        }))
      ),
    },
    
  ];
  
  useEffect(() => {
      fetchJadwalPelajaran();
  }, [limit,selectedSearch,sortBy,sortOrder,classFilter,selectedPeriod,semesterId]);
  console.log("Data jadwal:", jadwalData);
  console.log("semeserId",semesterId)


  return (
    <>
      <ToastContainer />

      {/* Modal Tambah */}
      {isTambahOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center ">
          <DataJadwalModal
            onCancel={() => setTambahOpen(false)}
            onConfirm={confirmTambah}
            isLoading={loading}
          />
        </div>
      )}

      {/* Modal Edit */}
      {isEditOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <DataJadwalModal
            onCancel={() => setEditOpen(false)}
            jadwalData={detailJadwalData}
            onConfirm={confirmEdit}
            isLoading={loading}
          />
        </div>
      )}

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
        <div>
          <div className="w-full ps-2 flex">
            <h1 className="w-full text-black text-xl font-semibold">Jadwal Pelajaran</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon={Book1}
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Tambah Data"}
                hover={"hover:bg-blue-700"}
                onClick={() => setTambahOpen(true)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
                <div className={jadwalData ? "max-w-full p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                    {jadwalData ? 
                      <TableComponent 
                          dataKey='id_jadwal'
                          columns={columns} 
                          data={jadwalData}
                          onEdit={handleEdit}
                          onDetailEdit={true}
                          onDelete ={handleDelete}
                          title="Data Siswa"
                          Aksi="EditDelete"
                          filters={filters}
                          handleSearchChange={handleSearchChange}
                          selectedSearch={selectedSearch}
                          onSortChange={handleSortChange}
                          sortBy={sortBy}
                          sortOrder={sortOrder}
                          onFilterChange={handleFilterDropdownChange}
                      /> : <DataNotFound /> }
                </div>

                {meta && <PaginationComponent meta={meta} onPageChange={fetchJadwalPelajaran} onLimitChange={handleLimitChange}/>}
            </div>
        </div>
      </div>  
    </>
  );
}