"use client";

import { data_kelas, data_semester, data_siswa, detail_data_siswa, hapus_siswa } from "@/app/api/ApiKesiswaan";
import DataNotFound from "@/app/component/DataNotFound";
import DeletePopUp from "@/app/component/DeletePopUp";
import MultiSelectDropdown from "@/app/component/MultiSelectDropdown";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import TableComponent from "@/app/component/Table";
import { useBreadcrumb } from "@/context/BreadCrumbContext";
import { useLoading } from "@/context/LoadingContext";
import { useSemester } from "@/provider/SemesterProvider";
import { DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export default function AdminDataSiswa() {

  const router = useRouter();
  const [siswaData, setSiswaData] = useState(null);
  const [meta, setMeta] = useState(null);
  const {setIsLoading} = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(null);
  const [selectedSearch, setSearch] = useState(' ');
  const [sortBy, setSortBy] = useState(" "); 
  const [sortOrder, setSortOrder] = useState(" "); 
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null)
  const [classFilter, setClassFilter] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [allSemesters, setAllSemesters] = useState([]); 
  const { setShowBreadcrumb } = useBreadcrumb();
  
  useEffect(() => {
    setShowBreadcrumb(true);
    return () => setShowBreadcrumb(false);
  }, [setShowBreadcrumb]);
  
  useEffect(() => {
    const succesSiswa = sessionStorage.getItem("succes_naik_kelas")
    if (succesSiswa) {
      toast.success(succesSiswa)
      sessionStorage.removeItem('succes_naik_kelas')
    }
  }, [])

  const convertToQuery = (obj) => {
    return Object.entries(obj)
      .flatMap(([key, values]) =>
        Array.isArray(values)
          ? values.map((value) => `&${key}=${encodeURIComponent(value)}`)
          : [`&${key}=${encodeURIComponent(values)}`]
      )
      .join('')
  };

  const fetchDataSiswa = async (page = 1,limitVal = limit, search=selectedSearch, sortField=sortBy, sortDir=sortOrder, kelas=classFilter) => {
    try {
          setIsLoading(true)
          const data = await data_siswa(page,limitVal, search, sortField, sortDir, kelas);
          const dataArray = data.students.data
          console.log("daribackend: ",dataArray)
          if (Array.isArray(dataArray)) {
              // Mapping agar sesuai dengan format tabel
              const formattedData = dataArray.map((item) => ({
                  id_siswa: item.studentDetail.studentId,
                  nis: item.studentDetail?.nis || "Tidak Ada",
                  nisn: item.studentDetail?.nisn || "Tidak Ada",
                  nama_lengkap: item.name || "Tidak Ada",
                  email: item.user?.email || "Tidak Ada",
                  kelas: item.classStudent[0]?.class?.name || "Tidak Ada",
                  tahun_ajar: (item.classStudent[0]?.academicYear?.name +" "+ item.classStudent[0]?.academicYear?.semester) || "Tidak Ada",
                  jenis_kelamin: item.studentDetail?.gender || "Tidak Ada",
                  status: item.isGraduate ? "Lulus" : "Aktif",
              }));

              setSiswaData(formattedData);
              setIsLoading(false)
          }

          setMeta(data.students.meta); // Simpan metadata untuk paginasi
          setCurrentPage(page);
      } catch (error) {
          toast.error("Gagal memuat data siswa.");
      } finally {
        setIsLoading(false)
      }
  };


  // // untuk mengambil data semester nanti 
  // useEffect(() => {
  //   const fetchAllSemesters = async (limitVal = 99, page=1, search='', sortField='', sortDir='') => {
  //     try {
  //       const data = await data_semester(limitVal,page,search,sortField,sortDir);
  //       console.log("Data mentah semester",data)
  //       const formattedSemesters = data.data?.map((semester) => ({
  //         label: semester.name,
  //         value: semester.name,
  //       }));
  //       setAllSemesters(formattedSemesters)
  //     } catch (error) {
  //       console.error("Gagal memuat data semester:", error);
  //     }
  //   };

  //   fetchAllSemesters();
  // }, []);

  const columns = [
    { label: "nis", sortKey: "nis" },
    { label: "nisn", sortKey: "nisn" },
    { label: "nama_lengkap", sortKey: "nama" },
    { label: "email", sortKey: "email" },
    { label: "kelas", sortKey: "kelas" },
    { label: "tahun_ajar", sortKey: "tahunAjar" },
    { label: "jenis_kelamin", sortKey: "jenisKelamin" },
    { label: "status", sortKey: "status" },

  ];

  // const handleOptionChange = (value) => {
  //   if(value){
  //     setSelectedSemester(value);
  //     console.log("sdasdasd", value)
  //   }
  // }; 

  const filters = [
    {
      key: "kelas",
      label: "Kelas",
      type: "multiselect",
      fetchOptions: () => data_kelas(1, 99, '', '', '').then(res =>
        res.theClass.theClass.map(kelas => ({
          label: kelas.name,
          value: kelas.name
        }))
      ),
    },
    {
      key: "tahunAjar",
      placeholder: "Tahun Ajar",
      type: "singleselect",
      options: allSemesters,
      selectedOptions:selectedSemester,
      //handleOptionChange:handleOptionChange,
    },
  ];

  const handleFilterDropdownChange = (value) => {
    const query = convertToQuery(value)
    setClassFilter(query)
  };
  console.log(classFilter)

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
  
  useEffect(() => {
      fetchDataSiswa();
  }, [limit,selectedSearch,sortBy,sortOrder,classFilter,selectedPeriod]);

  const handleDelete = (siswaId) => {
    setSelectedStudentId(siswaId);
    console.log(siswaId)
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedStudentId) return;

    setLoading(true)
    try {
      const response = await hapus_siswa(selectedStudentId);
      if (response) {
        setIsSuccess(true);
        setDeleteOpen(false);
        fetchDataSiswa(); // Reload data setelah sukses
        setTimeout(() => setIsSuccess(false), 2000); // Pop-up sukses hilang otomatis
      }
      
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {

    router.push(`/kesiswaan/data-siswa/${id}`);
  };

  
  
  return (
    <>
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
        <ToastContainer/>
        
        <div>
            <div className="w-full ps-2 flex">
              <h1 className="w-full flex items-center text-black text-xl font-semibold">Data Siswa Admin</h1> 
              <div className="w-full flex items-center justify-end gap-2 lg:gap-5">
                <SmallButton
                  type="button"
                  icon={Notepad2}
                  bgColor="bg-[#ffcf43]"
                  colorIcon="black"
                  title={"Kenaikan Kelas"}
                  hover={"hover:bg-yellow-600"}
                  onClick={() => router.push('/kesiswaan/data-siswa/kenaikan-kelas')}
                  textColor="black"
                />
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
                  icon={ProfileAdd}
                  bgColor="bg-pri-main"
                  colorIcon="white"
                  title={"Tambah Siswa"}
                  hover={"hover:bg-pri-hover"}
                  onClick={() => router.push('/kesiswaan/data-siswa/tambah')}
                />
              </div>
            </div>
            
            <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
              <div className={siswaData ? "max-w-full p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                  {siswaData ? 
                    <TableComponent 
                        dataKey='id_siswa'
                        columns={columns} 
                        data={siswaData}
                        onEdit={handleEdit}
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

              {meta && <PaginationComponent meta={meta} onPageChange={fetchDataSiswa} onLimitChange={handleLimitChange}/>}
            </div>
        </div>
      </div>  
    </>
  );
}