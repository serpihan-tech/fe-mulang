"use client";

import { data_siswa } from "@/app/api/ApiKesiswaan";
import DataNotFound from "@/app/component/DataNotFound";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
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

  const fetchDataSiswa = async (page = 1,limitVal = limit) => {
    setIsLoading(true);  
    try {
          const data = await data_siswa(page,limitVal);
          const dataArray = data.students.data
          console.log(dataArray)
          if (Array.isArray(dataArray)) {
              // Mapping agar sesuai dengan format tabel
              const formattedData = dataArray.map((item) => ({
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
          }

          setMeta(data.students.meta); // Simpan metadata untuk paginasi
          setCurrentPage(page);
      } catch (error) {
          toast.error("Gagal memuat data siswa.");
      } finally {
          setIsLoading(false);
      }
  };

  const columns = [
    { label: "nis", sortKey: "tanggal" },
    { label: "nisn", sortKey: "nis" },
    { label: "nama_lengkap", sortKey: "namaSiswa" },
    { label: "email", sortKey: "namaSiswa" },
    { label: "kelas", sortKey: "namaSiswa" },
    { label: "tahun_ajar", sortKey: "namaSiswa" },
    { label: "jenis_kelamin", sortKey: "namaSiswa" },
    { label: "status", sortKey: "namaSiswa" },

  ];

  
  useEffect(() => {
      fetchDataSiswa();
  }, []);

  const getUniqueValues = (key) => {
    return [...new Set(siswaData.map((item) => item[key]))].filter(Boolean);
  };
  
  // State untuk menyimpan filter yang tersedia
  const [filters, setFilters] = useState([]);
  
  useEffect(() => {
    if (siswaData && siswaData.length > 0) {
        setFilters([
            {
                key: "kelas",
                label: "Kelas",
                options: getUniqueValues("kelas"),
            },
            {
                key: "tahun_ajar",
                label: "Tahun Ajar",
                options: getUniqueValues("tahun_ajar"),
            },
            {
                key: "jenis_kelamin",
                label: "Jenis Kelamin",
                options: getUniqueValues("jenis_kelamin"),
            },
            
        ]);
    }
  }, [siswaData]);

  console.log("datasiswa: ")
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    fetchDataSiswa(currentPage, newLimit); // Refresh data dengan limit baru
  };

    return (
    <>
      <div className="z-0 transition">
        <ToastContainer/>
        <div>
            <div className="w-full ps-2 flex">
            <h1 className="w-full text-black text-xl font-semibold">Data Siswa Admin</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon={Notepad2}
                bgColor="bg-[#0e9035]"
                colorIcon="white"
                title={"Kenaikan Kelas"}
                hover={"hover:bg-green-700"}
              />
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
                title={"Tambah Siswa"}
                hover={"hover:bg-blue-700"}
                onClick={() => router.push('/kesiswaan/data-siswa/tambah')}
              />
            </div>
            </div>
            
            <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
                <div className={siswaData ? "max-w-screen-xl p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                    {siswaData ? 
                      <TableComponent 
                          columns={columns} 
                          data={siswaData} 
                          title="Data Siswa"
                          Aksi="EditDelete"
                          filters={filters} 
                      /> : <DataNotFound /> }
                </div>

                {meta && <PaginationComponent meta={meta} onPageChange={fetchDataSiswa} onLimitChange={handleLimitChange}/>}
            </div>
        </div>
      </div>  
    </>
  );
}