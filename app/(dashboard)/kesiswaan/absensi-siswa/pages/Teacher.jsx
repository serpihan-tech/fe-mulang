"use client";

import Dropdown from "@/app/component/Dropdown";
import { useState, useEffect } from "react";
import AbsenTable from "../_component/AbsenTable";
import { toast } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";
import { AbsensiSiswa } from "@/app/api/guru/ApiKesiswaan";
import { mapelGuru } from "@/app/api/guru/ApiKBM";
import SmallButton from "@/app/component/SmallButton";
import { Book1 } from "iconsax-react";
import SuccessUpdatePopUp from "@/app/component/SuccessUpdatePopUp";
import DataAbsensiMassModal from "../../_component/DataAbsensiMassModal";
import DescriptionModal from "../_component/DescriptionModal";

export default function AbsensiSiswaTeacher() {
  const mapel = typeof window !== "undefined" ?  JSON.parse(sessionStorage.getItem("module_id")) : null;
  const kelas = typeof window !== "undefined" ?  JSON.parse(sessionStorage.getItem("class_id")) : null;
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedMapel, setSelectedMapel] = useState(null);
  const [dataJadwal, setDataJadwal] = useState(null);
  const [classOption, setClassOption] = useState([]);
  const [mapelOption, setMapelOption] = useState([]);
  const {setIsLoading} = useLoading();
  const [absenTableData, setAbsenTableData] = useState([]);
  const [absenTableColumns, setAbsenTableColumns] = useState([]);
  const [ isTambah, setIsTambah ] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [currentDescription, setCurrentDescription] = useState("");

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
        setSelectedMapel(mapel)
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchDataAbsen = async (moduleId = selectedMapel.value, classId = selectedClass.value) => {
    if (!selectedMapel.value || !selectedClass.value) return;

    setIsLoading(true);
    try {
      const res = await AbsensiSiswa(moduleId, classId);
      //console.log("res",res)
      const { students, dates } = res.absences;
      console.log("students: ",students)
      console.log("dates: ",dates)


      // Bentuk kolom (tanggal)
      const columns = [
        { key: 'id', label: 'No' },
        { key: 'nis', label: 'NIS' },
        { key: 'nama', label: 'Nama' },
        ...dates.map((dateObj, index) => ({
          key: `status_${index}`,
          label: 'Status',
          date: dateObj.date,
          absences: dateObj.absences,
          scheduleId: dateObj.scheduleId,
          fillable: false,
          description: dateObj.description,
        }))
      ];
      setAbsenTableColumns(columns);

      // Bentuk baris (per siswa)
      const formattedData = students.map((student) => {
        const row = {
          id: student.classStudentId,
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

  const addJadwal = (data) => {
    // Find the last status index
    setLoading(true)

    const statusColumns = absenTableColumns.filter(col => col.key.startsWith('status_'));
    const lastStatusIndex = statusColumns.length > 0 
      ? Math.max(...statusColumns.map(col => parseInt(col.key.split('_')[1])))
      : -1;
    const newStatusIndex = lastStatusIndex + 1;
  
    // Create new column data
    const newColumn = {
      key: `status_${newStatusIndex}`,
      label: "Status",
      date: data.date,
      scheduleId: data.scheduleId,
      description: "",
      absences: absenTableData.map(item => ({
        classStudentId: item.id,
        status: "Hadir",
        reason: null
      }))
    };
    
    //console.log("newColumn: ", newColumn)
    try{
      setIsSuccess(true)
      setAbsenTableColumns([...absenTableColumns, newColumn]);
      setTimeout(() => setIsSuccess(false), 1200); 
      

      
    } catch (error) {
      toast.error(error.message)
    } finally{
      setIsTambah(false)
      setLoading(false)
    }
  }; 

  const handleShowDescription = (description) => {
    setCurrentDescription(description);
    setShowDescription(true);
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setCurrentDescription("");
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
    setSelectedClass(kelas); // reset class
  }, [selectedMapel, dataJadwal]);

  // Fetch data absen HANYA jika keduanya sudah terisi
  useEffect(() => {
    if (selectedMapel && selectedClass) {
      fetchDataAbsen(selectedMapel.value, selectedClass.value);
    }
  }, [selectedMapel, selectedClass]);

  
  
  // console.log("mapel: ", mapelOption)
  // console.log("jadwal: ", dataJadwal)
  // console.log("KelasOption: ",classOption)
  console.log("selected Mapel: ", selectedMapel)
  console.log("selected Kelas: ", selectedClass)
  console.log("mapel id:",mapel)
  console.log("kelas id:",kelas)


  return (
    <>
      {/* Pop-up Sukses */}
      {isSuccess && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <SuccessUpdatePopUp />
        </div>
      )}

      {/* Description Modal */}
      <DescriptionModal 
        isOpen={showDescription}
        onClose={handleCloseDescription}
        description={currentDescription}
      />

      {/* Tambah */}
      {isTambah && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <DataAbsensiMassModal
            onCancel={()=>(setIsTambah(false))}
            onConfirm={addJadwal}
            isLoading={isLoading}
            selectedClass={selectedClass.label}
          />
        </div>
      )}
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex justify-between">
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

            <div>
              <SmallButton 
                onClick={()=>(setIsTambah(true))}
                icon={Book1}
                bgColor = "bg-pri-main"
                colorIcon = "currentColor"
                title = "Tambah Absen"
                hover = "hover:bg-pri-hover"
                textColor = "text-white"
                minBtnSize = "min-w-fit"
                bgColorDisabled = "bg-pri-main/50 text-white cursor-not-allowed"
                disabled ={!selectedClass || !selectedMapel}
              />
            </div>
          </div>
          {selectedClass && selectedMapel ? (
            <div className=" mt-7 overflow-x-auto">
              <div className="min-w-max">
                <AbsenTable 
                  data={absenTableData} 
                  columns={absenTableColumns}
                  onfetch={fetchDataAbsen}
                  onShowDescription={handleShowDescription}
                />
              </div>
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