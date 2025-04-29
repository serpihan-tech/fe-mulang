"use client";

import Dropdown from "@/app/component/Dropdown";
import { useState, useEffect } from "react";
import AbsenTable from "../_component/AbsenTable";
import { data_siswa } from "@/app/api/ApiKesiswaan";
import { toast } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";

export default function AbsensiSiswaTeacher() {
  
  const classOptions = [
    { label: "X MIPA 1", value: "xmipa1" },
    { label: "X MIPA 2", value: "xmipa2" },
    { label: "X IPS 1", value: "xips1" },
    { label: "X IPS 2", value: "xips2" },
    { label: "XI MIPA 1", value: "ximipa1" },
    { label: "XI MIPA 2", value: "ximipa2" },
    { label: "XI IPS 1", value: "xiips1" },
    { label: "XI IPS 2", value: "xiips2" },
    { label: "XII MIPA 1", value: "xiimipa1" },
    { label: "XII MIPA 2", value: "xiimipa2" },
    { label: "XII IPS 1", value: "xiiips1" },
    { label: "XII IPS 2", value: "xiiips2" },
  ];

  const mapelOptions = [
    { label: "Matematika", value: "matematika" },
    { label: "Fisika", value: "fisika" }
  ];

  const [siswaData, setSiswaData] = useState([]);
  const [meta, setMeta] = useState(null);
  const {setIsLoading} = useLoading();

  const fetchDataSiswa = async () => {
    setIsLoading(true);
    try {
      const data = await data_siswa();
      const dataArray = data.students.data;
      if (Array.isArray(dataArray)) {
        // Mapping agar sesuai dengan format tabel
        const formattedData = dataArray.map((item) => ({
          nis: item.studentDetail?.nis || "Tidak Ada",
          nama: item.name || "Tidak Ada",
          // Tambahkan status default atau logika untuk status jika diperlukan
        }));

        setSiswaData(formattedData);
      }
    } catch (error) {
      toast.error("Gagal memuat data siswa.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSiswa();
  }, []);

  const columns = [
    { key: 'id', label: 'No' },
    { key: 'nis', label: 'NIS' },
    { key: 'nama', label: 'Nama' },
    { key: 'status', date: '3 Februari 2025', week: 'Minggu ke-1' },
    { key: 'status', date: '10 Februari 2025', week: 'Minggu ke-2' },
    { key: 'status', date: '17 Februari 2025', week: 'Minggu ke-3' },
    { key: 'status', date: '24 Februari 2025', week: 'Minggu ke-4' },
    { key: 'status', date: '2 Maret 2025', week: 'Minggu ke-5' },
    { key: 'status', date: '9 Maret 2025', week: 'Minggu ke-6' },
  ];

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMapel, setSelectedMapel] = useState(null);

  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <div className="w-[629px] flex space-x-[33px]">
              <Dropdown
                options={classOptions}
                value={selectedClass}
                onChange={setSelectedClass}
                placeholder="Pilih kelas"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                dropdownStyle="dark:bg-black dark:text-white"
              />
              <Dropdown
                options={mapelOptions}
                value={selectedMapel}
                onChange={setSelectedMapel}
                placeholder="Pilih mata pelajaran"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                dropdownStyle="dark:bg-black dark:text-white"
              />
            </div>
          </div>
          <div className="px-5 mt-7">
            <AbsenTable data={siswaData} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}