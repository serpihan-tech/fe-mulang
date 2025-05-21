"use client";

import { TeacherDataPengumuman, TeacherHapusPengumuman } from "@/app/api/guru/ApiPengumuman";
import DataNotFound from "@/app/component/DataNotFound";
import DeletePopUp from "@/app/component/DeletePopUp";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DocumentDownload, Document, DocumentText, DocumentUpload } from "iconsax-react";
import FilePreviewModal from "../_component/FilePreviewModal";

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
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading,setLoading] =useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [filePreviewModal, setFilePreviewModal] = useState({
    isOpen: false,
    fileUrl: null,
    fileName: null
  });
  
  const router = useRouter();
  const profile_data = typeof window !== "undefined" ?  JSON.parse(sessionStorage.getItem("profile_data")) : null;
  const  teacherName = profile_data.data?.profile?.name || null; 

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

  const fetchDataPengumuman = async (page = 1, limitVal = limit, search = selectedSearch, sortField = sortBy, sortDir = sortOrder, dataFilter = classfilter) => {
    try {
      setIsLoading(true);
      const response = await TeacherDataPengumuman(page, limitVal, search, sortField, sortDir, dataFilter);
      
      if (response && response.announcements) {
        const dataArray = response.announcements.data;
        console.log("dataArray", dataArray)
        
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
            module_id: item.moduleId || null,
            class_id: item.classId || null,
            mata_pelajaran: item.module?.name || "Tidak ada",
            kelas: item.class?.name || "Tidak ada"
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
    { label: "tanggal", sortKey: "tanggal" },
    { label: "mata_pelajaran", sortKey: "" },
    { label: "kelas", sortKey: "" },
    { label: "dibuat_oleh", sortKey: "tanggal" },
    { label: "file", sortKey: "file" },
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

  const handleDelete = (item) => {
    setDeleteOpen(true)
    setSelectedId(item)
  };

  useEffect(() => {
    fetchDataPengumuman();
  }, []);

  const confirmDelete = async () => {
      console.log("selectedId", selectedId)
      setIsLoading(true);
      setLoading(true)
      try {
        const response = await TeacherHapusPengumuman(selectedId);
        if (response) {
          setIsSuccess(true);
          setDeleteOpen(false);
          fetchDataPengumuman(); 
          setSelectedId(null)
          setTimeout(() => setIsSuccess(false), 1200); 
        }
        
      } catch (error) {
        toast.error("Gagal menghapus data");
      } finally {
        setIsLoading(false);
        setLoading(false)

      }
    };

  console.log("teacherName", teacherName) 

  return (
    <>
    {/* File Preview Modal */}
    <FilePreviewModal
      isOpen={filePreviewModal.isOpen}
      onClose={closeFilePreviewModal}
      fileUrl={filePreviewModal.fileUrl}
      fileName={filePreviewModal.fileName}
    />

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
      <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
        <div className={data ? "max-w-full p-5 dark:bg-dark_net-ter" : "flex items-center justify-center text-black dark:text-white p-28"}>
          {data ? 
            <TableComponent 
              dataKey='id_pengumuman'
              columns={columns} 
              data={data}
              onEdit={handleEdit}
              onDelete ={handleDelete}
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