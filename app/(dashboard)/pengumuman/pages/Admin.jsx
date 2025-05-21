"use client";

import { admin_hapus_pengumuman, data_pengumuman } from "@/app/api/admin/ApiPengumuman";
import { TeacherHapusPengumuman } from "@/app/api/guru/ApiPengumuman";
import DataNotFound from "@/app/component/DataNotFound";
import DeletePopUp from "@/app/component/DeletePopUp";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
import { format, set } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import convertToQuery from "../../kbm/jadwal-pelajaran/_component/convertToUrl";

export default function AdminPengumuman() {
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
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedItem,setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    sessionStorage.setItem("detail_pengumuman", JSON.stringify(item))
    router.push(`/pengumuman/tambah?id=${item.id_pengumuman}`);
  };

  const handleDelete = (item) => {
    if (item.dibuat_oleh === "Teacher") {
      toast.error ("Pengumuman ini hanya dapat dihapus oleh guru yang membuatnya.");
      return
    }
    setDeleteOpen(true);
    setSelectedItem(item);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      if(selectedItem.dibuat_oleh === "Admin"){
        const response = await admin_hapus_pengumuman(selectedItem.id_pengumuman);
        if (response) {
          toast.success("Berhasil menghapus pengumuman");
          fetchDataPengumuman()
        }
      } else {
        const response  = await TeacherHapusPengumuman(selectedItem.id_pengumuman);
        if (response) {
          toast.success("Berhasil menghapus pengumuman");
          fetchDataPengumuman()
        }
      }
    } catch(error){
      toast.error(error.message);
    } finally {
      setDeleteOpen(false);
      setLoading(false);
    }
  }

  const handleSortChange = (key, direction) => {
    setSortBy(key);
    setSortOrder(direction);
  };

  const handleSearchChange = (search) => {
    setSearch(search);
  };

  const handleFilterDropdownChange = (filterValue) => {
    const query = convertToQuery(filterValue);
    setClassfilter(query)
    // Jika ingin langsung fetch data, bisa panggil fetchDataPengumuman dengan filter baru di sini
    // fetchDataPengumuman(1, limit, selectedSearch, sortBy, sortOrder, filterValue);
  };

  const fetchDataPengumuman = async (page = 1,limitVal = limit, search=selectedSearch, sortField=sortBy, sortDir=sortOrder, dataFilter=classfilter) => {
    try {
        const data = await data_pengumuman(page, limitVal, search, sortField, sortDir, dataFilter);
        console.log("data",data)
        const dataArray = data.announcements?.data
        if (Array.isArray(dataArray)) {
            // Mapping agar sesuai dengan format tabel
            const formattedData = dataArray.map((item) => ({
                id_pengumuman: item.id || "Tidak ada",
                judul: item.title || "Tidak ada",
                deskripsi: item.content || "Tidak ada",
                kategori: item.category || "Tidak ada",
                tanggal: format(new Date(item.date),"dd-MM-yyyy") || "Tidak ada",
                plain_date: item.date || null,
                dibuat_oleh: item.madeBy || "Tidak ada",
                target_roles: item.target_roles || null,
                files: item.files || null,
                module_id: item.module_id || null,
                class_id: item.class_id || null,

            }));

            setData(formattedData);
        }

        setMeta(data.announcements.meta); // Simpan metadata untuk paginasi
        setCurrentPage(page);
    } catch (error) {
        toast.error("Gagal memuat data kelas.");
    } finally {
        //setLoading(false);
    }
  };

  const columns = [
    { label: "judul", sortKey: "judul" },
    { label: "deskripsi", sortKey: "deskripsi" },
    { label: "kategori", sortKey: "kategori" },
    { label: "tanggal", sortKey: "tanggal" },
    { label: "dibuat_oleh", sortKey: "dibuatOleh" },

  ];
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };
  

  useEffect(() => {
    fetchDataPengumuman()
  }, [limit,sortBy,sortOrder,selectedSearch,classfilter])
  console.log("filter", classfilter)
  return (
    <>
      {isDeleteOpen && (
          <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
            <DeletePopUp
              onCancel={() => setDeleteOpen(false)}
              onConfirm={confirmDelete}
              isLoading={isLoading}
            />
          </div>
        )}

      <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
        <div className={data ? "max-w-full p-5 dark:bg-dark_net-ter" : "flex items-center justify-center text-black dark:text-white p-28 "}>
            {data ? 
              <TableComponent 
                  dataKey='id_pengumuman'
                  columns={columns} 
                  data={data}
                  onEdit={handleEdit}
                  onDetailEdit={true}
                  onDelete ={handleDelete}
                  onDetailDelete={true}
                  title="Data Pengumuman"
                  Aksi="EditDelete"
                  //filters={filters}
                  handleSearchChange={handleSearchChange}
                  selectedSearch={selectedSearch}
                  onSortChange={handleSortChange}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  multiFilter={true}
                  onFilterChange={handleFilterDropdownChange}
              /> : <DataNotFound /> }
        </div>

        {meta && <PaginationComponent meta={meta} onPageChange={fetchDataPengumuman} onLimitChange={handleLimitChange}/>}
      </div>
    </>
  )}

