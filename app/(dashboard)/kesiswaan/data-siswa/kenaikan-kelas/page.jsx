"use client";

import { toast, ToastContainer } from "react-toastify";
import TambahSiswaForm from "../../_component/TambahSiswaForm";
import PaginationComponent from "@/app/component/Pagination";
import DataNotFound from "@/app/component/DataNotFound";
import TableComponent from "@/app/component/Table";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useState } from "react";
import { data_kelas, data_siswa } from "@/app/api/ApiKesiswaan";
import SmallButton from "@/app/component/SmallButton";
import { Notepad2 } from "iconsax-react";
import { useRouter } from "next/navigation";

export default function KenaikanKelasPage() {
  const [siswaData, setSiswaData] = useState(null);
  const [meta, setMeta] = useState(null);
  const { setIsLoading } = useLoading();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(null);
  const [selectedSearch, setSearch] = useState(" ");
  const [sortBy, setSortBy] = useState(" ");
  const [sortOrder, setSortOrder] = useState(" ");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [classFilter, setClassFilter] = useState(" ");
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [allSemesters, setAllSemesters] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedDataRows, setSelectedDataRows] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const siswanull = sessionStorage.getItem("siswa_selected_null");
    if (siswanull) {
      toast.error(siswanull);
      sessionStorage.removeItem("siswa_selected_null");
    }
  }, []);

  const convertToQuery = (obj) => {
    return Object.entries(obj)
      .flatMap(([key, values]) =>
        Array.isArray(values)
          ? values.map((value) => `&${key}=${encodeURIComponent(value)}`)
          : [`&${key}=${encodeURIComponent(values)}`]
      )
      .join("");
  };

  const fetchDataSiswa = async (
    page = 1,
    limitVal = limit,
    search = selectedSearch,
    sortField = sortBy,
    sortDir = sortOrder,
    kelas = classFilter
  ) => {
    try {
      setIsLoading(true);
      const data = await data_siswa(
        page,
        limitVal,
        search,
        sortField,
        sortDir,
        kelas
      );
      const dataArray = data.students.data;
      console.log("daribackend: ", dataArray);
      if (Array.isArray(dataArray)) {
        // Mapping agar sesuai dengan format tabel
        const formattedData = dataArray.map((item) => ({
          id_siswa: item.studentDetail.studentId,
          nis: item.studentDetail?.nis || "Tidak Ada",
          nisn: item.studentDetail?.nisn || "Tidak Ada",
          nama_lengkap: item.name || "Tidak Ada",
          email: item.user?.email || "Tidak Ada",
          id_kelas: item.classStudent[0]?.class?.id || "Tidak Ada",
          kelas: item.classStudent[0]?.class?.name || "Tidak Ada",
          id_tahun_ajar: item.classStudent[0]?.academicYear?.id || "Tidak Ada",
          tahun_ajar:
            item.classStudent[0]?.academicYear?.name +
              " " +
              item.classStudent[0]?.academicYear?.semester || "Tidak Ada",
          jenis_kelamin: item.studentDetail?.gender || "Tidak Ada",
          status: item.isGraduate ? "Lulus" : "Aktif",
        }));

        setSiswaData(formattedData);
        setIsLoading(false);
      }

      setMeta(data.students.meta);
      setCurrentPage(page);
    } catch (error) {
      toast.error("Gagal memuat data siswa.");
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { label: "nis", sortKey: "nis" },
    { label: "nisn", sortKey: "nisn" },
    { label: "nama_lengkap", sortKey: "nama" },
    { label: "kelas", sortKey: "kelas" },
    { label: "tahun_ajar", sortKey: "tahunAjar" },
    { label: "status", sortKey: "status" },
  ];

  const filters = [
    {
      key: "kelas",
      label: "Kelas",
      type: "multiselect",
      fetchOptions: () =>
        data_kelas(1, 99, "", "", "").then((res) =>
          res.theClass.theClass.map((kelas) => ({
            label: kelas.name,
            value: kelas.name,
          }))
        ),
    },
  ];

  useEffect(() => {
    fetchDataSiswa();
  }, [limit, selectedSearch, sortBy, sortOrder, classFilter, selectedPeriod]);

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

  const handleSelectRow = (isChecked, rowData) => {
    if (isChecked) {
      setSelectedRows((prev) => [...prev, rowData.id_siswa]);
      setSelectedDataRows((prev) => [...prev, rowData]);
    } else {
      setSelectedRows((prev) => prev.filter((id) => id !== rowData.id_siswa));
      setSelectedDataRows((prev) =>
        prev.filter((row) => row.id_siswa !== rowData.id_siswa)
      );
    }
  };
  console.log("selectedRows: ", selectedRows);
  console.log("selectedDataRows: ", selectedDataRows);

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allIds = siswaData.map((row) => row.id_siswa);
      setSelectedRows(allIds);
      setSelectedDataRows(siswaData);
    } else {
      setSelectedRows([]);
      setSelectedDataRows([]);
    }
  };

  const handleSubmit = () => {
    sessionStorage.setItem("siswa_selected", JSON.stringify(selectedDataRows));
    router.push("/kesiswaan/data-siswa/kenaikan-kelas/pilih-kelas");
  };

  const handleFilterDropdownChange = (value) => {
    const query = convertToQuery(value);
    setClassFilter(query);
  };

  return (
    <>
      <ToastContainer />
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold">
              Data Siswa Admin
            </h1>
          </div>

          <div className="flex flex-col justify-end bg-white dark:bg-dark_net-pri rounded-lg my-5">
            <div
              className={
                siswaData
                  ? "max-w-full p-5 dark:bg-dark_net-ter"
                  : "flex items-center justify-center text-black dark:text-white p-8 md:p-16 lg:p-28"
              }
            >
              {siswaData ? (
                <TableComponent
                  dataKey="id_siswa"
                  columns={columns}
                  data={siswaData}
                  title="Data Siswa"
                  handleSearchChange={handleSearchChange}
                  selectedSearch={selectedSearch}
                  onSortChange={handleSortChange}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  enableSelect={true}
                  selectedRows={selectedRows}
                  onSelectRow={handleSelectRow}
                  onSelectAll={handleSelectAll}
                  filters={filters}
                  onFilterChange={handleFilterDropdownChange}
                />
              ) : (
                <DataNotFound />
              )}
            </div>

            <div className="flex justify-end p-5">
              <SmallButton
                type="button"
                bgColor="bg-pri-main"
                bgColorDisabled="bg-gray-300"
                colorIcon="white"
                title={"Naik Kelas"}
                disabled={selectedRows.length === 0}
                hover={"hover:bg-pri-hover "}
                onClick={handleSubmit}
              />
            </div>

            {meta && (
              <PaginationComponent
                meta={meta}
                onPageChange={fetchDataSiswa}
                onLimitChange={handleLimitChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
