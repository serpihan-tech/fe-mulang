"use client";

import { data_guru, excel_data_guru, hapus_guru } from "@/app/api/ApiKepegawaian";
import DataNotFound from "@/app/component/DataNotFound";
import DeletePopUp from "@/app/component/DeletePopUp";
import PaginationComponent from "@/app/component/Pagination";
import SmallButton from "@/app/component/SmallButton";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import TableComponent from "@/app/component/Table";
import { useBreadcrumb } from "@/context/BreadCrumbContext";
import { useLoading } from "@/context/LoadingContext";
import { set } from "date-fns";
import { DocumentDownload, ProfileAdd } from "iconsax-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function DataPegawai() {
  const router = useRouter();
  const { setIsLoading } = useLoading();
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(null);
  const [selectedSearch, setSearch] = useState(" ");
  const [sortBy, setSortBy] = useState(" ");
  const [sortOrder, setSortOrder] = useState(" ");
  const [guruData, setGuruData] = useState([]);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setShowBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setShowBreadcrumb(true);
    return () => setShowBreadcrumb(false);
  }, [setShowBreadcrumb]);

  useEffect(() => {
    const succesPegawai = sessionStorage.getItem("create_pegawai");
    if (succesPegawai) {
      toast.success(succesPegawai);
      sessionStorage.removeItem("create_pegawai");
    }
  }, []);

  const fetchDataGuru = async (
    page = 1,
    limitVal = limit,
    search = selectedSearch,
    sortField = sortBy,
    sortDir = sortOrder
  ) => {
    try {
      setIsLoading(true);
      const data = await data_guru(page, limitVal, search, sortField, sortDir);
      const dataArray = data.teachers.data;
      console.log("daribackend: ", data);
      if (Array.isArray(dataArray)) {
        // Mapping agar sesuai dengan format tabel
        const formattedData = dataArray.map((item) => ({
          id_guru: item.id || "",
          nip: item.nip || "",
          nama_pegawai: item.name || "",
          jabatan: "Guru",
          email: item.user.email || "",
          no_hp: item.phone || "",
        }));

        setGuruData(formattedData);
        setIsLoading(false);
      }

      setMeta(data.teachers.meta); // Simpan metadata untuk paginasi
      setCurrentPage(page);
    } catch (error) {
      toast.error("Gagal memuat data guru.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataGuru();
  }, [limit, selectedSearch, sortBy, sortOrder]);

  const columns = [
    { label: "nip", sortKey: "nip" },
    { label: "nama_pegawai", sortKey: "nama" },
    { label: "jabatan", sortKey: "nama" },
    { label: "email", sortKey: "email" },
    { label: "no_hp", sortKey: "noTelp" },
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

  const handleDelete = (guruId) => {
    setSelectedTeacherId(guruId);
    console.log(guruId);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTeacherId) return;

    setLoading(true);
    try {
      const response = await hapus_guru(selectedTeacherId);
      if (response) {
        setIsSuccess(true);
        setDeleteOpen(false);
        fetchDataGuru();
        setTimeout(() => setIsSuccess(false), 1000);
      }
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setIsLoading(true);
    router.push(`/kepegawaian/data-pegawai/${id}`);
  };

  const handleDownloadExcel = async () => {
    setIsLoading(true);
    try {
      const response = await excel_data_guru(currentPage, limit, selectedSearch, sortBy, sortOrder);

      if (response) {
        console.log("Response Excel:", response);
        //Cek jika responsenya blob atau arraybuffer
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Buat URL untuk blob-nya
        const url = window.URL.createObjectURL(blob);

        // Buat elemen <a> dan trigger klik untuk download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data-guru.xlsx'; // Nama file yang akan diunduh
        document.body.appendChild(a);
        a.click();

        // Bersihkan elemen dan URL
        a.remove();
        window.URL.revokeObjectURL(url);

        setIsSuccess(true);
        setTimeout(() => { setIsSuccess(false); }, 1000);
      }
    } catch (err) {
      toast.error("Gagal mengunduh data guru.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
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
        <div className="w-full ps-2 mt-4 md:mt-6 lg:mt-12 flex">
          <h1 className="w-full flex items-center text-black dark:text-slate-100 text-xl font-semibold">
            Data Pegawai
          </h1>
          <div className="w-full flex items-center justify-end gap-2 lg:gap-5">
            <SmallButton
              type="button"
              icon={DocumentDownload}
              bgColor="bg-green-600"
              colorIcon="white"
              title={"Download Excel"}
              hover={"hover:bg-green-400"}
              onClick={handleDownloadExcel}
            />
            <SmallButton
              type="button"
              icon={ProfileAdd}
              bgColor="bg-blue-600"
              colorIcon="white"
              title={"Tambah Data"}
              hover={"hover:bg-blue-700"}
              onClick={() => {
                setIsLoading(true);
                router.push("/kepegawaian/data-pegawai/tambah");
              }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
          <div
            className={
              guruData
                ? "max-w-full p-2 dark:bg-dark_net-ter lg:p-5 overflow-x-auto"
                : "flex items-center justify-center text-black dark:text-white p-8 md:p-16 lg:p-28 "
            }
          >
            {guruData ? (
              <TableComponent
                dataKey="id_guru"
                columns={columns}
                data={guruData}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title="Tabel Data Pegawai"
                Aksi="EditDelete"
                handleSearchChange={handleSearchChange}
                selectedSearch={selectedSearch}
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
                meta={meta}
              />
            ) : (
              <DataNotFound />
            )}
          </div>

          {meta && (
            <PaginationComponent
              meta={meta}
              onPageChange={fetchDataGuru}
              onLimitChange={handleLimitChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
