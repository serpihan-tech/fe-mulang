"use client";

import { TeacherDataPengumuman } from "@/app/api/guru/ApiPengumuman";
import DataNotFound from "@/app/component/DataNotFound";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function TeacherPengumuman() {
  const [data, setData] = useState(null)
  const {setIsLoading} = useLoading()
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedSearch, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(""); 
  const [sortOrder, setSortOrder] = useState("");
  const [classfilter, setClassfilter] = useState("")
  const router = useRouter();
  const profile_data = typeof window !== "undefined" ?  JSON.parse(sessionStorage.getItem("profile_data")) : null;
  const  teacherName = profile_data.data?.profile?.name || null; 

  const fetchDataPengumuman = async (page = 1, limitVal = limit, search = selectedSearch, sortField = sortBy, sortDir = sortOrder, dataFilter = classfilter) => {
    try {
      setIsLoading(true);
      const response = await TeacherDataPengumuman(page, limitVal, search, sortField, sortDir, dataFilter);
      
      if (response && response.announcements) {
        const dataArray = response.announcements.data;
        
        if (Array.isArray(dataArray)) {
          const filteredData = dataArray.filter(item => item.teacher?.name === teacherName);
          const formattedData = filteredData.map((item) => ({
            id_pengumuman: item.id || "Tidak ada",
            judul: item.title || "Tidak ada",
            deskripsi: item.content || "Tidak ada",
            kategori: item.category || "Tidak ada",
            tanggal: item.date ? format(new Date(item.date), "dd-MM-yyyy") : "Tidak ada",
            plain_date: item.date || null,
            dibuat_oleh: item.teacher?.name || "Tidak ada",
            target_roles: item.target_roles || null,
            files: item.files || null,
            module_id: item.module_id || null,
            class_id: item.class_id || null,
          }));

          setData(formattedData);
          setMeta(response.announcements.meta);
          setCurrentPage(page);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Gagal memuat data pengumuman.");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { label: "judul", sortKey: "judul" },
    { label: "deskripsi", sortKey: "deskripsi" },
    { label: "kategori", sortKey: "kategori" },
    { label: "tanggal", sortKey: "tanggal" },
    { label: "dibuat_oleh", sortKey: "tanggal" },
  ];

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    fetchDataPengumuman(currentPage, newLimit);
  };

  const handleSortChange = (key, direction) => {
    setSortBy(key);
    setSortOrder(direction);
    fetchDataPengumuman(currentPage, limit, selectedSearch, key, direction);
  };

  const handleSearchChange = (search) => {
    setSearch(search);
    fetchDataPengumuman(1, limit, search);
  };

  const handleEdit = (item) => {
    sessionStorage.setItem("detail_pengumuman", JSON.stringify(item))
    router.push(`/pengumuman/tambah?id=${item.id_pengumuman}`);
  };

  useEffect(() => {
    fetchDataPengumuman();
  }, []);

  console.log("teacherName", teacherName) 

  return (
    <>
      <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
        <div className={data ? "max-w-full p-5 dark:bg-dark_net-ter" : "flex items-center justify-center text-black dark:text-white p-28"}>
          {data ? 
            <TableComponent 
              dataKey='id_pengumuman'
              columns={columns} 
              data={data}
              onEdit={handleEdit}
              //onDelete ={handleDelete}
              onDetailEdit={true}
              enableSort={false}
              title="Data Pengumuman"
              Aksi="EditDelete"
              handleSearchChange={handleSearchChange}
              selectedSearch={selectedSearch}
              onSortChange={handleSortChange}
              sortBy={sortBy}
              sortOrder={sortOrder}
            /> : <DataNotFound /> 
          }
        </div>

        {meta && <PaginationComponent meta={meta} onPageChange={fetchDataPengumuman} onLimitChange={handleLimitChange}/>}
      </div>
    </>
  );
}