"use client";

import { data_siswa } from "@/app/api/ApiKesiswaan";
import DataNotFound from "@/app/component/DataNotFound";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
import { Award } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function RekapNilai() {

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
                id: item.id,
                nis: item.studentDetail?.nis || "Tidak Ada",
                nama_siswa: item.name || "Tidak Ada",
                kelas: item.classStudent[0]?.class?.name || "Tidak Ada",
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
    "nis",
    "nama_siswa",
    "kelas",
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
                key: "tahun_ajar",
                label: "Tahun Ajar",
                options: getUniqueValues("tahun_ajar"),
            }
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
        <div>
          <div className="w-full ps-2 flex">
            <div className="w-full flex justify-between  mt-[46px]  ">
              <h1 className="w-full text-black text-xl font-semibold">Rekap Nilai</h1> 
              <SmallButton
                type="button"
                icon={Award}
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Input Nilai"}
                hover={"hover:bg-blue-700"}
              />
            </div>
          </div>
          <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
            <div className={siswaData ? "max-w-screen-xl p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                {siswaData ? 
                  <TableComponent
                      columns={columns} 
                      data={siswaData} 
                      title="Tabel Rekap Nilai"
                      Aksi="LihatNilai"
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