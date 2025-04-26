'use client'
import JadwalMengajar from "@/app/(dashboard)/dashboard/_component/home/JadwalMengajar";
import { toast } from "react-toastify";
import { JadwalGuru } from "@/app/api/guru/ApiKBM";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useSemester } from "@/provider/SemesterProvider";

// Urutan hari dalam seminggu
const weekDaysOrder = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

export default function JadwalMengajarGuru() {
  const [scheduleData, setScheduleData] = useState({})
  const {allSemesters, semesterId} = useSemester()
  const semesterName  = allSemesters.find(opt => opt.value === semesterId)
  const label = semesterName ? semesterName.label : 'Semester tidak ditemukan'
  
  const fetchJadwalGuru = async () => {
    //setIsLoading(true);
    try {
      const data = await JadwalGuru();
      if(data){
        console.log("Data jadwal:", data);
        if (Array.isArray(data.teachers)) {
          const groupedSchedule = data.teachers.reduce((acc, item) => {
            if (!acc[item.days]) {
              acc[item.days] = []
            }
            acc[item.days].push(item)
            return acc;
          }, {});
  
          Object.keys(groupedSchedule).forEach((day) => {
            groupedSchedule[day].sort(
              (a, b) =>
                moment(a.startTime, "HH:mm:ss") - moment(b.startTime, "HH:mm:ss")
            );
          });
  
          setScheduleData(groupedSchedule);
        } else {
          console.error("Data schedule bukan array atau kosong:", data.schedule);
          setScheduleData({});
        }
        //setDetailGuru(data.teacher);
      }
    } catch (error) {
      toast.error("Gagal mengambil data detail guru:", error.message);
    } finally {
      //setIsLoading(false);
    }
  };

  const refs = useRef([]);
  const [maxHeight, setMaxHeight] = useState("auto");

  useEffect(() => {
    if (refs.current.length > 0) {
      const heights = refs.current.map((el) => el?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights) + "px");
    }
  }, [scheduleData]);

  useEffect(() => {
    fetchJadwalGuru();
  }, []);

  console.log("Data jadwal mengajar:", scheduleData);
  return (
    <div className=" text-black ">
      <h1 className="flex justify-center md:justify-start text-sm md:text-base lg:text-xl font-semibold md:mb-3 lg:mb-4">
        Jadwal Pelajaran {label}
      </h1>
      <div className="md:flex items-start relative">
        {weekDaysOrder
          .filter((day) => scheduleData[day])
          .map((day, index, array) => (
            <div
              key={day}
              className="flex flex-col items-center relative w-full"
            >
              {/* Komponen JadwalHari */}
              <div
                className="md:space-y-4 w-full"
                ref={(el) => (refs.current[index] = el)}
              >
                <JadwalMengajar day={day} schedule={scheduleData[day]} />
              </div>

              {/* Garis Vertikal (hanya untuk elemen yang bukan terakhir) */}
              {index !== array.length - 1 && (
                <div
                  className="absolute hidden md:block right-0 top-0 border-r-2  border-netral-10/50 border-dashed"
                  style={{ height: maxHeight }} // Dynamic height dari JavaScript
                ></div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}