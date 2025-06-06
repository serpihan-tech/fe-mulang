"use client";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { getStudentSchedule } from "@/app/api/siswa/ApiSiswa";
import JadwalHari from "../dashboard/_component/home/JadwalHari";
import { useLoading } from "@/context/LoadingContext";
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

export default function JadwalLengkapSiswa() {
  const [scheduleData, setScheduleData] = useState({})
  const { setIsLoading } = useLoading()
  const studentId = sessionStorage.getItem("student_id")

  const {allSemesters, semesterId} = useSemester()
  const semesterName  = allSemesters.find(opt => opt.value === semesterId)
  const label = semesterName ? semesterName.label : 'Semester tidak ditemukan'

  //console.log("Semester ID", label)

  const refs = useRef([]);
  const [maxHeight, setMaxHeight] = useState("auto");

  useEffect(() => {
    if (refs.current.length > 0) {
      const heights = refs.current.map((el) => el?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights) + "px");
    }
  }, [scheduleData]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setIsLoading(true);
    try {
      const data = await getStudentSchedule(studentId,semesterId);
      if (Array.isArray(data.schedule)) {
        const groupedSchedule = data.schedule.reduce((acc, item) => {
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
    } catch (error) {
      console.error("Error fetching schedule data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Data jadwal:", scheduleData)
  return (
    <div className=" text-black dark:text-slate-100">
      <h1 className="flex justify-center md:justify-start text-sm md:text-base lg:text-xl font-semibold mb-3 md:mb-4 lg:mb-7">
        Jadwal Pelajaran {label}
      </h1>
      <div className="md:flex items-start relative ">
        {weekDaysOrder
          .filter((day) => scheduleData[day])
          .map((day, index, array) => (
            <div
              key={day}
              className="flex flex-col items-center relative w-full"
            >
              {/* Komponen JadwalHari */}
              <div
                className="md:space-y-4 w-full mb-4 md:mb-0"
                ref={(el) => (refs.current[index] = el)}
              >
                <JadwalHari day={day} schedule={scheduleData[day]} />
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
  );
}
