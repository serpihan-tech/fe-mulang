"use client";
import { data_kegiatan_tahunan } from "@/app/api/admin/ApiPengumuman";
import { ProfileAdd } from "iconsax-react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function KegiatanTahunan() {
  const [ruanganData, setRuanganData] = useState(null);
  const [meta, setMeta] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedSearch, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isTambahOpen, setTambahOpen] = useState(false);
  const { setIsLoading } = useLoading();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchDataKegiatan = async (
    page = 1,
    limitVal = limit,
    search = selectedSearch,
    sortField = sortBy,
    sortDir = sortOrder
  ) => {
    setIsLoading(true);
    try {
      const response = await data_kegiatan_tahunan(
        page,
        limitVal,
        search,
        sortField,
        sortDir
      );
      if (response) {
        console.log("response", response);
        // const dataArray = response?.rooms?.data;
        // if (Array.isArray(dataArray)) {
        //   // Mapping agar sesuai dengan format tabel
        //   const formattedData = dataArray.map((item) => ({
        //     id_ruangan: item.id || "Tidak ada",
        //     nama_ruangan: item.name || "Tidak ada",
        //   }));

        //   setRuanganData(formattedData);
        // }

        // setMeta(response.rooms.meta);
        // setCurrentPage(page);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [{ label: "nama_ruangan", sortKey: "nama" }];

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
    fetchDataKegiatan();
  }, [limit, selectedSearch, sortBy, sortOrder]);

  const handleEdit = (data) => {
    setSelectedData(data);
    setSelectedId(data.id_ruangan);
    setEditOpen(true);
  };

  const confirmEdit = async (data) => {
    if (!data) {
      return;
    }
    setLoading(true);
    setIsLoading(true);
    try {
      const response = await edit_ruangan(data, selectedId);
      if (response) {
        setIsSuccess(true);
        setEditOpen(false);
        fetchDataRuangan();
        setTimeout(() => setIsSuccess(false), 1200); // Pop-up sukses hilang otomatis
      }
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const confirmTambah = async (data) => {
    if (!data) {
      return;
    }
    setLoading(true);
    setIsLoading(true);
    try {
      const response = await tambah_ruangan(data);
      if (response) {
        setIsSuccess(true);
        setTambahOpen(false);
        fetchDataRuangan();
        setTimeout(() => setIsSuccess(false), 1200); // Pop-up sukses hilang otomatis
      }
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    setLoading(true);
    try {
      const response = await hapus_ruangan(selectedId);
      if (response) {
        setIsSuccess(true);
        setDeleteOpen(false);
        fetchDataRuangan();
        setTimeout(() => setIsSuccess(false), 1200);
      }
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      {/* Modal Edit */}
      {isTambahOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <DataRuanganModal
            onCancel={() => setTambahOpen(false)}
            onConfirm={confirmTambah}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Modal Edit */}
      {isEditOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <DataRuanganModal
            onCancel={() => setEditOpen(false)}
            onConfirm={confirmEdit}
            isLoading={isLoading}
            ruanganData={selectedData}
          />
        </div>
      )}

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
      <div className="w-full ps-2">
        <div className="flex items-center">
          <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold">
            Data Ruangan
          </h1>
          <div className="w-full flex items-center justify-end gap-2 lg:gap-5">
            <SmallButton
              onClick={() => setTambahOpen(true)}
              type="button"
              icon={ProfileAdd}
              bgColor="bg-blue-600"
              colorIcon="white"
              title={"Tambah Ruangan"}
              hover={"hover:bg-blue-700"}
            />
          </div>
        </div>
        <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
          <div
            className={
              ruanganData
                ? "max-w-screen-xl dark:bg-dark_net-ter p-2 lg:p-5"
                : "flex items-center justify-center text-black dark:text-white p-8 md:p-16 lg:p-28"
            }
          >
            {ruanganData ? (
              <TableComponent
                columns={columns}
                data={ruanganData}
                onEdit={handleEdit}
                onDetailEdit={true}
                onDelete={handleDelete}
                Aksi="EditDelete"
                title="Tabel Data Ruangan"
                dataKey="id_ruangan"
                handleSearchChange={handleSearchChange}
                selectedSearch={selectedSearch}
                onSortChange={handleSortChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
              />
            ) : (
              <DataNotFound />
            )}
          </div>

          {meta && (
            <PaginationComponent
              meta={meta}
              onPageChange={fetchDataRuangan}
              onLimitChange={handleLimitChange}
            />
          )}
        </div>
      </div>
    </>
  );
}
