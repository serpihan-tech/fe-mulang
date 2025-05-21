"use client";

import { toast, ToastContainer } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";
import { useEffect, useState } from "react";
import {
  data_kelas,
  data_siswa,
  naik_kelas_siswa,
} from "@/app/api/ApiKesiswaan";
import SmallButton from "@/app/component/SmallButton";
import { Notepad2 } from "iconsax-react";
import { useRouter } from "next/navigation";
import DataNotFound from "@/app/component/DataNotFound";
import TableComponent from "@/app/component/Table";
import { useSemester } from "@/provider/SemesterProvider";
import Dropdown from "@/app/component/Dropdown";
import EditPopUp from "@/app/component/EditPopUp";
import DeletePopUp from "@/app/component/DeletePopUp";

export default function PilihKelasPage() {
  const router = useRouter();
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [siswaData, setSiswaData] = useState(null);
  const { setIsLoading } = useLoading();
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [classOption, setClassOption] = useState([]);
  const { allSemesters } = useSemester();
  const [isEdit, setIsEdit] = useState(false);
  const [tempPayload, setTempPayload] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    const rowData = sessionStorage.getItem("siswa_selected");
    if (!rowData && selectedRowData.length === 0) {
      sessionStorage.setItem(
        "siswa_selected_null",
        "Isi data siswa terlebih dahulu"
      );
      router.push("/kesiswaan/data-siswa/kenaikan-kelas");
    }

    setSelectedRowData(JSON.parse(rowData));
    //sessionStorage.removeItem("siswa_selected")
  }, [router]);

  const fetchDataSiswa = async () => {
    try {
      setIsLoading(true);
      if (Array.isArray(selectedRowData)) {
        // Mapping agar sesuai dengan format tabel
        const formattedData = selectedRowData.map((item) => ({
          id_siswa: item.id_siswa,
          nis: item.nis || "Tidak Ada",
          nisn: item.nisn || "Tidak Ada",
          nama_lengkap: item.nama_lengkap || "Tidak Ada",
          email: item.user?.email || "Tidak Ada",
          kelas: item.kelas || "Tidak Ada",
          tahun_ajar: item.tahun_ajar || "Tidak Ada",
          status: item.isGraduate ? "Lulus" : "Aktif",
        }));

        setSiswaData(formattedData);
        setIsLoading(false);
      }
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

  const dropdowns = [
    {
      label: "Kelas",
      value: selectedClass,
      setValue: setSelectedClass,
      options: classOption,
      placeholder: "Pilih kelas",
    },
    {
      label: "Tahun Ajaran",
      value: selectedPeriod,
      setValue: setSelectedPeriod,
      options: allSemesters || [],
      placeholder: "Pilih tahun ajaran",
    },
  ];

  useEffect(() => {
    fetchDataSiswa();
  }, [selectedRowData]);

  // Untuk Data dropdown kelas
  useEffect(() => {
    const fetchDataKelas = async () => {
      try {
        const data = await data_kelas(1, 99, "", "", "");
        // console.log("kelazzzzz",data)
        const formattedOptions = data?.theClass.theClass.map((kelas) => ({
          label: kelas.name,
          value: kelas.id,
        }));
        setClassOption(formattedOptions);
      } catch (error) {
        toast.error(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchDataKelas();
  }, []);

  const handleDropdownChange = (setter) => (selectedOption) => {
    setter(selectedOption);
  };

  const handleSubmit = () => {
    if (!selectedClass) {
      toast.error("Kelas tidak boleh kosong!");
      return;
    }

    if (!selectedPeriod) {
      toast.error("Tahun ajaran tidak boleh kosong!");
      return;
    }

    if (!siswaData || siswaData.length === 0) {
      toast.error("Data siswa tidak ditemukan!");
      return;
    }

    const payload = {
      data: {
        class_id: selectedClass.value,
        academic_year_id: selectedPeriod.value,
        student_ids: siswaData.map((siswa) => siswa.id_siswa),
      },
    };

    setTempPayload(payload);
    setIsEdit(true);
  };

  const handleNaikKelas = async () => {
    if (!tempPayload) return;

    setIsLoading(true);
    try {
      console.log("tempPayload", tempPayload);

      const response = await naik_kelas_siswa(tempPayload);
      if (response) {
        sessionStorage.removeItem("siswa_selected");
        sessionStorage.setItem("succes_naik_kelas", response.message);
        router.push("/kesiswaan/data-siswa");
      }
    } catch (error) {
      toast.error(error.message || "Gagal mengirim data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    setDeleteOpen(false);
    setIsLoading(true);
    try {
      sessionStorage.removeItem("siswa_selected");
      router.push("/kesiswaan/data-siswa");
    } catch (error) {
      toast.error(error.message || "Gagal mengirim data.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log("selectedRowData: ", selectedRowData);

  return (
    <>
      <ToastContainer />
      {isEdit && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <EditPopUp
            onCancel={() => setIsEdit(false)}
            onConfirm={handleNaikKelas}
            isLoading={isLoading}
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
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold">
              Data Siswa Admin
            </h1>
          </div>

          <div className="flex flex-col justify-end bg-white dark:bg-dark_net-ter rounded-lg my-5">
            <div className="p-5 flex flex-col space-y-2">
              <h1 className="w-full text-black dark:text-slate-100 text-lg font-semibold">
                Pilih Kelas dan tahun ajar
              </h1>
              <div className="flex gap-x-4 flex-wrap">
                {dropdowns.map((dropdown, idx) => (
                  <div key={idx} className="flex flex-col w-40 md:w-52">
                    <label className="mb-1 text-sm font-semibold text-gray-700 dark:text-slate-300">
                      {dropdown.label}
                    </label>
                    <Dropdown
                      options={dropdown.options}
                      value={dropdown.value}
                      onChange={handleDropdownChange(dropdown.setValue)}
                      placeholder={dropdown.placeholder}
                      className="w-auto h-10 p-2 rounded-md bg-white dark:bg-dark_net-ter border border-netral-20 text-black"
                      dropdownStyle="dark:bg-dark-net-ter dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              className={
                siswaData
                  ? "max-w-full p-5"
                  : "flex items-center justify-center text-black dark:text-white p-8 md:p-16 lg:p-28"
              }
            >
              {siswaData ? (
                <TableComponent
                  dataKey="id_siswa"
                  columns={columns}
                  data={siswaData}
                  enableSearch={false}
                  enableSort={false}
                />
              ) : (
                <DataNotFound />
              )}
            </div>

            <div className="flex justify-end space-x-2 p-5">
              <SmallButton
                type="button"
                bgBorder={"border-2 border-err-main "}
                bgColorDisabled="bg-gray-300"
                title={"Batal"}
                textColor="text-err-main hover:text-white"
                // disabled={selectedRows.length === 0}
                hover={"hover:bg-err-main "}
                onClick={handleDelete}
              />

              <SmallButton
                type="button"
                bgColor="bg-pri-main"
                bgColorDisabled="bg-gray-300"
                colorIcon="white"
                title={"Naik Kelas"}
                // disabled={selectedRows.length === 0}
                hover={"hover:bg-pri-hover"}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
