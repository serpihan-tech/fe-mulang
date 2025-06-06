"use client";

import {
  dropdown_nama_mapel,
  edit_mapel,
  hapus_mapel,
  mata_pelajaran,
  tambah_mapel,
} from "@/app/api/admin/ApiKBM";
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
import { toast } from "react-toastify";
import DeletePopUp from "@/app/component/DeletePopUp";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import convertToQuery from "../../jadwal-pelajaran/_component/convertToUrl";

export default function MataPelajaranAdmin() {
  const { semesterId } = useSemester();
  const { setIsLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState(null);
  const [mapelData, setMapelData] = useState([]);
  const [isTambahOpen, setIsTambahOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedSearch, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const fetchDataMapel = async (
    page = 1,
    limitVal = limit,
    tahunAjar = semesterId,
    search = selectedSearch,
    sortField = sortBy,
    sortDir = sortOrder,
    kelas = classFilter
  ) => {
    setIsLoading(true);
    setLoading(true);
    try {
      const data = await mata_pelajaran(
        page,
        limitVal,
        tahunAjar,
        search,
        sortField,
        sortDir,
        kelas
      );
      if (data) {
        console.log("Data Mata Pelajaran", data);
        const dataArray = data.modules.data;
        console.log("daribackend: ", dataArray);
        if (Array.isArray(dataArray)) {
          // Mapping agar sesuai dengan format tabel
          const formattedData = dataArray.map((item) => ({
            id_mapel: item.id,
            mata_pelajaran: item.name || "Tidak Ada",
            guru_pengampu: item.teacher?.name || "Tidak Ada",
            id_guru: item.teacher?.id || "Tidak Ada",
            tahun_ajar:
              item.academicYear?.name + " " + item.academicYear?.semester ||
              "Tidak Ada",
            id_tahun_ajar: item.academicYear?.id || "Tidak Ada",
            thumbnail: item.thumbnail || "Tidak Ada",
          }));

          setMapelData(formattedData);
          setIsLoading(false);
        }

        setMeta(data.modules.meta); // Simpan metadata untuk paginasi
        setCurrentPage(page);
      }
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const columns = [
    { label: "mata_pelajaran", sortKey: "mapel" },
    { label: "guru_pengampu", sortKey: "guru" },
    { label: "tahun_ajar", sortKey: "tahunAjar" },
  ];

  useEffect(() => {
    fetchDataMapel();
  }, [limit, selectedSearch, sortBy, sortOrder, semesterId, classFilter]);

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

  const filters = [
    {
      key: "namaMapel",
      label: "Mata Pelajaran",
      type: "multiselect",
      textSize: "text-sm",
      wideInput: "min-w-40",
      wideDropdown: "min-w-52",
      fetchOptions: () =>
        dropdown_nama_mapel(semesterId).then((res) =>
          res.modules.map((mapel) => ({
            label: mapel.name,
            value: mapel.name,
          }))
        ),
    },
  ];

  const handleFilterDropdownChange = (value) => {
    const query = convertToQuery(value);
    setClassFilter(query);
  };

  const handleDelete = (selectedId) => {
    setSelectedId(selectedId);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return; // Pastikan selectedId ada sebelum melanjutkan
    setIsLoading(true);

    try {
      const response = await hapus_mapel(selectedId);
      if (response) {
        setIsSuccess(true);
        setDeleteOpen(false);
        setTimeout(() => setIsSuccess(false), 1200); // Pop-up sukses hilang otomatis
        fetchDataMapel(); // Refresh data setelah penghapusan
      }
    } catch (error) {
      toast.error("Gagal menghapus data mapel!");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmTambah = async (createdData) => {
    try {
      setIsLoading(true);
      const response = await tambah_mapel(createdData);
      if (response) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 1200); // Pop-up sukses hilang otomatis
        setIsTambahOpen(false);
        fetchDataMapel();
      }

      // Tambahkan fungsi untuk refresh data kelas jika perlu
    } catch (error) {
      toast.error("Gagal membuat data mapel!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (selectedData) => {
    setSelectedData(selectedData);
    setEditOpen(true);
  };

  const confirmEdit = async (createdData) => {
    const id = createdData.id_mapel;

    try {
      setIsLoading(true);
      const response = await edit_mapel(createdData, id);
      if (response) {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 1200); // Pop-up sukses hilang otomatis
        setEditOpen(false);
        fetchDataMapel();
      }

      // Tambahkan fungsi untuk refresh data kelas jika perlu
    } catch (error) {
      toast.error("Gagal membuat data mapel!");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Data Mata Pelajaran", mapelData);
  return (
    <>
      {/* Modal Tambah */}
      {isTambahOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <DataMapelModal
            onCancel={() => setIsTambahOpen(false)}
            onConfirm={confirmTambah}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Modal Edit */}
      {isEditOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <DataMapelModal
            onCancel={() => setEditOpen(false)}
            mapelData={selectedData}
            onConfirm={confirmEdit}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Modal Hapus */}
      {isDeleteOpen && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <DeletePopUp
            onCancel={() => setDeleteOpen(false)}
            onConfirm={confirmDelete}
            isLoading={isLoading}
          />
        </div>
      )}

      {/* Modal Sukses */}
      {isSuccess && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <SuccessUpdatePopUp />
        </div>
      )}

      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold">
              Mata Pelajaran
            </h1>
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
            <div
              className={
                mapelData
                  ? "max-w-full p-5 dark:bg-dark_net-ter"
                  : "flex items-center justify-center text-black dark:text-white p-8 md:p-16 lg:p-28"
              }
            >
              {mapelData ? (
                <TableComponent
                  dataKey="id_mapel"
                  columns={columns}
                  data={mapelData}
                  onEdit={handleEdit}
                  onDetailEdit={true}
                  onDelete={handleDelete}
                  title="Data Mata Pelajaran"
                  Aksi="EditDelete"
                  filters={filters}
                  handleSearchChange={handleSearchChange}
                  selectedSearch={selectedSearch}
                  onSortChange={handleSortChange}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onFilterChange={handleFilterDropdownChange}
                  currentPage={meta?.currentPage || 1}
                  perPage={meta?.perPage || 10}
                />
              ) : (
                <DataNotFound />
              )}
            </div>

            {meta && (
              <PaginationComponent
                meta={meta}
                onPageChange={fetchDataMapel}
                onLimitChange={handleLimitChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
