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
import { DocumentDownload, Document, DocumentText, DocumentUpload } from "iconsax-react";
import FilePreviewModal from "../_component/FilePreviewModal";

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
  const [filePreviewModal, setFilePreviewModal] = useState({
    isOpen: false,
    fileUrl: null,
    fileName: null
  });

  const handleFileClick = (file) => {
    if (!file) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fileUrl = `${baseUrl}/file/${file}`;
    const fileExtension = file.split('.').pop().toLowerCase();

    // Handle different file types
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      // Show image in modal
      setFilePreviewModal({
        isOpen: true,
        fileUrl: file,
        fileName: file
      });
    } else if (fileExtension === 'pdf') {
      // Open PDF in new tab
      window.open(fileUrl, '_blank');
    } else {
      // Download other file types
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const closeFilePreviewModal = () => {
    setFilePreviewModal({
      isOpen: false,
      fileUrl: null,
      fileName: null
    });
  };

  const getFileIcon = (file) => {
    if (!file) return null;
    const extension = file.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return DocumentText;
      case 'doc':
      case 'docx':
        return Document;
      case 'xls':
      case 'xlsx':
        return DocumentUpload;
      default:
        return DocumentDownload;
    }
  };

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
  };

  const fetchDataPengumuman = async (page = 1,limitVal = limit, search=selectedSearch, sortField=sortBy, sortDir=sortOrder, dataFilter=classfilter) => {
    try {
        const data = await data_pengumuman(page, limitVal, search, sortField, sortDir, dataFilter);
        const dataArray = data.announcements?.data
        console.log("daribackend: ",dataArray)
        if (Array.isArray(dataArray)) {
            const formattedData = dataArray.map((item) => ({
              
                id_pengumuman: item.id || "Tidak ada",
                judul: item.title || "Tidak ada",
                deskripsi: item.content || "Tidak ada",
                kategori: item.category || "Tidak ada",
                tanggal: format(new Date(item.date),"dd-MM-yyyy") || "Tidak ada",
                plain_date: item.date || null,
                dibuat_oleh: item.madeBy || "Tidak ada",
                target_roles: item.target_roles || null,
                file: item.files ? (
                  <SmallButton
                    type="button"
                    icon={getFileIcon(item.files)}
                    bgColor="bg-blue-600"
                    colorIcon="white"
                    hover="hover:bg-blue-400"
                    noTitle={true}
                    onClick={() => handleFileClick(item.files)}
                  />
                ) : "Tidak ada file",
                module_id: item.module_id || null,
                class_id: item.class_id || null,
            }));

            setData(formattedData);
        }

        setMeta(data.announcements.meta);
        setCurrentPage(page);
    } catch (error) {
        toast.error("Gagal memuat data kelas.");
    }
  };

  const columns = [
    { label: "judul", sortKey: "judul" },
    { label: "deskripsi", sortKey: "deskripsi" },
    { label: "kategori", sortKey: "kategori" },
    { label: "tanggal", sortKey: "tanggal" },
    { label: "dibuat_oleh", sortKey: "dibuatOleh" },
    { label: "file", sortKey: "file" },
  ];

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    fetchDataPengumuman()
  }, [limit,sortBy,sortOrder,selectedSearch,classfilter])

  return (
    <>
      {/* File Preview Modal */}
      <FilePreviewModal
        isOpen={filePreviewModal.isOpen}
        onClose={closeFilePreviewModal}
        fileUrl={filePreviewModal.fileUrl}
        fileName={filePreviewModal.fileName}
      />

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
                  handleSearchChange={handleSearchChange}
                  selectedSearch={selectedSearch}
                  onSortChange={handleSortChange}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  multiFilter={true}
                  onFilterChange={handleFilterDropdownChange}
                  currentPage={meta.currentPage}
                  perPage={meta.perPage}
              /> : <DataNotFound /> }
        </div>

        {meta && <PaginationComponent meta={meta} onPageChange={fetchDataPengumuman} onLimitChange={handleLimitChange}/>}
      </div>
    </>
  )
}

