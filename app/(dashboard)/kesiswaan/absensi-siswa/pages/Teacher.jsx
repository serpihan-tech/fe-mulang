"use client";

import Dropdown from "@/app/component/Dropdown";
import { useState, useEffect } from "react";
import AbsenTable from "../_component/AbsenTable";
import { toast } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";
import { AbsensiSiswa } from "@/app/api/guru/ApiKesiswaan";
import { mapelGuru } from "@/app/api/guru/ApiKBM";

export default function AbsensiSiswaTeacher() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMapel, setSelectedMapel] = useState(null);
  const [dataJadwal, setDataJadwal] = useState(null);
  const [classOption, setClassOption] = useState([]);
  const [mapelOption, setMapelOption] = useState([]);
  const [siswaData, setSiswaData] = useState([]);
  const {setIsLoading} = useLoading();
  const [absenTableData, setAbsenTableData] = useState([]);
  const [absenTableColumns, setAbsenTableColumns] = useState([]);

  const fetchDataJadwal = async () => {
    setIsLoading(true);
    try {
      const data = await mapelGuru();
      console.log("data jadwal: ", data);
      const dataArray = data.data;
      setDataJadwal(dataArray);
  
      if (Array.isArray(dataArray)) {
        const uniqueMapelMap = new Map();
        dataArray.forEach((mapel) => {
          if (!uniqueMapelMap.has(mapel.moduleId)) {
            uniqueMapelMap.set(mapel.moduleId, {
              label: mapel.moduleName || "Tidak Ada",
              value: mapel.moduleId || "Tidak Ada",
            });
          }
        });
  
        const formattedData = Array.from(uniqueMapelMap.values());
        setMapelOption(formattedData);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

const fetchDataAbsen = async (moduleId = selectedMapel.value, classId = selectedClass.value) => {
  if (!selectedMapel.value || !selectedClass.value) return;

  setIsLoading(true);
  try {
    const res = await AbsensiSiswa(moduleId, classId);
    const { students, dates } = res.absences;

    // Bentuk kolom (tanggal)
    const columns = [
      { key: 'id', label: 'No' },
      { key: 'nis', label: 'NIS' },
      { key: 'nama', label: 'Nama' },
      ...dates.map((dateObj, index) => ({
        key: `status_${index}`,
        label: 'Status',
        date: dateObj.date,
        week: dateObj.day,
        absences: dateObj.absences,
      }))
    ];
    setAbsenTableColumns(columns);

    // Bentuk baris (per siswa)
    const formattedData = students.map((student, studentIndex) => {
      const row = {
        id: studentIndex + 1,
        nis: student.nis,
        nama: student.name,
      };

      dates.forEach((dateObj, dateIndex) => {
        const absence = dateObj.absences.find(
          (abs) => abs.classStudentId === student.classStudentId
        );
        row[`status_${dateIndex}`] = absence?.status || '-';
      });

      return row;
    });

    setAbsenTableData(formattedData);
  } catch (error) {
    toast.error(error.message);
  } finally {
    setIsLoading(false);
  }
};

  // Ambil data jadwal saat awal
  useEffect(() => {
    fetchDataJadwal();
  }, []);

  // Saat selectedMapel berubah, reset selectedClass dan isi classOption
  useEffect(() => {
    if (!selectedMapel) {
      setClassOption([]);
      setSelectedClass(null);
      return;
    }

    const filteredKelas = dataJadwal
      .filter((item) => item.moduleId === selectedMapel.value)
      .map((item) => ({
        value: item.classId,
        label: item.className,
      }));

    setClassOption(filteredKelas);
    setSelectedClass(null); // reset class
  }, [selectedMapel, dataJadwal]);

  // Fetch data absen HANYA jika keduanya sudah terisi
  useEffect(() => {
    if (selectedMapel && selectedClass) {
      fetchDataAbsen(selectedMapel.value, selectedClass.value);
    }
  }, [selectedMapel, selectedClass]);

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

    console.log("mapel: ", mapelOption)
    console.log("jadwal: ", dataJadwal)
    console.log("KelasOption: ",classOption)
    console.log("selected Mapel: ", selectedMapel)
    console.log("selected Kelas: ", selectedClass)


  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <div className="w-[629px] flex space-x-[33px]">
              <Dropdown
                options={mapelOption}
                value={selectedMapel}
                onChange={setSelectedMapel}
                placeholder="Pilih mata pelajaran"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                dropdownStyle="dark:bg-black dark:text-white"
              />

              <Dropdown
                options={classOption}
                value={selectedClass}
                onChange={setSelectedClass}
                placeholder={selectedClass ? "Pilih kelas" : "Pilih kelas"}
                isDisabled={selectedMapel ? false : true}
                className={`w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200`}
                dropdownStyle="dark:bg-black dark:text-white"
              />
            </div>
          </div>
          {selectedClass && selectedMapel ? (
            <div className="px-5 mt-7">
            <AbsenTable 
              data={absenTableData} 
              columns={absenTableColumns}
            />
            </div>
          ):(
            <div className="px-5 mt-7">
              Pilih Kelas dan Mapel terlebih dahulu
            </div>
          )}
        </div>
      </div>
    </>
  );
}