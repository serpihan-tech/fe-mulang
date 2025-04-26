"use client";

import { mata_pelajaran } from "@/app/api/admin/ApiKBM";
import DataNotFound from "@/app/component/DataNotFound";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
import { useSemester } from "@/provider/SemesterProvider";
import { Book1 } from "iconsax-react";
import { useEffect, useState } from "react";
import DataMapelModal from "../_component/DataMapelModal";
import { set } from "date-fns";

export default function MataPelajaranAdmin() {
  const {semesterId} = useSemester()
  const { setIsLoading } = useLoading()
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState(null);
  const [mapelData, setMapelData] = useState([]);
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const fetchDataMapel = async (page=1, limitVal=limit, tahunAjar=semesterId, kelas='') => {
    setIsLoading(true)
    setLoading(true)
    try{
      const data = await mata_pelajaran(page, limitVal, tahunAjar, kelas)
      if(data){
        console.log("Data Mata Pelajaran", data)
        const dataArray = data.modules.data
        console.log("daribackend: ",dataArray)
        if (Array.isArray(dataArray)) {
            // Mapping agar sesuai dengan format tabel
            const formattedData = dataArray.map((item) => ({
                id_mapel: item.id,
                mata_pelajaran: item.name || "Tidak Ada",
                guru_pengampu: item.teacher?.name || "Tidak Ada",
                id_guru: item.teacher?.id || "Tidak Ada",
                tahun_ajar: (item.academicYear?.name+" "+item.academicYear?.semester) || "Tidak Ada",
                id_tahun_ajar: item.academicYear?.id || "Tidak Ada",
            }));

            setMapelData(formattedData);
            setIsLoading(false)

        }

        setMeta(data.modules.meta); // Simpan metadata untuk paginasi
        setCurrentPage(page);

      }
    } finally {
      setIsLoading(false)
      setLoading(false)
    }

  }

  const columns = [
    { label: "mata_pelajaran", sortKey: "" },
    { label: "guru_pengampu", sortKey: "" },
    { label: "tahun_ajar", sortKey: "" },
  ];

  useEffect(() => {
    fetchDataMapel()
  }, [])

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  console.log("Data Mata Pelajaran", mapelData)
  return (
    <>
    {/* Modal Edit */}
    {isTambahOpen && (
      <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
        <DataMapelModal
          onCancel={() => setIsTambahOpen(false)}
          //onConfirm={confirmTambah}
          isLoading={isLoading}
        />
      </div>
    )}
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <h1 className="w-full text-black text-xl font-semibold">Mata Pelajaran</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon={Book1}
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Tambah Data"}
                hover={"hover:bg-blue-700"}
                onClick={() => setIsTambahOpen(true)}
              />
            </div>
          </div>

          <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
            <div className={mapelData ? "max-w-full p-5" : "flex items-center justify-center text-black dark:text-white p-28"}>
                {mapelData ? 
                  <TableComponent 
                      dataKey='id_mapel'
                      columns={columns} 
                      data={mapelData}
                      //onEdit={handleEdit}
                      //onDelete ={handleDelete}
                      title="Data Mata Pelajaran"
                      enableSort={false}
                      enableSearch={false}
                      Aksi="EditDelete"
                      // filters={filters}
                      // handleSearchChange={handleSearchChange}
                      // selectedSearch={selectedSearch}
                      // onSortChange={handleSortChange}
                      // sortBy={sortBy}
                      // sortOrder={sortOrder}
                      // onFilterChange={handleFilterDropdownChange}
                  /> : <DataNotFound /> }
            </div>

            {meta && <PaginationComponent meta={meta} onPageChange={fetchDataMapel} onLimitChange={handleLimitChange}/>}
          </div>
        </div>
      </div>  
    </>
  );
}